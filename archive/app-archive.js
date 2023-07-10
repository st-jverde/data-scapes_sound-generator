const data = {
  happy: 8,
  confidence: 4,
  calm: 7,
  age: 80,
};

const playBTN = document.getElementById('play-btn');
const stopBTN = document.getElementById('stop-btn');

// Define BPM
const bpm = 120;
Tone.Transport.bpm.value = bpm;

let rhythmIndex = 0;
let noisePlayer;

const rhythmPattern = ['+0', '+0.25', '+0.5', '+0.75'];

let isNoisePlayerReady = false;

async function initNoisePlayer() {
  isNoisePlayerReady = false;
  noisePlayer = new Tone.Player({
      url: "pink_noise.mp3",
      loop: true,
      autostart: false,
      onload: () => {
          isNoisePlayerReady = true;
          playBTN.disabled = false;
      }
  }).toDestination();

  await Tone.start();
}


function getRandomStartTime() {
    const startTime = Math.random() * data.happy;
    return startTime;
}

function getRandomBoolean() {
    const trueFalse = Math.random();
    if (trueFalse >= 0.5) {
        return true;
    }
    return false;
}

const feedbackDelay = new Tone.FeedbackDelay({
  delayTime: 0.8,
  feedback: 0.3,
  wet: 0.6
});

const grainPlayer = new Tone.GrainPlayer({
  url: './kyoto-bell.mp3',
  grainSize: 1,
  overlap: 0.2,
  reverse: getRandomBoolean(),
  loop: true,
  loopStart: getRandomStartTime(),
}).connect(feedbackDelay).toDestination();

function mapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

Tone.Transport.scheduleRepeat(repeatCallback, '4n');

// Button click events
playBTN.addEventListener('click', async () => {
  playBTN.disabled = true;
  await initNoisePlayer();
  await Tone.loaded();
  Tone.Transport.start();
  noisePlayer.start();
  grainPlayer.start();
});

stopBTN.addEventListener('click', () => {
  if (isNoisePlayerReady) {
    Tone.Transport.cancel(); // clear all scheduled events
    Tone.Transport.stop();
    noisePlayer.stop();
    noisePlayer.dispose();
    grainPlayer.stop();
    grainPlayer.dispose();
    isNoisePlayerReady = false;
  }
});


function repeatCallback(time) {
  const quarterNoteDuration = 60 / Tone.Transport.bpm.value;
  const rhythmTime = rhythmPattern[rhythmIndex % rhythmPattern.length];
  let startTime = time + parseFloat(rhythmTime) * quarterNoteDuration;
  let duration = Math.random() * mapRange(data.calm, 1, 10, 0.01, 0.1);

  Tone.Transport.scheduleOnce((time) => {
    grainPlayer.start(time, 0, duration); // schedule the grainPlayer to play according to the rhythm
    noisePlayer.start(time, 0, duration); // also schedule the noisePlayer to play according to the rhythm
  }, `+${startTime}`);

  rhythmIndex++;
}
