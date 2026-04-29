import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const contactsServices = {
    getContacts: async () => {
        const response = await axios.get(`${API_URL}/contacts`);
        return response.data;
    }
    
};