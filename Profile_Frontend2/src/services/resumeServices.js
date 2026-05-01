import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const resumeServices = {
        getResumeData: async ()=>{
            try{
                const response = await axios.get(`${API_URL}/resumes`);
                return response.data;
            } catch (error) {
                console.error('Error fetching resume data:', error);
                throw error;
            }
        }
}