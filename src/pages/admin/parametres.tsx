
import './../../App.css';
import { useParametres } from '../../hooks/parametre/parametres';
import { useAddAdmin } from '../../hooks/parametre/addAdmin';
import AddAdminModal from '../../composants/admin/AddAdminModal';
import '../../../src/assets/parametre.css'


const Parametres: React.FC = () => {
    // Utilisation des hooks personnalisés
    const {
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
    } = useParametres();

    const {
        isModalOpen,
        adminData,
        setIsModalOpen,
        handleAdminInputChange,
        handleAddAdmin
    } = useAddAdmin();

    // Gestionnaires pour le modal
    const handleModalSuccess = (newAdmin: any) => {
        addAdmin(newAdmin);
    };

    const handleModalError = (errorMessage: string) => {
        setMessage(errorMessage);
    };
  


    return (
        <div className="parametres-container">
            <div className="parametres-header">
                <h1>Paramètres du Système</h1>
                <button onClick={saveSettings} className="btn-primary">
                    Sauvegarder les Paramètres
                </button>
            </div>

            {message && (
                <div className={`message ${message.includes('succès') ? 'success' : 'error'}`}>
                    {message}
                </div>
            )}

            {/* Navigation par onglets */}
            <div className="tabs-navigation">
                <button 
                    className={`tab ${activeTab === 'general' ? 'active' : ''}`}
                    onClick={() => setActiveTab('general')}
                >
                    Général
                </button>
                <button 
                    className={`tab ${activeTab === 'security' ? 'active' : ''}`}
                    onClick={() => setActiveTab('security')}
                >
                    Sécurité
                </button>
                <button 
                    className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notifications')}
                >
                    Notifications
                </button>
                <button 
                    className={`tab ${activeTab === 'admins' ? 'active' : ''}`}
                    onClick={() => setActiveTab('admins')}
                >
                    Administrateurs
                </button>
            </div>

            {/* Contenu des onglets */}
            <div className="tab-content">
                {/* Onglet Général */}
                {activeTab === 'general' && (
                    <div className="settings-section">
                        <h2>Paramètres Généraux</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Nom du site</label>
                                <input
                                    type="text"
                                    name="siteName"
                                    value={generalSettings.siteName}
                                    onChange={handleGeneralSettingsChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="siteDescription"
                                    value={generalSettings.siteDescription}
                                    onChange={handleGeneralSettingsChange}
                                    rows={3}
                                />
                            </div>
                            <div className="form-group">
                                <label>Email de contact</label>
                                <input
                                    type="email"
                                    name="contactEmail"
                                    value={generalSettings.contactEmail}
                                    onChange={handleGeneralSettingsChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Téléphone</label>
                                <input
                                    type="tel"
                                    name="contactPhone"
                                    value={generalSettings.contactPhone}
                                    onChange={handleGeneralSettingsChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Adresse</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={generalSettings.address}
                                    onChange={handleGeneralSettingsChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Fuseau horaire</label>
                                <select
                                    name="timezone"
                                    value={generalSettings.timezone}
                                    onChange={handleGeneralSettingsChange}
                                >
                                    <option value="Africa/Abidjan">Africa/Abidjan</option>
                                    <option value="Europe/Paris">Europe/Paris</option>
                                    <option value="America/New_York">America/New_York</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Langue</label>
                                <select
                                    name="language"
                                    value={generalSettings.language}
                                    onChange={handleGeneralSettingsChange}
                                >
                                    <option value="fr">Français</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="maintenanceMode"
                                        checked={generalSettings.maintenanceMode}
                                        onChange={handleGeneralSettingsChange}
                                    />
                                    Mode maintenance
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Onglet Sécurité */}
                {activeTab === 'security' && (
                    <div className="settings-section">
                        <h2>Paramètres de Sécurité</h2>
                        <div className="form-grid">
                            <div className="form-group">
                                <label>Longueur minimale du mot de passe</label>
                                <input
                                    type="number"
                                    name="passwordMinLength"
                                    value={securitySettings.passwordMinLength}
                                    onChange={handleSecuritySettingsChange}
                                    min="4"
                                    max="20"
                                />
                            </div>
                            <div className="form-group">
                                <label>Timeout de session (minutes)</label>
                                <input
                                    type="number"
                                    name="sessionTimeout"
                                    value={securitySettings.sessionTimeout}
                                    onChange={handleSecuritySettingsChange}
                                    min="5"
                                    max="120"
                                />
                            </div>
                            <div className="form-group">
                                <label>Tentatives de connexion max</label>
                                <input
                                    type="number"
                                    name="maxLoginAttempts"
                                    value={securitySettings.maxLoginAttempts}
                                    onChange={handleSecuritySettingsChange}
                                    min="3"
                                    max="10"
                                />
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="requireSpecialChars"
                                        checked={securitySettings.requireSpecialChars}
                                        onChange={handleSecuritySettingsChange}
                                    />
                                    Exiger des caractères spéciaux
                                </label>
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="twoFactorAuth"
                                        checked={securitySettings.twoFactorAuth}
                                        onChange={handleSecuritySettingsChange}
                                    />
                                    Authentification à deux facteurs
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Onglet Notifications */}
                {activeTab === 'notifications' && (
                    <div className="settings-section">
                        <h2>Paramètres de Notification</h2>
                        <div className="form-grid">
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="emailNotifications"
                                        checked={notificationSettings.emailNotifications}
                                        onChange={handleNotificationSettingsChange}
                                    />
                                    Notifications par email
                                </label>
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="smsNotifications"
                                        checked={notificationSettings.smsNotifications}
                                        onChange={handleNotificationSettingsChange}
                                    />
                                    Notifications par SMS
                                </label>
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="pushNotifications"
                                        checked={notificationSettings.pushNotifications}
                                        onChange={handleNotificationSettingsChange}
                                    />
                                    Notifications push
                                </label>
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="weeklyReports"
                                        checked={notificationSettings.weeklyReports}
                                        onChange={handleNotificationSettingsChange}
                                    />
                                    Rapports hebdomadaires
                                </label>
                            </div>
                            <div className="form-group checkbox-group">
                                <label>
                                    <input
                                        type="checkbox"
                                        name="monthlyReports"
                                        checked={notificationSettings.monthlyReports}
                                        onChange={handleNotificationSettingsChange}
                                    />
                                    Rapports mensuels
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Onglet Administrateurs */}
                {activeTab === 'admins' && (
                    <div className="settings-section">
                        <div className="section-header">
                            <h2>Gestion des Administrateurs</h2>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="btn-primary"
                            >
                                Ajouter un Administrateur
                            </button>
                        </div>

                        <div className="admins-list">
                            {admins.length === 0 ? (
                                <p>Aucun administrateur ajouté</p>
                            ) : (
                                <table className="admins-table">
                                    <thead>
                                        <tr>
                                            <th>Nom d'utilisateur</th>
                                            <th>Email</th>
                                            <th>Rôle</th>
                                            <th> Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {admins.map(admin => (
                <tr key={admin.id}>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td>{admin.role}</td>
                  <td>
                    <span className={`status ${admin.status === "actif" ? "active" : "inactive"}`}>
                      {admin.status === "actif" ? "Actif" : "Inactif"}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => admin.id && toggleAdminStatus(admin.id)}
                      className="btn-secondary"
                    >
                      {admin.status === "actif" ? "Désactiver" : "Activer"}
                    </button>
                                <button
                            onClick={() => admin.__backendId && deleteAdmin(admin.__backendId.toString())}
                            className="btn-danger"
                            >
                            Supprimer
                         </button>

                  </td>
                </tr>
              ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal d'ajout d'administrateur */}
            <AddAdminModal
                isOpen={isModalOpen}
                adminData={adminData}
                securitySettings={securitySettings}
                onClose={() => setIsModalOpen(false)}
                onInputChange={handleAdminInputChange}
                onSubmit={handleAddAdmin}
                onSuccess={handleModalSuccess}
                onError={handleModalError}
            />

           
        </div>
    );
};

export default Parametres;