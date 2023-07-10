import axios from "axios";

export async function getStudents() {
    const url = `http://localhost:3001/api/student`;
    try {
        const response = await axios({
            method: "GET",
            url: url,
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
        throw error;
    }
}

export async function getStudent(id: string) {
    const url = `http://localhost:3001/api/student/${id}`;
    try {
        const response = await axios({
            method: "GET",
            url: url,
        });
        const data = await response.data;
        return data;
    } catch (error) {
        console.error('Error al obtener el estudiante:', error);
        throw error;
    }
}