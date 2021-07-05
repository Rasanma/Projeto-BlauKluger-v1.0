var altura, largura, canvas, ctx, totalFrames = 0, keyState = {},
    gameStates = {
        start:0,
        play:1,
        lose:2,
        pause:3
    },
    actualState, score = 0, maxScore = 0, actualScore = 0, blau = document.getElementById("blau");
//função generica para desenho
function  desenhaObj(){
    ctx.fillStyle = this.cor;
    ctx.fillRect(this.x, this.y, this.largura, this.altura);
}


function main(){
    //ajustando o jogo para o tamanho da tela
    largura = window.innerWidth;
    altura = window.innerHeight;
    if(largura > 1000){
        largura = 1000;
        altura = 750;
    };

    //criando o canvas 
    { 
   canvas = document.createElement("canvas");
    canvas.width = largura;
    canvas.height = altura;
    canvas.style.backgroundColor = "rgb(0,0,0)";
    ctx = canvas.getContext("2d");

    //importanto do canvas pro body do html
    document.body.appendChild(canvas);
    }
    //cria uma interface
    ui = {
        x:0,
        y:590,
        largura:largura,
        altura:160,
        cor:"gray",
        desenha: desenhaObj,
        score: function() {
            ctx.fillStyle = "white";
            ctx.font = "80px Arial";
            ctx.fillText("Points " + score, 490, 680);
        }
         };
    
    //cria o personagem do jogo
    avatar = {
            x:20,
            y:275,
            largura:32,
            altura:64,
            cor: "black",
            velocidade:0,
            booster:0,
            sprite:function() {
                ctx.drawImage(blau,this.x, this.y);
            },
            desenha: desenhaObj,

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

                this.booster = -5;
                if(this.booster < -10){
                    this.booster = -10;
                }
                this.booster = this.booster - 2.5;
            },
            speedDown: function() {
               /* if(this.y >= 520){
                    alert("limite inferior");
                };*/
                //this.y = this.y + 32;

                this.booster = 5;
                if(this.booster > 10){
                    this.booster = 10;
                }
                this.booster = this.booster + 2.5;
            },
    };
    //tiros da arma
     bullet = {
                bullets:[],
                color: "yellow",
                timer:0,
                generate:function() {
                    this.bullets.push(
                        {
                            x:avatar.x,
                            y:avatar.y +35,
                            altura: 10,
                            largura: 20,
                            cor: this.color,
                        }); 
                        bullet.timer = 30;
                },
                spam:function () {
                    if(this.timer == 0){
                        bullet.generate();
                    }
                    this.timer--;
                },

                desenha: function () {
                    for (let i = 0; i < this.bullets.length; i++) {
                            ctx.fillStyle = this.bullets[i].cor;
                            ctx.fillRect(this.bullets[i].x, this.bullets[i].y, this.bullets[i].largura, this.bullets[i].altura);  
                    };
                },
                bulletTrack:function () {
                    for (let i = 0; i < this.bullets.length; i++) {
                        this.bullets[i].x = this.bullets[i].x + 4;
                        if(this.bullets[i].x > largura){
                            this.bullets.splice(i,1);
                        }                          
                    }
                }
            };
    //Tela inicial
    startScene = {
                x:largura/2 - 200,
                y:altura/2 - 300,
                largura:400,
                altura:600,
                cor:"gray",
                desenha: desenhaObj,
                border: function() {
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = "brown";
                    ctx.strokeRect(this.x,this.y, this.largura, this.altura);
                },
                txt:function () {
                    ctx.fillStyle = "white";
                    ctx.font = "80px Arial";
                    ctx.fillText("START", 370, 300);  
                },

    };
    //Pause
    pauseScene = {
                x:largura/2 - 200,
                y:altura/2 - 200,
                largura:400,
                altura:200,
                cor:"gray",
                desenha: function() {
                    ctx.fillStyle = "white";
                    ctx.font = "80px Arial";
                    ctx.fillText("PAUSED", 350, 300);  
                }
    };
    //lose 
    loseScene = {
        desenha: function() {
            ctx.fillStyle = "white";
        ctx.font = "80px Arial";
        ctx.fillText(actualScore, 400, 300);  
        if(actualScore >= maxScore){
            ctx.fillText("NEW RECORD!!!", 150, 150);
        }
        else{
        ctx.fillText("Record!!",300, 150);}
        }       
    }
    //reinicia os inimigos
    clear = () => {
       enemy.enemy_type=[];
       bullet.bullets=[];     
    };
    //cria os inimigos
    enemy = {
        enemy_type:[], //um vetor que vai guardar os varios tipos de inimigos
                       //ajuda a fazer o controle de entrada e saida de elementos  
        cores:["#ac0000","#003500"],
        timer:0,

        generate:function() {
            enemy.enemy_type.push(
                {//objeto que vai representar o inimigo criado
                    x:largura - 20,
                    y:Math.floor(400 * Math.random()),
                    altura:64,
                    largura:64,
                    cor:this.cores[Math.floor(2 * Math.random())]
                }); //cria um novo inimigo no vetor enemy_type
                enemy.timer = 100; //define tempo de spam.
        },
        spam:function() {
            if(enemy.timer === 0){
                enemy.generate();
            }
            else{
                enemy.timer--;
            }
        },

        desenha:function() {
            for(var i=0; i < enemy.enemy_type.length ; i++){
                    ctx.fillStyle = enemy.enemy_type[i].cor;
                    ctx.fillRect(enemy.enemy_type[i].x, enemy.enemy_type[i].y, enemy.enemy_type[i].altura, enemy.enemy_type[i].largura);
            };
        },
        enemy_position:function() {
                
                for(var i = 0; i < enemy.enemy_type.length; i++){
                        enemy.enemy_type[i].x = enemy.enemy_type[i].x -3;  

                    //lose
                    if(avatar.x + avatar.largura >= enemy.enemy_type[i].x &&
                        avatar.y + avatar.altura > enemy.enemy_type[i].y &&
                        avatar.y < enemy.enemy_type[i].y + enemy.enemy_type[i].altura)
                        {
                            actualState = gameStates.lose;
                            if(score >= maxScore){
                            maxScore = score;
                            }
                            actualScore = score;
                        };

                        if(enemy.enemy_type[i].x <= -enemy.enemy_type[i].largura){
                    enemy.enemy_type.splice(i, 1);
                    };    
                };
                //colission bullet
                                for(var j = 0; j < bullet.bullets.length - 1; j++){
                                        var bala =  bullet.bullets 
                                        for(var i = 0; i < enemy.enemy_type.length; i++){   
                                        if (bala[j].x + bala[j].largura > enemy.enemy_type[i].x &&
                                            bala[j].y + bala[j].altura > enemy.enemy_type[i].y &&
                                            bala[j].y < enemy.enemy_type[i].y + enemy.enemy_type[i].altura)
                                            {   
                                                enemy.enemy_type.splice(i, 1);
                                                bala.splice(j, 1);
                                                score++;
                                            }
                                           } 
                                    }; 
            } 
    };

    //fazendo os comandos arrowup e arrowdown paramexer um bloco(antigo)  
{
 /*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  
    ANTIGA FORMA DE FAZER OS COMANDOS DE MOVIMENTO
 window.addEventListener("keydown", function(event){
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }

      switch (event.key) {
        case "ArrowUp":avatar.speedUp();
                         //faz algo quando apeta seta pra cima.
            break;

        case "ArrowDown":avatar.speedDown();
                           //faz algo quando apeta seta pra baixo.
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

   }, true);\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/
}

   //seta o game state pra start, tela inicial
   actualState = gameStates.start;

   addEventListener('click',function (){
       if(actualState == gameStates.start){
           actualState = gameStates.play;
        };
       if(actualState == gameStates.lose){
           actualState = gameStates.start;
       }; 
   })

   //inicia o game
   engine();

};

//setup para o novo comando de teclas
window.addEventListener('keydown',function(e){
    keyState[e.key] = true;
},true);

window.addEventListener('keyup',function(e){
    keyState[e.key] = false;
},true);


//literal engine eh oq fazer a passagem de frames
function engine() {
    
    if(actualState == gameStates.play){
    //novo comando de movimento
    avatar.velocidade = 0;
    avatar.booster = 0;
    if(keyState["w"] || keyState["ArrowUp"]){
        avatar.speedUp();
    };

    if(keyState["s"] || keyState["ArrowDown"]){
        avatar.speedDown();
    };
    atualiza();
    };
    if(keyState["Escape"]){
        actualState = gameStates.pause;
    };
    if(keyState["Enter"] && actualState == gameStates.pause){
            actualState = gameStates.play;
        };
    if(keyState["Enter"] && actualState == gameStates.lose){
        actualState = gameStates.start;
    };
   if(actualState == gameStates.lose){
        clear();
        score = 0;
   };
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
    //adiciona aceleraçao
    avatar.aceleracao();
    //atualiza a posicao do robo
    avatar.posicao();
    //spam de inimigos
    enemy.spam();
    //atualizar a posiçao do enemy
    enemy.enemy_position();
    //atira a arma
    bullet.spam();
    //atualiza posição da bala
    bullet.bulletTrack();
}

function desenha() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,largura,altura);

    if(actualState == gameStates.play){
        ui.desenha();
        enemy.desenha();
        bullet.desenha();
        avatar.desenha(); 
        avatar.sprite(); 
        ui.score();
    };
    if(actualState == gameStates.start){
        startScene.desenha();
        startScene.border();
        startScene.txt();
        avatar.sprite(); 
        avatar.y = 275;
    };
    if(actualState == gameStates.pause){
        ui.desenha();
        enemy.desenha();
        bullet.desenha();
        avatar.desenha();
        avatar.sprite(); 
        pauseScene.desenha();
        ui.score();
    };
    if(actualState == gameStates.lose){
        ui.desenha();
        enemy.desenha();
        avatar.desenha();
        avatar.sprite(); 
        loseScene.desenha();
    };
};







main();
