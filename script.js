const container = document.querySelector('.container'),
title = document.querySelector('#title'),
artist = document.querySelector('#artist'),
progContainer = document.querySelector('.progress-container'),
progress = document.querySelector('.progress'),
audio = document.querySelector('audio'),
prevBtn = document.querySelector('#prev'),
playBtn = document.querySelector('#play'),
nextBtn = document.querySelector('#next'),
albumArt = document.querySelector('img');

let musicIndex = 0;

const music = [
    {
        title: "Leewards Sailing",
        artist: "Lee Jimmy",
        img: "album-1",
        src: "music-1"
    },    
    {
        title: "Boaz",
        artist: "Mickey S",
        img: "album-2",
        src: "music-2"
    },    
    {
        title: "Crazy, Here",
        artist: "Ikkson Peterson",
        img: "album-3",
        src: "music-3"
    },    
    {
        title: "Home Sweet Home",
        artist: "Jelly Beans",
        img: "album-4",
        src: "music-4"
    },         
    {
        title: "The Chemicals",
        artist: "Willow Wonkas",
        img: "album-5",
        src: "music-5"
    }
];

loadMusic(musicIndex);

function loadMusic(index) {
    title.innerText = music[index].title
    artist.innerText = music[index].artist
    albumArt.src = `images/${music[index].img}.jpg`
    audio.src = `music/${music[index].src}.mp3`
};

function playMusic() {
    container.classList.add('play')
    playBtn.querySelector('.fas').classList.remove('fa-play-circle')
    playBtn.querySelector('.fas').classList.add('fa-pause-circle')

    audio.play()
}

function pauseMusic() {
    container.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play-circle')
    playBtn.querySelector('i.fas').classList.remove('fa-pause-circle')

    audio.pause()
}

function prevMusic() {
    musicIndex--

    musicIndex < 0 ? musicIndex = music.length - 1 : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
}

function nextMusic() {
    musicIndex++

    musicIndex > music.length - 1 ? musicIndex = 0 : musicIndex = musicIndex
    loadMusic(musicIndex)
    playMusic()
}

function updateProgBar(e) {
    const {duration, currentTime} = e.srcElement
    const progressPer = (currentTime / duration * 100)
    progress.style.width = `${progressPer}%`
    // console.log(e.srcElement.currentTime)
}

function setProgress(e) {
    const width = this.clientWidth
    const seek = e.offsetX
    const duration = audio.duration

    audio.currentTime = (seek / width) * duration
}


// Event Listeners
playBtn.addEventListener('click', () => {
    const isMusicPlaying = container.classList.contains("play")
    isMusicPlaying ? pauseMusic() : playMusic()
})

prevBtn.addEventListener('click', prevMusic)

nextBtn.addEventListener('click', nextMusic)

audio.addEventListener('timeupdate', updateProgBar)

progContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextMusic)


// console.log();