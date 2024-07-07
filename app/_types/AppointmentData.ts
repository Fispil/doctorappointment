export interface AppointmentData {
  UserName: string;
  Email: string | null | undefined;
  Date: Date | undefined;
  Time: string;
  comment: string;
  doctor: any;
  Note: string;
}

