import axios from "axios";
import { useAppStore } from "../../store/app";

export default class CenterChangeService {
  store = useAppStore();

  async getCenterChange(idCenter: string, idCareer: string) {
    const url = `http://localhost:3001/api/center-change/${idCenter}/${idCareer}`;
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
          text: "Error al obtener el cambio de centro. Por favor, inténtelo de nuevo o más tarde.",
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

  async CreateCenterChange(data: any) {
    const url = `http://localhost:3001/api/center-change`;
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
          text: "Usted tiene una solicitud de cambio de carrera pendiente de revisión.",
          color: "error",
        });
      } else if (dataResponse.statusCode === 404) {
        this.store.setToaster({
          isActive: true,
          text: "El centro regional seleccionado no ceunta con la carrera que estudia actualmente.",
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

  async ReviewCenterChange(data: any) {
    const url = `http://localhost:3001/api/center-change/review`;
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

  async getCenterChangeByStudent(idStudent: string) {
    const url = `http://localhost:3001/api/center-change/student/${idStudent}`;
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
          text: "Error al obtener el cambio de centro. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener el cambio de centro. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async deleteCenterChange(idCenterChange: string) {
    const url = `http://localhost:3001/api/center-change/${idCenterChange}`;
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
          text: "Error al eliminar el cambio de centro. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al eliminar el cambio de centro. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }
}
