'use client';
import { CompanyService } from '@/services/company.service';
import { VacantService } from '@/services/vacantes.service';
import MainTemplate from '@/UI/templates/MainTemplate';
import React, { useEffect, useState } from 'react';
import { usePaginationStore } from '@/store/paginationStore';
import { ICompany, IVacant } from '@/types/card.model';
import Loading from '@/UI/atoms/Loading';

const useVacantService = new VacantService();
const useCompanyService = new CompanyService();

const SIZE = 6;

const HomePage = () => {
  const { currentPage } = usePaginationStore();
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [vacants, setVacants] = useState<IVacant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navbarConfig = {
    title: "Panel de Administración",
    firstButtonLabel: "Vacante",
    secondButtonLabel: "Compañias"
  };

  const totalPages = 3;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [companiesData, vacantsData] = await Promise.all([
          useCompanyService.findAll(currentPage, SIZE),
          useVacantService.findAll(currentPage, SIZE)
        ]);


        setCompanies(companiesData);
        setVacants(vacantsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]); // Se ejecutará cada vez que cambie la página

  if (isLoading) {
    return <Loading />; // Puedes reemplazar esto con un componente de loading más elaborado
  }

  return (
    <MainTemplate
      initialCardData={companies}
      jobData={vacants}
      totalPages={totalPages}
      navbarConfig={navbarConfig}
    />
  );
};

export default HomePage;