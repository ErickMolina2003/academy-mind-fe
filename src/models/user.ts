export default interface User {
  firstName: string;
  secondName: string;
  firstLastName: string;
  secondLastName: string;
  address: string;
  description?: string;
  dni: string;
  email?: string;
  employeeNumber?: string;
  isAdmin?: boolean;
  phone?: string;
  status?: boolean;
  teacher?: Teacher;
  student?: Student;
}

export interface Teacher {
  email: string;
  employeeNumber: string;
  institutionalEmail: string;
  isBoss: boolean;
  isCoordinator: boolean;
  description?: string;
  photoOne?: string;
  status?: boolean;
  video?: string;
}

export interface Student {
  accountNumber: string;
  email: string;
  institutionalEmail: string;
  description?: string;
  incomeNote?: number;
  overallIndex?: number;
  payment?: boolean;
  periodIndex?: number;
  photoOne?: string;
  photoTwo?: string;
  photoThree?: string;
  status?: boolean;
}

export interface TeacherUpdate {
  email?: string;
  address?: string;
  phone?: string;
  video?: string;
  photoOne?: string;
}

export interface AdminUpdate {
  description?: string;
  photoOne?: string;
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
