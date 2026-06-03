import type { Event } from '@/lib/types';

type UtmTouchpoint = {
  label: string;
  source: string;
  medium: string;
};

const defaultUtmTouchpoints: UtmTouchpoint[] = [
  { label: 'Booth QR', source: 'booth', medium: 'qr' },
  { label: 'Postcard QR', source: 'postcard', medium: 'qr' },
  { label: 'Tabletop Sign QR', source: 'tabletop', medium: 'qr' },
  { label: 'TV Demo Loop QR', source: 'tvloop', medium: 'qr' },
  { label: 'LinkedIn Post', source: 'linkedin', medium: 'social' },
  { label: 'Instagram / Facebook Feed', source: 'instagram_facebook', medium: 'social' },
  { label: 'IG Story', source: 'instagram_story', medium: 'story' },
  { label: 'Follow-Up Email', source: 'email', medium: 'followup' },
];

const buildUtmUrl = (baseUrl: string, campaign: string, source: string, medium: string) =>
  `${baseUrl}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;

const utmTrackingNotes = (
  baseUrl: string,
  campaign: string,
  touchpoints: UtmTouchpoint[] = defaultUtmTouchpoints,
) => `UTM PATTERN

${baseUrl}?utm_source={source}&utm_medium={medium}&utm_campaign=${campaign}

UTM URLS BY ASSET
${touchpoints.map(({ label, source, medium }) => `- ${label}: ${buildUtmUrl(baseUrl, campaign, source, medium)}`).join('\n')}

QR FILENAME PATTERN
domain_utm_source_{source}_utm_medium_{medium}_utm_campaign_${campaign}.svg`;

export const events: Event[] = [
  {
    id: 'caaeyc-2026',
    title: 'CAAEYC Annual Conference & Expo 2026',
    organization: 'California Association for the Education of Young Children',
    date: '2026-03-14',
    endDate: '2026-03-16',
    location: 'Pasadena Convention Center, Pasadena, CA',
    audience: 'Early childhood educators, directors, and administrators across California',
    objective: 'Showcase early education solutions with a full booth presence, distribute branded materials, and generate leads among ECE professionals',
    company: 'WELS',
    presence: 'Full 10x10 booth with tablecloth, banners, and swag distribution',
    status: 'archived',
    progress: 65,
    coverGradient: 'from-violet-500 to-purple-700',
    notes: 'Booth #412 confirmed. Need to finalize swag bag items and ensure banner prints arrive by Feb 28. Hotel block closes Feb 1.',
    tags: ['early-education', 'california', 'expo', 'booth', 'spring'],
    links: [
      { label: 'Conference Website', url: 'https://www.caaeyc.org/conference' },
      { label: 'Booth Registration', url: 'https://www.caaeyc.org/exhibitors' },
      { label: 'Hotel Block', url: 'https://marriott.com/lax' },
    ],
    contacts: [
      { name: 'Maria Santos', role: 'Event Coordinator', email: 'msantos@caaeyc.org' },
      { name: 'James Thornton', role: 'WELS Account Manager', email: 'jthornton@wels.com' },
      { name: 'Linda Park', role: 'Print Vendor Contact', email: 'linda@printpro.com' },
    ],
    deadlines: [
      { id: 'dl-c1', title: 'Banner design finalized', date: '2026-02-10', type: 'design', done: true },
      { id: 'dl-c2', title: 'Tablecloth artwork approved', date: '2026-02-14', type: 'review', done: true },
      { id: 'dl-c3', title: 'All print files to vendor', date: '2026-02-28', type: 'print', done: false },
      { id: 'dl-c4', title: 'Swag shipped to Pasadena hotel', date: '2026-03-08', type: 'shipping', done: false },
      { id: 'dl-c5', title: 'CAAEYC Conference', date: '2026-03-14', type: 'conference', done: false },
      { id: 'dl-c6', title: 'Post-event asset archive', date: '2026-03-20', type: 'other', done: false },
    ],
    assets: [
      {
        id: 'a-c1',
        title: '10ft Backdrop Banner',
        type: 'banner',
        previewColor: 'bg-violet-500',
        aspectRatio: '10/3',
        status: 'approved',
        notes: 'Horizontal banner for back of booth wall',
        tags: ['booth', 'print', 'banner'],
        mapPosition: { x: 80, y: 60 },
      },
      {
        id: 'a-c2',
        title: 'Pull-Up Retractable Banner',
        type: 'banner',
        previewColor: 'bg-purple-600',
        aspectRatio: '1/3',
        status: 'approved',
        notes: 'Tall vertical pull-up for booth entrance',
        tags: ['booth', 'print'],
        mapPosition: { x: 300, y: 80 },
      },
      {
        id: 'a-c3',
        title: 'Booth Tablecloth',
        type: 'tablecloth',
        previewColor: 'bg-indigo-500',
        aspectRatio: '2/1',
        status: 'approved',
        notes: '6ft table throw with logo front and center',
        tags: ['booth', 'print', 'table'],
        mapPosition: { x: 500, y: 200 },
      },
      {
        id: 'a-c5',
        title: 'QR Code — General Follow-Up',
        type: 'qr',
        previewColor: 'bg-slate-700',
        aspectRatio: '1/1',
        status: 'delivered',
        notes: 'QR asset used on postcard and tablecloth. No dedicated landing page or Mautic form is tracked for this event.',
        tags: ['digital', 'qr'],
        mapPosition: { x: 900, y: 300 },
      },
      {
        id: 'a-c6',
        title: 'Postcard Handout',
        type: 'postcard',
        previewColor: 'bg-fuchsia-500',
        aspectRatio: '3/2',
        status: 'in-design',
        notes: '4x6 postcard for booth handout — needs QR and copy finalized',
        tags: ['print', 'postcard', 'handout'],
        mapPosition: { x: 140, y: 350 },
      },
      {
        id: 'a-c7',
        title: 'Social Media — Event Announcement',
        type: 'social',
        previewColor: 'bg-pink-500',
        aspectRatio: '1/1',
        status: 'delivered',
        notes: 'Instagram + Facebook square post announcing attendance',
        tags: ['social', 'digital', 'instagram'],
        mapPosition: { x: 400, y: 420 },
      },
      {
        id: 'a-c8',
        title: 'Swag — Tote Bag Mockup',
        type: 'swag',
        previewColor: 'bg-amber-500',
        aspectRatio: '4/5',
        status: 'review',
        notes: 'Canvas tote with WELS logo — 200 qty',
        tags: ['swag', 'mockup', 'giveaway'],
        mapPosition: { x: 650, y: 480 },
      },
      {
        id: 'a-c9',
        title: 'Company Logo (Conference version)',
        type: 'logo',
        previewColor: 'bg-violet-700',
        aspectRatio: '3/1',
        status: 'approved',
        notes: 'Horizontal lockup for conference use, white and full-color variants',
        tags: ['logo', 'brand'],
        mapPosition: { x: 900, y: 560 },
      },
    ],
  },

  {
    id: 'annual-summit-2026',
    title: 'Annual Summit 2026',
    organization: 'BWELZ National Network',
    date: '2026-04-22',
    endDate: '2026-04-24',
    location: 'Orange County Convention Center, Orlando, FL',
    audience: 'Family childcare providers, network coordinators, and policy advocates',
    objective: 'Reinforce brand presence among network partners, unveil new platform features, and collect feedback from active users',
    company: 'BWELZ',
    presence: 'Sponsored breakout session + 10x20 exhibit hall booth',
    status: 'archived',
    progress: 30,
    coverGradient: 'from-orange-400 to-rose-600',
    notes: 'Breakout session confirmed for April 23 at 2pm. Need slide deck template and speaker bio for agenda. Exhibit hall booth adjacent to main entrance.',
    tags: ['summit', 'florida', 'network', 'booth', 'spring'],
    links: [
      { label: 'Summit Website', url: 'https://bwelz.org/summit2026' },
      { label: 'Speaker Portal', url: 'https://bwelz.org/speakers' },
    ],
    contacts: [
      { name: 'Darnell Brooks', role: 'Summit Director', email: 'dbrooks@bwelz.org' },
      { name: 'Priya Nair', role: 'BWELZ Marketing Lead', email: 'pnair@bwelz.com' },
    ],
    deadlines: [
      { id: 'dl-s1', title: 'Slide deck template designed', date: '2026-03-15', type: 'design', done: false },
      { id: 'dl-s2', title: 'Banner design review', date: '2026-03-28', type: 'review', done: false },
      { id: 'dl-s3', title: 'Print files submitted', date: '2026-04-05', type: 'print', done: false },
      { id: 'dl-s4', title: 'Materials shipped to Orlando', date: '2026-04-15', type: 'shipping', done: false },
      { id: 'dl-s5', title: 'Annual Summit 2026', date: '2026-04-22', type: 'conference', done: false },
    ],
    assets: [
      {
        id: 'a-s1',
        title: 'Booth Backdrop 10x20',
        type: 'banner',
        previewColor: 'bg-orange-500',
        aspectRatio: '20/6',
        status: 'in-design',
        notes: 'Wide-format backdrop for large booth',
        tags: ['booth', 'banner', 'print'],
        mapPosition: { x: 60, y: 80 },
      },
      {
        id: 'a-s2',
        title: 'Breakout Session Slides',
        type: 'pdf',
        previewColor: 'bg-rose-500',
        aspectRatio: '16/9',
        status: 'pending',
        notes: 'Slide template + speaker content for breakout',
        tags: ['slides', 'presentation', 'digital'],
        mapPosition: { x: 350, y: 100 },
      },
      {
        id: 'a-s3',
        title: 'Pull-Up Banner — Feature Announcement',
        type: 'banner',
        previewColor: 'bg-amber-500',
        aspectRatio: '1/3',
        status: 'pending',
        notes: 'Highlight new platform features for summit audience',
        tags: ['banner', 'booth'],
        mapPosition: { x: 600, y: 80 },
      },
      {
        id: 'a-s4',
        title: 'Social — Summit Attendance Post',
        type: 'social',
        previewColor: 'bg-pink-400',
        aspectRatio: '1/1',
        status: 'pending',
        notes: 'Pre-event social post for LinkedIn + Instagram',
        tags: ['social', 'digital'],
        mapPosition: { x: 100, y: 350 },
      },
      {
        id: 'a-s5',
        title: 'Postcard — Platform Feature Highlight',
        type: 'postcard',
        previewColor: 'bg-orange-400',
        aspectRatio: '3/2',
        status: 'pending',
        notes: '5x7 postcard showcasing top 3 platform features',
        tags: ['print', 'postcard'],
        mapPosition: { x: 420, y: 380 },
      },
      {
        id: 'a-s6',
        title: 'QR Code — App Download',
        type: 'qr',
        previewColor: 'bg-slate-600',
        aspectRatio: '1/1',
        status: 'pending',
        notes: 'QR to app store download page',
        tags: ['qr', 'digital'],
        mapPosition: { x: 700, y: 420 },
      },
      {
        id: 'a-s7',
        title: 'Tablecloth — BWELZ Branded',
        type: 'tablecloth',
        previewColor: 'bg-rose-600',
        aspectRatio: '2/1',
        status: 'pending',
        notes: '6ft stretch tablecloth in brand colors',
        tags: ['booth', 'print', 'table'],
        mapPosition: { x: 900, y: 200 },
      },
    ],
  },

  {
    id: 'smart-start-2026',
    title: 'Smart Start Conference',
    organization: 'Smart Start NC',
    date: '2026-05-08',
    endDate: '2026-05-09',
    location: 'Raleigh Convention Center, Raleigh, NC',
    audience: 'Early childhood coalition members, county partners, funders, and policymakers',
    objective: 'Establish PreK.Club as a trusted platform for NC early childhood networks; generate partnership inquiries',
    company: 'PreK.Club',
    presence: 'Exhibitor table in networking hall',
    status: 'archived',
    progress: 20,
    coverGradient: 'from-emerald-400 to-teal-600',
    notes: 'Table in networking hall (not full booth). Simple setup — tablecloth, signage, and postcard stack. Budget is limited.',
    tags: ['north-carolina', 'early-childhood', 'coalition', 'spring'],
    links: [
      { label: 'Smart Start Conference', url: 'https://smartstart.org/conference' },
    ],
    contacts: [
      { name: 'Tamara Wells', role: 'Conference Chair', email: 'twells@smartstart.org' },
      { name: 'Oscar Reeves', role: 'PreK.Club Partner Lead', email: 'oreeves@prek.club' },
    ],
    deadlines: [
      { id: 'dl-ss1', title: 'Table signage designed', date: '2026-04-10', type: 'design', done: false },
      { id: 'dl-ss2', title: 'Postcard copy approved', date: '2026-04-18', type: 'review', done: false },
      { id: 'dl-ss3', title: 'Print files sent', date: '2026-04-25', type: 'print', done: false },
      { id: 'dl-ss4', title: 'Smart Start Conference', date: '2026-05-08', type: 'conference', done: false },
    ],
    assets: [
      {
        id: 'a-ss1',
        title: 'Table Sign — PreK.Club Intro',
        type: 'banner',
        previewColor: 'bg-emerald-500',
        aspectRatio: '4/3',
        status: 'pending',
        notes: 'Countertop table sign for exhibitor table',
        tags: ['signage', 'print', 'table'],
        mapPosition: { x: 80, y: 100 },
      },
      {
        id: 'a-ss2',
        title: 'Postcard — What is PreK.Club?',
        type: 'postcard',
        previewColor: 'bg-teal-500',
        aspectRatio: '3/2',
        status: 'pending',
        notes: 'Intro postcard with QR code to sign-up page',
        tags: ['print', 'postcard', 'intro'],
        mapPosition: { x: 320, y: 150 },
      },
      {
        id: 'a-ss3',
        title: 'QR Code — Signup Flow',
        type: 'qr',
        previewColor: 'bg-slate-600',
        aspectRatio: '1/1',
        status: 'pending',
        notes: 'QR to prek.club/smartstart registration flow',
        tags: ['qr', 'digital'],
        mapPosition: { x: 550, y: 200 },
      },
      {
        id: 'a-ss4',
        title: 'Social — NC Conference Announcement',
        type: 'social',
        previewColor: 'bg-green-500',
        aspectRatio: '1/1',
        status: 'pending',
        notes: 'LinkedIn post targeting NC early childhood network',
        tags: ['social', 'digital'],
        mapPosition: { x: 100, y: 400 },
      },
      {
        id: 'a-ss5',
        title: 'Tablecloth — PreK.Club Green',
        type: 'tablecloth',
        previewColor: 'bg-emerald-600',
        aspectRatio: '2/1',
        status: 'pending',
        notes: '6ft table throw in PreK.Club brand green',
        tags: ['booth', 'print'],
        mapPosition: { x: 700, y: 350 },
      },
      {
        id: 'a-ss6',
        title: 'One-pager PDF — Platform Overview',
        type: 'pdf',
        previewColor: 'bg-teal-400',
        aspectRatio: '8.5/11',
        status: 'pending',
        notes: 'Printable one-pager for county coordinators',
        tags: ['pdf', 'print', 'overview'],
        mapPosition: { x: 950, y: 150 },
      },
    ],
  },

  {
    id: 'face-cuba-2026',
    title: 'FACE Excellence Awards Luncheon',
    organization: 'Facts About Cuban Exiles (FACE)',
    date: '2026-06-03',
    location: 'The Loews Hotel, 2950 Coconut Grove Drive, Coral Gables, FL 33134',
    audience: 'South Florida civic, business, cultural, and Cuban-American community leaders',
    objective: 'Present ZipData cybersecurity services to FACE attendees and capture qualified business leads through the event landing page',
    company: 'ZipData.net',
    presence: 'Partner / sponsor landing page and lead capture form',
    status: 'ready',
    progress: 70,
    coverGradient: 'from-emerald-500 to-slate-900',
    notes: `FACE Excellence Awards Luncheon is scheduled for Wednesday, June 3, 2026, 11:00 AM-2:00 PM.

Carlos M. Valdes invited the team. ZipData is listed as a partner for the event. The dedicated landing page is live at https://zipdata.net/lp/facecuba-2026/ with a cybersecurity services message and Mautic lead capture form.

Landing focus:
- Stop attacks before they succeed
- Protect, detect, recover
- Device protection and 24/7 SOC
- Email protection, cloud app security, employee training, backup, dark web monitoring, and identity protection`,
    tags: ['face', 'cuba', 'zipdata', 'cybersecurity', 'landing', 'lead-generation', 'coral-gables', 'summer'],
    backlog: [
      {
        id: 'bl-face-d1', title: 'Campaign Landing Page',
        category: 'digital', status: 'done', priority: 'high',
        notes: 'Live landing repo exists at af3rr0/facecuba-2026 with public URL https://zipdata.net/lp/facecuba-2026/.',
      },
      {
        id: 'bl-face-d2', title: 'Lead Capture Form QA',
        category: 'digital', status: 'in-progress', priority: 'high',
        missing: ['Confirm Mautic submissions are routing to the right owner', 'Confirm post-submit follow-up process'],
      },
      {
        id: 'bl-face-sys1', title: 'QR & UTM Tracking',
        category: 'system', status: 'todo', priority: 'medium',
        missing: ['Event-specific UTM URLs', 'QR code source file', 'GA4 / conversion tracking confirmation'],
      },
    ],
    links: [
      { label: 'FACE Website', url: 'https://www.facecuba.org/' },
      { label: 'FACE Cuba Landing Page', url: 'https://zipdata.net/lp/facecuba-2026/' },
      { label: 'Landing Repo', url: 'https://github.com/bWelZ/facecuba-2026' },
    ],
    contacts: [
      { name: 'Carlos M. Valdes', role: 'Event owner / inviter', group: 'Internal Team' },
      { name: 'Abel Ferro', role: 'Landing page / technical owner', group: 'Internal Team' },
      { name: 'ZipData Security Specialist', role: 'Lead follow-up owner from landing form', group: 'Internal Team', website: 'zipdata.net' },
    ],
    deadlines: [
      { id: 'dl-face1', title: 'Landing page live', date: '2026-06-02', type: 'design', done: true },
      { id: 'dl-face2', title: 'Lead capture form QA', date: '2026-06-02', type: 'review', done: false },
      { id: 'dl-face3', title: 'FACE Excellence Awards Luncheon', date: '2026-06-03', type: 'conference', done: false },
      { id: 'dl-face4', title: 'Post-event lead export and follow-up', date: '2026-06-04', type: 'other', done: false },
    ],
    assets: [
      {
        id: 'a-face-d1', title: 'FACE Cuba Cybersecurity Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-emerald-600', aspectRatio: '16/9', status: 'delivered',
        iframeUrl: 'https://zipdata.net/lp/facecuba-2026/',
        externalUrl: 'https://zipdata.net/lp/facecuba-2026/',
        notes: 'ZipData cybersecurity services landing page. Repo: bWelZ/facecuba-2026. Public URL: https://zipdata.net/lp/facecuba-2026/.',
        tags: ['digital', 'web', 'landing', 'zipdata', 'cybersecurity'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-face-d2', title: 'Mautic Lead Capture Form',
        type: 'landing', category: 'digital',
        previewColor: 'bg-green-500', aspectRatio: '3/2', status: 'delivered',
        notes: 'Embedded Mautic form zipdatalandingcapture, formId 13, posts to marketing.bwelz.org.',
        tags: ['digital', 'form', 'mautic', 'lead-capture'],
        mapPosition: { x: 845, y: 75 },
      },
      {
        id: 'a-face-c1', title: 'Cybersecurity Services Messaging',
        type: 'copy', category: 'content',
        previewColor: 'bg-slate-800', aspectRatio: '4/3', status: 'approved',
        notes: 'Core message: Stop attacks before they succeed. Protect, detect, recover. Covers SOC, email security, cloud app security, training, backup, dark web monitoring, and identity protection.',
        tags: ['content', 'copy', 'cybersecurity', 'zipdata'],
        mapPosition: { x: 665, y: 240 },
      },
      {
        id: 'a-face-d3', title: 'QR & UTM Tracking URLs',
        type: 'qr', category: 'digital',
        previewColor: 'bg-slate-700', aspectRatio: '1/1', status: 'pending',
        notes: utmTrackingNotes('https://zipdata.net/lp/facecuba-2026/', 'zipdata2026', [
          { label: 'Event Invitation QR', source: 'event_invitation', medium: 'qr' },
          { label: 'Postcard QR', source: 'postcard', medium: 'qr' },
          { label: 'Tabletop Sign QR', source: 'tabletop', medium: 'qr' },
          { label: 'LinkedIn Post', source: 'linkedin', medium: 'social' },
          { label: 'Follow-Up Email', source: 'email', medium: 'followup' },
        ]),
        tags: ['digital', 'qr', 'utm', 'zipdata'],
        mapPosition: { x: 845, y: 240 },
      },
    ],
  },

  {
    id: 'grow-lead-succeed-2026',
    title: 'FACCM & APPLE - Grow. Lead. Succeed. 2026 Conference',
    organization: 'FACCM, APPLE',
    date: '2026-06-19',
    endDate: '2026-06-20',
    location: 'Loews Sapphire Falls Resort, Orlando, FL',
    audience: 'Site Admins, Leadership, Policy Makers',
    objective: 'Reach out to accredited providers in Florida to present a better way to manage their schools enrollments, payments, and communication with parents',
    company: 'PreK.Club',
    presence: 'Onsite',
    status: 'planning',
    progress: 45,
    coverGradient: 'from-blue-400 to-indigo-600',
    notes: `Primary focus: conference sponsorship visibility, provider outreach, and live product demos for PreK.Club.

