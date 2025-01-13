const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music Array
const songs = [
  {
    name: 'song-1',
    image: 'song-1',
    displayName: 'Song N1',
    artist: 'Jacinto Design',
  },
  {
    name: 'song-2',
    image: 'song-2',
    displayName: 'Song N2',
    artist: 'Jacinto Design',
  },
  {
    name: 'song-3',
    image: 'song-3',
    displayName: 'Song N3',
    artist: 'Jacinto Design',
  },
  {
    name: 'song-4',
    image: 'song-4',
    displayName: 'Song N4',
    artist: 'Jacinto Design',
  },
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-circle-play', 'fa-circle-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listner
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Load Songs in the DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `images/${song.image}.jpg`;
}

// Current Song Variable
let songIndex = 0;

// Previous Song Function
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song Function
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select first Song
loadSong(songs[songIndex]);

// Progress Bar Function
function updateProgressBar(e) {
  if (isPlaying) {
    // deconstructing
    const { duration, currentTime } = e.srcElement;
    // Update progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    // Duration
    const durationMin = Math.floor(duration / 60);
    let durationSecs = Math.floor(duration % 60);
    if (durationSecs < 10) {
      durationSecs = `0${durationSecs}`;
    }
    // Delay switching durationEl to avoid NAN
    if (durationSecs) {
      durationEl.textContent = `${durationMin}:${durationSecs}`;
    }
    // Current Song Time
    const currentMin = Math.floor(currentTime / 60);
    let currentSecs = Math.floor(currentTime % 60);
    if (currentSecs < 10) {
      currentSecs = `0${currentSecs}`;
    }
    currentTimeEl.textContent = `${currentMin}:${currentSecs}`;
  }
}

music.addEventListener('loadedmetadata', () => {
  progressContainer.addEventListener('click', setProgressBar);
});

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  // deconstructing
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
