// components/Pagination.tsx
import React from 'react';
import styled from 'styled-components';
import IButton from '../atoms/Button'; // Usa el componente de botón reutilizable
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface IPagination {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const PageNumber = styled.span`
  font-size: 1rem; 
`;

const Pagination: React.FC<IPagination> = ({ currentPage, totalPages, onNext, onPrevious }) => {
  return (
    <PaginationContainer>
      <IButton
        icon={<ChevronLeft />}
        iconColor='black'
        border='1px solid gray'
        borderRadius='50%'
        onClick={onPrevious}
        size='0.4rem 0.1rem'
        bg='rgb(229, 231, 235)'
        disabled={currentPage === 1}
      />
      <PageNumber>{`Página ${currentPage} de ${totalPages}`}</PageNumber>
      <IButton
        icon={<ChevronRight />}
        iconColor='black'
        border='1px solid gray'
        borderRadius='50%'
        size='0.4rem 0.1rem'
        bg='rgb(229, 231, 235)'
        onClick={onNext}
        disabled={currentPage === totalPages}
      />
    </PaginationContainer>
  );
};

export default Pagination;
