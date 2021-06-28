var altura, largura, canvas, ctx, totalFrames = 0, speed;


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
    
    //cria uma interface
    ui = {
        x:0,
        y:590,
        largura:largura,
        altura:160,
      
        cor:"gray",
        desenha: function() {
            ctx.fillStyle = this.cor;
            ctx.fillRect(this.x, this.y, this.largura, this.altura);
        },
    };
    
    //cria o persoinagem do jogo
    avatar = {
            x:20,
            y:275,
            largura:64,
            altura:64,
            cor: "white",
            velocidade:0,
            booster:0,

            desenha: function(){
                ctx.fillStyle = this.cor;
                ctx.fillRect(this.x, this.y, this.largura, this.altura);
            },
            posicao:function () {
                if(this.velocidade > 5){
                    this.velocidade = 5;
                };
                if(this.velocidade < -5){
                    this.velocidade = -5;
                };

                this.y = this.y + this.velocidade;
            },
            aceleracao: function(){
                this.velocidade = this.velocidade + this.booster;
            },
            speedUp: function() {
                 /*if(this.y <= 16){
                    alert("limite superior");
                };*/
                //this.y = this.y - 32;    
                this.booster = -0.5;
                if(this.booster < -1){
                    this.booster = -1;
                }
                this.booster = this.booster - 0.25;
            },
            speedDown: function() {
               /* if(this.y >= 520){
                    alert("limite inferior");
                };*/
                //this.y = this.y + 32;
                this.booster = 0.5;
                if(this.booster > 1){
                    this.booster = 1;
                }
                this.booster = this.booster + 0.25;
            },
    };



    //fazendo os comandos arrowup e arrowdown paramexer um bloco 
    //primeiro adicionamos os movimentos verticais
    //dps uma forma do robo ficar parado estatico no lugar q o jogar quer
    
   window.addEventListener("keydown", function(event){
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (event.key) {
        case "ArrowUp": avatar.speedUp();//faz algo quando apeta seta pra cima.
            break;

        case "ArrowDown":avatar.speedDown();//faz algo quando apeta seta pra baixo.
            break;    

          default:return;   
      }

   }, true);
  
   window.addEventListener("keyup", function(event){
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (event.key) {
          
        case "ArrowUp": avatar.booster = 0;  //faz algo quando apeta seta pra cima
                       avatar.velocidade = 0;
             break;

        case "ArrowDown": avatar.booster = 0; //faz algo quando apeta seta pra baixo.
                          avatar.velocidade = 0;  
            break;    

          default:return;   
      }

   }, true);

   //inicia o game
   engine();

};

//literal engine eh oq fazer a passagem de frames
function engine() {
    atualiza();
    desenha();
    window.requestAnimationFrame(engine);
};

function atualiza() {
    //trava no topo da tela
    if(avatar.y < 0 ){
        avatar.y = 0;
    };
    //trava na base da tela a cima da UI
    if(avatar.y > ui.y - avatar.altura){
        avatar.y = ui.y - avatar.altura;
    };
    //totalFrames++;
    //adiciona aceleraçao
    avatar.aceleracao();
    //atualiza a posicao do robo
    avatar.posicao();
}

function desenha() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,largura,altura);
    ui.desenha();
    avatar.desenha();
};






main();