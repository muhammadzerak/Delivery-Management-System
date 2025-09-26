import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: string;
    username: string;
    role: "admin" | "partner";
    available: boolean;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        registerRequest: (state, _action: PayloadAction<{ username: string; password: string }>) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action: PayloadAction<{ token: string; user: User, role: String }>) => {
            state.loading = false;
        },
        registerFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        loginRequest: (state, _action: PayloadAction<{ username: string; password: string }>) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
        loadUser: (state) => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");
            if (storedUser && storedToken) {
                state.user = JSON.parse(storedUser);
                state.token = storedToken;
            }
        },
    },
});

export const { loginRequest, loginSuccess, loginFailure, logout, loadUser, registerRequest, registerSuccess, registerFailure } = authSlice.actions;
export default authSlice.reducer;
