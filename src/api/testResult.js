import axios from "axios";

const JSON_SERVER_URL = "http://localhost:5001";

// 테스트 결과 저장 (CREATE)
export const saveTestResult = async (testResult) => {
  try {
    const response = await axios.post(`${JSON_SERVER_URL}/testResults`, testResult);
    return response.data;
  } catch (error) {
    console.error("테스트 결과 저장 실패:", error);
    throw error;
  }
};

// 테스트 결과 가져오기 (READ)
export const getTestResults = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_URL}/testResults`);
    return response.data;
  } catch (error) {
    console.error("테스트 결과 가져오기 실패:", error);
    throw error;
  }
};

// 테스트 결과 삭제 (DELETE)
export const deleteTestResult = async (id) => {
  try {
    const response = await axios.delete(`${JSON_SERVER_URL}/testResults/${id}`);
    return response.data;
  } catch (error) {
    console.error("테스트 결과 삭제 실패:", error);
    throw error;
  }
};

// 공개 여부 업데이트 (UPDATE)
export const toggleTestResultVisibility = async (id, isVisible) => {
  try {
    const response = await axios.patch(`${JSON_SERVER_URL}/testResults/${id}`, {
      isVisible,
    });
    return response.data;
  } catch (error) {
    console.error("테스트 결과 업데이트 실패:", error);
    throw error;
  }
};
