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
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  
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
if [ -n "$CANONICAL" ]; then
  echo " [PASS] Canonical URL: $CANONICAL"
else
  echo " [FAIL] Missing canonical link tag!"
  FAILED=$((FAILED + 1))
fi

# Schema.org JSON-LD check
if echo "$HTML" | grep -q 'application/ld+json'; then
  echo " [PASS] Schema.org JSON-LD structured data detected."
else
  echo " [FAIL] Missing Schema.org JSON-LD structured data!"
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
echo "========================================================"
if [ "$FAILED" -eq 0 ]; then
  echo " ALL SEO & PROTOCOL CHECKS PASSED SUCCESSFULLY!"
else
  echo " AUDIT COMPLETED WITH $FAILED FAILURES."
fi
echo "========================================================"
exit $FAILED
