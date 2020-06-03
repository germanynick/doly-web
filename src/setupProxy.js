const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = (app) => {
  app.use(
    "/api/weather",
    createProxyMiddleware({
      target: "https://www.metaweather.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api/weather": "/api",
      },
    })
  )

  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  )
}
