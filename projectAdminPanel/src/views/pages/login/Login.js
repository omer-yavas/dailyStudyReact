import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkLoginIsValid } from "../../../features/user/UserSlice";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { ReactComponent as Logo } from "../../../assets/brand/instalogogold.svg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const authenticated = useSelector((state) => state.user.authenticated);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkLoginIsValid({ username: username, password: password }));
    setusername("");
    setpassword("");
  };

  useEffect(() => {
    if (authenticated === true) {
      navigate("/menu");
    } else {
      console.log("not authenticated yet!");
    }
  }, [authenticated]);

  return (
    <div className="main_background min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <div className="xsmallscreen_loginheader">
                      <h1>Login</h1>
                      <div className="xsmallscreenlogo">
                        <Logo className="login_logo" />
                      </div>
                    </div>

                    <p className="text-medium-emphasis">
                      Hesabınıza Giriş Yapın!
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Kullanıcı Adı"
                        autoComplete="username"
                        onChange={(e) => setusername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Şifre"
                        autoComplete="current-password"
                        onChange={(e) => setpassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleSubmit}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="logo_card black_background py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <Logo className="login_logo" />
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
