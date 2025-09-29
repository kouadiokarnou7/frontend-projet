import { useState, useEffect } from "react";
import type React from "react";
  import {
    HomeIcon,
    BuildingLibraryIcon,
    UsersIcon,
    CalendarDaysIcon,
    ChartBarIcon,
    CogIcon,
  } from "@heroicons/react/24/outline";

  // Type facultatif pour faciliter l'autocomplétion
  export interface MenuItem {
    name: string;
    path: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  }

  // Hook personnalisé: gère l'état responsive et expose les items du menu
  export function useSidebarUI() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Détection de la taille d'écran
    useEffect(() => {
      const handleResize = () => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        // Si on passe en desktop, on ferme le menu mobile
        if (!mobile) setIsOpen(false);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fermeture du menu mobile lors du clic sur un lien
    const handleLinkClick = () => {
      if (isMobile) setIsOpen(false);
    };

    // Eléments de navigation
    const menuItems: MenuItem[] = [
      { name: "Dashboard", path: "/admin/dashboard", icon: HomeIcon },
      { name: "Églises", path: "/admin/eglises", icon: BuildingLibraryIcon },
      { name: "Membres", path: "/admin/membres", icon: UsersIcon },
      { name: "Événements", path: "/admin/evenements", icon: CalendarDaysIcon },
      { name: "Statistiques", path: "/admin/statistiques", icon: ChartBarIcon },
      { name: "Paramètres", path: "/admin/parametres", icon: CogIcon },
    ];

    return {
      isOpen,
      setIsOpen,
      isMobile,
      handleLinkClick,
      menuItems,
    };
  }

  export default useSidebarUI;