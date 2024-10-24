import React from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;


export interface CompanyFormData {
  name: string;
  location: string;
  phone: string;
}

interface CompanyFormProps {
  initialData?: CompanyFormData;
  onSubmit: (data: CompanyFormData) => void;
  onCancel: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = React.useState<CompanyFormData>(
    initialData || {
      name: '',
      location: '',
      phone: '',
    }
  );

  const handleSubmit = () => {
    onSubmit(formData);
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
        <Label htmlFor="phone" text="Telefono" />
        <Input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </FormGroup>

      <Button
        width='100%'
        borderRadius='0.5rem'
        label="Agregar"
        onClick={() => handleSubmit()}
        size="0.5em"
        bg={(theme) => theme.colors.accent.pink} // Color del tema
      />
    </form>
  );
};

export default CompanyForm;
