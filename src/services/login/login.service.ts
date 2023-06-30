import User from "@/models/User";
import axios from "axios";
import { useAppStore } from "@/store/app";

const userUrl = "http://127.0.0.1:8000/api/user/me/";

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

        return response.status;
      }
    } catch (error) {
      return error;
    }
  }

  async setPassword(token: string, password: string) {
    const body = {
      password: password,
    };

    try {
      const response = await axios({
        method: "PATCH",
        url: userUrl,
        data: body,
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
