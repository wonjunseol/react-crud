import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { getBoard } from "../Api/Api";

const Board = () => {
  const [boardInfo, setBoardInfo] = useState([]);
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
        const response = await getBoard();
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
                    <td key={column.key}>
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
  /* 필요한 스타일 추가 */
`;

export default Board;
