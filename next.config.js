const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
});

const nextConfig = withPWA({
    reactStrictMode: true,
    compiler: {
      styledComponents: true
    },
});
module.exports = nextConfig;