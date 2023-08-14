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

    async getClassesByCareer(careerId:string){
        const url = `http://localhost:3001/api/career-class/${careerId}`;
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
                        text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                } 
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
            
            
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getClassesById(classId:string){
        const url = `http://localhost:3001/api/class/${classId}`;
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
                        text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                } 
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
            
            
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Obtener las clases por departamento
    async getClassesByDepartment(departmentId:string){
        const url = `http://localhost:3001/api/career-class/department/${departmentId}`;
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
                        text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                } 
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
            
            
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Obtener las clases que el estudiante puede llevar
    async getClassesToGo(departmentId:string,studentId:string){
        const url = `http://localhost:3001/api/career-class/requirements/${departmentId}?studentId=${studentId}`;
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
                        text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                } 
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
            
            
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