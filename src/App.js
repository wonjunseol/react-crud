import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import Board from "./Pages/Board";
import Write from "./Pages/Write";
import Content from "./Pages/Content";
import Edit from "./Pages/Edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/board" element={<Board />} />
        <Route path="/write" element={<Write />} />
        <Route path="/board/:postId" element={<Content />} />
        <Route path="/board/:postId/edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
