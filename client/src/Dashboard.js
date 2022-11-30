import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { colors } from "./config/colors";
import { Popover } from "antd";
import Protected from "./helper/Protected";

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const User = styled.div`
  color: ${colors.blue};
`;

const LogoutLink = styled.span`
  color: ${colors.darkgrey};

  :hover {
    cursor: pointer;
    color: ${colors.blue};
  }
  &.logout {
    :hover {
      cursor: pointer;
      color: ${colors.red};
    }
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserId");
  const isValid = sessionStorage.getItem("userIsValid");
  const [loggedUser, setLoggedUser] = useState();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${userId}`)
      .then((res) => setLoggedUser(res.data));
  }, []);

  const title = "Welcome";

  const handleLogout = () => {
    sessionStorage.setItem("UserId", "");
    sessionStorage.setItem("userIsValid", "");
    setIsPopoverOpen(false);
    navigate("/");
  };

  return (
    <Protected isLoggedIn={isValid}>
      <div id="dashboard">
        <TitleWrapper>
          <Wrapper>
            <div>{title}</div>&nbsp;
            <User>{`${loggedUser?.name}!`}</User>
          </Wrapper>
          <Popover
            content={
              <LogoutLink className="logout" onClick={() => handleLogout()}>
                {"Logout"}
              </LogoutLink>
            }
            title="Are you sure you want to logout?"
            trigger="click"
            open={isPopoverOpen}
            onOpenChange={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <span>{"To logout click "}</span>
            <LogoutLink>{"here."}</LogoutLink>
          </Popover>
        </TitleWrapper>
      </div>
    </Protected>
  );
};

export default Dashboard;
