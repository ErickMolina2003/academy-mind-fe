// Utilities
import User from "@/models/User";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: {},
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
      localStorage.setItem("academy-user", JSON.stringify(this.user));
    },
  },
});
