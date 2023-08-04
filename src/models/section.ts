export interface createSection{
    "idPeriod": number,
    "idClass": number,
    "idTeacher": string,
    "space": string,
    "days": string,
    "idClassroom": string,
    "hour": string,
    "finalHour": string
}

export interface updateSection
    {
        "idTeacher"?: string,
        "space"?: string,
        "days"?: string,
        "hour"?: string,
        "finalHour"?: string,
        "idClassroom"?: string    
    }
