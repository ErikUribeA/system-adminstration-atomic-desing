import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { useStore } from '@/store/store';

interface ITextarea {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  rows?: number;
}

interface IStyledTextArea {
  disabled: boolean;
  $itemType: 'company' | 'job';
}

const getFocusColor = (itemType: 'company' | 'job') => {
  return (theme: DefaultTheme) =>
    itemType === 'company'
      ? theme.colors.border.focus.pink
      : theme.colors.border.focus.purple;
};

const StyledTextarea = styled.textarea<IStyledTextArea>`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  border: 2px solid #d1d5db;
  width: 100%;
  box-sizing: border-box;
  resize: none;
  outline: none;
  transition: border-color 0.3s ease;
  background-color: ${({ disabled }) => (disabled ? '#f3f4f6' : 'white')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};

  &:focus {
    border-color: ${({ $itemType, theme }) => getFocusColor($itemType)(theme)};
  }

  &:disabled {
    opacity: 0.7;
  }

  &::placeholder {
    color: #d1d5db;
  }
`;

const Textarea: React.FC<ITextarea> = ({
  name,
  value,
  placeholder,
  onChange,
  disabled = false,
  rows = 5
}) => {
  const { itemType } = useStore();

  return (
    <StyledTextarea
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      rows={rows}
      name={name}
      $itemType={itemType}
    />
  );
};

export default Textarea;