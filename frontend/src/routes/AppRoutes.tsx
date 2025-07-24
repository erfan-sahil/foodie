import Layout from "@/layouts/Layout";
import HomePage from "@/pages/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            {" "}
            <HomePage />
          </Layout>
        }
      />
      <Route path="/profile" element={<span>User Profile Page</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
