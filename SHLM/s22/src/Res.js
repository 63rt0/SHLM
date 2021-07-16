// Lista re recursos a precargar
var imagenes = {
    jugador : "res/jugador.png",
    jugador_caminando : "res/jugador_caminando.png",
    fondo : "res/fondo.png",
    enemigo_muerto: "res/enemigo_muerto.png",
    disparo_jugador : "res/disparo_jugador.png",
    disparo_enemigo_derecha : "res/disparo_enemigo_derecha.png",
    disparo_enemigo_izquierda : "res/disparo_enemigo_izquierda.png",
    icono_puntos : "res/icono_puntos.png",
    icono_vidas : "res/icono_vidas.png",
    icono_recolectable : "res/icono_recolectable.png",
    fondo_2 : "res/fondo_2.png",
    bloque_tierra : "res/bloque_tierra.png",
    bloque_metal : "res/bloque_metal.png",
    bloque_fondo_muro : "res/bloque_fondo_muro.png",
    copa : "res/copa.png",
    pad :"res/pad.png",
    boton_disparo : "res/boton_disparo.png",
    boton_salto : "res/boton_salto.png",
    boton_pausa : "res/boton_pausa.png",
    menu_fondo : "res/menu_fondo.png",
    boton_jugar : "res/boton_jugar.png",
    cursor : "res/cursor.png",
    bala : "res/bala.png",
    enemigo_caminando_cuchillo: "res/enemigo_caminando_cuchillo.png",
    enemigo_muriendo_cabeza: "res/enemigo_muriendo_cabeza.png",
    enemigo_atacando_cuchillo : "res/enemigo_atacando_cuchillo.png",
    enemigo_cuchillo : "res/enemigo_cuchillo.png",
    vision : "res/vision.png",
    pistola : "res/pistola.png",
    pistola_lanzada : "res/pistola_lanzada.png",
    patada : "res/patada.png",
    jugador_pistola: "res/jugador_pistola.png",
    jugador_pistola_caminando: "res/jugador_pistola_caminando.png",
    enemigo_pistola : "res/enemigo_pistola.png",
    jugador_golpeando: "res/jugador_golpeando.png",


};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

function cargarImagenes(indice){
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function(){
        if ( indice < rutasImagenes.length-1 ){
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}
