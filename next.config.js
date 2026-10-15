/** @type {import('next').NextConfig} */
const nextConfig = {
  // Old Wix URLs keep working after the switch
  async redirects() {
    return [
      { source: '/blog', destination: '/news', permanent: true },
      { source: '/blog/:path*', destination: '/news', permanent: true },
      { source: '/post/:path*', destination: '/news', permanent: true },
      { source: '/national-teams', destination: '/te-eitei', permanent: true },
      { source: '/leagues-competitions-clubs', destination: '/about', permanent: true },
      { source: '/partnerships', destination: '/get-involved', permanent: true },
    ];
  },
};
module.exports = nextConfig;
