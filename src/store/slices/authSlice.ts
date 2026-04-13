// authSlice.ts

export interface AuthState {
    user: {
        name: string;
        email: string;
        role: string;
        avatarUrl?: string;
    } | null;
}