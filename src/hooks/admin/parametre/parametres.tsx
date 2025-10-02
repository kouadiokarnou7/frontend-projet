import { useState, useEffect } from 'react';
import type {
  GeneralSettings,
  SecuritySettings,
  NotificationSettings,
  ActiveTab,
  AdminData,
  UseParametresReturn
} from '../../../interfaces/parametres';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const useParametres = (): UseParametresReturn => {
  // États pour les différents paramètres
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    siteName: 'Église Harriste',
    siteDescription: "Système de gestion de l'église",
    contactEmail: 'contact@eglise-harriste.com',
    contactPhone: '+225 01 40 11 06 51',
    address: "Abidjan, Côte d'Ivoire",
    timezone: 'Africa/Abidjan',
    language: 'fr',
    maintenanceMode: false
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    passwordMinLength: 8,
    requireSpecialChars: true,
    sessionTimeout: 15,
    maxLoginAttempts: 5,
    twoFactorAuth: false
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    weeklyReports: true,
    monthlyReports: true
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('general');
  const [admins, setAdmins] = useState<AdminData[]>([]);
  const [message, setMessage] = useState('');

  // Helper pour afficher un message temporaire
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // -----------------------------
  // Gestion des changements
  // -----------------------------
  const handleGeneralSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSecuritySettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : type === 'number' ? parseInt(value, 10) : value
    }));
  };

  const handleNotificationSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // -----------------------------
  // Chargement des administrateurs
  // -----------------------------
  
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/admin/parametre/lister`);
        const list = Array.isArray(res.data) ? res.data : Array.isArray(res.data?.data) ? res.data.data : [];

        const normalized = list.map((a: any) => {
          const rawId = a.identifier ?? a.id ?? a._id ?? a.adminId ?? a.userId ?? a.uuid ?? a.pk;
          const stringId = rawId != null ? String(rawId) : '';
          const status = a.status ?? (a.isActive ? 'actif' : 'inactif');
          const isActive = a.isActive ?? status === 'actif';
          return { ...a, id: stringId, status, isActive, __backendId: rawId };
        });

        setAdmins(normalized as unknown as AdminData[]);
      } catch (err) {
        console.error(err);
        showMessage('Erreur lors du chargement des administrateurs');
      }
    };

    fetchAdmins();
  }, []);
  

  // -----------------------------
  // Sauvegarde des paramètres
  // -----------------------------
  const saveSettings = async () => {
    try {
      // TODO: Appels API pour sauvegarder generalSettings, securitySettings, notificationSettings
      showMessage('Paramètres sauvegardés avec succès');
    } catch {
      showMessage('Erreur lors de la sauvegarde');
    }
  };

  // -----------------------------
  // Gestion des admins
  // -----------------------------
  const deleteAdmin = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet administrateur ?')) return;

    try {
      const adminObj = admins.find(a => a.id === id) as any;
      const backendId = adminObj?.__backendId ?? adminObj?.id ?? id;

      await axios.delete(`${BASE_URL}/admin/parametre/supprimer/${encodeURIComponent(String(backendId))}`);

      setAdmins(prev => prev.filter(admin => admin.id !== id));
      showMessage('Administrateur supprimé avec succès');
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data
      });
      const apiMsg = error?.response?.data?.message;
      showMessage(apiMsg ? `Erreur: ${apiMsg}` : "Erreur lors de la suppression de l'administrateur");
    }
  };

  const toggleAdminStatus = (adminId: string) => {
    setAdmins(prev =>
      prev.map(admin =>
        admin.id === adminId
          ? ({ ...(admin as any), isActive: !admin.isActive, status: !admin.isActive ? 'actif' : 'inactif' } as AdminData)
          : admin
      )
    );
    showMessage("Statut de l'administrateur modifié");
  };

  const addAdmin = (newAdmin: AdminData) => {
    const adminWithId: any = {
      ...newAdmin,
      id: Date.now().toString(),
      status: (newAdmin as any).status ?? (newAdmin.isActive ? 'actif' : 'inactif'),
      __backendId: (newAdmin as any).__backendId ?? undefined
    };
    setAdmins(prev => [...prev, adminWithId]);
    showMessage('Administrateur ajouté avec succès');
  };

  // -----------------------------
  // Retour des états et actions
  // -----------------------------
  return {
    generalSettings,
    securitySettings,
    notificationSettings,
    activeTab,
    admins,
    message,
    setActiveTab,
    handleGeneralSettingsChange,
    handleSecuritySettingsChange,
    handleNotificationSettingsChange,
    saveSettings,
    deleteAdmin,
    toggleAdminStatus,
    addAdmin,
    setMessage
  };
};
