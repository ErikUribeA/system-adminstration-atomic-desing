import {  ICreateVacancy, IResponseV, IVacant } from "@/types/card.model";
import { HttpClient } from "@/utils/client-http";

export class VacantService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient()
    }

    async findAll(page: number, size: number): Promise<IVacant[]> {
        try {
            const response = await this.httpClient.get<IResponseV>(`vacants?page=${page}&size=${size}`);

            return response.content;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async destroy(id: string) {
        try {
            const coders = this.httpClient.delete<IVacant[]>(`Coders/${id}`)

            return coders
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async create(vacant: ICreateVacancy) {
        try {
            const createCompany = this.httpClient.post("vacants", vacant)
            return createCompany
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async save(id: string, coderName: string) {
        try {
            const actualizarCoder = await this.httpClient.put(`Coders/${id}`, { name: coderName });
            return actualizarCoder;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}