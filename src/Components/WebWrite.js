import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => { // 서버에 데이터 전송
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}board`, {
        title: title,
        author: author,
        content: content,
      });
      console.log("Response from server:", response.data);
      navigate("/board"); // 저장 후 게시판으로 이동
    } catch (error) {
      console.error("Error savaaaaing data:", error);
    }
  };

  const handleCancel = () => { // 취소 후 게시판으로 이동
    navigate("/board");
  };

  return (
    <Container>
        <TitleInput
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <TitleInput
            type="text"
            placeholder="작성자 이름을 입력하세요."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
        />
        <ContentInput
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
      <ButtonContainer>
        <SaveButton onClick={handleSave}>저장</SaveButton>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
      </ButtonContainer>
    </Container>
  );
};

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

export default Write;
