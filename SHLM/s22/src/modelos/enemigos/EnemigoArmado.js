class EnemigoArmado extends Enemigo {

    constructor(img, x, y, grados) {
        super(img, x, y)



        this.vx = 0;
        this.vy = 0;


        //Rotacion
        this.grados = grados;
        this.radianes = grados/180*Math.PI;

        this.miraX = 1 * Math.cos(this.radianes);
        this.miraY = 1 * Math.sin(this.radianes);

        this.estado = estados.quieto;
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

                if(this.arma.puedeDispararEnemigo()) {
                    this.arma.dispararEnemigo(this.x,this.y,this.grados);
                }

                this.arma.actualizar();
                break;

            case estados.disparando:
                this.estado=estados.apuntando;
                break;

            case estados.muriendo:
                this.animacion=this.muriendo;
                break;
        }
    }

    finAnimacionMorir(){
        this.estado = estados.muerto;
    }




}