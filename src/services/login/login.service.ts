import Vue from "vue";
import User from "@/models/User";
import axios from "axios";
import { useAppStore } from "@/store/app";

export default class LoginService {
  async getLoginToken(user: User) {
    const email = user.email;
    const password = user.password;
    const body = {
      email: email,
      password: password,
    };
    const url = "http://127.0.0.1:8000/api/user/token/";

    try {
      const response = await axios({
        method: "post",
        url: url,
        data: body,
      });

      if (response.status === 200) {
        const store = useAppStore();

        const data = await response.data;
        store.setUser(data);

        return data;
      }
    } catch (error) {
      return error;
    }
  }
}
