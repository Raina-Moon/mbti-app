import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  border-radius: 8px;
  background-color: transparent;
  color: black;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
    border-color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const NavigateButton = ({ to, children, state }) => {
  const navigate = useNavigate();

  return (
    <StyledButton onClick={() => navigate(to, { state })}>
      {children}
    </StyledButton>
  );
};

export default NavigateButton;
