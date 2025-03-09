import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kodchasan: ['Kodchasan', 'san-serif'],
        darumadrop: ['Darumadrop One', 'san-serif'],
        shippori: ['Shippori Antique B1', 'serif'],
        liter: ['Liter', 'sanserif'],
        hachimarupop: ['Hachi Maru Pop', 'serif'],
        poppins: ['Poppins', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
