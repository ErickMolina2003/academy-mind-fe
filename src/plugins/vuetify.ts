/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: "#f4f5fa",
          "primary-darken-1": "#ffffff",
          secondary: "#9155fd",
          "secondary-lighthen-1": "#1967b1",
          "text-2": "#8f8c93",
          "text-3": "#a29fa5",
          error: "#ff4c51",
        },
      },
    },
  },
});
