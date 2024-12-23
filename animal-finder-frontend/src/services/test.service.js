import axios from "axios";

const API_URL = "https://localhost:7221/api/Tests";

const getTests = () => {
  return axios.get(API_URL);
};

export default {
  getTests,
};
