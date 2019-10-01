
  let trump = document.getElementById('trump_r');
  let edificios = document.getElementById('edificios');
  let cielo = document.getElementById('cielo');
  let suelo = document.getElementById('suelo');
  let moneda = document.getElementById('moneda');
  let obst_container = document.getElementById('obstaculo-container');
  let mon_container = document.getElementById('moneda-container');
  let explosion = document.getElementById('explosion');
  let obst = document.getElementById('obstaculo');
  let velocidad = 1.7;
  let intervalo;
  let sonido;
  let countDown;
  let coins = new Number();
  let timer = new Number();
  let startView = document.getElementById('startView');
  let time = document.getElementById('time');
  let score = document.getElementById('score');
  document.addEventListener("DOMContentLoaded", start);

function run(){
  trump.className = "trump-run";
}

function start() {
    explosion.className = "hidden";
    let btnPlay = document.getElementById("play");
    let btnExit = document.getElementById("exit");
    btnExit.addEventListener("click", function(){
      location.href = "index.html";
    })
    btnPlay.addEventListener("click", startGame);
}

function correrAnimaciones(){
  trump.className = "trump-run";
  cielo.className = "cielo-play";
  edificios.className = "edificios_play";
  suelo.className = "suelo-play";
  mon_container.className = "moneda-container-play";
  obst_container.className = "obstaculo-play";
}

function startGame() {
  explosion.className = "hidden";
  run();
  document.getElementById("play").firstChild.data = "Restart";
  correrAnimaciones();
  detectarColision();
  console.log("Comienzo!!");
    timer = 5;
    coins = 0;
    document.addEventListener("keydown", handleKeyDown);
    startView.className = "hidden";
    countDown = setInterval( () => {
        let txtTime = "Tiempo: " + timer;
        let txtScore =  "Monedas: " + coins;
        time.innerHTML = txtTime;
        score.innerHTML = txtScore;
        if (timer > 0) {
            timer--;
            console.log(timer);
        } else {
            finishGame();
            clearInterval(countDown);
        }
    }, 1000);
}


function finishGame() {
    console.log("finish");
    document.removeEventListener("keydown", handleKeyDown);
    startView.className = "startView";
    cancelAnimationFrame(intervalo);
    clearInterval(countDown);
}

function handleKeyDown(e) {
  var teclaChar = event.code;
    if (teclaChar == "Space"){
        trump.className = "trump-jump";
        trump.addEventListener("animationend", run);
    }
}

function detectarColision(){
        let pos_a =
            {   t: trump.getBoundingClientRect().top,
                l: trump.getBoundingClientRect().left,
                r: trump.getBoundingClientRect().left + trump.getBoundingClientRect().width,
                b: trump.getBoundingClientRect().top + trump.getBoundingClientRect().height
            };
        let pos_b =
            {   t: moneda.getBoundingClientRect().top,
                l: moneda.getBoundingClientRect().left,
                r: moneda.getBoundingClientRect().left + moneda.getBoundingClientRect().width,
                b: moneda.getBoundingClientRect().top + moneda.getBoundingClientRect().height
            };
        let pos_c =
            {   t: obst.getBoundingClientRect().top,
                l: obst.getBoundingClientRect().left,
                r: obst.getBoundingClientRect().left + obst.getBoundingClientRect().width,
                b: obst.getBoundingClientRect().top + obst.getBoundingClientRect().height
            };

        if(pos_a.l <= pos_b.r && pos_a.r >= pos_b.l && pos_a.b >= pos_b.t && pos_a.t <= pos_b.b ) {
                colision_moneda();
        //         // playSound()
        }else if(pos_a.l <= pos_c.r && pos_a.r >= pos_c.l && pos_a.b >= pos_c.t && pos_a.t <= pos_c.b){
              colision_muerte();
        }
    intervalo = requestAnimationFrame(detectarColision)
}

function playSound(sonido) {
    let audio = {};
    audio["bien"] = new Audio();
    audio["bien"].src = "js/sonido/coin.mp3";
    audio["bien"].play();

}

function colision_moneda() {
    playSound();
    coins += 1;
    timer = timer + 5;
    console.log("monedas: " + coins);
    moneda.className = "hidden";
    setTimeout( () => {
        moneda.className = "moneda";
    }, 900);
    if(coins > 2 && coins <= 4){
        console.log("dif media");
        obst_container.className = "obstaculo-play-medio";
    }
    if (coins > 4) {
      console.log("dif alta");
      obst_container.className = "obstaculo-play-dificil";
    }
}

function detener_animaciones(){
  trump.className = "trump";
  cielo.className = "cielo";
  edificios.className = "edificios";
  suelo.className = "suelo";
  mon_container.className = "moneda-container";
  obst_container.className = "obstaculo-container";
}

function colision_muerte(){
  trump.className = "trump";
  cielo.className = "cielo";
  edificios.className = "edificios";
  suelo.className = "suelo";
  mon_container.className = "moneda-container";
  obst_container.className = "obstaculo-container";
  explosion.className = "explosion";
  // mostrar cartel perder
  finishGame();
  detener_animaciones();
}
