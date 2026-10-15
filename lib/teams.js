// The four national teams. Edit names, intros and photos here.
export const NATIONAL_TEAMS = ['mens', 'womens', 'futsal', 'youth'];

export const teams = [
  {
    slug: 'mens',
    name: 'Men\u2019s national team',
    short: 'Men\u2019s',
    nickname: 'Te Eitei',
    intro: 'Raised on sandy pitches across the islands, champions in Suva in 2026.',
    image: '/images/te-eitei-celebration-wide.jpg',
    position: '50% 40%',
  },
  {
    slug: 'womens',
    name: 'Women\u2019s national team',
    short: 'Women\u2019s',
    nickname: '',
    intro: 'Building women\u2019s football across Kiribati, from futsal to the full game.',
    image: '',
  },
  {
    slug: 'futsal',
    name: 'Men\u2019s futsal team',
    short: 'Futsal',
    nickname: '',
    intro: 'Outrigger Cup champions in Majuro in 2024.',
    image: '',
  },
  {
    slug: 'youth',
    name: 'Youth national teams',
    short: 'Youth',
    nickname: '',
    intro: 'The next generation of I-Kiribati footballers.',
    image: '',
  },
];

export const teamBySlug = (slug) => teams.find((t) => t.slug === slug);
