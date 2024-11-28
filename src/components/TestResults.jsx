import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { mbtiDescriptions } from "../utils/mbtiDescriptions";
import { toast } from "react-toastify";
import NavigateButton from "./NavigateButton";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 90%;
  max-width: 400px;
  margin: 20px 0;
  text-align: center;
  animation: slideUp 0.5s ease forwards;

  @keyframes slideUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
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
  margin: 10px;

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

const TestResults = () => {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [mbtiResult, setResult] = useState(location.state?.mbtiResult || null);

  const handleDeleteResult = () => {
    setResult(null);
    toast.success("결과가 삭제되었습니다!");
  };

  return (
    <Container>
      <h2>테스트 결과</h2>
      {mbtiResult ? (
        <Card>
          <Title>
            {user.nickname} 님의 MBTI : {mbtiResult}
          </Title>
          <Description>{mbtiDescriptions[mbtiResult]}</Description>
          <p> MBTI 유형을 프로필 페이지로 이동하시겠습니까?</p>
          <ButtonGroup>
            <Button
              onClick={() => navigate("/profile", { state: { mbtiResult } })}
            >
              네
            </Button>
            <Button onClick={() => toast("ㅠㅠ넹....")}>아니요</Button>
          </ButtonGroup>
          <Button onClick={handleDeleteResult}>결과 삭제</Button>
        </Card>
      ) : (
        <Card>
          <p>결과가 삭제되었습니다. 다시 테스트를 진행해 주세요!</p>
          <NavigateButton to="/test">뒤로 가기</NavigateButton>
        </Card>
      )}
    </Container>
  );
};

export default TestResults;
