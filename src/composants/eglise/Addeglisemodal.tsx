import React from "react";
import type { Eglise } from "../../interfaces/eglise";

interface EgliseModalProps {
  isOpen: boolean;
  eglise: Eglise;

  // Actions
  setIsModalOpen: (isOpen: boolean) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (
    e: React.FormEvent,
    onSuccess: (eglise: Eglise) => void,
    onError: (message: string) => void
  ) => Promise<void>;
  resetEgliseData: () => void;
  
}

const EgliseModal: React.FC<EgliseModalProps> = ({
  isOpen,
  eglise,
  setIsModalOpen,
  handleInputChange,
  handleSubmit,
  resetEgliseData,
}) => {
  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        // Utiliser handleInputChange pour mettre à jour l'image
        const syntheticEvent = {
          target: { name: 'image', value: result }
        } as React.ChangeEvent<HTMLInputElement>;
        handleInputChange(syntheticEvent);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-6 text-gray-900">Ajouter une église</h2>
        <form
          onSubmit={(e) =>
            handleSubmit(
              e,
              () => alert("Église enregistrée ✅"),
              (msg) => alert(msg)
            )
          }
          className="space-y-6"
        >
          {/* Première ligne - Référence et Nom de l'église */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Référence
              </label>
              <input
                name="reference"
                placeholder="Référence de l'église"
                value={eglise.reference || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de l'église *
              </label>
              <input
                name="nomEglise"
                placeholder="Nom de l'église"
                value={eglise.nomEglise || ""}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Deuxième ligne - Communauté et Localité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la communauté
              </label>
              <input
                name="nomCommunaute"
                placeholder="Nom de la communauté"
                value={eglise.nomCommunaute || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Localité *
              </label>
              <input
                name="localite"
                placeholder="Ville / Village"
                value={eglise.localite || ""}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Adresse - Pleine largeur */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse
            </label>
            <textarea
              name="adresse"
              placeholder="Adresse complète"
              value={eglise.adresse || ""}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Section Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Image de l'église
            </label>
            
            {/* Onglets pour URL ou Upload */}
            <div className="flex space-x-1 mb-4 bg-gray-100 p-1 rounded-lg">
              <button
                type="button"
                className="flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors bg-white shadow-sm"
                onClick={() => {
                  const syntheticEvent = {
                    target: { name: 'image', value: '' }
                  } as React.ChangeEvent<HTMLInputElement>;
                  handleInputChange(syntheticEvent);
                }}
                   
              >
                URL
              </button>
              <button
                type="button"
                className="flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors"
              >
                Importer
              </button>
            </div>

            {/* Champ URL */}
            <div className="mb-4">
              <input
                name="image"
                type="url"
                placeholder="https://exemple.com/image.jpg"
                value={eglise.image?.startsWith('data:') ? '' : (eglise.image || '')}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Upload de fichier */}
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Aperçu de l'image */}
            {eglise.image && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aperçu
                </label>
                <div className="w-full h-48 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={eglise.image}
                    alt="Aperçu"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => {
                resetEgliseData();
                setIsModalOpen(false);
              }}
              className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EgliseModal;
