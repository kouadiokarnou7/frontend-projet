import { useState } from 'react';
import axios from 'axios';
import type { AdminData, SecuritySettings, UseAddAdminReturn } from '../../../interfaces/parametres';

export const useAddAdmin = (): UseAddAdminReturn => {
  // États pour le modal d'ajout d'admin
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    status:'actif',
    isActive: true,
  });

  // Gestion du formulaire d'ajout d'admin
  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Validation et soumission du formulaire d'admin
  const handleAddAdmin = async (
    e: React.FormEvent,
    securitySettings: SecuritySettings,
    onSuccess: (admin: AdminData) => void,
    onError: (message: string) => void
  ) => {
    e.preventDefault();

    // Validation
    if (adminData.password !== adminData.confirmPassword) {
      onError('Les mots de passe ne correspondent pas');
      return;
    }

    if (adminData.password.length < securitySettings.passwordMinLength) {
      onError(`Le mot de passe doit contenir au moins ${securitySettings.passwordMinLength} caractères`);
      return;
    }

    // Validation des caractères spéciaux si requis
    if (securitySettings.requireSpecialChars) {
      const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (!specialCharsRegex.test(adminData.password)) {
        onError('Le mot de passe doit contenir au moins un caractère spécial');
        return;
      }
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(adminData.email)) {
      onError('Veuillez entrer une adresse email valide');
      return;
    }

    // Validation du nom d'utilisateur
    if (adminData.username.length < 3) {
      onError("Le nom d'utilisateur doit contenir au moins 3 caractères");
      return;
    }
  const BASE_URL = 'http://localhost:5000';
  
    try {
      // Préparer le payload sans confirmPassword
      const payload = {
        username: adminData.username,
        email: adminData.email,
        password: adminData.password,
        role: adminData.role,
        status:adminData.status,
        isActive: adminData.isActive,
      };

      // Appel API pour créer l'admin
      // Note: correction du double slash dans l'URL
      const { data } = await axios.post<AdminData>(`${BASE_URL}/admin/parametre/ajouter`, payload);

      // Si le backend renvoie les infos de l'admin créé, les utiliser; sinon fallback sur adminData
      onSuccess(data ?? adminData);
      setIsModalOpen(false);
      resetAdminData();
    } catch (err: unknown) {
      // Tente de remonter un message d'erreur pertinent du backend
      if (axios.isAxiosError(err)) {
        const backendMsg =
          (err.response?.data as { message?: string } | undefined)?.message ||
          err.response?.statusText ||
          err.message;
        onError(backendMsg || "Erreur lors de l'ajout de l'administrateur");
      } else {
        onError("Erreur lors de l'ajout de l'administrateur");
      }
    }
  };

  // Réinitialiser les données du formulaire
  const resetAdminData = () => {
    setAdminData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'admin',
      status:'actif',
      isActive: true,
    });
  };

  return {
    // États
    isModalOpen,
    adminData,

    // Actions
    setIsModalOpen,
    handleAdminInputChange,
    handleAddAdmin,
    resetAdminData,
  };
};