import React, { useContext, useState } from "react";
import { questions } from "../data/questions";
import NavigateButton from "../components/NavigateButton";
import { calculateMBTI } from "../utils/mbtiCalculator";
import styled from "styled-components";
import { saveTestResult } from "../api/testResult";
import { UserContext } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  border: 2px solid black;
  border-radius: 8px;
  background-color: transparent;
  color: black;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%; 
  text-align: center;

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


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
`;

const QuestionContainer = styled.div`
  background-color: #f9f9f9;
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  width: 80%;
  text-align: center;
`;

const QuestionText = styled.p`
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
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
  width: 100%; /* 버튼 크기 통일 */

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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
`;

const StyledNavigateButton = styled(NavigateButton)`
  border: 2px solid black;
  border-radius: 8px;
  background-color: transparent;
  color: black;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

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

const CompletionMessage = styled.div`
  font-size: 1.5rem;
  color: #28a745;
  margin: 20px;
  /* display: flex; */
  /* flex-direction: column; */

  p {
    margin: 30px;
  }
`;

const TestPage = () => {
  const [answer, setAnswer] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const mbtiResult = calculateMBTI(answer);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleAnswer = (questionId, data) => {
    setAnswer((prev) => {
      const updatedAnswers = prev.filter((item) => item.id !== questionId);
      const selectedType = questions.find((q) => q.id === questionId)?.type;

      const selectedAnswer =
        selectedType &&
        data === questions.find((q) => q.id === questionId)?.options[0]
          ? selectedType.split("/")[0]
          : selectedType.split("/")[1];

      const newAnswer = [
        ...updatedAnswers,
        {
          id: questionId,
          type: questions.find((q) => q.id === questionId)?.type,
          answer: selectedAnswer,
        },
      ];

      console.log("Answers:", newAnswer); // 디버깅
      return newAnswer;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handleSaveResult = async () => {
    const timestamp = new Date().toISOString();
    const testResult = {
      userId: user.id,
      timestamp,
      result: mbtiResult,
      isVisible: true, // 기본적으로 공개 설정
    };

    try {
      await saveTestResult(testResult);
      console.log("테스트 결과 저장 성공:", testResult);
      navigate("/results",  {state : {mbtiResult}} )
    } catch (error) {
      console.error("테스트 결과 저장 실패:", error);
    }
  };

  return (
    <Container>
      <Title>MBTI 테스트</Title>
      {currentQuestion < questions.length - 1 ? (
        <QuestionContainer>
          <QuestionText>Q.{questions[currentQuestion].id}</QuestionText>
          <QuestionText>{questions[currentQuestion].question}</QuestionText>
          <ButtonContainer>
            {questions[currentQuestion].options.map((option) => (
              <Button
                key={option}
                onClick={() =>
                  handleAnswer(questions[currentQuestion].id, option)
                }
              >
                {option}
              </Button>
            ))}
          </ButtonContainer>
        </QuestionContainer>
      ) : (
        <CompletionMessage>
          <p>모든 질문이 완료되었습니다!</p>
          <StyledButton  onClick={handleSaveResult}>
            결과 보기
          </StyledButton >
        </CompletionMessage>
      )}
    </Container>

    // <div>
    //   <h2>MBTI 테스트</h2>
    //   <div>
    //     {questions.map((item) => (
    //       <div key={item.id}>
    //         <p>
    //           {item.id}. {item.question}
    //         </p>
    //         {item.options.map((option) => (
    //           <button
    //             key={option}
    //             onClick={() => handleAnswer(item.id, option)}
    //           >
    //             {option}
    //           </button>
    //         ))}
    //       </div>
    //     ))}
    //   </div>
    //   <NavigateButton
    //     to="/results"
    //     state={{ mbtiResult }}
    //   >
    //     제출하기
    //   </NavigateButton>
    // </div>
  );
};

export default TestPage;
