/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal, Activity, Cpu } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [bootStep, setBootStep] = useState('INICIANDO CONEXIÓN NÚCLEO STREETSUPPLY...');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const logs = [
    'PROTOCOL_BOOT_SEQUENCE // ACTIVE',
    'ESTABLISHING ENCRYPTED HUD INTERFACE...',
    'CALIBRATING 3D SHOE VECTOR GRID ENGINE...',
    'INJECTING PLASMA KINETIC PARTICLE RENDERERS...',
    'SECURING BILLING PAYMENTS MODULE (PSE/NEQUI)...',
    'DIAGNOSTICS: CORE_TEMPERATURE_STABLE [31.5°C]',
    'SYNCHRONIZING WITH COLOMBIA DISTRIBUTION CORRIDOR...',
    'SYSTEM STATUS: ALL REVOLUTIONARY PROPULSIONS OPTIMIZED.'
  ];

  useEffect(() => {
    // Increment progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return 100;
        }
        const step = Math.min(100 - prev, Math.floor(Math.random() * 15) + 5);
        return prev + step;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Sync log listings
  useEffect(() => {
    const logIndex = Math.min(
      logs.length - 1,
      Math.floor((progress / 100) * logs.length)
    );
    setBootStep(logs[logIndex]);
    
    if (consoleLogs.indexOf(logs[logIndex]) === -1 && progress > 0) {
      setConsoleLogs((prev) => [...prev, logs[logIndex]].slice(-4));
    }
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-[#030303] z-50 flex flex-col items-center justify-center p-6 cyber-grid overflow-hidden scanline"
      id="global-portal-loader"
    >
      <div className="absolute top-10 text-[10px] text-orange-500 font-mono tracking-[0.25em] flex items-center gap-2">
        <Cpu className="w-4 h-4 animate-spin text-orange-500" />
        <span>STREETSUPPLY // CORP SYSTEM v3.1</span>
      </div>

      <div className="w-full max-w-lg space-y-8 relative z-10 px-4">
        {/* Holographic Logo Accent */}
        <div className="text-center space-y-2">
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-7xl font-bold tracking-tight text-white font-cursive glow-orange select-none"
            id="loader-header-logo"
          >
            StreetSupply
          </motion.h1>
          <p className="text-gray-500 font-mono text-[9px] sm:text-xs uppercase tracking-[0.3em]">
            Futuristic Sneaker Terminal
          </p>
        </div>

        {/* Console diagnostics log output */}
        <div className="bg-[#090909]/90 border border-orange-500/20 p-4 rounded-lg font-mono text-[9px] sm:text-[10px] space-y-1 bg-gradient-to-b from-[#0e0e0e] to-[#040404] text-slate-400">
          <div className="flex items-center gap-1.5 border-b border-white/10 pb-1.5 mb-2 text-orange-500/80 font-semibold">
            <Terminal className="w-3.5 h-3.5 text-orange-500" />
            <span>CONSOLE COMMAND TERMINAL</span>
          </div>
          <div className="h-24 space-y-1.5 overflow-hidden">
            {consoleLogs.map((log, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="text-orange-500">&gt;</span>
                <span className="truncate">{log}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress HUD bar */}
        <div className="space-y-3">
          <div className="flex justify-between font-mono text-[10px] tracking-wider">
            <span className="text-orange-500 font-bold uppercase">{bootStep}</span>
            <span className="text-orange-400 font-bold">{progress}% RES</span>
          </div>
          
          <div className="h-[4px] w-full bg-slate-900 border border-slate-800 rounded-full overflow-hidden p-[2px]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-orange-400 to-amber-500 rounded-full"
            />
          </div>
        </div>

        {/* Audio notice ticker bar */}
        <div className="flex items-center justify-between text-[9px] font-mono text-gray-500 border-t border-slate-900 pt-4">
          <div className="flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>CORE_SYNC_LEVEL: SECURE</span>
          </div>
          <span>GRID_LOC_CLB_57 // LATAM</span>
        </div>
      </div>

      {/* Decorative vector background bounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>
    </motion.div>
  );
}
