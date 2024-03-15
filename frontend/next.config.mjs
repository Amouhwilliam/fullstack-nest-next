/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/documents',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
