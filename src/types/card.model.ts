export interface IVacant {
    id: number;
    title: string;
    description: string;
    status: string;
    company: ICompany;

}

export interface ICompany {
    id: string;
    name: string;
    location: string;
    contact: string;
}


export interface ICompanyResponse {
    content:          ICompany[];
    pageable:         Pageable;
    totalElements:    number;
    totalPages:       number;
    last:             boolean;
    numberOfElements: number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    empty:            boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    unpaged:    boolean;
    paged:      boolean;
}

export interface Sort {
    unsorted: boolean;
    sorted:   boolean;
    empty:    boolean;
}




export interface IResponseV {
    content: IVacant[]
}

export interface IResponseC {
    content: ICompany[]
}



export interface ICreateCompany {
    name: string,
    location: string,
    contact: string
}

export interface ICreateVacancy {
    title: string,
    description: string,
    status: string,
    companyId: string
}
export interface ICard {
    id: string | number;
    type?: 'company' | 'vacant';
    name?: string;
    location?: string;
    contact?: string;
    title?: string;
    description?: string;
    status?: string;
    company?: ICompany;
    onFirstButtonClick: (data: ICreateCompany | ICreateVacancy) => Promise<void> | void;
    onSecondButtonClick: (data: ICreateCompany | ICreateVacancy) => Promise<void> | void;
}

// Luego actualizamos la función transformToCard para que coincida con los tipos
export const transformToCard = (
    item: ICompany | IVacant,
    type: 'company' | 'vacant',
    onFirstButtonClick: (data: ICreateCompany | ICreateVacancy) => Promise<void>,
    onSecondButtonClick: (data: ICreateCompany | ICreateVacancy) => Promise<void>
): ICard => {
    if (type === 'company') {
        const company = item as ICompany;
        return {
            type: 'company',
            id: company.id,
            name: company.name,
            location: company.location,
            contact: company.contact,
            onFirstButtonClick: async (data) => await onFirstButtonClick(data),
            onSecondButtonClick: async (data) => await onSecondButtonClick(data)
        };
    } else {
        const vacant = item as IVacant;
        return {
            type: 'vacant',
            id: vacant.id,
            title: vacant.title,
            description: vacant.description,
            status: vacant.status,
            company: vacant.company,
            onFirstButtonClick: async (data) => await onFirstButtonClick(data),
            onSecondButtonClick: async (data) => await onSecondButtonClick(data)
        };
    }
};