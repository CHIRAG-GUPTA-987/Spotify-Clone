console.log('Welcome to Spotify');

let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let audioElement = new Audio('/songs/welcome.mp3');
let songItem = document.getElementsByClassName('songItem')
let i = 0;
let songs = [
    {
        songName: 'Dil Lutiya | Jazzy B | Romeo',
        filePath: '/songs/1.mp3',
        coverPath: '/covers/1.jpg'
    },
    {
        songName: 'Excuses | AP Dhillon | Gurinder Gill',
        filePath: '/songs/2.mp3',
        coverPath: '/covers/2.jpg'
    },
    {
        songName: 'Trending Nakhra | Amrit Maan',
        filePath: '/songs/3.mp3',
        coverPath: '/covers/3.jpg'
    },
    {
        songName: 'Kacha Badam | Bhuban Badyakar',
        filePath: '/songs/4.mp3',
        coverPath: '/covers/4.jpg'
    },
    {
        songName: 'Parindey | Sumit Goswami',
        filePath: '/songs/5.mp3',
        coverPath: '/covers/5.jpg'
    },
    {
        songName: 'Raataan Lambiyaan | Jubin Nautyal',
        filePath: '/songs/6.mp3',
        coverPath: '/covers/6.jpg'
    },
    {
        songName: 'Bulleya | Pritam Chakraborty',
        filePath: '/songs/7.mp3',
        coverPath: '/covers/7.jpg'
    },
    {
        songName: 'Ae Dil Hai Mushkil | Arjit Singh',
        filePath: '/songs/8.mp3',
        coverPath: '/covers/8.jpg'
    },
    {
        songName: 'Yaad Piya Ki Aane Lagi | Neha Kakkar',
        filePath: '/songs/9.mp3',
        coverPath: '/covers/9.jpg'
    },
    {
        songName: 'Pehle Pyaar Ka Pehla Gham | Tulsi Kumar',
        filePath: '/songs/10.mp3',
        coverPath: '/covers/10.jpg'
    }
]

for(let song of songItem){
    let aud = new Audio(`${songs[i].filePath}`)
    song.children[0].src = `${songs[i].coverPath}`
    song.children[1].innerText = `${songs[i].songName}`
    i++;
}

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songPlayit')).forEach(element => { 
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        if(songIndex !== 0){
            const mySong = document.getElementById('songN');
            mySong.innerText = `${songs[songIndex-1].songName}`;
            const currPlaying = document.getElementById(`${songIndex}`);
            currPlaying.classList.remove('fa-circle-play');
            currPlaying.classList.add('fa-circle-pause');
        }
    }
    else{
        const mySong = document.getElementById('songN');
        mySong.innerText = `Welcome to Spotify - Chirag Gupta`;
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
        makeAllPlays();
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    if(audioElement.currentTime === audioElement.duration){
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
        audioElement.src = '/songs/welcome.mp3';
        myProgressBar.value = 0;
        songIndex = 0;
        makeAllPlays();
        const mySong = document.getElementById('songN');
        mySong.innerText = `Welcome to Spotify - Chirag Gupta`;
    }
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})


Array.from(document.getElementsByClassName('songPlayit')).forEach(element => {
    element.addEventListener('click', e=>{
        songIndex = parseInt(e.target.id);
        audioElement.src = `/songs/${e.target.id}.mp3`;
        const mySong = document.getElementById('songN');
        mySong.innerText = `${songs[songIndex-1].songName}`;
        if(e.target.classList.contains('fa-circle-play')){
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
        }
        else{
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play')
            gif.style.opacity = 0;
            makeAllPlays();
        }
        let flag = true;
        if(e.target.classList.contains('fa-circle-play')){
            flag = false;
        }
        makeAllPlays();
        if(flag){
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
        }
    })
})

document.getElementById('prev').addEventListener('click', ()=>{
    makeAllPlays();
    myProgressBar.value = 0;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    if(songIndex <= 1)songIndex = 10;
    else songIndex-=1;
    const mySong = document.getElementById('songN');
    mySong.innerText = `${songs[songIndex-1].songName}`;
    audioElement.src = `/songs/${songIndex}.mp3`;
    audioElement.play();
    const currPlaying = document.getElementById(`${songIndex}`);
    currPlaying.classList.remove('fa-circle-play');
    currPlaying.classList.add('fa-circle-pause');
})

document.getElementById('upcoming').addEventListener('click', ()=>{
    makeAllPlays();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    if(songIndex === 10)songIndex = 1;
    else songIndex+=1;
    const mySong = document.getElementById('songN');
    mySong.innerText = `${songs[songIndex-1].songName}`;
    audioElement.src = `/songs/${songIndex}.mp3`;
    audioElement.play();
    const currPlaying = document.getElementById(`${songIndex}`);
    currPlaying.classList.remove('fa-circle-play');
    currPlaying.classList.add('fa-circle-pause');
})