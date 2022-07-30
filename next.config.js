const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["live.staticflickr.com"],
  },
  i18n,
};

module.exports = nextConfig;
