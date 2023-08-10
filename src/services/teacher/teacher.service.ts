import axios from "axios";
import { useAppStore } from "@/store/app";
import TeacherUpdate from "../../models/user";

export default class TeacherService {
  store = useAppStore();

  async createTeacher(body: any) {
    const url = `http://localhost:3001/api/teacher`;
    try {
      const response = await axios({
        method: "POST",
        url: url,
        data: body,
      });
      if (response.status === 201) {
        
        this.store.setToaster({
          isActive: true,
          text: "Docente creado exitosamente.",
          color: "success",
        });
        
        return response.data;
      }
    } catch (error) {
      this.store.setToaster({
        isActive: true,
        text: "No se pudo crear el docente, intente nuevamente.",
        color: "error",
      });
    }
  }

  async getTeachers() {
    const url = `http://localhost:3001/api/teacher`;
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
        text: "Error al obtener la lista de profesores. Por favor, inténtalo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }

  async getTeacher(id: string) {
    const url = `http://localhost:3001/api/teacher/${id}`;
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
        text: "Error al obtener la información del profesor. Por favor, inténtalo de nuevo o más tarde.",
        color: "error",
      });
      return error;
    }
  }


  async getTeacherByCareer(idCareer:string){
    const url = `http://localhost:3001/api/teacher/career/${idCareer}`;
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
                        text: "Error al los docentes. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al los docentes. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al los docentes. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
  }

  async getTeacherByCareerAndCenter(idCareer:string,idCenter:string){
    const url = `http://localhost:3001/api/teacher/career/${idCareer}?center=${idCenter}`;
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
                        text: "Error al los docentes. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al los docentes. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al los docentes. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
  }
  async updateTeacher(id: string, teacherData: TeacherUpdate) {
    const url = `http://localhost:3001/api/teacher/${id}`;

    try {
      const response = await axios({
        method: "patch",
        url: url,
        data: teacherData,
      });

      if (response.status === 200) {
        const teacher = await response.data.user.teacher;
        this.store.setUpdateTeacher(true,teacher);
        
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
      });
    }
  }
}
