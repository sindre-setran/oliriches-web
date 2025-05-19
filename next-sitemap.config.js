module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  sitemapSize: 5000,
  generateRobotsTxt: true, // Generate robots.txt file
  exclude: ["/server-sitemap-index.xml", "/studio"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio"],
      },
    ],
    additionalSitemaps: [`${process.env.NEXT_PUBLIC_BASE_URL}/server-sitemap-index.xml`],
  },
};
