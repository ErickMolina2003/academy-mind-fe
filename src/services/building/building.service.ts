import axios from "axios";
import { useAppStore } from "../../store/app";

export default class BuildingService {
    store = useAppStore();

    async getBuildings() {
        const url = `http://localhost:3001/api/building/`;
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
                        text: "Error al obtener los edificios. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                } 
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener los edificios. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
            
            
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener los edificios. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getBuildingsByCenter(centerId:string){
        const url = `http://localhost:3001/api/building/${centerId}`;
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
                        text: "Error al obtener los edificios. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                } 
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener los edificios. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
            
            
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener los edificios. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

}