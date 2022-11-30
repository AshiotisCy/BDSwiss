import styled from "styled-components";
import Login from "./Login";
import { colors } from "./config/colors";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Dashboard from "./Dashboard";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${colors.lighterGrey};
`;

const App = () => {
  return (
    <Wrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Wrapper>
  );
};

export default App;
