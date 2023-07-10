// Utilities
import User from "@/models/user";
import Toaster from "@/models/toaster";
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
    getUser() {
      const newUser = localStorage.getItem("academy-user");
      if (newUser) {
        this.user = JSON.parse(newUser);
      }
    },
    setToaster(toaster: Toaster) {
      this.toaster = toaster;
    },
  },
  getters: {
    userExists(state) {
      return Object.keys(state.user).length !== 0
    }
  }
});
