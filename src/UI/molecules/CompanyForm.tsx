import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Label from '../atoms/Label';
import Input from '../atoms/Input';
import { useRouter } from 'next/navigation'
import { CompanyService } from '@/services/company.service';
import { toast } from 'react-toastify'

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export interface CompanyFormData {
  name: string;
  location: string;
  contact: string;
}

interface CompanyFormProps {
  initialData?: CompanyFormData;
  onSubmit: (data: CompanyFormData) => void;
  onCancel: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ initialData }) => {
  const [formData, setFormData] = React.useState<CompanyFormData>(
    initialData || {
      name: '',
      location: '',
      contact: '',
    }
  );
  const router = useRouter()
  const companyService = new CompanyService()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await companyService.create(formData)
      if (response) {
        toast.success('The company was created successfully')
        router.refresh()
      } else {
        console.log('erorr')
      }
    } catch (error) {
      console.error("Error al crear el coder:", error)
    }

  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name" text="Nombre" />
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}

        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="location" text="Ubicacion" />
        <Input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}

        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="contact" text="Telefono" />
        <Input
          type="tel"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
        />
      </FormGroup>

      <Button
        width='100%'
        borderRadius='0.5rem'
        label="Agregar"
        size="0.5em"
        bg={(theme) => theme.colors.accent.pink}
        onClick={(e) => e}
      />
    </form>
  );
};

export default CompanyForm;
