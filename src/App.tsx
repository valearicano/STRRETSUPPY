/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Eye, 
  ShoppingBag, 
  Star, 
  ChevronRight, 
  Flame, 
  ShieldCheck, 
  ArrowUpRight, 
  Heart, 
  HelpCircle,
  Activity,
  Award,
  Sparkles,
  Phone,
  CheckCircle2,
  Sliders,
  Terminal,
  Grid
} from 'lucide-react';

import { Product, CartItem, Review, NavItem } from './types';
import { playSound } from './utils/sound';

// Import modular subcomponents
import Loader from './components/Loader';
import NavBar from './components/NavBar';
import ThreeDShoeViewer from './components/ThreeDShoeViewer';
import ProductCard from './components/ProductCard';
import CartSection from './components/CartSection';
import ReviewsSection from './components/ReviewsSection';
import AboutUs from './components/AboutUs';
import ContactSection from './components/ContactSection';

// Initial data values specified in JSON request
const INTRO_HERO = {
  title: "Bienvenido a STREETSUPPPLY",
  subtitle: "Encuentra las mejores zapatillas Jordan, Nike y Adidas.",
  buttonText: "Comprar Ahora",
  backgroundColor: "#000000"
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Air Jordan 1 Retro",
    brand: "Jordan",
    price: 220000,
    currency: "COP",
    image: "https://mjnvzjghmlsxlfzmxluh.supabase.co/storage/v1/object/sign/STREETSUPPLY/1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRhZGI4Yy1jN2E4LTRlMzEtYTlhYy0yZGJhYzdmNTFiMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTVFJFRVRTVVBQTFkvMS53ZWJwIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MjM0NTgyNywiZXhwIjoxODEzODgxODI3fQ.a6DYICnQ6W_Cex7QgUVMpvbPQmkxD2qICL_A36uj6u8",
    backgroundLogo: "logo_jordan.png",
    description: "Silueta clásica Jordan Retro 1 para un ajuste de perfil alto icónico con comodidad superior.",
    stock: 15
  },
  {
    id: 2,
    name: "Air Jordan 2 Retro",
    brand: "Jordan",
    price: 230000,
    currency: "COP",
    image: "https://mjnvzjghmlsxlfzmxluh.supabase.co/storage/v1/object/sign/STREETSUPPLY/jordan%202.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRhZGI4Yy1jN2E4LTRlMzEtYTlhYy0yZGJhYzdmNTFiMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTVFJFRVRTVVBQTFkvam9yZGFuIDIud2VicCIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODIzNDczNDUsImV4cCI6MTgxMzg4MzM0NX0.9gWGMoRwgqXgiTTSIgPaowS-xYBuQWm0ZK3s-LrdDBE",
    backgroundLogo: "logo_jordan.png",
    description: "Elegancia italiana y líneas limpias que redefinieron el estilo en la cancha en su época dorada.",
    stock: 8
  },
  {
    id: 3,
    name: "Air Jordan 3 Retro",
    brand: "Jordan",
    price: 240000,
    currency: "COP",
    image: "https://mjnvzjghmlsxlfzmxluh.supabase.co/storage/v1/object/sign/STREETSUPPLY/jorda%203.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRhZGI4Yy1jN2E4LTRlMzEtYTlhYy0yZGJhYzdmNTFiMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTVFJFRVRTVVBQTFkvam9yZGEgMy5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgyMzQ3NDUyLCJleHAiOjE4MTM4ODM0NTJ9.oelH3RSPOdJ2sN-C_afi6IkWVZ6u6DxQeAEDp4lkMVQ",
    backgroundLogo: "logo_jordan.png",
    description: "La primera silueta Jordan en lucir el icónico estampado de la pata de elefante y la unidad visible de amortiguación Air.",
    stock: 12
  },
  {
    id: 4,
    name: "Air Jordan 4 Retro",
    brand: "Jordan",
    price: 250000,
    currency: "COP",
    image: "https://mjnvzjghmlsxlfzmxluh.supabase.co/storage/v1/object/sign/STREETSUPPLY/jorda%204.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRhZGI4Yy1jN2E4LTRlMzEtYTlhYy0yZGJhYzdmNTFiMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTVFJFRVRTVVBQTFkvam9yZGEgNC5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgyMzQ3NTMxLCJleHAiOjE4MTM4ODM1MzF9.uGED63zteGoKumDHtehwoP9iEDMUKgClQwfRZzUfK6w",
    backgroundLogo: "logo_jordan.png",
    description: "Un clásico eterno con paneles laterales de malla transpirable y alas funcionales de soporte ajustables.",
    stock: 10
  },
  {
    id: 5,
    name: "Nike Air Force 1 '07",
    brand: "Nike",
    price: 210000,
    currency: "COP",
    image: "https://mjnvzjghmlsxlfzmxluh.supabase.co/storage/v1/object/sign/STREETSUPPLY/one.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRhZGI4Yy1jN2E4LTRlMzEtYTlhYy0yZGJhYzdmNTFiMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTVFJFRVRTVVBQTFkvb25lLmpwZWciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgyMzQ3NTg0LCJleHAiOjE4MTM4ODM1ODR9.udzm2R-3GeozhoYbZjV3gqkDpmnrreM_lv_S33x4KyA",
    backgroundLogo: "logo_nike.png",
    description: "El ícono retro de las calles con piel impecable, comodidad acolchada y el diseño legendario de suela de caucho.",
    stock: 20
  },
  {
    id: 6,
    name: "Nike Air Max",
    brand: "Nike",
    price: 245000,
    currency: "COP",
    image: "https://mjnvzjghmlsxlfzmxluh.supabase.co/storage/v1/object/sign/STREETSUPPLY/air%20max.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRhZGI4Yy1jN2E4LTRlMzEtYTlhYy0yZGJhYzdmNTFiMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTVFJFRVRTVVBQTFkvYWlyIG1heC5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgyMzQ3NjM0LCJleHAiOjE4MTM4ODM2MzR9.YO_uwJCzSm9Cn8-mUyZ0VC0PQ8dh4uCOUS_8dlnjjN0",
    backgroundLogo: "logo_nike.png",
    description: "Zapatillas legendarias con tecnología Air visible para brindar una amortiguación inigualable y un rebote futurista.",
    stock: 14
  },
  {
    id: 7,
    name: "Adidas Campus",
    brand: "Adidas",
    price: 185000,
    currency: "COP",
    image: "https://mjnvzjghmlsxlfzmxluh.supabase.co/storage/v1/object/sign/STREETSUPPLY/adidas%20campus.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRhZGI4Yy1jN2E4LTRlMzEtYTlhYy0yZGJhYzdmNTFiMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTVFJFRVRTVVBQTFkvYWRpZGFzIGNhbXB1cy53ZWJwIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MjM0NzczNywiZXhwIjoxODEzODgzNzM3fQ.LH4Is0x8HkytbuFsvPFzYdPW9gUc_r5AjyzM2Iq4U8w",
    backgroundLogo: "logo_adidas.png",
    description: "Silueta clásica de los 2000s con cordones anchos y gamuza superior para un toque vanguardista y vintage.",
    stock: 18
  }
];

