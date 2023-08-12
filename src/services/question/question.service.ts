import axios from "axios";
import { useAppStore } from "../../store/app";
import { evaluation } from "../../models/evaluation";

export default class QuestionService {
    store = useAppStore();

    async getQuestions() {
        const url = `http://localhost:3001/api/question`;
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
                        text: "Error al obtener las preguntas. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las preguntas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las preguntas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Ingresar la nota de una matricula (estudiante)
    async createEvaluation(evaluationData: evaluation) {
        
        const url = `http://localhost:3001/api/teacher-evaluation`;
        try {
            const response = await axios({
                method: "POST",
                url: url,
                data: evaluationData
            });
            
            if (response.status === 201) {
                const data = await response.data;
                
                if (data.statusCode === 200) {

                    this.store.setToaster({
                        isActive: true,
                        text: "Evaluacion creada con éxito.",
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
                    text: "Error al crear las evaluaciones. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al crear las evaluaciones. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }
}