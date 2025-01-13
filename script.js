const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
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

// Event Listner for prec & next
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
