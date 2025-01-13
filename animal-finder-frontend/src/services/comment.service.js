import axios from "axios";

const API_URL = "https://localhost:7221/api/comments/";

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

// Getting all comments for a specific animal
const getCommentsForAnimal = (animalId) => {
  return axios.get(`${API_URL}animal/${animalId}`, getAuthHeader());
};

// // Getting a specific comment
// const getComment = (commentId) => {
//    return axios.get(`${API_URL}${commentId}`, getAuthHeader());
// };

// Create new comment for a specific animal
const postComment = (animalId, content) => {
  return axios.post(`${API_URL}${animalId}`, { content }, getAuthHeader());
};

// Updating a specific comment
const updateComment = (animalId, commentId, content) => {
  return axios.put(
    `${API_URL}${animalId}/${commentId}`,
    { content },
    getAuthHeader()
  );
};

// Deleting a specific animal
const deleteComment = (animalId, commentId) => {
  return axios.delete(`${API_URL}${animalId}/${commentId}`, getAuthHeader());
};

const commentService = {
  getCommentsForAnimal,
  //getComment,
  postComment,
  updateComment,
  deleteComment,
};

export default commentService;
