import React, { useEffect, useMemo, useState } from 'react';
import { useEglise } from '../../hooks/eglise/eglise';
import { useAddEglise } from '../../hooks/eglise/addEglise';
import AddEgliseModal from '../../composants/eglise/Addeglisemodal';
import type { Eglise } from '../../interfaces/eglise';
import Recherche from '../../composants/eglise/recherche';

const Eglises: React.FC = () => {
  // Hook pour la gestion des églises
  const {
    eglise,
    message,
    setMessage,
    deleteEglise,
    // updateEglise,
  } = useEglise();

  // État local pour filtrage (recherche)
  const [filtered, setFiltered] = useState<any[]>([]);

  useEffect(() => {
    setFiltered(eglise as any[]);
  }, [eglise]);

  const suggestions = useMemo(
    () =>
      (eglise as any[]).map((e) => e.nomEglise || e.NomEglise).filter(Boolean),
    [eglise]
  );

  const handleSearch = (text: string) => {
    const q = (text || '').toLowerCase().trim();
    if (!q) {
      setFiltered(eglise as any[]);
      return;
    }
    setFiltered(
      (eglise as any[]).filter((e) =>
        [
          e.reference,
          e.nomEglise ?? e.NomEglise,
          e.nomCommunaute ?? e.NomCommunaute,
          e.localite ?? e.Localite,
          e.adresse ?? e.Adresse,
        ]
          .filter(Boolean)
          .some((v: string) => String(v).toLowerCase().includes(q))
      )
    );
  };

  // Hook pour l'ajout d'église
  const {
    isModalOpen,
    eglise: egliseData,
    setIsModalOpen,
    handleInputChange,
    handleSubmit,
    resetEgliseData,
  } = useAddEglise();

  // Gestionnaires pour le modal
  const handleModalSuccess = (newEglise: Eglise) => {
    setMessage('Église ajoutée avec succès');
    setIsModalOpen(false);
    // Optionnel: refetch côté hook ou push dans filtered local
    // setFiltered((prev) => [newEglise as any, ...prev]);
    console.log('Église ajoutée:', newEglise);
  };

  const handleModalError = (errorMessage: string) => {
    setMessage(errorMessage);
  };

  // Gestionnaire pour la suppression
  const handleDelete = async (idOrRef: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette église ?')) {
      try {
        await deleteEglise(idOrRef);
        setMessage('Église supprimée avec succès');
      } catch {
        setMessage("Erreur lors de la suppression de l'église");
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-200">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Églises</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Ajouter une Église
        </button>
      </div>

      {message && (
        <div
          className={`p-4 rounded-lg mb-6 font-medium ${
            message.includes('succès')
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {message}
          <button
            onClick={() => setMessage('')}
            className="ml-4 text-sm underline hover:no-underline"
          >
            Fermer
          </button>
        </div>
      )}

      <div className="mb-8">
        <Recherche onSearch={handleSearch} suggestions={suggestions} />
      </div>

      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Aucune église trouvée</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item: any) => {
              const nomEglise = item.nomeglise ?? item.NomEglise ?? 'Nom non défini';
              const nomCommunaute = item.nomcommunaute ?? item.NomCommunaute ?? 'Non définie';
              const localite = item.localite ?? item.Localite ?? 'Non définie';
              const adresse = item.adresse ?? item.Adresse ?? 'Non définie';
              const reference = item.reference ?? item.identifiant ?? undefined;
              

              return (
                <div
                  key={reference ?? item.id ?? `${nomEglise}-${localite}`}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={nomEglise}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl text-gray-400">🏛️</div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{nomEglise}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold text-gray-700">Référence:</span>{' '}
                        {reference ?? 'Non définie'}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">Communauté:</span>{' '}
                        {nomCommunaute}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">Localité:</span>{' '}
                        {localite}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">Adresse:</span>{' '}
                        {adresse}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
                    <button
                      onClick={() =>
                        handleDelete(
                          (item.id && String(item.id)) || (reference && String(reference)) || ''
                        )
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                      disabled={!item.id && !reference}
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Implémenter l'édition
                        console.log('Éditer église:', item.id || reference);
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal d'ajout d'église */}
      <AddEgliseModal
        isOpen={isModalOpen}
        eglise={egliseData}
        setIsModalOpen={setIsModalOpen}
        handleInputChange={handleInputChange}
        handleSubmit={(e) => handleSubmit(e, handleModalSuccess, handleModalError)}
        resetEgliseData={resetEgliseData}
      />
    </div>
  );
};

export default Eglises