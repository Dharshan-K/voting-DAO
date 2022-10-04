/** @format */

// /**
//  * @format
//  * @type {import('next').NextConfig}
//  */

// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// };

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "imgix",
    path: "",
  },
};
