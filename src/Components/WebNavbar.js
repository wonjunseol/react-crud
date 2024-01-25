import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from  "react-router-dom";

const NavbarContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    background-color: yellow; /* 네비게이션 바 배경색 설정 */
`;

const Menu = styled.div`
  cursor: pointer;
  margin-left: 10px; /* 각 메뉴 사이의 간격 조정 */
`;

const WebNavbar = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/board");
    };

    return (
        <NavbarContainer className = "navWrapper">
            <Menu>게시판</Menu>
            <Menu>이전화면</Menu>
            <Menu>첫화면</Menu>
        </NavbarContainer>
    );
}

export default WebNavbar;