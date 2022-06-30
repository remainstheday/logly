const withTM = require("next-transpile-modules")(["pintura"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: "",
    domains: [
      "https://logly.world",
      "https://admin.logly.world",
      "admin.logly.world",
      "res.cloudinary.com",
    ],
  },
});
