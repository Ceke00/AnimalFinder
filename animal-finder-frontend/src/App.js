import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
 import LoginPage from "./pages/LoginPage";
// import Register from "./components/Register";
// import Products from "./components/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import MemberPage from "./pages/MemberPage"
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import "./custom.scss";
import Container from "react-bootstrap/Container";

const App = () => {
  return (
    <div>
      <NavMenu />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/memberpage"
            element={
              <ProtectedRoute>
                <MemberPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
