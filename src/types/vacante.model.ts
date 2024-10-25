export interface IVacant {
    id: number;
    title: string;
    description: string;
    status: string;
    company: ICompany;
}


export interface IResponse {
    content: IVacant[]
}

export interface ICompany {
    id: string;
    name: string;
    location: string;
    contact: string;
}

export interface ICreate {
    title: string;
    description: string;
    status: string;
    companyId: string;
}
