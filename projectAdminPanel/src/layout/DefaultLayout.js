import React from "react";
import { AppContent, AppSidebar, AppHeader } from "../components/index";

const DefaultLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 app_content_box">
        <AppHeader />
        <div className="body flex-grow-1 px-3 ">
          <AppContent />
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
