'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import { CiSearch } from "react-icons/ci";
import { Briefcase, Building2 } from "lucide-react";
import { useStore } from '@/store/store';

interface INavbar {
  title: string;
  onFirstButtonClick: () => void;
  onSecondButtonClick: () => void;
  firstButtonLabel: string;
  secondButtonLabel: string;
  onSearch: (value: string) => void;
}

const NavbarContainer = styled.nav`
  display: flex;
  flex-direction: column;
`;

const BelowSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-right: auto;
`;

const TabContainer = styled.div`
  display: inline-flex;
  border-radius: 9999px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: #f3f4f6;
  gap: 0.25rem;
`;

const SearchContainer = styled.div`
  width: 300px;
  max-width: 100%;
`;

const Navbar: React.FC<INavbar> = ({
  title,
  onFirstButtonClick,
  onSecondButtonClick,
  firstButtonLabel,
  secondButtonLabel,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { itemType, setItemType } = useStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFirstButtonClick = () => {
    setItemType('vacant');
    onFirstButtonClick();
  };

  const handleSecondButtonClick = () => {
    setItemType('company');
    onSecondButtonClick();
  };

  return (
    <NavbarContainer>
      <div>
        <Title>{title}</Title>
      </div>
      <BelowSectionContainer>
        <TabContainer>
          <Button
            label={firstButtonLabel}
            color={itemType === 'vacant' ? "white" : "#374151"}
            icon={<Building2 size={16} />}
            onClick={handleSecondButtonClick}
            bg={itemType === 'vacant' ? "#9333ea" : "transparent"}
            borderRadius="9999px"
            size="0.5rem 1rem"
            iconColor={itemType === 'vacant' ? "white" : "#374151"}
            border="none"
          />
          <Button
            label={secondButtonLabel}
            color={itemType === 'company' ? "white" : "#374151"}
            icon={<Briefcase size={16} />}
            onClick={handleFirstButtonClick}
            bg={itemType === 'company' ? "#ec4899" : "transparent"}
            borderRadius="9999px"
            size="0.5rem 1rem"
            iconColor={itemType === 'company' ? "white" : "#374151"}
            border="none"
          />
        </TabContainer>
        <SearchContainer>
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={handleSearchChange}
            name="search"
            icon={<CiSearch />}
            $borderRadius="3em"
            $width="100%"
          />
        </SearchContainer>
      </BelowSectionContainer>
    </NavbarContainer>
  );
};

export default Navbar;
