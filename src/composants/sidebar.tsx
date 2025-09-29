import { NavLink } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSidebarUI } from "../hooks/hooksibebard";

export default function Sidebar() {
  const { isOpen, setIsOpen, isMobile, menuItems, handleLinkClick } = useSidebarUI();

  // Classes pour un sidebar fixe (desktop) et coulissant (mobile)
  const sidebarClass = [
    "fixed",           // Sidebar fixe pour garder une position stable
    "inset-y-0",       // Occupe toute la hauteur
    "left-0",
    "z-40",
    "bg-gray-800",
    "text-white",
    "flex",
    "flex-col",
    "p-6",
    "transition-transform",
    "duration-300",
    "ease-in-out",
    "w-80",            // largeur mobile
    "md:w-64",         // largeur desktop
    isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
  ].join(" ");

  return (
    <>
      {/* Bouton hamburger (mobile uniquement) */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-lg shadow-lg md:hidden"
          aria-label="Ouvrir/fermer le menu"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>
      )}

      {/* Overlay pour mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClass}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">Menu</h2>
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-700 rounded"
              aria-label="Fermer le menu"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    "hover:bg-gray-700",
                    isActive
                      ? "bg-blue-600 text-white font-semibold shadow-lg"
                      : "hover:translate-x-1",
                  ].join(" ")
                }
              >
                <IconComponent className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-gray-700 flex flex-col items-center">
          <button
            onClick={() => alert("Déconnexion")}
            className="w-full px-4 py-2 text-white bg-red-400 rounded-lg hover:bg-red-700 transition-colors"
          >
            Déconnexion
          </button>
          <div className="text-xs text-gray-400 mt-3 text-center">© 2024 Eglise harriste</div>
        </div>
      </aside>

      {/* Navigation bottom (mobile, optionnel) */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white border-t border-gray-700 z-30 md:hidden">
          <div className="flex justify-around items-center py-2">
            {menuItems.slice(0, 5).map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex flex-col items-center gap-1 p-2 rounded-lg text-xs",
                      isActive ? "text-blue-400" : "text-gray-300",
                    ].join(" ")
                  }
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs truncate max-w-16">{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
}