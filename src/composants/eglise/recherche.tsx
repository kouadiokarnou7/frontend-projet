import { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface RechercheProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  showFilters?: boolean;
  suggestions?: string[];
  className?: string;
}

export default function Recherche({ 
  placeholder = "Rechercher...", 
  onSearch,
  onFilter,
  showFilters = false,
  suggestions = [],
  className = ""
}: RechercheProps) {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Récupération des recherches récentes au chargement
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Gestion de la recherche
  const handleSearch = (searchQuery: string = query) => {
    if (searchQuery.trim()) {
      // Ajouter à l'historique
      const updatedSearches = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
      
      // Exécuter la recherche
      onSearch?.(searchQuery);
      setShowSuggestions(false);
    }
  };

  // Gestion des changements d'input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0);
  };

  // Effacer la recherche
  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    onSearch?.('');
  };

  // Gestion du focus
  const handleFocus = () => {
    setIsActive(true);
    if (query.length > 0 || recentSearches.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    // Délai pour permettre le clic sur les suggestions
    setTimeout(() => {
      setIsActive(false);
      setShowSuggestions(false);
    }, 200);
  };

  // Filtrer les suggestions
  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={`relative w-full max-w-2xl mx-auto ${className}`}>
      {/* Barre de recherche principale */}
      <div className={`relative flex items-center transition-all duration-200 ${
        isActive 
          ? 'ring-2 ring-blue-500 shadow-lg' 
          : 'ring-1 ring-gray-300 hover:ring-gray-400'
      } rounded-lg bg-white`}>
        
        {/* Icône de recherche */}
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>

        {/* Input de recherche */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={placeholder}
          className="w-full pl-10 pr-20 py-3 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 rounded-lg"
        />

        {/* Actions à droite */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {/* Bouton effacer */}
          {query && (
            <button
              onClick={clearSearch}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Effacer la recherche"
            >
              <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}

          {/* Bouton filtres */}
          {showFilters && (
            <button
              onClick={onFilter}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Filtres"
            >
              <AdjustmentsHorizontalIcon className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}

          {/* Bouton de recherche */}
          <button
            onClick={() => handleSearch()}
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
          >
            Rechercher
          </button>
        </div>
      </div>

      {/* Suggestions et recherches récentes */}
      {showSuggestions && (isActive || query.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
          
          {/* Suggestions basées sur la saisie */}
          {filteredSuggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                Suggestions
              </div>
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(suggestion);
                    handleSearch(suggestion);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                >
                  <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-900">{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {/* Recherches récentes */}
          {recentSearches.length > 0 && query.length === 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2">
                Recherches récentes
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(search);
                    handleSearch(search);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                >
                  <ClockIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-900">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Message si aucun résultat */}
          {filteredSuggestions.length === 0 && recentSearches.length === 0 && query.length > 0 && (
            <div className="p-4 text-center text-gray-500">
              Aucune suggestion trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
}