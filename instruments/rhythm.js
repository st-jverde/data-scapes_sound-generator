const highpass = new Tone.Filter({
  type: 'highpass',
  frequency: 1000,  // initial frequency
  Q: 2,
}).toDestination();

export const rhythm = new Tone.Sampler({
  urls: {"C4": "../media/pink_noise.mp3"},
  volume: -1,
  attack: 0.1,
  release: 0.1
}).connect(highpass);  // connect rhythm to the highpass filter

let rhythmLoop;

export const rhythmLoaded = Tone.loaded().then(()=>{
  rhythmLoop = new Tone.Loop(time => {
    // set the highpass filter frequency to a random value between 1000 and 5000 each time
    highpass.frequency.value = Math.random() * 8000 + 500;
    rhythm.triggerAttackRelease('C4', '64n', time);
  }, '16n');
  return {rhythm, rhythmLoop};  // Return an object with both rhythm and rhythmLoop
});
