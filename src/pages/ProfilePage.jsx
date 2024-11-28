import React, { useContext, useState } from "react";
import { updateProfile } from "../api/auth";
import { useLocation } from "react-router-dom";
import { UserContext } from "../components/UserContext";
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
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 20px;
`;

const InfoSection = styled.div`
  flex: 1;
  margin-right: 20px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #ddd;
  background-color: #f0f0f0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditSection = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  font-family: "Arial", sans-serif;
`;

const SectionTitle = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
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

const SubmitButton = styled(Button)`
  width: 100%;
  font-weight: bold;
  text-transform: uppercase;
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #ddd;
  margin: 20px 0;
`;

const FileInput = styled.input`
  margin-top: 5px;
  font-size: 0.9rem;
  color: #555;
`;

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const [mbtiResult, setMbtiResult] = useState(
    location.state?.mbtiResult || null
  );

  const [nickname, setNickname] = useState(user?.nickname || "");
  const [avatar, setAvatar] = useState(null);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleNicknameSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nickname", nickname);

    try {
      const data = await updateProfile(formData);
      toast.success("닉네임 업데이트 성공!");
      setUser({ ...user, nickname: data.nickname });
    } catch (error) {
      toast.error("닉네임 업데이트에 실패했습니다.");
    }
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const data = await updateProfile(formData);
      toast.success("프로필 사진 업데이트 성공!");
      setUser({ ...user, avatar: data.avatar });
    } catch (error) {
      toast.error("프로필 사진 업데이트에 실패했습니다.");
    }
  };

  const handleRemoveMbti = () => {
    setMbtiResult(null);
    toast.success("유형이 삭제되었습니다!");
  };

  return (
    <GradientBackground>
      <Container>
        <Card>
          <InfoSection>
            <p>닉네임 : {user?.nickname}</p>
            <p>MBTI 유형 : {mbtiResult}</p>
            <Button onClick={handleRemoveMbti}>유형 삭제하기</Button>
          </InfoSection>
          <ProfileImageContainer>
            {user?.avatar ? (
              <ProfileImage src={user.avatar} alt="profile-image" />
            ) : (
              <p>프로필 이미지가 없습니다.</p>
            )}
          </ProfileImageContainer>
        </Card>
        <EditSection>
          <SectionTitle>프로필 수정</SectionTitle>
          <Form onSubmit={handleNicknameSubmit}>
            <Label>닉네임</Label>
            <Input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="수정할 닉네임을 입력하세요"
            />
            <SubmitButton type="submit">닉네임 업데이트</SubmitButton>
          </Form>
          <Divider />
          <Form onSubmit={handleAvatarSubmit}>
            <Label>프로필 이미지</Label>
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
            <SubmitButton type="submit">프로필 사진 업데이트</SubmitButton>
          </Form>
        </EditSection>
      </Container>
    </GradientBackground>
  );
};

export default ProfilePage;
