var altura, largura, canvas, ctx;


function main(){
    //ajustando o jogo para o tamanho da tela
    largura = window.innerWidth;
    altura = window.innerHeight;
    if(largura > 1000){
        largura = 1000;
        altura = 750;
    };

    //criando o canvas 
    canvas = document.createElement("canvas");
    canvas.width = largura;
    canvas.height = altura;
    
    canvas.style.backgroundColor = "rgb(0,0,0)";
    ctx = canvas.getContext("2d");
    //importanto do canvas pro body do html
    document.body.appendChild(canvas);
    
   window.addEventListener("keydown", function(event){
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (event.key) {
        case "ArrowUp": alert("up!");//faz algo quando apeta seta pra cima.
            break;

        case "ArrowDown":alert("down!");//faz algo quando apeta seta pra baixo.
            break;    

          default:return;   
      }

   }, true);
};







main();