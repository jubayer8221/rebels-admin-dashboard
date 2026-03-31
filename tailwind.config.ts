import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                rebels: {
                    blue: '#2563eb',
                    black: '#000000',
                }
            },
            borderRadius: {
                'rebels': '2rem', // Custom 32px rounding
            }
        },
    },
    plugins: [],
} satisfies Config