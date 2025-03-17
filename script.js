document.addEventListener('DOMContentLoaded', () => {
  let songs =[
  {
    name:'Tingin',
    path:'media/tingin1.mp3',
    artist:'Cup of Joe',
    cover:'media/1.jpg'
  },
  {
    name:'Misteryoso',
    path:'media/misteryoso2.mp3',
    artist:'Cup of Joe',
    cover:'media/2.jpg'
  },
  {
    name:'Old Love',
    path:'media/oldlove4.mp3',
    artist:'Putri Dahlia and Yuji',
    cover:'media/4.jpg'
  },
    {
    name:'ONLY',
    path:'media/only5.mp3',
    artist:'LeeHi',
    cover:'media/5.jpg'
  }, 
         {
       name: 'I LIKE U',
      path: 'media/ilikeu6.mp3',
      artist: 'NIKI',
      cover: 'media/6.jpg'
    },
    {
      name: 'Fallen',
      path: 'media/fallen9.mp3',
      artist: 'Lola Amour',
      cover: 'media/9.jpg'
    }, 
    {
      name: 'Weak',
      path: 'media/weak8.mp3',
      artist: 'SWV',
      cover: 'media/8.jpg'
    },
    {
      name: 'Tibok',
      path: 'media/tibok10.mp3',
      artist: 'Earl Agustin',
      cover: 'media/10.jpg'
    }
  ];
  
  let currentMusic = 0;

const music = document.querySelector('#audio');

const seekBar = document.querySelector('.seek-bar');
const songName = document.querySelector('.music-name');
const artistName = document.querySelector('.artist-name');
const disk = document.querySelector('.disk');
const currentTime = document.querySelector('.current-time');
const musicDuration = document.querySelector('.song-duration');
const playBtn = document.querySelector('.play-btn');
const forwardBtn = document.querySelector('.forward-btn');
const backwardBtn = document.querySelector('.backward-btn');

if (!music || !playBtn || !forwardBtn || !backwardBtn || !seekBar) {
    console.error("One or more elements not found in the DOM.");
    return;
}
  
playBtn.addEventListener('click', () => {
  if (playBtn.classList.contains('pause')) {
    music.play();
  } else {
    music.pause();
  }
  playBtn.classList.toggle('pause');
  disk.classList.toggle('play');
});

const setMusic = (i) => {
  seekBar.value = 0;
  let song = songs[i];
  currentMusic = i;
  music.src = song.path;
  
  songName.innerHTML = song.name;
  artistName.innerHTML = song.artist;
  disk.style.backgroundImage = `url('${song.cover}')`;
  
  currentTime.innerHTML = '00:00';

  music.addEventListener("loadedmetadata", () => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  });
};

setMusic(0);

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  return `${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`;
};

setInterval(() => {
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
    forwardBtn.click();
  }
}, 500);

seekBar.addEventListener('input', () => {
  music.currentTime = seekBar.value;
});

const playMusic = () => {
  music.play();
  playBtn.classList.remove('pause');
  disk.classList.add('play')
}
  
forwardBtn.addEventListener('click', () => {
  currentMusic = (currentMusic >= songs.length - 1) ? 0 : currentMusic + 1;
  setMusic(currentMusic);
  playMusic();
});

backwardBtn.addEventListener('click', () => {
  currentMusic = (currentMusic <= 0) ? songs.length - 1 : currentMusic - 1;
  setMusic(currentMusic);
  playMusic();
});
});
