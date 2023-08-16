import axios from "axios";
import { useAppStore } from "../../store/app";
import { createTuition, updateGrade } from "../../models/tuition";

export default class TuitionService {
    store = useAppStore();

    async createTuition(tuitionData: createTuition) {
        const url = `http://localhost:3001/api/tuition`;
        try {
            const response = await axios({
                method: "POST",
                url: url,
                data: tuitionData,
            });

            if (response.status === 201) {
                const data = await response.data;

                if (data.statusCode === 200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Clase matriculada con éxito.",
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
                    text: "Error al crear la clase. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al crear la clase. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getTuitions() {
        const url = `http://localhost:3001/api/tuition`;
        try {
            const response = await axios({
                method: "GET",
                url: url,
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener las matriculas. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las matriculas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las matriculas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getTuitionsByStudent(idStudent: string, idPeriod: string) {
        const url = `http://localhost:3001/api/tuition/student/${idStudent}?periodId=${idPeriod}`;
        try {
            const response = await axios({
                method: "GET",
                url: url,
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Obtener clases matriculadas de un estudiante y unidades valorativas
    async getTuitionsAndUV(idStudent: string) {
        const url = `http://localhost:3001/api/tuition/registration/${idStudent}`;
        try {
            const response = await axios({
                method: "GET",
                url: url,
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {

                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    //Validar el dia de matricula del estudiante
    async validateRegistrationDate(idStudent: string) {

        const url = `http://localhost:3001/api/tuition/tuition-validation/${idStudent}`;
        try {
            const response = await axios({
                method: "GET",
                url: url
            });

            if (response.status === 200) {
                const data = await response.data;

                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getTuitionsBySection(idSection: string) {
        const url = `http://localhost:3001/api/tuition/section/${idSection}`;
        try {
            const response = await axios({
                method: "GET",
                url: url,
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async deleteTuition(idTuition: string) {
        const url = `http://localhost:3001/api/tuition/${idTuition}`;

        try {
            const response = await axios({
                method: "DELETE",

                url: url,
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {
                    this.store.setToaster({
                        isActive: true,

                        text: "Error al cancelar las secciones. Por favor, inténtelo de nuevo más tarde.",

                        color: "error",
                    });
                } else {
                    this.store.setToaster({
                        isActive: true,

                        text: "Sección cancelada con éxito.",

                        color: "success",
                    });
                }

                return data;
            } else {
                this.store.setToaster({
                    isActive: true,

                    text: "Error al cancelar las secciones. Por favor, inténtelo de nuevo más tarde.",

                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,

                text: "Error al cancelar las secciones. Por favor, inténtelo de nuevo más tarde.",

                color: "error",
            });

            return error;
        }
    }

    async getTuitionsStudentByPeriod(idPeriod: number) {
        const url = `http://localhost:3001/api/tuition/period-students/${idPeriod}`;
        try {
            const response = await axios({
                method: "GET",
                url: url,
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Obtener los estudiantes en una seccion en espera
    async getStudentsInWaitingList(idSection: number) {
        const url = `http://localhost:3001/api/tuition/waiting-section/${idSection}`;
        try {
            const response = await axios({
                method: "GET",
                url: url,
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener los estudiantes. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener los estudiantes. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener los estudiantes. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getTuitionsByStudentAll(idStudent: string) {
        const url = `http://localhost:3001/api/tuition/student/${idStudent}`;
        try {
            const response = await axios({
                method: "GET",
                url: url,
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    //Obtener todas las notas de un estudiante en el periodo de ingreso de notas
    async getGradesOfStudent(idStudent: string) {

        const url = `http://localhost:3001/api/tuition/student-grades/${idStudent}`;
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
                        text: "Error al obtener las notas del estudiante. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las notas del estudiante. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las notas del estudiante. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Obtener estudiantes matriculados en una seccion
    async getStudentInSection(idSection: string) {
        const url = `http://localhost:3001/api/tuition/section/${idSection}`;
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
                        text: "Error al obtener los estudiantes. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener los estudiantes. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener los estudiantes. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Ingresar la nota de una matricula (estudiante)
    async addGradeStudent(idRegistration: string, gradeData: updateGrade) {

        const url = `http://localhost:3001/api/tuition/${idRegistration}`;
        try {
            const response = await axios({
                method: "PATCH",
                url: url,
                data: gradeData
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode === 200) {

                    this.store.setToaster({
                        isActive: true,
                        text: "Nota de estudiante ingresada con éxito.",
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
                    text: "Error al obtener las notas del estudiante. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las notas del estudiante. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async getTuitionsStudentByPeriodAndDepartment(
        idPeriod: number,
        idDepartment: string
    ) {
        const url = `http://localhost:3001/api/tuition/period-students/${idPeriod}?department=${idDepartment}`;
        try {
            const response = await axios({
                method: "GET",
                url: url,
            });

            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode !== 200) {
                    this.store.setToaster({
                        isActive: true,
                        text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las clases matriculadas. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Obtener docentes que subieron notas por departamento
    async getTeachersGrades(idDepartment: string) {
        const url = `http://localhost:3001/api/tuition/teacher-notes/${idDepartment}`;
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
                        text: "Error al obtener los docentes. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener los docentes. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener los docentes. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Obtener notas ingresadas por un docente
    async getGradesByTeacher(idTeacher: string, idDepartment: string) {
        const url = `http://localhost:3001/api/tuition/teacher-grades/${idTeacher}?departmentId=${idDepartment}`;
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
                        text: "Error al obtener las califacaciones. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener las califacaciones. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener las califacaciones. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    // Historial academico de un estudiante
    async getAcademicHistory(idStudent: string) {
        const url = `http://localhost:3001/api/tuition/student-history/${idStudent}`;
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
                        text: "Error al obtener el historial academico del estudiante. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener el historial academico del estudiante. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener el historial academico del estudiante. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }


}
