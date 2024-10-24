'use client';
import React, { useState, useCallback } from "react";
import { CompanyFormData } from "../molecules/CompanyForm";
import { JobFormData } from "../molecules/JobForm";
import Navbar from "../organisms/Navbar";
import CardContainer from "../organisms/Container";
import Footer from "../organisms/Footer";
import styled from "styled-components";
import { useStore } from "@/store/store";

interface Data {
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


interface HomePageProps {
    initialCardData: Data[];
    jobData: Data[];
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
    const [cardData, setCardData] = useState(initialCardData);

    // Usar Zustand en lugar de useState
    const { itemType, setItemType } = useStore();  // Obtenemos el estado del store

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

    const handleEdit = useCallback((id: number) => {
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

    const handleDelete = useCallback((id: number) => {
        setCardData(prevCards => prevCards.filter(card => card.id !== id));
    }, []);

    const handleSearch = useCallback((searchTerm: string) => {
        if (searchTerm.trim() === '') {
            setCardData(initialCardData);
            return;
        }

        setCardData(prevCards =>
            prevCards.filter(card =>
                card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                card.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||  // Usar encadenamiento opcional
                card.phone?.includes(searchTerm)  // Usar encadenamiento opcional
            )
        );
    }, [initialCardData]);

    const handleNavbarButtonClick = (type: 'first' | 'second') => {
        if (type === 'first') {
            setItemType('company');  // Actualizamos usando Zustand
            setCardData(initialCardData);
        } else {
            setItemType('job');  // Actualizamos usando Zustand
            setCardData(jobData);
        }
    };

    const enrichedCardData = cardData.map(card => ({
        ...card,
        onFirstButtonClick: () => handleEdit(card.id),
        onSecondButtonClick: () => handleDelete(card.id)
    }));

    const handleAddItem = (data: CompanyFormData | JobFormData) => {
        console.log('Añadiendo:', data);
    };

    const handleEditItem = (id: number, data: CompanyFormData | JobFormData) => {
        console.log('Editando id:', id, 'con datos:', data);
    };

    const handleDeleteItem = (id: number) => {
        console.log('Eliminando id:', id);
    };

    const dynamicTitle = itemType === 'company' ? 'Compañias' : 'Vacantes'

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
                type={itemType} // Ahora obtenemos el tipo del store de Zustand
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