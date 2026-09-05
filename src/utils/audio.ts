// A pure Web Audio synthesizer for warm, harmonic church chime / sanctuary bells

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a reverent sanctuary chime with rich bell harmonics
 */
export function playBellChime(pitch: 'low' | 'medium' | 'high' = 'medium') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const baseFreq = pitch === 'low' ? 330 : pitch === 'high' ? 660 : 440; // E4, A4, or E5
    const now = ctx.currentTime;

    // Harmonic ratios for a European church bell / chime
    const harmonics = [
      { freq: baseFreq * 1.0, gain: 0.35, decay: 4.5 },
      { freq: baseFreq * 1.5, gain: 0.20, decay: 3.5 },
      { freq: baseFreq * 2.0, gain: 0.15, decay: 2.8 },
      { freq: baseFreq * 2.76, gain: 0.08, decay: 1.8 },
      { freq: baseFreq * 3.0, gain: 0.05, decay: 1.4 },
    ];

    harmonics.forEach(({ freq, gain, decay }) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Attack and exponential decay
      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(gain, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch (err) {
    console.warn('Audio chime playback omitted or unsupported:', err);
  }
}
