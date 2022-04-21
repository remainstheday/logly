const withTM = require("next-transpile-modules")(["pintura", "react-pintura"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: [
      "https://admin.logly.world",
      "admin.logly.world",
      "res.cloudinary.com",
    ],
  },
});
