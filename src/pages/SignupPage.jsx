import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import { UserContext } from "../components/UserContext";
import AuthForm from "../components/AuthForm";
import { toast } from "react-toastify";
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
`;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white overlay */
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 40px;
  max-width: 400px;
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: 2px solid black;
  border-radius: 8px;
  background-color: transparent;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  width: 100%;

  &:hover {
    background-color: white;
    color: transparent;
    border-color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = async (FormData) => {
    try {
      const data = await register(FormData);
      if (data.success) {
        toast.success("회원가입이 완료되었습니다.");
        navigate("/login");
      }
    } catch (error) {
      toast.error("회원가입 중 문제가 발생했습니다.");
    }
  };

  return (
    <GradientBackground>
      <Container>
        <Title>회원가입</Title>
        <AuthForm mode="signup" onSubmit={handleSignup} />
          <p>
            이미 계정이 있으신가요?
            <StyledLink  to="/login">로그인</StyledLink >
          </p>
      </Container>
    </GradientBackground>
  );
};

export default SignupPage;
