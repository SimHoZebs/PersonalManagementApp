module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/', destination: `${process.env.NEXT_PUBLIC_VERCEL_URL}/login` },
    ]
  }
}
