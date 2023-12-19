const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://violation-tracker-api.onrender.com',
      changeOrigin: true,
    })
  );
};

//https://violation-tracker-api.onrender.com/
//https://sound-service-407812.as.r.appspot.com