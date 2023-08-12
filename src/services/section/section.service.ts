import axios from "axios";
import { useAppStore } from "../../store/app";
import { createSection,updateSection } from "../../models/section";

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

    // Obtener todas las secciones de un departamento
    async getSectionsByDepartment(idDepartment:string){
        const url = `http://localhost:3001/api/section/department/${idDepartment}`;
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


    async getSectionsByTeacher(employeeNumber:string, periodId:number){
        const url = `http://localhost:3001/api/section/teacher/${employeeNumber}?periodId=${periodId}`;
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
                        text: "Error al obtener la sección. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener la sección. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener la sección. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getSectionByPeriodAndClass(idPeriodo:string, idClase:string){
        const url = `http://localhost:3001/api/section/class-period/${idClase}?period=${idPeriodo}`;
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
                text: "Error al obtener las sección. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async updateSections(idSection:string, updateSection:updateSection){
        const url = `http://localhost:3001/api/section/${idSection}`;
        try {
            const response = await axios({
                method: "PATCH",
                url: url,
                data: updateSection,
            });
            
            if (response.status === 200) {
                const data = await response.data;
                
                if (data.statusCode === 200) {
                    
                    this.store.setToaster({
                        isActive: true,
                        text: "Sección actualizada con éxito.",
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
                    text: "Error al actualizar las secciones. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al actualizar las secciones. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getWaitingList(idDepartment:string){
        const url = `http://localhost:3001/api/section/waiting-list-sections/${idDepartment}`;
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
                        text: "Error al obtener las secciones en listas de espera. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las secciones en listas de espera. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las secciones en listas de espera. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }
    
    async deleteSections(idSection:string){
        const url = `http://localhost:3001/api/section/${idSection}`;
        try {
            const response = await axios({
                method: "DELETE",
                url: url
            });
            
            if (response.status === 200) {
                const data = await response.data;
                
                if (data.statusCode === 200) {
                    
                    this.store.setToaster({
                        isActive: true,
                        text: "Sección eliminada con éxito.",
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
                    text: "Error al eliminar las secciones en listas de espera. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al eliminar las secciones. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }


    // Obtener todas las secciones de un docente en el periodo de Ingreso de notas
    async getTeacherGrades(employeeNumber:string){
        const url = `http://localhost:3001/api/section/teacher-grades/${employeeNumber}`;
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
