import { Header } from "../components";
import { Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes";

const AppRoutes = () => {
  return (
    <>
      <Header />
      <main>
        <Routes>
          {publicRoutes.map((el) => (
            <Route path={el.path} element={<el.element />} />
          ))}
        </Routes>
      </main>
    </>
  );
};

export default AppRoutes;
