export interface LoginResponse {
    AccessToken: string;
    Expires: number;
    RefreshToken: string;
}
export interface RegisterResponse {
    code: number;
    message: string;
}

export interface RegisterUnconfirmedInterface {
    username: string;
    confirmed: boolean;
}

export interface ForgotPasswordResponse {}

export interface ChangePasswordResponse {}
