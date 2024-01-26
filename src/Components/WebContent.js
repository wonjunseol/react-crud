import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom"; // useParams 추가
import { getBoard } from "../Api/Api";
import axios from "axios";

const WebContent = () => {
    const [boardContent, setBoardContent] = useState({});
    const { postId } = useParams(); // URL에서 postId를 가져옴
    const navigate = useNavigate();

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
    }, [postId]); // postId를 의존성 배열에 추가

    const handleEdit = () => { // 수정 취소 후 해당 ID의 내용으로 이동
        navigate(`/board/${postId}/edit`);
    };

    const handleDelete = async () => {
    try {
        console.log(`${postId}`);
        const response = await axios.delete(`${process.env.REACT_APP_URL}board/${postId}`);
        console.log("Response from server:", response.data);
        navigate(`/board`); // 삭제 후 게시판으로 이동
        } catch (error) {
        console.error("Error savaaaaing data:", error);
        }
    };

    return (
        <>
        <GlobalStyle />
        <div>
            <h1>제목 : {boardContent.title}</h1>
            <p>내용 : {boardContent.content}</p>
            <EditButton onClick = {handleEdit}>글 수정하기</EditButton>
            <CancelButton onClick = {handleDelete}>글 삭제하기</CancelButton>
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

const EditButton = styled.button`
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

export default WebContent;