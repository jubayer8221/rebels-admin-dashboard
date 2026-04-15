import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
    id: number;
    name: string;
    email: string;
    role: string;
    avatarUrl?: string;
    token: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

interface AuthState {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://localhost:7001/api';

const saveToStorage = (user: AuthUser) => {
    localStorage.setItem('rebels_user', JSON.stringify(user));
};

const loadFromStorage = (): AuthUser | null => {
    try {
        const raw = localStorage.getItem('rebels_user');
        return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
        return null;
    }
};

const clearStorage = () => {
    localStorage.removeItem('rebels_user');
};

// ─── Async Thunks ─────────────────────────────────────────────────────────────

// export const login = createAsyncThunk<AuthUser, LoginCredentials, { rejectValue: string }>(
//     'auth/login',
//     async (credentials, { rejectWithValue }) => {
//         try {
//             const res = await fetch(`${BASE_URL}/auth/login`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(credentials),
//             });

//             if (!res.ok) {
//                 const err = await res.json().catch(() => ({}));
//                 return rejectWithValue(err?.message ?? 'Invalid email or password');
//             }

//             const user: AuthUser = await res.json();
//             saveToStorage(user);
//             return user;
//         } catch {
//             return rejectWithValue('Network error. Please try again.');
//         }
//     }
// );

// ─── Async Thunks ─────────────────────────────────────────────────────────────

export const login = createAsyncThunk<AuthUser, LoginCredentials, { rejectValue: string }>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            // --- MOCK API BEHAVIOR (Temporary) ---
            // Simulate a short network delay
            await new Promise((resolve) => setTimeout(resolve, 800));

            // Create a fake user object
            const mockUser: AuthUser = {
                id: 1,
                name: 'Admin User',
                email: credentials.email,
                role: 'Admin',
                token: 'mock-jwt-token-123',
            };

            saveToStorage(mockUser);
            return mockUser;
            // -------------------------------------
            
            /* Comment out the real fetch for now:
            const res = await fetch(`${BASE_URL}/auth/login`, { ... });
            ... 
            */
        } catch {
            return rejectWithValue('Network error. Please try again.');
        }
    }
);

export const register = createAsyncThunk<AuthUser, RegisterCredentials, { rejectValue: string }>(
    'auth/register',
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                return rejectWithValue(err?.message ?? 'Registration failed');
            }

            const user: AuthUser = await res.json();
            saveToStorage(user);
            return user;
        } catch {
            return rejectWithValue('Network error. Please try again.');
        }
    }
);

export const updateProfile = createAsyncThunk<
    AuthUser,
    FormData,
    { rejectValue: string; state: { auth: AuthState } }
>(
    'auth/updateProfile',
    async (formData, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.user?.token;

            const res = await fetch(`${BASE_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    // Do NOT set Content-Type — browser sets it with boundary for FormData
                },
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                return rejectWithValue(err?.message ?? 'Profile update failed');
            }

            const updated: AuthUser = await res.json();
            saveToStorage(updated);
            return updated;
        } catch {
            return rejectWithValue('Network error. Please try again.');
        }
    }
);

export const fetchCurrentUser = createAsyncThunk<
    AuthUser,
    void,
    { rejectValue: string; state: { auth: AuthState } }
>(
    'auth/fetchCurrentUser',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.user?.token;

            const res = await fetch(`${BASE_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) return rejectWithValue('Session expired. Please log in again.');

            return (await res.json()) as AuthUser;
        } catch {
            return rejectWithValue('Network error. Please try again.');
        }
    }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        user: loadFromStorage(),          // Rehydrate from localStorage on app load
        loading: false,
        error: null,
        isAuthenticated: !!loadFromStorage(),
    } as AuthState,

    reducers: {
        // Manual logout — clears state + storage
        logout(state) {
            state.user            = null;
            state.isAuthenticated = false;
            state.error           = null;
            clearStorage();
        },

        // Clear any error message (e.g. when closing an error toast)
        clearError(state) {
            state.error = null;
        },

        // Patch user fields without a full API round-trip
        // e.g. after uploading avatar: dispatch(patchUser({ avatarUrl: newUrl }))
        patchUser(state, action: PayloadAction<Partial<AuthUser>>) {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                saveToStorage(state.user);
            }
        },
    },

    extraReducers: (builder) => {

        // ── Login ────────────────────────────────────────────────────────────
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading         = false;
                state.user            = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.payload ?? 'Login failed';
            });

        // ── Register ─────────────────────────────────────────────────────────
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading         = false;
                state.user            = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.payload ?? 'Registration failed';
            });

        // ── Update Profile ────────────────────────────────────────────────────
        builder
            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user    = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error   = action.payload ?? 'Update failed';
            });

        // ── Fetch Current User ────────────────────────────────────────────────
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
                state.error   = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading         = false;
                state.user            = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.loading         = false;
                state.error           = action.payload ?? 'Session expired';
                state.user            = null;
                state.isAuthenticated = false;
                clearStorage();
            });
    },
});

export const { logout, clearError, patchUser } = authSlice.actions;
export default authSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────
// Use these in components instead of accessing state.auth directly

export const selectUser            = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading     = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError       = (state: { auth: AuthState }) => state.auth.error;
export const selectUserToken       = (state: { auth: AuthState }) => state.auth.user?.token ?? null;