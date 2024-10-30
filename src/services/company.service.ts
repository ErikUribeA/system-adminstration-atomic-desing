import { ICompany, ICreateCompany, IResponseC, IVacant } from "@/types/card.model";
import { HttpClient } from "@/utils/client-http";

export class CompanyService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient()
    }

    async findAll(page: number, size: number): Promise<ICompany[]> {
        try {
            const response = await this.httpClient.get<IResponseC>(`company?page=${page}&size=${size}`);
            console.log(response.content)
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

    async create(company: ICreateCompany) {
        try {
            const createCompany = this.httpClient.post("company", company)
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