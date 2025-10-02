import type { ChangeEvent, FormEvent } from "react";

export interface ConnexionData {
    username: string;
    email: string;
    password: string;
    telephone?: string;
    role?: string; 
    image?:string;//  par defaut "user"
}

export interface UseConnexionReturn {
    formData: ConnexionData;
    message: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}
export interface UseRegisterReturn {
    formData: ConnexionData;
    message: string;
       handleAdminInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

