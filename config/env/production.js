module.exports = {
  port: process.env.PORT || 4000,

  sockets: {
    onlyAllowOrigins: [process.env.RENDER_EXTERNAL_URL].filter(Boolean),
  },

  session: {
    cookie: { secure: true },
  },

  http: {
    trustProxy: true,
  },
};
