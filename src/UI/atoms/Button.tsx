import React from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { ICreateCompany, ICreateVacancy } from '@/types/card.model'; // Ajusta la ruta según tu estructura

// Interface para las props del componente styled
interface StyledButtonProps {
  $background: string | ((theme: DefaultTheme) => { default: string; hover: string; }); 
  $size: string;
  $borderRadius?: string;
  $border?: string;
  $color?: string;
  $width?: string;
}

// Tipo específico para onClick
type ButtonClickHandler = 
  | ((e: React.MouseEvent<HTMLButtonElement>) => void)
  | ((data: ICreateCompany | ICreateVacancy) => void | Promise<void>);

// Interface para las props del componente Button
interface IButton {
  label?: string;
  onClick?: ButtonClickHandler;
  icon?: React.ReactNode;
  disabled?: boolean;
  bg?: string | ((theme: DefaultTheme) => { default: string; hover: string; });
  size?: string;
  borderRadius?: string;
  iconColor?: string;
  iconSize?: string;
  border?: string;
  color?: string;
  width?: string;
}

const ButtonStyled = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: ${({ $width }) => $width || 'auto'};
  color: ${({ $color }) => $color || 'white'};
  border: ${({ $border }) => $border || 'none'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '50%'};
  padding: ${({ $size }) => $size || '0.5rem 1rem'};
  font-size: 1rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  @media (max-width: 768px) {
    width: ${({ $width }) => $width || 'auto'};
  }
  
  background-color: ${({ $background, theme }) => {
    return typeof $background === 'function' ? $background(theme).default : $background;
  }};

  &:hover {
    background-color: ${({ $background, theme }) => {
      return typeof $background === 'function' ? $background(theme).hover : $background;
    }};
    opacity: 0.9;
  }
`;

const Button: React.FC<IButton> = ({
  label,
  onClick,
  icon,
  disabled = false,
  bg = () => ({ default: 'rgb(168, 85, 247)', hover: 'rgb(140, 70, 200)' }),
  size = '0.5rem 1rem',
  borderRadius = '1rem',
  iconColor = 'white',
  iconSize = '1rem',
  border = 'none',
  color = 'white',
  width = 'auto'
}) => {
  return (
    <ButtonStyled
      onClick={onClick as (e: React.MouseEvent<HTMLButtonElement>) => void}
      disabled={disabled}
      $size={size}
      $background={bg}
      $borderRadius={borderRadius}
      $border={border}
      $color={color}
      $width={width}
    >
      {icon && <span style={{ color: iconColor, fontSize: iconSize }}>{icon}</span>}
      {label}
    </ButtonStyled>
  );
};

export default Button;