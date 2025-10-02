import { useState } from 'react';
import axios from 'axios';
import type { Eglise, UseEgliseReturn } from "../../../interfaces/eglise";

const BASE_URL = 'http://localhost:5000';

export const useAddEglise = (): UseEgliseReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [eglise, setEglise] = useState<Eglise>({
    reference: '',
    nomEglise: '',
    localite: '',
    nomCommunaute: '',
    adresse: '',
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setEglise((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Nouveau : handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
    onSuccess: (eglise: Eglise) => void,
    onError: (message: string) => void
  ) => {
    e.preventDefault();
    try {
      // FormData pour Multer
      const formData = new FormData();
      formData.append('identifiant', eglise.reference!);
      formData.append('NomEglise', eglise.nomEglise!);
      formData.append('NomCommunaute', eglise.nomCommunaute!);
      formData.append('Localite', eglise.localite!);
      formData.append('Adresse', eglise.adresse!);
      if (file) formData.append('image', file);

      const response = await axios.post(`${BASE_URL}/harriste/ajouter/eglise`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onSuccess(response.data);
      resetEgliseData();
    } catch (error: any) {
      onError(error.response?.data?.message || 'Erreur lors de l\'ajout de l\'église');
    }
  };

  const resetEgliseData = () => {
    setEglise({
      reference: '',
      nomEglise: '',
      localite: '',
      nomCommunaute: '',
      adresse: '',
      image: '',
    });
    setFile(null);
  };

  return {
    isModalOpen,
    eglise,
    file,
    setIsModalOpen,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    resetEgliseData
  };
};
