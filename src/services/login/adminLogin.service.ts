import axios from "axios";
import { useAppStore } from "@/store/app";
import User from "../../models/user";

export default class AdminLoginService {
  store = useAppStore();

  async getLoginToken(user: any) {
    const employeeNumber = user.employeeNumber;
    const password = user.password;
    const body = {
      employeeNumber: employeeNumber,
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
        const data = await response.data;
        if (data.statusCode === 200) {
          this.store.setUser(response.data.user);
          this.store.setToaster({
            isActive: true,
            text: "¡Bienvenido!",
            color: "success",
          });
        } else {
          this.store.setToaster({
            isActive: true,
            text: "Contraseña incorrecta.",
            color: "error",
          });
        }
        return response;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Contraseña incorrecta.",
          color: "error",
        });
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
