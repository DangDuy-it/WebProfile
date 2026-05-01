import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const portfolioServices = {
    getPortfolioData: async ()=>{
        try{
            const response = await axios.get(`${API_URL}/portfolios`);
            return response.data;
        }catch (error) {
            console.error('Error fetching portfolio data:', error);
            throw error;
        }
    }
}