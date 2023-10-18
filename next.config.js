const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ["live.staticflickr.com"],
  },
  i18n,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 5000,
      aggregateTimeout: 300,
    };
    return config;
  },

  env: {
    API_DEV: process.env.NEXT_PUBLIC_API_BASE_URL_BASE_URL,
  },
};

module.exports = nextConfig;
