import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/board");
  };
  const imageUrl = "/logo192.png";

  return (
    <>
      <GlobalStyle />

      <Div>
        <TextDiv>
          <Title>
            <TitleSub>함께하는 대학생활,</TitleSub>
            <TitleSub>에브리타임</TitleSub>
          </Title>

          <Text>
            <Sub>에브리타임에서 우리 학교 학생들과 함께</Sub>
            <Sub>여러분이 원하는 대학생활을 만들어보세요.</Sub>
          </Text>

          <ButtonContainer>
            {/* 넷바 나오기 전까지 앱스토어 버튼 사용*/}
            <Button onClick={handleClick}> App Store</Button>
            <Button>Google Play</Button>
          </ButtonContainer>

          {/* <button onClick = {handleClick}>게시판으로 이동</button> */}
        </TextDiv>
        <Image src={imageUrl} />
      </Div>
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 300px;
  margin-left: 600px;
`;
const Title = styled.div`
  text-align: left;
  margin-bottom: 15px;
`;

const TitleSub = styled.div`
  font-size: 55px;
  font-weight: bold;
`;
const Text = styled.div`
  text-align: left;
  margin-bottom: 15px;
`;

const Sub = styled.div`
  color: gray;
  font-size: 20px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const Button = styled.div`
  color: white;
  text-align: center;
  line-height: 50px;
  background-color: black;
  width: 150px;
  height: 50px;
  border-radius: 8px;
  cursor: pointer;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  margin-top: 325px;
  margin-left: 200px;
`;
export default Main;
