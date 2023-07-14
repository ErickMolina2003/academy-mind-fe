import axios from "axios";
import { useAppStore } from "@/store/app";

export default class AdminLoginService {
  store = useAppStore();

  async getLoginToken(user: any) {
    const email = user.email;
    const password = user.password;
    const body = {
      email: email,
      password: password,
    };

    const url = "http://localhost:3001/api/user/login";

    try {
      const response = await axios({
        method: "post",
        url: url,
        data: body,
      });
      if (response.status === 201) {
        this.store.setUser(response.data);
        this.store.setToaster({
          isActive: true,
          text: "Bienvenido.",
          color: "success",
        });
        return response.status;
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Datos incorrectos.",
        color: "error",
      });
      return error;
    }
  }
}
