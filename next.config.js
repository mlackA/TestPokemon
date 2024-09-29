module.exports = {
  async redirects() {
    return [
      // Basic redirect
      {
        destination: '/login',
        source: '/',
        permanent: false,
      }


    ]
  },
}