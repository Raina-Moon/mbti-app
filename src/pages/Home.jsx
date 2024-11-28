import React, { useContext } from "react";
import NavigateButton from "../components/NavigateButton";
import { UserContext } from "../components/UserContext";
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const slideUp = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div`
   display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white overlay */
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
  margin-top: 30px;

  h2 {
    font-size: 2rem;
    margin-bottom: 15px;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    color: #666;
  }
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 50px;
  margin-bottom: 40px;
  width: 100%;
  max-width: 600px;
  animation: ${slideUp} 1.5s ease-out;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 180px;
  min-width: 200px;

  h4 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #444;
  }

  p {
    font-size: 1rem;
    color: #777;
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  text-align: center;

  p {
    font-size: 1rem;
    color: #666;
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

  &:hover {
    background-color: white; /* 흰색으로 채워짐 */
    color: transparent; /* 텍스트 색상 투명화 */
    border-color: white; /* 테두리 색상 흰색 */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <GradientBackground>
    <Container>
      <Header>
        <div>
          <h2>무료 성격 테스트</h2>
          <p>자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해 주세요.</p>
        </div>
      </Header>
      <CardsContainer>
        <Card>
          <h4>성격 유형 검사</h4>
          <p>
            자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지
            알아보세요.
          </p>
        </Card>
        <Card>
          <h4>성격 유형 이해</h4>
          <p>
            다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.
          </p>
        </Card>
        <Card>
          <h4>팀 평가</h4>
          <p>
            팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을
            배워보세요.
          </p>
        </Card>
      </CardsContainer>
      <ButtonContainer>
        {user ? (
          <Button as={NavigateButton} to="/test"> 내 성격 알아보러 가기 </Button>
        ) : (
          <p>로그인 후 이용해 주세요.</p>
        )}
      </ButtonContainer>
    </Container>
    </GradientBackground>
  );
};

export default Home;
