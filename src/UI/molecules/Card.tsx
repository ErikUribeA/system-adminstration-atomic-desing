// components/Card.tsx
import React from 'react';
import styled from 'styled-components';
import IButton from '../atoms/Button';
import { Pencil, Trash2 } from 'lucide-react';
import { useStore } from '@/store/store';
import { ICard } from '@/types/card.model';

const CardContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 100%;
  max-width: 400px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CardInfo = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: end;
  margin-top: 1rem;
`;

const Card: React.FC<ICard> = ({
  name,
  location,
  contact,
  title,
  description,
  status,
  company,
  onFirstButtonClick,
  onSecondButtonClick,
}) => {
  const { itemType } = useStore();

  return (
    <CardContainer>

      {itemType === 'vacant' && (
        <>
          <CardTitle>{name}</CardTitle>
          <CardTitle>{title}</CardTitle>
          <CardInfo>Descripción: {description}</CardInfo>
          <CardInfo>Estado: {status}</CardInfo>
          <CardInfo>Empresa: {company?.name}</CardInfo>
        </>
      )}

      {itemType === 'company' && (
        <>
          <CardTitle>{name}</CardTitle>
          <CardInfo>Ciudad: {location}</CardInfo>
          <CardInfo>Teléfono: {contact}</CardInfo>
        </>
      )}

      <ButtonContainer>
        <IButton
          icon={<Pencil />}
          iconColor="rgb(168, 85, 247)"
          bg='rgb(255, 255, 255)'
          borderRadius="0.5rem"
          border="2px solid  rgb(229, 231, 235)"
          onClick={onFirstButtonClick}
          size='0.5rem' />
        <IButton
          onClick={onSecondButtonClick}
          icon={<Trash2 />}
          iconColor="rgb(239, 68, 68)"
          iconSize='2rem'
          bg='rgb(255, 255, 255)'
          borderRadius="0.5rem"
          border="2px solid  rgb(229, 231, 235)"
        />
      </ButtonContainer>
    </CardContainer>
  );
};

export default Card;
