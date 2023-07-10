

export const grainSampler = new Tone.GrainPlayer({
  url: "../media/short-drone.mp3",
  loop: false,
  grainSize: 0.6,
  playbackRate: 0.1,
  overlap: 0.5,
  reverse: true,
}).toDestination();
