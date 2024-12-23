import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://localhost:7221/api/auth/";

const register = (firstName, lastName, email, password) => {
  return axios.post(API_URL + "register", {
    firstName,
    lastName,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log("Full login response:", response); 

      if (response.data && response.data.token) {
        const decodedToken = jwtDecode(response.data.token);
        const userData = {
          token: response.data.token,
          username: decodedToken.unique_name,
          firstName: decodedToken.FirstName,
          lastName: decodedToken.LastName
        };
        console.log("First Name: " + decodedToken.FirstName);
        console.log("Saving user data to localStorage:", userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return userData;
      } else {
        throw new Error("No token received");
      }
    });
};
const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};



