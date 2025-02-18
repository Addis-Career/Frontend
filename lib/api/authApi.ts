import { RegistrationData } from "@/types/types";
import axios from "axios";

const registerUser = async (data: RegistrationData) => {
  const baseURL = "https://backend-8-x4or.onrender.com/api/accounts/register/";
  const res = await axios.post(baseURL, data);
  return res.data;
};

export default registerUser;
