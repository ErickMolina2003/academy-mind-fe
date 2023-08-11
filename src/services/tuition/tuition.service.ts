import axios from "axios";
import { useAppStore } from "../../store/app";
import { createTuition } from "../../models/tuition";

export default class TuitionService {
  store = useAppStore();

  async createTuition(tuitionData: createTuition) {
    const url = `http://localhost:3001/api/tuition`;
    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: tuitionData,
      });

      if (response.status === 201) {
        const data = await response.data;

        if (data.statusCode === 200) {
          this.store.setToaster({
            isActive: true,
            text: "Clase matriculada con éxito.",
            color: "success",
          });
        } else {
          this.store.setToaster({
            isActive: true,
            text: data.message,
            color: "error",
          });
        }
        return data;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al crear la clase. Por favor, inténtelo de nuevo más tarde.",
          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al crear la clase. Por favor, inténtelo de nuevo más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async getTuitions() {
    const url = `http://localhost:3001/api/tuition`;
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });

      if (response.status === 200) {
        const data = await response.data;

        if (data.statusCode !== 200) {
          this.store.setToaster({
            isActive: true,
            text: "Error al obtener las matriculas. Por favor, inténtelo de nuevo más tarde.",
            color: "error",
          });
        }
        return data;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al obtener las matriculas. Por favor, inténtelo de nuevo más tarde.",
          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener las matriculas. Por favor, inténtelo de nuevo más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async getTuitionsByStudent(idStudent: string, idPeriod: string) {
    const url = `http://localhost:3001/api/tuition/student/${idStudent}?periodId=${idPeriod}`;
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });

      if (response.status === 200) {
        const data = await response.data;

        if (data.statusCode !== 200) {
          this.store.setToaster({
            isActive: true,
            text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
            color: "error",
          });
        }
        return data;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async getTuitionsBySection(idSection: string) {
    const url = `http://localhost:3001/api/tuition/section/${idSection}`;
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });

      if (response.status === 200) {
        const data = await response.data;

        if (data.statusCode !== 200) {
          this.store.setToaster({
            isActive: true,
            text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
            color: "error",
          });
        }
        return data;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async deleteTuition(idTuition: string) {
    const url = `http://localhost:3001/api/tuition/${idTuition}`;

    try {
      const response = await axios({
        method: "DELETE",

        url: url,
      });

      if (response.status === 200) {
        const data = await response.data;

        if (data.statusCode !== 200) {
          this.store.setToaster({
            isActive: true,

            text: "Error al cancelar las secciones. Por favor, inténtelo de nuevo más tarde.",

            color: "error",
          });
        } else {
          this.store.setToaster({
            isActive: true,

            text: "Sección cancelada con éxito.",

            color: "success",
          });
        }

        return data;
      } else {
        this.store.setToaster({
          isActive: true,

          text: "Error al cancelar las secciones. Por favor, inténtelo de nuevo más tarde.",

          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,

        text: "Error al cancelar las secciones. Por favor, inténtelo de nuevo más tarde.",

        color: "error",
      });

      return error;
    }
  }
  async getTuitionsStudentByPeriod(idPeriod: number) {
    const url = `http://localhost:3001/api/tuition/period-students/${idPeriod}`;
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });

      if (response.status === 200) {
        const data = await response.data;

        if (data.statusCode !== 200) {
          this.store.setToaster({
            isActive: true,
            text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
            color: "error",
          });
        }
        return data;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async getTuitionsByStudentAll(idStudent: string) {
    const url = `http://localhost:3001/api/tuition/student/${idStudent}`;
    try {
      const response = await axios({
        method: "GET",
        url: url,
      });

      if (response.status === 200) {
        const data = await response.data;

        if (data.statusCode !== 200) {
          this.store.setToaster({
            isActive: true,
            text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
            color: "error",
          });
        }
        return data;
      } else {
        this.store.setToaster({
          isActive: true,
          text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
          color: "error",
        });
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
        color: "error",
      });
      return error;
    }
  }
}
