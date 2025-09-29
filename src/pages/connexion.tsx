// cspell:ignore Connexion
import useConnexion from "../hooks/connexion";

export default function Connexion() {
  const { formData, message, handleChange, handleSubmit } = useConnexion();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section avec Image */}
        <div className="text-center mb-2">
          <img 
            src="/logo.png" 
            alt="Logo Église Harriste" 
            className="w-32 h-32 mx-auto mb-6  object-cover shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Église Harriste
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Espace de connexion sécurisé
          </p>
        </div>

        {/* Main Content Container */}
        <div className="flex justify-center">
          <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl">
            <form
              onSubmit={handleSubmit}
              className="bg-white py-12 px-8 md:px-12 lg:px-16 shadow-xl rounded-2xl border"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Connexion
                </h2>
              </div>

              {/* Message d'erreur/succès */}
              {message && (
                <div 
                  className={`mb-8 p-4 rounded-lg text-base text-center border ${
                    message.toLowerCase().includes('succès') || message.toLowerCase().includes('réussi') 
                      ? 'bg-green-50 text-green-800 border-green-200' 
                      : 'bg-red-50 text-red-800 border-red-200'
                  }`}
                >
                  {message}
                </div>
              )}

              <div className="space-y-6 md:space-y-8">
                {/* Nom d'utilisateur ou Email */}
                <div>
                  <label htmlFor="username" className="block text-base md:text-lg font-medium text-gray-700 mb-3">
                    Nom d'utilisateur ou Email
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-4 md:px-6 md:py-5 border border-gray-300 rounded-xl text-base md:text-lg focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Entrez votre nom d'utilisateur ou email"
                    required
                  />
                </div>

                {/* Mot de passe */}
                <div>
                  <label htmlFor="password" className="block text-base md:text-lg font-medium text-gray-700 mb-3">
                    Mot de passe
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="mot_de_passe"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-4 md:px-6 md:py-5 border border-gray-300 rounded-xl text-base md:text-lg focus:outline-none focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Entrez votre mot de passe"
                    required
                  />
                </div>
              </div>

              {/* Bouton de connexion */}
              <button
                type="submit"
                className="w-full mt-8 md:mt-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 md:py-5 px-6 rounded-xl text-base md:text-lg transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm md:text-base text-gray-500">
            © 2024 Église Harriste. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}  