import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import type { ConnexionData, UseConnexionReturn } from "../interfaces/types";

// Shape of the successful login response from the API
type LoginResponse = {
  message: string;
};

// Shape of an error response body from the API


export default function useConnexion(): UseConnexionReturn {
  const [formData, setFormData] = useState<ConnexionData>({
    username: "",
    email: "",
    password: "",
    telephone: "",
    role: "user", // Valeur par défaut
  });

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post<LoginResponse>(
        "http://localhost:5000/api/login",
        formData
      );
      setMessage(res.data.message);
    } catch (err: unknown) {
        if (err && typeof err === 'object' && 'config' in err && 'request' in err) {
          const axiosError = err as any;
          setMessage(axiosError.response?.data?.error ?? "Erreur serveur");
        } else {
          setMessage("Erreur inattendue");
        }
      }
  };

  return { formData, message, handleChange, handleSubmit };
}