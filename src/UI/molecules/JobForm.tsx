import React from 'react';
import styled from 'styled-components';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Select from '../atoms/Select';
import Textarea from '../atoms/TextArea';
import Button from '../atoms/Button';

export interface JobFormData {
    title: string;
    description: string;
    status: string;
    company: string;
}

interface JobFormProps {
    initialData?: JobFormData;
    onSubmit: (data: JobFormData) => void;
    onCancel: () => void;
}

const FormGroup = styled.div`
    margin-bottom: 1rem;
`;

const JobForm: React.FC<JobFormProps> = ({ initialData, onSubmit }) => {
    const [formData, setFormData] = React.useState<JobFormData>(
        initialData || {
            title: '',
            description: '',
            status: '',
            company: '',
        }
    );

    const handleSubmit = () => {
        onSubmit(formData);
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
                        { value: 'open', label: 'OPEN' },
                        { value: 'close', label: 'CLOSE' },
                    ]}
                />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="company" text="Compañía" />
                <Select
                    name="company" // Corregido a "company"
                    value={formData.company}
                    onChange={handleChange}
                    options={[
                        { value: '', label: 'Seleccionar Compañía' },
                        { value: 'fullStack', label: 'FullStack' },
                    ]}
                />
            </FormGroup>

            <Button
                width='100%'
                borderRadius='0.5rem'
                label="Agregar"
                onClick={() => handleSubmit()}
                size="0.5em"
            />
        </form>
    );
};

export default JobForm;
