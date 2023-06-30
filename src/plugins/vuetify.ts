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
          primary: "#28243d",
          "primary-darken-1": "#312d4b",
          secondary: "#9155fd",
          "text-1": "#cac6e0",
          "text-2": "#9e9ab5",
          "text-3": "#746f8b"
        },
      },
    },
  },
});
