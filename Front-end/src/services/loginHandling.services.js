// Functions/loginHandling.js
import API from "../configs/axios";

export async function loginUser(values) {
  try {
    const response = await API.post("/api/users/logIn", values);
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    console.log("User logged in:", user);
    return user; 
  } catch (error) {
    console.error("Login error:", error);


    const msg =
      error.response?.data?.message ||
      "Invalid username or password. Please try again.";
    throw new Error(msg);
  }
}
