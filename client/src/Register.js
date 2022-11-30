import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "./config/colors";
import { CreateUserValidationSchema } from "./config/Validations";
import { Formik, Field, Form } from "formik";
import { BoxShadowStrong } from "./config/BoxShadows";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Input, Tooltip } from "antd";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${colors.lighterGrey};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.darkgrey};
  font-size: 18px;
`;

const LockWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${colors.lightTeal};
  margin: 10px;
  transition: all 0.3s ease;
  cursor: pointer;

  :hover {
    background-color: ${colors.yellow};
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${colors.white};
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: flex-start;

  label {
    flex: 1 1 0;
    font-size: 16px;
    color: ${colors.darkgrey};
  }
`;

const FormComponent = styled(Form)`
  border-radius: 15px;
`;

const FormError = styled.div`
  font-size: 14px;
  color: red;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid ${colors.lightTeal};
  border-radius: 5px;
  background-color: ${colors.white};
  color: ${colors.black};
  cursor: not-allowed;
  transition: all 0.3s ease;
  max-width: 200px;
  width: 100%;

  &.isValid {
    cursor: pointer;
    background-color: ${colors.lightTeal};
    color: ${colors.white};

    :hover {
      background-color: transparent;
      color: ${colors.lightTeal};
      border: 1px solid ${colors.lightTeal};
    }
  }
`;

const Button = styled.button`
  border-radius: 4px;
  border: 1px solid ${colors.lightTeal};
  color: ${colors.lightTeal};
  max-width: 200px;
  width: 100%;
  height: 40px;
  transition: all 0.3s ease;
  pointer-events: none;
  background-color: ${colors.lighterGrey};

  &.isValid {
    cursor: pointer;
    pointer-events: all;
    background-color: ${colors.white};
  }

  :hover {
    background-color: ${colors.lightTeal};
    color: ${colors.white};
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  Input {
    flex: 1 1 0;

    &.nonMandatory {
      margin-right: 0px;
    }

    &.mandatory {
      margin-right: 10px;
    }
  }
`;

const Card = styled.div`
  background-color: ${colors.white};
  padding: 20px;
  border-radius: 10px;
  min-width: 250px;
  box-shadow: ${BoxShadowStrong};
`;

const ErrorWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 40px;
  border: 1px solid ${colors.red};
  background-color: #f3ced1;
  color: ${colors.darkgrey};
  margin: 10px 0;
`;

const Register = () => {
  const [responseStatus, setResponseStatus] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem("UserId", "");
    sessionStorage.setItem("userIsValid", "");
  }, []);

  return (
    <Wrapper>
      <Card id="Card">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={CreateUserValidationSchema}
          onSubmit={(values) => {
            setLoading(true);
            axios
              .post("http://localhost:3001/users", values)
              .then((res) => {
                setLoading(false);
                navigate("/");
              })
              .catch((err) => {
                if (err?.response) {
                  setErrorMessage(err.response?.data?.message);
                  setResponseStatus(err.response?.status);
                  setLoading(false);
                }
              });
          }}
        >
          {({
            errors,
            handleBlur,
            values,
            handleChange,
            isValid,
            dirty,
            touched,
          }) => (
            <FormComponent>
              <Header>
                <LockWrapper>
                  <IconWrapper id="Icon" onClick={() => navigate("/")}>
                    <UserOutlined />
                  </IconWrapper>
                </LockWrapper>
                <Title id="Title">Create Account</Title>
              </Header>
              {responseStatus === 400 && (
                <ErrorWrapper>{errorMessage}</ErrorWrapper>
              )}
              <Inner>
                <InputWrapper>
                  <label id="name">Name:</label>
                  <InputContainer>
                    <Field
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="name"
                    >
                      {({ field }) => {
                        return (
                          <Input
                            {...field}
                            type="text"
                            data-cy="name"
                            className={
                              touched?.name && errors.name
                                ? "mandatory"
                                : "nonMandatory"
                            }
                          />
                        );
                      }}
                    </Field>
                    {errors && touched.name && (
                      <FormError>
                        {errors?.name && (
                          <span id="formerrorname">{errors.name}</span>
                        )}
                      </FormError>
                    )}
                  </InputContainer>
                </InputWrapper>
                <InputWrapper>
                  <label id="email">Email Address:</label>
                  <InputContainer>
                    <Field
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="email"
                    >
                      {({ field }) => {
                        return (
                          <Input
                            {...field}
                            type="text"
                            data-cy="email"
                            className={
                              touched?.email && errors.email
                                ? "mandatory"
                                : "nonMandatory"
                            }
                            suffix={<UserOutlined />}
                          />
                        );
                      }}
                    </Field>
                    {errors && touched.email && (
                      <FormError>
                        {errors?.email && (
                          <span id="formerror">{errors.email}</span>
                        )}
                      </FormError>
                    )}
                  </InputContainer>
                </InputWrapper>
                <InputWrapper>
                  <label id="password">Password:</label>
                  <InputContainer>
                    <Field
                      onBlur={handleBlur}
                      onChange={handleChange}
                      name="password"
                    >
                      {({ field }) => {
                        return (
                          <Input.Password
                            {...field}
                            type="password"
                            data-cy="password"
                            className={
                              touched?.password && errors.password
                                ? "mandatory"
                                : "nonMandatory"
                            }
                            iconRender={(visible) =>
                              visible ? (
                                <EyeTwoTone />
                              ) : (
                                <EyeInvisibleOutlined />
                              )
                            }
                          />
                        );
                      }}
                    </Field>
                    {errors && touched.password && (
                      <FormError>
                        {errors?.password && (
                          <span id="formerrorpassword">{errors.password}</span>
                        )}
                      </FormError>
                    )}
                  </InputContainer>
                </InputWrapper>
              </Inner>
              <Footer>
                <ButtonWrapper className={dirty && isValid && "isValid"}>
                  <Button
                    className={dirty && isValid && "isValid"}
                    type="submit"
                  >
                    {loading ? (
                      <span>
                        <ClipLoader size={20} />
                      </span>
                    ) : (
                      "SignUp"
                    )}
                  </Button>
                </ButtonWrapper>
              </Footer>
            </FormComponent>
          )}
        </Formik>
      </Card>
    </Wrapper>
  );
};

export default Register;
