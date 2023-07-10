export const sineSynth = new Tone.Synth({
  oscillator: { type: 'sine' },
  volume: -12,
}).toDestination();
