import * as SecureStore from "expo-secure-store";


export const tokenStorage = {
    setItem: async(key, value) => {
        await SecureStore.setItemAsync(key, value);
        console.log("Token Saved");
    },
    getItem: async(key) => {
        const value = await SecureStore.getItemAsync(key);
        console.log(`Token Retrieved: ${value}`);
        return value;
    },
    removeItem: async(key) => {
        await SecureStore.deleteItemAsync(key);
        console.log("Token Deleted");
    }
}
export const secureStorage = {
    setItem: async(key, value) => {
        await SecureStore.setItemAsync(key, value);
        console.log("Saved");
    },
    getItem: async(key) => {
        const value = await SecureStore.getItemAsync(key);
        console.log("Retrieved", value);
        return value ?? null;
    },
    removeItem: async(key) => {
        await SecureStore.deleteItemAsync(key);
        console.log("Deleted")
    }
}