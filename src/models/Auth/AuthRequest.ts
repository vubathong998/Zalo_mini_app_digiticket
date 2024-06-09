export interface LoginRequest {
    Username: string;
    Password: string;
}

export interface ForgotPasswordRequest {
    Username: string;
}

export interface RegisterRequest {
    Username: string;
    Password: string;
    PasswordConfirm: string;
}
export interface ChangePasswordRequest {
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
}
