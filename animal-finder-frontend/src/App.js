// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import MemberPage from "./pages/MemberPage";
// import NavMenu from "./components/NavMenu";
// import Footer from "./components/Footer";
// import RegisterPage from "./pages/RegisterPage";
// import "./custom.scss";
// import Container from "react-bootstrap/Container";
// import LoggedOutPage from "./pages/LoggedOutPage";
// import MemberPageAddAnimal from "./pages/MemberPageAddAnimal";
// import MemberPageComment from "./pages/MemberPageComment";
// import MemberPageDeleteAnimal from "./pages/MemberPageDeleteAnimal";
// import MemberPageUpdateAnimal from "./pages/MemberPageUpdateAnimal";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   console.log("logged in: " + isLoggedIn);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setIsLoggedIn(true);
//       console.log("if -> logged in: " + isLoggedIn);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);

//   };

//   return (
//     <div>
//       <NavMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
//       <Container>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route
//             path="/login"
//             element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
//           />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/loggedout" element={<LoggedOutPage />} />
//           <Route
//             path="/memberpage"
//             element={
//               <ProtectedRoute>
//                 <MemberPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/memberpage/addanimal"
//             element={
//               <ProtectedRoute>
//                 <MemberPageAddAnimal />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/memberpage/comment"
//             element={
//               <ProtectedRoute>
//                 <MemberPageComment />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/memberpage/deleteanimal"
//             element={
//               <ProtectedRoute>
//                 <MemberPageDeleteAnimal />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/memberpage/updateanimal"
//             element={
//               <ProtectedRoute>
//                 <MemberPageUpdateAnimal />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Container>
//       <Footer />
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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

import MemberPageUpdateAnimal from "./pages/MemberPageUpdateAnimal";
import { jwtDecode } from "jwt-decode";
import AuthService from "./services/auth.service";
import ErrorPage from "./pages/ErrorPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
   const navigate = useNavigate();
  console.log("logged in: " + isLoggedIn);
 

  useEffect(() => {
    const checkTokenValidity = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        //Getting expiration time for token
        const token = storedUser.token;
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        //if token has expired -logout. If token is valid sets timer for logout.
        if (decodedToken.exp < currentTime) {
          handleLogout();
        } else {
          setIsLoggedIn(true);
          const expirationTime = decodedToken.exp * 1000 - Date.now();
          setTimeout(() => {
            handleLogout();
          }, expirationTime);
        }
      }
    };

    checkTokenValidity();
  }, []);



  const handleLogout = () => {
   AuthService.logout();
    setIsLoggedIn(false);
     navigate("/loggedout");
  };

  return (
    <div>
      <NavMenu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route
            path="/login"
            element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
          />
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
            path="/addanimal"
            element={
              <ProtectedRoute>
                <MemberPageAddAnimal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/comment"
            element={
              <ProtectedRoute>
                <MemberPageComment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateanimal"
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