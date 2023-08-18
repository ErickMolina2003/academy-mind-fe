import axios from "axios";
import { useAppStore } from "../../store/app";
import { PeriodUpdate,cancelationDates  } from "../../models/period";

export default class PeriodService {
    store = useAppStore();

    //Obtener todos los periodos
    async getPeriods() {
        const url = `http://localhost:3001/api/period/`;
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
                text: "Error al obtener los periodos. Por favor, inténtelo de nuevo o más tarde.",
                color: "error",
            });
            return error;
        }
    }

    //Obtener los periodos de un año
    async getPeriodsByYear(year: string) {
        const url = `http://localhost:3001/api/period/year/${year}`;
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
                        text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }


    //Obtener el periodo en planificacion o matricula
    async getPeriodRegistrationPlanification() {
        const url = `http://localhost:3001/api/period/registration-planification/`;
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
                        text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    //Obtener el periodo en curso
    async getPeriodOngoing() {
        const url = `http://localhost:3001/api/period/ongoing/`;
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
                        text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    //Obtener el periodo en ingreso de notas
    async getPeriodGrades() {
        const url = `http://localhost:3001/api/period/grades/`;
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
                        text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

    async updatePeriod(id: number, periodData: PeriodUpdate) {
        const url = `http://localhost:3001/api/period/${id}`;


        try {
            const response = await axios({
                method: "patch",
                url: url,
                data: periodData,
            });


            if (response.status === 200) {
                const data = await response.data;

                if (data.statusCode === 200) {
                    
                    this.store.setToaster({
                        isActive: true,
                        text: "¡Periodo actualizado correctamente!",
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
                    text: "Error al actualizar los periodos. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
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

    async modifyCancelationsDates(id: string, dates: cancelationDates) {
        const url = `http://localhost:3001/api/period/cancelations/${id}`;

        try {
            const response = await axios({
                method: "patch",
                url: url,
                data: dates,
            });

            
            if (response.status === 200) {
                const data = await response.data;
                
                
                if (data.statusCode === 200) {
                    
                    this.store.setToaster({
                        isActive: true,
                        text: "¡Fechas de cancelaciones establecidas correctamente!",
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
                    text: "Error establecer fechas de cancelaciones. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }
        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "¡Ha habido un error !",
                color: "error",
            });
        }
    }

    // Obtener periodos con planificacion academica
    async getPeriodWithAcademicCharge() {
        const url = `http://localhost:3001/api/period/academic-charge/`;
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
                        text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                        color: "error",
                    });
                }
                return data;
            } else {
                this.store.setToaster({
                    isActive: true,
                    text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                    color: "error",
                });
            }


        } catch (error) {
            this.store.setToaster({
                isActive: true,
                text: "Error al obtener los periodos. Por favor, inténtelo de nuevo más tarde.",
                color: "error",
            });
            return error;
        }
    }

}
