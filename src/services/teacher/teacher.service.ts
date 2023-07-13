import axios from "axios";
import { useAppStore } from "@/store/app";

export default class TeacherService {
  store = useAppStore();

  async createTeacher(body: any) {
    const url = `http://localhost:3001/api/teacher`;
    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: body,
      });
      if (response.status === 201) {
        this.store.setToaster({
          isActive: true,
          text: "Docente creado exitosamente.",
          color: "success",
        });
        return response.data;
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "No se pudo crear el docente, intente nuevamente.",
        color: "error",
      });
    }
  }

  async getTeachers() {
    const url = `http://localhost:3001/api/teacher`;
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener la lista de profesores. Por favor, inténtalo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async getTeacher(id: string) {
    const url = `http://localhost:3001/api/teacher/${id}`;
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener la información del profesor. Por favor, inténtalo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }
}
