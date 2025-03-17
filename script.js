document.addEventListener('DOMContentLoaded', () => {
  let songs = [
    {
      name: 'Tingin',
      path: 'media/tingin1.mp3',
      artist: 'Cup of Joe',
      cover: 'media/1.jpg'
    },
    {
      name: 'Misteryoso',
      path: 'media/misteryoso2.mp3',
      artist: 'Cup of Joe',
      cover: 'media/2.jpg'
    },
    {
      name: 'Old Love',
      path: 'media/oldlove4.mp3',
      artist: 'Putri Dahlia and Yuji',
      cover: 'media/4.jpg'
    },
    {
      name: 'ONLY',
      path: 'media/only5.mp3',
      artist: 'LeeHi',
      cover: 'media/5.jpg'
    },    
    {
      name: 'I LIKE U',
      path: 'media/ilikeu6.mp3',
      artist: 'NIKI',
      cover: 'media/6.jpg'
    },
    {
      name: 'Weak',
      path: 'media/weak8.mp3',
      artist: 'SWV',
      cover: 'media/8.jpg'
    },
    {
      name: 'Fallen',
      path: 'media/fallen9.mp3',
      artist: 'Lola Amour',
      cover: 'media/9.jpg'
    }
  ];

  let currentMusic = 0;

  // Selecting elements and checking if they exist
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
    if (music.paused) {
      music.play();
    } else {
      music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
  });

  const setMusic = (i) => {
    if (!songs[i]) return;
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    if (songName) songName.innerHTML = song.name;
    if (artistName) artistName.innerHTML = song.artist;
    if (disk) disk.style.backgroundImage = `url('${song.cover}')`;

    if (currentTime) currentTime.innerHTML = '00:00';

    setTimeout(() => {
      seekBar.max = music.duration || 0;
      if (musicDuration) musicDuration.innerHTML = formatTime(music.duration);
    }, 300);
  };

  const formatTime = (time) => {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
  };

  setMusic(0);

  setInterval(() => {
    seekBar.value = music.currentTime;
    if (currentTime) currentTime.innerHTML = formatTime(music.currentTime);
    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
      forwardBtn.click();
    }
  }, 500);

  seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value;
  });

  const playMusic = () => {
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
  };

  forwardBtn.addEventListener('click', () => {
    currentMusic = (currentMusic + 1) % songs.length;
    setMusic(currentMusic);
    playMusic();
  });

  backwardBtn.addEventListener('click', () => {
    currentMusic = (currentMusic - 1 + songs.length) % songs.length;
    setMusic(currentMusic);
    playMusic();
  });
});
