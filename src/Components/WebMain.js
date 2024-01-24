import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from  "react-router-dom";

const Main = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/board");
    };

    return (
        <button onClick = {handleClick}>게시판으로 이동</button>
    );
};
export default Main;