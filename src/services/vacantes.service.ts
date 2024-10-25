import { ICreate, IVacant } from "@/types/vacante.model";
import { HttpClient } from "@/utils/client-http";

export class VacantService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient()
    }

    async findAll(page: number, size: number) {
        try {
            const coders = this.httpClient.get<IVacant>(`vacants?page=${page}&size=${size}`)
            return console.log(coders)
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async destroy(id: string) {
        try {
            const coders = this.httpClient.delete(`Coders/${id}`)

            return coders
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async create(coder: ICreate) {
        try {
            const createCoder = this.httpClient.post("Coders", coder)

            return createCoder
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