const withTM = require("next-transpile-modules")(["pintura"]);

module.exports = withTM({
  reactStrictMode: true,
  experimental: {
    // Defaults to 50MB
    isrMemoryCacheSize: 0,
  },
  images: {
    loader: "custom",
    domains: [
      "https://logly.world",
      "https://admin.logly.world",
      "https://res.cloudinary.com",
    ],
  },
});
