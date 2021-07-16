class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.espacio = new Espacio();



        this.scrollX = 0;
        //A5
        this.scrollY = 0;
        this.bloques = [];
        this.cursor = new Cursor(ratonX,ratonY);

        this.fondo = new Fondo(imagenes.fondo_2,480*0.5,320*0.5);

        this.enemigos = [];
        this.cadaveres = [];
        this.disparosEnemigos = [];
        this.armas = [];



        this.fondoPuntos =
            new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);
        this.fondoVida =
            new Fondo(imagenes.icono_vida, 480*0.05,320*0.85);

        this.vidas = new Texto(0,480*0.07,320*0.9 );

        this.disparosJugador = [];
        this.balas = new Texto(0,480*0.9,320*0.07 );
        this.cargarMapa("res/"+nivelActual+".txt");

        document.body.style.cursor = "none";


    }

    actualizar (){
        this.espacio.actualizar();



        // Eliminar disparos sin velocidad
        for (var i=0; i < this.disparosJugador.length; i++) {
            if (this.disparosJugador[i] != null &&
                this.disparosJugador[i].vx == 0 || this.disparosJugador[i].vy == 0) {

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);
                this.disparosJugador.splice(i, 1);
            }
        }

        //Disparo Enemigo sin velocidad
        for (var i=0; i < this.disparosEnemigos.length; i++){
            if ( this.disparosEnemigos[i] != null &&
                this.disparosEnemigos[i].vx == 0 || this.disparosEnemigos[i].vy == 0){

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosEnemigos[i]);
                this.disparosEnemigos.splice(i, 1);
            }
        }

        // Enemigos muertos o fuera del juego
        for (var j=0; j < this.enemigos.length; j++){
            if ( this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto) {
                this.cadaveres.push(new Cadaver(this.enemigos[j].x,this.enemigos[j].y,this.enemigos[j].grados));
                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);

                this.enemigos.splice(j, 1);
                j = j-1;
            }
        }

        // Eliminar disparos
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosJugador[i]);

                this.disparosJugador.splice(i, 1);
                i=i-1;
            }
        }

        // Eliminar disparo enemigo
        for (var i=0; i < this.disparosEnemigos.length; i++){
            if ( this.disparosEnemigos[i] != null &&
                !this.disparosEnemigos[i].estaEnPantalla()){
                this.espacio
                    .eliminarCuerpoDinamico(this.disparosEnemigos[i]);
                this.disparosEnemigos.splice(i, 1);
                i=i-1;
            }
        }






        this.jugador.actualizar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].actualizar();
        }
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }
        for (var i=0; i < this.disparosEnemigos.length; i++) {
            this.disparosEnemigos[i].actualizar();
        }

        // Enemigo - jugador
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i]) && (this.enemigos[i].estado!=estados.muriendo && this.enemigos[i].estado!=estados.muerto)){

                this.jugador.vidas=this.jugador.vidas-1;
                this.enemigos[i].grados = this.jugador.grados;
                this.enemigos[i].radianes = this.jugador.grados/180*Math.PI;
                this.enemigos[i].impactado();
            }
        }


        // colisiones , disparoJugador - Enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.enemigos[j].estado != estados.muriendo &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.enemigos[j].grados = this.disparosJugador[i].grados;
                    this.enemigos[j].radianes = this.enemigos[j].grados/180*Math.PI;

                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    i = i-1;
                    this.enemigos[j].impactado();
                }
            }
        }

        //Disparo enemigo - jugador
        for (var i=0; i < this.disparosEnemigos.length; i++){
            if ( this.jugador.colisiona(this.disparosEnemigos[i])){
                this.jugador.vidas=this.jugador.vidas-1;

                this.espacio
                    .eliminarCuerpoDinamico(this.disparosEnemigos[i]);
                this.disparosEnemigos.splice(i, 1);
                i = i-1;
            }
        }



        this.balas.valor=this.jugador.balas;
        this.vidas.valor=this.jugador.vidas;


        if(this.jugador.vidas<=0) {
            nivelActual = 0;
            this.iniciar();//TODO: no resetea
        }


        if ( this.enemigos.length==0){
            nivelActual++;
            if (nivelActual > nivelMaximo){
                nivelActual = 0;
            }
            this.iniciar();
        }

    }

    calcularScroll(){


        // limite izquierda
        if ( this.jugador.x > 480 * 0.45) {
            if (this.jugador.x - this.scrollX < 480 * 0.45) {
                this.scrollX = this.jugador.x - 480 * 0.45;
            }
        }
        // limite derecha
        if ( this.jugador.x < this.anchoMapa - 480 * 0.45 ) {
            if (this.jugador.x - this.scrollX > 480 * 0.55) {
                this.scrollX = this.jugador.x - 480 * 0.55;
            }
        }
        //limite superior
        if ( this.jugador.y > -320 * 0.45 ) {
            if (this.jugador.y - this.scrollY < 320 * 0.45) {
                this.scrollY = this.jugador.y - 320 * 0.45;
            }
        }
        // limite inferior
        if ( this.jugador.y < this.altoMapa - 320 * 0.45 ) {
            if (this.jugador.y - this.scrollY > 320 * 0.55) {
                this.scrollY = this.jugador.y - 320 * 0.55;
            }
        }
    }


    dibujar (){
        this.calcularScroll();

        this.fondo.dibujar();

        for (var i=0; i < this.cadaveres.length; i++){
            this.cadaveres[i].dibujar(this.scrollX,this.scrollY);
        }

        for (var i=0; i < this.disparosEnemigos.length; i++){
            this.disparosEnemigos[i].dibujar(this.scrollX,this.scrollY);
        }
        for (var i=0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar(this.scrollX,this.scrollY);
            //this.enemigos[i].rectanguloVision.dibujar(this.scrollX,this.scrollY);
        }
        for (var i=0; i < this.armas.length; i++) {
            this.armas[i].dibujar(this.scrollX,this.scrollY);
        }

        for (var i=0; i < this.bloques.length; i++){
            this.bloques[i].dibujar(this.scrollX,this.scrollY);
        }

        //this.copa.dibujar(this.scrollX,this.scrollY);
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollX,this.scrollY);
        }


        this.jugador.dibujar(this.scrollX,this.scrollY);




        // HUD
        this.fondoPuntos.dibujar();
        this.balas.dibujar();
        this.cursor.dibujar();
        this.fondoVida.dibujar();
        this.vidas.dibujar();

    }





    cargarMapa(ruta){
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length-1) * 40;
            this.altoMapa = lineas.length * 40;
            for (var i = 0; i < lineas.length; i++){
                var linea = lineas[i];

                for (var j = 0; j < linea.length; j++){
                    var simbolo = linea[j];
                    var x = 40/2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo,x,y);
                }
            }
        }.bind(this);

        fichero.send(null);
    }

    cargarObjetoMapa(simbolo, x, y){
        switch(simbolo) {
            case "X":
                this.copa = new Bloque(imagenes.copa, x,y);
                this.copa.y = this.copa.y - this.copa.alto/2;
                // modificación para empezar a contar desde el suelo
                this.espacio.agregarCuerpoDinamico(this.copa);
                break;

            case "C":
                var enemigo_cuchillo = new EnemigoCuchillo(x,y,0);
                enemigo_cuchillo.y = enemigo_cuchillo.y - enemigo_cuchillo.alto/2;
                this.enemigos.push(enemigo_cuchillo);
                this.espacio.agregarCuerpoDinamico(enemigo_cuchillo);
                break;

            case "c":
                var enemigo_cuchillo = new EnemigoCuchillo(x,y,90);
                enemigo_cuchillo.y = enemigo_cuchillo.y - enemigo_cuchillo.alto/2;
                this.enemigos.push(enemigo_cuchillo);
                this.espacio.agregarCuerpoDinamico(enemigo_cuchillo);
                break;

            case "U":

                var enemigo_cuchillo = new EnemigoCuchillo(x,y,180);

                enemigo_cuchillo.y = enemigo_cuchillo.y - enemigo_cuchillo.alto/2;
                this.enemigos.push(enemigo_cuchillo);
                this.espacio.agregarCuerpoDinamico(enemigo_cuchillo);
                break;

            case "u":
                var enemigo_cuchillo = new EnemigoCuchillo(x,y,270);
                enemigo_cuchillo.y = enemigo_cuchillo.y - enemigo_cuchillo.alto/2;
                this.enemigos.push(enemigo_cuchillo);
                this.espacio.agregarCuerpoDinamico(enemigo_cuchillo);
                break;

            case "P":
                var enemigoPistola = new EnemigoPistola(x,y,0);
                enemigoPistola.y = enemigoPistola.y - enemigoPistola.alto/2;
                this.enemigos.push(enemigoPistola);
                this.espacio.agregarCuerpoDinamico(enemigoPistola);
                break;


            case "p":
                var enemigoPistola = new EnemigoPistola(x,y,90);
                enemigoPistola.y = enemigoPistola.y - enemigoPistola.alto/2;
                this.enemigos.push(enemigoPistola);
                this.espacio.agregarCuerpoDinamico(enemigoPistola);
                break;


            case "I":
                var enemigoPistola = new EnemigoPistola(x,y, 180);
                enemigoPistola.y = enemigoPistola.y - enemigoPistola.alto/2;
                this.enemigos.push(enemigoPistola);
                this.espacio.agregarCuerpoDinamico(enemigoPistola);
                break;

            case "i":
                var enemigoPistola = new EnemigoPistola(x,y,270);
                enemigoPistola.y = enemigoPistola.y - enemigoPistola.alto/2;
                this.enemigos.push(enemigoPistola);
                this.espacio.agregarCuerpoDinamico(enemigoPistola);
                break;



            case "a":
                var pistola = new Pistola(x,y);
                pistola.y = pistola.y - pistola.alto/2;
                this.armas.push(pistola);
                break;

            case "1":
                if(this.jugador==null) {
                    this.jugador = new Conchi(x, y);
                    this.jugadorNumero = 1;
                    // modificación para empezar a contar desde el suelo
                    this.jugador.y = this.jugador.y - this.jugador.alto/2;
                    this.espacio.agregarCuerpoDinamico(this.jugador);
                } else {
                    this.jugador.x = x;
                    this.jugador.y = y;
                    this.jugador.y = this.jugador.y - this.jugador.alto/2;
                    this.espacio.agregarCuerpoDinamico(this.jugador);
                }
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_metal, x,y);
                bloque.y = bloque.y - bloque.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
        }
    }

    procesarControles( ){
        // disparar
        if (controles.disparo){
            aceleracion=1;
            if(this.jugador.armado) {
                var nuevoDisparo = this.jugador.disparar();
                if ( nuevoDisparo != null ) {
                    this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                    this.disparosJugador.push(nuevoDisparo);
                }
            } else {
                var patada = this.jugador.patear();
                if ( patada != null ) {
                    this.espacio.agregarCuerpoDinamico(patada);
                    this.disparosJugador.push(patada);
                }
            }
        }

        // interactuar
        if(controles.interactuar) {
            for (var i=0; i < this.armas.length; i++) {
               if(this.jugador.colisiona(this.armas[i])) {
                   this.jugador.recojerArma();
                   this.armas.splice(i, 1);
                   break;
               }
            }
        }

        //soltar
        if(controles.soltar) {
            if(this.jugador.armado){
                var disparoArma = this.jugador.soltarArma();
                if ( disparoArma != null ) {
                    this.espacio.agregarCuerpoDinamico(disparoArma);
                    this.disparosJugador.push(disparoArma);
                }
            }
        }

        //cambiar jugador
        if(controles.cambiarConchi) {
            if(this.jugadorNumero!=1 && conchi.vidas>0) {
                this.guardarJugador();
                this.jugador=null
                this.jugador = new Conchi(jugador.x, jugador.y);//TODO: orientacion
                this.jugador.armado = conchi.armado;
                this.jugador.balas = conchi.balas;
                this.jugador.vidas = conchi.vidas;
                this.jugadorNumero = 1;
                this.espacio.agregarCuerpoDinamico(this.jugador);
            }
        }
        if(controles.cambiarCeferina) {
            if(this.jugadorNumero!=2 && ceferina.vidas>0) {
                this.guardarJugador();
                this.jugador=null
                this.jugador=new Ceferina(jugador.x, jugador.y);//TODO: orientacion
                this.jugador.armado=ceferina.armado;
                this.jugador.balas=ceferina.balas;
                this.jugador.vidas = ceferina.vidas;
                this.jugadorNumero=2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
            }
        }



        // Eje X
        if ( controles.moverX > 0 ){
            aceleracion=1;
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            aceleracion=1;
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            aceleracion=1;
            this.jugador.moverY(-1);
        } else if ( controles.moverY < 0 ){
            aceleracion=1;
            this.jugador.moverY(1);
        } else {
            this.jugador.moverY(0);

        }

    }

    procesarRaton(){
        this.jugador.miraX=ratonX+this.scrollX;
        this.jugador.miraY=ratonY+this.scrollY;

        this.cursor.x=ratonX;
        this.cursor.y=ratonY;


    }

    guardarJugador() {
        switch (this.jugadorNumero) {
            case 1:
                conchi.armado=this.jugador.armado;
                conchi.balas=this.jugador.balas;
                conchi.vidas=this.jugador.vidas;
                break;
            case 2:
                ceferina.armado=this.jugador.armado;
                ceferina.balas=this.jugador.balas;
                ceferina.vidas=this.jugador.vidas;
                break;
        }
        jugador.x=this.jugador.x;
        jugador.y=this.jugador.y;
    }


}
