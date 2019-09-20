window.onload = function() {
  var trump = document.getElementById('trump_corr');
  window.addEventListener('mousemove', function(event){
    let x = event.clientX;
    let y = event.clientY;
    x = x-300;
    y = y -300;
    console.log(x + "px" + y + "px");
    trump.style.left = x + 'px';
    trump.style.top = y + "px";
  });
};
