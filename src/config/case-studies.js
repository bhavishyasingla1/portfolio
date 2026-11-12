/**
 * Case-study content for the project pages, keyed by project slug.
 * Feeds scripts/build-pages.js. Screenshot names refer to public/projects/shots/manifest.json
 * (made by scripts/shots/process.js from real captures of each product).
 *
 * Only write what the product sites themselves say. No invented numbers.
 */

export const CASE_STUDIES = {
  ringping: {
    tone: 'dark',
    captured: '2026-11-12',
    lead: {
      shot: 'ringping-hero',
      alt: 'Ring Ping home page: “Reminders you can’t ignore” beside a phone showing an incoming Ring Ping call',
      caption: 'The home page. The phone on the right is a live demo of the call screen.'
    },
    phone: { shot: 'ringping-mobile', alt: 'Ring Ping on a phone: the incoming call screen with Cola the koala' },
    why: {
      title: 'A notification is easy to miss. A phone call is not.',
      paras: [
        'A reminder notification buzzes once, lands in a tray with forty others and is gone by the time it matters. A call is different. It takes over the screen, it makes noise and it keeps going until you deal with it.',
        'Ring Ping turns a reminder into that call. At the set minute your Android phone rings full screen, even when it is locked, and Cola, the koala assistant, reads the reminder out loud. Miss it and she calls back.'
      ]
    },
    steps: [
      ['Add a reminder', 'Tap + or just tell Cola: “wake me up at 6:30 on weekdays”.'],
      ['Your phone rings', 'At that minute the phone rings full screen, even when it is locked.'],
      ['Answer and get it done', 'Cola reads the reminder out loud. Missed it? She calls back.']
    ],
    shots: [
      { shot: 'ringping-callbacks', title: 'Call-backs', caption: 'A missed call is tried again a few minutes later. One tap on “Don’t call back” ends it.', alt: 'Three calls in a row: two missed, the third answered, with a Don’t call back button' },
      { shot: 'ringping-calendar', title: 'A calendar you already know', caption: 'Month, week, day and schedule views, with repeats.', alt: 'Ring Ping calendar for November with a reminder to call mom at 7 PM' },
      { shot: 'ringping-alarms', title: 'Alarms that call you', caption: 'Wake up, medicine, gym. Pick the days and a melody.', alt: 'Three alarm cards: 6:30 AM wake up, 8:00 PM medicine, 7:00 AM gym' },
      { shot: 'ringping-heycola', title: 'Hey Cola, hands-free', caption: 'Say her name and she listens, even on a locked phone.', alt: 'Locked phone at 7:02 answering “Hey Cola, what’s on today?”' },
      { shot: 'ringping-askcola', title: 'Change plans in plain words', caption: 'Cola shows exactly what will change and waits for your OK.', alt: 'Chat asking to move the dentist to Friday, with Change it and Keep it buttons' },
      { shot: 'ringping-languages', title: '15 languages', caption: 'Keep the app in English and let Cola speak Hindi, or any mix.', alt: 'Language list: English, Chinese, Hindi, Spanish, Arabic, French, Bengali, Portuguese, Russian, Urdu' }
    ],
    decisions: [
      ['Call back, don’t nag', 'A second notification is as easy to ignore as the first. A second call is not. Three tries by default, and you can change that for each reminder.'],
      ['Free, with no ads', 'No ads and no subscriptions. It runs fully offline on Android. An account is optional and only adds web sync and backup.'],
      ['Words before forms', '“Move my dentist to Friday” is faster than five taps. Cola shows the change before she makes it, and every change can be undone.'],
      ['Easy to share', 'A reminder can be sent as a link on WhatsApp. The person taps Add and Cola calls them too, with no account needed to open it.']
    ],
    related: ['brag-launch-videos']
  },

  rankkiwi: {
    tone: 'dark',
    captured: '2026-11-12',
    lead: {
      shot: 'rankkiwi-youtube',
      alt: 'Rank Kiwi panel over a YouTube channel listing videos sorted by Outlier Score, with a multiplier on each',
      caption: 'Rank Kiwi on a YouTube channel: 25 videos sorted by Outlier Score, ready to export.'
    },
    why: {
      title: 'A view count means nothing without the creator’s normal.',
      paras: [
        'Half a million views is a hit for one creator and a flop for another. The useful question is how a video did against what that creator usually gets.',
        'Most tools that answer it charge $15 to $99 a month. I built Rank Kiwi for myself because I refused to pay a subscription just to see which videos beat a creator’s median. It scans the Reels or videos on the page, works out the median, and shows how many times each one beat it.'
      ]
    },
    steps: [
      ['Open any creator', 'An Instagram Reels tab or a YouTube channel’s videos.'],
      ['Scan what’s on the page', 'Rank Kiwi gathers the view counts and works out the median.'],
      ['Sort by outliers', 'Spot the 3× to 10× spikes and export them to a spreadsheet.']
    ],
    shots: [
      { shot: 'rankkiwi-instagram', title: 'Starts from the toolbar', caption: 'Open a creator’s Reels tab and press Open Reels.', alt: 'Rank Kiwi popup open over an Instagram profile' },
      { shot: 'rankkiwi-score', title: 'The Outlier Score', caption: 'Views divided by the creator’s median. 1× is normal, 5× and up is a breakout.', alt: 'Bar chart of five posts against a 1.0× median baseline, the fifth marked as a 5.8× outlier' },
      { shot: 'rankkiwi-reel', title: 'Reel details', caption: 'Views, likes, comments and the score for one Reel, with its caption.', alt: 'Reel detail card with 1.2M views, 88K likes, 152 comments and a 1.0× outlier score' },
      { shot: 'rankkiwi-filters', title: 'Filters and sorting', caption: 'Narrow by views, likes, comments or score.', alt: 'Filter panel with a histogram and a min and max range' },
      { shot: 'rankkiwi-transcription', title: 'Reel transcripts', caption: 'Spoken audio as timestamped or plain text, using your own Groq key.', alt: 'Transcript panel listing timestamped lines from a Reel' },
      { shot: 'rankkiwi-video', title: 'YouTube video details', caption: 'The same breakdown for long-form videos and Shorts.', alt: 'YouTube video detail card with views, likes, comments and outlier score' }
    ],
    decisions: [
      ['Median, not average', 'One viral post drags an average up and makes everything else look weak. The median is the creator’s real normal, so a score of 3× means the same thing on a small channel and a huge one.'],
      ['It runs in your browser', 'There is no login and no password to hand over. The extension reads what is already on the page you opened.'],
      ['Free, with no paid tier', 'It was built to avoid a subscription, so it does not have one.'],
      ['Export first', 'Research ends up in a spreadsheet anyway. One click gives Excel or CSV, or rows you can paste into Google Sheets, Notion or Airtable.']
    ],
    related: ['brag-launch-videos']
  },

  linkedinrank: {
    tone: 'light',
    captured: '2026-11-12',
    lead: {
      shot: 'linkedinrank-hero',
      alt: 'LinkedInRank home page with a box to drop your LinkedIn PDF and three steps below it',
      caption: 'The whole product starts here: drop the PDF export of your profile.'
    },
    phone: { shot: 'linkedinrank-mobile', alt: 'LinkedInRank on a phone with the Upload LinkedIn PDF button' },
    why: {
      title: 'Most LinkedIn advice is too vague to act on.',
      paras: [
        '“Add keywords. Tell your story. Show your passion.” None of that says what a recruiter’s search actually matches, or what they see in the first line on a phone.',
        'LinkedInRank reads the PDF export of a profile and checks it against 30+ signals recruiters filter by: the job title in the headline, the first 120 characters shown on mobile, numbers in experience bullets and the core skills. Then it writes the fixes.'
      ]
    },
    steps: [
      ['Export your profile', 'LinkedIn can save any profile as a PDF.'],
      ['Drop the file', 'It is read in memory. Nothing is stored.'],
      ['Get the audit', 'A score for each signal, with rewrites for the weak parts.']
    ],
    shots: [
      { shot: 'linkedinrank-benchmark', title: 'Scored against a benchmark', caption: 'Each part of the profile is compared with a strong one.', alt: 'Headline discoverability benchmark with three bars at 96%, 64% and 48%' },
      { shot: 'linkedinrank-beforeafter', title: 'Before and after', caption: 'The weak headline, what is wrong with it, and the rewrite.', alt: 'A headline scored 58 out of 100 beside its rewritten version' },
      { shot: 'linkedinrank-studio', title: 'Rewrites, not just scores', caption: 'Headline rewriter, experience metrics and a skill matcher.', alt: 'Three cards: Headline Rewriter, Experience Metric Injection, ATS and Skill Matcher' },
      { shot: 'linkedinrank-tools', title: '13 free tools', caption: 'Generators for headlines, About sections, posts, hooks and more.', alt: 'Grid of thirteen LinkedIn tools' }
    ],
    decisions: [
      ['A PDF, not a login', 'The tool never asks for a LinkedIn password and does not scrape anything. The PDF you export is the only input.'],
      ['Nothing is kept', 'Uploads are processed in temporary memory and never stored, so there is no account to make.'],
      ['Fixes over grades', 'A score on its own is not useful. Every weak signal comes with a suggested rewrite you can paste in.'],
      ['Independent', 'LinkedInRank is not affiliated with or endorsed by LinkedIn Corporation, and the site says so.']
    ],
    related: []
  },

  aithisweek: {
    tone: 'light',
    captured: '2026-11-12',
    lead: null,
    tall: {
      shot: 'aithisweek-page',
      alt: 'The AI This Week newsletter page on LinkedIn, listing recent editions',
      caption: 'The newsletter on LinkedIn.'
    },
    why: {
      title: 'AI moves faster than most people can use it.',
      paras: [
        'There is no shortage of AI news. What is missing, especially for students and people early in their careers, is one idea a week they can act on.',
        'AI This Week is that: a short read on building with AI, getting noticed and finishing what you start. Each edition takes one question and answers it properly.'
      ]
    },
    steps: null,
    shots: [],
    editionsNote: 'Recent editions, straight from LinkedIn.',
    editions: [
      { shot: 'aithisweek-ed1', title: 'Build Something a Creator Will Show Their Audience', url: 'https://www.linkedin.com/pulse/build-something-creator-show-audience-bhavishya-singla-9chrf' },
      { shot: 'aithisweek-ed2', title: 'Get Hired by the Creators You Watch', url: 'https://www.linkedin.com/pulse/get-hired-creators-you-watch-bhavishya-singla-w1sjf' },
      { shot: 'aithisweek-ed3', title: 'Stop Asking AI to Build Your Project. Ask It to Help You Finish One.', url: 'https://www.linkedin.com/pulse/stop-asking-ai-build-your-project-ask-help-you-finish-singla-bj6lf' },
      { shot: 'aithisweek-ed4', title: '“You’ve Exhausted Your Daily Limit.” Here’s How to Keep Going.', url: 'https://www.linkedin.com/pulse/youve-exhausted-your-daily-limit-heres-how-keep-going-singla-ayrvf' },
      { shot: 'aithisweek-ed5', title: 'A Good Project Won’t Guarantee a Hackathon Win. Here’s What Will.', url: 'https://www.linkedin.com/pulse/good-project-wont-guarantee-hackathon-win-heres-what-bhavishya-singla-t3fuf' },
      { shot: 'aithisweek-ed6', title: 'Tests giving stress? These AI hacks are all you need.', url: 'https://www.linkedin.com/pulse/tests-giving-stress-ai-hacks-all-you-need-bhavishya-singla-4ngpf' },
      { shot: 'aithisweek-ed7', title: 'Confused about your X? Let’s sort it out.', url: 'https://www.linkedin.com/pulse/confused-your-x-lets-sort-out-bhavishya-singla-iqxrf' },
      { shot: 'aithisweek-ed8', title: 'Tracking benchmarks won’t get you a job, but these hidden features will.', url: 'https://www.linkedin.com/pulse/tracking-benchmarks-wont-get-you-job-hidden-features-bhavishya-singla-oowqf' }
    ],
    decisions: [
      ['One idea per edition', 'No link round-ups. One question, answered in about five minutes.'],
      ['Written for people starting out', 'Students, builders and early-career professionals, not people who already have a team and a budget.'],
      ['A cover you can spot', 'Every edition gets a black, blue and lime collage, so you recognise it in a busy feed before you read the title.']
    ],
    related: []
  }
};

