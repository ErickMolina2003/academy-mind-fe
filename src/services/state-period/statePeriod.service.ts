import axios from "axios";
import { useAppStore } from "../../store/app";

export default class StatePeriodService {
    store = useAppStore();

    async getStatePeriods() {
        const url = `http://localhost:3001/api/state-period/`;
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
            text: "Error al obtener los estados de periodo. Por favor, inténtelo de nuevo o más tarde.",
            color: "error",
          });
          return error;
        }
      }
}