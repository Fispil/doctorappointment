import axios from "axios";
import { AppointmentData } from "../_types/AppointmentData";

const STRAPI_API_KEY = process.env.NEXT_PUBLIC_STRAPI_API;

const Axios = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${STRAPI_API_KEY}`,
  },
});

export const getCategory = async () => {
  try {
    const response = await Axios.get("/categories?populate=*");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctors = async () => {
  try {
    const response = await Axios.get("/doctors?populate=*");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorByCategory = async (category: string) => {
  try {
    const response = await Axios.get(
      `/doctors?filters[categories][Name][$eq]=${category}&populate=*`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postAppointment = async (data: { data: AppointmentData }) => {
  try {
    const response = await Axios.post("/appointments", data);

    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDoctorById = async (id: number) => {
  try {
    const response = await Axios.get(`/doctors/${id}?populate=*`);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendEmail = async (data: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await axios.post("/api/sendEmail", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserBookingList = async (userEmail: string) => {
  try {
    const response = await Axios.get(
      `/appointments?filters[email][$eq]=${userEmail}&populate=doctor.image`
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBooking = async (id: number) => {
  try {
    const response = await Axios.delete(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}