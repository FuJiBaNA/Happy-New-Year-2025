  
    let countdownDate = new Date("๋Jan 1, 2025 00:00:00").getTime();


    let countdown = setInterval(function() {
      let now = new Date().getTime();
      let distance = countdownDate - now;


      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);


      document.getElementById("countdown-timer").innerHTML = days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";


      if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("countdown-timer").innerHTML = "Open Now!!";
        document.getElementById("content").style.cursor = "pointer"; 
        document.getElementById("content").style.pointerEvents = "auto";
        document.getElementById("content").onclick = function() {
          document.getElementById("countdown-timer").style.display = "none";
        };
      }
    }, 1000);