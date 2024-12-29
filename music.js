
var fireworksSound = new Audio('fireworks.mp3');


fireworksSound.loop = false;


document.getElementById('box').addEventListener('click', function() {
    fireworksSound.play(); 

    fireworksSound.onended = function() {
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/6wHOeCUhEnk?autoplay=1&loop=1&playlist=6wHOeCUhEnk';
        iframe.allow = 'autoplay';
        document.body.appendChild(iframe);
    };
    

});


