import api from '../api/api';

export default {

    /**
     * Fetches all products from the API.
     * @return {Promise<Array>} A promise that resolves to an array of products.
     */
    getProducts: async () => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    /**
     * Searches for products based on a query string.
     * @param {string} query - The search term to filter products.
     * @return {Promise<Array>} A promise that resolves to an array of products matching the search term.
     */
    searchProducts: async (query: string) => {
        try {
            const response = await api.get(`/products?term=${encodeURIComponent(query)}`);
            return response.data;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    },

    /**
     * Creates a new product with the provided data.
     * @param {Object} productData - The data for the new product.
     * @return {Promise<Object>} A promise that resolves to the created product.
     */
    createProduct: async (productData: any) => {
        try {
            const response = await api.post('/products', productData);
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    /**
     * Fetches a product by its ID.
     * @param {string} id - The ID of the product to fetch.
     * @return {Promise<Object>} A promise that resolves to the product data.
     */
    getProductById: async (id: string) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    },

    /**
     * Updates an existing product with the provided data.
     * @param {string} id - The ID of the product to update.
     * @param {Object} productData - The updated data for the product.
     * @return {Promise<Object>} A promise that resolves to the updated product.
     */
    updateProduct: async (id: string, productData: any) => {
        try {
            const response = await api.put(`/products/${id}`, productData);
            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    /**
     * Deletes a product by its ID.
     * @param {string} id - The ID of the product to delete.
     * @return {Promise<Object>} A promise that resolves to the response from the API.
     */
    deleteProduct: async (id: string) => {
        try {
            const response = await api.delete(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
}