'use client';
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { CompanyFormData } from "../molecules/CompanyForm";
import { JobFormData } from "../molecules/JobForm";
import Navbar from "../organisms/Navbar";
import CardContainer from "../organisms/Container";
import styled from "styled-components";
import { useStore } from "@/store/store";
import { ICard, ICompany, ICreateCompany, ICreateVacancy, IVacant, transformToCard } from "@/types/card.model";
import Pagination from "../molecules/Pagination";
import { usePaginationStore } from '@/store/paginationStore';
import { CompanyService } from "@/services/company.service";
import { VacantService } from "@/services/vacantes.service";
import { toast } from "react-toastify";

interface HomePageProps {
    initialCardData: ICompany[];
    jobData: IVacant[];
    totalPages: number;
    navbarConfig: {
        title: string;
        firstButtonLabel: string;
        secondButtonLabel: string;
    };
}

const Container = styled.div`
    background-color: white; 
    border: 2px solid white;
    border-radius: 10px;
    padding: 1rem; 
    display: flex;
    flex-direction: column; 
    justify-content: space-between; 
    width: 100%;
`;

const MainTemplate = ({ initialCardData, jobData, totalPages, navbarConfig }: HomePageProps) => {
    const [cardData, setCardData] = useState<(ICompany | IVacant)[]>(initialCardData);
    const { itemType, setItemType } = useStore();
    const { setTotalPages, setCurrentPage } = usePaginationStore();

    // Inicializar el total de páginas cuando el componente se monta
    useEffect(() => {
        setTotalPages(totalPages);
    }, [setTotalPages, totalPages]);

    // Efecto para cargar los datos iniciales según el tipo de item
    useEffect(() => {
        if (itemType === 'company') {
            setCardData(initialCardData);
        } else {
            setCardData(jobData);
        }
    }, [itemType, initialCardData, jobData]);

    const isICompany = (card: ICompany | IVacant): card is ICompany => {
        return (card as ICompany).location !== undefined;
    };

    const companyService = useMemo(() => new CompanyService(), []);
    const vacantService = useMemo(() => new VacantService(), []);

    const handleEdit = useCallback(async (id: string | number, data: CompanyFormData | JobFormData) => {
        const cardToEdit = cardData.find(card => card.id === id);
        if (!cardToEdit) return;

        try {
            if (isICompany(cardToEdit)) {
                const updatedCompany = await companyService.save(String(id), data as ICreateCompany);
                toast.success('The company was updated successfully');
                console.log('Compañía actualizada:', updatedCompany);
            } else {
                const updatedJob = await vacantService.save(String(id), data as unknown as ICreateVacancy);
                console.log('Vacante actualizada:', updatedJob);
            }
            setCardData(prevCards =>
                prevCards.map(card => (card.id === id ? { ...cardToEdit, ...data } : card))
            );
        } catch (error) {
            console.error('Error al actualizar:', error);
            toast.error('Error al actualizar la información');
        }
    }, [cardData, companyService, vacantService]);

    const handleDelete = useCallback(async (id: string | number) => {
        const cardToDelete = cardData.find(card => card.id === id);
        if (!cardToDelete) return;

        try {
            if (isICompany(cardToDelete)) {
                await companyService.destroy(String(id));
                toast.success('Company deleted successfully');
            } else {
                await vacantService.destroy(String(id));
                toast.success('Vacancy deleted successfully');
            }
            setCardData(prevCards => prevCards.filter(card => card.id !== id));
        } catch (error) {
            console.error('Error durante la eliminación:', error);
            toast.error('Failed to delete the item');
        }
    }, [cardData, companyService, vacantService]);

    const handleSearch = useCallback((searchTerm: string) => {
        if (searchTerm.trim() === '') {
            setCardData(initialCardData);
            return;
        }

        setCardData(prevCards => {
            return prevCards.filter(card => {
                if (itemType === 'company') {
                    const company = card as ICompany;
                    return (
                        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        company.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        company.contact?.includes(searchTerm)
                    );
                } else {
                    const vacant = card as IVacant;
                    return (
                        vacant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        vacant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        vacant.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        vacant.company.name.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }
            });
        });
    }, [initialCardData, itemType]);


    const handleNavbarButtonClick = (type: 'first' | 'second') => {
        if (type === 'first') {
            setItemType('company');
            setCardData(initialCardData);
        } else {
            setItemType('vacant');
            setCardData(jobData);
        }
        setCurrentPage(1);
    };

    const enrichedCardData: ICard[] = Array.isArray(cardData)
        ? cardData.map(card =>
            transformToCard(
                card,
                itemType,
                async (data: ICreateCompany | ICreateVacancy) => {
                    await handleEdit(card.id, data);
                },
                () => handleDelete(card.id)
            )
        )
        : [];

    const handleAddItem = async (data: CompanyFormData | JobFormData) => {
        try {
            let newItem: ICompany | IVacant;

            if (itemType === 'company') {
                newItem = await companyService.create(data as CompanyFormData) as ICompany;
                toast.success('The new company was created successfully');
            } else {
                newItem = await vacantService.create(data as JobFormData) as IVacant;
                toast.success('The new vacancy was created successfully');
            }

            setCardData(prevCards => [...prevCards, newItem]);
            console.log(`Added new ${itemType}:`, newItem);
        } catch (error) {
            console.error('Error adding item:', error);
            toast.error('Failed to add the new item');
        }
    };

    const handleEditItem = (id: string | number, data: CompanyFormData | JobFormData) => {
        console.log('Editando id:', id, 'con datos:', data);
        handleEdit(id, data);
    };

    const handleDeleteItem = (id: string | number) => {
        console.log('Eliminando id:', id);
        handleDelete(id);
    };

    const dynamicTitle = itemType === 'company' ? 'Compañías' : 'Vacantes';

    return (
        <Container>
            <Navbar
                title={navbarConfig.title}
                onFirstButtonClick={() => handleNavbarButtonClick('first')}
                onSecondButtonClick={() => handleNavbarButtonClick('second')}
                firstButtonLabel={navbarConfig.firstButtonLabel}
                secondButtonLabel={navbarConfig.secondButtonLabel}
                onSearch={handleSearch}
            />
            <CardContainer
                title={dynamicTitle}
                cardData={enrichedCardData}
                type={itemType}
                onAdd={handleAddItem}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
            />
            <Pagination totalPages={totalPages} />
        </Container>
    );
};

export default MainTemplate;
