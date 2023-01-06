import axios from "axios";
import { bookingRequestBody } from "./bookingRequestBody";

const serviceAPI = axios.create({
    timeout: 50000,
    headers: {
        Accept: '*/*',
        'Content-type': 'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Expose-Headers": "Token",
        "x-api-key":"5442ca60-526c-461c-988f-52ece0100615"
    },
    withCredentials: false
});

export const getDoctorList = () => {
    return serviceAPI.get("/doctors");
}

export const getDoctor = (id:string) => {
    return serviceAPI.get("/doctor/"+id);
}

export const postBooking = (name: string, start: number, doctorId: string, date: string) => {
    let params: bookingRequestBody = {
        id: new Date().getTime().toString(),
        name: name,
        start: start,
        doctorId: doctorId,
        date: date,
        status: "confirmed"
      }
    return serviceAPI.post("/booking", JSON.stringify(params));
}

export const patchBooking = (param: any) => {
    return serviceAPI.patch("/booking", JSON.stringify(param));
}

export const getBooking = (id:string) => {
    return serviceAPI.get("/booking/"+id);
}

serviceAPI.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default serviceAPI;