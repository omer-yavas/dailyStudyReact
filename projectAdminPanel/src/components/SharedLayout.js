import React from "react";

const DefaultLayout = React.lazy(() => import("../layout/DefaultLayout"));

const SharedLayout = () => {
  return <DefaultLayout />;
};
export default SharedLayout;
