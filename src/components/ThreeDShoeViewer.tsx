import React, { useRef, useState, useEffect } from 'react';
import { Product } from '../types';
import { playSound } from '../utils/sound';
import { Play, Pause, Volume2, VolumeX, Sparkles, Film, Maximize2 } from 'lucide-react';

interface ThreeDShoeViewerProps {
  product: Product;
  isIgnited: boolean;
  setIsIgnited: (ignited: boolean) => void;
  fireColor: string;
}

export default function ThreeDShoeViewer({
  product,
  isIgnited,
  setIsIgnited,
  fireColor,
}: ThreeDShoeViewerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Video URL supplied by the user
  const videoUrl = "https://mjnvzjghmlsxlfzmxluh.supabase.co/storage/v1/object/sign/STREETSUPPLY/estilos.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82MzRhZGI4Yy1jN2E4LTRlMzEtYTlhYy0yZGJhYzdmNTFiMWYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJTVFJFRVRTVVBQTFkvZXN0aWxvcy5tcDQiLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzgyMzQ3MTA2LCJleHAiOjE4MTM4ODMxMDZ9.0nxrxWnspwDBIhHjv5IhFTivuHaxVs0f7cv5ElbkL-c";

  // Auto-play or handle video play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    playSound('click');
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    playSound('click');
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const newProgress = parseFloat(e.target.value);
    const duration = videoRef.current.duration || 0;
    videoRef.current.currentTime = (newProgress / 100) * duration;
    setProgress(newProgress);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    playSound('click');
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // Turn off any ignition states when this loaded to ensure no flame behaviors persist
  useEffect(() => {
    if (isIgnited) {
      setIsIgnited(false);
    }
  }, [isIgnited, setIsIgnited]);

  return (
    <div className="flex flex-col h-full rounded-2xl bg-[#090909] border border-white/10 overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.8)]" id="shoe-3d-pane">
      {/* High-tech Header bar */}
      <div className="p-4 bg-black/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Film className="w-4.5 h-4.5 text-orange-500 animate-pulse" />
          <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            STREETSUPPLY SHOWCASE // MODELOS DISPONIBLES
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          <span className="text-[9px] text-orange-500 font-mono font-bold tracking-widest uppercase">
            LIVE SHOWREEL
          </span>
        </div>
      </div>

      {/* Main Video Presentation Screen */}
      <div className="relative flex-1 bg-black flex items-center justify-center min-h-[320px] md:min-h-[400px] overflow-hidden group">
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          id="shoe-video-player"
        />

        {/* Video Controls Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-3 z-10">
          {/* Progress bar */}
          <div className="flex items-center gap-2 w-full">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleProgressChange}
              className="flex-1 accent-orange-500 h-1 bg-white/20 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play / Pause */}
              <button
                onClick={togglePlay}
                className="p-1.5 bg-white/10 hover:bg-orange-500 hover:text-black rounded-lg transition-all text-white cursor-pointer"
                title={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Mute / Unmute */}
              <button
                onClick={toggleMute}
                className="p-1.5 bg-white/10 hover:bg-orange-500 hover:text-black rounded-lg transition-all text-white cursor-pointer"
                title={isMuted ? "Activar Sonido" : "Silenciar"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-400 font-mono">
                CATALOG_REEL_v1.0
              </span>
              <button
                onClick={handleFullscreen}
                className="p-1.5 bg-white/10 hover:bg-orange-500 hover:text-black rounded-lg transition-all text-white cursor-pointer"
                title="Pantalla Completa"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Holographic Badge */}
        <div className="absolute top-4 left-4 p-2 bg-black/80 border border-orange-500/20 rounded-lg flex items-center gap-2 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <div className="flex flex-col">
            <span className="text-[8px] text-gray-500 font-mono leading-none">SELECCIONADO:</span>
            <span className="text-[10px] text-white font-mono font-bold leading-tight uppercase">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Showcase footer info */}
      <div className="p-4 bg-black/90 border-t border-white/10 flex flex-col gap-1.5">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
          Explora la colección StreetSupply a través del video de estilos oficial. Todos los modelos mostrados están disponibles para entrega inmediata en tallas seleccionadas.
        </span>
      </div>
    </div>
  );
}
