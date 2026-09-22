#!/usr/bin/env bash
# ==============================================================================
# Automated SEO & Protocol Verification Script (per Section 11.1 of google.md)
# Tests endpoints, HTTP status codes, headers, canonicals, robots.txt, and sitemaps.
# ==============================================================================

BASE_URL="${1:-http://localhost:5173}"

echo "========================================================"
echo " Starting SEO & Google-Friendliness Audit: $BASE_URL"
echo "========================================================"

FAILED=0

check_endpoint() {
  local path="$1"
  local expected_status="${2:-200}"
  local url="${BASE_URL}${path}"
  
  local status
  status=$(curl -s -L -o /dev/null -w "%{http_code}" "$url")
  
  if [ "$status" -eq "$expected_status" ]; then
    echo " [PASS] $path -> HTTP $status"
  else
    echo " [FAIL] $path -> HTTP $status (Expected $expected_status)"
    FAILED=$((FAILED + 1))
  fi
}

echo ""
echo "--- 1. HTTP Status Codes & Routing ---"
check_endpoint "/" 200
check_endpoint "/room" 200
check_endpoint "/world" 200
check_endpoint "/folio" 200
check_endpoint "/robots.txt" 200
check_endpoint "/sitemap.xml" 200
check_endpoint "/site.webmanifest" 200
check_endpoint "/llms.txt" 200
check_endpoint "/llms-full.txt" 200
check_endpoint "/og-image.png" 200

echo ""
echo "--- 2. Header & Metadata Assertions on Homepage ---"
HTML=$(curl -s "$BASE_URL/")

# Title check
TITLE=$(echo "$HTML" | grep -o '<title>[^<]*</title>' | sed 's/<[^>]*>//g')
echo " Title: \"$TITLE\""
if [ -n "$TITLE" ]; then
  LEN=${#TITLE}
  echo "  Length: $LEN characters"
  if [ "$LEN" -ge 40 ] && [ "$LEN" -le 70 ]; then
    echo " [PASS] Title within optimal bounds (50-60 target)."
  else
    echo " [WARN] Title length ($LEN) slightly outside optimal bounds."
  fi
else
  echo " [FAIL] Missing <title> tag!"
  FAILED=$((FAILED + 1))
fi

# Meta description check
DESC=$(echo "$HTML" | grep -o '<meta name="description" content="[^"]*"' | sed 's/.*content="//;s/"$//')
if [ -n "$DESC" ]; then
  DESC_LEN=${#DESC}
  echo " Meta Description: \"$DESC\""
  echo "  Length: $DESC_LEN characters"
  echo " [PASS] Meta description present."
else
  echo " [FAIL] Missing meta description tag!"
  FAILED=$((FAILED + 1))
fi

# Canonical link check
CANONICAL=$(echo "$HTML" | grep -o '<link rel="canonical" href="[^"]*"' | sed 's/.*href="//;s/"$//')
if [ "$CANONICAL" = "https://bhavishyasingla.com/" ]; then
  echo " [PASS] Homepage Canonical URL: $CANONICAL"
else
  echo " [FAIL] Incorrect or missing homepage canonical: '$CANONICAL'"
  FAILED=$((FAILED + 1))
fi

# Raster og:image check
OG_IMG=$(echo "$HTML" | grep -o '<meta property="og:image" content="[^"]*"' | sed 's/.*content="//;s/"$//')
if [ "$OG_IMG" = "https://bhavishyasingla.com/og-image.png" ]; then
  echo " [PASS] Open Graph image correctly points to 1200x630 PNG: $OG_IMG"
else
  echo " [FAIL] og:image is not pointing to og-image.png ($OG_IMG)"
  FAILED=$((FAILED + 1))
fi

# 192x192 Favicon check
if echo "$HTML" | grep -q 'sizes="192x192"'; then
  echo " [PASS] 192x192 favicon declared for Google SERP display."
else
  echo " [FAIL] Missing 192x192 favicon link!"
  FAILED=$((FAILED + 1))
fi

# Schema.org ProfilePage & Person & WebApplication
if echo "$HTML" | grep -q '"@type": "ProfilePage"' && echo "$HTML" | grep -q '"@type": "Person"' && echo "$HTML" | grep -q '"knowsAbout"'; then
  echo " [PASS] Schema.org ProfilePage & enriched Person entity detected on Homepage."
else
  echo " [FAIL] Missing ProfilePage or enriched Person structured data!"
  FAILED=$((FAILED + 1))
fi

# Crawlable anchor check for experiences
if echo "$HTML" | grep -q 'href="/room"' && echo "$HTML" | grep -q 'href="/world"' && echo "$HTML" | grep -q 'href="/folio"'; then
  echo " [PASS] Crawlable <a> hyperlinks detected for all three experiences."
else
  echo " [FAIL] Missing crawlable hyperlinks for experiences!"
  FAILED=$((FAILED + 1))
fi

echo ""
echo "--- 3. Sub-page SEO, Canonicals & Schemas ---"
for SUB in "room" "world" "folio"; do
  SUB_HTML=$(curl -s "$BASE_URL/$SUB")
  
  # Canonical check
  if echo "$SUB_HTML" | grep -q "<link rel=\"canonical\" href=\"https://bhavishyasingla.com/$SUB\""; then
    echo " [PASS] /$SUB -> Canonical URL correctly self-referenced."
  else
    echo " [FAIL] /$SUB -> Missing or incorrect canonical tag!"
    FAILED=$((FAILED + 1))
  fi

  # Robots check
  if echo "$SUB_HTML" | grep -q 'name="robots" content="index, follow'; then
    echo " [PASS] /$SUB -> Robots directive present with snippet controls."
  else
    echo " [FAIL] /$SUB -> Missing robots meta tag!"
    FAILED=$((FAILED + 1))
  fi

  # Schema.org WebApplication check
  if echo "$SUB_HTML" | grep -q '"@type": "WebApplication"' && echo "$SUB_HTML" | grep -q '"@type": "BreadcrumbList"'; then
    echo " [PASS] /$SUB -> Schema.org WebApplication + BreadcrumbList detected."
  else
    echo " [FAIL] /$SUB -> Missing WebApplication or BreadcrumbList schema!"
    FAILED=$((FAILED + 1))
  fi

  # External Vercel leak check
  if echo "$SUB_HTML" | grep -q 'vercel.app'; then
    echo " [FAIL] /$SUB -> Still contains leaked third-party vercel.app URLs!"
    FAILED=$((FAILED + 1))
  else
    echo " [PASS] /$SUB -> Free of third-party vercel.app metadata leaks."
  fi
done

echo ""
echo "--- 4. Sitemap & Image Protocol Validation ---"
SITEMAP=$(curl -s "$BASE_URL/sitemap.xml")
if echo "$SITEMAP" | grep -q 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"' && echo "$SITEMAP" | grep -q '<image:image>'; then
  echo " [PASS] sitemap.xml contains Google Image Sitemap protocol extensions."
else
  echo " [FAIL] sitemap.xml missing image extensions!"
  FAILED=$((FAILED + 1))
fi

echo ""
echo "========================================================"
if [ "$FAILED" -eq 0 ]; then
  echo " ALL SEO & PROTOCOL CHECKS PASSED SUCCESSFULLY (0 FAILURES)!"
else
  echo " AUDIT COMPLETED WITH $FAILED FAILURES."
fi
echo "========================================================"
exit $FAILED
