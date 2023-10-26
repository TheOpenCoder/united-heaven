/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // ! The remotePatterns needs to be removed when we have a access to the real images.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.geojson$/,
      use: ['json-loader'],
    })

    return config
  },
}

module.exports = nextConfig
