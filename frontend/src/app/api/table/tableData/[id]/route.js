import axios from "axios";
import Cookies from "js-cookie";

export const revalidate = true;

export default async function getData(path) {
  const token = Cookies.get("token");
  const response = await axios.get(
    `http://localhost:8080/api/user/getDatabase/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
  // res.status(200).json(data);
}
