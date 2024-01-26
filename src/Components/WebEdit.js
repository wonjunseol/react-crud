import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { createGlobalStyle } from "styled-components";

const WebEdit = () => {
  const location = useLocation();
  const postId = location.pathname.split("/")[2]; // 경로에서 postId 추출
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleEdit = async () => { // 서버에 데이터 전송
    try {
      const response = await axios.patch(`${process.env.REACT_APP_URL}board`, {
        postId : postId,
        title: title,
        content: content,
      });
      console.log("Response from server:", response.data);
      navigate("/board"); // 저장 후 게시판으로 이동
    } catch (error) {
      console.error("Error savaaaaing data:", error);
    }
  };

  const handleCancel = () => { // 취소 후 게시판으로 이동
    navigate(`/board/${postId}`);
  };

  return (
    <>
    <GlobalStyle />
    <Container>
        <TitleInput
            type="text"
            placeholder="수정할 제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <ContentInput
            placeholder="수정할 내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
    <ButtonContainer>
        <SaveButton onClick={handleEdit}>수정하기</SaveButton>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
    </ButtonContainer>
    </Container>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const TitleInput = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const ContentInput = styled.textarea`
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default WebEdit;