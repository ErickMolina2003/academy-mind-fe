import axios from "axios";

export async function getTeachers() {

    const url = `http://localhost:3001/api/teacher`;
    try {
        const response = await axios({
            method: "GET",
            url: url,
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error('Error al obtener los docentes:', error);
        throw error;
    }
}

export async function getTeacher(id: string) {
    
    const url = `http://localhost:3001/api/teacher/${id}`;
    try {
        const response = await axios({
            method: "GET",
            url: url,
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error('Error al obtener el docente:', error);
        throw error;
    }
}

