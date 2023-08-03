import axios from "axios";
import { useAppStore } from "../../store/app";
import { createSection } from "../../models/section";

export default class SectionService {
    store = useAppStore();

    async createSection(sectionData: createSection) {
        
        const url = `http://localhost:3001/api/section/`;
        try {
            const response = await axios({
                method: "POST",
                url: url,
                data: sectionData,
            });
            
            
            if (response.status === 201) {
                const data = await response.data;
                
                if (data.statusCode === 200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Sección creado con éxito.",
                        color: "success",
                    });
                }else{
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
                    text: "Error al crear las secciones. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al crear las secciones. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getSections(){
        const url = `http://localhost:3001/api/section`;
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
                        text: "Error al obtener las secciones. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las secciones. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las secciones. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

}