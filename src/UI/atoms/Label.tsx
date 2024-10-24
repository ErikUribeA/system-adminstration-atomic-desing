import React from 'react';
import styled from 'styled-components';

interface ILabel {
  htmlFor: string;
  text: string;
}

const StyledLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  display: block;
`;

const Label: React.FC<ILabel> = ({ htmlFor, text }) => {
  return <StyledLabel htmlFor={htmlFor}>{text}</StyledLabel>;
};

export default Label;
