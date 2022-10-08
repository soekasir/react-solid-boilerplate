import { Suspense } from "react";
import { Route, Routes } from "react-router";
import App from "../pages/App";
import LazyPages from "../pages/Lazy";

export default function Router() {
  return (
    <Suspense fallback={<>Loading</>}>
      <Routes>
        <Route path="/" element={<App />} />
        {LazyPages.map((item) => (
          <Route key={item.path} path={item.path} element={<item.element />} />
        ))}
      </Routes>
    </Suspense>
  );
}
