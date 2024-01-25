import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate, useLocation } from  "react-router-dom";

const NavbarContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    background-color: yellow; /* 네비게이션 바 배경색 설정 */
    width: 100%;
    
`;

const Menu = styled.div`
  cursor: pointer;
  margin-left: 20px; /* 각 메뉴 사이의 간격 조정 */
  margin-right: 20px; /* 오른쪽 여백 설정 */
  padding: 5px 10px; /* 내부 여백 조정 */
  border: 1px solid #000; /* 네모칸 테두리 설정 */
  border-radius: 5px; /* 테두리를 둥글게 만들기 */
  background-color: black; /* 배경색 설정 */
  color: white; /* 글자색 설정 */
`;

const WebNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClickWrite = () => {
        navigate("/write");  // Board페이지로 이동
    }
    const handleClick = () => {
        navigate("/board");  // Board페이지로 이동
    };
    const handleGoBack = () => { // 이전화면으로 이동
        navigate("../");
    };
    const handleGoRoot = () => { // 첫화면으로 이동
        navigate("/");
    };

    return (
        <NavbarContainer>
            {location.pathname === "/board" && (
                <Menu onClick={handleClickWrite}>글쓰기</Menu>
            )}
            <Menu onClick = {handleClick}>게시판</Menu>
            <Menu onClick = {handleGoBack}>이전화면</Menu>
            <Menu onClick = {handleGoRoot}>첫화면</Menu>
        </NavbarContainer>
    );
}

export default WebNavbar;