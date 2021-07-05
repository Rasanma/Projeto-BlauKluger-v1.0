# Projeto-SG2D-Mecha
Apenas um projeto pessoal. Aprendendo HTML, CSS e JS.

25/06/2021 
    Começando projeto de um jogo de tiro para browser apenas para aprender mais sobre js.
    Implementei um alerta para quando pressionar arrowUp e arrowDown.
    Tudo funcionando até então.
28/06/2021
    Foi implementado o movimento vertical com um controle mais fluido e melhor 
    da posição do objeto.
    Também foi feito a limitação do espaço de movimento dele.
    Adicionado a geração de inimigos na tela.
    Agora os inimigos vão de um lado da tela até o outro e tem uma geração periodica.
30/06/2021
    Tentarei uma nova forma de atualização de updates.
    -Added nova forma de movimentação vertical(ver *NOVO COMANDO* para mais info)
    -Added tela inicial responde ao clique do mouse.
    -Added pause no meio do jogo.
    -Added lose scene quando vc perde nno jogo.
    -Added tiros da arma.

    /////////////*NOVO COMANDO*///////////////////

    Antes se usava um switch dentro da main() para fazer a movimentação vertical porém 
    o movimento do bloco avatar era travado ao se usar multikeys.
    para resolver esse problema usamos um novo metodo.

    Criamos um objeto keyState que armazena o estado da tecla "pressionado" ou "solto"
    fora da main(), para garantir seu escopo global. assim definimos dentro da engine()
    uma condição para que o bloco se movesse baseado no estado das teclas.
    o fato de estar dentro da engine aparente ser de extrema importancia uma vez
    que é ela a responsavel por atualizar a window do jogo. 
    Dessa forma o movimento do bloco aconteceria conforme o jogo atualiza retirando
    o travamento de antes.
    ////////////////////////////////////////////////////
    
5/07/2021 
    -Added eliminação de inimigos ao tocarem uma bala.
    -Added LOSE quando vc toca um inimigo.
    -Added sistema de pontuação ao abater inimigos.
    -Improvement nas scenes de PAUSE, START, LOSE.
    -Att da UI.
    -Added avatar sprite(BlauKluger).


