import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const profileServices = {
    getAboutData: async ()=>{
        try {
            const response = await axios.get(`${API_URL}/about`);
            return response.data;
        } catch (error) {
            console.error('Error fetching about data:', error);
            throw error;
        }
    }
}