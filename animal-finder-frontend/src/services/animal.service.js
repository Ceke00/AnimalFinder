import axios from "axios";

const API_URL = "https://localhost:7221/api/Animals/";

//Getting user and token for Authorization
const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

//Geting all animals
const getAnimals = () => {
  return axios.get(API_URL);
};

//Getting a specific users animals
const getUserAnimals = () => {
  return axios.get(API_URL + "user", getAuthHeader());
};

// Posting animal
const postAnimal = (formData) => {
  return axios.post(API_URL, formData, {
    headers: {
      ...getAuthHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });
};

//Updating a specific animal
const updateAnimal = (id, formData) => {
  return axios.put(API_URL + id, formData, {
    headers: {
      ...getAuthHeader().headers,
      "Content-Type": "multipart/form-data",
    },
  });
};

//Deleting a specific animal
const deleteAnimal = (id) => {
  return axios.delete(API_URL + id, getAuthHeader());
};


export default {
  getAnimals,
  getUserAnimals,
  postAnimal,
  updateAnimal,
  deleteAnimal,

};
