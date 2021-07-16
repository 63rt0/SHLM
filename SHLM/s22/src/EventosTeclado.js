var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown( event) {
    entrada = entradas.teclado;

    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if ( posicion == -1 ) {
        teclas.push(event.keyCode);
        switch ( event.keyCode ){
            case 32:    //Barra espàciadora
                controles.disparo = true;
                break;
            case 83://S
                controles.moverY = -1;
                break;
            case 87://W
                controles.moverY = 1;
                break;
            case 68://D
                controles.moverX = 1;
                break;
            case 65://A
                controles.moverX = -1;
                break;
            case 69://E
                controles.interactuar = true;
                break;

            case 49://1
                controles.cambiarConchi = true;
                break;

            case 50://2
                controles.cambiarCeferina = true;
                break;

            case 81://Q
                controles.soltar = true;
                break;

            case 13://Intro
                controles.continuar = true;
                break;
        }

    }

}

function onKeyUp( event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice( posicion, 1);
    switch ( event.keyCode ){
        case 32:
            controles.disparo = false;
            break;
        case 83:
            if ( controles.moverY == -1 ){
                controles.moverY = 0;
            }
            break;
        case 87:
            if ( controles.moverY == 1 ){
                controles.moverY = 0;
            }
            break;
        case 68:
            if ( controles.moverX == 1 ){
                controles.moverX = 0;
            }
            break;
        case 65:
            if ( controles.moverX == -1 ){
                controles.moverX = 0;
            }
            break;
        case 69://E
            controles.interactuar = false;
            break;

        case 49://1
            controles.cambiarConchi = false;
            break;

        case 50://2
            controles.cambiarCeferina = false;
            break;

        case 81://Q
            controles.soltar = false;
            break;


        case 13://Intro
            controles.continuar = false;
            break;
    }

}
