import axios from "axios";
import { useAppStore } from "@/store/app";

export default class TeacherService {
    store = useAppStore();

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