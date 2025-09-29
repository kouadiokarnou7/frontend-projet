
import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Eglise } from "../../interfaces/eglise";

const BASE_URL = 'http://localhost:5000';

// Interface pour le hook de gestion des églises
interface UseEgliseReturn {
  eglise: Eglise[];
  message: string;
  setMessage: (message: string) => void;
  deleteEglise: (id: string) => Promise<void>;
  updateEglise: (id: string, updatedEglise: Eglise) => Promise<void>;
  
  
}

export const useEglise = (): UseEgliseReturn => {
  const [eglise, setEglise] = useState<Eglise[]>([]);
  const [message, setMessage] = useState('');

  // Helper pour afficher un message temporaire
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  // Chargement des églises
  useEffect(() => {
    const fetchEglise = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/harriste/lister/eglise`);
        const list = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data?.data)
          ? res.data.data
          : [];
  
        const normalized = list.map((a: any) => {
          const rawId =
            a.identifier ?? a.id ?? a._id ?? a.egliseId ?? a.userId ?? a.uuid ?? a.pk;
          const stringId = rawId != null ? String(rawId) : "";
          const status = a.status ?? (a.isActive ? "actif" : "inactif");
          const isActive = a.isActive ?? status === "actif";
          return { ...a, id: stringId, status, isActive, __backendId: rawId };
        });
  
        setEglise(normalized as unknown as Eglise[]);
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          // Erreur côté serveur (500, 404, etc.)
          if (err.response) {
            console.error("Erreur API :", {
              status: err.response.status,
              statusText: err.response.statusText,
              data: err.response.data,
            });
            showMessage(
              `Erreur API (${err.response.status}): ${err.response.data?.error ?? err.message}`
            );
          }
          // Pas de réponse (serveur down, CORS, mauvaise URL)
          else if (err.request) {
            console.error("Pas de réponse du serveur :", err.request);
            showMessage("Impossible de joindre le serveur");
          }
          // Erreur dans la config Axios
          else {
            console.error("Erreur Axios config :", err.message);
            showMessage("Erreur interne du client");
          }
        } else {
          // Cas d'une erreur JS classique
          console.error("Erreur inconnue :", err);
          showMessage("Erreur inattendue");
        }
      }
    };
  
    fetchEglise();
  }, []);
  


  // Suppression d'une église
  /*
  const deleteEglise = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette église ?')) return;

    try {
      const egliseObj = eglises.find(e => e.id === id) as any;
      const backendId = egliseObj?.__backendId ?? egliseObj?.id ?? id;

      await axios.delete(`${BASE_URL}/eglise/supprimer/${encodeURIComponent(String(backendId))}`);

      setEglises(prev => prev.filter(eglise => eglise.id !== id));
      showMessage('Église supprimée avec succès');
    } catch (error: any) {
      console.error('Erreur lors de la suppression:', {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data
      });
      const apiMsg = error?.response?.data?.message;
      showMessage(apiMsg ? `Erreur: ${apiMsg}` : "Erreur lors de la suppression de l'église");
    }
  };
  */

  // Mise à jour d'une église
  /*
  const updateEglise = async (id: string, updatedEglise: Eglise) => {
    try {
      const egliseObj = eglises.find(e => e.id === id) as any;
      const backendId = egliseObj?.__backendId ?? egliseObj?.id ?? id;

      const response = await axios.put(`${BASE_URL}/eglise/modifier/${encodeURIComponent(String(backendId))}`, updatedEglise);

      setEglises(prev =>
        prev.map(eglise =>
          eglise.id === id
            ? { ...eglise, ...updatedEglise, __backendId: backendId }
            : eglise
        )
      );
      showMessage('Église mise à jour avec succès');
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour:', {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data
      });
      const apiMsg = error?.response?.data?.message;
      showMessage(apiMsg ? `Erreur: ${apiMsg}` : "Erreur lors de la mise à jour de l'église");
    }
  };

*/

 
  // Fonctions temporaires pour éviter l'erreur TypeScript
  const deleteEglise = async (id: string) => {
    console.log('deleteEglise not implemented yet');
  };

  const updateEglise = async (id: string, updatedEglise: Eglise) => {
    console.log('updateEglise not implemented yet');
  };

 


  return {
    eglise,
    message,
    setMessage,
    deleteEglise,
    updateEglise,
    
    
  };
};