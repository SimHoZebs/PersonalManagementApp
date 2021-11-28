const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  }
})