import React, { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 2px solid black;
  border-radius: 8px;
  background-color: transparent;
  color: black;
  transition: all 0.3s ease;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
    background-color: white;
    border-color: white;
    color: black;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
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
    background-color: white;
    color: black;
    border-color: white;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }
`;

const AuthForm = ({ mode, onSubmit }) => {
  const { setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  //   const handleAuthForm = async () => {
  //     try {
  //         const response = await login(formData);
  //         if (response.success) {
  //           setUser(response.user);
  //           navigate("/");
  //     } catch {
  //       alert("로그인에 실패했습니다. 다시 시도해주세요.");
  //     }
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //DB에 새로운 user 추가
    onSubmit(formData);

    setUser("user");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="아이디를 입력하세요"
        required
      />
      <Input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호를 입력하세요"
        required
      />
      {mode === "signup" && (
        <Input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력하세요"
          required
        />
      )}

      <Button type="submit">{mode === "login" ? "로그인" : "회원가입"}</Button>
    </Form>
  );
};

export default AuthForm;
