class Arma {

    constructor(nMunicion) {
        this.nMunicion=nMunicion;

    }


    puedeDisparar() {
        if ( this.enfriamiento > 0 || this.nMunicion<=0) {
            return false;
        } else {
            return true;
        }
    }

    puedeDispararEnemigo() {
        if ( this.enfriamiento > 0) {
            return false;
        } else {
            return true;
        }
    }


    agregarDisparos(disparos) {
        disparos.forEach(disparo => {
            disparo.agregarLista();
            gameLayer.espacio.agregarCuerpoDinamico(disparo);
        });
    }


    actualizar() {
        this.enfriamiento= this.enfriamiento-aceleracion;
    }

}