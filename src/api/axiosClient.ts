import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://34.142.159.243:433",
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});
axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");

  if (config.headers) {
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : "";
  }

  // Handle token here ...
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
function jwt_decode(accessToken: string): any {
  throw new Error("Function not implemented.");
}
