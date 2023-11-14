import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL =  'https://devfortest.my.id/'

const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { username, password})
        const { token } = response.data;
        localStorage.setItem('token', token);
        return jwtDecode(token)
    } catch (error) {
        console.error(`Login failed`, error)
        throw error
    }
}

const logout = () => {
    localStorage.removeItem('token')
    console.log("Logged out")
}

const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
}

export { login, logout, isAuthenticated, jwtDecode }