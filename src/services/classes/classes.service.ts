import axios from "axios";
import { useAppStore } from "../../store/app";

export default class ClassService {
    store = useAppStore();

    async getClasses() {
        const url = `http://localhost:3001/api/class/`;
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
                text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

}