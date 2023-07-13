import axios from "axios";
import { StudentUpdate } from '../../models/user';
import { useAppStore } from "../../store/app";



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

    //update student

    async updateStudent(id: string, studentData: StudentUpdate) {
        const url = `http://localhost:3001/api/student/${id}`;

        try {

            const response = await axios({
                method: "patch",
                url: url,
                data: studentData,
            });


            if (response.status === 200) {
                const user = await response.data.user

                this.store.setUpdatedUser(user);

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
            })

        }


    }
}