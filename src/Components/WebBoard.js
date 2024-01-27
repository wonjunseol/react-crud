import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { getAllBoards } from "../Api/Api";

const Board = () => {
  const [boardInfo, setBoardInfo] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 3; // 한 페이지당 표시할 게시물 수
  const [currentPage, setCurrentPage] = useState(1);
  const columns = [
    { key: "id", label: "id" },
    { key: "title", label: "제목" },
    { key: "author", label: "작성자" },
    { key: "content", label: "내용", hidden: true },
    { key: "createdAt", label: "작성일" },
    { key: "viewCnt", label: "조회수" },
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

  const calculatePageInfo = () => { // 현재 페이지와 전체 페이지 수를 계산하는 함수
    const totalPages = Math.ceil(boardInfo.length / itemsPerPage);
    return { totalPages };
  };

  const { totalPages } = calculatePageInfo();

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  const getVisibleItems = () => { // 현재 페이지에 따라 표시할 게시물을 필터링하는 함수
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return boardInfo.slice(startIndex, endIndex);
  };

  const visibleItems = getVisibleItems();

  const Pagination = () => (
    <StyledPagination>
      <button onClick={() => handlePageClick(1)}>첫 페이지</button>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button key={index + 1} onClick={() => handlePageClick(index + 1)}>
          {index + 1}
        </button>
      ))}
      <button onClick={() => handlePageClick(totalPages)}>끝 페이지</button>
    </StyledPagination>
  );

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
          {visibleItems.map((row, rowIndex) => (
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
      <Pagination />
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

const StyledPagination = styled.div`
  button {
    margin-right: 5px;
  }
`;

export default Board;
