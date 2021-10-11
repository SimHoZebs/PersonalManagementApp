module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_VERCEL_URL === "http://localhost:3000"
          ? "http://localhost:3000/api:path*"
          : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/:path*`,
      }
    ]
  }
}
