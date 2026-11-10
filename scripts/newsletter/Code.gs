/**
 * bhavishyasingla.com — Email sign-up backend (Google Apps Script)
 *
 * Lives in the "bhavishyasingla.com" Google Sheet (Extensions → Apps Script).
 * Deployed as a Web App: Execute as "Me", access "Anyone".
 *
 * When someone subscribes from the website it:
 *   1. validates the address and ignores bots (honeypot + rate limit)
 *   2. adds a row to the sheet (or does nothing if they're already on the list)
 *   3. emails the subscriber a personal thank-you from Bhavishya
 *   4. emails Bhavishya a "new subscriber" notification
 *
 * To unsubscribe someone, set their Status cell to "Unsubscribed".
 * This file is a copy kept in the repo (scripts/newsletter/Code.gs); the live one is in Apps Script.
 */

const CONFIG = {
  OWNER_EMAIL: 'bhavishyasingla2005@gmail.com',
  OWNER_NAME: 'Bhavishya Singla',
  SITE_URL: 'https://bhavishyasingla.com',
  AVATAR_URL: 'https://bhavishyasingla.com/favicon-192x192.png',
  SHEET_NAME: 'Sheet1',
  NEWSLETTER_URL: 'https://www.linkedin.com/newsletters/ai-this-week-7353859555715436544/',
  LINKEDIN_URL: 'https://www.linkedin.com/in/bhavishyasingla1/',
  X_URL: 'https://x.com/Bhavishyas_1',
  YOUTUBE_URL: 'https://www.youtube.com/@bhavishyasingla1',
  MAX_SIGNUPS_PER_MINUTE: 20
};

const HEADERS = ['Subscribed at', 'Email', 'Signed up from', 'Status', 'Notes'];

/* ───────────────────────── web endpoints ───────────────────────── */

function doPost(e) {
  try {
    const data = parseBody_(e);

    // Bots fill every field; people never see this one
    if (data.company) return json_({ ok: true });

    const email = String(data.email || '').trim().toLowerCase();
    if (!isValidEmail_(email)) return json_({ ok: false, error: 'invalid_email' });

    const source = sanitizeSource_(data.source);

    if (isRateLimited_(email)) return json_({ ok: false, error: 'rate_limited' });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    let isNew;
    try {
      isNew = addSubscriber_(email, source);
    } finally {
      lock.releaseLock();
    }

    if (!isNew) return json_({ ok: true, status: 'already_subscribed' });

    sendThankYou_(email);
    notifyOwner_(email, source);
    return json_({ ok: true, status: 'subscribed' });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: 'server_error' });
  }
}

function doGet() {
  return json_({ ok: true, service: 'bhavishyasingla.com newsletter' });
}

/* ───────────────────────── sheet ───────────────────────── */

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME) || ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

/** Returns true if the email was added, false if it was already on the list. */
function addSubscriber_(email, source) {
  const sheet = getSheet_();
  const last = sheet.getLastRow();
  if (last > 1) {
    const rows = sheet.getRange(2, 2, last - 1, 3).getValues(); // Email, Source, Status
    for (let i = 0; i < rows.length; i++) {
      if (String(rows[i][0]).trim().toLowerCase() === email) {
        // Someone who unsubscribed and signs up again is re-activated
        if (String(rows[i][2]).toLowerCase() === 'unsubscribed') {
          sheet.getRange(i + 2, 4).setValue('Subscribed');
          sheet.getRange(i + 2, 5).setValue('Re-subscribed ' + new Date().toISOString().slice(0, 10));
          return true;
        }
        return false;
      }
    }
  }
  sheet.appendRow([new Date(), email, source, 'Subscribed', '']);
  return true;
}

function subscriberCount_() {
  const sheet = getSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return 0;
  return sheet
    .getRange(2, 4, last - 1, 1)
    .getValues()
    .filter((r) => String(r[0]).toLowerCase() !== 'unsubscribed').length;
}

/* ───────────────────────── emails ───────────────────────── */

function sendThankYou_(email) {
  const subject = 'Thank you for subscribing, from Bhavishya';
  const text = [
    'Hi,',
    '',
    "Thank you so much for subscribing. It genuinely means a lot that you'd let me into your inbox.",
    '',
    "My promise: no spam, ever. I'll only write when there's something worth your time, like a new article, a guide, a project I've shipped, or a GitHub repository I think you'll love.",
    '',
    "If you ever want to stop hearing from me, just reply to this email and I'll take you off the list. No hard feelings.",
    '',
    'While you wait for the next one:',
    'Articles: ' + CONFIG.SITE_URL + '/articles/',
    'AI This Week (weekly on LinkedIn): ' + CONFIG.NEWSLETTER_URL,
    '',
    'Thanks again,',
    'Bhavishya Singla',
    CONFIG.SITE_URL
  ].join('\n');

  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: text,
    htmlBody: thankYouHtml_(),
    name: CONFIG.OWNER_NAME,
    replyTo: CONFIG.OWNER_EMAIL
  });
}

