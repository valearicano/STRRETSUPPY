/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NavItem {
  title: string;
  path: string;
}

export interface HeroSection {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundColor: string;
}

export interface Category {
  name: string;
  backgroundLogo: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  currency: string;
  image: string; // fallback
  backgroundLogo: string;
  description: string;
  stock: number;
}

export interface CartConfig {
  enabled: boolean;
  currency: string;
  paymentMethods: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: number;
}

export interface Review {
  name: string;
  rating: number;
  comment: string;
  date?: string;
  isCustom?: boolean;
}

export interface AboutUs {
  title: string;
  description: string;
}

export interface MultimediaConfig {
  videoBanner: boolean;
  carouselImages: boolean;
  animations: boolean;
  darkMode: boolean;
}

export interface SocialNetwork {
  number?: string;
  link?: string;
}

export interface SocialMedia {
  whatsapp: SocialNetwork;
  email: string;
  instagram: string;
  facebook: string;
}

export interface FooterConfig {
  copyright: string;
  address: string;
}

export interface ShopState {
  site: {
    name: string;
    logo: string;
    theme: {
      primaryColor: string;
      secondaryColor: string;
      accentColor: string;
      backgroundColor: string;
      fontFamily: string;
    };
    slogan: string;
  };
  navigation: NavItem[];
  heroSection: HeroSection;
  categories: Category[];
  products: Product[];
  cartConfig: CartConfig;
  reviews: Review[];
  aboutUs: AboutUs;
  multimedia: MultimediaConfig;
  socialMedia: SocialMedia;
  footer: FooterConfig;
}
