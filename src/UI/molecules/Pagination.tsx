// components/Pagination.tsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import IButton from '../atoms/Button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { usePaginationStore } from '@/store/paginationStore';

interface IPagination {
  totalPages: number;
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

const Pagination: React.FC<IPagination> = ({ totalPages }) => {
  const { 
    currentPage, 
    nextPage, 
    previousPage, 
    setTotalPages 
  } = usePaginationStore();

  useEffect(() => {
    setTotalPages(totalPages);
  }, [setTotalPages, totalPages]);

  return (
    <PaginationContainer>
      <IButton
        icon={<ChevronLeft />}
        iconColor='black'
        border='1px solid gray'
        borderRadius='50%'
        onClick={previousPage}
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
        onClick={nextPage}
        disabled={currentPage === totalPages}
      />
    </PaginationContainer>
  );
};

export default Pagination;