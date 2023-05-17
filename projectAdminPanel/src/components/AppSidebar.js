import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeUnfoldable } from "src/features/user/GeneralSlice";
import { changeState } from "src/features/user/GeneralSlice";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logoNegative } from "src/assets/brand/logo-negative";
import { sygnet } from "src/assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../_nav";

import { ReactComponent as Logo } from "src/assets/brand/instalogogold.svg";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.general.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.general.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch(changeState({ type: "set", sidebarShow: visible }));
      }}
    >
      <CSidebarBrand className="d-none d-md-flex sidebar_brand" to="/">
        <Logo height={68} alt="Logo" />
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav className="sidebar_nav">
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex sidebar_toggler"
        onClick={() =>
          dispatch(changeUnfoldable({ sidebarUnfoldable: !unfoldable }))
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