function notifyOwner_(email, source) {
  const total = subscriberCount_();
  const sheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();
  const when = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'd MMM yyyy, h:mm a') + ' IST';

  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAIL,
    subject: 'New subscriber: ' + email,
    body: [
      'New subscriber on bhavishyasingla.com',
      '',
      'Email: ' + email,
      'Signed up from: ' + source,
      'When: ' + when,
      'Total subscribers: ' + total,
      '',
      'Sheet: ' + sheetUrl
    ].join('\n'),
    htmlBody: ownerHtml_(email, source, when, total, sheetUrl),
    name: 'bhavishyasingla.com'
  });
}

/* ───────────────────────── email templates ───────────────────────── */

const INK = '#0c0c0e';
const MUTED = '#6b6b73';
const LINE = '#e4e4e7';
const BG = '#f2f2f4';
const NEON = '#00ff66';
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

function shell_(inner, preheader) {
  return (
    '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="color-scheme" content="light only"></head>' +
    '<body style="margin:0;padding:0;background:' + BG + ';">' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;">' + escape_(preheader) + '</div>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:' + BG + ';">' +
    '<tr><td align="center" style="padding:40px 16px;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ' + LINE + ';">' +
    inner +
    '</table>' +
    '<p style="margin:20px 0 0;font:500 11px/1.6 ' + FONT + ';letter-spacing:0.12em;text-transform:uppercase;color:#a1a1aa;">' +
    '<a href="' + CONFIG.SITE_URL + '" style="color:#a1a1aa;text-decoration:none;">bhavishyasingla.com</a></p>' +
    '</td></tr></table></body></html>'
  );
}

function thankYouHtml_() {
  const p = 'margin:0 0 18px;font:400 16px/1.7 ' + FONT + ';color:#27272a;';
  const button = function (href, label, dark) {
    return (
      '<a href="' + href + '" style="display:inline-block;margin:0 8px 8px 0;padding:13px 18px;' +
      'font:600 12px/1 ' + FONT + ';letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;' +
      (dark ? 'background:' + INK + ';color:#ffffff;border:1px solid ' + INK + ';' : 'background:#ffffff;color:' + INK + ';border:1px solid ' + INK + ';') +
      '">' + label + ' &rarr;</a>'
    );
  };
  const social = function (href, label) {
    return '<a href="' + href + '" style="color:' + MUTED + ';text-decoration:none;margin-right:18px;">' + label + '</a>';
  };

  const inner =
    // Header: avatar + wordmark
    '<tr><td style="padding:32px 36px 0;">' +
    '<table role="presentation" cellpadding="0" cellspacing="0"><tr>' +
    '<td style="vertical-align:middle;"><img src="' + CONFIG.AVATAR_URL + '" width="56" height="56" alt="Bhavishya" style="display:block;border-radius:50%;"></td>' +
    '<td style="vertical-align:middle;padding-left:14px;font:700 12px/1.3 ' + FONT + ';letter-spacing:0.16em;text-transform:uppercase;color:' + INK + ';">Bhavishya Singla' +
    '<div style="font:500 10px/1.6 ' + FONT + ';letter-spacing:0.2em;color:' + MUTED + ';">AI &middot; Technology &middot; Creativity</div></td>' +
    '</tr></table></td></tr>' +
    // Headline
    '<tr><td style="padding:36px 36px 8px;">' +
    '<div style="display:inline-block;padding:3px 7px;margin-bottom:16px;background:' + NEON + ';font:700 10px/1.4 ' + FONT + ';letter-spacing:0.16em;text-transform:uppercase;color:#000;">You&rsquo;re in</div>' +
    '<h1 style="margin:0 0 24px;font:800 34px/1.05 ' + FONT + ';letter-spacing:-0.03em;color:' + INK + ';">Thank you so much.</h1>' +
    '<p style="' + p + '">Hi,</p>' +
    '<p style="' + p + '">Thank you for subscribing. It genuinely means a lot that you&rsquo;d let me into your inbox.</p>' +
    '<p style="' + p + '"><strong style="color:' + INK + ';">My promise: no spam, ever.</strong> I&rsquo;ll only write when there&rsquo;s something worth your time, like a new article, a guide, a project I&rsquo;ve shipped, or a GitHub repository I think you&rsquo;ll love.</p>' +
    '<p style="' + p + '">If you ever want to stop hearing from me, <strong style="color:' + INK + ';">just reply to this email</strong> and I&rsquo;ll take you off the list. No hard feelings.</p>' +
    '</td></tr>' +
    // Buttons
    '<tr><td style="padding:8px 36px 28px;">' +
    button(CONFIG.SITE_URL + '/articles/', 'Read the articles', true) +
    button(CONFIG.NEWSLETTER_URL, 'AI This Week', false) +
    '</td></tr>' +
    // Sign-off
    '<tr><td style="padding:0 36px 32px;">' +
    '<p style="margin:0;font:400 16px/1.7 ' + FONT + ';color:#27272a;">Thanks again,</p>' +
    '<p style="margin:4px 0 0;font:700 18px/1.4 ' + FONT + ';letter-spacing:-0.01em;color:' + INK + ';">Bhavishya Singla</p>' +
    '</td></tr>' +
    // Footer
    '<tr><td style="padding:20px 36px;border-top:1px solid ' + LINE + ';font:600 11px/1.8 ' + FONT + ';letter-spacing:0.12em;text-transform:uppercase;">' +
    social(CONFIG.LINKEDIN_URL, 'LinkedIn') + social(CONFIG.X_URL, 'X') + social(CONFIG.YOUTUBE_URL, 'YouTube') +
    '</td></tr>';

  return shell_(inner, 'No spam, ever. Only the important updates, and you can opt out by replying.');
}

