class Jugador extends Modelo {


    constructor(img, x, y, grados, radianes) {
        super(img , x, y)

        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        this.arma = null;
        this.ataque = new Golpe(1);

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


        if(this.arma!=null) {

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
        }

        if(this.arma!=null) {
            this.arma.actualizar();
        }

        if(this.ataque!=null) {
            this.ataque.actualizar();
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

        if ( this.arma!=null) {
            if ( this.arma.puedeDisparar()) {

            this.estado = estados.disparando;

            this.arma.dispararJugador(this.x,this.y,this.grados);
        }
            //cd o no ammo
        } else {
            this.golpear();
        }

    }

    golpear() {
        if (this.ataque.puedeDisparar()) {
            this.estado = estados.golpeando;
            this.ataque.dispararJugador(this.x,this.y,this.grados);
        }
    }

    finAnimacionGolpear(){
        this.estado = estados.quieto;
                gameLayer.espacio
                    .eliminarCuerpoDinamico(gameLayer.disparosJugador[0]);
                gameLayer.disparosJugador.splice(0, 1);//TODO: puede borrar otro disparo
    }

    recojerArma(arma) {

        if(this.arma==null) {

            this.arma=arma;
            return true;
        } else {
            if(this.arma.constructor.name===arma.constructor.name) {
                this.arma.nMunicion=this.arma.nMunicion+arma.nMunicion;
                return true;
            }
        }
        return false;

    }

    soltarArma() {
        if(this.arma!=null) {

            var lanzarArma = this.arma.getLanzarArma(this.x, this.y, this.grados);
            this.arma = null;
            this.animacion=this.quieto;
            return lanzarArma;
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





        this.animacion.dibujar(this.x - scrollX, this.y - scrollY,this.grados);

    }



}
