import axios from "axios";
import { BASE_URL } from "./config";
import { tokenStorage } from "../state/storage";
import { useAuthStore } from "../state/authStore";
import { resetAndNavigate } from "../utils/NavigationUtils";
import { appAxios } from "./apiInterceptors";

//  Delivery Login --------------------------------------
export const deliveryLogin = async(email: string, password: string) =>  {
    
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`, {email, password})
        const { accessToken, refreshToken, deliveryPartner } =  response.data;
        tokenStorage.setItem("accessToken", accessToken);
        tokenStorage.setItem("refreshToken", refreshToken);
        const { setUser } = useAuthStore.getState();
        setUser(response.data.deliveryPartner);
        // return response.data;
    } catch (error) {
        console.log("Login Error", error);
    }
}

// Customer Login ----------------------------
export const customerLogin = async(phone: string) =>  {
    
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`, {phone})
        const { accessToken, refreshToken, customer } =  response.data;
        tokenStorage.setItem("accessToken", accessToken);
        tokenStorage.setItem("refreshToken", refreshToken);
        
        const { setUser } = useAuthStore.getState();
        setUser(response.data.customer);
        // return response.data;
    } catch (error) {
        console.log("Login Error", error);
    }
}

export const refetchUser = async(setUser: any) =>  {
    
    try {
        const response = await appAxios.get(`/user`)
        setUser(response.data.user);
        // return response.data;
    } catch (error) {
        console.log("Login Error", error);
    }
}
export const refresh_tokens = async() =>  {
    
    try {
        const refreshToken = tokenStorage.getItem("refreshToken");
        const response = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken})

        const new_access_token = response.data.accessToken;
        const new_refresh_token = response.data.refreshToken;

        tokenStorage.setItem("accessToken", new_access_token);
        tokenStorage.setItem("refreshToken", new_refresh_token);
        return new_access_token;   
    } catch (error) {
        console.log("REFRESH TOKEN ERROR", error);
        tokenStorage.clearAll();
        resetAndNavigate("CustomerLogin");
    }
}