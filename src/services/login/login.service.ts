import User from "@/models/user";
import axios from "axios";
import { useAppStore } from "@/store/app";

export default class LoginService {
  store = useAppStore();

  async loginTeacher(id: string, password: string) {
    const url = "http://localhost:3001/api/teacher/login";

    try {
      const response = await axios({
        method: "post",
        url: url,
        data: { password: password, employeeNumber: id },
      });
      if (response.status === 201) {
        const data = await response.data;
        if (data.statusCode === 200) {
          this.store.setUser(data);
          this.store.setToaster({
            isActive: true,
            text: "Bienvenido!",
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
        text: "Contraseña incorrecta.",
        color: "error",
      });
      return error;
    }
  }

  async loginStudent(id: string, password: string) {
    const url = "http://localhost:3001/api/student/login";

    try {
      const response = await axios({
        method: "post",
        url: url,
        data: { password: password, accountNumber: id },
      });
      if (response.status === 201) {
        const data = await response.data;
        if (data.statusCode === 200) {
          this.store.setUser(data);
          this.store.setToaster({
            isActive: true,
            text: "Bienvenido!",
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
        text: "Contraseña incorrecta.",
        color: "error",
      });
      return error;
    }
  }

  async setPassword(dni: string, password: string, newPassword: string) {
    const body = {
      password: password,
      newPassword: newPassword,
    };

    const url = `http://localhost:3001/api/user/${dni}`;

    try {
      const response = await axios({
        method: "PATCH",
        url: url,
        data: body,
      });

      const data = await response.data;
      if (response.status === 200) {
        this.store.setToaster({
          isActive: true,
          text: "Las contraseña ha sido cambiada exitosamente.",
          color: "success",
        });
      }
      return response;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Las contraseñas no coinciden.",
        color: "error",
      });
      return error;
    }
  }

  async resetPassword(accountNumber: string) {
    const body = {
      accountNumber: accountNumber,
    };

    const url = "http://localhost:3001/api/v2/student";

    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: body,
      });
      if (response.status === 201) {
        this.store.setToaster({
          isActive: true,
          text: "Contraseña reiniciada con exito.",
          color: "success",
        });
      }
      return response;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "No se pudo reiniciar la contraseña.",
        color: "error",
      });
      return error;
    }
  }
}
