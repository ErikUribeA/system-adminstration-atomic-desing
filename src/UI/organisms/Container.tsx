'use client';
import React, { useState } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import Card from '../molecules/Card';
import Modal from './Modal';
import CompanyForm, { CompanyFormData } from '../molecules/CompanyForm';
import JobForm, { JobFormData } from '../molecules/JobForm';
import Button from '../atoms/Button';
import { CirclePlus } from "lucide-react";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;
  max-width: 1500px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    max-width: 1200px;
  }
`;

interface ICardData {
  id: number;
  title: string;
  city?: string;
  phone?: string;
  description?: string;
  status?: string;
  company?: string;
  firstButtonLabel: string;
  secondButtonLabel: string;
}

interface ICardContainer {
  cardData: ICardData[];
  type: 'company' | 'vacant';
  title: string;
  onAdd: (data: CompanyFormData | JobFormData) => void;
  onEdit: (id: number, data: CompanyFormData | JobFormData) => void;
  onDelete: (id: number) => void;
}

const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const CardContainer: React.FC<ICardContainer> = ({
  cardData,
  title,
  type,
  onAdd,
  onEdit,
  onDelete
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleOpenModal = (mode: 'add' | 'edit', id?: number) => {
    setModalMode(mode);
    if (id) setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  };

  const handleSubmit = (data: CompanyFormData | JobFormData) => {
    if (modalMode === 'add') {
      onAdd(data);
    } else if (modalMode === 'edit' && selectedId !== null) {
      onEdit(selectedId, data);
    }
    handleCloseModal();
  };

  const getInitialData = (id: number) => {
    const card = cardData.find(card => card.id === id);
    if (!card) return undefined;

    if (type === 'company') {
      return {
        name: card.title,
        location: card.city,
        phone: card.phone,
      } as CompanyFormData;
    } else {
      return {
        title: card.title,
        description: card.description,
        status: card.status,
        company: card.company,
      } as JobFormData;
    }
  };

  const getButtonColor = (type: 'company' | 'vacant') => {
    return (theme: DefaultTheme) => {
      const color = type === 'company' ? theme.colors.accent.pink.default : theme.colors.accent.purple.default;
      return {
        default: color,
        hover: type === 'company' ? theme.colors.accent.pink.hover : theme.colors.accent.purple.hover,
      };
    };
  };

  return (
    <Container>
      <HeaderContainer>
        <Title>{title}</Title>
        <Button
          onClick={() => handleOpenModal('add')}
          label={`Agregar ${type === 'company' ? 'Empresa' : 'Vacante'}`}
          icon={<CirclePlus />}
          bg={getButtonColor(type)}
          borderRadius="1.7rem"
          width='20% 15%'
        />
      </HeaderContainer>

      <GridContainer>
        {cardData.map((data) => (
          <Card
            key={data.id}
            title={data.title}
            city={data.city}
            phone={data.phone}
            description={data.description}
            status={data.status}
            company={data.company}
            onFirstButtonClick={() => handleOpenModal('edit', data.id)}
            onSecondButtonClick={() => onDelete(data.id)}
            firstButtonLabel={data.firstButtonLabel}
            secondButtonLabel={data.secondButtonLabel}
          />
        ))}
      </GridContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`${modalMode === 'add' ? 'Agregar' : 'Editar'} ${type === 'company' ? 'Empresa' : 'Vacante'}`}
      >
        {type === 'company' ? (
          <CompanyForm
            initialData={selectedId ? getInitialData(selectedId) as CompanyFormData : undefined}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        ) : (
          <JobForm
            initialData={selectedId ? getInitialData(selectedId) as JobFormData : undefined}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </Container>
  );
};

export default CardContainer;
