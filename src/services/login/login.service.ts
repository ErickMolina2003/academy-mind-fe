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
          this.store.setUser(data.user);
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
          this.store.setUser(data.user);
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

  async setStudentPassword(dni: string, password: string, newPassword: string) {
    const url = `http://localhost:3001/api/student/change-password/${dni}`;

    try {
      const response = await axios({
        method: "PATCH",
        url: url,
        data: { password: password, newPassword: newPassword },
      });
      if (response.status === 200) {
        const data = await response.data;
        if (data.statusCode === 200) {
          this.store.setToaster({
            isActive: true,
            text: "La contraseña ha sido cambiada exitosamente.",
            color: "success",
          });
        } else {
          this.store.setToaster({
            isActive: true,
            text: "Contraseña actual incorrecta.",
            color: "error",
          });
        }
        return response;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "La contraseña no ha sido cambiada exitosamente.",
          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "La contraseña no ha sido cambiada exitosamente.",
        color: "error",
      });
      return error;
    }
  }

  async setTeacherPassword(dni: string, password: string, newPassword: string) {
    const url = `http://localhost:3001/api/teacher/change-password/${dni}`;

    try {
      const response = await axios({
        method: "PATCH",
        url: url,
        data: { password: password, newPassword: newPassword },
      });
      if (response.status === 200) {
        const data = await response.data;
        if (data.statusCode === 200) {
          this.store.setToaster({
            isActive: true,
            text: "La contraseña ha sido cambiada exitosamente.",
            color: "success",
          });
        } else {
          this.store.setToaster({
            isActive: true,
            text: "Contraseña actual incorrecta.",
            color: "error",
          });
        }
        return response;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "La contraseña no ha sido cambiada exitosamente.",
          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "La contraseña no ha sido cambiada exitosamente.",
        color: "error",
      });
      return error;
    }
  }

  async setAdminPassword(dni: string, password: string, newPassword: string) {
    const url = `http://localhost:3001/api/user/change-password/${dni}`;

    try {
      const response = await axios({
        method: "PATCH",
        url: url,
        data: { password: password, newPassword: newPassword },
      });
      if (response.status === 200) {
        const data = await response.data;
        if (data.statusCode === 200) {
          this.store.setToaster({
            isActive: true,
            text: "La contraseña ha sido cambiada exitosamente.",
            color: "success",
          });
        } else {
          this.store.setToaster({
            isActive: true,
            text: "Contraseña actual incorrecta.",
            color: "error",
          });
        }
        return response;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "La contraseña no ha sido cambiada exitosamente.",
          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "La contraseña no ha sido cambiada exitosamente.",
        color: "error",
      });
      return error;
    }
  }

  async resetStudentPassword(dni: string) {
    const url = `http://localhost:3001/api/student/reset-password`;

    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: { dni: dni },
      });
      if (response.status === 201) {
        const data = await response.data;
        if (data.statusCode === 200) {
          this.store.setToaster({
            isActive: true,
            text: "La contraseña ha sido reiniciada exitosamente.\nRevisa tu correo para ver la contraseña.",
            color: "success",
          });
        } else {
          this.store.setToaster({
            isActive: true,
            text: "Usuario no encontrado.",
            color: "error",
          });
        }
        return response;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Usuario no encontrado.",
          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Usuario no encontrado.",
        color: "error",
      });
      return error;
    }
  }
}
