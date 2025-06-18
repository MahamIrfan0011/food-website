/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com'],
  },
  
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
  },
};

