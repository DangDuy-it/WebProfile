import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const api= axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const profileServices = {
    getAboutData: async ()=>{
        try {
            const response = await axios.get(`${API_URL}/about`);
            return response.data;
        } catch (error) {
            console.error('Error fetching about data:', error);
            throw error;
        }
    },
    updateAbout: async (Id, data)=>{
        try{
            const response = await api.patch(`${API_URL}/about/${Id}`, data );
            return response.data;
                
        } catch (error) {
            console.error('Error updating about data:', error);
            throw error;
        }
    },
    createAboutHighlight: async (data)=>{
        try{
            const response = await api.put(`${API_URL}/about-highlight`, data);
            return response.data;
        }catch (error) {
            console.error('Error creating about highlight:', error);
            throw error;
        }
    },
    updateAboutHighlight: async (Id, data)=>{
        try{
            const response = await api.patch(`${API_URL}/about-highlight/${Id}`, data);
            return response.data;
        }catch (error) {
            console.error('Error updating about highlight:', error);
            throw error;
        }
    },
    deleteAboutHighlight: async (Id)=>{
        try{
            const response = await api.delete(`${API_URL}/about-highlight/${Id}`);
            return response.data;
        }catch (error) {
            console.error('Error deleting about highlight:', error);
            throw error;
        }
    },
    createSkill: async (data)=>{
        try{
            const response= await api.put(`${API_URL}/skill`, data);
            return response.data;
        }catch (error) {
            console.error('Error creating skill:', error);
            throw error;
        }
    },
    updateSkill: async (Id, data)=>{
        try{
            const response= await api.patch(`${API_URL}/skill/${Id}`, data);
            return response.data;
        }catch (error) {
            console.error('Error updating skill:', error);
            throw error;
        }
    },
    deleteSkill: async (Id)=>{
        try{
            const response= await api.delete(`${API_URL}/skill/${Id}`);
            return response.data;
        }catch (error) {
            console.error('Error deleting skill:', error);
            throw error;
        }
    }

}
