import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns:[
      {
        protocol:'http',
        hostname:'localhost',
        port:'8000',
        pathname:'/**'

      },
      {
        protocol:'http',
        hostname:'165.232.186.192',
        port:'1337',
        pathname:'/**'

      }
    ]
  }
};

export default nextConfig;
