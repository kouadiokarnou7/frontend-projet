import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { timelineData, valuesData, imageGallery } from '../interfaces/home';

export default function Home() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleConnect = (): void => {
    navigate('/connexion');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Header */}
        <header className={`text-center mb-12 bg-white p-12 rounded-3xl shadow-xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 rounded-t-3xl"></div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Église Harriste
          </h1>
          <div className="text-xl text-gray-600 mb-6 italic">
            Mouvement Chrétien Africain Authentique
          </div>
          <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8">
            L'Église Harriste, fondée par le prophète William Wade Harris au début du XXᵉ siècle, 
            représente l'un des premiers grands mouvements chrétiens indépendants d'Afrique de l'Ouest. 
            Née en Côte d'Ivoire, notre communauté perpétue un héritage de foi, de guérison spirituelle 
            et d'engagement social profondément enraciné dans la culture africaine.
          </p>
          <button 
            onClick={handleConnect}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-blue-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide"
          >
            Rejoindre la Communauté
          </button>
        </header>

        {/* Image Gallery */}
        <section className="grid md:grid-cols-3 gap-8 mb-12">
          {imageGallery.map((image, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-center italic text-gray-600">
                {image.caption}
              </div>
            </div>
          ))}
        </section>

        {/* Histoire et Origines */}
        <section className={`bg-white mb-8 p-10 rounded-2xl shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-4 border-blue-500 pb-4">
            Histoire et Origines
          </h2>
          <div className="bg-gray-50 p-8 rounded-xl border-l-8 border-blue-500">
            {timelineData.map((item, index) => (
              <div key={index} className="mb-6 last:mb-0 pl-4">
                <div className="text-xl font-bold text-blue-600 mb-2">
                  {item.year}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className={`bg-white mb-8 p-10 rounded-2xl shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-4 border-blue-500 pb-4">
            Nos Valeurs Fondamentales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesData.map((value, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4">
                  {value.title}
                </h3>
                <p className="leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pratiques et Traditions */}
        <section className={`bg-white mb-8 p-10 rounded-2xl shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-4 border-blue-500 pb-4">
            Pratiques et Traditions
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            L'Église Harriste se distingue par ses pratiques uniques héritées du prophète Harris :
          </p>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">•</span>
              <div>
                <strong>Cultes de guérison :</strong> Prières collectives pour la guérison des malades
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">•</span>
              <div>
                <strong>Baptême par immersion :</strong> Cérémonie d'initiation dans les cours d'eau
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">•</span>
              <div>
                <strong>Chants et danses traditionnels :</strong> Expression joyeuse de la foi
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">•</span>
              <div>
                <strong>Port du costume blanc :</strong> Symbole de pureté spirituelle
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">•</span>
              <div>
                <strong>Prophétisme :</strong> Reconnaissance des dons spirituels et des visions
              </div>
            </li>
          </ul>
        </section>

        {/* Vie Communautaire */}
        <section className={`bg-white mb-8 p-10 rounded-2xl shadow-lg transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-4 border-blue-500 pb-4">
            Vie Communautaire
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Notre communauté se rassemble chaque semaine pour des cultes empreints de spiritualité 
            et de joie. Nous organisons également des activités sociales, des visites aux malades, 
            et des actions de solidarité envers les plus démunis. Chaque membre, qu'il soit nouveau 
            ou fidèle de longue date, trouve sa place dans cette grande famille spirituelle.
          </p>
        </section>

        {/* Footer */}
        <footer className={`bg-gray-800 text-white text-center p-8 rounded-2xl mt-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold mb-4">Contact et Informations</h3>
          <p className="text-gray-300 leading-relaxed">
            Pour rejoindre notre communauté ou obtenir plus d'informations sur nos activités,
            rendez-vous dans l'un de nos temples ou contactez les responsables locaux.
            Tous sont les bienvenus dans l'amour du Christ selon l'enseignement du prophète Harris.
          </p>
        </footer>
      </div>
    </div>
  );
}