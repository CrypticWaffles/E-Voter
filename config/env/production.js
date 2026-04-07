module.exports = {
  port: process.env.PORT || 4000,

  hooks: {
    grunt: false,
  },

  sockets: {
    onlyAllowOrigins: [process.env.RENDER_EXTERNAL_URL].filter(Boolean),
  },

  session: {
    cookie: { secure: true },
  },

  http: {
    trustProxy: true,
    middleware: {
      www: require('serve-static')(require('path').resolve(__dirname, '../../assets')),
    },
  },

  models: {
    migrate: 'safe',
  },

  orm: {
    skipProductionWarnings: true,
  },
};
