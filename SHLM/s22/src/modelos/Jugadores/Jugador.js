class Jugador extends Modelo {


    constructor(img, x, y, grados, radianes) {
        super(img , x, y)

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        this.animacion=this.quieto;
        this.estado=estados.quieto;

        //Rotacion
        this.miraX = 0;
        this.miraY = 0;
        this.grados = grados;
        this.radianes = radianes;
    }

    actualizar(){
        this.animacion.actualizar();


        if(this.armado) {

            switch (this.estado) {

                case estados.quieto :
                    this.animacion=this.quietoP;
                    break;

                case estados.moviendo:
                    this.animacion=this.caminandoP;
                    if(this.vx==0 && this.vy==0)
                        this.estado=estados.quieto;
                    break;

                case estados.golpeando:
                    this.vx = 0;
                    this.vy = 0;
                    this.animacion=this.golpeando;
                    break;

                case estados.muriendo:
                    this.animacion=this.muriendo;
                    break;
            }

            this.tiempoDisparo= this.tiempoDisparo-aceleracion;
        } else {

            switch (this.estado) {

                case estados.quieto :
                    this.animacion=this.quieto;
                    break;

                case estados.moviendo:
                    this.animacion=this.caminando;
                    if(this.vx==0 && this.vy==0)
                        this.estado=estados.quieto;
                    break;

                case estados.golpeando:
                    this.vx = 0;
                    this.vy = 0;
                    this.animacion=this.golpeando;
                    break;

                case estados.muriendo:
                    this.animacion=this.muriendo;
                    break;
            }

            this.tiempoDisparo= this.tiempoDisparo-aceleracion;
        }


        var cat1 =  this.miraX - this.x;
        var cat2 = this.y - this.miraY;
        var hip = Math.sqrt(cat1*cat1 + cat2*cat2);
        var seno = cat2/hip;



        this.radianes = Math.asin(seno);
        var alfa = this.radianes*180/Math.PI;

        if(cat1<0){
            this.grados = 180 + alfa;
        } else {
            this.grados = 360 - alfa;
        }



    }



    moverX (direccion){
        if(this.estado!=estados.golpeando) {
            this.vx = direccion * this.velocidad * aceleracion;
            if(this.vx!=0) {
                this.estado=estados.moviendo;
            }
        }


    }

    moverY (direccion){
        if(this.estado!=estados.golpeando) {
            this.vy = direccion * this.velocidad * aceleracion;
            if(this.vy!=0) {
                this.estado=estados.moviendo;
            }}
    }

    disparar(){

        if ( this.tiempoDisparo < 0 && this.balas>0) {
            // reiniciar Cadencia
            this.estado = estados.disparando;
            this.tiempoDisparo = this.cadenciaDisparo;
            var disparo = new DisparoJugador(this.x, this.y, this.grados);
            this.balas--;
            return disparo;

        } else {
            return null;
        }

    }

    habilidad() {
        if ( this.tiempoDisparo < 0) {
            // reiniciar Cadencia
            this.estado = estados.golpeando;
            this.tiempoDisparo = this.cadenciaDisparo;
            var patada = new Patada(this.x, this.y, this.grados);
            return patada;

        } else {
            return null;
        }
    }

    finAnimacionGolpear(){
        this.estado = estados.quieto;
                gameLayer.espacio
                    .eliminarCuerpoDinamico(gameLayer.disparosJugador[0]);
                gameLayer.disparosJugador.splice(0, 1);
    }

    recojerArma() {
        this.armado=true;
        this.tiempoDisparo=0;
        this.balas=this.balas+3;

    }

    soltarArma() {
        if(this.armado==true) {
            this.armado = false;
            this.tiempoDisparo=0;
            this.balas=0;
            this.animacion=this.quieto;
            var disparoArma = new DisparoArma(this.x, this.y, this.grados);
            return disparoArma;
        } else {
            return null;
        }
    }


    finAnimacionDisparar(){
        this.estado = estados.moviendo;
    }


    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;


        var dibGrados = ((this.grados % 360 ) + 360 ) % 360;


        this.animacion.dibujar(this.x - scrollX, this.y - scrollY,dibGrados);

    }



}
