import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api= axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const contactsServices = {
    // Public API user
    getContacts: async () => {
        try{
            const response = await axios.get(`${API_URL}/contacts`);
            return response.data;
        } catch (error) {
            console.error('Error fetching contacts:', error);
            throw error;
        }
    },
    // Admin API
    updateProfileInfo: async (Id, data) => {
        try{
            const response = await api.patch(`/profile-info/${Id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating profile information:', error);
            throw error;
        }
    },

    updateMapConfig: async (Id, data) => {
        try{
            const response = await api.patch(`/profile-map/${Id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating map config:', error);
            throw error;
        }
    },

    createContact: async (data)=>{
        try{
            const response = await api.put('/contact', data);
            return response.data;
        }catch (error) {
            console.error('Error creating contact:', error);
            throw error;
        }
    },

    deleteContact:async (Id)=>{
        try{
            const response = await api.delete(`/contact/${Id}`);
            return response.data;
        }catch (error) {
            console.error('Error deleting contact:', error);
            throw error;
        }
    },

    updateContact: async (Id, data) => {
        try{
            const response = await api.patch(`/contact/${Id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating contact:', error);
            throw error;
        }
    },
    
};
