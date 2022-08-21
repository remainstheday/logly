const withTM = require("next-transpile-modules")(["pintura"]);
const path = require("path");
// We use "transpile mode" to load Pintura as a local npm module.
// Pintura only works on the client side and cannot be built server side.
module.exports = withTM({
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    outputFileTracingRoot: path.join(__dirname, "../../"), // https://nextjs.org/docs/advanced-features/output-file-tracing
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
});
