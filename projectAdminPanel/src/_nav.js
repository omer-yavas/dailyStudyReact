import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilDescription,
  cilDinner,
  cilDrop,
  cilPeople,
  cilPuzzle,
  cilCarAlt,
  cilHome,
  cilSpeedometer,
  cilSpreadsheet,
  cilStar,
  cilSettings,
  cilNotes,
  cilRestaurant,
  cilUserPlus,
  cilViewQuilt,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Ana Sayfa",
    to: "/homePage",
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Sipariş Takip",
    to: "/orderTracking",
    icon: <CIcon icon={cilDinner} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Adisyon",
    to: "/receipt",
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Vale",
    to: "/valet",
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Menu",
    to: "/base",
    icon: <CIcon icon={cilRestaurant} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Ürünler",
        to: "/items",
      },

      {
        component: CNavItem,
        name: "Menüler",
        to: "/menu",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Kullanıcı Yetkilendirme",
    to: "/userManagement",
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Raporlar",
    to: "/reports",
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: "Personel",
    to: "/personel",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Ayarlar",
    to: "/base",
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Restoran Masa Düzeni",
        to: "/restaurantLayout",
        // icon: <CIcon icon={cilViewQuilt} customClassName="nav-icon" />,
      },

      {
        component: CNavItem,
        name: "Anket Soruları",
        to: "/menu",
      },
      {
        component: CNavItem,
        name: "Kredi Hesap Yönetimi",
        to: "/menu",
      },
    ],
  },
];

export default _nav;
