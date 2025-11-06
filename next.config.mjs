import nextI18NextConfig from "./next-i18next.config.mjs";

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb"
    }
  },
  images: {
    remotePatterns: []
  },
  i18n: nextI18NextConfig.i18n
};

export default config;
