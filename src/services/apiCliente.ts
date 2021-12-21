import axios, { AxiosInstance } from 'axios';


const apiClient = () => {

  const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    },
    timeout: 30000
  });

  return axiosInstance;
}
export default apiClient;