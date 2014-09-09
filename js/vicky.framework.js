/*

***************************************
*                                     *
*          Vicky FRAMEWORK          *
*                                     *
***************************************

*/


///Objeto principal del Framework codename: "Vicky".
var Vicky = {};

Vicky.Nivel = 1;
Vicky.VieneDe = "";
Vicky.viewport;
Vicky.header;
Vicky.pistas;
Vicky.lives = 3;
Vicky.score = 0;


Vicky.imagesHeroes = [];
Vicky.imagesHeroes[0] = new Array()
Vicky.imagesHeroes[1] = new Array()
Vicky.imagesHeroes[2] = new Array()
Vicky.imagesHeroes[3] = new Array()
Vicky.imagesHeroes[4] = new Array()
Vicky.imagesHeroes[5] = new Array()
Vicky.imagesHeroes[6] = new Array()
Vicky.imagesHeroes[7] = new Array()
Vicky.imagesHeroes[8] = new Array()


Vicky.flagAnswer;
Vicky.timer = 10;
Vicky.ListaHeroes =["Miguel Hidalgo y Costilla","Jose Maria Morelos y Pavon", "Vicente Guerrero", "Ignacio Allende", "Agustin de Iturbide", "Josefa Ortiz de Dominguez","Leona Vicario","Guadalupe Victoria","Pipila"]; 
Vicky.ListaImagenes = ["chidalgo", "cmorelos", "cguerrero","callende","citurbide","cjosefa","cleona","cvictoria","cpipila"];

Vicky.ListaPistas = [];
Vicky.ListaPistas[0] = ["Dirigente de la primera etapa de la guerra de Independencia de México.", "Siendo joven decide volverse cura por su amor a la literatura.", "A partir de la toma de Guanajuato tuvo diferencias con Allende."];
Vicky.ListaPistas[1] = ["Fue nombrado jefe de los insurgentes del sur de México", "Rechazó ser tratado como “alteza”.", "Fue acusado de traición, condenado a degradación eclesiástica y declarado hereje."];
Vicky.ListaPistas[2] = ["Fue reconocido como “Generalísimo de los Insurgentes” y el “Último de sus Caudillos”.", "Pactó el plan de Iguala, con el cual se declara la Independencia de México.", "Ingresó con sus tropas a la Ciudad de México el 27 de septiembre de 1821."];
Vicky.ListaPistas[3] = ["En 1809 forma parte de la fallida Conspiración de Valladolid.", "Planea el levantamiento de 1810 y convence a Hidalgo para que la encabece.", "Es nombrado Teniente General."];
Vicky.ListaPistas[4] = ["Fue comisionado por el virrey Apodaca para combatir al último caudillo insurgente.", "Selló la paz con el abrazo de Acatempan.", "Proclamó el plan de Iguala y formó parte del Ejército Trigarante."];
Vicky.ListaPistas[5] = ["Contrajo matrimonio con el corregidor de Querétaro a los 18 años.", "Abraza la causa de la independencia a instancias de Allende, prometido de su hija", "Se unió a los conspiradores que planificaban expulsar a los españoles."];
Vicky.ListaPistas[6] = ["Es considerada como la primera periodista del país.", "Al iniciar la Guerra se unió a los insurgentes proporcionándoles información de lo que acontecía.", "Logra fugarse después de ser encarcelada y se une a las tropas de Morelos."];
Vicky.ListaPistas[7] = ["Fue el primer presidente de la República.", "Se distinguió en su participación en el asalto de Oaxaca.", "Cambió su verdadero nombre en honor a la Virgen de Guadalupe."];
Vicky.ListaPistas[8] = ["Participa en la toma de la Alhóndiga de Granaditas.", "No hay registro oficial sobre la existencia de este personaje.", "Se cree que cargó una losa en su espalda para así llegar a la puerta de la alhóndiga e incendiarla."];
Vicky.Heroe;
Vicky.countHeroes = 0;
Vicky.opciones = new Array();

Vicky.ListaRandom;
Vicky.ListaRandomValores;
Vicky.listaUsados = new Array();


//Resultado
Vicky.Respuesta = new Array();
Vicky.Resultado;

///Método que cifra la cadena proporcionada en Base64
Vicky.CifraBase64 = function (cadena) {
    return btoa(cadena);
}
///Método que descifra la cadena proporcionada en Base64
///Devuelve un objeto indicando si ocurrió algún Error, la Excepcion que se disparó, así como la CadenaDescifrada.
Vicky.DescifraBase64 = function (cadena) {
    var cadenaDescifrada = "";
    var error = false;
    var excepcion;
    try {
        cadenaDescifrada = atob(cadena.replace("%2b/g", "+"));
    } catch (ex) {
        error = true;
        excepcion = ex;
    }

    return { Cadena: cadenaDescifrada, Error: error, Excepcion: excepcion };
}

///Método que deserializa los parámetros de la URL en un objeto
Vicky.QueryString = function () {
    var query = window.location.search.substring(1);
    return Vicky.DescifraQueryString(query);
};

