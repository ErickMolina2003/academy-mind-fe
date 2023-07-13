import axios from "axios";
import { useAppStore } from "@/store/app";  


export default class StudentService {
    store = useAppStore();

    async getStudents() {
        const url = `http://localhost:3001/api/student`;
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
                text: "Error al obtener la lista de estudiantes. Por favor, inténtalo de nuevo o más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getStudent(id: string) {
        const url = `http://localhost:3001/api/student/${id}`;
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
                text: "Error al obtener la información del estudiante. Por favor, inténtalo de nuevo o más tarde.",
                color: "error",
            });
            return error;
        }
    }
}