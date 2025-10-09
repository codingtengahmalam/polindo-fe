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
        sm: "2rem",
        xl: "90px",
      },
    },
    screens: {
      sm: "360px",
      md: "768px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        inter: "Inter",
      },
      spacing: {
        "4.5": "1.125rem",
      },
      lineHeight: {
        "1.1": "110%",
        "1.2": "120%",
        "1.3": "130%",
        "1.4": "140%",
        "1.5": "150%",
        "1.6": "160%",
        "1.75": "175%",
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
