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
// const getUserAnimals = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = user?.token;
//   const authHeader = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//   return axios.get(API_URL + "user", authHeader);
// };

//Posting animal
// const postAnimal = (
//   type,
//   name,
//   description,
//   neighborhood,
//   dateOfDisappearance,
//   imageUrl
// ) => {
//   return axios.post(
//     API_URL,
//     {
//       type,
//       name,
//       description,
//       neighborhood,
//       dateOfDisappearance,
//       imageUrl,
//     },
//     authHeader
//   );
// };

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
const updateAnimal = (
  id,
  type,
  name,
  description,
  neighborhood,
  dateOfDisappearance,
  imageUrl
) => {
  return axios.put(
    API_URL + id,
    {
      type,
      name,
      description,
      neighborhood,
      dateOfDisappearance,
      imageUrl,
    },
    getAuthHeader()
  );
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
