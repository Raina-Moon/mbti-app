import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error.response?.data || error.message);
    throw error;
  }
};

//userData = {
//     "id": "유저 아이디",
//     "password": "유저 비밀번호",
//     "nickname": "유저 닉네임"
// }

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    console.log("Login API Response:", response.data); // 응답 디버깅

    if (response.data.success) {
      localStorage.setItem("accessToken", response.data.accessToken);
      const user = {
        id: response.data.userId,
        nickname: response.data.nickname,
        avatar: response.data.avatar,
      };
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      return { ...response.data, user };
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("로그인을 먼저 해주세요.");

  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (formData) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.patch(`${API_URL}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const updateNickname = async (nickname) => {
//   const token = localStorage.getItem("accessToken");
//   try {
//     const response = await axios.patch(
//       `${API_URL}/profile/nickname`,
//       { nickname },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateAvatar = async (avatar) => {
//   const token = localStorage.getItem("accessToken");
//   try {
//     const formData = new FormData();
//     formData.append("avatar",avatar);

//     const response = await axios.patch(`${API_URL}/profile/avatar`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
