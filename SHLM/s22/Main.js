// Canvas y contexto del Canvas
var canvas = document.getElementById("canvas");
var contexto = canvas.getContext("2d");
var escaladoMinimo = 1;

// Controles
var controles = {};


// Capas
var layer;
var gameLayer;
var menuLayer;

var aceleracion;


// Inicio capas y bucle del juego
function iniciarJuego() {
    menuLayer = new MenuLayer();
    layer = menuLayer;

    aceleracion=1;
    setInterval(loop, 1000 / 30);
}

function decrementarAceleracion() {
    if(aceleracion>0.05) {
        aceleracion=aceleracion*0.25;
    }
}


function loop(){
    console.log("loop - ")

    layer.actualizar();




    layer.procesarControles();
    layer.procesarRaton();
    layer.dibujar();
    decrementarAceleracion();

}



// Cambio de escalado
window.addEventListener('load', resize, false);

function resize() {
    console.log("Resize")
    var escaladoAncho = parseFloat(window.innerWidth / canvas.width);
    var escaladoAlto = parseFloat(window.innerHeight / canvas.height);

    escaladoMinimo = Math.min(escaladoAncho, escaladoAlto);

    canvas.width = canvas.width*escaladoMinimo;
    canvas.height = canvas.height*escaladoMinimo;

    contexto.scale(escaladoMinimo,escaladoMinimo);
}
