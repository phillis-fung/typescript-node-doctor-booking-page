export type bookingRequestBody = {
    id?: string,
    patientId: string,
    startHour: number,
    doctorId: string,
    date: string,
    status?: string
}