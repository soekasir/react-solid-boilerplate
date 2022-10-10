import React from "react";

type LazyPage={
  path: string
  element: React.LazyExoticComponent<React.ComponentType<any>>
  name: string
}

const LazyPages: LazyPage[] = [
  {
    path: "/",
    element: React.lazy(() => import("./App")),
    name: "Home"
  }
  // {
  //   path: "/login",
  //   element: React.lazy(() => import("./")),
  //   name:"Login",
  // },
];

export default LazyPages;