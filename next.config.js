module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: process.env.NEXT_PUBLIC_VERCEL_URL === "http://localhost:3000"
          ? "http://localhost:3000"
          : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/login`,
      }
    ]
  }
}
