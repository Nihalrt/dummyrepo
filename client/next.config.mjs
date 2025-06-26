/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: "https",
                hostname: "invent-manage-s3.s3.eu-north-1.amazonaws.com",
                port: "",
                pathname: "/**/*.png",
            }
        ]
    },

    env: {
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    }
};

export default nextConfig;
