import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const api= axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

export const portfolioServices = {
    getPortfolioData: async ()=>{
        try{
            const response = await axios.get(`${API_URL}/portfolios`);
            return response.data;
        }catch (error) {
            console.error('Error fetching portfolio data:', error);
            throw error;
        }
    },
    createProject: async (projectData) => {
        try{
            const response = await api.put('/portfolios', projectData);
            return response.data;
        }catch (error) {
            console.error('Error creating project:', error);
            throw error;
        }
    },
    updateProject: async (Id, projectData) => {
        try{
            const response = await api.patch(`/portfolios/${Id}`, projectData);
            return response.data;
        }catch (error) {
            console.error('Error updating project:', error);
            throw error;
        }
    },
    deleteProject: async (Id) => {
        try{
            const response = await api.delete(`/portfolios/${Id}`);
            return response.data;
        }catch (error) {
            console.error('Error deleting project:', error);
            throw error;
        }
    }

}