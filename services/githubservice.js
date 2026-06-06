import axios from "axios";

const BASE_URL = "https://api.github.com";


export const getUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw new Error("GitHub user not found");
  }
};


export const getUserRepos = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}/repos?per_page=100`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching repos");
  }
};