const withTM = require("next-transpile-modules")(["pintura"]);

module.exports = withTM({
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "https://checkout.stripe.com",
  //       permanent: false,
  //       basePath: false,
  //     },
  //   ];
  // },
  reactStrictMode: true,
  images: {
    domains: [
      "https://admin.logly.world",
      "admin.logly.world",
      "res.cloudinary.com",
    ],
  },
});
