import {i18n } from "./next-i18next.config"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ["live.staticflickr.com"],
  },
  i18n,

  env: {
    API_DEV: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
};

module.exports = nextConfig;
