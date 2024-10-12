import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Add this function near the top of your component, after the imports
export const getCommodityImage = (commodity) => {
  const imageMap = {
    Rice: '/assets/rice.png',
    Tomato: '/assets/tomato.png',
    Banana: '/assets/banana.png',
    Tapioca: '/assets/tapioca.png',
    'Cowpea(Veg)': '/assets/cowpea.png',
    Amphophalus: '/assets/yam.png',
    Amaranthus: '/assets/yam.png',
    'Paddy(Dhan)(Common)': '/assets/paddy.png',
    'Cucumbar(Kheera)': '/assets/cucumber.png',
    Apple: '/assets/apple.png',
    Pumpkin: '/assets/pumpkin.png',
    Pomegranate: '/assets/pomegranate.png',
    'Bottle gourd': '/assets/bottlegourd.png',
    'Ginger(Green)': '/assets/ginger.png',
    'Green Chilli': '/assets/greenchilly.png',
    Lemon: '/assets/lemon.png',
    Brinjal: '/assets/brinjal.png',
    'Gur(Jaggery)': '/assets/jaggery.png',
    Potato: '/assets/potato.png',
    Onion: '/assets/onion.png',
    // Add more mappings as needed
  };
  return imageMap[commodity] || '/assets/default.png';
};
