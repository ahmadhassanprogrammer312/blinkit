import { appAxios } from "./apiInterceptors";


export const createOrder = async(items: any, totalPrice:number) =>  {
    
    try {
        const response = await appAxios.post(`/order`, {
            items: items,
            branch: "66f072201a7f7e3d0c461b19",
            totalPrice: totalPrice

        })
        console.log("API Response:", response.data);
        return response.data;
        
        // return response.data;
    } catch (error) {
        console.error("Create Order Error:", error.response?.data || error.message);
        return null;
    }
}