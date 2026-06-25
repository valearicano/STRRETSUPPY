/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NavItem, CartItem } from '../types';
import { playSound, setMuteState, getMuteState } from '../utils/sound';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Terminal,
  Activity,
  Award
} from 'lucide-react';

interface NavBarProps {
  navigation: NavItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  setCartOpen: (open: boolean) => void;
}

export default function NavBar({
  navigation,
  activeTab,
  setActiveTab,
  cart,
  setCartOpen,
}: NavBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(getMuteState());

  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleTabChange = (path: string) => {
    setActiveTab(path);
    setMobileMenuOpen(false);
    playSound('hologram');
  };

  const toggleSound = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    setMuteState(newState);
    playSound('click');
  };

  return (
    <header className="sticky top-0 z-40 bg-black/50 border-b border-white/10 backdrop-blur-md px-4 sm:px-6 py-3 transition-all duration-300" id="main-header">
      {/* HUD scanning line decoration */}
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500/45 to-transparent shadow-[0_0_8px_#f97316]"></div>

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Cursive Typography paired with tech metrics */}
        <div 
          onClick={() => handleTabChange('/')} 
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo-hud"
        >
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-600 p-[1px] shadow-[0_0_12px_rgba(249,115,22,0.25)] group-hover:shadow-[0_0_18px_rgba(249,115,22,0.5)] transition-all duration-500 flex items-center justify-center">
            <div className="w-full h-full bg-[#050505] rounded-lg flex items-center justify-center text-white text-base font-bold font-mono">
              SZ
            </div>
            {/* Corner dots */}
            <span className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-orange-500 rounded-full"></span>
            <span className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-amber-600 rounded-full"></span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-cursive text-2xl sm:text-3xl text-white font-bold leading-none select-none tracking-normal group-hover:text-orange-500 transition-colors duration-300">
              STREETSUPPLY
            </h1>
          </div>
        </div>

        {/* Large screen navigation tabs */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigation.map((item) => {
            const isActive = activeTab === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleTabChange(item.path)}
                onMouseEnter={() => playSound('hover')}
                className={`relative px-4 py-2 text-xs font-mono tracking-wider font-medium uppercase transition-all duration-300 rounded ${
                  isActive
                    ? 'text-orange-500 bg-orange-95/10 bg-black/60 border-b-2 border-orange-500 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                }`}
                id={`nav-tab-${item.title.toLowerCase().replace(' ', '-')}`}
              >
                {item.title}
                {isActive && (
                  <span className="absolute bottom-[-2px] left-1/2 -translate-x-[50%] w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_6px_#f97316]"></span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Diagnostic control metrics (Mute sound, virtual cart count, mobile menu toggle) */}
        <div className="flex items-center gap-3">
          {/* Mute and Visual Spectrum Waveforms */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => playSound('hover')}
            className="flex items-center gap-2 p-2 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors h-9"
            title={isMuted ? 'Habilitar sonido' : 'Silenciar'}
            id="sound-toggle-btn"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-orange-500" />
                {/* Micro Animated Spectrum bar */}
                <div className="flex items-end gap-0.5 h-3 overflow-hidden">
                  <span className="w-[1.5px] bg-orange-500 rounded-full audio-bar-1"></span>
                  <span className="w-[1.5px] bg-orange-500 rounded-full audio-bar-2"></span>
                  <span className="w-[1.5px] bg-orange-500 rounded-full audio-bar-3"></span>
                </div>
              </div>
            )}
          </button>

          {/* Cart Icon & Numeric Badge */}
          <button
            onClick={() => { playSound('hologram'); setCartOpen(true); }}
            onMouseEnter={() => playSound('hover')}
            className="relative flex items-center justify-center p-2 bg-slate-900/60 hover:bg-slate-800 border border-slate-850 rounded-lg text-slate-400 hover:text-white transition-colors h-9 w-9"
            id="cart-trigger-btn"
          >
            <ShoppingBag className="w-4.5 h-4.5 text-orange-500" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-black font-mono text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center border border-black shadow-[0_0_8px_#f97316] animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile responsive drawer toggle */}
          <button
            onClick={() => { playSound('click'); setMobileMenuOpen(!mobileMenuOpen); }}
            className="lg:hidden p-2 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-850 text-slate-400 hover:text-white transition-colors h-9 w-9 flex items-center justify-center"
            id="mobile-drawer-toggle"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </div>

      {/* Responsive mobile overlay screen navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-3 bg-[#050505] border border-white/10 rounded-lg space-y-1 scanline relative" id="mobile-navigation-drawer">
          <div className="flex items-center gap-2 mb-2 px-2.5 pb-2 border-b border-white/10 text-[8px] font-mono text-gray-500 tracking-wider">
            <Terminal className="w-3 h-3 text-orange-500" />
            <span>NAVIGATION_GRID_OVERLAY</span>
          </div>
          {navigation.map((item) => {
            const isActive = activeTab === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleTabChange(item.path)}
                className={`w-full text-left px-3.5 py-2.5 rounded font-mono text-xs tracking-wider transition-all duration-300 flex items-center justify-between ${
                  isActive
                    ? 'text-orange-500 bg-orange-950/20 border-l-2 border-orange-500 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
                id={`mobile-nav-tab-${item.title.toLowerCase().replace(' ', '-')}`}
              >
                <span>{item.title}</span>
                {isActive && <Activity className="w-3.5 h-3.5 text-orange-500 animate-pulse" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
