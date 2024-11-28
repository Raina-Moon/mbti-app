export const calculateMBTI = (answers) => {
    // 각 MBTI 유형에 대한 점수 초기화
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
    // answers 배열을 순회하며 점수 누적
    answers.forEach(({ type, answer }) => {
      const [option1, option2] = type.split("/"); // E/I, S/N 등의 유형 분리
      if (answer === option1) {
        scores[option1]++;
      } else if (answer === option2) {
        scores[option2]++;
      }
    });
  
    // 각 점수 비교를 통해 최종 MBTI 유형 계산
    const result = `${scores.E >= scores.I ? "E" : "I"}${
      scores.S >= scores.N ? "S" : "N"
    }${scores.T >= scores.F ? "T" : "F"}${scores.J >= scores.P ? "J" : "P"}`;
  
    return result;
  };
