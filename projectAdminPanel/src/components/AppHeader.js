import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeState } from "src/features/user/GeneralSlice";
import { logoutUser } from "src/features/user/UserSlice";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilList, cilMenu, cilAccountLogout } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./header/index";
import { ReactComponent as Logo } from "src/assets/brand/instalogogold.svg";

const AppHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarShow = useSelector((state) => state.general.sidebarShow);

  return (
    <CHeader position="sticky" className="header">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() =>
            dispatch(changeState({ type: "set", sidebarShow: !sidebarShow }))
          }
        >
          <CIcon className="header_toggler" icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <AppBreadcrumb />
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
          <CIcon
            icon={cilAccountLogout}
            className="me-2"
            onClick={() => {
              dispatch(logoutUser());
            }}
          />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;

// //Çıkarıldı
// <CHeaderBrand
//           className="mx-auto d-md-none customized_header_brand"
//           to="/"
//         >
//           <Logo height={68} alt="Logo" />
//         </CHeaderBrand>
