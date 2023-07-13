export default interface User {
  email?: string;
  instituteEmail?: string;
  password?: string;
  name?: string;
  isTeacher: boolean;
}


export interface TeacherUpdate {
  email?: string;
  address?: string;
  phone?: string;
  video?: string;
}

export interface StudentUpdate {
  email?: string;
  password?: string;
  address?: string;
  phone?: string;
  description?: string;
  photoOne?: string;
  photoTwo?: string;
  photoThree?: string;
}