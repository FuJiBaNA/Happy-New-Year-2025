var fireworksSound = new Audio('fireworks.mp3');
var songs = new Audio(); 

fireworksSound.loop = false;
songs.loop = true;

document.getElementById('box').addEventListener('click', function () {
    fireworksSound.play();


    fireworksSound.onended = function () {

        songs.src = 'song.m4a'; 
        songs.play(); 
    };
});

