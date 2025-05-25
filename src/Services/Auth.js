import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; 

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw "Server error";
  }
};

export const registerUser = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw "Server error";
  }
};

