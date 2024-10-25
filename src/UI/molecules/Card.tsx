// components/Card.tsx
import React from 'react';
import styled from 'styled-components';
import IButton from '../atoms/Button';
import { Pencil, Trash2 } from 'lucide-react';
import { useStore } from '@/store/store';
 

interface ICard {
  title: string;
  city?: string; // Hacer opcional, ya que no se usa en trabajos
  phone?: string; // Hacer opcional, ya que no se usa en trabajos
  description?: string; // Agregar para trabajos
  status?: string; // Agregar para trabajos
  company?: string; // Agregar para trabajos
  onFirstButtonClick: () => void;
  onSecondButtonClick: () => void;
  firstButtonLabel: string;
  secondButtonLabel: string;
}


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
  title,
  city,
  phone,
  description,
  status,
  company,
  onFirstButtonClick,
  onSecondButtonClick,
}) => {
  const { itemType } = useStore();
  return (
    <CardContainer>
      <CardTitle>{title}</CardTitle>

      {itemType === 'company' && (
        <>
          <CardInfo>Ciudad: {city}</CardInfo>
          <CardInfo>Teléfono: {phone}</CardInfo>
        </>
      )}

      {itemType === 'vacant' && (
        <>
          <CardInfo>Descripción: {description}</CardInfo>
          <CardInfo>Estado: {status}</CardInfo>
          <CardInfo>Empresa: {company}</CardInfo>
        </>
      )}
      <ButtonContainer>
        <IButton
          icon={<Pencil />}
          iconColor="rgb(168, 85, 247)" // Especifica el color del ícono
          bg='rgb(255, 255, 255)'
          borderRadius="0.5rem"
          border="2px solid  rgb(229, 231, 235)" // Ejemplo de borde
          onClick={onFirstButtonClick}
          size='0.5rem' />
        <IButton
          onClick={onSecondButtonClick}
          icon={<Trash2 />}
          iconColor="rgb(239, 68, 68)" // Especifica el color del ícono
          iconSize='2rem'
          bg='rgb(255, 255, 255)'
          borderRadius="0.5rem"
          border="2px solid  rgb(229, 231, 235)" // Ejemplo de borde
        />
      </ButtonContainer>
    </CardContainer>
  );
};

export default Card;
