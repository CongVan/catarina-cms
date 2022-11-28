export default [
  "strapi::errors",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["*"],
          "img-src": ["*"],
          "media-src": ["*"],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "plugin::request-id.request-id",
];
