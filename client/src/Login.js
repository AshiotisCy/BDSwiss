import React, { useEffect } from "react";
import styled from "styled-components";
import LoginForm from "./components/LoginForm";
import { colors } from "./config/colors";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${colors.lighterGrey};
`;

const Login = () => {
  useEffect(() => {
    sessionStorage.setItem("UserId", "");
    sessionStorage.setItem("userIsValid", "");
  }, []);

  return (
    <Wrapper>
      <LoginForm />
    </Wrapper>
  );
};

export default Login;
