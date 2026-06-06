export interface Hairstyle {
  id: string;
  name: string;
  category: 'Curto' | 'Médio' | 'Longo' | 'Todos';
  difficulty: 'Iniciante' | 'Fácil' | 'Médio' | 'Avançado';
  duration: number;
  materials: string[];
  steps: string[];
  tip: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  stars: number;
  role: string;
  avatar: string;
}

export interface Bonus {
  id: string;
  title: string;
  description: string;
  originalValue: number;
  highlight?: boolean;
  image?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CheckoutDetails {
  fullName: string;
  email: string;
  phone: string;
  paymentMethod: 'pix' | 'card' | 'boleto' | null;
}
