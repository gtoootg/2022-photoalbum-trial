const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["live.staticflickr.com"],
  },
  i18n,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },

  env: {
    API_DEV: process.env.API_BASE_URL,
  },
};

module.exports = nextConfig;