///Método que deserializa los parámetros de una cadena en un objeto
Vicky.DescifraQueryString = function (query) {
    var query_string = {};
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], pair[1]];
            query_string[pair[0]] = arr;
        } else {
            query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
};


///Método que devuelve la cadena en formato #,### del número indicado
Vicky.FormatoMiles = function (numero) {
    if (numero == null) {
        return "0";
    } else {
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

///Obtiene la variable GET seleccionada como parametro.
Vicky.RequestGET = function (Parametro) {
    var URLPagina = window.location.search.substring(1);
    var GETVars = URLPagina.split('&');
    for (var i = 0; i < GETVars.length; i++) {
        var sParameterName = GETVars[i].split('=');
        if (sParameterName[0] == Parametro) {
            return sParameterName[1];
        }
    }
}

///Método que consume un servicio REST
///Recibe un objeto cuyos miembros son:
///     uri,
///     [method]->default = "GET",
///     [(Object)data]->default = null,
///     [async]->default = true,
///     (function)callback
Vicky.Ajax = function (params) {
    var uri = params.uri;
    var method = params.method;
    var data = params.data;
    var async = params.async;
    var callback = params.callback;

    if (typeof (callback) == "undefined") {
        callback({ Error: true, MensajeError: "No ha indicado la Callback", Resultado: null });
        console.log(e.message);
    }

    if (typeof (uri) == "undefined") {
        callback({ Error: true, MensajeError: "No ha indicado el URI", Resultado: null });
        console.log(e.message);
    }

    if (typeof (method) == "undefined") {
        method = "GET";
    }

    if (typeof (async) == "undefined") {
        async = true;
    }

    if (typeof (data) != "undefined") {
        data = JSON.stringify(data);
    }

    $.ajax({
        type: method,
        url: uri,
        data: data,
        async: async,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            callback({ Error: false, MensajeError: "", Resultado: result });
        },
        error: function (e) {
            callback({ Error: true, MensajeError: e.message, Resultado: null });
            console.log(e.message);
        }
    });
}


Vicky.randVisual = function (arreg, value){

    var index = parseInt(Math.round(Math.random() * 2));


    while(arreg[index] != undefined){
        index = parseInt(Math.round(Math.random() * 2));
    }


    arreg[index] = value;


}



Vicky.InitVars = function (level) {
    var Min = 1;
    Vicky.pistas = 0;
    Vicky.timer = 10;
    Vicky.flagAnswer = false;

    if (level < (Vicky.ListaHeroes.length - 1)){
    Vicky.opciones = new Array();

    var index = Vicky.numeroAleatorio();
    Vicky.Heroe = index;
    
    // alert(index);
    // Vicky.opciones.push(index);
    Vicky.randVisual(Vicky.opciones, index);

    var opcion1 = 0;
    for(;;){
        var opcion1 = parseInt(Math.round(Math.random() * (Vicky.ListaHeroes.length-1)));
        if (opcion1 != index){
            break;
        }
    }
    // alert(opcion1);
    // Vicky.opciones.push(opcion1);
    Vicky.randVisual(Vicky.opciones, opcion1);

    var opcion2 = 0;
    for(;;){
        var opcion2 = parseInt(Math.round(Math.random() * (Vicky.ListaHeroes.length-1)));
        if (opcion2 != index && opcion2 != opcion1){
            break;
        }
    }
    // Vicky.opciones.push(opcion2);
    Vicky.randVisual(Vicky.opciones, opcion2);


     }else{
        //Termina Juego muestra pantalla con puntaje
        alert("TERMINA");
        console.log("Termina");

     }


    // alert(opcion2);


    // var Max = ((Level - 1) + Min < 12 ? (Level - 1) + Min : 12);

    // Vicky.MatrizJuego = new Array();
    // for (var i = 0; i < 12; i++) {
    //     var flag = true;
    //     while (flag) {
    //         var index = parseInt(Math.round(Math.random() * Vicky.ListaUtiles.length));
    //         if ($.inArray(index, Vicky.MatrizJuego) == -1 && index < Vicky.ListaUtiles.length) {
    //             Vicky.MatrizJuego.push(index);
    //             flag = false;
    //         }
    //     }
    // }

    // Vicky.ListaRandom = new Array();
    // for (var i = 0; i < Max; i++) {
    //     var flag = true;
    //     while (flag) {
    //         var index = parseInt(Math.round(Math.random() * Vicky.ListaUtiles.length));
    //         if ($.inArray(index, Vicky.ListaRandom) == -1 && $.inArray(index, Vicky.MatrizJuego) != -1) {
    //             Vicky.ListaRandom.push(index);
    //             flag = false;
    //         }
    //     }
    // }

    // Vicky.ListaRandomValores = new Array();
    // $.each(Vicky.ListaRandom, function (index, obj) {
    //     var elementos = parseInt(Math.round(Math.random() * 2)) + 1;
    //     Vicky.ListaRandomValores.push(elementos);
    // });

    // $("#matriz tbody tr").remove();
    // $("#listaUtiles tr:not(.headerLista)").remove();

    // for (var i = 0; i < 4; i++) {
    //     var tr = document.createElement("tr");
    //     for (var j = 0; j < 3; j++) {
    //         var td = document.createElement("td");
    //         var img = document.createElement("img");
    //         img.setAttribute("src", "images/svg/" + Vicky.ListaSVG[Vicky.MatrizJuego[i * 3 + j]] + ".svg");
    //         img.setAttribute("class", "utiles");
    //         td.appendChild(img);
    //         tr.appendChild(td);
    //     }
    //     $("#matriz tbody").append(tr);
    // }

    // $("#matriz tbody td").click(function () {
    //     Vicky.SonidoClick();
    //     var divs = $(this).find("div");

    //     if (divs.length != 0) {
    //         var cantidad = 1;
    //         cantidad = parseInt(divs[0].innerHTML) + 1;
    //         $(this).find("div").remove();

    //         if (cantidad != 4) {
    //             Vicky.PintaCantidad($(this), cantidad);
    //         }
    //     } else {
    //         Vicky.PintaCantidad($(this), 1);
    //     }
    // });

    // for (i = 0; i < Vicky.ListaRandom.length; i++) {
    //     var tr = document.createElement("tr");
    //     var td1 = document.createElement("td");
    //     td1.setAttribute("class", "td1");
    //     var img = document.createElement("img");
    //     img.setAttribute("src", "images/svg/" + Vicky.ListaSVG[Vicky.ListaRandom[i]] + ".svg");
    //     td1.appendChild(img);
    //     var td2 = document.createElement("td");
    //     td2.setAttribute("class", "td2");
    //     td2.innerHTML = Vicky.ListaRandomValores[i];
    //     var td3 = document.createElement("td");
    //     td3.setAttribute("class", "td3");
    //     if (Vicky.ListaRandomValores[i] == 1) {
    //         td3.innerHTML = Vicky.ListaUtiles[Vicky.ListaRandom[i]];
    //     }
    //     else {
    //         td3.innerHTML = Vicky.ListaUtilesPlural[Vicky.ListaRandom[i]];
    //     }
    //     tr.appendChild(td1);
    //     tr.appendChild(td2);
    //     tr.appendChild(td3);
    //     $("#listaUtiles").append(tr);
    // }

    // Vicky.ResizeContent();
}


Vicky.numeroAleatorio = function(){

    
    
    var rep = true;
    var num;
    while (rep != false){
        num = parseInt(Math.round(Math.random() * (Vicky.ListaHeroes.length-1)));
        rep = Vicky.repetido(num);
    }

    Vicky.listaUsados.push(num)
    return num;

}

Vicky.repetido = function(num){
    var flag = false;
    for (var i = 0; i< Vicky.listaUsados.length; i++){
        if (num == Vicky.listaUsados[i]){
            flag = true;
        }
    }
    return flag;
}


Vicky.ResizeContent = function () {
    Vicky.height = Math.floor(window.innerHeight);
    Vicky.width = Math.floor(window.innerWidth);
    Vicky.header = Math.floor(Vicky.height * 0.1);
    Vicky.footer = Math.floor(Vicky.height * 0.1);
    Vicky.stage = Math.floor(Vicky.height * 0.8);
    Vicky.radio = Math.floor(Vicky.stage / 12);
    Vicky.fontSize = Math.floor(Vicky.height * 0.3);

    $(".pantalla").css("height", Vicky.height + "px");
    $("#instrucciones").css("width", "40%");

    $("#instrucciones thead tr").css("height", Math.floor(Vicky.height * 0.25) + ("px"));
    $("#instrucciones thead").css("text-align", "center");
    $("#instrucciones thead").css("vertical-align", "bottom");
    $(".titulo").css("font-size", Math.floor(Vicky.fontSize * 0.2) + "px");
    $("#instrucciones tbody").css("height", Math.floor(Vicky.height * 0.50) + ("px"));
    $("#instrucciones tbody tr").css("height", "25%");
    $("#instrucciones tbody td").css("font-size", Math.floor(Vicky.fontSize * 0.1) + "px");
    $("#instrucciones tbody").css("border-radius", "10px");
    $("#instrucciones tfoot td").css("height", Math.floor(Vicky.height * 0.24) + ("px"));
    $("#instrucciones tfoot td").css("vertical-align", "middle");

    $("#intro").css("width", "80%");
    $("#intro thead td").css("height", Math.floor(Vicky.height * 0.05) + ("px"));
    $("#intro thead").css("text-align", "center");
    $("#intro tbody td").css("font-size", Math.floor(Vicky.fontSize * 0.3) + "px");
    $("#intro tbody").css("height", Math.floor(Vicky.height * 0.70) + ("px"));
    $("#intro tbody td").css("font-size", Math.floor(Vicky.fontSize * 0.1) + "px");
    $("#intro tfoot td").css("height", Math.floor(Vicky.height * 0.10) + ("px"));
    $("#intro tfoot td").css("vertical-align", "middle");
}

Vicky.SonidoClick = function () {
    ion.sound.play("button_tiny");
}

Vicky.SonidoSuccess = function () {
    ion.sound.play("success");
}

Vicky.SonidoFail = function () {
    ion.sound.play("fail");
}
