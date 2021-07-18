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


    disparar(balas){
        this.enfriamiento = this.cadencia;
        this.nMunicion = this.nMunicion-1;

        balas.forEach(bala => gameLayer.disparosEnemigos.push(bala));
        balas.forEach(bala => gameLayer.espacio.agregarCuerpoDinamico(bala));
    }


    actualizar() {
        this.enfriamiento= this.enfriamiento-aceleracion;
    }

}