import React from "react";

type LazyPage={
  path: string
  element: React.LazyExoticComponent<React.ComponentType<any>>
  name: string
}

const LazyPages: LazyPage[] = [
  // {
  //   path: "/login",
  //   element: React.lazy(() => import("./")),
  //   name:"Login",
  // },
];

export default LazyPages;