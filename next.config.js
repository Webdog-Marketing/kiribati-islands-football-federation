/** @type {import('next').NextConfig} */
const nextConfig = {
  // Old Wix URLs keep working after the switch
  async redirects() {
    return [
      { source: '/blog', destination: '/news', permanent: true },
      { source: '/blog/:path*', destination: '/news', permanent: true },
      { source: '/post/:path*', destination: '/news', permanent: true },
      { source: '/national-teams', destination: '/teams', permanent: true },
      { source: '/leagues-competitions-clubs', destination: '/competitions', permanent: true },
      { source: '/te-eitei', destination: '/teams/mens', permanent: true },
      { source: '/partnerships', destination: '/get-involved', permanent: true },
    ];
  },
};
module.exports = nextConfig;
