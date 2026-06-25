/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AboutUs as AboutUsType, SocialMedia } from '../types';
import { playSound } from '../utils/sound';
import { Award, Compass, MessageSquareCode, Mail, Smartphone, Instagram, Facebook } from 'lucide-react';

interface AboutUsProps {
  aboutUs: AboutUsType;
  socialMedia: SocialMedia;
  address: string;
}

export default function AboutUs({ aboutUs, socialMedia, address }: AboutUsProps) {
  return (
    <div className="space-y-12 animate-fade-in" id="about-us-container">
      {/* Narrative grid with futuristic look */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column Text details */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-orange-500 uppercase block">
              ESTABLECIMIENTO SECURE: STREETSUPPLY
            </span>
            <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white uppercase leading-tight">
              {aboutUs.title}
            </h2>
          </div>

          <p className="text-sm font-mono text-gray-400 leading-relaxed max-w-2xl border-l-2 border-orange-500/25 pl-4 py-1.5 font-light">
            {aboutUs.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#0e0e0e]/80 border border-white/10 rounded-xl space-y-1">
              <span className="text-[9px] font-mono text-orange-500 font-bold uppercase tracking-wider block">INDEX DE ORIGINALIDAD</span>
              <p className="text-xs text-gray-400 font-mono">
                100% zapatillas originales importadas directamente de los centros de diseño oficiales.
              </p>
            </div>
            <div className="p-4 bg-[#0e0e0e]/80 border border-white/10 rounded-xl space-y-1">
              <span className="text-[9px] font-mono text-orange-500 font-bold uppercase tracking-wider block">CADENA LOGÍSTICA COLOMBIA</span>
              <p className="text-xs text-gray-400 font-mono">
                Despacho inmediato a Bogotá, Medellín, Cali, Barranquilla y demás distritos.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column Abstract vector graphic showing Colombia Grid points (Bento layout style) */}
        <div className="lg:col-span-5 bg-[#080808] border border-white/10 p-6 rounded-xl holo-border-orange relative overflow-hidden flex flex-col justify-between h-[300px]" id="holographic-map-container">
          <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
          
          <div className="space-y-1">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              NODO CENTRAL COLOMBIA
            </h3>
            <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest block">
              STATUS // DISTRIB_MATRIX
            </span>
          </div>

          {/* Abstract SVG representing a high tech geometric grid with location nodes */}
          <div className="my-1.5 flex items-center justify-center relative">
            <svg className="w-full h-36" viewBox="0 0 200 120" id="colombia-grid-map">
              {/* Coordinate grid lines */}
              <defs>
                <pattern id="gridPattern" width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 15 0 L 0 0 0 15" fill="none" stroke="rgba(249, 115, 22, 0.04)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#gridPattern)" />

              {/* Connected web line */}
              <path d="M 60 40 L 90 20 L 130 50 L 100 80 L 60 40 Z" stroke="rgba(249, 115, 22, 0.15)" strokeWidth="1" strokeDasharray="3,3" fill="none" />
              <path d="M 90 20 L 100 80 M 60 40 L 130 50" stroke="rgba(249, 115, 22, 0.12)" strokeWidth="0.8" fill="none" />

              {/* Active Colombia Matrix Nodes */}
              <g fill="#f97316">
                {/* Node 1 Bogotá */}
                <circle cx="100" cy="80" r="3.5" className="animate-ping" style={{ transformOrigin: '100px 80px' }} />
                <circle cx="100" cy="80" r="2.5" />
                <text x="110" y="83" fill="#f97316" fontSize="7" fontFamily="monospace">BOG_NODE</text>

                {/* Node 2 Medellín */}
                <circle cx="60" cy="40" r="2.5" />
                <text x="40" y="32" fill="#FFFFFF" fontSize="7" fontFamily="monospace">MDE_NODE</text>

                {/* Node 3 Cali */}
                <circle cx="45" cy="85" r="2" />
                <text x="25" y="94" fill="#FFFFFF" fontSize="7" fontFamily="monospace">CLO_NODE</text>

                {/* Node 4 Barranquilla */}
                <circle cx="90" cy="20" r="2.5" fill="#f97316" />
                <text x="100" y="18" fill="#f97316" fontSize="7" fontFamily="monospace">BAQ_NODE</text>
              </g>

              {/* Central Satellite scan indicator */}
              <line x1="0" y1="60" x2="200" y2="60" stroke="rgba(249, 115, 22, 0.25)" strokeWidth="1" className="scan-line" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 border-t border-white/10 pt-3">
            <span>ZONA REGIONAL: CO-SOUTH_AM</span>
            <span>DIRECCIÓN: {address}</span>
          </div>
        </div>
      </div>

      {/* Social Nodes Connections (Instagram, Whatsapp, Email) */}
      <div className="space-y-4">
        <h3 className="text-xs font-mono font-bold text-orange-500 uppercase tracking-widest text-center">
          CANALES DE COMUNICACIÓN ENLACE DIRECTO
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="social-media-grids">
          {/* Whatsapp */}
          <a
            href={socialMedia.whatsapp.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="p-4 bg-[#0e0e0e]/80 hover:bg-emerald-950/20 border border-white/10 hover:border-emerald-500/30 rounded-xl flex items-center gap-3 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Smartphone className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="text-[8px] font-mono text-gray-500 uppercase block">WhatsApp</span>
              <span className="text-xs font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                +{socialMedia.whatsapp.number}
              </span>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${socialMedia.email}`}
            onClick={() => playSound('click')}
            className="p-4 bg-[#0e0e0e]/80 hover:bg-orange-950/20 border border-white/10 hover:border-orange-500/30 rounded-xl flex items-center gap-3 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="text-[8px] font-mono text-gray-500 uppercase block">E-mail Corporativo</span>
              <span className="text-xs font-mono font-bold text-white group-hover:text-orange-300 transition-colors truncate max-w-[150px] block">
                {socialMedia.email}
              </span>
            </div>
          </a>

          {/* Instagram */}
          <a
            href={`https://instagram.com/${socialMedia.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="p-4 bg-[#0e0e0e]/80 hover:bg-orange-950/20 border border-white/10 hover:border-orange-500/30 rounded-xl flex items-center gap-3 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-550 flex items-center justify-center">
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="text-[8px] font-mono text-gray-500 uppercase block">Instagram</span>
              <span className="text-xs font-mono font-bold text-white group-hover:text-orange-400 transition-colors">
                @{socialMedia.instagram}
              </span>
            </div>
          </a>

          {/* Facebook */}
          <a
            href={`https://facebook.com/${socialMedia.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="p-4 bg-[#0e0e0e]/80 hover:bg-orange-950/20 border border-white/10 hover:border-orange-500/30 rounded-xl flex items-center gap-3 transition-all duration-300 group"
          >
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-550 flex items-center justify-center">
              <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="text-[8px] font-mono text-gray-500 uppercase block">Facebook</span>
              <span className="text-xs font-mono font-bold text-white group-hover:text-orange-400 transition-colors">
                {socialMedia.facebook}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
