/**
 * Projects Registry
 *
 * proof (optional): { rating, ratingCount, users, source, asOf, url, cta, badge, quote }
 *   Only put real, publicly checkable numbers here. They feed the proof strip on the
 *   project page and (for ratings) Google's review stars via structured data.
 *
 * Single source of truth for the products Bhavishya has built.
 * Feeds the generated project pages (scripts/build-projects.js).
 * The Explore Projects list in index.html is written by hand, so update it there too when this changes.
 */

export const PROJECTS = [
  {
    slug: 'ringping',
    num: '01',
    name: 'Ring Ping',
    headline: ['RING', 'PING.'],
    domain: 'ringping.space',
    url: 'https://ringping.space/',
    tag: 'Android · Reminders',
    tagline: "Reminders you can't ignore.",
    summary:
      'A reminder app that rings your Android phone like an incoming call when something is due. It goes full screen, even when the phone is locked, and calls back until you act.',
    audience:
      'Anyone who misses notifications, including many people with ADHD. It covers medicine, wake-ups, meetings, bills, workouts and calling family.',
    category: 'LifestyleApplication',
    os: 'Android, Web',
    facts: [
      ['Platform', 'Android + Web'],
      ['Price', 'Free, no ads'],
      ['Languages', '15 voices'],
      ['Account', 'Optional']
    ],
    features: [
      ['Rings like a real call', 'Full-screen call that keeps ringing until you act, even on a locked phone.'],
      ['Call-backs', 'Missed it? Ring Ping calls back. Three tries by default, adjustable per reminder.'],
      ['Ask Cola', 'An assistant that creates, moves or cancels reminders from plain words or your voice. Hands-free with "Hey Cola".'],
      ['Calendar & repeats', 'Month, week, day and schedule views with daily, weekday, weekly, monthly and yearly repeats.'],
      ['Share with family', 'Send a reminder as a link. No account needed to open it.'],
      ['Works offline', 'Runs fully offline on Android. Optional free account for web sync and backup.']
    ],
    logo: '/projects/ringping.webp',
    logoPng: '/projects/ringping.png',
    // Proof: only real, checkable numbers. Update when they grow.
    proof: {
      badge: 'Live on Google Play',
      url: 'https://play.google.com/store/apps/details?id=com.ringping.callreminder',
      cta: 'Get it on Google Play'
    }
  },
  {
    slug: 'rankkiwi',
    num: '02',
    name: 'Rank Kiwi',
    headline: ['RANK', 'KIWI.'],
    domain: 'rankkiwi.com',
    url: 'https://rankkiwi.com/',
    tag: 'Chrome Extension · Creators',
    tagline: 'Find viral outlier content.',
    summary:
      "A Chrome extension that benchmarks every Instagram Reel and YouTube video against the creator's median views, so the posts that broke out stand out instantly.",
    audience:
      'Short-form creators, video editors, YouTubers, channel strategists, social media managers and agencies doing competitor research.',
    category: 'BrowserApplication',
    os: 'Chrome',
    facts: [
      ['Platform', 'Chrome extension'],
      ['Works on', 'Instagram, YouTube'],
      ['Price', 'Free, no paid tiers'],
      ['Account', 'Not required']
    ],
    features: [
      ['Outlier score', "Views divided by the creator's median. Breakouts float to the top, whatever the channel size."],
      ['YouTube scanner', 'Benchmarks long-form videos and Shorts against the channel median and sorts by multiplier.'],
      ['Reels insights', 'Engagement metrics for Reels on Explore and creator profiles.'],
      ['One-click export', 'Excel or CSV, or paste formatted rows straight into Google Sheets, Notion or Airtable.'],
      ['Reel transcripts', 'Turns spoken audio into timestamped or plain-text transcripts with your own Groq key.']
    ],
    logo: '/projects/rankkiwi.webp',
    logoPng: '/projects/rankkiwi.png',
    proof: {
      rating: 5.0,
      ratingCount: 12,
      users: 134,
      source: 'Chrome Web Store',
      asOf: '2026-11-10',
      url: 'https://chromewebstore.google.com/detail/igeifablgmkaiagdbkkimjcnglpdnlbl',
      cta: 'Add to Chrome',
      quote: "I refused to pay a monthly subscription just to see which videos beat a creator's normal."
    }
  },
  {
    slug: 'linkedinrank',
    num: '03',
    name: 'LinkedInRank',
    headline: ['LINKEDIN', 'RANK.'],
    domain: 'linkedinrank.com',
    url: 'https://linkedinrank.com/',
    tag: 'Web App · Careers',
    tagline: 'Recruiter-grade profile audit.',
    summary:
      'Upload your LinkedIn profile as a PDF and get an instant audit across 30+ recruiter signals, plus the exact rewrites to fix what is holding it back.',
    audience:
      'Job seekers and professionals who want to show up and stand out in recruiter searches.',
    category: 'BusinessApplication',
    os: 'Web',
    facts: [
      ['Platform', 'Web'],
      ['Signals', '30+ checks'],
      ['Price', 'Free, no login'],
      ['Privacy', 'Files not stored']
    ],
    features: [
      ['30+ recruiter signals', 'Scores headline positioning, keyword discoverability, About structure, quantified experience and completeness.'],
      ['Keyword gaps', 'Finds the missing keywords and high-intent skills recruiters search for.'],
      ['Rewrites', 'Suggests stronger headlines and experience bullets, with mobile character-cutoff checks.'],
      ['13 free tools', 'Headline and About generators, experience rewriter, keyword analyzer, connection notes, post hooks and more.'],
      ['Private by design', 'Uploads are processed in temporary memory and never stored.']
    ],
    note: 'Independent tool. Not affiliated with or endorsed by LinkedIn Corporation.',
    logo: '/projects/linkedinrank.webp',
    logoPng: '/projects/linkedinrank.png'
  },
  {
    slug: 'aithisweek',
    num: '04',
    name: 'AI This Week',
    headline: ['AI THIS', 'WEEK.'],
    domain: 'LinkedIn newsletter',
    url: 'https://www.linkedin.com/newsletters/ai-this-week-7353859555715436544/',
    cta: 'SUBSCRIBE ON LINKEDIN',
    tag: 'Newsletter · AI & Careers',
    tagline: 'Thrive in the AI era.',
    summary:
      'A weekly LinkedIn newsletter for ambitious professionals. Practical playbooks on building with AI, finishing projects, winning hackathons and getting hired.',
    audience:
      'Students, builders and early-career professionals who want to use AI to grow faster.',
    schemaType: 'Periodical',
    facts: [
      ['Format', 'LinkedIn newsletter'],
      ['Cadence', 'Weekly'],
      ['Editions', '5 so far'],
      ['Price', 'Free']
    ],
    featuresLabel: 'Recent editions',
    features: [
      ['Build Something a Creator Will Show Their Audience', 'Nov 6, 2026'],
      ['Get Hired by the Creators You Watch', 'Oct 29, 2026'],
      ['Stop Asking AI to Build Your Project. Ask It to Help You Finish One.', 'Oct 16, 2026'],
      ['"You\'ve Exhausted Your Daily Limit." Here\'s How to Keep Going.', 'Oct 9, 2026'],
      ["A Good Project Won't Guarantee a Hackathon Win. Here's What Will.", 'Oct 4, 2026']
    ],
    logo: '/projects/aithisweek.webp',
    logoPng: '/projects/aithisweek.png',
    logoCover: true
  }
];
