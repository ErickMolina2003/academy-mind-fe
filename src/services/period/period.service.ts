import axios from "axios";
import { useAppStore } from "../../store/app";
import {PeriodUpdate} from "../../models/period";

export default class PeriodService {
    store = useAppStore();

    async getPeriods() {
        const url = `http://localhost:3001/api/period/`;
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
                text: "Error al obtener los periodos. Por favor, inténtelo de nuevo o más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async updatePeriod(id: number, periodData:PeriodUpdate) {
        const url = `http://localhost:3001/api/period/${id}`;
       
    
        try {
          const response = await axios({
            method: "patch",
            url: url,
            data: periodData,
          });
    
          if (response.status === 200) {
          
            this.store.setToaster({
              isActive: true,
              text: "¡Información actualizada correctamente!",
              color: "success",
            });
          }
        } catch (error) {
          this.store.setToaster({
            isActive: true,
            text: "¡Ha habido un error al actualizar!",
            color: "error",
          });
        }
      }
}
