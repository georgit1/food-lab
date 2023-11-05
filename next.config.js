/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['utfs.io', 'www.google.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(csv|tsv)$/,
      use: ['csv-loader'],
    });
    return config;
  },
};
