import React from "react";
import App from "./App";
import TodoList from "./TodoList";

type LazyPage={
  path: string
  element: any
  name: string
}

const LazyPages: LazyPage[] = [
  {
    path: "/",
    element: App,//React.lazy(() => import("./App")),
    name: "Home"
  },
  {
    path: "/listitem",
    element: TodoList,//React.lazy(() => import("./TodoList")),
    name:"Todo List",
  },
];

export default LazyPages;