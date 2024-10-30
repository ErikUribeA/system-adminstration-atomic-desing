'use client';
import React, { useState, useCallback } from "react";
import { CompanyFormData } from "../molecules/CompanyForm";
import { JobFormData } from "../molecules/JobForm";
import Navbar from "../organisms/Navbar";
import CardContainer from "../organisms/Container";
import Footer from "../organisms/Footer";
import styled from "styled-components";
import { useStore } from "@/store/store";
import { ICard, ICompany, IVacant, transformToCard } from "@/types/card.model";

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
    const [currentPage, setCurrentPage] = useState(1);
    const [cardData, setCardData] = useState<(ICompany | IVacant)[]>(initialCardData);
    const { itemType, setItemType } = useStore();

    const isICompany = (card: ICompany | IVacant): card is ICompany => {
        return (card as ICompany).location !== undefined;
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
            fetchPageData(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
            fetchPageData(currentPage - 1);
        }
    };

    const fetchPageData = async (page: number) => {
        try {
            const response = await fetch(`/api/cards?page=${page}`);
            const newData = await response.json();
            setCardData(newData);
        } catch (error) {
            console.error('Error fetching page data:', error);
        }
    };

    const handleEdit = useCallback((id: string | number) => {
        setCardData(prevCards =>
            prevCards.map(card => {
                if (card.id === id) {
                    return {
                        ...card,
                    };
                }
                return card;
            })
        );
    }, []);

    const handleDelete = useCallback((id: string | number) => {
        setCardData(prevCards => prevCards.filter(card => card.id !== id));
    }, []);

    const handleSearch = useCallback((searchTerm: string) => {
        if (searchTerm.trim() === '') {
            setCardData(initialCardData);
            return;
        }
    
        setCardData(prevCards =>
            prevCards.filter(card => {
                if (isICompany(card)) {
                    return (
                        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        card.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        card.contact?.includes(searchTerm)
                    );
                } else {
                    return (
                        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        card.title?.includes(searchTerm)
                    );
                }
            })
        );
    }, [initialCardData]);

    const handleNavbarButtonClick = (type: 'first' | 'second') => {
        if (type === 'first') {
            setItemType('company');
            setCardData(initialCardData);
        } else {
            setItemType('vacant');
            setCardData(jobData);
        }
    };

    const enrichedCardData: ICard[] = Array.isArray(cardData) 
        ? cardData.map(card => 
            transformToCard(
                card,
                itemType, // 'company' o 'vacant'
                () => handleEdit(card.id),
                () => handleDelete(card.id)
            )
        )
        : [];

    const handleAddItem = (data: CompanyFormData | JobFormData) => {
        console.log('Añadiendo:', data);
    };

    const handleEditItem = (id: string | number, data: CompanyFormData | JobFormData) => {
        console.log('Editando id:', id, 'con datos:', data);
        handleEdit(id);  // Llama a handleEdit para editar el ítem
    };

    const handleDeleteItem = (id: string | number) => {
        console.log('Eliminando id:', id);
        handleDelete(id);  // Llama a handleDelete para eliminar el ítem
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
            <Footer
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={handleNext}
                onPrevious={handlePrevious}
            />
        </Container>
    );
};

export default MainTemplate;
