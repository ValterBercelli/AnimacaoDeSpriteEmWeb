//-----------------------------------
// VARIÁVEIS DO PERSONAGEM
//-----------------------------------
const personagem = document.getElementById("personagem");

let posX = 50;
let posY = 50;
const velocidade = 10;

let arrastando = false;
let deslocX = 0;
let deslocY = 0;


//-----------------------------------
// MANTER PERSONAGEM NA TELA
//-----------------------------------
function manterNaTela() {
    const limiteX = window.innerWidth - personagem.offsetWidth;
    const limiteY = window.innerHeight - personagem.offsetHeight;

    posX = Math.max(0, Math.min(posX, limiteX));
    posY = Math.max(0, Math.min(posY, limiteY));

    personagem.style.left = `${posX}px`;
    personagem.style.top = `${posY}px`;
}
//-----------------------------------
// MOVIMENTO PELO TECLADO
//-----------------------------------
document.addEventListener("keydown", (evento) =>
{
    switch (evento.key)
    {
        case "ArrowUp":
        case "w":
        case "W":
            posY -= velocidade;
            break;

        case "ArrowDown":
        case "s":
        case "S":
            posY += velocidade;
            break;

        case "ArrowLeft":
        case "a":
        case "A":
            posX -= velocidade;
            break;

        case "ArrowRight":
        case "d":
        case "D":
            posX += velocidade;
            break;
    }

    manterNaTela();
});

//-----------------------------------
// ARRASTAR COM O MOUSE
//-----------------------------------
personagem.addEventListener("mousedown", (evento) =>
{
    arrastando = true;
    deslocX = evento.clientX - posX;
    deslocY = evento.clientY - posY;
    personagem.style.cursor = "grabbing";
});

document.addEventListener("mouseup", () =>
{
    arrastando = false;
    personagem.style.cursor = "grab";
});

document.addEventListener("mousemove", (evento) =>
{
    if (arrastando)
    {
        posX = evento.clientX - deslocX;
        posY = evento.clientY - deslocY;
        manterNaTela();
    }
});

//-----------------------------------
// ANIMAÇÃO DO SPRITE (25 quadros, Grid 5x5)
//-----------------------------------
const totalQuadros = 25;
const colunas = 5;
const larguraQuadro = 123; // 615 / 5
const alturaQuadro = 269; // 1345 / 5
let quadroAtual = 0;

setInterval(() =>
{
    quadroAtual = (quadroAtual + 1) % totalQuadros;
    const col = quadroAtual % colunas;
    const lin = Math.floor(quadroAtual / colunas);

    personagem.style.backgroundPosition = `-${col * larguraQuadro}px -${lin * alturaQuadro}px`;
}, 1000 / 15); // 15 fps