const INITIAL_REVIEWS: Review[] = [
  {
    name: "Juan Pérez",
    rating: 5,
    comment: "Excelente calidad y envío súper rápido a Bogotá. Las zapatillas vinieron perfectamente empacadas.",
    date: "12/06/2026"
  },
  {
    name: "Camila Rodríguez",
    rating: 5,
    comment: "Las zapatillas son 100% originales y sumamente cómodas. El soporte al cliente por WhatsApp es extraordinario.",
    date: "20/06/2026"
  }
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('/');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Active product loaded in 3D Stage (defaults to Jordan 1)
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [isIgnited, setIsIgnited] = useState(false);
  const [fireColor, setFireColor] = useState('#FF3E00'); // defaults to plasma orange

  // Client shoe sizing controller
  const [selectedSize, setSelectedSize] = useState<number>(40);
  const shoeSizes = [38, 39, 40, 41, 42];

  // Filtering products state
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);

  // Trigger ignition animation automatically when clicking/selecting shoe card!
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    
    // Auto color adjust based on brand
    if (product.brand.toLowerCase() === 'nike') {
      setFireColor('#ff6a00'); // Hot intense orange flame
    } else if (product.brand.toLowerCase() === 'adidas') {
      setFireColor('#ff9f00'); // Amber ion plasma
    } else {
      setFireColor('#ff3a00'); // Cybermatic sun-fire orange
    }

    // Scroll smoothly to diagnostic panel
    setTimeout(() => {
      const element = document.getElementById('diagnostic_panel_focus');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Add to cart helper
  const handleAddToCart = () => {
    playSound('success');
    
    // Check if item exists in cart with same product and size
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === selectedProduct.id && item.size === selectedSize
      );
      if (existingIdx > -1) {
        return prev.map((item, idx) => 
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { product: selectedProduct, quantity: 1, size: selectedSize }];
      }
    });

    // Open shopping cart drawer automatically
    setCartOpen(true);

    // Notify user with custom modal / telemetry status trigger
    const alertBox = document.getElementById('add-cart-status');
    if (alertBox) {
      alertBox.classList.remove('opacity-0');
      alertBox.classList.add('opacity-100');
      setTimeout(() => {
        alertBox.classList.remove('opacity-100');
        alertBox.classList.add('opacity-0');
      }, 2500);
    }
  };

  // Add specific product to cart directly (default size 40)
  const handleAddToCartProduct = (product: Product) => {
    playSound('success');
    
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === 40
      );
      if (existingIdx > -1) {
        return prev.map((item, idx) => 
          idx === existingIdx ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { product, quantity: 1, size: 40 }];
      }
    });

    setCartOpen(true);

    // Notify user with custom modal / telemetry status trigger
    const alertBox = document.getElementById('add-cart-status');
    if (alertBox) {
      alertBox.classList.remove('opacity-0');
      alertBox.classList.add('opacity-100');
      setTimeout(() => {
        alertBox.classList.remove('opacity-100');
        alertBox.classList.add('opacity-0');
      }, 2500);
    }
  };

  // Add review helper
  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const navItems: NavItem[] = [
    { title: "Inicio", path: "/" },
    { title: "Productos", path: "/productos" },
    { title: "Reseñas", path: "/resenas" },
    { title: "Quiénes Somos", path: "/nosotros" },
    { title: "Contacto", path: "/contacto" }
  ];

  // Helper format COP
  const formatCOP = (num: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(num);
  };

  // Filtered Products list
  const filteredProducts = INITIAL_PRODUCTS.filter((prod) => {
    const matchesBrand = filterBrand === 'all' || prod.brand.toLowerCase() === filterBrand.toLowerCase();
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = prod.price <= maxPrice;
    return matchesBrand && matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#ffffff] font-mono selection:bg-orange-500 selection:text-black">
      
      {/* Dynamic Loader Boot Sequence */}
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="flex flex-col min-h-screen">
          {/* Cyber Header Navigation */}
          <NavBar
            navigation={navItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cart={cart}
            setCartOpen={setCartOpen}
          />

          {/* BACKGROUND MATRICES OVERLAYS */}
          <div className="fixed inset-0 cyber-grid pointer-events-none opacity-25 z-0"></div>
          <div className="fixed top-[15%] left-[25%] w-[450px] h-[450px] bg-orange-600/5 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse"></div>
          <div className="fixed bottom-[15%] right-[25%] w-[450px] h-[450px] bg-amber-600/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

          {/* MAIN PAGE VIEW ROUTER */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 relative z-10 space-y-12">
            
            {activeTab === '/' && (
              /* TAB 1: HOME PAGE GRID WITH 3D RENDERING STAGE */
              <div className="space-y-12">
                {/* HERO DIGITAL PROFILE */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative p-6 sm:p-10 rounded-2xl bg-[#090909] border border-white/10 overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.8)]"
                  id="hero-banner"
                >
                  {/* Background Video looping under letters */}
                  <video
                    src="https://mjnvzjghmlsxlfzmxluh.supabase.co/storage/v1/object/sign/STREETSUPPLY/Zapatillas_cayendo_cubriendo_fondo_202606241850.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRhZGI4Yy1jN2E4LTRlMzEtYTlhYy0yZGJhYzdmNTFiMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTVFJFRVRTVVBQTFkvWmFwYXRpbGxhc19jYXllbmRvX2N1YnJpZW5kb19mb25kb18yMDI2MDYyNDE4NTAubXA0Iiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4MjM0NTU3NSwiZXhwIjoxODEzODgxNTc1fQ.YZ4xuquXUgfUO3zyBLmW4dPDKwHJkgm0jzxtIyGI-94"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 brightness-125 saturate-110 pointer-events-none"
                  />

                  {/* Dark gradient overlay to ensure readability of text while letting the background shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent z-[1] pointer-events-none" />

                  {/* Neon scanner lines decorations */}
                  <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500 to-transparent z-[2]"></div>
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-orange-500/25 rounded-full blur-[100px] pointer-events-none z-[2]"></div>

                  <div className="max-w-2xl space-y-4 relative z-10">
                    <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-orange-500 uppercase flex items-center gap-1.5 leading-none">
                      <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                      KINETIC_STATION_LAUNCH_2026
                    </span>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-3xl font-sans font-extrabold tracking-tight text-white uppercase italic leading-none">
                      {INTRO_HERO.title}
                    </h2>
                    
                    <p className="text-sm font-mono text-gray-100 leading-relaxed font-medium drop-shadow-md">
                      {INTRO_HERO.subtitle} Experimenta la fusión de ingeniería original con la estética cyberpunk del futuro. Realiza diagnósticos térmicos y activa propulsores en tiempo real.
                    </p>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => { playSound('hologram'); setActiveTab('/productos'); }}
                        className="px-6 py-3 bg-white text-black hover:bg-orange-500 hover:text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.3)] cursor-pointer flex items-center justify-center gap-2"
                        id="hero-cta-btn"
                      >
                        {INTRO_HERO.buttonText}
                        <ArrowUpRight className="w-4 h-4 text-current" />
                      </button>
                      
                      <button
                        onClick={() => { playSound('click'); setActiveTab('/nosotros'); }}
                        className="px-6 py-3 bg-[#0a0a0a] hover:bg-[#121212] border border-white/10 hover:border-white/20 text-slate-300 font-bold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2"
                        id="hero-secondary-btn"
                      >
                        Diagnóstico Global
                      </button>
                    </div>
                  </div>

                  {/* Corner telemetry label info */}
                  <span className="absolute bottom-3 right-4 text-[7px] text-gray-600 font-mono uppercase tracking-widest leading-none">
                    ST_SUPPLY_ENGINE_OFFICIAL_VERIFIED // CO-N_L7
                  </span>
                </motion.div>

                {/* THE MAJESTIC INTERACTIVE 3D STAGE & DIAGNOSTIC PANEL */}
                <div className="space-y-4" id="diagnostic_panel_focus">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
                      <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                        VITRINA STREETSUPPLY // DETALLE DIGITAL
                      </h3>
                    </div>
                    <span className="text-[10px] text-orange-500 font-mono tracking-widest hidden sm:inline uppercase">
                      CATÁLOGO REEL // PRESENTACIÓN DE ESTILOS
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    
                    {/* Left Diagnostic Specs Controls (5 columns) */}
                    <div className="lg:col-span-5 order-2 lg:order-1 bg-[#080808] border border-white/10 p-5 rounded-2xl flex flex-col justify-between holo-border-orange space-y-4 relative overflow-hidden" id="diagnostics-panel">

                      <div className="space-y-4-not-gap">
                        {/* Selected Brand and Name header */}
                        <div className="space-y-1 pb-3 border-b border-white/10">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-orange-500 uppercase">
                            DIAG_CONNECTED // {selectedProduct.brand}
                          </span>
                          <h3 className="text-xl font-mono font-bold text-white tracking-tight leading-tight">
                            {selectedProduct.name}
                          </h3>
                        </div>

                        {/* Specs bullet descriptors */}
                        <div className="space-y-2 text-xs font-mono py-3">
                          <div className="p-2 bg-black/60 rounded border border-slate-900 flex justify-between">
                            <span className="text-gray-500 uppercase">ID de la Unidad:</span>
                            <span className="text-slate-300 font-bold">X-S_0{selectedProduct.id}</span>
                          </div>
                          <div className="p-2 bg-black/60 rounded border border-slate-900 flex justify-between">
                            <span className="text-gray-500 uppercase">Amortiguación:</span>
                            <span className="text-slate-300 font-bold">Resonancia Pascal</span>
                          </div>
                          <p className="text-xs text-gray-400 leading-relaxed font-light mt-2 p-1 italic">
                            "{selectedProduct.description}"
                          </p>
                        </div>

                        {/* Interactive Size Selector standard */}
                        <div className="space-y-2 border-t border-white/10 pt-3">
                          <label className="block text-[9px] font-mono text-gray-500 uppercase tracking-widest select-none">
                            Seleccionar Talla (EU)
                          </label>
                          <div className="flex gap-2" id="sizer-picker-grid">
                            {shoeSizes.map((sz) => {
                              const isSel = selectedSize === sz;
                              return (
                                <button
                                  key={sz}
                                  onClick={() => { playSound('click'); setSelectedSize(sz); }}
                                  className={`w-9 h-9 rounded border font-mono text-xs font-bold flex items-center justify-center transition-all duration-300 ${
                                    isSel
                                      ? 'bg-orange-500 text-white border-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.4)]'
                                      : 'bg-black text-slate-400 border-white/10 hover:text-white hover:border-white/30'
                                  }`}
                                  id={`size-btn-${sz}`}
                                >
                                  {sz}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Diagnostic purchase action controller */}
                      <div className="space-y-3 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-end">
                          <div className="flex flex-col">
                            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-wider">PRECIO DE TRANSFERENCIA</span>
                            <span className="text-lg font-mono font-bold text-white">
                              {formatCOP(selectedProduct.price + (selectedSize - 38) * 10000)} <span className="text-[9px] text-gray-500 font-semibold">COP</span>
                            </span>
                          </div>
                          
                          <span className="text-[9px] font-mono text-orange-500 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Original Garantizado
                          </span>
                        </div>

                        {/* Purchase Button */}
                        <button
                          onClick={handleAddToCart}
                          className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:brightness-110 text-white font-mono font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.3)] cursor-pointer flex items-center justify-center gap-2"
                          id="btn-add-to-cart-spect"
                        >
                          <ShoppingBag className="w-4 h-4 text-white" />
                          ADQUIRIR ZAPATILLA Y CARGAR SIZ
                        </button>

                        {/* Status notification feedback overlay */}
                        <div
                          id="add-cart-status"
                          className="opacity-0 transition-opacity duration-300 p-2 bg-emerald-500/10 border border-emerald-500/20 text-[9px] text-emerald-400 text-center rounded font-semibold font-mono"
                        >
                          ZAPATILLA AGREGADA AL ARCHIVADOR DE COMPRAS // COMPROBAR CARRITO
                        </div>
                      </div>
                    </div>

                    {/* Right Majestic 3D Shoe/Flame View Render Stage (7 columns) */}
                    <div className="lg:col-span-7 order-1 lg:order-2">
                      <ThreeDShoeViewer
                        product={selectedProduct}
                        isIgnited={isIgnited}
                        setIsIgnited={setIsIgnited}
                        fireColor={fireColor}
                      />
                    </div>
                  </div>
                </div>

                {/* SNEAKER SHELF GRID (ZAPATILLAS REQUERIDAS) */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-2">
                    <div className="flex items-center gap-2">
                      <Grid className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
                      <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                        ESTANTES DIGITALES // LÍNEA SELECCIONADA
                      </h3>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-1 sm:mt-0">
                      Haz clic en una zapatilla para ver sus detalles en el showcase de modelos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="products-interactive-grid">
                    {INITIAL_PRODUCTS.map((prod) => (
                      <div key={prod.id}>
                        <ProductCard
                          product={prod}
                          onSelect={handleSelectProduct}
                          isSelected={selectedProduct.id === prod.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* REVIEWS HOMEPAGE SNIPPET WIDGET */}
                <div className=" p-6 bg-[#080808] border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center gap-4 justify-between holo-border-orange">
                  <div className="space-y-1">
                    <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                      ¿Deseas leer testimonios de operadores?
                    </h4>
                    <p className="text-xs text-gray-500 font-mono">
                      Contamos con un sistema de registro de reportes de calidad transparente y 100% verificado.
                    </p>
                  </div>
                  <button
                    onClick={() => { playSound('hologram'); setActiveTab('/resenas'); }}
                    className="p-3 bg-black hover:bg-[#121212] border border-white/10 rounded-lg text-orange-500 font-mono text-xs uppercase cursor-pointer transition-colors"
                    id="back-to-reviews"
                  >
                    Ver todas las reseñas ({reviews.length})
                  </button>
                </div>
              </div>
            )}

            {activeTab === '/productos' && (
              /* TAB 2: DETAILED SEPARATE PRODUCTS SHELF FOR QUERY FILTERING */
              <div className="space-y-8 animate-fade-in" id="products-catalog-tab">
                {/* Advanced filter control board */}
                <div className="bg-[#080808] border border-white/10 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-1 text-xs font-mono text-gray-400">
                    <Sliders className="w-4.5 h-4.5 text-orange-500" />
                    <span>CONSOLA DE FILTRACIÓN DE MODELOS</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Filter by keyword input */}
                    <div className="space-y-1">
                      <label className="block text-[8px] font-mono text-gray-500 uppercase">
                        Buscar por Palabra Clave
                      </label>
                      <input
                        type="text"
                        placeholder="Ex. Jordan, Air, Campus..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-black border border-white/10 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                        id="catalog-search"
                      />
                    </div>

                    {/* Filter by Brand Selector buttons */}
                    <div className="space-y-1">
                      <label className="block text-[8px] font-mono text-gray-500 uppercase">
                        Código de Marca
                      </label>
                      <div className="flex gap-1">
                        {['all', 'jordan', 'nike', 'adidas'].map((b) => (
                          <button
                            key={b}
                            onClick={() => { playSound('click'); setFilterBrand(b); }}
                            className={`flex-1 py-2 rounded text-[10px] font-mono font-bold tracking-wider transition-all duration-300 uppercase ${
                              filterBrand === b
                                ? 'bg-orange-500/20 border border-orange-500 text-orange-300 shadow-[0_0_8px_rgba(249,115,22,0.2)]'
                                : 'bg-black border border-white/10 text-slate-400 hover:text-white'
                            }`}
                            id={`filter-brand-${b}`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Filter by Price Slider */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[8px] font-mono text-gray-500 uppercase">
                        <span>Valor COP tope</span>
                        <span className="text-orange-500">{formatCOP(maxPrice)} COP</span>
                      </div>
                      <input
                        type="range"
                        min="600000"
                        max="1200000"
                        step="50000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full accent-orange-500 h-1 bg-slate-800 rounded-lg cursor-pointer mt-1"
                        id="price-filter-slider"
                      />
                    </div>
                  </div>
                </div>

                {/* Show query products grid */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs text-gray-500 font-mono">
                    <span>COINCIDENCIAS EN CONSOLA // {filteredProducts.length} UNIDADES</span>
                    <span>RESTABLECIMIENTO: SECURE</span>
                  </div>

                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="catalog-products-grid">
                      {filteredProducts.map((prod) => (
                        <div key={prod.id} className="space-y-2">
                          <ProductCard
                            product={prod}
                            onSelect={handleSelectProduct}
                            isSelected={selectedProduct.id === prod.id}
                            onAddToCart={handleAddToCartProduct}
                          />
                          {selectedProduct.id === prod.id && (
                            <div className="p-2 bg-orange-950/25 border border-orange-500/20 text-center rounded text-[10px] text-orange-400 font-mono">
                              ▲ DETALLES MOSTRADOS EN LA VITRINA DE INICIO
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-black/40 text-gray-400 text-xs font-mono">
                      Ninguna zapatilla coincide con los parámetros suministrados. Intenta reajustar los filtros.
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === '/resenas' && (
              /* TAB 3: IMMERSIVE COMMENTS AND REVIEWS MATRIX */
              <ReviewsSection
                reviews={reviews}
                onAddReview={handleAddReview}
              />
            )}

            {activeTab === '/nosotros' && (
              /* TAB 4: BRAND NARRATIVE PROFILE */
              <AboutUs
                aboutUs={{
                  title: "Quiénes Somos",
                  description: "STREETSUPPPLY es una estación comercial de zapatillas premium especializada en calzado Jordan, Nike y Adidas en territorio de Colombia. Nuestro compromiso es fusionar la originalidad incuestionable con precios optimizados y soporte dinámico de alto nivel. La ingeniería de distribución nacional responde a protocolos estrictos de rapidez y confiabilidad para garantizar que cada unidad de calzado mantenga los estándares óptimos de diseño original."
                }}
                socialMedia={{
                  whatsapp: { number: "573143587441", link: "https://wa.me/573143587441" },
                  email: "valearicano@gmail.com",
                  instagram: "streetsupply",
                  facebook: "StreetSupply"
                }}
                address="Colombia"
              />
            )}

            {activeTab === '/contacto' && (
              /* TAB 5: TELEMETRY SIGNAL ENVELOPE TRANSMISSION */
              <ContactSection email="valearicano@gmail.com" />
            )}

          </main>

          {/* ACTIVE FLOAT IN-APP CART SLIDE-DRAWER */}
          <AnimatePresence>
            {cartOpen && (
              <CartSection
                cart={cart}
                setCart={setCart}
                paymentMethods={["PSE", "Nequi", "Daviplata"]}
                onClose={() => setCartOpen(false)}
                setActiveTab={setActiveTab}
              />
            )}
          </AnimatePresence>

          {/* CHRONOS ORBIT FOOTER MARGINS */}
          <footer className="mt-12 border-t border-white/10 bg-black/60 py-6 text-center text-[10px] text-gray-500 font-mono relative z-10" id="main-footer">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <span className="font-cursive text-base font-bold text-white leading-none">STREETSUPPLY</span>
                <span>// Colombia HQ</span>
              </div>
              <p>
                © 2026 STREETSUPPLY. Todos los derechos reservados. // ORIGINAL_SNEAKER_STATION
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
