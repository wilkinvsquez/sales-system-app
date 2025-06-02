import api from "../api/api";

export default {
    getAllDiscounts: async () => {
        const response = await api.get('/discounts');
        return response.data;
    },
    getDiscountById: async (id: string) => { },
    createDiscount: async (discountData: any) => {
        try {
            const response = await api.post('/discounts', discountData);
            console.log('Discount created successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating discount:', error);
            throw error;
        }
    },
    deleteDiscount: async (id: any) => {
        try {
            const response = await api.put(`/discounts/${id}/deactivate`);
            console.log('Discount deleted successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting discount:', error);
            throw error;
        }
    },
    activateDiscount: async (id: any) => {
        try {
            const response = await api.put(`/discounts/${id}/activate`);
            console.log('Discount activated successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error activating discount:', error);
            throw error;
        }
    },
}