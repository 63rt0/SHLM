class EnemigoPistola extends Enemigo {

    constructor(x, y, grados) {
        super(imagenes.enemigo_pistola, x, y)



        this.vx = 0;
        this.vy = 0;
        this.velocidad = 0;

        this.cadenciaDisparo = 5;
        this.tiempoDisparo = 0;


        this.quieto = new Animacion(imagenes.enemigo_pistola, this.ancho, this.alto, 0,1);
        this.muriendo = new Animacion(imagenes.enemigo_muriendo_cabeza, 60, 60, 10 ,8,this.finAnimacionMorir.bind(this));
        this.animacion = this.quieto;

        //Rotacion
        this.grados = grados;
        this.radianes = grados/180*Math.PI;

        this.miraX = 1 * Math.cos(this.radianes);
        this.miraY = 1 * Math.sin(this.radianes);

        this.estado = estados.quieto;
        this.rectanguloVision = new RectanguloVision(this.x,this.y,this.grados);
    }



    actualizar (){
        this.animacion.actualizar();

        switch (this.estado) {

            case estados.quieto :
                this.animacion=this.quieto;
                if(this.rectanguloVision.colisiona(gameLayer.jugador)){
                    this.estado=estados.apuntando;
                }
                break;

            case estados.apuntando:
                this.miraX=gameLayer.jugador.x;
                this.miraY=gameLayer.jugador.y;
                var cat1 =  this.miraX - this.x;
                var cat2 = this.y - this.miraY;
                var hip = Math.sqrt(cat1*cat1 + cat2*cat2);
                var seno = cat2/hip;
                this.radianes = Math.asin(seno);
                var alfa = this.radianes*180/Math.PI;
                if(cat1<0){
                    this.grados = 180 + alfa;
                    this.radianes = this.grados/180*Math.PI;
                } else {
                    this.grados = 360 - alfa;
                    this.radianes = this.grados/180*Math.PI;
                }
                this.disparar();
                this.tiempoDisparo= this.tiempoDisparo-aceleracion;
                break;

            case estados.disparando:
                this.estado=estados.apuntando;
                break;

            case estados.muriendo:
                this.animacion=this.muriendo;
                break;
        }
    }


    disparar(){
        if ( this.tiempoDisparo < 0) {
            // reiniciar Cadencia
            this.estado = estados.disparando;
            this.tiempoDisparo = this.cadenciaDisparo;
            var disparo = new DisparoEnemigo(this.x, this.y, this.grados);
            gameLayer.disparosEnemigos.push(disparo);
            gameLayer.espacio.agregarCuerpoDinamico(disparo);

        } else {
            return null;
        }

    }


    finAnimacionMorir(){
        this.estado = estados.muerto;
    }

    impactado(){
        if ( this.estado != estados.muriendo ){
            this.estado = estados.muriendo;
            var pistola = new Pistola((this.x+10), (this.y-5));
            gameLayer.armas.push(pistola);
        }
    }




}