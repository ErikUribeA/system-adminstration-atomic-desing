import { ComapanyService } from '@/services/company.service';
import { VacantService } from '@/services/vacantes.service';
import MainTemplate from '@/UI/templates/MainTemplate';
import React from 'react';

const useVacantService = new VacantService()
const useCompanyService = new ComapanyService()

const HomePage = async () => {
  const dataC = await useCompanyService.findAll(1, 6)
  const dataV = await useVacantService.findAll(1, 6)
  const navbarConfig = {
    title: "Panel de Administración",
    firstButtonLabel: "Vacante",
    secondButtonLabel: "Compañias"
  };

  const totalPages = 5;

  return (
    <MainTemplate
      initialCardData={dataC}
      jobData={dataV}
      totalPages={totalPages}
      navbarConfig={navbarConfig}
    />
  );
};

export default HomePage;
