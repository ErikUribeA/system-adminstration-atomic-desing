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
            console.log(response.content)
            return response.content;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async destroy(id: string) {
        try {
            const vacantD = this.httpClient.delete<IVacant[]>(`vacants/${id}`)
            return vacantD
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

    async save(id: string, body:ICreateVacancy) {
        try {
            const actualizarCoder = await this.httpClient.put(`vacants/${id}`, body);
            return actualizarCoder;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}