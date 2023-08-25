import axios from "axios";
import { useAppStore } from "../../store/app";

export default class ExceptionalCancellationService {
  store = useAppStore();

  async getExceptionalCancellation(accountNumber: string) {
    const url = `http://localhost:3001/api/exceptional-cancellation/cancelation-tuitions/${accountNumber}`;
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
          text: "No ha realizado solicitud de cancelaciones excepcionales",
          color: "error",
        });
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al obtener cancelaciones excepcionales. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener la lista de cancelaciones excepcionales. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async CreateExceptionalCancellation(data: any) {
    const url = `http://localhost:3001/api/exceptional-cancellation/`;
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
          text: "Cancelación creada correctamente",
          color: "success",
        });
      } else if (dataResponse.statusCode === 404) {
        this.store.setToaster({
          isActive: true,
          text: "Ya existe una solicitud de cancelación para esta asignatura",
          color: "error",
        });
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al crear la cancelación. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return dataResponse;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al crear la cancelación. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async getAllExceptionalCancellation() {
    const url = `http://localhost:3001/api/exceptional-cancellation/`;
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
          text: "Error al obtener cancelaciones excepcionales. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener la lista de cancelaciones excepcionales. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async updateExceptionalCancellation(idCancellation: string, data: any) {
    const url = `http://localhost:3001/api/exceptional-cancellation/${idCancellation}`;
    try {
      const response = await axios({
        method: "PATCH",
        url: url,
        data: data,
      });
      const dataResponse = await response.data;
      if (dataResponse.statusCode === 200) {
        this.store.setToaster({
          isActive: true,
          text: "Cancelación actualizada correctamente",
          color: "success",
        });
      } else if (dataResponse.statusCode === 404) {
        this.store.setToaster({
          isActive: true,
          text: "No se encuentra en fecha para realizar la cancelación",
          color: "error",
        });
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al actualizar la cancelación. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return dataResponse;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al actualizar la cancelación. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async getAllExceptionaCancellationByCareer(
    careerId: string,
    centerId: string
  ) {
    const url = `http://localhost:3001/api/exceptional-cancellation/by-carrer/${careerId}?center=${centerId}`;
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
          text: "Error al obtener cancelaciones excepcionales. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener la lista de cancelaciones excepcionales. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async getExceptionalCancellationByStudent(accountNumber: string) {
    const url = `http://localhost:3001/api/exceptional-cancellation/by-student/${accountNumber}`;
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
          text: "No ha realizado solicitud de cancelaciones excepcionales",
          color: "error",
        });
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al obtener cancelaciones excepcionales. Por favor, inténtelo de nuevo o más tarde.",
          color: "error",
        });
      }
      return data;
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener la lista de cancelaciones excepcionales. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }
}
