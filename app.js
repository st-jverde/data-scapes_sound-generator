import { initializeSliders } from './components/sliders.js';

// Call the initializeSliders function to initialize the sliders
initializeSliders();

import { grainSampler } from './instruments/grainSampler.js';
import { rhythmLoaded } from './instruments/rhythm.js';
import { sineSynth } from './instruments/sineSynth.js';
import { melodies } from './instruments/melodies.js';
import { triangleSynth } from './instruments/triangleSynth.js';

// Define BPM
Tone.Transport.bpm.value = 140;

// Loops for each instrument
let rhythm, rhythmLoop;

rhythmLoaded.then(rhythmObj => {
  rhythm = rhythmObj.rhythm;
  rhythmLoop = rhythmObj.rhythmLoop;
});

let grainSamplerLoop;

Tone.loaded().then(()=>{
  grainSamplerLoop = new Tone.Loop(time => {
    grainSampler.start(time);
  }, '1n');
})

let melodyIndex = 0; // Choose your melody from the list
let noteIndex = 0;

const sineSynthLoop = new Tone.Loop(time => {
  let note = melodies[melodyIndex][noteIndex];
  sineSynth.triggerAttackRelease(note, '32n', time);
  noteIndex = (noteIndex + 1) % melodies[melodyIndex].length; // Cycle through the notes in the melody
}, '8n');


const triangleSynthLoop = new Tone.Loop(time => {
  triangleSynth.triggerAttackRelease('D1', '8n', time);
}, '2n');

startButton.addEventListener('click', async () => {
  await Tone.start();
  Tone.Transport.start();
  // Add the loops to the Transport
  grainSamplerLoop.start(0);
  rhythmLoop.start(0);
  sineSynthLoop.start(0);
  triangleSynthLoop.start(0);
});

stopButton.addEventListener('click', () => {
  Tone.Transport.stop();
  grainSampler.stop();
  grainSamplerLoop.stop();
  rhythmLoop.stop();
  sineSynthLoop.stop();
  triangleSynthLoop.stop();
});
