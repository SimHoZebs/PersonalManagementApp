module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: process.env.NEXT_PUBLIC_VERCEL_URL === "http://localhost:3000"
          ? "http://localhost:3000/:path*"
          : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/:path*`,
      }
    ]
  }
}
