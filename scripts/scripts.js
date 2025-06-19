const audio = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const coverArt = document.getElementById('coverArt');
const trackList = document.querySelectorAll('.tracklist li');

const tracks = [
  { title: "Dreaming", file: "music/dreaming.mp3" },
  { title: "P.L", file: "music/prettysunny 1lady.mp3" },
  { title: "Hype You Up", file: "music/momo.mp3" },
  { title: "It Ain’t Easy", file: "music/loving you ant easy-1.mp3" },
  { title: "Take Care of Her", file: "music/take care of her-1.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(index) {
  audio.src = tracks[index].file;
  trackList.forEach(li => li.classList.remove('active'));
  trackList[index].classList.add('active');
}
loadTrack(currentTrackIndex);

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

trackList.forEach((li, index) => {
  li.addEventListener('click', () => {
    currentTrackIndex = index;
    loadTrack(index);
    audio.play();
    playPauseBtn.textContent = "⏸️";
  });
});

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

audio.addEventListener('ended', () => {
  playNext();
});

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNext);
prevBtn.addEventListener('click', playPrev);
