// === SELECT ELEMENTS ===
const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const coverArt = document.getElementById('coverArt');
const trackList = document.querySelectorAll('.tracklist li');

// === TRACK DATA ===
const tracks = [
  {
    title: "Dreaming",
    file: "music/dreaming.mp3",
    cover: "images/5b569690-929e-4a4c-8ff8-7b8c1b0dfd56.png"
  },
  {
    title: "P.L",
    file: "music/prettysunny 1lady.mp3",
    cover: "images/5b569690-929e-4a4c-8ff8-7b8c1b0dfd56.png"
  },
  {
    title: "Hype You Up",
    file: "music/momo.mp3",
    cover: "images/5b569690-929e-4a4c-8ff8-7b8c1b0dfd56.png"
  },
  {
    title: "It Ain’t Easy",
    file: "music/loving you ant easy-1.mp3",
    cover: "images/5b569690-929e-4a4c-8ff8-7b8c1b0dfd56.png"
  },
  {
    title: "Take Care",
    file: "music/take care of her-1.mp3",
    cover: "images/5b569690-929e-4a4c-8ff8-7b8c1b0dfd56.png"
  }
];

let currentTrackIndex = 0;
let isPlaying = false;

// === INITIAL LOAD ===
function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.file;
  coverArt.src = track.cover;

  // Highlight active track
  trackList.forEach(li => li.classList.remove('active'));
  trackList[index].classList.add('active');
}
loadTrack(currentTrackIndex);

// === PLAY / PAUSE ===
function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "⏸️";
    isPlaying = true;
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶️";
    isPlaying = false;
  }
}

// === NEXT / PREVIOUS ===
function playNext() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}
function playPrev() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  playPauseBtn.textContent = "⏸️";
}

// === TRACK LIST CLICK ===
trackList.forEach((li, index) => {
  li.addEventListener('click', () => {
    currentTrackIndex = index;
    loadTrack(index);
    audio.play();
    playPauseBtn.textContent = "⏸️";
  });
});

// === TIME UPDATE ===
audio.addEventListener('timeupdate', () => {
  let current = audio.currentTime;
  let duration = audio.duration;

  progressBar.value = (current / duration) * 100;

  currentTimeEl.textContent = formatTime(current);
  durationEl.textContent = formatTime(duration);
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// === FORMAT TIME (mm:ss) ===
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// === AUTOPLAY NEXT ===
audio.addEventListener('ended', () => {
  playNext();
});

// === EVENTS ===
playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
