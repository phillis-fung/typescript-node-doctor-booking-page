export type bookingRequestBody = {
    id: string,
    name: string,
    start: number,
    doctorId: string,
    date: string,
    status?: string
}