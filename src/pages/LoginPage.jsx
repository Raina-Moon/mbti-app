import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { UserContext } from "../components/UserContext";
import { login } from "../api/auth";
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

const LoginPage = () => {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    try {
      const data = await login(formData);
      if (data.success) {
        console.log("Log-in is done!");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        toast.error("로그인에 실패했습니다.");
      }
    } catch (error) {
      toast.error("로그인 중 문제가 발생했습니다.");
    }
  };

  return (
    <GradientBackground>
      <Container>
        <Title>로그인</Title>
        <AuthForm mode="login" onSubmit={handleLogin} />
      <p>계정이 없으신가요?</p> <StyledLink  to="/signup">회원가입</StyledLink >
      </Container>
    </GradientBackground>
  );
};

export default LoginPage;
