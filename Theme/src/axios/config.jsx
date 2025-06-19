import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 120000,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // console.error('Unauthorized Access!');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;

export const commonRequest = async (method, url, body = {}, customHeaders = {}, responseType = 'json') => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data: body,
            headers: { ...customHeaders },
            responseType,
        });
        return response;
    } catch (error) {
        // console.error("API Error:", error.response?.data || error.message);
        return error.response;
    }
};
