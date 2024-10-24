import MainTemplate from '@/UI/templates/MainTemplate';
import React from 'react';

const HomePage = () => {
  const initialCardData = [
    {
      id: 1,
      title: "Empresa XYZ",
      city: "Ciudad A",
      phone: "123456789",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    },
    {
      id: 2,
      title: "Trabajo ABC",
      city: "Ciudad B",
      phone: "987654321",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    },
    {
      id: 3,
      title: "Trabajo ABC",
      city: "Ciudad B",
      phone: "987654321",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    },
    {
      id: 4,
      title: "Trabajo ABC",
      city: "Ciudad B",
      phone: "987654321",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    },
    {
      id: 4,
      title: "Trabajo ABC",
      city: "Ciudad B",
      phone: "987654321",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    },
    {
      id: 4,
      title: "Trabajo ABC",
      city: "Ciudad B",
      phone: "987654321",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    },
  ];

  const jobCardData = [
    {
      id: 1,
      title: "Desarrollador",
      description: "you have to work as slave",
      status: "Open",
      company: "Riwi",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    },
    {
      id: 2,
      title: "Diseñador",
      description: "you have to work as slave",
      status: "Open",
      company: "Riwi",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    },
    {
      id: 3,
      title: "Desarrollador junior",
      description: "you have to work as slave",
      status: "Open",
      company: "Riwi",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    },
    {
      id: 4,
      title: "Scrum Master",
      description: "you have to work as slave",
      status: "Open",
      company: "Riwi",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    },
    {
      id: 4,
      title: "Scrum Master",
      description: "you have to work as slave",
      status: "Open",
      company: "Riwi",
      firstButtonLabel: "Editar",
      secondButtonLabel: "Eliminar"
    }
  ];

  const navbarConfig = {
    title: "Panel de Administración",
    firstButtonLabel: "Vacante",
    secondButtonLabel: "Compañias"
  };

  const totalPages = 5;

  return (
    <MainTemplate
      initialCardData={initialCardData}
      jobData={jobCardData}
      totalPages={totalPages}
      navbarConfig={navbarConfig}
    />
  );
};

export default HomePage;
