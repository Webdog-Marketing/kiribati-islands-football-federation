// Built-in content. The site uses this until Airtable is connected,
// and falls back to it if Airtable can't be reached.
// Image paths starting with "/" point at files in /public.

export const news = [
  {
    slug: 'te-eitei-crowned-idc-premier-division-champions',
    title: 'Te Eitei crowned FMF IDC Premier Division champions',
    date: '2026-10-11',
    category: 'Te Eitei',
    image: '/images/te-eitei-lineup.jpg',
    imageAlt: 'The Kiribati starting eleven line up before the IDC Premier Division final in Suva',
    excerpt:
      'On their tournament debut, Kiribati beat Seaqaqa 6\u20131 in the final at HFC Bank Stadium in Suva to win the Premier Division title.',
    featured: true,
    body: `Kiribati\u2019s men\u2019s national team are champions of the Premier Division at the 86th FMF Inter-District Championship. Te Eitei beat Seaqaqa FC 6\u20131 in the final at HFC Bank Stadium, Suva, on Sunday 11 October.

It was Kiribati\u2019s first appearance at the IDC, and the first time in the competition\u2019s history that Fiji Football has invited a neighbouring nation to take part.

## How the final unfolded

The teams went in level at 1\u20131 at half-time. Seaqaqa were reduced to ten men just before the hour, and Te Eitei took control. Ioera put Kiribati back in front three minutes after the red card, Peter Diehm added another on 72 minutes, and the second half finished with five unanswered goals.

The scoreline carried extra meaning. Seaqaqa had beaten Kiribati 4\u20132 in the pool stage, so the final was a chance to put that right, and the players took it.

## A squad built on sand

Many of this squad learned the game on the sandy pitches of home. The team had two weeks of preparation on hard-surface grounds before the tournament, then knocked out Fiji\u2019s Under-17 side 3\u20131 in the semi-final to reach the final.

Head coach Tetabo Manaima thanked the I-Kiribati community in Fiji, and especially the students from the University of the South Pacific who came out in numbers to support the team at every match.

The title came with a $6,000 prize. Te Eitei now head home as champions, with the federation\u2019s focus turning to the next fixtures and the long road to full OFC and FIFA membership.`,
  },
  {
    slug: 'te-eitei-beat-fiji-under-17-to-reach-idc-final',
    title: 'Te Eitei beat Fiji Under-17 to reach the IDC final',
    date: '2026-10-10',
    category: 'Te Eitei',
    image: '/images/te-eitei-celebration.jpg',
    imageAlt: 'Kiribati players celebrate a goal together',
    excerpt:
      'Goals from Peter Diehm, Martin Jr and Nabetari Itiata sent Kiribati into the Premier Division final against Seaqaqa.',
    body: `Kiribati are through to the Premier Division final of the 86th FMF Inter-District Championship after a 3\u20131 win over Fiji\u2019s Under-17 national team at Buckhurst Park, Suva.

Peter Diehm, Martin Jr and Nabetari Itiata scored for Te Eitei against a Fiji side preparing for its Under-17 World Cup qualifying campaign.

Kiribati will face Seaqaqa FC in the final at HFC Bank Stadium. Seaqaqa came from a goal down to beat Tavua 3\u20131 in the other semi-final.`,
  },
  {
    slug: 'kiribati-invited-to-the-fmf-idc',
    title: 'Kiribati invited to the FMF Inter-District Championship',
    date: '2026-09-21',
    category: 'Competitions',
    image: '/images/te-eitei-match-action.jpg',
    imageAlt: 'A Kiribati defender closes down an attacker in front of goal',
    excerpt:
      'For the first time in the tournament\u2019s history, Fiji Football has invited another nation to compete at the IDC.',
    body: `Te Eitei will compete at the 86th FMF Inter-District Championship in Fiji, the first time a nation from outside Fiji has been invited to take part in the competition.

Fiji Football chief executive Mohammed Yusuf described the invitation as a historic occasion for the tournament.

Kiribati will play in the Premier Division alongside Fiji\u2019s Under-17 side and the district teams. This year\u2019s IDC runs across three divisions of eight teams each.

For Kiribati, the tournament is a chance to measure the national team against established Fijian opposition and to give players regular competitive football away from home.`,
  },
];

export const fixtures = [
  {
    id: 'idc-2026-final',
    date: '2026-10-11',
    competition: 'FMF IDC Premier Division',
    round: 'Final',
    home: 'Seaqaqa',
    away: 'Kiribati',
    homeScore: 1,
    awayScore: 6,
    venue: 'HFC Bank Stadium, Suva',
    report: '/news/te-eitei-crowned-idc-premier-division-champions',
  },
  {
    id: 'idc-2026-sf',
    date: '2026-10-10',
    competition: 'FMF IDC Premier Division',
    round: 'Semi-final',
    home: 'Kiribati',
    away: 'Fiji U-17',
    homeScore: 3,
    awayScore: 1,
    venue: 'Buckhurst Park, Suva',
    report: '/news/te-eitei-beat-fiji-under-17-to-reach-idc-final',
  },
];

// Add players in Airtable (Players table). Leave empty here.
export const players = [];

export const staff = [{ name: 'Tetabo Manaima', role: 'Head coach' }];

export const honours = [
  { year: '2026', title: 'FMF Inter-District Championship', detail: 'Premier Division champions, on debut' },
];

export const milestones = [
  { year: '1979', title: 'First recorded international', detail: 'Kiribati face Fiji at the South Pacific Games.', image: '/images/kiribati-aerial.jpg' },
  { year: '2024', title: 'A new identity', detail: 'A national team identity built around the frigatebird of the national emblem.', image: '/images/frigatebird.jpg' },
  { year: '2026', title: 'First trophy abroad', detail: 'Te Eitei win the FMF IDC Premier Division in Suva.', image: '/images/te-eitei-celebration-wide.jpg' },
];

export const products = [
  {
    id: 'jerseys',
    name: 'Kiribati national team jerseys',
    price: '',
    image: '',
    url: 'https://wovn.club',
  },
];

export const partners = [
  { name: 'WOVN', url: 'https://wovn.club', logo: '' },
  { name: 'Webdog Sports Marketing', url: 'https://www.webdogsports.marketing', logo: '' },
];
