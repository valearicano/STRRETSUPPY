/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Review } from '../types';
import { playSound } from '../utils/sound';
import { Star, MessageSquareCode, Award, UserCheck, Plus, Sparkles } from 'lucide-react';

interface ReviewsSectionProps {
  reviews: Review[];
  onAddReview: (review: Review) => void;
}

export default function ReviewsSection({
  reviews,
  onAddReview,
}: ReviewsSectionProps) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [tempRating, setTempRating] = useState<number | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddReview({
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString(),
      isCustom: true
    });

    playSound('success');
    setFeedbackMsg('RESEÑA AUTENTICADA Y SUBIDA AL NÚCLEO HOLOGRÁFICO!');
    
    // Clear inputs
    setName('');
    setComment('');
    setRating(5);

    setTimeout(() => {
      setFeedbackMsg('');
    }, 4000);
  };

  const averageRating = reviews.reduce((sum, curr) => sum + curr.rating, 0) / reviews.length;

  return (
    <div className="space-y-8 animate-fade-in" id="reviews-board">
      
      {/* Title Header with Hologram Info */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-3xl font-mono font-bold tracking-tight text-white flex items-center gap-2">
            RESEÑAS DEL NÚCLEO
            <MessageSquareCode className="w-6 h-6 text-orange-500" />
          </h2>
          <p className="text-xs text-gray-500 font-mono uppercase mt-1">
            Validaciones de zapatillas originales registradas en Colombia
          </p>
        </div>

        {/* Aggregated telemetry score */}
        <div className="p-3 bg-[#080808] border border-white/10 rounded-lg flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-gray-500 block text-[9px] uppercase">Puntaje General</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xl font-bold text-white font-mono">{averageRating.toFixed(1)}</span>
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i <= Math.round(averageRating) ? 'fill-current' : 'text-gray-800'}`}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="border-l border-white/10 pl-4">
            <span className="text-gray-500 block text-[9px] uppercase">Nodos Activos</span>
            <span className="text-sm font-bold text-orange-500 mt-1 block">{reviews.length} VERIFICADOS</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Add review terminal form */}
        <div className="lg:col-span-1 bg-[#080808] border border-white/10 p-5 rounded-xl holo-border-orange space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-1">
            <Award className="w-4 h-4 text-orange-500" />
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-widest">
              NUEVO REPORTE DE CALIDAD
            </h3>
          </div>

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="block text-[8px] font-mono text-gray-500 uppercase">
                Nombre de Operador
              </label>
              <input
                type="text"
                required
                placeholder="Ex. Camila R."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2 text-xs font-mono text-white outline-none"
                id="reviewer-name-field"
              />
            </div>

            {/* Stars Selector Interactive */}
            <div className="space-y-1">
              <label className="block text-[8px] font-mono text-gray-500 uppercase">
                Índice de Confort y Originalidad
              </label>
              <div className="flex gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((val) => {
                  const isHighlighted = tempRating !== null ? val <= tempRating : val <= rating;
                  return (
                    <button
                      key={val}
                      type="button"
                      onMouseEnter={() => { setTempRating(val); playSound('hover'); }}
                      onMouseLeave={() => setTempRating(null)}
                      onClick={() => { playSound('click'); setRating(val); }}
                      className="transition-transform duration-100 hover:scale-125 focus:outline-none"
                      id={`star-btn-${val}`}
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          isHighlighted ? 'text-amber-400 fill-amber-400' : 'text-slate-850'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comment Section Textarea */}
            <div className="space-y-1">
              <label className="block text-[8px] font-mono text-gray-500 uppercase">
                Diagnóstico de la Zapatilla
              </label>
              <textarea
                required
                rows={3}
                placeholder="Comparte tu experiencia de compra o comodidad..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 rounded p-2.5 text-xs font-mono text-white outline-none resize-none"
                id="comment-text-field"
              />
            </div>

            {feedbackMsg && (
              <div className="p-2 border border-green-500/20 bg-green-500/5 text-[9px] text-green-400 font-mono text-center rounded animate-pulse" id="review-status-alert">
                {feedbackMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 border border-orange-400 text-black font-semibold font-mono text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_10px_rgba(249,115,22,0.2)]"
              id="submit-review-btn"
            >
              <Plus className="w-4 h-4 text-black" />
              SUBIR ENLACE DE RESEÑA
            </button>
          </form>
        </div>

        {/* Right column: List of reviews */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-1 text-xs font-mono text-gray-400">
            <UserCheck className="w-4 h-4 text-orange-500" />
            <span>HISTORIAL DE OPERADORES REGISTRADOS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev, index) => (
              <div
                key={index}
                className="p-4 bg-[#0e0e0e]/85 border border-white/10 rounded-xl space-y-3 relative group overflow-hidden"
                id={`reviews-list-item-${index}`}
              >
                {/* Micro laser decoration */}
                <span className="absolute top-0 right-10 w-12 h-[1.5px] bg-orange-500/30"></span>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white tracking-wider flex items-center gap-1.5 leading-none">
                      {rev.name}
                      {rev.isCustom && <Sparkles className="w-3 h-3 text-orange-500" />}
                    </h4>
                    <span className="text-[8px] text-gray-650 font-mono block mt-1">
                      {rev.date || 'JUNIO_22_2026'} // SECURE // ID_S{index+8}
                    </span>
                  </div>

                  {/* Stars display */}
                  <div className="flex text-yellow-500 text-[10px]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-current' : 'text-gray-800'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-400 font-mono mt-2 pl-2 border-l border-white/10 py-1 font-light italic leading-relaxed">
                  "{rev.comment}"
                </p>

                {/* Corner vectors */}
                <span className="absolute bottom-1 right-1 font-mono text-[6px] text-gray-800 tracking-tighter uppercase select-none">
                  SECURE_PROTOCOL_OP{index+1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
