import axios from "axios";
import { useAppStore } from "../../store/app";

export default class RegionalCenterService {
  store = useAppStore();


  async getCenters() {
    const url = `http://localhost:3001/api/regional-center`;
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
        text: "Error al obtener la lista de centros regionales. Por favor, inténtelo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }
}