function ownerHtml_(email, source, when, total, sheetUrl) {
  const row = function (label, value) {
    return (
      '<tr><td style="padding:12px 0;border-bottom:1px solid ' + LINE + ';font:600 10px/1.4 ' + FONT + ';letter-spacing:0.16em;text-transform:uppercase;color:' + MUTED + ';width:140px;">' + label + '</td>' +
      '<td style="padding:12px 0;border-bottom:1px solid ' + LINE + ';font:500 15px/1.4 ' + FONT + ';color:' + INK + ';">' + value + '</td></tr>'
    );
  };
  const inner =
    '<tr><td style="padding:32px 36px 8px;">' +
    '<div style="display:inline-block;padding:3px 7px;margin-bottom:16px;background:' + NEON + ';font:700 10px/1.4 ' + FONT + ';letter-spacing:0.16em;text-transform:uppercase;color:#000;">New subscriber</div>' +
    '<h1 style="margin:0 0 8px;font:800 26px/1.15 ' + FONT + ';letter-spacing:-0.02em;color:' + INK + ';word-break:break-all;">' + escape_(email) + '</h1>' +
    '<p style="margin:0 0 20px;font:400 14px/1.6 ' + FONT + ';color:' + MUTED + ';">just joined your list. A thank-you email has been sent to them.</p>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' +
    row('Signed up from', escape_(source)) +
    row('When', escape_(when)) +
    row('Total subscribers', String(total)) +
    '</table></td></tr>' +
    '<tr><td style="padding:20px 36px 32px;">' +
    '<a href="' + sheetUrl + '" style="display:inline-block;padding:13px 18px;background:' + INK + ';color:#fff;font:600 12px/1 ' + FONT + ';letter-spacing:0.14em;text-transform:uppercase;text-decoration:none;">Open the sheet &rarr;</a>' +
    '</td></tr>';
  return shell_(inner, email + ' subscribed from ' + source);
}

/* ───────────────────────── helpers ───────────────────────── */

function parseBody_(e) {
  if (!e) return {};
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      /* fall through to form parameters */
    }
  }
  return e.parameter || {};
}

function isValidEmail_(email) {
  return email.length <= 254 && /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[a-z]{2,}$/i.test(email);
}

function sanitizeSource_(source) {
  const s = String(source || '').trim();
  if (!s) return CONFIG.SITE_URL;
  // Only record pages on this site
  if (s.indexOf(CONFIG.SITE_URL) === 0 || s.charAt(0) === '/') return s.slice(0, 300);
  if (/^https?:\/\/(localhost|127\.0\.0\.1)/.test(s)) return s.slice(0, 300);
  return 'unknown';
}

function isRateLimited_(email) {
  const cache = CacheService.getScriptCache();
  const perEmail = 'e:' + email;
  if (cache.get(perEmail)) return true;
  cache.put(perEmail, '1', 60);

  const minuteKey = 'm:' + Math.floor(Date.now() / 60000);
  const count = Number(cache.get(minuteKey) || 0) + 1;
  cache.put(minuteKey, String(count), 120);
  return count > CONFIG.MAX_SIGNUPS_PER_MINUTE;
}

function escape_(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ───────────────────────── manual tools (run from the editor) ───────────────────────── */

/** Run once from the editor to grant permissions and preview both emails in your own inbox. */
function sendTestEmails() {
  sendThankYou_(CONFIG.OWNER_EMAIL);
  notifyOwner_('test-subscriber@example.com', CONFIG.SITE_URL + '/articles/ (test)');
}
