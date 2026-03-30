//-----------------------------------
// Variaáveis do Personagem
//-----------------------------------
const personagem = document.getElementById("personagem");

let posX = 50;
let posY = 50;
const velocidade = 10;

let arrastando = false;
let deslocX = 0;
let deslocY = 0;

//-----------------------------------
// Animação Do Sprite Do Personagem (25 quadros, Grid 5x5)
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


//-----------------------------------
// Manter personagem na Tela - (Não "estoura a tela)
//-----------------------------------
function manterNaTela()
{
    const limiteX = window.innerWidth - personagem.offsetWidth;
    const limiteY = window.innerHeight - personagem.offsetHeight;

    posX = Math.max(0, Math.min(posX, limiteX));
    posY = Math.max(0, Math.min(posY, limiteY));

    personagem.style.left = `${posX}px`;
    personagem.style.top = `${posY}px`;
}

//-----------------------------------
// Movimentação do personagem pelo teclado
//-----------------------------------
document.addEventListener("keydown", (evento) =>
{
    switch (evento.key) {
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
        case "q":
        case "Q":
            posY -= velocidade;
            posX -= velocidade;
            break;
        case "c":
        case "C":
            posY += velocidade;
            posX += velocidade;
            break;
        case "r":
        case "R":
            posY -= velocidade;
            posX += velocidade;
            break;
        case "z":
        case "Z":
            posY += velocidade;
            posX -= velocidade;
            break;

    }
    manterNaTela();
});

//-----------------------------------
// Movimentar o personagem pelo Mouse ("Arrastar")
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
    if (arrastando) {
        posX = evento.clientX - deslocX;
        posY = evento.clientY - deslocY;
        manterNaTela();
    }
});

document.querySelectorAll("#tecladoVirtual button").forEach(btn =>
{
    btn.addEventListener("touchstart", moverVirtual);
    btn.addEventListener("mousedown", moverVirtual);
});

personagem.addEventListener("touchstart", (evento) =>
{
    const toque = evento.touches[0];
    arrastando = true;
    deslocX = toque.clientX - posX;
    deslocY = toque.clientY - posY;
});

document.addEventListener("touchend", () =>
{
    arrastando = false;
});

document.addEventListener("touchmove", (evento) =>
{
    if (arrastando) {
        const toque = evento.touches[0];
        posX = toque.clientX - deslocX;
        posY = toque.clientY - deslocY;
        manterNaTela();
    }
});

document.querySelectorAll("#tecladoVirtual button").forEach(btn =>
{
    btn.addEventListener("touchstart", moverVirtual);
    btn.addEventListener("mousedown", moverVirtual);
});

function moverVirtual(e)
{
    const dir = e.target.dataset.dir;

    switch (dir) {
        case "up":
            posY -= velocidade;
            break;
        case "down":
            posY += velocidade;
            break;
        case "left":
            posX -= velocidade;
            break;
        case "right":
            posX += velocidade;
            break;

        // DIAGONAIS
        case "up-left":
            posY -= velocidade;
            posX -= velocidade;
            break;
        case "up-right":
            posY -= velocidade;
            posX += velocidade;
            break;
        case "down-left":
            posY += velocidade;
            posX -= velocidade;
            break;
        case "down-right":
            posY += velocidade;
            posX += velocidade;
            break;
    }

    manterNaTela();
}