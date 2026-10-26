import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {formats:["image/avif","image/webp"]},
  experimental: {globalNotFound:true},
  async headers(){return [{source:"/(.*)",headers:[{key:"X-Content-Type-Options",value:"nosniff"},{key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},{key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"}]}];},
  async redirects(){return [{source:"/social-media-handling",destination:"/social-media-management",permanent:true},{source:"/human-translation-services",destination:"/translation-services",permanent:true}];},
};
export default nextConfig;
