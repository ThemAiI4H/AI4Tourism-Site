/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ai4tourism.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/server-sitemap.xml'],

  // Additional paths
  additionalPaths: async (config) => {
    const result = [];

    // Add destination pages
    const destinations = ['roma', 'firenze', 'venezia', 'napoli', 'milano', 'pisa'];
    destinations.forEach((slug) => {
      result.push({
        loc: `/destinations/${slug}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    });

    return result;
  },

  // Transform function for dynamic routes
  transform: async (config, path) => {
    // Custom priority for different page types
    if (path.includes('/destinations/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },

  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://ai4tourism.com/server-sitemap.xml', // For dynamic content
    ],
  },
};
