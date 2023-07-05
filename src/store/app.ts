// Utilities
import User from "@/models/User";
import Toaster from "@/models/Toaster";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: {},
    toaster: {},
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
      localStorage.setItem("academy-user", JSON.stringify(this.user));
    },
    setToaster(toaster: Toaster) {
      this.toaster = toaster;
    },
  },
});
