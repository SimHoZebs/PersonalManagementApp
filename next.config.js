module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: `${process.env.NEXT_PUBLIC_VERCEL_URL}/login`,
        basePath: false,
        permanent: false,
      },
    ]
  }
}
