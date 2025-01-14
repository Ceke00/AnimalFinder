import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = "https://localhost:7221/api/auth/";


//sending a post request to register
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
  //sending a post request to login.
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      console.log("Full login response:", response);
      //If response contains jwt-token it will be decoded
      if (response.data && response.data.token) {
        const decodedToken = jwtDecode(response.data.token);
        //placing information in userData
        const userData = {
          token: response.data.token,
          username: decodedToken.unique_name,
          firstName: decodedToken.FirstName,
          lastName: decodedToken.LastName,
          userId: decodedToken.nameid,
        };
        console.log("First Name: " + decodedToken.FirstName);
        console.log("Saving user data to localStorage:", userData);
        //saves userData in localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        return userData;
      } else {
        throw new Error("No token received");
      }
    });
};

//Logout, removing userdata from localStorage
const logout = () => {
  localStorage.removeItem("user");
};



const updateAvatar = (avatarUrl) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.put(
    API_URL + "updateAvatar",
    { avatarUrl },
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }
  );
};

const getProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return axios.get(API_URL + "profile", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
};

export default {
  register,
  login,
  logout,
  updateAvatar,
  getProfile,
};