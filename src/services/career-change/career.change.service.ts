import axios from "axios";
import { useAppStore } from "../../store/app";

export default class CareerChangeService {
  store = useAppStore();

  async getCareerChange(idCenter: string, idCareer: string) {
    const url = `http://localhost:3001/api/career-change/${idCenter}/${idCareer}`;
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });
      const data = await response.data;
      if (data.statusCode === 200) {
        this.store.setToaster({
          isActive: true,
          text: "Solicitud Obtenida correctamente",
          color: "success",
        });
      } else if (data.statusCode === 404) {
        this.store.setToaster({
          isActive: true,
          text: "No hay solicitudes realizadas",
          color: "error",
        });
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al obtener el cambio de carrera. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener la lista de los cambios de carrera. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async CreateCareerChange(data: any) {
    const url = `http://localhost:3001/api/career-change`;
    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: data,
      });
      const dataResponse = await response.data;
      if (dataResponse.statusCode === 200) {
        this.store.setToaster({
          isActive: true,
          text: "Cambio de carrera creado correctamente.",
          color: "success",
        });
      } else if (dataResponse.statusCode === 409) {
        this.store.setToaster({
          isActive: true,
          text: "Usted ya tiene una solicitud pendiente de revisión.",
          color: "error",
        });
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al crear el cambio de carrera. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return dataResponse;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al crear el cambio de carrera. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async ReviewCareerChange(data: any) {
    const url = `http://localhost:3001/api/career-change/review`;
    console.log(data);
    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: data,
      });
      const dataResponse = await response.data;
      if (dataResponse.statusCode === 200) {
        this.store.setToaster({
          isActive: true,
          text: "Cambio de carrera revisado correctamente.",
          color: "success",
        });
      } else if (dataResponse.statusCode === 409) {
        this.store.setToaster({
          isActive: true,
          text: "La solicitud del estudiante ya ha sido revisada.",
          color: "error",
        });
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al revisar el cambio de carrera. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return dataResponse;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al revisar el cambio de carrera. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }
  async getCareerChangeByStudent(idStudent: string) {
    const url = `http://localhost:3001/api/career-change/student/${idStudent}`;
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });
      const data = await response.data;
      if (data.statusCode === 200) {
        this.store.setToaster({
          isActive: true,
          text: "Solicitud Obtenida correctamente",
          color: "success",
        });
      } else if (data.statusCode === 404) {
        this.store.setToaster({
          isActive: true,
          text: "No hay solicitudes realizadas",
          color: "error",
        });
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al obtener el cambio de carrera. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener el cambio de carrera. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async deleteCareerChange(idCareerChange: string) {
    const url = `http://localhost:3001/api/career-change/${idCareerChange}`;
    try {
      const response = await axios({
        method: "DELETE",
        url: url,
      });
      const data = await response.data;
      if (data.statusCode === 200) {
        this.store.setToaster({
          isActive: true,
          text: "Solicitud eliminada correctamente",
          color: "success",
        });
      } else if (data.statusCode === 404) {
        this.store.setToaster({
          isActive: true,
          text: "No hay solicitudes realizadas",
          color: "error",
        });
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al eliminar el cambio de carrera. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al eliminar el cambio de carrera. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }
}
