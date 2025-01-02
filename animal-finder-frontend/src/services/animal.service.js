import axios from "axios";

const API_URL = "https://localhost:7221/api/Animals";

const getAnimals = () => {
  return axios.get(API_URL);
};

export default {
  getAnimals,
};
