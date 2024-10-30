import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { useStore } from '@/store/store';

interface IInput {
  name: string;
  type: 'text' | 'email' | 'password' | 'tel';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  $borderRadius?: string;
  $width?: string;
}

interface IInputWrapper {
  $borderRadius?: string;
  $width?: string;
  $itemType: 'company' | 'vacant';
}

const getFocusColor = (itemType: 'company' | 'vacant') => {
  return (theme: DefaultTheme) =>
    itemType === 'company'
      ? theme.colors.border.focus.pink
      : theme.colors.border.focus.purple;
};

const InputWrapper = styled.div<IInputWrapper>`
  display: flex;
  align-items: center; 
  border: 2px solid #d1d5db;
  background-color: white;
  border-radius: ${({ $borderRadius }) => $borderRadius || '0.375rem'};
  width: ${({ $width }) => $width || '100%'};
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: ${({ $itemType, theme }) => getFocusColor($itemType)(theme)};
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;

  &::placeholder {
    color: #d1d5db;
  }
`;

const IconWrapper = styled.span`
  margin-right: 0.5rem;
  margin-left: 1rem;
  display: flex;
  align-items: center;
`;

const Input: React.FC<IInput> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  icon,
  $borderRadius,
  $width
}) => {
  const { itemType } = useStore();

  return (
    <InputWrapper
      $borderRadius={$borderRadius}
      $width={$width}
      $itemType={itemType}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <StyledInput
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default Input;