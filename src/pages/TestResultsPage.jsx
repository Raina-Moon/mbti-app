import React from "react";
import TestResults from "../components/TestResults";
import styled, { keyframes } from "styled-components";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const GradientBackground = styled.div`
  background: linear-gradient(300deg, #00bfff, #ff4c68, #ef8172);
  background-size: 180% 180%;
  animation: ${gradientAnimation} 18s ease infinite;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ContentContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white */
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  max-width: 800px;
  width: 100%;
`;

const TestResultsPage = () => {
  return (
    <GradientBackground>
      <ContentContainer>
        <TestResults />
      </ContentContainer>
    </GradientBackground>
  );
};

export default TestResultsPage;