/** The three 3D worlds. Feeds /worlds/ and the structured data on each world page. */
export const WORLDS = [
  {
    id: 'room',
    num: '01',
    name: 'My Room',
    full: 'My Room in 3D',
    path: '/room/',
    image: '/worlds/room.webp',
    alt: 'An isometric 3D bedroom studio at night with a desk, a lit monitor, a TV and a sofa',
    kind: 'Isometric room',
    summary: 'A small, warmly lit bedroom studio you can spin around. The TV shows my newsletter, the laptop plays my photos and the monitor plays my videos.',
    controls: 'Drag to turn the room. Scroll or pinch to zoom.',
    best: 'Works well on phones',
    original: { name: 'my-room-in-3d', url: 'https://github.com/brunosimon/my-room-in-3d' },
    changes: ['My newsletter on the TV', 'My photos on the laptop', 'My videos on the monitor', 'Fewer props, so it reads as my space']
  },
  {
    id: 'world',
    num: '02',
    name: 'Infinite World',
    full: 'Infinite World',
    path: '/world/',
    image: '/worlds/world.webp',
    alt: 'A 3D character standing in tall grass on rolling hills at dusk',
    kind: 'Endless landscape',
    summary: 'Rolling hills and swaying grass that never end, with a full day and night cycle. The land is generated as you walk.',
    controls: 'Arrow keys or WASD to walk. On a phone, use the arrow pad.',
    best: 'The lightest world, about 1 MB',
    original: { name: 'infinite-world', url: 'https://github.com/brunosimon/infinite-world' },
    changes: ['A rigged 3D character of me, with idle and running animations', 'Lights that follow the character', 'An on-screen arrow pad for phones', 'The character file cut from 23 MB to about half a megabyte']
  },
  {
    id: 'folio',
    num: '03',
    name: 'Playground',
    full: 'Playground',
    path: '/folio/',
    image: '/worlds/playground.webp',
    alt: 'A small red car beside the name BHAVISHYA SINGLA in big 3D letters on an orange floor',
    kind: 'Car physics',
    summary: 'Drive a little car around a toy world with real physics. My name is spelled in letters you can crash into.',
    controls: 'Arrow keys or WASD to drive. On a phone, use the on-screen controls.',
    best: 'Best with a keyboard',
    original: { name: 'folio-2019', url: 'https://github.com/brunosimon/folio-2019', license: 'MIT' },
    changes: ['My name in physical 3D letters', 'A new tagline: AI AT WORK', 'Signs that point to my links', 'A simpler world without the original projects area']
  }
];

export const CONTACT_EMAIL = 'say@hibhavishya.in';
