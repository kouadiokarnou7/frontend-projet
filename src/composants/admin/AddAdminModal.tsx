import React from 'react';
import type { AdminData, SecuritySettings } from '../../interfaces/parametres';

interface AddAdminModalProps {
    isOpen: boolean;
    adminData: AdminData;
    securitySettings: SecuritySettings;
    onClose: () => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent, securitySettings: SecuritySettings, onSuccess: (admin: AdminData) => void, onError: (message: string) => void) => Promise<void>;
    onSuccess: (admin: AdminData) => void;
    onError: (message: string) => void;
}


const AddAdminModal: React.FC<AddAdminModalProps> = ({
    isOpen,
    adminData,
    securitySettings,
    onClose,
    onInputChange,
    onSubmit,
    onSuccess,
    onError
}) => {
    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        onSubmit(e, securitySettings, onSuccess, onError);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h3>Ajouter un Administrateur</h3>
                    <button 
                        onClick={onClose}
                        className="modal-close"
                        type="button"
                    >
                        ×
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label>Nom d'utilisateur *</label>
                        <input
                            type="text"
                            name="username"
                            value={adminData.username}
                            onChange={onInputChange}
                            required
                            minLength={3}
                            placeholder="Entrez le nom d'utilisateur"
                        />
                        <small className="form-hint">Minimum 3 caractères</small>
                    </div>
                    
                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={adminData.email}
                            onChange={onInputChange}
                            required
                            placeholder="exemple@email.com"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Mot de passe *</label>
                        <input
                            type="password"
                            name="password"
                            value={adminData.password}
                            onChange={onInputChange}
                            required
                            minLength={securitySettings.passwordMinLength}
                            placeholder="Entrez le mot de passe"
                        />
                        <small className="form-hint">
                            Minimum {securitySettings.passwordMinLength} caractères
                            {securitySettings.requireSpecialChars && ', avec caractères spéciaux'}
                        </small>
                    </div>
                    
                    <div className="form-group">
                        <label>Confirmer le mot de passe *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={adminData.confirmPassword}
                            onChange={onInputChange}
                            required
                            placeholder="Confirmez le mot de passe"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Rôle</label>
                        <select
                            name="role"
                            value={adminData.role}
                            onChange={onInputChange}
                        >
                            <option value="admin">Administrateur</option>
                            <option value="super_admin">Super Administrateur</option>
                        </select>
                    </div>
                    
                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={adminData.isActive}
                                onChange={onInputChange}
                            />
                            Compte actif
                        </label>
                    </div>
                    
                    <div className="modal-actions">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="btn-secondary"
                        >
                            Annuler
                        </button>
                        <button type="submit" className="btn-primary">
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>

            
        </div>
    );
};

export default AddAdminModal;