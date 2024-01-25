import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    // 저장 로직을 추가할 부분
    console.log("Title:", title);
    console.log("Writer: ", writer);
    console.log("Content:", content);

    // 저장 후 게시판으로 이동
    navigate("/board");
  };

  const handleCancel = () => { // 취소 후 게시판으로 이동
    navigate("/board");
  };

  return (
    <Container>
      <TitleInput>
        type="text"
        placeholder="제목을 입력하세요."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      </TitleInput>
      <TitleInput>
        type="text"
        placeholder="작성자 이름을 입력하세요."
        value={writer}
        onChange={(e) => setWriter(e.target.value)}
      </TitleInput>
      <ContentInput>
        placeholder="내용을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      </ContentInput>
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
