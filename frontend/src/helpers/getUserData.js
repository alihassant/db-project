import axios from "axios";

export default async function getUserData() {
  try {
    const response = await axios.get("/api/users/user");

    const { user } = response.data;
    return user;
  } catch (err) {
    console.log(err);
  }
}
