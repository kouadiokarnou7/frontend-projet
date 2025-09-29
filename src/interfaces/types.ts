import type { ChangeEvent, FormEvent } from "react";

export interface ConnexionData {
    username: string;
    email: string;
    password: string;
}

export interface UseConnexionReturn {
    formData: ConnexionData;
    message: string;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