Onsite team: Heidy Valdes and Natalia Colleti.
Main hall booth placement — high foot traffic expected.

Live demo station required with tablet/laptop setup.
Demo accounts, QR tracking, and lead capture workflow must be prepared before shipment.

Primary goals:
- Generate qualified provider leads
- Schedule demos
- Increase PreK.Club awareness
- Capture conference content for social media and post-event marketing

Repo owner: bWelZ
Repo: bWelZ/playprekclub
Landing: https://play.prek.club/
Mautic formId: 7
Mautic formName: prekclublandingcapture
New QR pattern: https://play.prek.club/?utm_source={source}&utm_medium={medium}&utm_campaign=prekclub2026`,
    tags: ['conference', 'sponsorship', 'prekclub', 'childcare', 'marketing', 'booth', 'demo', 'lead-generation', 'onsite', 'education', 'networking', 'summer'],
    backlog: [
      // SOCIAL
      {
        id: 'bl-g-s1', title: 'LinkedIn Sponsor Post',
        category: 'social', status: 'in-progress', priority: 'high',
        direction: [
          'Premium and SaaS-oriented — clean gradient background',
          'Device mockups with actual PreK.Club UI screenshots',
          'Conference badge/tag element + subtle Orlando/summer vibes',
          '"Proud Sponsor" + "FACCM & APPLE 2026" label',
          'QR or CTA button',
          'UI screens: provider profile, payments, attendance',
        ],
        headline: 'Modern Child Care Management for Growing Programs',
        cta: 'Visit us at FACCM & APPLE 2026',
        missing: ['Real UI screenshots (high-res)', 'Final design file'],
      },
      {
        id: 'bl-g-s2', title: 'Instagram / Facebook Feed Post',
        category: 'social', status: 'in-progress', priority: 'high',
        direction: [
          'Brighter, more colorful — childcare energy, not SaaS-flat',
          'Focus on program growth: providers, teachers, daily operations',
          'Show real product: enrollment dashboard, attendance grid, payments, family communication',
          'Mobile app screens + provider profile UI',
        ],
        headline: 'Enrollment, Payments & Communication — All in One Place',
        cta: 'Visit Us at FACCM & APPLE 2026',
        missing: ['Final design', 'High-res product screenshots', 'Mobile app screens'],
      },
      {
        id: 'bl-g-s3', title: 'IG Story — See You There',
        category: 'social', status: 'in-progress', priority: 'medium',
        direction: [
          'Vertical layout, big CTA',
          'QR at bottom',
          '"Swipe Up" feel even if static',
        ],
        headline: 'See You at FACCM & APPLE 2026',
        notes: 'Subcopy: Live demos • QR signup • Meet the team',
        missing: ['Final design file'],
      },
      {
        id: 'bl-g-s4', title: 'IG Story — Countdown',
        category: 'social', status: 'in-progress', priority: 'medium',
        variants: ['5 days', '3 days', 'Tomorrow'],
        direction: [
          'Animated gradients',
          'Floating UI cards',
          'Subtle dots/shapes from conference design system',
        ],
        headline: "We're heading to Orlando ☀️",
        missing: ['3 variant designs', 'Animation (if motion)'],
      },
      {
        id: 'bl-g-s5', title: 'Post-Event Recap',
        category: 'social', status: 'in-progress', priority: 'medium',
        direction: ['Photo collage — networking, booth moments, QR scans, live demos'],
        headline: 'Thank You FACCM & APPLE 2026',
        missing: ['Conference photos', 'Final design'],
      },
      // DIGITAL
      {
        id: 'bl-g-d1', title: 'Conference Landing Page',
        category: 'digital', status: 'in-progress', priority: 'high',
        missing: [
          '"Meet us at the conference" section',
          'Event countdown widget',
          'Booth location map/info',
          'Live demo CTA block',
          'QR section',
          'FACCM/APPLE sponsor section',
          'UI screenshots: provider profile, payments, attendance, parent app, Google discovery',
        ],
      },
      {
        id: 'bl-g-d2', title: 'Thank-You Page',
        category: 'digital', status: 'in-progress', priority: 'high',
        notes: 'Shown after QR scan or demo form submission.',
        direction: [
          '"Thanks for connecting with PreK.Club! Our team will reach out soon."',
          'Explore how providers use PreK.Club section',
          'Video/demo CTA + social links + schedule a meeting button',
        ],
        missing: ['Page design', 'Video/demo asset'],
      },
      {
        id: 'bl-g-d3', title: 'Demo Booking Form',
        category: 'digital', status: 'in-progress', priority: 'high',
        missing: [
          'Program name field',
          'Role field',
          'Number of children field',
          'Interested features field',
          'Current software field',
          'Preferred demo time field',
        ],
      },
      {
        id: 'bl-g-d4', title: 'QR Experience Flow',
        category: 'digital', status: 'todo', priority: 'medium',
        notes: 'Instead of QR → form directly, build a conversion funnel for better results.',
        direction: [
          '1. Landing hero',
          '2. Quick value props',
          '3. Demo CTA',
          '4. Form',
        ],
        missing: ['Conversion-optimized landing design', 'Flow implementation'],
      },
      // BOOTH
      {
        id: 'bl-g-b1', title: 'Booth Backdrop',
        category: 'booth', status: 'in-progress', priority: 'high',
        direction: [
          'Real UI screenshots + parent app screens + provider dashboards',
          'Tagline system with clear typography hierarchy',
          'Gradient ribbons/waves from postcard design language',
        ],
        headline: 'The Child Care Software to Grow Your Program',
        missing: ['High-res UI screenshot assets', 'Final tagline decision', 'Revised design file'],
      },
      {
        id: 'bl-g-b2', title: 'Tabletop Sign',
        category: 'booth', status: 'in-progress', priority: 'medium',
        notes: 'Quick scan interaction point. 3 benefits max + QR + CTA.',
        direction: [
          'Scan to Explore PreK.Club',
          '✔ Enrollments  ✔ Payments  ✔ Parent Communication',
        ],
        missing: ['QR placement design', 'Final print file'],
      },
      {
        id: 'bl-g-b3', title: 'TV Demo Loop',
        category: 'booth', status: 'in-progress', priority: 'high',
        notes: 'Silent looping video for booth TV. Apple/SaaS style — slow pan, clean transitions, no heavy motion.',
        direction: [
          '1. Logo animation',
          '2. Provider search screen',
          '3. Payments dashboard',
          '4. Parent app',
          '5. Attendance reports',
          '6. Messaging screen',
          '7. "Book a Demo" slide',
          '8. QR code',
        ],
        missing: ['Screen recordings of each UI section', 'Motion design / video file'],
      },
      {
        id: 'bl-g-b4', title: 'Stickers / Swag',
        category: 'booth', status: 'done', priority: 'optional',
        direction: [
          'Mascot stickers',
          '"Play • Learn • Love" mini cards',
          'QR mini cards',
          'Holographic stickers',
          'Die-cut mascot shapes',
        ],
        missing: ['Mascot artwork', 'Vendor selection', 'Print files'],
      },
      // PRINT
      {
        id: 'bl-g-p1', title: 'One-Pager',
        category: 'print', status: 'in-progress', priority: 'high',
        notes: 'Content is ready. Needs layout refinement.',
        direction: [
          'Cleaner feature grouping + more whitespace',
          '"Why Providers Choose PreK.Club" section',
          'Conference CTA block',
          'QR CTA footer',
        ],
        missing: ['Hero → Benefits → Screenshots → Parent Exp → Provider Exp → QR CTA layout', 'Final print file'],
      },
      {
        id: 'bl-g-p2', title: 'Business Card',
        category: 'print', status: 'todo', priority: 'medium',
        direction: ['QR on back', 'Conference-specific CTA on front'],
        headline: 'Meet us at FACCM & APPLE 2026',
        missing: ['Front design', 'Back QR design', 'Print file'],
      },
      // CONTENT
      {
        id: 'bl-g-c1', title: 'Booth Talking Points',
        category: 'content', status: 'done', priority: 'medium',
        direction: [
          'Get found by families on Google',
          'Simplify attendance tracking',
          'Manage payments easily',
          'Improve family communication',
          'Modern provider profiles',
          'Built for growing programs',
        ],
      },
      // SYSTEM
      {
        id: 'bl-g-sys1', title: 'CTA System',
        category: 'system', status: 'done', priority: 'high',
        direction: [
          'Primary: Book a Demo',
          'Secondary: Explore PreK.Club',
          'Event: Visit Us at FACCM & APPLE 2026',
        ],
      },
      {
        id: 'bl-g-sys5', title: 'Lead Collection Workflow',
        category: 'system', status: 'todo', priority: 'high',
        notes: 'Define what happens when someone shows real interest — from first QR scan to demo scheduled.\n\nFlow: QR Scan → Landing Page → Demo / Contact Form → Thank-You Page → CRM / Email Capture → Follow-Up Campaign → Demo Scheduling',
        direction: [
          'Entry points: Booth QR · Demo form · Tabletop QR · Business cards · Social traffic (LinkedIn/Instagram)',
          'Capture fields: Name · Email · Phone · Program Name · Role · # Students · Current Software · Interested Features',
          'Hot Lead: requested demo or meeting',
          'Warm Lead: interested but no immediate action',
          'Partner / Org: networking or collaboration contact',
          'Same day: thank-you email + resource links + demo CTA',
          '2–3 days: personalized follow-up + product walkthrough invitation',
          '1 week: reminder CTA + feature highlights + case study or screenshots',
        ],
        headline: 'Internal Workflow',
        cta: 'During: export leads daily · mark hot leads · assign follow-up owners\nAfter: segment leads · start nurturing · schedule demos · review conversions',
        missing: [
          'CRM or spreadsheet set up for lead capture',
          'Demo form connected to email capture',
          'Follow-up email sequence written and scheduled',
          'Lead owners assigned before conference',
          'Metrics: total leads · demo requests · QR-to-form rate · warm vs hot · follow-up response rate',
        ],
        variants: ['Hot Lead', 'Warm Lead', 'Partner / Org', 'Existing Client'],
      },
      {
        id: 'bl-g-sys4', title: 'Social Campaign Structure',
        category: 'system', status: 'todo', priority: 'high',
        notes: 'Organize what gets published, when, and with what objective across the three conference phases.',
        direction: [
          'PRE-CONFERENCE — Sponsor Announcement: LinkedIn + Facebook + Instagram',
          'PRE-CONFERENCE — "See You There": IG Stories, countdown posts, teaser graphics',
          'PRE-CONFERENCE — Product Highlights: Enrollment · Attendance · Payments · Parent communication',
          'CONFERENCE WEEK — Live Coverage: booth photos, team photos, networking moments, live demos, short videos',
          'CONFERENCE WEEK — Story Coverage: "Visit us today" · "Live demos happening now" · "Come meet the team"',
          'POST-CONFERENCE — Thank You Post: community appreciation and visibility',
          'POST-CONFERENCE — Recap Carousel: booth + demos + networking + team moments',
          'POST-CONFERENCE — Follow-Up CTA: Book a demo · Explore PreK.Club · Schedule a walkthrough',
        ],
        headline: 'Suggested Timeline',
        cta: 'Before: announcement + countdown + features → During: live stories + demos → After: thank-you + recap + follow-up CTA',
        missing: [
          'Content calendar with publish dates',
          'Live coverage assigned to team member',
          'Recap carousel design',
          'Follow-up CTA campaign copy',
          'Metrics baseline: social clicks, story engagement, QR scans, demo requests, traffic source',
        ],
        variants: ['LinkedIn', 'Instagram', 'Facebook'],
      },
      {
        id: 'bl-g-sys3', title: 'QR & Conversion Tracking',
        category: 'system', status: 'todo', priority: 'high',
        notes: 'Define what counts as a real conversion and instrument each QR touchpoint in GA4.\n\nTracking flow: QR Scan → Conference Landing Page → CTA Interaction → Demo Form / Booking → Thank-You Page → GA4 Conversion Recorded',
        direction: [
          'Booth QR — main booth traffic and live demos',
          'Postcard QR — printed material engagement',
          'Tabletop QR — quick interaction during conversations',
          'TV Loop QR — passive booth engagement from screens',
          'GA4 events: conference_qr_visit · demo_form_submit · demo_booking · conference_cta_click',
        ],
        headline: 'Conversion Goals',
        cta: 'Primary: Demo form submitted · Demo booking completed · Contact form submitted\nSecondary: QR scan landing visit · CTA button click · Time on page · Scroll depth · Multiple page views',
        missing: [
          'Most scanned QR — identify best placement',
          'Best performing social platform',
          'Demo conversion rate tracking',
          'Landing page engagement metrics',
          'Conference ROI indicators dashboard',
          'GA4 events instrumented on landing + thank-you page',
        ],
        variants: ['Social Campaign Structure', 'Lead Collection Workflow', 'Booth Experience', 'Post-Event Follow-Up', 'Analytics Dashboard'],
      },
      {
        id: 'bl-g-sys2', title: 'Analytics Setup — UTM Tracking',
        category: 'system', status: 'in-progress', priority: 'high',
        notes: 'Track conference traffic across booth assets, social posts, QR codes, and follow-up campaigns using standardized UTM parameters.\n\nPattern for new PreK.Club QR assets: https://play.prek.club/?utm_source={source}&utm_medium={medium}&utm_campaign=prekclub2026',
        direction: [
          'Booth QR: https://play.prek.club/?utm_source=booth&utm_medium=qr&utm_campaign=prekclub2026',
          'Postcard QR: https://play.prek.club/?utm_source=postcard&utm_medium=qr&utm_campaign=prekclub2026',
          'Tabletop Sign QR: https://play.prek.club/?utm_source=tabletop&utm_medium=qr&utm_campaign=prekclub2026',
          'TV Demo Loop QR: https://play.prek.club/?utm_source=tvloop&utm_medium=qr&utm_campaign=prekclub2026',
          'LinkedIn Post: https://play.prek.club/?utm_source=linkedin&utm_medium=social&utm_campaign=prekclub2026',
          'Instagram Story: https://play.prek.club/?utm_source=instagram_story&utm_medium=story&utm_campaign=prekclub2026',
          'Follow-Up Email: https://play.prek.club/?utm_source=email&utm_medium=followup&utm_campaign=prekclub2026',
        ],
        missing: [
          'GA4 goals: QR scans, landing page visits, demo form submissions, demo bookings',
          'Social traffic attribution configured',
          'Booth engagement analytics dashboard',
          'All QR codes regenerated with UTM URLs',
        ],
      },
    ],
    links: [
      { label: 'GLS Conference', url: 'https://appleaccreditation.org/conference-2026/' },
      { label: 'Whova Event App', url: 'https://whova.com/web/C%40qggqv92hycv4%40D%40KL1kxnBpd4nAoFm4mxuhJojqBE%3D/' },
      { label: 'PreK.Club Landing Page', url: 'https://play.prek.club/' },
      { label: 'Landing Repo', url: 'https://github.com/bWelZ/playprekclub' },
    ],
    contacts: [
      { name: 'Joyce Beauchamp', role: 'Digital Marketing & Events Manager — Florida Association for Child Care Management (FACCM)', email: 'jbeauchamp@faccm.org', phone: '954.869.7154 x3001', website: 'faccm.org', group: 'Event / Organization' },
      { name: 'Carlos M. Valdes', role: '', group: 'Internal Team' },
      { name: 'Heidy Valdes', role: '', group: 'Internal Team' },
      { name: 'Abel Ferro', role: '', group: 'Internal Team' },
      { name: 'Natalia Colleti', role: '', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-g0a', title: 'Conference sponsorship confirmed', date: '2026-05-12', type: 'other', done: true },
      { id: 'dl-g0b', title: 'Event page & registration links reviewed', date: '2026-05-15', type: 'review', done: true },
      { id: 'dl-g0c', title: 'Client brand assets received (logos, brand kit)', date: '2026-05-19', type: 'other', done: true },
      { id: 'dl-g0d', title: 'QR codes generated with UTM tracking', date: '2026-05-22', type: 'design', done: true },
      { id: 'dl-g0e', title: 'SafetyPlug print design approved', date: '2026-05-23', type: 'design', done: true },
      { id: 'dl-g0f', title: 'Postcard 5×7 print design approved', date: '2026-05-25', type: 'design', done: true },
      { id: 'dl-g1',  title: 'Copy & messaging finalized (sponsor announcement, CTA, captions, talking points)', date: '2026-05-28', type: 'design', done: true },
      { id: 'dl-g2',  title: 'Digital assets live (landing page, QR code, booking form, thank-you page, GA4)', date: '2026-05-30', type: 'design', done: false },
      { id: 'dl-g3',  title: 'LinkedIn sponsor post published', date: '2026-05-30', type: 'other', done: false },
      { id: 'dl-g4',  title: 'Print design files ready (backdrop, tabletop sign)', date: '2026-06-01', type: 'design', done: false },
      { id: 'dl-g5',  title: 'Instagram & Facebook pre-event post', date: '2026-06-02', type: 'other', done: false },
      { id: 'dl-g6',  title: 'Print files submitted to vendor', date: '2026-06-03', type: 'print', done: false },
      { id: 'dl-g7',  title: 'Materials shipped to Orlando', date: '2026-06-10', type: 'shipping', done: false },
      { id: 'dl-g8',  title: 'Lead collection workflow & demo accounts ready', date: '2026-06-15', type: 'review', done: false },
      { id: 'dl-g9',  title: 'Final prep check — all systems go', date: '2026-06-17', type: 'review', done: false },
      { id: 'dl-g10', title: 'FACCM & APPLE — Grow. Lead. Succeed. 2026 Conference', date: '2026-06-19', type: 'conference', done: false },
      { id: 'dl-g11', title: 'Post-event recap post + follow-up email sequence sent', date: '2026-06-23', type: 'other', done: false },
    ],
    assets: [
      // ── SOCIAL ──────────────────────────────────────────────
      {
        id: 'a-g-s1', title: 'LinkedIn Sponsor Post',
        type: 'social', category: 'social',
        previewColor: 'bg-blue-600', aspectRatio: '4/5', status: 'review',
        previewUrl: '/prints/grow-lead-succeed-2026/LinkedIn_Sponsor_Post_thumb.png',
        notes: 'PreK.Club is proud to sponsor the 2026 FACCM & APPLE Accreditation Conference in Orlando, FL. 🌴\n\nWe\'re excited to connect with early learning leaders across Florida and share modern tools that help providers simplify enrollment, attendance, payments, and family communication.\n\nStop by to explore live demos, discover new features, and see how PreK.Club helps programs grow with confidence.\n\n📍 Loews Sapphire Falls Resort\n📅 June 19–20, 2026\n\n#FACCM2026 #APPLEAccreditation #PreKClub #EarlyLearning #ChildCare #ChildCareManagement',
        tags: ['social', 'linkedin', 'sponsorship', 'announcement'],
        mapPosition: { x: 55, y: 75 },
      },
      {
        id: 'a-g-s2', title: 'Instagram / Facebook Post',
        type: 'social', category: 'social',
        previewColor: 'bg-blue-400', aspectRatio: '4/5', status: 'review',
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_IGFBFeed_Post_Thumb.png',
        notes: 'We\'re excited to be part of the 2026 FACCM & APPLE Accreditation Conference. 🌱\n\nStop by and discover how PreK.Club helps providers simplify enrollment, communication, and school management — all in one place.\n\n📍 Orlando, FL\n📅 June 19–20\n\nSee you there!',
        tags: ['social', 'instagram', 'facebook', 'announcement'],
        mapPosition: { x: 235, y: 75 },
      },
      {
        id: 'a-g-s3', title: 'Post-Event Recap',
        type: 'social', category: 'social',
        previewColor: 'bg-sky-500', aspectRatio: '3/4', status: 'in-design',
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_PostEventRecap_Thumb.png',
        notes: 'Thank you to everyone who connected with us during the FACCM & APPLE 2026 Conference.\n\nWe loved meeting providers, leaders, and partners committed to strengthening early learning across Florida.\n\nLooking forward to continuing the conversation.',
        tags: ['social', 'recap', 'post-event'],
        mapPosition: { x: 415, y: 75 },
      },

      // ── SOCIAL (stories) ────────────────────────────────────
      {
        id: 'a-g-s6', title: 'IG Story — See You There',
        type: 'social', category: 'social',
        previewColor: 'bg-indigo-500', aspectRatio: '9/16', status: 'review',
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_IGStory_SeeYouThere_Thumb.png',
        notes: 'See you at FACCM & APPLE 2026 👋\n\nVisit the PreK.Club booth for live demos, new tools, and conversations about the future of early learning management.\n\n📍 Loews Sapphire Falls Resort\n📅 June 19–20',
        tags: ['social', 'instagram', 'story', 'promo'],
        mapPosition: { x: 415, y: 215 },
      },
      {
        id: 'a-g-s7', title: 'IG Story — Countdown',
        type: 'social', category: 'social',
        previewColor: 'bg-sky-600', aspectRatio: '9/16', status: 'review',
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_IGStory_Countdown_Thumb.png',
        notes: '3 days until FACCM & APPLE 2026 ✨\n\nWe\'re getting ready for live demos, new connections, and exciting conversations with providers across Florida.\n\nStop by the PreK.Club booth!',
        tags: ['social', 'instagram', 'story', 'countdown'],
        mapPosition: { x: 235, y: 310 },
      },

      // ── DIGITAL ─────────────────────────────────────────────
      {
        id: 'a-g-d1', title: 'Conference Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-violet-500', aspectRatio: '16/9', status: 'in-design',
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_LandingPage_Thumb.png',
        iframeUrl: 'https://play.prek.club/',
        externalUrl: 'https://play.prek.club/',
        notes: 'Modern tools for early learning providers.\n\nPreK.Club helps programs manage enrollments, payments, communication, and daily operations in one connected platform.\n\nVisit us during FACCM & APPLE 2026.',
        tags: ['digital', 'web', 'landing'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-g-d3', title: 'Demo Booking Form',
        type: 'landing', category: 'digital',
        previewColor: 'bg-indigo-500', aspectRatio: '3/2', status: 'in-design',
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_DemoBookingForm_Thumb.png',
        notes: 'Form for attendees to book a live product demo',
        tags: ['digital', 'form', 'demo'],
        mapPosition: { x: 1025, y: 75 },
      },
      {
        id: 'a-g-d4', title: 'Thank-You Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-indigo-400', aspectRatio: '5/3', status: 'in-design',
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_ThankYouPage_Thumb.png',
        notes: 'Post-form thank-you page with next steps',
        tags: ['digital', 'web'],
        mapPosition: { x: 665, y: 240 },
      },
      {
        id: 'a-g-d5', title: 'Analytics & Tracking Setup',
        type: 'workflow', category: 'operations',
        previewColor: 'bg-purple-500', aspectRatio: '4/3', status: 'in-design',
        notes: `${utmTrackingNotes('https://play.prek.club/', 'prekclub2026')}

GA4 EVENTS
- conference_qr_visit
- demo_form_submit
- demo_booking
- conference_cta_click

CONVERSION GOALS
- Demo form submitted
- Demo booking completed
- QR scan -> landing visit
- CTA button click`,
        tags: ['operations', 'analytics', 'tracking', 'utm', 'ga4'],
        mapPosition: { x: 845, y: 240 },
      },

      // ── BOOTH ────────────────────────────────────────────────
      {
        id: 'a-g-b1', title: 'Booth Backdrop',
        type: 'banner', category: 'booth',
        previewColor: 'bg-emerald-600', aspectRatio: '1/1', status: 'approved',
        notes: '8ft straight backdrop with endcap — printed and ready for the conference',
        tags: ['booth', 'banner', 'print', '8ft'],
        physicalSize: { w: 8, h: 8, unit: 'ft' },
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_PreKClub_Backdrop_8ft_Thumb.jpg',
        mapPosition: { x: 55, y: 470 },
      },
      {
        id: 'a-g-b9', title: 'Table Throw',
        type: 'tablecloth', category: 'booth',
        previewColor: 'bg-emerald-500', aspectRatio: '2/1', status: 'approved',
        notes: '8ft full table throw — printed and ready for the conference',
        tags: ['booth', 'tablecloth', 'print', '8ft'],
        physicalSize: { w: 8, h: 4, unit: 'ft' },
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_PreKClub_TableThrow_8ft_Thumb.jpg',
        mapPosition: { x: 235, y: 730 },
      },
      {
        id: 'a-g-b2', title: 'Tabletop Sign',
        type: 'booth', category: 'booth',
        previewColor: 'bg-emerald-400', aspectRatio: '5/6', status: 'review',
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_TabletopSign_Thumb.png',
        notes: 'Manage Enrollments. Simplify Communication. Support Families.\n\nVisit PreK.Club for a live demo.',
        tags: ['booth', 'print', 'signage'],
        physicalSize: { w: 8.5, h: 11, unit: 'in' },
        mapPosition: { x: 235, y: 470 },
      },
      {
        id: 'a-g-b3', title: 'TV Demo Loop',
        type: 'mockup', category: 'booth',
        previewColor: 'bg-teal-500', aspectRatio: '16/9', status: 'review',
        previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_TVDemoLoop_Thumb.png',
        notes: 'Looping product demo video/slideshow for TV display at booth',
        tags: ['booth', 'digital', 'demo'],
        mapPosition: { x: 415, y: 470 },
      },
      {
        id: 'a-g-b8', title: 'Stickers / Swag',
        type: 'swag', category: 'booth',
        previewColor: 'bg-emerald-300', aspectRatio: '1/1', status: 'approved',
        notes: 'Branded stickers and swag items for 300 attendees',
        tags: ['booth', 'swag', 'print'],
        physicalSize: { w: 2, h: 2, unit: 'in' },
        printFile: {
          url: '/prints/grow-lead-succeed-2026/PreKClub_Conference_Sticker_PRINT_2x2.pdf',
          filename: 'PreKClub_Conference_Sticker_PRINT_2x2.pdf',
          thumbnailUrl: '/prints/grow-lead-succeed-2026/PreKClub_Conference_Sticker_PRINT_2x2.jpg',
        },
        mapPosition: { x: 235, y: 590 },
      },

      // ── CONTENT ──────────────────────────────────────────────
      {
        id: 'a-g-c1', title: 'Sponsor Announcement Copy',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-500', aspectRatio: '4/3', status: 'review',
        notes: 'PreK.Club is proud to sponsor the 2026 FACCM & APPLE Accreditation Conference in Orlando, FL. 🌴\n\nWe\'re excited to connect with early learning leaders across Florida and share modern tools that help providers simplify enrollment, attendance, payments, and family communication.\n\nStop by to explore live demos, discover new features, and see how PreK.Club helps programs grow with confidence.\n\n📍 Loews Sapphire Falls Resort\n📅 June 19–20, 2026\n\n#FACCM2026 #APPLEAccreditation #PreKClub #EarlyLearning #ChildCare #ChildCareManagement',
        tags: ['content', 'copy', 'linkedin', 'announcement'],
        mapPosition: { x: 665, y: 495 },
      },
      {
        id: 'a-g-c2', title: 'CTA Messaging',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-400', aspectRatio: '4/3', status: 'review',
        notes: 'Primary CTA: Book a Live Demo\nSecondary CTA: Explore PreK.Club\nEvent CTA: Visit Us at FACCM & APPLE 2026\n\nQR CTAs: Scan to Explore PreK.Club / Book a Demo / Learn More / Connect With Our Team\n\nBooth signage: Manage Enrollments. Simplify Communication. Support Families. Visit PreK.Club for a live demo.\n\nHeadline options: The Child Care Software to Grow Your Program / Enrollment, Payments & Communication — All in One Place / Helping Child Care Programs Grow with Confidence / Simplify Child Care Management\n\nFeature labels: Enrollment · Payments · Family Communication · Attendance',
        tags: ['content', 'copy', 'cta', 'booth', 'signage'],
        mapPosition: { x: 845, y: 495 },
      },
      {
        id: 'a-g-c3', title: 'Social Captions',
        type: 'copy', category: 'content',
        previewColor: 'bg-orange-400', aspectRatio: '4/3', status: 'review',
        notes: 'IG/FB: We\'re excited to be part of the 2026 FACCM & APPLE Accreditation Conference. Stop by and discover how PreK.Club helps providers simplify enrollment, communication, and school management — all in one place. 📍 Orlando, FL 📅 June 19–20\n\nStory — See You There: See you at FACCM & APPLE 2026 👋 Visit the PreK.Club booth for live demos, new tools, and conversations about the future of early learning management.\n\nStory — Countdown: 3 days until FACCM & APPLE 2026 ✨ We\'re getting ready for live demos, new connections, and exciting conversations with providers across Florida.',
        tags: ['content', 'copy', 'social', 'instagram', 'facebook'],
        mapPosition: { x: 665, y: 635 },
      },
      {
        id: 'a-g-c4', title: 'Demo Talking Points',
        type: 'copy', category: 'content',
        previewColor: 'bg-orange-500', aspectRatio: '4/3', status: 'review',
        notes: '• Enrollment management\n• Parent communication\n• Attendance tracking\n• Payments and billing\n• Provider-friendly dashboards\n• Family experience\n• Mobile accessibility\n• Simplified workflows',
        tags: ['content', 'copy', 'demo', 'talking-points'],
        mapPosition: { x: 845, y: 635 },
      },
      {
        id: 'a-g-c5', title: 'Follow-Up Emails',
        type: 'email', category: 'content',
        previewColor: 'bg-yellow-500', aspectRatio: '4/3', status: 'review',
        notes: 'Thank you for visiting the PreK.Club booth at FACCM & APPLE 2026.\n\nWe\'d love to continue the conversation and show you how PreK.Club can support your program with enrollment management, communication tools, and streamlined operations.\n\nSchedule a personalized demo with our team.',
        tags: ['content', 'email', 'follow-up', 'post-event'],
        mapPosition: { x: 1025, y: 495 },
      },
      {
        id: 'a-g-c6', title: 'Postcard Copy — Both Sides',
        type: 'copy', category: 'content',
        previewColor: 'bg-pink-500', aspectRatio: '4/3', status: 'review',
        notes: `PreK.Club 2026 postcard copy, both sides. This is a strong Carlos-style reference: playful and colorful, but still clear about business outcomes for child care providers.

Front side:
PLAY • LEARN • LOVE

The Child Care App
to Grow Your Program

Get found on Google
Get paid easily
Engage families
Track attendance
Stay compliant
Staff scheduling

Scan to grow
your program

Family Child Care Home friendly
Hablamos Español
Made with love in Miami

QR destination:
https://prek.club/?utm_source=postcard&utm_medium=qr&utm_campaign=prekclub2026

Back side:
Helping you manage the details.
More time for what matters.

PreK.Club is the all-in-one App
that helps child care programs grow.

Owners & Directors
Manage enrollment, staff scheduling, billing, and operations.

Teachers & Staff
Attendance, communication, and classroom tools.

Families
Payments, updates, messages, and daily connection.

Book a Demo
Scan the QR code

Style notes to reuse:
- Lead with a simple growth promise, not a feature dump.
- Keep benefit bullets short and concrete.
- Speak to owners/directors, teachers/staff, and families.
- Use bilingual friendliness as a trust cue when appropriate.
- Miami/local pride is part of the emotional warmth.
- QR CTA should feel action-oriented: scan to grow, book a demo, scan the QR code.`,
        tags: ['content', 'copy', 'postcard', 'front-back', 'qr', 'approved-style', 'prekclub2026'],
        relatedAssets: ['a-g-b5', 'a-g-b6'],
        mapPosition: { x: 1025, y: 635 },
      },

      // ── SOCIAL (client logo files) ───────────────────────────
      {
        id: 'a-g-s4', title: 'IG / FB Feed — PreK.Club Brand Logo',
        type: 'social', category: 'social',
        previewColor: 'bg-blue-500', aspectRatio: '1/1', status: 'approved',
        notes: 'Client-provided brand logo asset for Instagram and Facebook feed posts',
        tags: ['social', 'logo', 'instagram', 'facebook'],
        mapPosition: { x: 55, y: 215 },
        printFile: {
          url: '/prints/grow-lead-succeed-2026/GLS2026_PreKClub_IGFBFeed_BrandLogo.png',
          filename: 'GLS2026_PreKClub_IGFBFeed_BrandLogo.png',
          thumbnailUrl: '/prints/grow-lead-succeed-2026/GLS2026_PreKClub_IGFBFeed_BrandLogo.png',
        },
      },
      {
        id: 'a-g-s5', title: 'IG Story — PreK.Club Brand Logo',
        type: 'social', category: 'social',
        previewColor: 'bg-blue-300', aspectRatio: '9/16', status: 'approved',
        notes: 'Client-provided brand logo asset for Instagram Story marketing',
        tags: ['social', 'logo', 'instagram', 'story'],
        mapPosition: { x: 235, y: 215 },
        printFile: {
          url: '/prints/grow-lead-succeed-2026/GLS2026_PreKClub_IGStory_BrandLogo.png',
          filename: 'GLS2026_PreKClub_IGStory_BrandLogo.png',
          thumbnailUrl: '/prints/grow-lead-succeed-2026/GLS2026_PreKClub_IGStory_BrandLogo.png',
        },
      },

      // ── BOOTH (final print deliverables) ─────────────────────
      {
        id: 'a-g-b5', title: 'Postcard',
        type: 'postcard', category: 'booth',
        previewColor: 'bg-emerald-600', aspectRatio: '5/7', status: 'review',
        notes: '5x7 in printed postcard for conference distribution — includes QR code linking to https://play.prek.club/?utm_source=postcard&utm_medium=qr&utm_campaign=prekclub2026',
        tags: ['booth', 'postcard', 'print', '5x7'],
        physicalSize: { w: 5, h: 7, unit: 'in' },
        sides: [
          { label: 'Front', previewUrl: '/prints/grow-lead-succeed-2026/GLS2026_PreKClub_Postcard_5x7_Thumb.jpg' },
          { label: 'Back',  previewUrl: '/prints/grow-lead-succeed-2026/PreKClub-Postcard_5x7_Back.jpg' },
        ],
        relatedAssets: ['a-g-b6'],
        mapPosition: { x: 330, y: 590 },
        printFile: {
          url: '/prints/grow-lead-succeed-2026/GLS2026_PreKClub_Postcard_5x7_Print.pdf',
          filename: 'GLS2026_PreKClub_Postcard_5x7_Print.pdf',
          size: '5×7 in',
          thumbnailUrl: '/prints/grow-lead-succeed-2026/GLS2026_PreKClub_Postcard_5x7_Thumb.jpg',
        },
      },
      {
        id: 'a-g-b7', title: 'SafetyPlug Print',
        type: 'swag', category: 'booth',
        previewColor: 'bg-purple-600', aspectRatio: '1/1', status: 'approved',
        notes: '1.25×1.25 in safety plug sticker with QR code — print-ready PDF for demo stations',
        tags: ['booth', 'safetyplug', 'print', 'swag'],
        physicalSize: { w: 1.25, h: 1.25, unit: 'in' },
        relatedAssets: ['a-g-d6'],
        mapPosition: { x: 500, y: 590 },
        printFile: {
          url: '/prints/grow-lead-succeed-2026/PreKClub_Conference_Safety_Plug_QR_PRINT_1.25x1.25_V4.pdf',
          filename: 'GLS2026_PreKClub_SafetyPlug_1.25x1.25_Print_V4.pdf',
          size: '1.25×1.25 in',
          thumbnailUrl: '/prints/grow-lead-succeed-2026/PreKClub_Conference_Safety_Plug_QR_PRINT_1.25x1.25_V4_Thumb.jpg',
        },
      },

      // ── OPERATIONS (QR source files) ──────────────────────────
      {
        id: 'a-g-b6', title: 'QR Code — Postcard',
        type: 'qr', category: 'digital',
        previewColor: 'bg-emerald-800', aspectRatio: '1/1', status: 'approved',
        physicalSize: { w: 1.5, h: 1.5, unit: 'in' },
        notes: 'QR code source file for the postcard — links to https://play.prek.club/?utm_source=postcard&utm_medium=qr&utm_campaign=prekclub2026',
        tags: ['operations', 'qr', 'postcard', 'source'],
        relatedAssets: ['a-g-b5'],
        mapPosition: { x: 1325, y: 550 },
        printFile: {
          url: '/prints/grow-lead-succeed-2026/play.prek.club_utm_source_postcard_utm_medium_qr_utm_campaign_prekclub2026.svg',
          filename: 'play.prek.club_utm_source_postcard_utm_medium_qr_utm_campaign_prekclub2026.svg',
          thumbnailUrl: '/prints/grow-lead-succeed-2026/play.prek.club_utm_source_postcard_utm_medium_qr_utm_campaign_prekclub2026.svg',
        },
      },
      {
        id: 'a-g-d6', title: 'QR Code — SafetyPlug',
        type: 'qr', category: 'digital',
        previewColor: 'bg-purple-800', aspectRatio: '1/1', status: 'approved',
        physicalSize: { w: 1.25, h: 1.25, unit: 'in' },
        notes: 'QR code source file for the SafetyPlug sticker — links to https://play.prek.club/?utm_source=safetyplug&utm_medium=qr&utm_campaign=prekclub2026',
        tags: ['operations', 'qr', 'safetyplug', 'source'],
        relatedAssets: ['a-g-b7'],
        mapPosition: { x: 1410, y: 550 },
        printFile: {
          url: '/prints/grow-lead-succeed-2026/play.prek.club_utm_source_safetyplug_utm_medium_qr_utm_campaign_prekclub2026.svg',
          filename: 'play.prek.club_utm_source_safetyplug_utm_medium_qr_utm_campaign_prekclub2026.svg',
          thumbnailUrl: '/prints/grow-lead-succeed-2026/play.prek.club_utm_source_safetyplug_utm_medium_qr_utm_campaign_prekclub2026.svg',
        },
      },
      {
        id: 'a-g-o1', title: 'Lead Collection Workflow',
        type: 'workflow', category: 'operations',
        previewColor: 'bg-rose-500', aspectRatio: '4/3', status: 'in-design',
        notes: 'Flow: QR Scan → Landing Page → Demo / Contact Form → Thank-You Page → CRM / Email Capture → Follow-Up Campaign → Demo Scheduling\n\nEntry points\n- Booth QR — main conference scans\n- Demo form — scheduled interest\n- Tabletop QR — quick conversations\n- Business cards — manual contacts\n- Social traffic — LinkedIn / Instagram visitors\n\nLead categories\n- Hot Lead: requested demo or meeting\n- Warm Lead: interested, no immediate action\n- Partner / Org: networking or collaboration\n- Existing Client: current relationship\n\nCapture fields: Name · Email · Phone · Program Name · Role · # Students · Current Software · Interested Features\n\nFollow-up timeline\n- Same day: thank-you email + resource links + demo CTA\n- 2–3 days: personalized follow-up + walkthrough invitation\n- 1 week: reminder CTA + feature highlights + case study\n\nDuring conference: export leads daily · mark hot leads · assign follow-up owners\nAfter conference: segment leads · start nurturing · schedule demos · review conversions',
        tags: ['operations', 'leads', 'workflow'],
        mapPosition: { x: 1325, y: 495 },
      },
    ],
  },

  {
    id: 'born-to-teach-2026',
    title: 'Born to Teach Con 2026',
    organization: 'Born to Teach Con',
    date: '2026-07-01',
    location: 'Rosenberg, TX',
    audience: 'Early childhood educators, teachers',
    objective: 'Increase PreK.Club awareness and engagement through QR-driven swag bag materials distributed to conference educators',
    company: 'PreK.Club',
    presence: 'Swag Bag Sponsor',
    status: 'planning',
    progress: 10,
    coverGradient: 'from-emerald-400 to-teal-600',
    notes: `Swag bag items approved by conference organizer:
- 5×7 double-sided postcard (600 qty)
- Microfiber glass cleaner — PreK.Club branded, double-sided (600 qty)

Shipping address:
5728 Avenue I, Rosenberg, TX 77471

Delivery deadline: June 15, 2026

QR URL: https://play.prek.club/?utm_source=microfiber&utm_medium=qr&utm_campaign=prekclub2026

Messaging direction:
- Simplify childcare management
- Connect families and providers
- Modern tools for educators
- Mobile-friendly platform
- Community and growth focused
- Friendly and approachable tone

Repo owner: bWelZ
Repo: bWelZ/playprekclub
Landing: https://play.prek.club/
Mautic formId: 7
Mautic formName: prekclublandingcapture
New QR pattern: https://play.prek.club/?utm_source={source}&utm_medium={medium}&utm_campaign=prekclub2026`,
    tags: ['prekclub', 'swag-bag', 'print', 'texas', 'educator', 'postcard', 'swag', 'summer'],
    links: [
      { label: 'Born to Teach Con', url: 'https://www.borntoteachcon.com' },
      { label: 'PreK.Club Landing Page', url: 'https://play.prek.club/' },
      { label: 'Landing Repo', url: 'https://github.com/bWelZ/playprekclub' },
    ],
    contacts: [
      { name: 'Semone Montelongo', role: 'Sponsorship Coordinator — Born to Teach Con', website: 'borntoteachcon.com', group: 'Event / Organization' },
      { name: 'Natalia Coletti', role: '', group: 'Internal Team' },
      { name: 'Carlos M. Valdes', role: '', group: 'Internal Team' },
      { name: 'Heidy Valdes', role: '', group: 'Internal Team' },
      { name: 'Abel Ferro', role: '', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-bt0a', title: 'Campaign brief / messaging direction locked', date: '2026-05-10', type: 'other', done: true },
      { id: 'dl-bt0b', title: 'Postcard concept designed (front & back)', date: '2026-05-20', type: 'design', done: false },
      { id: 'dl-bt0c', title: 'Microfiber cleaner concept designed (both sides)', date: '2026-05-22', type: 'design', done: false },
      { id: 'dl-bt0d', title: 'QR tracking asset generated', date: '2026-05-22', type: 'design', done: false },
      { id: 'dl-bt1',  title: 'All designs approved', date: '2026-05-28', type: 'review', done: false },
      { id: 'dl-bt2',  title: 'Print-ready files prepared', date: '2026-06-01', type: 'print', done: false },
      { id: 'dl-bt3',  title: 'Proofs approved', date: '2026-06-05', type: 'review', done: false },
      { id: 'dl-bt4',  title: 'Order placed — 600 postcards + 600 microfiber cleaners', date: '2026-06-05', type: 'other', done: false },
      { id: 'dl-bt5',  title: 'Items shipped to Rosenberg, TX', date: '2026-06-15', type: 'shipping', done: false },
      { id: 'dl-bt6',  title: 'Born to Teach Con 2026', date: '2026-07-01', type: 'conference', done: false },
    ],
    assets: [
      // ── SOCIAL ──────────────────────────────────────────────
      {
        id: 'a-bt-s1', title: 'LinkedIn Sponsor Post',
        type: 'social', category: 'social',
        previewColor: 'bg-emerald-600', aspectRatio: '4/5', status: 'pending',
        notes: 'Sponsor announcement for Born to Teach Con 2026 — PreK.Club, educator-focused angle',
        tags: ['social', 'linkedin', 'sponsorship', 'announcement'],
        mapPosition: { x: 55, y: 75 },
      },
      {
        id: 'a-bt-s2', title: 'Post-Event Recap',
        type: 'social', category: 'social',
        previewColor: 'bg-teal-400', aspectRatio: '3/4', status: 'pending',
        notes: 'Post-conference recap post for social channels',
        tags: ['social', 'recap', 'post-event'],
        mapPosition: { x: 235, y: 75 },
      },

      // ── DIGITAL ─────────────────────────────────────────────
      {
        id: 'a-bt-d1', title: 'QR Code — Microfiber',
        type: 'qr', category: 'digital',
        previewColor: 'bg-slate-600', aspectRatio: '1/1', status: 'pending',
        notes: 'QR tracking URL:\nhttps://play.prek.club/?utm_source=microfiber&utm_medium=qr&utm_campaign=prekclub2026',
        tags: ['qr', 'digital', 'microfiber', 'source'],
        relatedAssets: ['a-bt-p3', 'a-bt-p4'],
        mapPosition: { x: 665, y: 75 },
        printFile: {
          url: '/prints/prekclub-shared/qr/play.prek.club_utm_source_microfiber_utm_medium_qr_utm_campaign_prekclub2026.svg',
          filename: 'play.prek.club_utm_source_microfiber_utm_medium_qr_utm_campaign_prekclub2026.svg',
          thumbnailUrl: '/prints/prekclub-shared/qr/play.prek.club_utm_source_microfiber_utm_medium_qr_utm_campaign_prekclub2026.svg',
        },
      },
      {
        id: 'a-bt-d2', title: 'QR Code — Postcard',
        type: 'qr', category: 'digital',
        previewColor: 'bg-emerald-800', aspectRatio: '1/1', status: 'approved',
        physicalSize: { w: 1.5, h: 1.5, unit: 'in' },
        notes: 'QR code source file for the postcard — links to https://play.prek.club/?utm_source=postcard&utm_medium=qr&utm_campaign=prekclub2026',
        tags: ['operations', 'qr', 'postcard', 'source'],
        relatedAssets: ['a-bt-b5'],
        mapPosition: { x: 845, y: 75 },
        printFile: {
          url: '/prints/prekclub-shared/qr/play.prek.club_utm_source_postcard_utm_medium_qr_utm_campaign_prekclub2026.svg',
          filename: 'play.prek.club_utm_source_postcard_utm_medium_qr_utm_campaign_prekclub2026.svg',
          thumbnailUrl: '/prints/prekclub-shared/qr/play.prek.club_utm_source_postcard_utm_medium_qr_utm_campaign_prekclub2026.svg',
        },
      },

      // ── PRINT ────────────────────────────────────────────────
      {
        id: 'a-bt-b5', title: 'Postcard',
        type: 'postcard', category: 'booth',
        previewColor: 'bg-emerald-600', aspectRatio: '5/7', status: 'review',
        notes: '5x7 in printed postcard for conference distribution — includes QR code linking to https://play.prek.club/?utm_source=postcard&utm_medium=qr&utm_campaign=prekclub2026',
        tags: ['booth', 'postcard', 'print', '5x7'],
        physicalSize: { w: 5, h: 7, unit: 'in' },
        sides: [
          { label: 'Front', previewUrl: '/prints/prekclub-shared/postcard/PreKClub_Postcard_5x7_Front.jpg' },
          { label: 'Back',  previewUrl: '/prints/prekclub-shared/postcard/PreKClub_Postcard_5x7_Back.jpg' },
        ],
        relatedAssets: ['a-bt-d2'],
        mapPosition: { x: 55, y: 470 },
        printFile: {
          url: '/prints/prekclub-shared/postcard/PreKClub_Postcard_5x7_Print.pdf',
          filename: 'BT2026_PreKClub_Postcard_5x7_Print.pdf',
          size: '5×7 in',
          thumbnailUrl: '/prints/prekclub-shared/postcard/PreKClub_Postcard_5x7_Front.jpg',
        },
      },
      {
        id: 'a-bt-p3', title: 'Microfiber Glass Cleaner — Design',
        type: 'swag', category: 'booth',
        previewColor: 'bg-teal-500', aspectRatio: '3/2', status: 'pending',
        notes: 'Microfiber glass cleaner — double-sided\n• Minimal and clean design\n• Highly legible logo placement\n• QR code optional depending on printable area\nQty: 600',
        tags: ['swag', 'microfiber', 'print', 'swag-bag'],
        relatedAssets: ['a-bt-d1'],
        mapPosition: { x: 415, y: 470 },
      },
      {
        id: 'a-bt-p4', title: 'Microfiber Glass Cleaner — Print File',
        type: 'swag', category: 'booth',
        previewColor: 'bg-teal-700', aspectRatio: '3/2', status: 'pending',
        notes: 'Print-ready production file — CMYK, both sides, vendor specs\nQty: 600',
        tags: ['swag', 'microfiber', 'print', 'production'],
        relatedAssets: ['a-bt-d1'],
        mapPosition: { x: 235, y: 590 },
      },

      // ── CONTENT ──────────────────────────────────────────────
      {
        id: 'a-bt-c1', title: 'Copy — Postcard',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-500', aspectRatio: '4/3', status: 'pending',
        notes: 'Postcard messaging direction:\n• Simplify childcare management\n• Connect families and providers\n• Modern tools for educators\n• Mobile-friendly platform\n• Community and growth focused\n• Friendly and approachable tone\n\nCTA: Book a Demo / Explore PreK.Club\nQR: https://play.prek.club/?utm_source=postcard&utm_medium=qr&utm_campaign=prekclub2026',
        tags: ['content', 'copy', 'postcard'],
        mapPosition: { x: 665, y: 470 },
      },
    ],
  },

  {
    id: 'prekclub-invite-your-director',
    title: 'PreK.Club Invite Your Director Campaign',
    organization: 'PreK.Club',
    date: '2026-01-15',
    location: 'Evergreen digital campaign',
    audience: 'Teachers, staff, and childcare program teams who can refer their directors',
    objective: 'Continue generating PreK.Club leads outside of a fixed event window through the Invite Your Director referral flow',
    company: 'PreK.Club',
    presence: 'Evergreen landing page and Mautic referral form',
    status: 'in-progress',
    progress: 75,
    coverGradient: 'from-lime-400 to-emerald-700',
    notes: `This is an evergreen lead-generation campaign, not a fixed conference event.

It was originally used around an early-2026 event, but remains active as a reusable referral campaign to keep generating qualified PreK.Club leads.

Repo owner: bWelZ
Repo: bWelZ/playprekclub
Landing: https://play.prek.club/invite-your-director/
Mautic formId: 11
Mautic formName: prekclubinviteyourdirector`,
    tags: ['prekclub', 'campaign', 'evergreen', 'lead-generation', 'referral', 'mautic'],
    links: [
      { label: 'Invite Your Director Landing', url: 'https://play.prek.club/invite-your-director/' },
      { label: 'Landing Repo', url: 'https://github.com/bWelZ/playprekclub' },
    ],
    contacts: [
      { name: 'Natalia Coletti', role: 'Campaign / lead follow-up owner', group: 'Internal Team' },
      { name: 'Abel Ferro', role: 'Landing page / technical owner', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-pkc-iyd1', title: 'Campaign landing live', date: '2026-01-15', type: 'design', done: true },
      { id: 'dl-pkc-iyd2', title: 'Evergreen lead follow-up review', date: '2026-06-15', type: 'review', done: false },
    ],
    assets: [
      {
        id: 'a-pkc-iyd-d1', title: 'Invite Your Director Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-emerald-500', aspectRatio: '16/9', status: 'delivered',
        iframeUrl: 'https://play.prek.club/invite-your-director/',
        externalUrl: 'https://play.prek.club/invite-your-director/',
        notes: 'Evergreen PreK.Club referral landing page for inviting a director.',
        tags: ['digital', 'web', 'landing', 'referral'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-pkc-iyd-d2', title: 'Invite Your Director Mautic Form',
        type: 'landing', category: 'digital',
        previewColor: 'bg-lime-500', aspectRatio: '3/2', status: 'delivered',
        notes: 'Mautic formId=11, formName=prekclubinviteyourdirector, action=https://marketing.bwelz.org/form/submit?formId=11.',
        tags: ['digital', 'form', 'mautic', 'lead-capture'],
        mapPosition: { x: 845, y: 75 },
      },
      {
        id: 'a-pkc-iyd-d3', title: 'Invite Your Director UTM URLs',
        type: 'qr', category: 'digital',
        previewColor: 'bg-slate-700', aspectRatio: '1/1', status: 'pending',
        notes: utmTrackingNotes('https://play.prek.club/invite-your-director/', 'prekclub2026', [
          { label: 'Referral QR', source: 'referral', medium: 'qr' },
          { label: 'Teacher Flyer QR', source: 'teacher_flyer', medium: 'qr' },
          { label: 'Director Email', source: 'email', medium: 'referral' },
          { label: 'LinkedIn Post', source: 'linkedin', medium: 'social' },
        ]),
        tags: ['digital', 'qr', 'utm', 'referral'],
        mapPosition: { x: 1025, y: 75 },
      },
    ],
  },

  {
    id: 'one-goal-summer-2026',
    title: 'One Goal Summer Conference 2026',
    organization: 'One Goal Summer Conference Planning Committee',
    date: '2026-07-08',
    endDate: '2026-07-10',
    location: 'Hilton Downtown Tampa, 211 N Tampa St, Tampa, FL',
    audience: 'Early education and care providers — Early Learning teachers, ELCs, State Administrators (700 attendees)',
    objective: 'Coffee Break sponsor ($5,000) — exhibit booth presence, full-color ad in Conference Book, recognition at Opening General Session. Goodwill for WELS + Zipdata technology support.',
    company: 'WELS / Zipdata',
    presence: 'Exhibit booth, Ballroom I (Commercial Exhibit Hall) — Thu & Fri; Coffee Break sponsor signage outside hall',
    status: 'in-progress',
    progress: 25,
    coverGradient: 'from-sky-400 to-cyan-600',
    notes: `URGENT: Conference Book ad artwork due June 1, 2026. Full color ad, final size 8 1/16" x 10 1/2". Artwork should be sent to Frankie Allen at frankieallen_2000@yahoo.com.

Primary job for this event: create a print-ready full-page Conference Book ad that presents WELS + Zipdata as a practical technology partner for Florida early learning, Head Start, ELC, and provider audiences.

Required message pillars:
- WELS Systems Foundation + Zipdata working together
- Coffee Break Sponsor recognition
- Technology support for early education systems and providers
- WELS 4-Cycle Direct Entry relevance without over-claiming the DEL workshop
- Clear QR / CTA for follow-up

Sponsor perks to account for: signage outside Exhibit Hall, named in Conference Book as Coffee Break Sponsor, recognized at Opening General Session.

Open item: the original email lists conference dates as July 8-10, 2026, but references exhibit booth dates from July 17-18. Treat the booth date line as unconfirmed until verified.

Repo owner: bWelZ
Repo: bWelZ/one-goal-2026
Landing: https://welsfoundation.org/lp/one-goal-2026/
Mautic formId: 12
Mautic formName: welslandingcapture`,
    tags: ['wels', 'zipdata', 'head-start', 'florida', 'tampa', 'summer', 'coffee-break', 'sponsor'],
    backlog: [
      {
        id: 'bl-ogs-p1', title: 'Conference Book — Full Page Ad',
        category: 'print', status: 'in-progress', priority: 'high',
        headline: 'One Goal. Connected Systems. Better Outcomes.',
        direction: [
          'Final size: 8 1/16" x 10 1/2", full color',
          'Primary visual: sophisticated infinite ribbon inspired by the 2025 ad',
          'WELS blue ribbon enters from the left; Zipdata cyan ribbon enters from the right',
          'Both ribbons meet in the center and form an infinity symbol',
          'Use WELS + Zipdata branding together, with WELS as mission/system voice and Zipdata as technology/data support',
          'Include Coffee Break Sponsor recognition without making it the whole ad',
          'Audience: early education and care providers, ELC leaders, Head Start, state administrators',
          'Tone: credible, helpful, operational, public-sector friendly',
          'Avoid overloading the ad with cards, icons, screenshots, or software UI',
          'CTA: scan to connect with WELS / learn how technology can support early learning systems',
        ],
        cta: 'Scan to connect with WELS',
        missing: [
          'Final WELS logo file',
          'Final Zipdata logo file',
          'QR destination URL with UTM tracking',
          'Export PDF print-ready',
          'Confirm whether bleed/crop marks are required',
        ],
      },
      {
        id: 'bl-ogs-c1', title: 'Conference Book Ad Copy',
        category: 'content', status: 'in-progress', priority: 'high',
        headline: 'One Goal. Connected Systems. Better Outcomes.',
        direction: [
          'Use the infinity ribbon headline as the center message',
          'Support line should explain the system idea without sounding like a software ad',
          'Mention WELS Systems Foundation and Zipdata together',
          'Keep DEL workshop wording separate unless approved',
          'Use benefits language: connected data, stronger provider support, clearer workflows, better outcomes',
          'Include the label line: DATA • PROVIDERS • WORKFLOWS • FAMILIES',
          'Include Coffee Break Sponsor line',
        ],
        cta: 'Connect with us at One Goal Summer Conference 2026',
        missing: ['Final approved headline', 'QR URL', 'Any required legal/entity wording'],
      },
      {
        id: 'bl-ogs-d1', title: 'QR Code — Conference',
        category: 'digital', status: 'todo', priority: 'high',
        headline: 'One Goal conference QR',
        direction: [
          'Destination should be WELS/Zipdata-specific, not generic',
          'Conference Book Ad QR: https://welsfoundation.org/lp/one-goal-2026/?utm_source=conference_book_ad&utm_medium=qr&utm_campaign=welsfoundation2026',
          'Use same QR on ad, booth talking sheet, and any tabletop sign if destination fits',
          'Landing should make it easy to request a conversation or learn about WELS/Zipdata support',
        ],
        missing: ['Landing URL', 'Generated QR SVG/PNG', 'Scan test on mobile'],
      },
      {
        id: 'bl-ogs-c2', title: 'Talking Points',
        category: 'content', status: 'todo', priority: 'medium',
        headline: 'Booth and conversation points',
        direction: [
          'WELS supports early learning organizations with technology, systems, and practical implementation support',
          'Zipdata helps connect data, workflows, and reporting needs',
          'WELS 4-Cycle Direct Entry is relevant to conference conversations; avoid presenting DEL workshop as WELS-owned unless confirmed',
          'Ask attendees about provider data, enrollment workflows, reporting, and direct entry pain points',
          'Capture who needs follow-up: ELC, Head Start, provider, state/admin, partner',
        ],
        missing: ['Owner for follow-up list', 'Lead capture spreadsheet or CRM field list'],
      },
      {
        id: 'bl-ogs-s1', title: 'LinkedIn Sponsor Post',
        category: 'social', status: 'todo', priority: 'medium',
        headline: 'WELS + Zipdata at One Goal Summer Conference 2026',
        direction: [
          'Post after ad is approved or closer to event',
          'Thank One Goal and mention Coffee Break Sponsorship',
          'Focus on early learning systems, provider support, and meaningful technology partnerships',
          'Use conference dates July 8-10, 2026 and Tampa location',
        ],
        missing: ['Approved ad visual or sponsor graphic', 'Publish date', 'Final hashtags'],
      },
      {
        id: 'bl-ogs-sys1', title: 'Lead Collection Workflow',
        category: 'system', status: 'todo', priority: 'high',
        headline: 'From QR scan to follow-up',
        direction: [
          'QR scan -> landing page -> contact/demo interest form -> thank-you page -> follow-up list',
          'Capture: name, organization, role, email, phone, county/region, interest area',
          'Interest areas: data/reporting, provider workflow, WELS 4-Cycle Direct Entry, Zipdata, partnership',
          'Segment hot leads from general contacts after the conference',
        ],
        cta: 'Daily during event: export leads, tag hot leads, assign follow-up owner.',
        missing: [
          'Landing page or form destination',
          'Follow-up owner',
          'Post-event email copy',
          'Tracking dashboard or spreadsheet',
        ],
      },
    ],
    links: [
      { label: 'One Goal Landing Page', url: 'https://welsfoundation.org/lp/one-goal-2026/' },
      { label: 'Landing Repo', url: 'https://github.com/bWelZ/one-goal-2026' },
    ],
    contacts: [
      {
        name: 'Frankie Allen',
        role: 'Conference Sponsor Coordinator',
        email: 'frankieallen_2000@yahoo.com',
        group: 'One Goal',
      },
      {
        name: 'Heidy Valdes',
        role: 'VP, CXO — WELS Systems Foundation',
        email: 'heidy@welsfoundation.org',
        phone: '+1 (786) 735-0200',
        website: 'welsfoundation.org',
        group: 'WELS',
      },
      {
        name: 'Laura Mallery',
        role: 'WELS Systems Foundation',
        email: 'lgmallery@welsfoundation.org',
        group: 'WELS',
      },
    ],
    deadlines: [
      { id: 'dl-ogs0a', title: 'Brand assets / logos received', date: '2026-05-20', type: 'other', done: false },
      { id: 'dl-ogs0b', title: 'Design concepts approved', date: '2026-05-28', type: 'design', done: false },
      { id: 'dl-ogs1',  title: 'Conference Book ad artwork submitted (8 1/16" × 10 1/2")', date: '2026-06-01', type: 'design', done: false },
      { id: 'dl-ogs2',  title: 'Print files to vendor', date: '2026-06-01', type: 'print', done: false },
      { id: 'dl-ogs3',  title: 'LinkedIn sponsor post + IG/FB pre-event post', date: '2026-06-05', type: 'other', done: false },
      { id: 'dl-ogs4',  title: 'Materials shipped to Tampa', date: '2026-06-20', type: 'shipping', done: false },
      { id: 'dl-ogs5',  title: 'Final prep check — all systems go', date: '2026-07-06', type: 'review', done: false },
      { id: 'dl-ogs6',  title: 'One Goal Summer Conference 2026', date: '2026-07-08', type: 'conference', done: false },
      { id: 'dl-ogs7',  title: 'Post-event recap post', date: '2026-07-14', type: 'other', done: false },
    ],
    assets: [
      // ── SOCIAL ──────────────────────────────────────────────
      {
        id: 'a-ogs-s1', title: 'LinkedIn Sponsor Post',
        type: 'social', category: 'social',
        previewColor: 'bg-sky-600', aspectRatio: '4/5', status: 'pending',
        notes: 'Sponsor announcement — WELS + Zipdata branding, Early Learning angle',
        tags: ['social', 'linkedin', 'sponsorship', 'announcement'],
        mapPosition: { x: 55, y: 75 },
      },
      {
        id: 'a-ogs-s2', title: 'Instagram / Facebook Post',
        type: 'social', category: 'social',
        previewColor: 'bg-sky-400', aspectRatio: '4/5', status: 'pending',
        notes: 'Pre-event IG/FB feed post announcing conference attendance',
        tags: ['social', 'instagram', 'facebook', 'announcement'],
        mapPosition: { x: 235, y: 75 },
      },
      {
        id: 'a-ogs-s3', title: 'IG Story — See You There',
        type: 'social', category: 'social',
        previewColor: 'bg-cyan-500', aspectRatio: '9/16', status: 'pending',
        notes: 'Vertical story — booth location, dates, QR CTA',
        tags: ['social', 'instagram', 'story', 'promo'],
        mapPosition: { x: 415, y: 75 },
      },
      {
        id: 'a-ogs-s4', title: 'Post-Event Recap',
        type: 'social', category: 'social',
        previewColor: 'bg-cyan-400', aspectRatio: '3/4', status: 'pending',
        notes: 'Post-conference recap post for social channels',
        tags: ['social', 'recap', 'post-event'],
        mapPosition: { x: 415, y: 215 },
      },

      // ── DIGITAL ─────────────────────────────────────────────
      {
        id: 'a-ogs-d0', title: 'One Goal Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-cyan-500', aspectRatio: '16/9', status: 'delivered',
        iframeUrl: 'https://welsfoundation.org/lp/one-goal-2026/',
        externalUrl: 'https://welsfoundation.org/lp/one-goal-2026/',
        notes: 'WELS + Zipdata One Goal landing. Repo owner: bWelZ. Mautic formId=12, formName=welslandingcapture.',
        tags: ['digital', 'web', 'landing', 'wels', 'zipdata', 'mautic'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-ogs-d1', title: 'QR Code — Conference',
        type: 'qr', category: 'digital',
        previewColor: 'bg-slate-600', aspectRatio: '1/1', status: 'delivered',
        notes: `QR linking to WELS/Zipdata landing — UTM tracked.

${utmTrackingNotes('https://welsfoundation.org/lp/one-goal-2026/', 'welsfoundation2026', [
  { label: 'Conference Book Ad QR', source: 'conference_book_ad', medium: 'qr' },
  { label: 'Booth QR', source: 'booth', medium: 'qr' },
  { label: 'Tabletop Sign QR', source: 'tabletop', medium: 'qr' },
  { label: 'LinkedIn Sponsor Post', source: 'linkedin', medium: 'social' },
  { label: 'Instagram / Facebook Feed', source: 'instagram_facebook', medium: 'social' },
  { label: 'IG Story', source: 'instagram_story', medium: 'story' },
  { label: 'Follow-Up Email', source: 'email', medium: 'followup' },
])}

Use on Conference Book ad first. Reuse for booth/tabletop only if the CTA remains the same.`,
        tags: ['qr', 'digital'],
        printFile: {
          url: '/prints/one-goal-summer-2026/OGS2026_WELSZipdata_QR_ConferenceBookAd.svg',
          filename: 'OGS2026_WELSZipdata_QR_ConferenceBookAd.svg',
          thumbnailUrl: '/prints/one-goal-summer-2026/OGS2026_WELSZipdata_QR_ConferenceBookAd.svg',
        },
        mapPosition: { x: 845, y: 75 },
      },

      // ── BOOTH ────────────────────────────────────────────────
      {
        id: 'a-ogs-b1', title: 'Banner — WELS',
        type: 'banner', category: 'booth',
        previewColor: 'bg-sky-500', aspectRatio: '1/3', status: 'pending',
        notes: 'Pull-up retractable banner — WELS branding',
        tags: ['banner', 'print', 'wels', 'booth'],
        mapPosition: { x: 55, y: 470 },
      },
      {
        id: 'a-ogs-b2', title: 'Tablecloth — Zipdata',
        type: 'tablecloth', category: 'booth',
        previewColor: 'bg-cyan-600', aspectRatio: '2/1', status: 'pending',
        notes: '6ft table throw — Zipdata branding',
        tags: ['tablecloth', 'print', 'zipdata', 'booth'],
        mapPosition: { x: 235, y: 470 },
      },
      {
        id: 'a-ogs-b3', title: 'Conference Book — Full Page Ad',
        type: 'ad', category: 'booth',
        previewColor: 'bg-sky-300', aspectRatio: '8/10', status: 'in-design',
        notes: 'Full color. Size: 8 1/16" x 10 1/2". DEADLINE June 1, 2026. Send artwork to Frankie Allen (frankieallen_2000@yahoo.com). WELS + Zipdata branding.\n\nPrimary concept:\nA sophisticated infinite ribbon system inspired by the 2025 ad. WELS blue ribbon enters from the left. Zipdata cyan ribbon enters from the right. Both meet in the center and form an infinity symbol.\n\nCenter headline:\nOne Goal. Connected Systems. Better Outcomes.\n\nBelow headline:\nDATA • PROVIDERS • WORKFLOWS • FAMILIES\n\nCreative structure:\n1. WELS + Zipdata logo lockup\n2. Large infinite ribbon visual as the hero\n3. Center headline inside/near the ribbon\n4. Short support copy about WELS + Zipdata helping early learning partners connect systems, data, and workflows\n5. Coffee Break Sponsor recognition\n6. QR CTA: Scan to connect with WELS\n\nDesign caution: do not turn this into a dashboard/software ad. Keep it editorial, clean, and memorable for a conference book.\n\nExport: PDF print-ready. Confirm bleed/crop marks if possible, but do not wait if deadline is immediate.',
        tags: ['ad', 'print', 'conference-book', 'urgent'],
        physicalSize: { w: 8.0625, h: 10.5, unit: 'in' },
        mapPosition: { x: 415, y: 470 },
      },
      {
        id: 'a-ogs-b4', title: 'Swag — 700 Attendees',
        type: 'swag', category: 'booth',
        previewColor: 'bg-cyan-300', aspectRatio: '1/1', status: 'pending',
        notes: 'Swag items for 700 conference attendees — items TBD',
        tags: ['swag', 'giveaway', 'booth'],
        mapPosition: { x: 235, y: 590 },
      },

      // ── CONTENT ──────────────────────────────────────────────
      {
        id: 'a-ogs-c1', title: 'Sponsor Copy',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-500', aspectRatio: '4/3', status: 'in-design',
        notes: 'Primary ad copy direction:\n\nHero headline:\nOne Goal. Connected Systems. Better Outcomes.\n\nSystem line:\nDATA • PROVIDERS • WORKFLOWS • FAMILIES\n\nShort body option A:\nWELS Systems Foundation and Zipdata help early learning partners connect the systems, data, and workflows that support providers and families.\n\nShort body option B:\nWhen data, providers, workflows, and families are connected, early learning systems can move with more clarity and care.\n\nSponsor line:\nProud Coffee Break Sponsor of One Goal Summer Conference 2026.\n\nCTA:\nScan to connect with WELS.',
        tags: ['content', 'copy', 'linkedin'],
        mapPosition: { x: 665, y: 470 },
      },
      {
        id: 'a-ogs-c2', title: 'Talking Points',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-400', aspectRatio: '4/3', status: 'pending',
        notes: 'Booth talking points — WELS + Zipdata technology for ELC and Head Start audience.\n\nUse these angles:\n• WELS supports early learning systems with practical implementation and technology guidance.\n• Zipdata helps make data, reporting, and workflow needs easier to manage.\n• Ask about direct entry, reporting, provider data, family/provider workflows, and current pain points.\n• DEL workshop mention: DEL is presenting on the WELS 4-Cycle Direct Entry system; reference carefully unless approved.\n\nLead tags to capture:\nELC / Head Start / Provider / State-admin / Partner / Hot follow-up',
        tags: ['content', 'copy', 'talking-points'],
        mapPosition: { x: 845, y: 470 },
      },
      {
        id: 'a-ogs-c3', title: 'Conference Book Ad Copy',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-600', aspectRatio: '4/3', status: 'in-design',
        notes: 'Ready-to-layout ad copy:\n\nOne Goal. Connected Systems. Better Outcomes.\n\nDATA • PROVIDERS • WORKFLOWS • FAMILIES\n\nWELS Systems Foundation and Zipdata help early learning partners connect the systems, data, and workflows that support providers and families.\n\nProud Coffee Break Sponsor\nOne Goal Summer Conference 2026\n\nScan to connect with WELS\n\nSmall footer option:\nwelsfoundation.org',
        tags: ['content', 'copy', 'ad-copy', 'conference-book'],
        mapPosition: { x: 665, y: 590 },
      },
      {
        id: 'a-ogs-c5', title: 'Ad Concept — Infinite Ribbon',
        type: 'workflow', category: 'operations',
        previewColor: 'bg-sky-700', aspectRatio: '4/3', status: 'in-design',
        notes: 'Concept:\nWELS blue ribbon enters from the left -> Zipdata cyan ribbon enters from the right -> both join at center -> infinite ribbon symbol.\n\nCenter message:\nOne Goal. Connected Systems. Better Outcomes.\n\nSupport line:\nDATA • PROVIDERS • WORKFLOWS • FAMILIES\n\nMeaning:\nWELS = mission and system support.\nZipdata = technology and data connection.\nOne Goal = conference context and shared direction.\nEarly learning audience = providers, workflows, families, and outcomes.\n\nDesign intent:\nSophisticated conference-book ad, inspired by the 2025 ribbon language, but cleaner and more premium. Avoid crowded cards, icons, screenshots, and heavy software language.',
        tags: ['workflow', 'creative-concept', 'ad', 'conference-book'],
        mapPosition: { x: 845, y: 665 },
      },
      {
        id: 'a-ogs-c4', title: 'Lead Collection Workflow',
        type: 'workflow', category: 'operations',
        previewColor: 'bg-violet-600', aspectRatio: '4/3', status: 'pending',
        notes: `Flow:
QR scan -> WELS/Zipdata landing -> interest form -> thank-you page -> spreadsheet/CRM -> assigned follow-up.

${utmTrackingNotes('https://welsfoundation.org/lp/one-goal-2026/', 'welsfoundation2026', [
  { label: 'Conference Book Ad QR', source: 'conference_book_ad', medium: 'qr' },
  { label: 'LinkedIn Sponsor Post', source: 'linkedin', medium: 'social' },
  { label: 'Instagram / Facebook Feed', source: 'instagram_facebook', medium: 'social' },
  { label: 'IG Story', source: 'instagram_story', medium: 'story' },
  { label: 'Booth QR', source: 'booth', medium: 'qr' },
])}

Form fields:
Name, organization, role, email, phone, county/region, organization type, interest area, notes.

Interest areas:
Data/reporting, provider workflow, WELS 4-Cycle Direct Entry, Zipdata, partnership, follow-up meeting.

Post-event:
Segment hot leads, send thank-you email, schedule conversations, record campaign as welsfoundation2026.`,
        tags: ['workflow', 'lead-capture', 'qr', 'follow-up'],
        mapPosition: { x: 845, y: 590 },
      },
    ],
  },

  {
    id: 'annual-leadership-2026',
    title: '2026 Annual Leadership Conference',
    organization: "Florida Alliance of Children's Councils & Trusts",
    date: '2026-07-29',
    endDate: '2026-07-31',
    location: 'Daytona, FL',
    audience: 'CSC of Florida (Children Trusts)',
    objective: 'Good Will WELS',
    company: 'WELS',
    presence: 'Onsite',
    status: 'planning',
    progress: 5,
    coverGradient: 'from-teal-500 to-emerald-700',
    notes: `Landing repo should be cloned from one-goal-2026 and owned by bWelZ, with af3rr0 retaining creator/admin access.

Expected repo owner: bWelZ
Expected repo slug: annual-leadership-2026
Expected landing: https://welsfoundation.org/lp/annual-leadership-2026/
Form: WELS lead generation
Mautic formId: 12
Mautic formName: welslandingcapture`,
    tags: ['wels', 'florida', 'daytona', 'leadership', 'children-trusts', 'summer'],
    links: [
      { label: 'Planned Landing Page', url: 'https://welsfoundation.org/lp/annual-leadership-2026/' },
      { label: 'Planned Landing Repo', url: 'https://github.com/bWelZ/annual-leadership-2026' },
    ],
    contacts: [
      { name: 'Abel Ferro', role: 'Repo creator / technical owner', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-al0a', title: 'Brand direction confirmed', date: '2026-06-01', type: 'other', done: false },
      { id: 'dl-al0b', title: 'Design assets approved', date: '2026-06-10', type: 'design', done: false },
      { id: 'dl-al1',  title: 'Print files to vendor', date: '2026-06-15', type: 'print', done: false },
      { id: 'dl-al2',  title: 'LinkedIn sponsor post published', date: '2026-06-18', type: 'other', done: false },
      { id: 'dl-al3',  title: 'IG / FB pre-event post', date: '2026-06-22', type: 'other', done: false },
      { id: 'dl-al4',  title: 'Materials shipped to Daytona', date: '2026-07-10', type: 'shipping', done: false },
      { id: 'dl-al5',  title: 'Final prep check — all systems go', date: '2026-07-27', type: 'review', done: false },
      { id: 'dl-al6',  title: '2026 Annual Leadership Conference', date: '2026-07-29', type: 'conference', done: false },
      { id: 'dl-al7',  title: 'Post-event recap post', date: '2026-08-04', type: 'other', done: false },
    ],
    assets: [
      // ── SOCIAL ──────────────────────────────────────────────
      {
        id: 'a-al-s1', title: 'LinkedIn Sponsor Post',
        type: 'social', category: 'social',
        previewColor: 'bg-teal-600', aspectRatio: '4/5', status: 'pending',
        notes: 'Sponsor announcement — WELS branding, CSC of Florida audience',
        tags: ['social', 'linkedin', 'sponsorship', 'announcement'],
        mapPosition: { x: 55, y: 75 },
      },
      {
        id: 'a-al-s2', title: 'Instagram / Facebook Post',
        type: 'social', category: 'social',
        previewColor: 'bg-teal-400', aspectRatio: '4/5', status: 'pending',
        notes: 'Pre-event IG/FB feed post announcing conference attendance',
        tags: ['social', 'instagram', 'facebook', 'announcement'],
        mapPosition: { x: 235, y: 75 },
      },
      {
        id: 'a-al-s3', title: 'IG Story — See You There',
        type: 'social', category: 'social',
        previewColor: 'bg-emerald-500', aspectRatio: '9/16', status: 'pending',
        notes: 'Vertical story — booth location, dates, CTA',
        tags: ['social', 'instagram', 'story', 'promo'],
        mapPosition: { x: 415, y: 75 },
      },
      {
        id: 'a-al-s4', title: 'Post-Event Recap',
        type: 'social', category: 'social',
        previewColor: 'bg-emerald-400', aspectRatio: '3/4', status: 'pending',
        notes: 'Post-conference recap post for social channels',
        tags: ['social', 'recap', 'post-event'],
        mapPosition: { x: 415, y: 215 },
      },

      // ── DIGITAL ─────────────────────────────────────────────
      {
        id: 'a-al-d0', title: 'Conference Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-emerald-500', aspectRatio: '16/9', status: 'pending',
        externalUrl: 'https://welsfoundation.org/lp/annual-leadership-2026/',
        notes: 'Planned bWelZ repo cloned from one-goal-2026. Must use WELS lead generation Mautic formId=12, formName=welslandingcapture.',
        tags: ['digital', 'web', 'landing', 'wels', 'mautic', 'planned-repo'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-al-d2', title: 'WELS Lead Generation Form',
        type: 'landing', category: 'digital',
        previewColor: 'bg-teal-500', aspectRatio: '3/2', status: 'pending',
        notes: 'Use Mautic formId=12, formName=welslandingcapture, action=https://marketing.bwelz.org/form/submit?formId=12.',
        tags: ['digital', 'form', 'mautic', 'lead-capture'],
        mapPosition: { x: 845, y: 75 },
      },
      {
        id: 'a-al-d1', title: 'QR Code — Conference',
        type: 'qr', category: 'digital',
        previewColor: 'bg-slate-600', aspectRatio: '1/1', status: 'pending',
        notes: utmTrackingNotes('https://welsfoundation.org/lp/annual-leadership-2026/', 'welsfoundation2026'),
        tags: ['qr', 'digital'],
        mapPosition: { x: 1025, y: 75 },
      },

      // ── BOOTH ────────────────────────────────────────────────
      {
        id: 'a-al-b1', title: 'Banner — WELS',
        type: 'banner', category: 'booth',
        previewColor: 'bg-teal-500', aspectRatio: '1/3', status: 'pending',
        notes: 'Pull-up retractable banner — WELS branding',
        tags: ['banner', 'print', 'wels', 'booth'],
        mapPosition: { x: 55, y: 470 },
      },
      {
        id: 'a-al-b2', title: 'Ad — Conference',
        type: 'ad', category: 'booth',
        previewColor: 'bg-emerald-400', aspectRatio: '4/3', status: 'pending',
        notes: 'Conference ad — format TBD',
        tags: ['ad', 'print'],
        mapPosition: { x: 235, y: 470 },
      },
      {
        id: 'a-al-b3', title: 'Swag — 150 Attendees',
        type: 'swag', category: 'booth',
        previewColor: 'bg-teal-300', aspectRatio: '1/1', status: 'pending',
        notes: 'Good swag for 150 attendees — items TBD',
        tags: ['swag', 'giveaway', 'booth'],
        mapPosition: { x: 235, y: 590 },
      },

      // ── CONTENT ──────────────────────────────────────────────
      {
        id: 'a-al-c1', title: 'Sponsor Copy',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-500', aspectRatio: '4/3', status: 'pending',
        notes: 'Announcement copy for LinkedIn and social posts',
        tags: ['content', 'copy', 'linkedin'],
        mapPosition: { x: 665, y: 470 },
      },
      {
        id: 'a-al-c2', title: 'Talking Points',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-400', aspectRatio: '4/3', status: 'pending',
        notes: 'Booth talking points — WELS for CSC of Florida / Children Trusts audience',
        tags: ['content', 'copy', 'talking-points'],
        mapPosition: { x: 845, y: 470 },
      },
    ],
  },

  {
    id: 'nwra-2026',
    title: '2026 Annual Conference',
    organization: 'National Workforce Registry Alliance',
    date: '2026-10-01',
    location: 'Reno, NV',
    audience: '',
    objective: '',
    company: 'TBD',
    presence: 'Planned landing + conference assets',
    status: 'planning',
    progress: 0,
    coverGradient: 'from-amber-500 to-orange-700',
    notes: `Client direction: clone a landing repo from one-goal-2026.

Expected repo owner: bWelZ
Expected repo slug: nwra-2026
af3rr0 should create the repo and retain access.
Expected landing: https://welsfoundation.org/lp/nwra-2026/
Form: WELS lead generation unless client assigns another brand.
Mautic formId: 12
Mautic formName: welslandingcapture`,
    tags: ['workforce-registry', 'reno', 'nevada', 'fall', 'landing-needed', 'bwelz-repo'],
    links: [
      { label: 'Planned Landing Page', url: 'https://welsfoundation.org/lp/nwra-2026/' },
      { label: 'Planned Landing Repo', url: 'https://github.com/bWelZ/nwra-2026' },
    ],
    contacts: [
      { name: 'Abel Ferro', role: 'Repo creator / technical owner', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-nw0',  title: 'Conference details confirmed (brand, presence, assets needed)', date: '2026-07-01', type: 'other', done: false },
      { id: 'dl-nw0b', title: 'Brand / campaign direction locked', date: '2026-08-01', type: 'design', done: false },
      { id: 'dl-nw1',  title: 'Print files to vendor', date: '2026-09-01', type: 'print', done: false },
      { id: 'dl-nw2',  title: 'Materials shipped to Reno', date: '2026-09-20', type: 'shipping', done: false },
      { id: 'dl-nw3',  title: 'NWRA Annual Conference', date: '2026-10-01', type: 'conference', done: false },
    ],
    assets: [
      {
        id: 'a-nw-d1', title: 'Conference Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-orange-500', aspectRatio: '16/9', status: 'pending',
        externalUrl: 'https://welsfoundation.org/lp/nwra-2026/',
        notes: 'Planned bWelZ repo cloned from one-goal-2026. Use WELS lead generation Mautic formId=12 unless client assigns another brand/form.',
        tags: ['digital', 'web', 'landing', 'planned-repo', 'mautic'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-nw-d2', title: 'Lead Generation Form',
        type: 'landing', category: 'digital',
        previewColor: 'bg-amber-500', aspectRatio: '3/2', status: 'pending',
        notes: 'Default planned form: Mautic formId=12, formName=welslandingcapture.',
        tags: ['digital', 'form', 'mautic', 'lead-capture'],
        mapPosition: { x: 845, y: 75 },
      },
      {
        id: 'a-nw-d3', title: 'QR & UTM Tracking URLs',
        type: 'qr', category: 'digital',
        previewColor: 'bg-slate-600', aspectRatio: '1/1', status: 'pending',
        notes: utmTrackingNotes('https://welsfoundation.org/lp/nwra-2026/', 'welsfoundation2026'),
        tags: ['qr', 'digital', 'utm'],
        mapPosition: { x: 1025, y: 75 },
      },
      {
        id: 'a-nw-s1', title: 'Attendance Announcement Post',
        type: 'social', category: 'social',
        previewColor: 'bg-amber-500', aspectRatio: '4/5', status: 'pending',
        notes: 'Social post announcing conference attendance — brand and copy TBD',
        tags: ['social', 'linkedin', 'announcement'],
        mapPosition: { x: 55, y: 75 },
      },
      {
        id: 'a-nw-b1', title: 'Banner — TBD',
        type: 'banner', category: 'booth',
        previewColor: 'bg-orange-500', aspectRatio: '1/3', status: 'pending',
        notes: 'Pull-up banner — brand and artwork TBD',
        tags: ['banner', 'print', 'booth'],
        mapPosition: { x: 55, y: 300 },
      },
      {
        id: 'a-nw-c1', title: 'Sponsor Copy — TBD',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-400', aspectRatio: '4/3', status: 'pending',
        notes: 'Copy for announcements and booth — brand and objective TBD',
        tags: ['content', 'copy'],
        mapPosition: { x: 300, y: 300 },
      },
    ],
  },

  {
    id: 'aelc-2026',
    title: 'AELC Conference',
    organization: 'Florida Association of Early Learning Coalitions',
    date: '2026-11-01',
    location: 'Florida',
    audience: 'ELC of Florida',
    objective: 'Good will WELS/Zipdata',
    company: 'WELS / Zipdata',
    presence: 'Onsite',
    status: 'planning',
    progress: 5,
    coverGradient: 'from-green-500 to-teal-700',
    notes: `Client direction: clone a landing repo from one-goal-2026.

Expected repo owner: bWelZ
Expected repo slug: aelc-2026
af3rr0 should create the repo and retain access.
Expected landing: https://welsfoundation.org/lp/aelc-2026/
Form: WELS lead generation
Mautic formId: 12
Mautic formName: welslandingcapture`,
    tags: ['wels', 'zipdata', 'florida', 'early-learning', 'coalitions', 'fall', 'landing-needed', 'bwelz-repo'],
    links: [
      { label: 'Planned Landing Page', url: 'https://welsfoundation.org/lp/aelc-2026/' },
      { label: 'Planned Landing Repo', url: 'https://github.com/bWelZ/aelc-2026' },
    ],
    contacts: [
      { name: 'Abel Ferro', role: 'Repo creator / technical owner', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-aelc0a', title: 'Brand assets received', date: '2026-08-01', type: 'other', done: false },
      { id: 'dl-aelc0b', title: 'Design concepts approved', date: '2026-08-15', type: 'design', done: false },
      { id: 'dl-aelc1',  title: 'LinkedIn sponsor post published', date: '2026-08-25', type: 'other', done: false },
      { id: 'dl-aelc2',  title: 'Print files to vendor', date: '2026-09-01', type: 'print', done: false },
      { id: 'dl-aelc3',  title: 'IG / FB pre-event post', date: '2026-09-05', type: 'other', done: false },
      { id: 'dl-aelc4',  title: 'Materials shipped', date: '2026-10-15', type: 'shipping', done: false },
      { id: 'dl-aelc5',  title: 'Final prep check — all systems go', date: '2026-10-29', type: 'review', done: false },
      { id: 'dl-aelc6',  title: 'AELC Conference', date: '2026-11-01', type: 'conference', done: false },
      { id: 'dl-aelc7',  title: 'Post-event recap post', date: '2026-11-08', type: 'other', done: false },
    ],
    assets: [
      // ── SOCIAL ──────────────────────────────────────────────
      {
        id: 'a-aelc-s1', title: 'LinkedIn Sponsor Post',
        type: 'social', category: 'social',
        previewColor: 'bg-green-600', aspectRatio: '4/5', status: 'pending',
        notes: 'Sponsor announcement — WELS + Zipdata branding, ELC of Florida audience',
        tags: ['social', 'linkedin', 'sponsorship', 'announcement'],
        mapPosition: { x: 55, y: 75 },
      },
      {
        id: 'a-aelc-s2', title: 'Instagram / Facebook Post',
        type: 'social', category: 'social',
        previewColor: 'bg-green-400', aspectRatio: '4/5', status: 'pending',
        notes: 'Pre-event IG/FB feed post announcing conference attendance',
        tags: ['social', 'instagram', 'facebook', 'announcement'],
        mapPosition: { x: 235, y: 75 },
      },
      {
        id: 'a-aelc-s3', title: 'IG Story — See You There',
        type: 'social', category: 'social',
        previewColor: 'bg-teal-500', aspectRatio: '9/16', status: 'pending',
        notes: 'Vertical story — booth location, dates, CTA',
        tags: ['social', 'instagram', 'story', 'promo'],
        mapPosition: { x: 415, y: 75 },
      },
      {
        id: 'a-aelc-s4', title: 'Post-Event Recap',
        type: 'social', category: 'social',
        previewColor: 'bg-teal-400', aspectRatio: '3/4', status: 'pending',
        notes: 'Post-conference recap post for social channels',
        tags: ['social', 'recap', 'post-event'],
        mapPosition: { x: 415, y: 215 },
      },

      // ── DIGITAL ─────────────────────────────────────────────
      {
        id: 'a-aelc-d0', title: 'Conference Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-teal-500', aspectRatio: '16/9', status: 'pending',
        externalUrl: 'https://welsfoundation.org/lp/aelc-2026/',
        notes: 'Planned bWelZ repo cloned from one-goal-2026. Must use WELS lead generation Mautic formId=12, formName=welslandingcapture.',
        tags: ['digital', 'web', 'landing', 'wels', 'zipdata', 'planned-repo', 'mautic'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-aelc-d2', title: 'WELS Lead Generation Form',
        type: 'landing', category: 'digital',
        previewColor: 'bg-green-500', aspectRatio: '3/2', status: 'pending',
        notes: 'Use Mautic formId=12, formName=welslandingcapture, action=https://marketing.bwelz.org/form/submit?formId=12.',
        tags: ['digital', 'form', 'mautic', 'lead-capture'],
        mapPosition: { x: 845, y: 75 },
      },
      {
        id: 'a-aelc-d1', title: 'QR Code — Conference',
        type: 'qr', category: 'digital',
        previewColor: 'bg-slate-600', aspectRatio: '1/1', status: 'pending',
        notes: utmTrackingNotes('https://welsfoundation.org/lp/aelc-2026/', 'welsfoundation2026'),
        tags: ['qr', 'digital'],
        mapPosition: { x: 1025, y: 75 },
      },

      // ── BOOTH ────────────────────────────────────────────────
      {
        id: 'a-aelc-b1', title: 'Banner — WELS',
        type: 'banner', category: 'booth',
        previewColor: 'bg-green-500', aspectRatio: '1/3', status: 'pending',
        notes: 'Pull-up retractable banner — WELS branding',
        tags: ['banner', 'print', 'wels', 'booth'],
        mapPosition: { x: 55, y: 470 },
      },
      {
        id: 'a-aelc-b2', title: 'Tablecloth',
        type: 'tablecloth', category: 'booth',
        previewColor: 'bg-teal-600', aspectRatio: '2/1', status: 'pending',
        notes: '6ft table throw — WELS or Zipdata branding TBD',
        tags: ['tablecloth', 'print', 'booth'],
        mapPosition: { x: 235, y: 470 },
      },
      {
        id: 'a-aelc-b3', title: 'Ad — Conference',
        type: 'ad', category: 'booth',
        previewColor: 'bg-green-300', aspectRatio: '4/3', status: 'pending',
        notes: 'Conference ad — print or digital format TBD',
        tags: ['ad', 'print'],
        mapPosition: { x: 415, y: 470 },
      },
      {
        id: 'a-aelc-b4', title: 'Swag — 500 Attendees',
        type: 'swag', category: 'booth',
        previewColor: 'bg-teal-300', aspectRatio: '1/1', status: 'pending',
        notes: 'Swag items for 500 attendees — items TBD',
        tags: ['swag', 'giveaway', 'booth'],
        mapPosition: { x: 235, y: 590 },
      },

      // ── CONTENT ──────────────────────────────────────────────
      {
        id: 'a-aelc-c1', title: 'Sponsor Copy',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-500', aspectRatio: '4/3', status: 'pending',
        notes: 'Announcement copy for LinkedIn and social posts',
        tags: ['content', 'copy', 'linkedin'],
        mapPosition: { x: 665, y: 470 },
      },
      {
        id: 'a-aelc-c2', title: 'Talking Points',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-400', aspectRatio: '4/3', status: 'pending',
        notes: 'Booth talking points — WELS + Zipdata for ELC of Florida audience',
        tags: ['content', 'copy', 'talking-points'],
        mapPosition: { x: 845, y: 470 },
      },
    ],
  },

  {
    id: 'naeyc-2026',
    title: 'NAEYC Annual Conference',
    organization: 'National Association for the Education of Young Children',
    date: '2026-12-05',
    endDate: '2026-12-08',
    location: 'Washington, D.C.',
    audience: 'Educators, Directors, Org Admins',
    objective: 'Show childcare providers how to PreK',
    company: 'PreK.Club',
    presence: 'Onsite',
    status: 'planning',
    progress: 5,
    coverGradient: 'from-purple-500 to-violet-700',
    notes: `Client direction: clone/create a PreK.Club landing repo for this event under bWelZ, with af3rr0 retaining creator/admin access.

Expected repo owner: bWelZ
Expected repo slug: naeyc-2026
Expected landing: https://play.prek.club/naeyc-2026/
Form: PreK.Club landing capture
Mautic formId: 7
Mautic formName: prekclublandingcapture`,
    tags: ['prekclub', 'naeyc', 'washington-dc', 'early-education', 'fall', 'landing-needed', 'bwelz-repo'],
    links: [
      { label: 'Planned Landing Page', url: 'https://play.prek.club/naeyc-2026/' },
      { label: 'Planned Landing Repo', url: 'https://github.com/bWelZ/naeyc-2026' },
    ],
    contacts: [
      { name: 'Abel Ferro', role: 'Repo creator / technical owner', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-naeyc0a', title: 'Brand direction / campaign concept', date: '2026-07-15', type: 'design', done: false },
      { id: 'dl-naeyc0b', title: 'Design concepts approved', date: '2026-08-01', type: 'design', done: false },
      { id: 'dl-naeyc0c', title: 'Digital assets live (landing page, QR codes)', date: '2026-08-15', type: 'design', done: false },
      { id: 'dl-naeyc1',  title: 'LinkedIn sponsor post published', date: '2026-08-22', type: 'other', done: false },
      { id: 'dl-naeyc2',  title: 'Print files to vendor', date: '2026-09-01', type: 'print', done: false },
      { id: 'dl-naeyc3',  title: 'IG / FB pre-event post', date: '2026-09-10', type: 'other', done: false },
      { id: 'dl-naeyc4',  title: 'Materials shipped to Washington, D.C.', date: '2026-11-15', type: 'shipping', done: false },
      { id: 'dl-naeyc5',  title: 'Final prep check — all systems go', date: '2026-12-03', type: 'review', done: false },
      { id: 'dl-naeyc6',  title: 'NAEYC Annual Conference', date: '2026-12-05', type: 'conference', done: false },
      { id: 'dl-naeyc7',  title: 'Post-event recap post', date: '2026-12-12', type: 'other', done: false },
    ],
    assets: [
      // ── SOCIAL ──────────────────────────────────────────────
      {
        id: 'a-naeyc-s1', title: 'LinkedIn Sponsor Post',
        type: 'social', category: 'social',
        previewColor: 'bg-purple-600', aspectRatio: '4/5', status: 'pending',
        notes: 'Sponsor announcement — PreK.Club branding, show childcare providers how to PreK angle',
        tags: ['social', 'linkedin', 'sponsorship', 'announcement'],
        mapPosition: { x: 55, y: 75 },
      },
      {
        id: 'a-naeyc-s2', title: 'Instagram / Facebook Post',
        type: 'social', category: 'social',
        previewColor: 'bg-purple-400', aspectRatio: '4/5', status: 'pending',
        notes: 'Pre-event IG/FB feed post announcing conference attendance',
        tags: ['social', 'instagram', 'facebook', 'announcement'],
        mapPosition: { x: 235, y: 75 },
      },
      {
        id: 'a-naeyc-s3', title: 'IG Story — See You There',
        type: 'social', category: 'social',
        previewColor: 'bg-violet-500', aspectRatio: '9/16', status: 'pending',
        notes: 'Vertical story — booth location, dates, CTA',
        tags: ['social', 'instagram', 'story', 'promo'],
        mapPosition: { x: 415, y: 75 },
      },
      {
        id: 'a-naeyc-s4', title: 'IG Story — Countdown',
        type: 'social', category: 'social',
        previewColor: 'bg-purple-500', aspectRatio: '9/16', status: 'pending',
        notes: 'Countdown story variants — 5 days / 3 days / Tomorrow',
        tags: ['social', 'instagram', 'story', 'countdown'],
        mapPosition: { x: 235, y: 310 },
      },
      {
        id: 'a-naeyc-s5', title: 'Post-Event Recap',
        type: 'social', category: 'social',
        previewColor: 'bg-violet-400', aspectRatio: '3/4', status: 'pending',
        notes: 'Post-conference recap post for social channels',
        tags: ['social', 'recap', 'post-event'],
        mapPosition: { x: 415, y: 215 },
      },

      // ── DIGITAL ─────────────────────────────────────────────
      {
        id: 'a-naeyc-d1', title: 'Conference Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-violet-600', aspectRatio: '16/9', status: 'pending',
        externalUrl: 'https://play.prek.club/naeyc-2026/',
        notes: 'Planned bWelZ repo for NAEYC-specific PreK.Club landing. Use Mautic formId=7, formName=prekclublandingcapture.',
        tags: ['digital', 'web', 'landing', 'prekclub', 'planned-repo', 'mautic'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-naeyc-d2', title: 'Thank-You Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-violet-400', aspectRatio: '5/3', status: 'pending',
        notes: 'Post-form thank-you page with next steps and demo CTA. Same planned repo as NAEYC landing.',
        tags: ['digital', 'web', 'thank-you'],
        mapPosition: { x: 845, y: 75 },
      },
      {
        id: 'a-naeyc-d4', title: 'PreK.Club Lead Capture Form',
        type: 'landing', category: 'digital',
        previewColor: 'bg-purple-500', aspectRatio: '3/2', status: 'pending',
        notes: 'Use Mautic formId=7, formName=prekclublandingcapture, action=https://marketing.bwelz.org/form/submit?formId=7.',
        tags: ['digital', 'form', 'mautic', 'lead-capture'],
        mapPosition: { x: 1025, y: 75 },
      },
      {
        id: 'a-naeyc-d3', title: 'QR Code — Booth',
        type: 'qr', category: 'digital',
        previewColor: 'bg-slate-600', aspectRatio: '1/1', status: 'pending',
        notes: utmTrackingNotes('https://play.prek.club/naeyc-2026/', 'prekclub2026'),
        tags: ['qr', 'digital'],
        mapPosition: { x: 1205, y: 75 },
      },

      // ── BOOTH ────────────────────────────────────────────────
      {
        id: 'a-naeyc-b1', title: 'Banner — PreK.Club',
        type: 'banner', category: 'booth',
        previewColor: 'bg-purple-500', aspectRatio: '1/3', status: 'pending',
        notes: 'Pull-up retractable banner — PreK.Club branding',
        tags: ['banner', 'print', 'prekclub', 'booth'],
        mapPosition: { x: 55, y: 470 },
      },
      {
        id: 'a-naeyc-b2', title: 'Tabletop Sign',
        type: 'booth', category: 'booth',
        previewColor: 'bg-violet-400', aspectRatio: '5/6', status: 'pending',
        notes: 'Quick-scan interaction point — 3 benefits + QR + CTA',
        tags: ['booth', 'print', 'signage'],
        mapPosition: { x: 235, y: 470 },
      },
      {
        id: 'a-naeyc-b3', title: 'Ad — Conference',
        type: 'ad', category: 'booth',
        previewColor: 'bg-purple-300', aspectRatio: '4/3', status: 'pending',
        notes: 'Conference ad — format TBD',
        tags: ['ad', 'print'],
        mapPosition: { x: 415, y: 470 },
      },
      {
        id: 'a-naeyc-b4', title: 'Swag — 2000 Attendees',
        type: 'swag', category: 'booth',
        previewColor: 'bg-violet-300', aspectRatio: '1/1', status: 'pending',
        notes: 'Swag items for 2000 attendees — items TBD',
        tags: ['swag', 'giveaway', 'booth'],
        mapPosition: { x: 235, y: 590 },
      },

      // ── CONTENT ──────────────────────────────────────────────
      {
        id: 'a-naeyc-c1', title: 'Sponsor Copy',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-500', aspectRatio: '4/3', status: 'pending',
        notes: 'Announcement copy for LinkedIn and social posts — PreK.Club, how to PreK angle',
        tags: ['content', 'copy', 'linkedin'],
        mapPosition: { x: 665, y: 470 },
      },
      {
        id: 'a-naeyc-c2', title: 'CTA Messaging',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-400', aspectRatio: '4/3', status: 'pending',
        notes: 'Primary CTA: Book a Demo / Explore PreK.Club — Educators, Directors, Org Admins',
        tags: ['content', 'copy', 'cta'],
        mapPosition: { x: 845, y: 470 },
      },
      {
        id: 'a-naeyc-c3', title: 'Talking Points',
        type: 'copy', category: 'content',
        previewColor: 'bg-orange-400', aspectRatio: '4/3', status: 'pending',
        notes: 'Booth talking points — show childcare providers how to PreK, enrollment, payments, communication',
        tags: ['content', 'copy', 'talking-points'],
        mapPosition: { x: 1025, y: 470 },
      },
    ],
  },

  {
    id: 'mdhs-better-together-2026',
    title: 'MDHS – Better Together',
    organization: 'MDHS',
    date: '2026-12-01',
    location: 'Mississippi',
    audience: 'Coaches / TA Providers',
    objective: 'Promote WELS — do a family portal',
    company: 'WELS',
    presence: 'Onsite MS Team',
    status: 'planning',
    progress: 5,
    coverGradient: 'from-blue-600 to-indigo-800',
    notes: `Client direction: clone a WELS landing repo from one-goal-2026.

Expected repo owner: bWelZ
Expected repo slug: mdhs-better-together-2026
af3rr0 should create the repo and retain access.
Expected landing: https://welsfoundation.org/lp/mdhs-better-together-2026/
Form: WELS lead generation
Mautic formId: 12
Mautic formName: welslandingcapture`,
    tags: ['wels', 'mississippi', 'mdhs', 'coaches', 'family-portal', 'fall', 'landing-needed', 'bwelz-repo'],
    links: [
      { label: 'Planned Landing Page', url: 'https://welsfoundation.org/lp/mdhs-better-together-2026/' },
      { label: 'Planned Landing Repo', url: 'https://github.com/bWelZ/mdhs-better-together-2026' },
    ],
    contacts: [
      { name: 'Abel Ferro', role: 'Repo creator / technical owner', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-mdhs0a', title: 'Brand assets confirmed', date: '2026-08-15', type: 'other', done: false },
      { id: 'dl-mdhs0b', title: 'Design assets approved', date: '2026-09-15', type: 'design', done: false },
      { id: 'dl-mdhs1',  title: 'Print files to vendor', date: '2026-10-01', type: 'print', done: false },
      { id: 'dl-mdhs2',  title: 'LinkedIn post published', date: '2026-10-10', type: 'other', done: false },
      { id: 'dl-mdhs3',  title: 'IG / FB pre-event post', date: '2026-10-15', type: 'other', done: false },
      { id: 'dl-mdhs4',  title: 'Materials shipped to Mississippi', date: '2026-11-10', type: 'shipping', done: false },
      { id: 'dl-mdhs5',  title: 'Final prep check — all systems go', date: '2026-11-28', type: 'review', done: false },
      { id: 'dl-mdhs6',  title: 'MDHS – Better Together', date: '2026-12-01', type: 'conference', done: false },
      { id: 'dl-mdhs7',  title: 'Post-event recap post', date: '2026-12-08', type: 'other', done: false },
    ],
    assets: [
      // ── SOCIAL ──────────────────────────────────────────────
      {
        id: 'a-mdhs-s1', title: 'LinkedIn Post',
        type: 'social', category: 'social',
        previewColor: 'bg-blue-600', aspectRatio: '4/5', status: 'pending',
        notes: 'Attendance announcement — WELS + family portal angle, MS coaches audience',
        tags: ['social', 'linkedin', 'announcement'],
        mapPosition: { x: 55, y: 75 },
      },
      {
        id: 'a-mdhs-s2', title: 'Instagram / Facebook Post',
        type: 'social', category: 'social',
        previewColor: 'bg-blue-400', aspectRatio: '4/5', status: 'pending',
        notes: 'Pre-event IG/FB post announcing conference attendance',
        tags: ['social', 'instagram', 'facebook', 'announcement'],
        mapPosition: { x: 235, y: 75 },
      },
      {
        id: 'a-mdhs-s3', title: 'Post-Event Recap',
        type: 'social', category: 'social',
        previewColor: 'bg-indigo-400', aspectRatio: '3/4', status: 'pending',
        notes: 'Post-conference recap post for social channels',
        tags: ['social', 'recap', 'post-event'],
        mapPosition: { x: 415, y: 75 },
      },

      // ── DIGITAL ─────────────────────────────────────────────
      {
        id: 'a-mdhs-d0', title: 'Conference Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-indigo-500', aspectRatio: '16/9', status: 'pending',
        externalUrl: 'https://welsfoundation.org/lp/mdhs-better-together-2026/',
        notes: 'Planned bWelZ repo cloned from one-goal-2026. Must use WELS lead generation Mautic formId=12, formName=welslandingcapture.',
        tags: ['digital', 'web', 'landing', 'wels', 'planned-repo', 'mautic'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-mdhs-d2', title: 'WELS Lead Generation Form',
        type: 'landing', category: 'digital',
        previewColor: 'bg-blue-500', aspectRatio: '3/2', status: 'pending',
        notes: 'Use Mautic formId=12, formName=welslandingcapture, action=https://marketing.bwelz.org/form/submit?formId=12.',
        tags: ['digital', 'form', 'mautic', 'lead-capture'],
        mapPosition: { x: 845, y: 75 },
      },
      {
        id: 'a-mdhs-d1', title: 'QR Code — Conference',
        type: 'qr', category: 'digital',
        previewColor: 'bg-slate-600', aspectRatio: '1/1', status: 'pending',
        notes: utmTrackingNotes('https://welsfoundation.org/lp/mdhs-better-together-2026/', 'welsfoundation2026'),
        tags: ['qr', 'digital'],
        mapPosition: { x: 1025, y: 75 },
      },

      // ── BOOTH ────────────────────────────────────────────────
      {
        id: 'a-mdhs-b1', title: 'Banner — WELS',
        type: 'banner', category: 'booth',
        previewColor: 'bg-blue-600', aspectRatio: '1/3', status: 'pending',
        notes: 'Pull-up retractable banner — WELS branding',
        tags: ['banner', 'print', 'wels', 'booth'],
        mapPosition: { x: 55, y: 470 },
      },
      {
        id: 'a-mdhs-b2', title: 'Swag — 500 Attendees',
        type: 'swag', category: 'booth',
        previewColor: 'bg-indigo-400', aspectRatio: '1/1', status: 'pending',
        notes: 'Swag items for 500 attendees — items TBD',
        tags: ['swag', 'giveaway', 'booth'],
        mapPosition: { x: 235, y: 470 },
      },

      // ── CONTENT ──────────────────────────────────────────────
      {
        id: 'a-mdhs-c1', title: 'Sponsor Copy',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-500', aspectRatio: '4/3', status: 'pending',
        notes: 'Announcement copy for LinkedIn and social posts — WELS, family portal angle',
        tags: ['content', 'copy', 'linkedin'],
        mapPosition: { x: 665, y: 470 },
      },
      {
        id: 'a-mdhs-c2', title: 'Talking Points — Family Portal',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-400', aspectRatio: '4/3', status: 'pending',
        notes: 'Booth talking points — WELS family portal for MS coaches and TA providers',
        tags: ['content', 'copy', 'talking-points'],
        mapPosition: { x: 845, y: 470 },
      },
    ],
  },

  {
    id: 'facct-alliance-2026',
    title: "FACCT — Florida Alliance of Children's Councils & Trusts",
    organization: "Florida Alliance of Children's Councils & Trusts",
    date: '2026-12-31',
    location: 'TBD',
    audience: 'Coaches / TA Providers',
    objective: 'Plan WELS/FACCT follow-up campaign and lead capture once conference details are confirmed',
    company: 'WELS',
    presence: 'Planned landing + conference assets',
    status: 'planning',
    progress: 0,
    coverGradient: 'from-rose-500 to-red-700',
    notes: `Client direction: clone a WELS landing repo from one-goal-2026 once event details are confirmed.

Expected repo owner: bWelZ
Expected repo slug: facct-alliance-2026
af3rr0 should create the repo and retain access.
Expected landing: https://welsfoundation.org/lp/facct-alliance-2026/
Form: WELS lead generation
Mautic formId: 12
Mautic formName: welslandingcapture`,
    tags: ['florida', 'alliance', 'councils', 'trusts', 'wels', 'landing-needed', 'bwelz-repo'],
    links: [
      { label: 'Planned Landing Page', url: 'https://welsfoundation.org/lp/facct-alliance-2026/' },
      { label: 'Planned Landing Repo', url: 'https://github.com/bWelZ/facct-alliance-2026' },
    ],
    contacts: [
      { name: 'Abel Ferro', role: 'Repo creator / technical owner', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-facct0', title: 'Conference details confirmed (date, location, brand, presence, assets)', date: '2026-07-01', type: 'other', done: false },
    ],
    assets: [
      {
        id: 'a-facct-d1', title: 'Conference Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-rose-500', aspectRatio: '16/9', status: 'pending',
        externalUrl: 'https://welsfoundation.org/lp/facct-alliance-2026/',
        notes: 'Planned bWelZ repo cloned from one-goal-2026. Must use WELS lead generation Mautic formId=12, formName=welslandingcapture.',
        tags: ['digital', 'web', 'landing', 'wels', 'planned-repo', 'mautic'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-facct-d2', title: 'WELS Lead Generation Form',
        type: 'landing', category: 'digital',
        previewColor: 'bg-red-500', aspectRatio: '3/2', status: 'pending',
        notes: 'Use Mautic formId=12, formName=welslandingcapture, action=https://marketing.bwelz.org/form/submit?formId=12.',
        tags: ['digital', 'form', 'mautic', 'lead-capture'],
        mapPosition: { x: 845, y: 75 },
      },
      {
        id: 'a-facct-d3', title: 'QR & UTM Tracking URLs',
        type: 'qr', category: 'digital',
        previewColor: 'bg-slate-600', aspectRatio: '1/1', status: 'pending',
        notes: utmTrackingNotes('https://welsfoundation.org/lp/facct-alliance-2026/', 'welsfoundation2026'),
        tags: ['qr', 'digital', 'utm'],
        mapPosition: { x: 1025, y: 75 },
      },
      {
        id: 'a-facct-s1', title: 'Attendance Announcement Post',
        type: 'social', category: 'social',
        previewColor: 'bg-rose-500', aspectRatio: '4/5', status: 'pending',
        notes: 'Social post announcing attendance — brand and copy TBD',
        tags: ['social', 'linkedin', 'announcement'],
        mapPosition: { x: 55, y: 75 },
      },
      {
        id: 'a-facct-b1', title: 'Banner — TBD',
        type: 'banner', category: 'booth',
        previewColor: 'bg-red-500', aspectRatio: '1/3', status: 'pending',
        notes: 'Banner — brand and artwork TBD',
        tags: ['banner', 'print', 'booth'],
        mapPosition: { x: 55, y: 300 },
      },
      {
        id: 'a-facct-c1', title: 'Copy — TBD',
        type: 'copy', category: 'content',
        previewColor: 'bg-amber-400', aspectRatio: '4/3', status: 'pending',
        notes: 'Announcement copy and talking points — brand and objective TBD',
        tags: ['content', 'copy'],
        mapPosition: { x: 300, y: 300 },
      },
    ],
  },
  {
    id: 'cfm-summit-2026',
    title: '5th Annual CFM Summit 2026',
    organization: "Children's Foundation of Mississippi",
    date: '2026-01-01',
    location: 'Mississippi',
    audience: 'Early childhood educators, leaders, and Mississippi early childhood partners',
    objective: "Support Children's Foundation of Mississippi and reinforce WELS as an early childhood systems partner",
    company: 'WELS',
    presence: 'Supporter / landing + postcard-style ad',
    status: 'completed',
    progress: 100,
    coverGradient: 'from-pink-400 to-sky-500',
    notes: `WELS supporter presence for Children's Foundation of Mississippi, 5th Annual CFM Summit 2026.

Date is currently a placeholder in Atlas until the exact CFM Summit 2026 date is confirmed from source materials.

Landing repo detected locally: /Users/abelferro/GitHub/abelferro/cfm-2026
Landing path: https://welsfoundation.org/lp/cfm-2026/

Creative direction from postcard/ad:
- Warm, optimistic, educator-centered language
- Proud supporter framing instead of hard selling
- Mississippi early childhood workforce context
- Soft WELS brand presence with a handwritten "learn more" CTA
- "Made with love in Miami" footer warmth`,
    tags: ['wels', 'cfm', 'mississippi', 'children-foundation', 'summit', 'supporter', 'postcard', 'ad', 'early-childhood'],
    links: [
      { label: 'Landing Page', url: 'https://welsfoundation.org/lp/cfm-2026/' },
      { label: 'Local Landing Repo', url: 'https://github.com/abelferro/cfm-2026' },
    ],
    contacts: [
      { name: 'Carlos M. Valdes', role: 'Client / owner approval reference', group: 'Internal Team' },
      { name: 'Abel Ferro', role: 'Technical owner / Atlas entry', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-cfm0', title: 'Exact CFM Summit 2026 date confirmed in Atlas', date: '2026-01-01', type: 'other', done: false },
    ],
    assets: [
      {
        id: 'a-cfm-d1', title: 'CFM Summit 2026 Landing Page',
        type: 'landing', category: 'digital',
        previewColor: 'bg-sky-500', aspectRatio: '16/9', status: 'approved',
        externalUrl: 'https://welsfoundation.org/lp/cfm-2026/',
        notes: "WELS Systems Foundation supporter landing for Children's Foundation of Mississippi and the 5th Annual CFM Summit 2026.",
        tags: ['digital', 'web', 'landing', 'wels', 'cfm'],
        mapPosition: { x: 665, y: 75 },
      },
      {
        id: 'a-cfm-c1', title: 'Postcard / Ad Copy — CFM Summit 2026',
        type: 'copy', category: 'content',
        previewColor: 'bg-pink-500', aspectRatio: '4/5', status: 'approved',
        notes: `Children's Foundation of Mississippi / CFM Summit 2026 postcard-style supporter ad.

Main headline:
Nurture educators,
cultivate leaders
for tomorrow

Body copy:
Efforts across Mississippi are strengthening the early childhood profession and building a brighter future for children.

Supporter line:
Proud Supporter of the
Children's Foundation of Mississippi
and the impactful work they do.

CTA:
Learn More

Footer:
Made with love in Miami

Style notes to reuse:
- Lead with mission and educator dignity, not product.
- Use nurturing/growth language for early childhood audiences.
- Keep WELS as a proud supporter of the foundation's work, not the center of the story.
- Pair warm emotional copy with one clear CTA.
- "Made with love in Miami" adds the personal Carlos/WELS warmth without distracting from the partner.`,
        tags: ['content', 'copy', 'postcard', 'ad', 'supporter', 'approved-style', 'cfm', 'mississippi'],
        relatedAssets: ['a-cfm-d1'],
        mapPosition: { x: 665, y: 470 },
      },
      {
        id: 'a-cfm-b1', title: 'QR Code — Learn More',
        type: 'qr', category: 'digital',
        previewColor: 'bg-blue-600', aspectRatio: '1/1', status: 'approved',
        notes: utmTrackingNotes('https://welsfoundation.org/lp/cfm-2026/', 'welsfoundation2026', [
          { label: 'CFM Summit supporter ad QR', source: 'cfm_summit_ad', medium: 'qr' },
        ]),
        tags: ['qr', 'digital', 'utm', 'cfm'],
        relatedAssets: ['a-cfm-c1'],
        mapPosition: { x: 845, y: 470 },
      },
    ],
  },
  {
    id: 'build-2025',
    title: 'BUILD 2025',
    organization: 'BUILD Initiative',
    date: '2025-12-02',
    endDate: '2025-12-04',
    location: 'Los Angeles, CA',
    audience: 'Early childhood leaders, coalitions, systems builders, and family-serving organizations',
    objective: 'Sponsor BUILD 2025 and show WELS support for early childhood coalitions, leadership, community, and strong systems',
    company: 'WELS',
    presence: 'Sponsor / social campaign',
    status: 'completed',
    progress: 100,
    coverGradient: 'from-sky-500 to-orange-500',
    notes: `Historical WELS social campaign reference from BUILD 2025.

Event appears to have started on December 2, 2025, with event copy saying "today through Thursday, December 4th" in Los Angeles, CA.

Theme captured from post copy:
BUILD 2025: The Heart of the Matter - Building Community and Strong Systems for Young Children and Families.

Carlos/WELS style learning:
- Sponsor language stays proud but community-centered.
- Use the official event theme in full for credibility.
- Emphasis is coalitions, leadership, strong systems, and community.
- Natalia correction confirms the preferred phrase: "Talk with peers and build community."
- Hashtags were concise and mission-aligned: #BUILD25 #Sponsor #EarlyChildhood #Leadership #SystemsBuilding #Community #Networking`,
    tags: ['wels', 'build-2025', 'historical', 'social', 'sponsor', 'early-childhood', 'leadership', 'systems-building', 'community'],
    links: [],
    contacts: [
      { name: 'Carlos M. Valdes', role: 'Client / owner approval reference', group: 'Internal Team' },
      { name: 'Natalia Coletti', role: 'Copy correction reference', group: 'Internal Team' },
      { name: 'Abel Ferro', role: 'Original post draft reference', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-build0', title: 'BUILD 2025 social sponsor posts published', date: '2025-12-02', type: 'other', done: true },
    ],
    assets: [
      {
        id: 'a-build-s1', title: 'Post 1 — Coalitions & Leadership Focus',
        type: 'social', category: 'content',
        previewColor: 'bg-sky-500', aspectRatio: '4/5', status: 'approved',
        notes: `Post 1: Coalitions & Leadership Focus

We are proud to be a sponsor of BUILD 2025: The Heart of the Matter - Building Community and Strong Systems for Young Children and Families.

Join us today through Thursday, December 4th in Los Angeles, CA. During the conference, BUILD makes space for early childhood leaders to gather during this unprecedented time to build the coalitions needed to tackle tough issues.

#BUILD25 #Sponsor #EarlyChildhood #Leadership #SystemsBuilding

Style notes to reuse:
- Lead with "proud to be a sponsor" when WELS is supporting, not selling.
- Name the full event theme.
- Emphasize early childhood leaders, coalitions, and systems-building.
- Keep the tone serious, timely, and respectful.`,
        tags: ['content', 'copy', 'social', 'linkedin', 'sponsor', 'leadership', 'coalitions', 'approved-style'],
        mapPosition: { x: 55, y: 75 },
      },
      {
        id: 'a-build-s2', title: 'Post 2 — Say Hello / Build Community',
        type: 'social', category: 'content',
        previewColor: 'bg-orange-500', aspectRatio: '1/1', status: 'approved',
        notes: `Post 2: Say Hello / Build Community

We are proud to be a sponsor of BUILD 2025: The Heart of the Matter - Building Community and Strong Systems for Young Children and Families.

Join us today through Thursday, December 4th in Los Angeles, CA. Swing by our table and say hello. Talk with peers and build community.

#BUILD25 #Sponsor #Community #EarlyChildhood #Networking

Correction/reference:
Natalia corrected the final phrase to "Talk with peers and build community."

Style notes to reuse:
- For onsite/social posts, invite people to the table in plain language.
- "Say hello" is preferred over a hard CTA.
- "Talk with peers and build community" is the approved community-building phrasing.
- Hashtags can shift from leadership/systems to community/networking depending on the post angle.`,
        tags: ['content', 'copy', 'social', 'linkedin', 'sponsor', 'community', 'networking', 'approved-style', 'correction'],
        mapPosition: { x: 235, y: 75 },
      },
    ],
  },
  {
    id: 'smart-start-2025-wels',
    title: 'Smart Start Conference 2025',
    organization: 'Smart Start',
    date: '2025-01-01',
    location: 'TBD',
    audience: 'Early childhood systems leaders, programs, providers, and community partners',
    objective: 'Present WELS as a systems partner for early childhood communities through data, technology, collaboration, and measurable impact',
    company: 'WELS',
    presence: 'Platinum Sponsor / postcard-style ad',
    status: 'completed',
    progress: 100,
    coverGradient: 'from-violet-500 to-cyan-500',
    notes: `Historical WELS creative reference for Smart Start Conference 2025.

Date and location are placeholders until the exact conference details are confirmed.

Core message:
Smart minds start with smart systems. WELS supports smarter communities by connecting the right people, tools, and insights.

Carlos/WELS style learning:
- Strong headline with wordplay tied to the event name.
- Mission-forward body copy with systems language.
- Impact stats give credibility without turning the piece into a dashboard.
- Sponsor line stays clear and humble.
- CTA is simple: learn more.`,
    tags: ['wels', 'smart-start', '2025', 'historical', 'sponsor', 'impact', 'systems', 'early-childhood'],
    links: [],
    contacts: [
      { name: 'Carlos M. Valdes', role: 'Client / owner approval reference', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-ss25-0', title: 'Exact Smart Start Conference 2025 date confirmed in Atlas', date: '2025-01-01', type: 'other', done: false },
    ],
    assets: [
      {
        id: 'a-ss25-c1', title: 'Ad Copy — Smart Minds / Smart Systems',
        type: 'copy', category: 'content',
        previewColor: 'bg-cyan-500', aspectRatio: '4/5', status: 'approved',
        notes: `Smart Start Conference 2025 WELS sponsor ad.

Main headline:
Smart Minds
Start with
Smart Systems

Body copy:
At WELS Systems Foundation, we believe building smarter communities starts with connecting the right people, tools, and insights.

That's why we support early childhood systems with the data, technology, and collaboration needed to drive equitable outcomes across programs, providers, and communities.

Impact stats:
197K+ Teachers Impacted
23K+ Sites Supported
$109M+ Paid to Support Teachers and Schools

Sponsor line:
WELS Systems Foundation is proud to be a Platinum Sponsor of the 2025 Smart Start Conference.

CTA:
learn more

Style notes to reuse:
- Tie the headline to the event name when possible.
- Use "people, tools, and insights" as a concise WELS systems frame.
- Use impact numbers as proof points, stacked and visually bold.
- Keep the sponsor language direct and dignified.`,
        tags: ['content', 'copy', 'ad', 'sponsor', 'smart-start', 'impact', 'approved-style'],
        mapPosition: { x: 665, y: 470 },
      },
    ],
  },
  {
    id: 'champions-for-children-2024',
    title: 'Champions for Children 2024',
    organization: 'Champions for Children',
    date: '2024-01-01',
    location: 'Miami, FL',
    audience: 'Children-focused community partners, educators, programs, and honorees',
    objective: 'Thank and recognize community champions while positioning WELS as a caring solutions partner',
    company: 'WELS',
    presence: 'Recognition / thank-you creative',
    status: 'completed',
    progress: 100,
    coverGradient: 'from-sky-600 to-pink-600',
    notes: `Historical WELS thank-you creative, likely Champions for Children 2024.

Date is a placeholder until the exact event date is confirmed.

Carlos/WELS style learning:
- Gratitude message leads, not product language.
- Recognition lists names/organizations prominently.
- WELS brand can sit quietly while the honorees are centered.
- Core caring-solutions line repeats across years: "You care for our children. We provide you with caring solutions."
- "Made with love in Miami" works as an emotional brand cue.`,
    tags: ['wels', 'champions-for-children', '2024', 'historical', 'thank-you', 'recognition', 'caring-solutions'],
    links: [],
    contacts: [
      { name: 'Carlos M. Valdes', role: 'Client / owner approval reference', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-ch24-0', title: 'Exact Champions for Children 2024 date confirmed in Atlas', date: '2024-01-01', type: 'other', done: false },
    ],
    assets: [
      {
        id: 'a-ch24-c1', title: 'Thank-You Creative — WELS',
        type: 'copy', category: 'content',
        previewColor: 'bg-pink-500', aspectRatio: '2/3', status: 'approved',
        notes: `Champions for Children 2024 WELS thank-you creative.

Headline:
Thank You

Recognized names / organizations:
Dr. William E. Pelham, Jr.
Bianca Sandoval
Zoe A. Terry
Ruban Roberts
The Children's Trust Books for Free
The Liberty City Optimist Club of Florida
University of Miami Jump Start

Main message:
You care for our children.
We provide you with caring solutions.

Brand cue:
Made with love in Miami

Style notes to reuse:
- Make "Thank You" large, handwritten, and human.
- Recognition creative should put people and partner organizations first.
- The WELS product/company promise is one short closing line.
- Bright, joyful child-centered visuals fit this gratitude context.`,
        tags: ['content', 'copy', 'thank-you', 'recognition', 'champions', 'approved-style'],
        mapPosition: { x: 665, y: 470 },
      },
    ],
  },
  {
    id: 'champions-for-children-2023-bwelz',
    title: 'Champions for Children 2023',
    organization: 'Champions for Children',
    date: '2023-01-01',
    location: 'Miami, FL',
    audience: 'Children-focused community partners, educators, programs, and honorees',
    objective: 'Introduce the BWELZ caring solutions identity while thanking Champions for Children honorees',
    company: 'BWELZ',
    presence: 'Recognition / coming-soon creative',
    status: 'completed',
    progress: 100,
    coverGradient: 'from-fuchsia-600 to-lime-500',
    notes: `Historical BWELZ creative, believed to be Champions for Children 2023.

Date is a placeholder until the exact event date is confirmed.

This piece predates/announces the 2024 BWELZ direction and shows the merge language:
Bluejeanware + WELS + ZipData = bwelz.

Carlos/BWELZ style learning:
- Thank-you / recognition energy is warm and child-centered.
- The "caring solutions" language is central to BWELZ.
- Brand equation is explicit and useful for explaining the transformation.
- "coming in 2024!" was used as a future-facing launch cue.`,
    tags: ['bwelz', 'champions-for-children', '2023', 'historical', 'thank-you', 'recognition', 'caring-solutions', 'launch'],
    links: [],
    contacts: [
      { name: 'Carlos M. Valdes', role: 'Client / owner approval reference', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-ch23-0', title: 'Exact Champions for Children 2023 date confirmed in Atlas', date: '2023-01-01', type: 'other', done: false },
    ],
    assets: [
      {
        id: 'a-ch23-c1', title: 'Thank-You Creative — BWELZ Coming in 2024',
        type: 'copy', category: 'content',
        previewColor: 'bg-fuchsia-600', aspectRatio: '2/3', status: 'approved',
        notes: `Champions for Children 2023 BWELZ thank-you / coming-soon creative.

Brand:
bwelz
caring solutions

Headline:
Thank You

Recognized names / organizations:
Evelio C. Torres
Abigail Peskin
Lauren Page
Regina Davis
Breakthrough Miami
Early Learning Coalition of Miami-Dade/Monroe
Jessie Trice Community Health System

Main message:
You care for our children.
We provide you with caring solutions.

Brand equation:
Bluejeanware + WELS + ZipData = bwelz

Launch line:
coming in 2024!

CTA:
Learn more

Style notes to reuse:
- "You care for our children. We provide you with caring solutions." is a reusable BWELZ/WELS gratitude line.
- The brand equation helps explain BWELZ during transition moments.
- Use child-centered illustration and bold contrast for emotional warmth.`,
        tags: ['content', 'copy', 'thank-you', 'recognition', 'bwelz', 'launch', 'approved-style'],
        mapPosition: { x: 665, y: 470 },
      },
    ],
  },
  {
    id: 'demoya-foundation-bwelz-2023',
    title: 'DeMoya Foundation Event',
    organization: 'DeMoya Foundation',
    date: '2023-01-01',
    location: 'Miami, FL',
    audience: 'Community partners, families, and children-focused supporters',
    objective: 'Introduce BWELZ as the future caring-solutions identity connected to Bluejeanware, WELS, and ZipData',
    company: 'BWELZ',
    presence: 'Coming-soon / QR creative',
    status: 'completed',
    progress: 100,
    coverGradient: 'from-teal-700 to-pink-600',
    notes: `Historical BWELZ coming-soon creative from a DeMoya Foundation event.

Date is a placeholder until the exact event date is confirmed. The creative says "coming in 2024!".

Carlos/BWELZ style learning:
- Big emotional statement: "bwelz is our journey, this is our future."
- Use the merger equation at the bottom to explain BWELZ.
- QR CTA remains simple: Learn more.
- Strong, playful child illustration matches the caring-solutions identity.`,
    tags: ['bwelz', 'demoya-foundation', 'historical', 'coming-soon', 'qr', 'caring-solutions', 'launch'],
    links: [],
    contacts: [
      { name: 'Carlos M. Valdes', role: 'Client / owner approval reference', group: 'Internal Team' },
    ],
    deadlines: [
      { id: 'dl-demoya0', title: 'Exact DeMoya Foundation event date confirmed in Atlas', date: '2023-01-01', type: 'other', done: false },
    ],
    assets: [
      {
        id: 'a-demoya-c1', title: 'Coming Soon Creative — BWELZ Journey',
        type: 'copy', category: 'content',
        previewColor: 'bg-teal-700', aspectRatio: '16/9', status: 'approved',
        notes: `DeMoya Foundation event BWELZ coming-soon creative.

Brand:
bwelz
caring solutions

Launch cue:
coming in 2024!

Main message:
bwelz is our journey,
this is our future

CTA:
Learn more

Brand equation:
Bluejeanware + WELS + ZipData = bwelz

Style notes to reuse:
- Use future-facing, identity-building language when explaining BWELZ.
- "Our journey / our future" frames the brand transition emotionally.
- Pair the emotional line with the concrete brand equation.
- QR CTA can stay short because the creative does the storytelling.`,
        tags: ['content', 'copy', 'bwelz', 'coming-soon', 'demoya', 'qr', 'approved-style'],
        mapPosition: { x: 665, y: 470 },
      },
    ],
  },
];

export const getEventById = (id: string) => events.find((e) => e.id === id);
