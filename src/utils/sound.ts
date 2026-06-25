/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuteState(muted: boolean) {
  isMuted = muted;
}

export function getMuteState() {
  return isMuted;
}

// Low level Web Audio UI synth effects
export function playSound(type: 'click' | 'hover' | 'hologram' | 'success' | 'ignite' | 'danger') {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  switch (type) {
    case 'click': {
      // Sci-fi high ping click
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(700, now + 0.05);
      
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
      break;
    }
    case 'hover': {
      // Subdued short hud tick
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      
      gainNode.gain.setValueAtTime(0.015, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.02);
      break;
    }
    case 'hologram': {
      // Digital frequency sweep up
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(180, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.35);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(185, now);
      osc2.frequency.exponentialRampToValueAtTime(440, now + 0.35);
      
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.linearRampToValueAtTime(0.08, now + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc1.start(now);
      osc2.start(now);
      
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
      break;
    }
    case 'success': {
      // Cyber gold double ping
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.3); // C6
      
      gainNode.gain.setValueAtTime(0.07, now);
      gainNode.gain.setValueAtTime(0.07, now + 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
      break;
    }
    case 'ignite': {
      // Ignite fire sweep - low heavy roar + high hiss
      const osc = ctx.createOscillator();
      const noise = ctx.createOscillator(); // we simulate hiss with high pitch saw
      const filter = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();
      
      // Roaring low triangle
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, now);
      osc.frequency.linearRampToValueAtTime(250, now + 0.6);
      
      // Hiss
      noise.type = 'triangle';
      noise.frequency.setValueAtTime(1200, now);
      noise.frequency.exponentialRampToValueAtTime(80, now + 0.8);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(800, now + 0.4);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.8);
      
      gainNode.gain.setValueAtTime(0.12, now);
      gainNode.gain.exponentialRampToValueAtTime(0.002, now + 0.8);
      
      osc.connect(filter);
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now);
      noise.start(now);
      osc.stop(now + 0.8);
      noise.stop(now + 0.8);
      break;
    }
    case 'danger': {
      // Negative warning hum
      const osc = ctx.createOscillator();
      const oscDetune = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.4);

      oscDetune.type = 'sawtooth';
      oscDetune.frequency.setValueAtTime(184, now);
      oscDetune.frequency.linearRampToValueAtTime(92, now + 0.4);
      
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      
      osc.connect(gainNode);
      oscDetune.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now);
      oscDetune.start(now);
      osc.stop(now + 0.45);
      oscDetune.stop(now + 0.45);
      break;
    }
  }
}

// Play continuous ambient sound (e.g. fire plasma spark hum)
let ignitionInterval: number | null = null;
export function startFireSoundLoop() {
  if (isMuted) return;
  if (ignitionInterval) return;

  const playCrackley = () => {
    const ctx = getAudioContext();
    if (!ctx || isMuted) return;
    const now = ctx.currentTime;
    
    // Crackle noise pop
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100 + Math.random() * 200, now);
    
    gainNode.gain.setValueAtTime(0.005 + Math.random() * 0.015, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.03 + Math.random() * 0.04);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.08);
  };

  ignitionInterval = window.setInterval(playCrackley, 40);
}

export function stopFireSoundLoop() {
  if (ignitionInterval) {
    clearInterval(ignitionInterval);
    ignitionInterval = null;
  }
}
