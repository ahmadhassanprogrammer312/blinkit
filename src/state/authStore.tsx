import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { secureStorage } from './storage';


// Define the store type
interface authStore {
    user: Record<string, any> | null,
    setUser: (user: any) => void,
    currentOrder:Record<string, any> | null ,
    setCurrentOrder:(order: any)=>void ,
    logout: ()=>void,
}

// Create the Zustand store with TypeScript types
export const useAuthStore = create<authStore>()(
    persist(
        (set, get)=>({
            user: null,
            currentOrder: null,
            setCurrentOrder: (order) => set({currentOrder: order}),
            setUser: (data)=>set({user: data}),
            logout: ()=>set({user: null, currentOrder: null})
        }),
        {
            name: "auth_storage",
            storage: createJSONStorage(()=>secureStorage)
        }
    )
)