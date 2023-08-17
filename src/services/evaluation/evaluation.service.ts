import axios from "axios";
import { useAppStore } from "../../store/app";

export default class EvaluationService {
    store = useAppStore();

    // Obtener docentes con evaluaciones
    async getTeacherWithEvaluations(idDepartment:string) {
        
        const url = `http://localhost:3001/api/teacher-evaluation/teachers/${idDepartment}`;
        try {
            const response = await axios({
                method: "GET",
                url: url
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {

                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener docentes. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener docentes. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener docentes. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Obtener evaluaciones de un docente en una clase
    async getEvaluationOfTeacher(idTeacher:string,idPeriod:string,idClass:string) {
        const url = `http://localhost:3001/api/teacher-evaluation/teachers-notes/${idTeacher}/${idPeriod}/${idClass}`;
        try {
            const response = await axios({
                method: "GET",
                url: url
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {

                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener la evaluacion del docente. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener la evaluacion del docente. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener la evaluacion del docente. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }
}


