/* MEMORY.JS
NOMBRE PROYECTO: MEMORY GAME
DESARROLLADOR: SANTIAGO BETANCUR GRACIANO
FECHA ÚLTIMA MODIFICACIÓN: 24/08/20
*/

//DECLARACIÓN DE VARIABLES
var encabezado = document.querySelector("h1");
console.log(encabezado);


var lista1 = ["💜", "⚽", "🌎", "🐶", "🐱", "🚆", "✈️"]

var lista2 = ["☀️", "🌙", "👽", "🍉", "🌈", "💧", "🌴"]

var cartas1 = lista1.concat(lista2);
var cartas2 = lista2.concat(lista1);

var totalCartas = cartas1.concat(cartas2);

var movimientos = 0;


//FUNCIONES BARAJAR Y REPARTIR
function barajea() {
    var resultado;
    resultado = totalCartas.sort(function() {
        return 0.5 - Math.random() * 10;
    });
    return resultado;
}

function repartirCartas() {
    var mesa = document.querySelector("#mesa")
    var barajaNueva = barajea();
    mesa.innerHTML = "";

    totalCartas.forEach(function(elemento) {

        var carta = document.createElement("div");
        mesa.appendChild(carta);
        carta.innerHTML = "<div class='carta' data-valor=''" +
            elemento + ">" +
            "<div class='contenido'>" +
            elemento +
            "</div>" +
            "</div>";;

    })
}


//FUNCIONES DESCUBRIR Y COMPARAR
function descubrirCartas() {
    var cartasDescubiertas;
    var totalDescubiertas = document.querySelectorAll(".descubierta:not(.acertada)");
    var cartasPendientes;

    if (totalDescubiertas.length > 1) {
        return;
    }

    this.classList.add("descubierta");

    cartasDescubiertas = document.querySelectorAll(".descubierta:not(.acertada");
    if (cartasDescubiertas.length < 2) {
        return;
    }
    comparacion(cartasDescubiertas);
    contadorMovimientos();
    cartasPendientes = document.getElementsByClassName(".carta:not(.acertada")
    if (cartasPendientes.length === 0) {
        setTimeout(finalizando, 1000);
        finalizando();
    }
}

function comparacion(cartasAComparar) {
    carta1 = cartasAComparar[0].textContent;
    carta2 = cartasAComparar[1].textContent;

    if (carta1 === carta2) {
        acierto(cartasAComparar);
    } else {
        fallo(cartasAComparar);
    }
}


//FUNCIONES ACIERTO Y FALLO
function acierto(cartasA) {
    cartasA.forEach(function(elemento) {
        elemento.classList.add("acertada");
    });
}

function fallo(cartasF) {
    cartasF.forEach(function(elemento) {
        elemento.classList.add("fallo");
    });
    setTimeout(function() {
        cartasF.forEach(function(elemento) {
            elemento.classList.remove("descubierta");
            elemento.classList.remove("fallo");
        });
    }, 1000);

}


//INICIAR SCRIPT
function iniciando() {
    var movimientos = 0;
    repartirCartas();

    document.querySelectorAll(".carta").forEach(function(elemento) {
        elemento.addEventListener("click", descubrirCartas);
    });

    iniciarCronometro();
}
iniciando();
document.getElementById("reiniciar").addEventListener("click", iniciando);



//CRONÓMETRO
function iniciarCronometro() {
    var segundos = 59;
    var minutos = 2;
    var segundosTexto;
    var minutosTexto;
    var cronometro;

    function actualizarContador() {
        segundos = segundos - 1;
        if (segundos < 0) {
            segundos = 59;
            minutos = minutos - 1;
        }
        if (minutos < 0) {
            segundos = 0;
            minutos = 0;
            clearInterval(cronometro);
            document.write("OH OH... SE ACABÓ EL TIEMPO");
        }

        segundosTexto = segundos;
        minutosTexto = minutos;
        if (segundos < 10) {
            segundosTexto = "0" + segundos;
        }
        if (minutos < 10) {
            minutosTexto = "0" + minutos;
        }
        document.querySelector("#segundos").innerText = segundosTexto;
        document.querySelector("#minutos").innerText = minutosTexto
    }
    cronometro = setInterval(actualizarContador, 1000);
}


//CONTADOR DE MOVIMIENTOS
function contadorMovimientos() {
    var movimientosTexto;
    movimientos++;
    movimientosTexto = movimientos;

    if (movimientos < 10) {
        movimientosTexto = "0" + movimientos;
    }
    document.querySelector("#realizados").innerHTML = movimientosTexto;
}


//FINALIZAR EL JUEGO
function finalizando() {
    document.getElementById("feedback").classList.add("visible");
    alert("FELICIDADES!!");
}