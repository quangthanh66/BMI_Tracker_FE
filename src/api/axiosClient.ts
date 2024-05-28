import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://35.247.135.183:8080',
  timeout: 10000,
  headers: {
    'content-type': 'application/json',
  },
});
axiosClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(accessToken);

  if (config.headers) {
    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';
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
  },
);
export default axiosClient;
function jwt_decode(accessToken: string): any {
  throw new Error('Function not implemented.');
}
