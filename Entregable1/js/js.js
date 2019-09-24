window.onload = function() {
  let trump = document.getElementById('trump_r');

  document.body.onkeydown = function(event){
  var teclaChar = event.code;
    if (teclaChar == "Space"){
        trump.style.animation = "jump 0.8s";
        setTimeout(run, 650);
    }
};

function run(){
  console.log("hi");
  trump.style.animation = "run 0.5s steps(6) infinite";
}

// document.body.onkeyup = function(event){
//   var teclaChar = event.code;
//     if (teclaChar == "Space"){
//
//     }
// };




}
