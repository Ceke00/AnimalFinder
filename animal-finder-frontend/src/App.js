import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import MemberPage from "./pages/MemberPage";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import "./custom.scss";
import Container from "react-bootstrap/Container";
import LoggedOutPage from "./pages/LoggedOutPage";
import MemberPageAddAnimal from "./pages/MemberPageAddAnimal";
import MemberPageComment from "./pages/MemberPageComment";
import MemberPageDeleteAnimal from "./pages/MemberPageDeleteAnimal";
import MemberPageUpdateAnimal from "./pages/MemberPageUpdateAnimal";

const App = () => {
  return (
    <div>
      <NavMenu />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/loggedout" element={<LoggedOutPage />} />
          <Route
            path="/memberpage"
            element={
              <ProtectedRoute>
                <MemberPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memberpage/addanimal"
            element={
              <ProtectedRoute>
                <MemberPageAddAnimal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memberpage/comment"
            element={
              <ProtectedRoute>
                <MemberPageComment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memberpage/deleteanimal"
            element={
              <ProtectedRoute>
                <MemberPageDeleteAnimal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memberpage/updateanimal"
            element={
              <ProtectedRoute>
                <MemberPageUpdateAnimal />
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
