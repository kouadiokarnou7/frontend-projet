

// Interface pour les données d'un administrateur
export type AdminRole = 'admin' | 'super_admin';

export interface AdminData {
    id?: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: AdminRole;
    status: string;
    isActive: boolean;
    __backendId?: number; // id réel en base
  }

// Interface pour les paramètres généraux
export interface GeneralSettings {
    siteName: string;
    siteDescription: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    timezone: string;
    language: string;
    maintenanceMode: boolean;
}

// Interface pour les paramètres de sécurité
export interface SecuritySettings {
    passwordMinLength: number;
    requireSpecialChars: boolean;
    maxLoginAttempts:number;
    twoFactorAuth: boolean;
    sessionTimeout:number;
  }

// Interface pour les paramètres de notification
export interface NotificationSettings {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    weeklyReports: boolean;
    monthlyReports: boolean;
}

// Type pour les onglets actifs
export type ActiveTab = 'general' | 'security' | 'notifications' | 'admins';

// Interface pour le hook de paramètres
export interface UseParametresReturn {
    // États
    generalSettings: GeneralSettings;
    securitySettings: SecuritySettings;
    notificationSettings: NotificationSettings;
    activeTab: ActiveTab;
    admins: AdminData[];
    message: string;
    
    // Actions
    setActiveTab: (tab: ActiveTab) => void;
    handleGeneralSettingsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSecuritySettingsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNotificationSettingsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    saveSettings: () => Promise<void>;
    deleteAdmin: (id: string) => Promise<void>;
    toggleAdminStatus: (adminId: string) => void;
    addAdmin: (newAdmin: AdminData) => void;
    setMessage: (message: string) => void;
}

// Interface pour le hook d'ajout d'admin
export interface UseAddAdminReturn {
    // États (alignés avec le hook useAddAdmin)
    isModalOpen: boolean;
    adminData: AdminData;
    
    // Actions
    setIsModalOpen: (isOpen: boolean) => void;
    handleAdminInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAddAdmin: (e: React.FormEvent, securitySettings: SecuritySettings, onSuccess: (admin: AdminData) => void, onError: (message: string) => void) => Promise<void>;
    resetAdminData: () => void;
}