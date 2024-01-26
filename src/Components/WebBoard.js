import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { getAllBoards } from "../Api/Api";

const Board = () => {
  const [boardInfo, setBoardInfo] = useState([]);
  const navigate = useNavigate();
  const columns = [
    { key: "id", label: "id" },
    { key: "title", label: "제목" },
    { key: "author", label: "작성자" },
    { key: "content", label: "내용", hidden: true },
    { key: "createdAt", label: "작성일" },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBoards();
        if (response && response.boardResponseList) {
          const sortedBoardInfo = response.boardResponseList.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setBoardInfo(response.boardResponseList);
        } else {
          alert("게시글이 없습니다.");
        }
      } catch (error) {
        console.error("게시판 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const handleTitleClick = (postId) => { // 제목을 클릭했을 때 글 보기 페이지로 이동
    navigate(`/board/${postId}`);
  };

  return (
    <>
      <GlobalStyle />
      <StyledTable>
        <thead>
          <tr>
            {columns.map(
              (column) =>
                !column.hidden && <th key={column.key}>{column.label}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {boardInfo.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(
                (column) =>
                  !column.hidden &&
                  column.key !== "content" && (
                    <td key={column.key}
                      onClick={() =>
                        column.key === "title" && handleTitleClick(row["id"])
                      }
                    >
                      {column.key === "createdAt"
                        ? formatDate(row[column.key])
                        : row[column.key]}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </>
  );
};
const GlobalStyle = createGlobalStyle`
  body {
    margin : 0;
    padding: 0;
  }
`;
const StyledTable = styled.table`
  td {
    cursor: pointer; /* 제목에 커서를 갖다 대면 클릭하는 모션이 되도록 */
  }
`;

export default Board;
