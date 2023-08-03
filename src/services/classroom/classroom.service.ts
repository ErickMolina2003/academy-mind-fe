import axios from "axios";
import { useAppStore } from "../../store/app";

export default class ClassroomService {
    store = useAppStore();

    async getClassrooms() {
        const url = `http://localhost:3001/api/classroom`;
        try {
            const response = await axios({
                method: "GET",
                url: url,
            });
            
            if (response.status===200) {
                const data = await response.data;
                
                if (data.statusCode!==200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener las aulas. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                } 
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las aulas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
            
            
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las aulas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getClassroomByCenterAndBuilding(centerId:string, buildingId:string){
        const url = `http://localhost:3001/api/classroom/${centerId}/${buildingId}`;
        try {
            const response = await axios({
                method: "GET",
                url: url,
            });
            
            if (response.status===200) {
                const data = await response.data;
                
                if (data.statusCode!==200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener las aulas. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                } 
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las aulas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
            
            
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las aulas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

}