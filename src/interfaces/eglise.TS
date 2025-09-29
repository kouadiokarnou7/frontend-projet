import React from 'react';

export interface Eglise {
  reference?: string;
  nomEglise?: string;
  nomCommunaute?: string;
  localite?: string;  // Ville ou village
  adresse?: string;   // Quartier
  image?: string;
  id?: number;
}

export interface UseEgliseReturn {
  isModalOpen: boolean;
  eglise: Eglise;
  file: File | null

  // actions
  setIsModalOpen: (isOpen: boolean) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: React.FormEvent,
    onSuccess: (eglise: Eglise) => void,
    onError: (message: string) => void
  ) => Promise<void>;
   handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  resetEgliseData: () => void;
  
}
