/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ['dummyrepo-beta.vercel.app']
    },

    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    }
};

export default nextConfig;
