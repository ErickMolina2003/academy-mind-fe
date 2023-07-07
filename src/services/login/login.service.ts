import User from "@/models/User";
import axios from "axios";
import { useAppStore } from "@/store/app";

const userUrl = "http://127.0.0.1:8000/api/user/me/";

export default class LoginService {
  async getLoginToken(user: User) {
    const email = user.email;
    const password = user.password;
    const isTeacher = user.isTeacher;
    const body = {
      accountNumber: isTeacher ? "-1" : email,
      password: password,
      employeeNumber: isTeacher ? email : "-1",
    };
    const url = "http://localhost:3001/api/auth";

    try {
      const response = await axios({
        method: "post",
        url: url,
        data: body,
      });

      const store = useAppStore();
      if (response.status === 201) {
        const data = await response.data;
        store.setUser(data);
        if (response.status === 201) {
          store.setToaster({
            isActive: true,
            text: "Bienvenido!",
            color: "success",
          });
        }
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
