export interface TimelineItem {
  year: string;
  description: string;
}

export interface ValueCard {
  title: string;
  description: string;
}

export interface ImageCard {
  src: string;
  alt: string;
  caption: string;
}

export const timelineData: TimelineItem[] = [
  {
    year: "1913-1915",
    description: "Le prophète William Wade Harris, originaire du Liberia, prêche en Côte d'Ivoire et convertit plus de 120 000 personnes au christianisme."
  },
  {
    year: "1915",
    description: "Harris est expulsé par l'administration coloniale française, mais son message perdure."
  },
  {
    year: "1920-présent",
    description: "Les communautés harriste s'organisent et perpétuent l'enseignement du prophète à travers les générations."
  }
];

export const valuesData: ValueCard[] = [
  {
    title: "Foi en Jésus-Christ",
    description: "Croyance profonde en l'Évangile et en la puissance transformatrice du Christ"
  },
  {
    title: "Guérison Spirituelle",
    description: "Pratique de la prière pour la guérison physique et spirituelle selon l'enseignement de Harris"
  },
  {
    title: "Unité Communautaire",
    description: "Solidarité et entraide entre tous les membres de la communauté"
  },
  {
    title: "Culture Africaine",
    description: "Préservation et valorisation des traditions africaines dans la pratique chrétienne"
  }
];

export const imageGallery: ImageCard[] = [
  {
    src: "/image02.jpg",
    alt: "Église harriste en Côte d'Ivoire",
    caption: "Temple harriste traditionnel"
  },
  {
    src: "/image03.jpg",
    alt: "Communauté en prière",
    caption: "Moment de culte communautaire"
  },
  {
    src: "/logo3.png",
    alt: "Logo de l'église harriste",
    caption: "Symbole de notre foi"
  }
];