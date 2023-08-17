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
    sections:[],
    units:25
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
    setUpdateTeacher(update: boolean,teacher:any,teachingCareer:any) {
      this.updateTeachers = update;
      this.user.teacher = teacher;
      this.user.teacher.teachingCareer = teachingCareer;
      localStorage.setItem("academy-user", JSON.stringify(this.user));
    },
    setUpdateStudent(update: boolean,student:any, studentCareer:any) {
      this.updateStudents = update;
      this.user.student = student;
      this.user.student.studentCareer = studentCareer;
      
      localStorage.setItem("academy-user", JSON.stringify(this.user));
    },
    setUpdatedUser(user: any) {
      this.user = user;
      localStorage.setItem("academy-user", JSON.stringify(this.user));
    },
    setToaster(toaster: Toaster) {
      this.toaster = toaster;
    },
    setSection(section:any){
        this.sections.push(section);
    },
    addUnits(addition:number){
      this.units += addition;
    },
    substractUnits(reduce:number){
      this.units -= reduce;
    }
  },
  getters: {
    userExists(state) {
      return Object.keys(state.user).length !== 0;
    },
  },
});
