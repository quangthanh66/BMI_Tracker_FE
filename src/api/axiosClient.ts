import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 3000,
  headers: {
    'content-type': 'application/json',
  },
});
axiosClient.interceptors.request.use(async (config) => {
  // let accessToken = localStorage.getItem('accessToken');
  // const refreshToken = localStorage.getItem('refreshToken');

  // if (accessToken) {
  //   const decodedToken: any = jwt_decode(accessToken);
  //   if (decodedToken.exp * 1000 < new Date().getTime()) {
  //     accessToken = refreshToken;
  //     localStorage.setItem('accessToken', accessToken as string);
  //   }

  //   config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
  // }

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
  },
);
export default axiosClient;
