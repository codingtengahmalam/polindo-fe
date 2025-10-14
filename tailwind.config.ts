import type { Config } from "tailwindcss";
import twTypography from "@tailwindcss/typography";
import twForms from "@tailwindcss/forms";

export default <Partial<Config>>{
  content: [],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        // sm: "2rem",
        xl: "0px",
      },
    },
    screens: {
      sm: "360px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        inter: "Inter",
        playfair: "Playfair Display",
      },
      colors: {
        title: "#202223",
        subtitle: "#434343",
        brand: {
          DEFAULT: "#e32528",
          "25": "#FCEAE9",
          "50": "#fef2f2",
          "100": "#ffe1e1",
          "200": "#ffc8c9",
          "300": "#ffa2a3",
          "400": "#fd6c6e",
          "500": "#f53e41",
          "600": "#e32528",
          "700": "#be171a",
          "800": "#9d1719",
          "900": "#821a1c",
          "950": "#470809",
        },
        grayscale: {
          "100": "#070707",
          "90": "#111111",
          "80": "#222222",
          "70": "#323232",
          "60": "#434343",
          "50": "#696969",
          "40": "#8E8E8E",
          "30": "#B4B4B4",
          "20": "#D9D9D9",
          "10": "#EDEDED",
          "0": "#FFFFFF",
        },
      },
      spacing: {
        "4.5": "1.125rem",
      },
      lineHeight: {
        "1.0": "100%",
        "1.1": "110%", //17.6px
        "1.2": "120%", //19.2px
        "1.3": "130%", //20.8px
        "1.4": "140%", //22.4px
        "1.5": "150%", //24px
        "1.6": "160%", //25.6px
        "1.75": "175%", //28px
      },
      letterSpacing: {
        "0.5": "0.005em",
      },
    },
  },
  plugins: [
    twTypography,
    twForms({
      strategy: "class",
    }),
  ],
};
