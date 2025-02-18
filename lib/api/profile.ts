import axios from "axios";

const createProfile = async (formData: FormData, token: string) => {
  const baseURL = "https://backend-8-x4or.onrender.com/api/accounts/profile/";
  const res = await axios.post(baseURL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
const updateProfile = async (formData: FormData, token: string) => {
  const baseURL = "https://backend-8-x4or.onrender.com/api/accounts/profile/";
  const res = await axios.put(baseURL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
const getProfile = async (token: string) => {
  const baseURL = "https://backend-8-x4or.onrender.com/api/accounts/profile/";
  const res = await axios.get(baseURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export { createProfile, getProfile, updateProfile };
