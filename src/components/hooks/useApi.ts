import { useState, useEffect } from 'react';
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  },
  timeout: 30000
});

const useApi = (axiosParams: AxiosRequestConfig) => {
  const [response, setResponse] = useState<AxiosResponse>();
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState(false);

  const fetchData = async (params: AxiosRequestConfig) => {
    try {
      setLoading(true);
      const result = await axiosClient.request(params);
      setResponse(result);
    } catch( err ) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const sendData = () => {
    if (axiosParams.url == '/jobs') {
      console.log('send Data');
      console.log(axiosParams.data);
    }
    fetchData(axiosParams);
  }

  const sendFormData = (params) => {
    console.log('send form Data');
    console.log(params.data);
    fetchData(params);
  }

  useEffect(() => {
    if(axiosParams.method === "GET" || axiosParams.method === "get"){
      fetchData(axiosParams);
    }
  },[]);

  return { response, error, loading, sendData, sendFormData };
}

export default useApi;
