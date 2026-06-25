/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { playSound } from '../utils/sound';
import { Send, Terminal, Cpu, Info, ShieldAlert } from 'lucide-react';

interface ContactSectionProps {
  email: string;
}

export default function ContactSection({ email }: ContactSectionProps) {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [transmissions, setTransmissions] = useState<string[]>([]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) return;

    playSound('click');
    setIsSending(true);
    setSentSuccess(false);

    // Simulated terminal packets transmission steps
    const steps = [
      `CONNECTING TO MAIL_RELAY // PORT_3000`,
      `AUTHORIZING SENDER AS [${senderEmail.toUpperCase()}]`,
      `ENCRYPTING DATA PACKET WITH SSL SHA-256`,
      `TRANSMITTING CONTENT PROTOCOL TO STREETSUPPLY...`,
      `TRANSMISSION SUCCESSFULLY CONCLUDED!`
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < steps.length) {
        setTransmissions(prev => [...prev, steps[i]]);
        playSound('hover');
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          playSound('success');
          setIsSending(false);
          setSentSuccess(true);
          // resets fields
          setSenderName('');
          setSenderEmail('');
          setMessage('');
        }, 600);
      }
    }, 450);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in" id="contact-terminal">
      {/* Title Header Column (4 columns) */}
      <div className="lg:col-span-5 space-y-4">
        <div>
          <span className="text-[10px] font-mono tracking-[0.25em] text-orange-500 uppercase block">
            ESTACIÓN DE TRANSMISIÓN DE SEÑAL
          </span>
          <h2 className="text-3xl font-mono font-bold tracking-tight text-white uppercase mt-1">
            CONTÁCTANOS
          </h2>
        </div>

        <p className="text-xs text-gray-400 font-mono leading-relaxed">
          ¿Tienes dudas sobre tallas de zapatillas, tiempos de despacho para Colombia, o quieres coordinar un pago contra entrega? Envía una transmisión directa a nuestro equipo.
        </p>

        <div className="p-4 bg-[#0e0e0e]/80 border border-white/10 rounded-xl space-y-2.5 font-mono text-[11px] text-gray-400">
          <div className="font-bold text-white border-b border-white/10 pb-1.5 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-orange-500" />
            <span>DATOS DE CONEXIÓN</span>
          </div>
          <div className="flex justify-between">
            <span>TERMINAL MAIL:</span>
            <span className="text-white select-all">{email}</span>
          </div>
          <div className="flex justify-between">
            <span>PAÍS:</span>
            <span className="text-white">Colombia // CO</span>
          </div>
          <div className="flex justify-between">
            <span>PROTOCOLO_SYNC:</span>
            <span className="text-emerald-400">ACTIVE // SECURE</span>
          </div>
        </div>

        <div className="p-3 bg-[#0e0e0e]/80 border border-white/10 rounded-lg flex gap-2.5 text-[9px] text-orange-300 font-mono">
          <Info className="w-4.5 h-4.5 text-orange-500 flex-shrink-0" />
          <span>
            Responderemos a tu e-mail registrado en un término menor a 12 horas operacionales.
          </span>
        </div>
      </div>

      {/* Message Submission Terminal Box (7 columns) */}
      <div className="lg:col-span-7 bg-[#080808] border border-white/10 p-5 rounded-xl holo-border-orange space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-1">
          <Terminal className="w-4 h-4 text-orange-500" />
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
            TERMINAL DE TRANSMISIÓN DIRECTA
          </h3>
        </div>

        <form onSubmit={handleSendMessage} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Operator Identifier */}
            <div className="space-y-1">
              <label className="block text-[8px] font-mono text-gray-500 uppercase">
                Nombre de operador
              </label>
              <input
                type="text"
                required
                disabled={isSending}
                placeholder="Ex. Camila R."
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                id="contact-name-input"
              />
            </div>

            {/* Operator Email */}
            <div className="space-y-1">
              <label className="block text-[8px] font-mono text-gray-500 uppercase">
                E-mail de recepción
              </label>
              <input
                type="email"
                required
                disabled={isSending}
                placeholder="operador@net.com"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                id="contact-email-input"
              />
            </div>
          </div>

          {/* Core Message body */}
          <div className="space-y-1">
            <label className="block text-[8px] font-mono text-gray-500 uppercase">
              Mensaje Encriptado
            </label>
            <textarea
              required
              rows={4}
              disabled={isSending}
              placeholder="Escribe tu consulta o reporte..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2.5 text-xs font-mono text-white outline-none resize-none"
              id="contact-message-body"
            />
          </div>

          {/* Animated Diagnostics feedback system logs */}
          {isSending && (
            <div className="p-3 bg-black/80 border border-orange-500/20 rounded font-mono text-[9px] text-orange-400 space-y-1 animate-pulse" id="transmission-telemetry-logs">
              {transmissions.map((log, p) => (
                <div key={p} className="flex gap-1.5">
                  <span>&gt;&gt;</span>
                  <span>{log}</span>
                </div>
              ))}
            </div>
          )}

          {sentSuccess && (
            <div className="p-2 border border-emerald-500/25 bg-emerald-500/5 text-[9px] font-mono text-emerald-400 text-center rounded animate-bounce" id="transmission-success-alert">
              MENSAJE TRANSMITIDO CON ÉXITO! NÚCLEO STREETSUPPLY ADQUIRIÓ LA SEÑAL.
            </div>
          )}

          <button
            type="submit"
            disabled={isSending}
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-black font-semibold font-mono text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_12px_rgba(249,115,22,0.3)]"
            id="transmit-message-btn"
          >
            <Send className="w-4 h-4 text-white" />
            TRANSMITIR MENSAJE AL ENLACE
          </button>
        </form>
      </div>
    </div>
  );
}
