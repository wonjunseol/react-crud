import React, { useState } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRecoilState } from "recoil";
import { useNavigate } from  "react-router-dom";
import WebNavbar from "./WebNavbar";

const Main = () => {
    return (
        <WebNavbar />
    );
    
};
export default Main;