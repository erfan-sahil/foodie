import Layout from "@/layouts/layout";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            {" "}
            <p>Home Page</p>{" "}
          </Layout>
        }
      />
      <Route path="/profile" element={<span>User Profile Page</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
