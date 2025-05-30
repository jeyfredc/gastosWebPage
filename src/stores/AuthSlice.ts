
import type { StateCreator } from "zustand";
import { UserCredentials } from "../types/user";


export type AuthSliceType = {

    isAuthenticated: boolean;
    user: UserCredentials | null;
    login: (userCredentials:UserCredentials) => void;
    logout?: () => void;

}

console.log(localStorage.getItem("user"));

export const createAuthSlice: StateCreator<AuthSliceType> = (set, get) => ({
   isAuthenticated: false,
   user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "") : null,
   login: (userCredentials: UserCredentials) => {
        localStorage.setItem("user", JSON.stringify(userCredentials));
       set({ isAuthenticated: true , user: userCredentials });
   },
   logout: () => {
         localStorage.removeItem("user");
         set({ isAuthenticated: false, user: null });
    }

})