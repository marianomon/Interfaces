document.querySelector('.figura').addEventListener("click", function(){
  let figura = document.querySelector('.figura');
  let numero = Math.random()*3 +1;
  numero = Math.floor(numero);
  console.log(numero);
  figura.classList.remove("jump");
  figura.classList.remove("rotate");
  figura.classList.remove("trans");
  switch (numero) {
    case 1: figura.className += " jump";
      break;
    case 2: figura.className += " rotate";
      break;
    case 3: figura.className += " trans";
      break;
    default:

  }
});
