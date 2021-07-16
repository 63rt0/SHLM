// Lista re recursos a precargar
var imagenes = {
    fondo : "res/fondo.png",
    enemigo_muerto: "res/enemigo_muerto.png",
    icono_puntos : "res/icono_puntos.png",
    icono_vida: "res/vida.png",
    bloque_metal : "res/bloque_metal.png",
    fondo_2 : "res/fondo_2.png",
    menu_fondo : "res/menu_fondo.png",
    boton_jugar : "res/boton_jugar.png",
    cursor : "res/cursor.png",
    bala_enemigo : "res/bala_enemigo.png",
    bala_jugador : "res/bala_jugador.png",
    enemigo_muriendo_cabeza: "res/enemigo_muriendo_cabeza.png",
    enemigo_pistola : "res/enemigo_pistola.png",
    enemigo_cuchillo : "res/enemigo_cuchillo.png",
    enemigo_caminando_cuchillo: "res/enemigo_caminando_cuchillo.png",
    vision : "res/vision.png",
    pistola : "res/pistola.png",
    pistola_lanzada : "res/pistola_lanzada.png",
    patada : "res/patada.png",
    ceferina:"res/ceferina.png",
    ceferina_caminando:"res/ceferina_caminando.png",
    ceferina_golpeando:"res/ceferina_golpeando.png",
    ceferina_pistola:"res/ceferina_pistola.png",
    ceferina_pistola_caminando:"res/ceferina_pistola_caminando.png",
    conchi:"res/conchi.png",
    conchi_caminando:"res/conchi_caminando.png",
    conchi_golpeando:"res/conchi_golpeando.png",
    conchi_pistola:"res/conchi_pistola.png",
    conchi_pistola_caminando:"res/conchi_pistola_caminando.png"

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
