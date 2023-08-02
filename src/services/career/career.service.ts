import axios from "axios";
import { useAppStore } from "../../store/app";

export default class CareerService {
  store = useAppStore();


  async getCareers() {
    const url = `http://localhost:3001/api/career`;
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
        text: "Error al obtener la lista de carreras. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }
}