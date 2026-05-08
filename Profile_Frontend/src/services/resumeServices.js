import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const api= axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const resumeServices = {
        getResumeData: async ()=>{
            try{
                const response = await axios.get(`${API_URL}/resumes`);
                return response.data;
            } catch (error) {
                console.error('Error fetching resume data:', error);
                throw error;
            }
        },
        createResumeData: async (data)=>{
            try{
                const response = await api.put('/resume', data);
                return response.data;
            }catch (error) {
                console.error('Error creating resume data:', error);
                throw error;
            }
        },
        updateResumeData: async (Id, data) => {
            try{
                const response = await api.patch(`/resume/${Id}`, data);
                return response.data;
            } catch (error) {
                console.error('Error updating resume data:', error);
                throw error;
            }
        },
        deleteResumeData: async (Id) => {
            try{
                const response = await api.delete(`/resume/${Id}`);
                return response.data;
            } catch (error) {
                console.error('Error deleting resume data:', error);
                throw error;
            }
        },
}
