import React from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Select from '../atoms/Select';
import Textarea from '../atoms/TextArea';
import Button from '../atoms/Button';
import { useRouter } from 'next/navigation'
import { VacantService } from '@/services/vacantes.service';
import { toast } from 'react-toastify'

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

const JobForm: React.FC<JobFormProps> = ({ initialData }) => {
    const [formData, setFormData] = React.useState<JobFormData>(
        initialData || {
            title: '',
            description: '',
            status: '',
            companyId: '',
        }
    );
    const router = useRouter();
    const vacantService = new VacantService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await vacantService.create(formData)
            if (response) {
                toast.success('The vacant was created successfully')
                router.refresh()
            } else {
                console.log('erorr')
            }
        } catch (error) {
            console.error("Error al crear el coder:", error)
        }

    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    return (
        <form onSubmit={handleSubmit}>
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
                        { value: 'ACTIVE', label: 'OPEN' },
                        { value: 'close', label: 'CLOSE' },
                    ]}
                />
            </FormGroup>

            {/* <FormGroup>
                <Label htmlFor="company" text="Compañía" />
                <Select
                    name="company" // Corregido a "company"
                    value={formData.companyId}
                    onChange={handleChange}
                    options={[
                        { value: '', label: 'Seleccionar Compañía' },
                        { value: 'fullStack', label: 'FullStack' },
                    ]}
                />
            </FormGroup>
             */}
            <FormGroup>
                <Label htmlFor="title" text="Company id" />
                <Input
                    type="text"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                />
            </FormGroup>

            <Button
                width='100%'
                borderRadius='0.5rem'
                label="Agregar"
                onClick={(e) => handleSubmit(e)}
                size="0.5em"
            />
        </form>
    );
};

export default JobForm;
