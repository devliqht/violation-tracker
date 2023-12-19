const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://sound-service-407812.as.r.appspot.com',
      changeOrigin: true,
    })
  );
};

//https://sound-service-407812.as.r.appspot.com