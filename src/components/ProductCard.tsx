/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Product } from '../types';
import { playSound } from '../utils/sound';
import { Compass, Eye, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  isSelected: boolean;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onSelect,
  isSelected,
  onAddToCart,
}: ProductCardProps) {
  // Format price in COPcurrency (e.g. $899.000 COP)
  const formatCOP = (num: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(num);
  };

  const handleClick = () => {
    playSound('hologram');
    onSelect(product);
  };

  // Assign background styling based on brand
  const getBrandMeta = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'jordan':
        return {
          glowClass: 'group-hover:border-orange-500/30 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]',
          badgeBg: 'bg-orange-500/10 text-orange-300 border border-orange-500/20',
          gradient: 'from-orange-500/3 to-transparent',
          lineColor: '#f97316'
        };
      case 'nike':
        return {
          glowClass: 'group-hover:border-orange-500/30 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]',
          badgeBg: 'bg-orange-500/10 text-orange-300 border border-orange-500/20',
          gradient: 'from-orange-500/3 to-transparent',
          lineColor: '#f97316'
        };
      case 'adidas':
        return {
          glowClass: 'group-hover:border-orange-500/30 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]',
          badgeBg: 'bg-orange-500/10 text-orange-300 border border-orange-500/20',
          gradient: 'from-orange-500/3 to-transparent',
          lineColor: '#f97316'
        };
      default:
        return {
          glowClass: 'group-hover:border-orange-500/30 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]',
          badgeBg: 'bg-orange-500/10 text-orange-300 border border-orange-500/20',
          gradient: 'from-orange-500/3 to-transparent',
          lineColor: '#f97316'
        };
    }
  };

  const meta = getBrandMeta(product.brand);

  // Generate unique mathematical high-fidelity abstract vector paths for sneakers instead of images,
  // which solves image load issues and fits the futuristic wireframe theme perfectly!
  const renderSneakerOutlineSVG = (brand: string) => {
    const strokeColor = meta.lineColor;
    return (
      <svg className="w-full h-44 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]" viewBox="0 0 220 120" id={`shoe-svg-${product.id}`}>
        {/* Futuristic grids */}
        <defs>
          <radialGradient id={`glow-${product.id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="110" cy="60" r="50" fill={`url(#glow-${product.id})`} />

        {/* Sneaker Outlines Vectors */}
        <g stroke={strokeColor} fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.82">
          {/* Sole Base Outsole */}
          <path d="M 20 85 Q 110 90 200 82 Q 198 75 185 75 Q 165 77 150 72 Q 130 75 100 70 Q 70 75 40 78 Q 22 78 20 85" strokeWidth="2.5" />
          
          {/* Midsole upper separator */}
          <path d="M 23 80 Q 110 84 195 78" strokeWidth="1" opacity="0.6" />

          {/* Upper Collar and Tongue */}
          <path d="M 60 78 C 30 50 48 22 75 14 C 82 22 92 38 105 45 C 130 45 160 50 195 78" />
          <path d="M 75 14 Q 85 8 95 10 C 100 20 102 38 103 45" strokeWidth="1.2" />

          {/* Heel counter reinforcement */}
          <path d="M 60 78 C 50 64 52 48 56 32 C 60 22 65 18 75 14" opacity="0.7" />
          
          {/* Decorative shoe details Stitching */}
          <path d="M 125 45 Q 135 60 185 72" strokeWidth="0.8" strokeDasharray="3,3" opacity="0.5" />
          <path d="M 103 45 Q 115 55 160 75" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.5" />

          {/* Brand Spec Logo Rendered Inside */}
          {brand.toLowerCase() === 'nike' && (
            <path d="M 115 54 Q 132 55 155 42 Q 148 55 130 62" strokeWidth="1.8" fill={`${strokeColor}1A`} />
          )}
          {brand.toLowerCase() === 'adidas' && (
            <g strokeWidth="2">
              <line x1="120" y1="48" x2="128" y2="60" />
              <line x1="126" y1="46" x2="134" y2="58" />
              <line x1="132" y1="44" x2="140" y2="56" />
            </g>
          )}
          {brand.toLowerCase() === 'jordan' && (
            // Wing / Star emblem approximation
            <polygon points="128,45 131,52 138,52 133,56 135,63 128,59 121,63 123,56 118,52 125,52" fill={`${strokeColor}1A`} />
          )}
        </g>

        {/* Laces outline */}
        <g stroke={strokeColor} strokeWidth="1" opacity="0.65">
          <line x1="90" y1="42" x2="110" y2="35" />
          <line x1="93" y1="48" x2="114" y2="42" />
          <line x1="96" y1="54" x2="118" y2="49" />
          <line x1="99" y1="60" x2="122" y2="56" />
        </g>

        {/* Floating crosshair targets diagnostics */}
        <circle cx="20" cy="85" r="2.5" fill={strokeColor} />
        <circle cx="200" cy="82" r="2.5" fill={strokeColor} />
        <circle cx="75" cy="14" r="2" fill={strokeColor} />
      </svg>
    );
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => playSound('hover')}
      className={`relative rounded-xl p-4 bg-[#0e0e0e]/80 border transition-all duration-500 cursor-pointer group flex flex-col justify-between overflow-hidden ${
        isSelected
          ? 'border-orange-500 bg-orange-950/20 shadow-[0_0_20px_rgba(249,115,22,0.25)]'
          : `border-white/10 ${meta.glowClass}`
      }`}
      id={`product-card-${product.id}`}
    >
      {/* Laser Scanning Overlay Animation (visible on hover) */}
      <div className="absolute inset-0 bg-transparent pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="holo-scanner"></div>
      </div>

      {/* Brand & Stock Header */}
      <div className="flex justify-between items-center z-10">
        <span className={`text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-md ${meta.badgeBg}`}>
          {product.brand}
        </span>
        <span className={`text-[8px] font-mono tracking-widest ${product.stock > 0 ? 'text-orange-500/80' : 'text-red-400'}`}>
          {product.stock > 0 ? `STCK_VAL // ${product.stock}` : 'SIN_STOCK'}
        </span>
      </div>

      {/* Interactive holographic structural rendering of shoe */}
      <div className="my-2 relative flex items-center justify-center h-44 overflow-hidden">
        {product.image && product.image.startsWith('http') ? (
          <img
            src={product.image}
            alt={product.name}
            id={`shoe-svg-${product.id}`}
            referrerPolicy="no-referrer"
            className="w-full h-40 object-contain filter drop-shadow-[0_4px_15px_rgba(249,115,22,0.45)] group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          renderSneakerOutlineSVG(product.brand)
        )}
        
        {/* Holographic grid target overlay */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-80 transition-opacity duration-300 text-[8px] text-orange-500 font-mono">
          <Compass className="w-3.5 h-3.5 animate-spin" />
          <span>DRAG_ROTATE_CONNECTED</span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="space-y-2.5 pt-2 border-t border-white/10 z-10">
        <div>
          <h3 className="text-sm font-mono font-bold text-white tracking-tight truncate group-hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
          <p className="text-[10px] text-gray-500 line-clamp-2 mt-1 min-h-[30px]">
            {product.description}
          </p>
        </div>

        {/* Pricing Metrics */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <span className="text-[8px] font-mono text-gray-500 tracking-wider">UNIT_VAL_COP</span>
            <span className="text-sm font-mono font-bold text-white group-hover:text-orange-400 transition-colors">
              {formatCOP(product.price)} <span className="text-[9px] text-gray-500">COP</span>
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) {
                onAddToCart(product);
              } else {
                handleClick();
              }
            }}
            className={`p-2 transition-all duration-300 rounded-lg flex items-center justify-center cursor-pointer ${
              isSelected && !onAddToCart
                ? 'bg-orange-500 text-black shadow-[0_0_10px_#f97316]'
                : 'bg-[#151515] border border-white/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-black group-hover:shadow-[0_0_8px_#f97316]'
            }`}
            title={onAddToCart ? "Agregar al Carrito" : "Elegir Talla y Comprar"}
            id={`inspect-trigger-${product.id}`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tiny visual tech corner decors */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/10 opacity-60"></span>
      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/10 opacity-60"></span>
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/10 opacity-60"></span>
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/10 opacity-60"></span>
    </div>
  );
}
