export default interface User {
  instituteEmail?: string;
  name?: string;
  isTeacher?: boolean;

  dni?: string;
  firstName?: string;
  secondName?: string;
  firstLastName?: string;
  secondLastName?: string;
  email?: string;
  password?: string;
  address?: string;
  phone?: number;
  description?: string;
  photoOne?: string;
  photoTwo?: string;
  photoThree?: string;
  isAdmin?: boolean;
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
