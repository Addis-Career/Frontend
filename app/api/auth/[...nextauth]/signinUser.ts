import axios from "axios";

async function signinUser(email: string, password: string) {
  try {
    const response = await axios.post(
      "https://backend-8-x4or.onrender.com/api/accounts/login/",
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export default signinUser;
