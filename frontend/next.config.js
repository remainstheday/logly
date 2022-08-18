const withTM = require("next-transpile-modules")(["pintura"]);

// We use "transpile mode" to load Pintura as a local npm module.
// Pintura only works on the client side and cannot be built server side.
module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
});
