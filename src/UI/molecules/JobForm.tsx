import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Select from '../atoms/Select';
import Textarea from '../atoms/TextArea';
import Button from '../atoms/Button';
import { CompanyService } from '@/services/company.service';
import { ICompany } from '@/types/card.model';

export interface JobFormData {
    title: string;
    description: string;
    status: string;
    companyId: string;
}

interface JobFormProps {
    initialData?: JobFormData;
    onSubmit: (data: JobFormData) => void;
    onCancel: () => void;
}

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const useCompanyService = new CompanyService();

const JobForm: React.FC<JobFormProps> = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = useState<JobFormData>(
        initialData || {
            title: '',
            description: '',
            status: '',
            companyId: '',
        }
    );

    const [companyData, setCompanyData] = useState<ICompany[]>([]);

    useEffect(() => {
        const fetchCompanyData = async () => {
            const data = await useCompanyService.findAll(1, 100);
            setCompanyData(data);
        };

        fetchCompanyData();
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <FormGroup>
                <Label htmlFor="title" text="Título de la Vacante" />
                <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="description" text="Descripción" />
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={5}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="status" text="Estado" />
                <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={[
                        { value: '', label: 'Seleccionar Tipo' },
                        { value: 'ACTIVE', label: 'ACTIVE' },
                        { value: 'INACTIVE', label: 'INACTIVE' },
                    ]}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="companyId" text="Compañía" />
                <Select
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    options={[
                        { value: '', label: 'Seleccionar Compañía' },
                        ...companyData.map(company => ({
                            value: company.id, 
                            label: company.name, 
                        })),
                    ]}
                />
            </FormGroup>

            <Button
                width='100%'
                borderRadius='0.5rem'
                label="Agregar"
                onClick={handleFormSubmit}
                size="0.5em"
            />
        </form>
    );
};

export default JobForm;
