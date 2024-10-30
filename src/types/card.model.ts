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
    type?: 'company' | 'vacant';  // Add this line
    name?: string;               // Make optional since vacant won't have it
    location?: string;           // Make optional since vacant won't have it
    contact?: string;            // Make optional since vacant won't have it
    title?: string;              // Make optional since company won't have it
    description?: string;        // Make optional since company won't have it
    status?: string;             // Make optional since company won't have it
    company?: ICompany;
    onFirstButtonClick: () => void;
    onSecondButtonClick: () => void;
}


export const transformToCard = (
    item: ICompany | IVacant,
    type: 'company' | 'vacant',
    onFirstButtonClick: () => void,
    onSecondButtonClick: () => void
): ICard => {
    if (type === 'company') {
        const company = item as ICompany;
        return {
            type: 'company',
            id: company.id,
            name: company.name,
            location: company.location,
            contact: company.contact,
            onFirstButtonClick,
            onSecondButtonClick
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
            onFirstButtonClick,
            onSecondButtonClick
        };
    }
};
