import axios from "axios";
import { ReplacementExam } from "../../models/replacement"
import { useAppStore } from "../../store/app";

export default class ReplacementService {
    store = useAppStore();

    // Reposicion (Crear una solicitud)
    async createApplication(replacementData: ReplacementExam) {
        
        const url = `http://localhost:3001/api/reposition-request/`;
        try {
            const response = await axios({
                method: "POST",
                url: url,
                data: replacementData
            });
            
            if (response.status === 201) {
                const data = await response.data;
                
                if (data.statusCode === 200) {

                    this.store.setToaster({
                        isActive: true,
                        text: "Solicitud realizada con éxito.",
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
                    text: "Error al hacer las solicitudes. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al hacer las solicitudes. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }


    //Obtener las solicitudes de un estudiante
    async getApplicationsOfStudent(idStudent: string) {
        const url = `http://localhost:3001/api/reposition-request/${idStudent}`;
        try {
            const response = await axios({
                method: "GET",
                url: url
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {
                    console.log(data.statusCode);
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener las solicitudes. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las solicitudes. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las solicitudes. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }
}