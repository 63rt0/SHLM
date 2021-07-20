
// Raton
var ratonX;
var ratonY;

var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;

var entradas = {}; // tipos
entradas.pulsaciones = 1;
entradas.teclado = 2;
entradas.gamepad = 3;
var entrada = entradas.pulsaciones;


var nivelActual = 0;
var nivelMaximo = 4;


var estados = {};
estados.quieto= 2;
estados.moviendo = 3;
estados.muriendo = 4;
estados.muerto = 5;
estados.disparando = 6;
estados.impactado = 7;
estados.golpeando = 8;
estados.apuntando = 9;

var orientaciones = {};
orientaciones.derecha = 2;
orientaciones.izquierda = 3;



var jugador = {};
jugador.x;
jugador.y;
jugador.grados;
jugador.radianes;

var conchi = {};
conchi.arma = null;
conchi.vidas = 2;

var ceferina = {};
ceferina.arma = null;
ceferina.vidas = 3;