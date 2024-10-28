export interface IVacant {
    id: number;
    title: string;
    description: string;
    status: string;
    company: ICompany;

}

export interface IResponseV {
    content: IVacant[]
}

export interface IResponseC {
    content: ICompany[]
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

export interface ICard {
    id: string;
    name: string;
    location: string;
    contact: string;
    title: string;
    description: string;
    status: string;
    company?: ICompany 
    onFirstButtonClick: () => void;
    onSecondButtonClick: () => void;
}