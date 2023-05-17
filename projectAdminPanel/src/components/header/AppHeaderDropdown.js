import React from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCarAlt,
  cilCreditCard,
  cilAccountLogout,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const AppHeaderDropdown = () => {
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CIcon icon={cilBell} size="lg" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Bildirimler
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Garson Çağırıldı
          <CBadge color="secondary" className="ms-2">
            3
          </CBadge>
        </CDropdownItem>
        <div style={{ width: "90%", margin: "auto 16px" }}>
          <p>Masa 17</p>
          <p>Masa 5</p>
          <p>Masa 13</p>
        </div>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilCarAlt} className="me-2" />
          Vale Araç Çağrısı
          <CBadge color="secondary" className="ms-2">
            2
          </CBadge>
        </CDropdownItem>
        <div style={{ width: "90%", margin: "auto 16px" }}>
          <p>16 BRS 16</p>
          <p>17 CNK 17</p>
        </div>
        <CDropdownDivider />
        <CDropdownItem href="#">
          <CIcon icon={cilAccountLogout} className="me-2" />
          Çıkış
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
