// Utilities
import User from "@/models/user";
import Toaster from "@/models/toaster";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    user: {},
    updateTeachers: false,
    updateStudents: false,
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
    setUpdateTeacher(update: boolean,teacher:any) {
      this.updateTeachers = update;
      this.user.teacher = teacher;
      localStorage.setItem("academy-user", JSON.stringify(this.user));
    },
    setUpdateStudent(update: boolean,student:any) {
      this.updateStudents = update;
      this.user.student = student;
      localStorage.setItem("academy-user", JSON.stringify(this.user));
    },
    setUpdatedUser(user: any) {
      this.user = user;
      localStorage.setItem("academy-user", JSON.stringify(this.user));
    },
    setToaster(toaster: Toaster) {
      this.toaster = toaster;
    },
  },
  getters: {
    userExists(state) {
      return Object.keys(state.user).length !== 0;
    },
  },
});
