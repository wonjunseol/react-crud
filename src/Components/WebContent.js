import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom"; // useParams 추가
import { getBoard } from "../Api/Api";

const WebContent = () => {
    const [boardContent, setBoardContent] = useState({});
    const { postId } = useParams(); // URL에서 postId를 가져옴

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBoard(postId); // postId 전달
                setBoardContent(response);
            } catch (error) {
                console.error("Error fetching board:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
        <GlobalStyle />
        <div>
            <h1>제목 : {boardContent.title}</h1>
            <p>내용 : {boardContent.content}</p>
        </div>
        </>
    );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;

export default WebContent;
