import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { useStore } from '@/store/store';

interface ISelect {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  options: { value: string; label: string }[];
}

interface IStyledSelect {
  disabled: boolean;
  $itemType: 'company' | 'job';
}

const getFocusColor = (itemType: 'company' | 'job') => {
  return (theme: DefaultTheme) =>
    itemType === 'company'
      ? theme.colors.border.focus.pink
      : theme.colors.border.focus.purple;
};

const StyledSelect = styled.select<IStyledSelect>`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  border: 2px solid #d1d5db;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ disabled }) => (disabled ? '#f3f4f6' : 'white')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: ${({ $itemType, theme }) => getFocusColor($itemType)(theme)};
  }

  &:disabled {
    opacity: 0.7;
  }
`;

const Select: React.FC<ISelect> = ({
  name,
  value,
  onChange,
  disabled = false,
  options
}) => {
  const { itemType } = useStore();

  return (
    <StyledSelect
      value={value}
      onChange={onChange}
      disabled={disabled}
      name={name}
      $itemType={itemType}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;