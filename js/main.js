$(document).bind("ready", function() {


    $(".facebook").attr("href", "http://www.facebook.com/sharer.php?u=" + encodeURIComponent("http://www.caudillosdemexico.com"));
    $(".twitter").attr("href", "https://twitter.com/share?text=Pon a prueba tus conocimientos con Banco Azteca.&url=" + encodeURIComponent("http://caudillosdemexico.com"));


    ion.sound({
        sounds: [{
            name: "button_tiny"
        }, {
            name: "success"
        }, {
            name: "fail"
        }, {
            name: "bell_ring"
        }, {
            name: "metal_plate_2"
        }],
        path: "sounds/",
        preload: true,
        volume: 1.0
    });


    preload(0, "hidalgo", 4);
    preload(1, "morelos", 4);
    preload(2, "guerrero", 4);
    preload(3, "allende", 4);
    preload(4, "iturbide", 4);
    preload(5, "josefina", 4);
    preload(6, "leona", 4);
    preload(7, "victoria", 4);
    preload(8, "pipila", 4);






    Vicky.ResizeContent();
    $(window).resize(function() {
        Vicky.ResizeContent();
    });
    //Initialize screens of the game
    initGame();
    //cargaBarraProgresoIntro(5);




    function initGame() {
        preload();
        $("#intro").hide();
        $("#instrucciones").hide();
        $("#f1_container").hide();
        $("#menu").hide();
        $("#puntuacion").hide();
        $("#intro").show();
        cargaBarraProgresoIntro(5);
    }





    $('body').on('click', '#btnSi', function() {
        Vicky.SonidoClick();
        OcultarTodosDivs();
        $("#jugar").click();

    });


    $('body').on('click', '#btnNo', function() {
        Vicky.SonidoClick();
        initGame();

    });


    $('body').on('click', '#btnSalir', function() {
        Vicky.SonidoClick();
        clearTimeout(tiempoBarra);
        clearTimeout(tiempoBarraMaster);
        OcultarTodosDivs();
        $("#intro").show();


    });

    $('body').on('click', '#btnInstrucciones', function() {
        Vicky.SonidoClick();
        clearTimeout(tiempoBarra);
        clearTimeout(tiempoBarraMaster);
        OcultarTodosDivs();
        $("#instrucciones").show();
    });




    $('body').on('click', '#pistaButt', function() {

        nextTip();

    });

    $('body').on('click', '#jugar', function() {
        Vicky.SonidoClick();
        $("#cardH").remove();
        $("#instrucciones").hide();
        $("#f1_container").show();
        $("#menu").show();
        Vicky.score = 0;
        Vicky.countHeroes = 0;
        Vicky.lives = 3;
        clearTimeout(tiempoBarra);
        clearTimeout(tiempoBarraMaster);
        //Init variables
        Vicky.InitVars(Vicky.countHeroes);

        paintLives();
        //Load View Cards
        $("#f1_container #f1_card").css("transform", "rotateY(0deg)");
        loadCard("front");

    });


});


function nextTip() {
    if (Vicky.pistas < 3) {

        $("#pista").empty();
        $("#pista").append("<span>" + Vicky.ListaPistas[Vicky.Heroe][Vicky.pistas++] + "</span>");
        $("#carta").html(Vicky.imagesHeroes[Vicky.Heroe][(Vicky.pistas - 1)]);

        if (Vicky.pistas == 3) {
            $('#pistaButt').tooltip('hide');
            $("#pistaButt").remove();
        }

    }
}
/*
function initGame() {
    $("#intro").show();
    $("#instrucciones").hide();
    $("#f1_container").hide();
    $("#menu").hide();
    $("#puntuacion").hide();
    //Load Progress bar
    cargaBarraProgresoIntro(15);
}
*/

function loadCard(clase) {


    var cadena = "<div id='cardH'>" +
        "<div class='row'>" +
        "<div class='col-xs-12 col-md-6' id='carta'></div>" +
        "<div class='col-xs-10 col-md-4'><br><span id='tiempoEsp'>15 segundos</span><div class='progress'><div class='progress-bar progress-bar-game' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%'>  </div></div></div>" +
        "<div class='col-xs-8 col-md-4 text-left oppista'><span id='lblPista'>PISTA...</span><div id='pista'></div></div>" +
        "<div class='col-xs-3 col-md-1 text-left'></div>" +
        "<div class='col-xs-10 col-md-4 opcion' id='opcion1'> <input type='radio' id ='opc' name='heroe'><label></label> </div>" +
        "<div class='col-xs-10 col-md-4 opcion' id='opcion2'> <input type='radio' name='heroe'><label></label> </div>" +
        "<div class='col-xs-10 col-md-4 opcion' id='opcion3'> <input type='radio' name='heroe'><label></label> </div>" +
        "</div></div>";

    $("." + clase).append(cadena);

    //Load Tooltip
    // $('#pistaButt').tooltip('show');

    $("#score").text(Vicky.score);
    Vicky.InitVars(Vicky.countHeroes);

    //Show tip
    $("#pista").empty();
    $("#pista").append("<span>" + Vicky.ListaPistas[Vicky.Heroe][Vicky.pistas++] + "</span>");

    $("#carta").html(Vicky.imagesHeroes[Vicky.Heroe][(Vicky.pistas - 1)]);

    for (var i = 0; i < Vicky.opciones.length; i++) {
        var opcion = parseInt(Math.round(Math.random() * (Vicky.opciones.length - 1)));
        $("#opcion" + (i + 1)).empty();
        $("#opcion" + (i + 1)).append("<input type='radio' name='heroe' value='" + Vicky.opciones[i] + "'> <label> " + Vicky.ListaHeroes[Vicky.opciones[i]] + "</label>");
    }

    //Generate radio buttons
    $('input').each(function() {
        var self = $(this),
            label = self.next(),
            label_text = label.text();

        label.remove();
        self.iCheck({
            checkboxClass: 'icheckbox_line-orange',
            radioClass: 'iradio_line-orange',
            insert: '<div class="icheck_line-icon"></div>' + label_text
        });
    });

    $('input').on('ifChecked', function(event) {
        // alert(event.type + ' callback');
        Vicky.SonidoClick();
        coreGame();

    });

    //Load bar progress
    Vicky.timer = 15;
    cargaBarraProgreso(Vicky.timer);


    // var timeout = 1000;
    // var timer;

    // timer = $.timer(timeout, function() {
    //     if (Vicky.timer > 0){
    //       timer.stop()
    //     }
    //     contador = contador - 6;
    //     $(".progress-bar").css("width", contador + "%");
    //     $("#tiempoEsp").empty();
    //     $("#tiempoEsp").text(Vicky.timer--+" segundos");
    // });

}

function nextCard() {

    //If finished lifes
    if (Vicky.lives > 0) {

        //Validate total cards
        if (Vicky.countHeroes < (Vicky.ListaHeroes.length - 1)) {


            // if (Vicky.flagAnswer) {


            // if (Vicky.countHeroes % 2 == 0) {

            //     // Vicky.InitVars(Vicky.countHeroes);

            //     $("#cardH").remove();
            //     // $("#f1_container #f1_card").css("transform", "rotateY(180deg)");
            //     loadCard("back");

            //     // $( "#cardH" ).clone().appendTo( ".back" );
            // } else {

            // Vicky.InitVars(Vicky.countHeroes);

            $("#cardH").remove();
            // $("#f1_container #f1_card").css("transform", "rotateY(0deg)");
            loadCard("front");

            // $( "#cardH" ).clone().appendTo( ".front" );
            // }

            Vicky.countHeroes++;
            // }

        } else {
            //Temina el juego muestra Puntuacion
            OcultarTodosDivs();
            $("#puntuacion").show();
            $("#resultPunt").empty();
            $("#resultPunt").append(Vicky.score);
        }
    } else {
        //Temina el juego muestra Puntuacion
        OcultarTodosDivs();
        $("#puntuacion").show();
        $("#resultPunt").empty();
        $("#resultPunt").append(Vicky.score);

    }

}


function coreGame() {

    //Get answer and evaluate
    if (Vicky.flagAnswer = LoadFieldAndEvaluate()) {
        //messageSuccess("Respuesta Correcta", 3000);
        //Show correct card
        Vicky.SonidoSuccess();
        showCorrectCard();
        messageSuccess("<span id='lblMessageCorrect' class='glyphicon glyphicon-ok'><span style=\"font-family: Arial;\"> Respuesta Correcta</span></span>", 3000);

    } else {
        //Paint message fail  
        Vicky.SonidoFail();
        clearTimeout(tiempoBarra);
        clearTimeout(tiempoBarraMaster);
        messageFail("<span id='lblMessageCorrect' class='glyphicon glyphicon-remove'><span style=\"font-family: Arial;\"> Upps, intenta de nuevo</span></span>", 3000);
        showCorrectCard();
    }


    var tiempo = setTimeout(function() {
        //OcultaDivIntro
        nextCard();
    }, 3000);

    //nextCard();

    // $("#cardH").remove();
    return false;


}

function showCorrectCard() {
    $("#carta").html(Vicky.imagesHeroes[Vicky.Heroe][3]);
}


function loadCardFinish(clase) {

}

var contador = 100;
var tiempo = 0;
var tiempoBarraMaster = 0;
var tiempoBarra = 0;


function cargaBarraProgresoIntro(t) {
    contador = 100;
    tiempo = t; // segundos
    tiempo *= 15;
    temporizador();
    tiempoBarraMaster = setTimeout(function() {
        //OcultaDivIntro
        $("#intro").hide();
        $("#instrucciones").show();
    }, t * 1000);
}

function cargaBarraProgreso(t) {
    contador = 100;
    tiempo = t; // segundos
    tiempo *= 15;
    temporizador();
    tiempoBarraMaster = setTimeout(function() {
        // OcultaDivs();
        // $("#instrucciones").show();
        // Juliette.SonidoClick();
        //$(".progress-bar").css("width", "0%");
        $("#tiempoEsp").text("0 segundos");
        coreGame();
        //alert("HOLA");
    }, t * 1000);
}

function temporizador() {
    if (contador > 0) {
        tiempoBarra = setTimeout(function() {
            contador = contador - 7;

            $(".progress-bar").css("width", contador + "%");

            // if (contador % 10 == 0) {
            $("#tiempoEsp").empty();
            $("#tiempoEsp").text(Vicky.timer--+" segundos");
            // }

            if (contador % 58 == 0 || contador % 23 == 0) {
                nextTip();
            }

            // --contador;
            temporizador();
        }, 1000);
    }
    return false;
}

function LoadFieldAndEvaluate() {

    var answerSelec = $('input[name=heroe]:checked').val();

    if (Vicky.Heroe == answerSelec && answerSelec != undefined) {
        Vicky.score = Vicky.score + 10;
        contador = 0;
        clearTimeout(tiempoBarra);
        clearTimeout(tiempoBarraMaster);
        return true;
    } else {
        Vicky.lives--;
        //Delete live in the screen
        $('#divVidas li').first().remove();
        $("input[value='" + Vicky.Heroe + "']").parent().css("background-color", "#00CE21");
        $("input[value='" + Vicky.Heroe + "']").parent().css("box-shadow", "0px 3px 1px #02AF1E");
    }



    console.log(Vicky.Heroe);
    return false;

}

function paintLives() {

    $("ul#divVidas").empty();
    for (var i = 0; i < Vicky.lives; i++) {
        $("ul#divVidas").append("<li><img class='live' src='images/Mexico.png' width='30px' style='margin: 6px'></li>");
    }

}

function OcultarTodosDivs() {
    $("#intro").hide();
    $("#instrucciones").hide();
    $("#f1_container").hide();
    $("#menu").hide();
    $("#puntuacion").hide();
}

function preload() {
    for (i = 1; i <= preload.arguments[2]; i++) {
        Vicky.imagesHeroes[preload.arguments[0]][(i - 1)] = new Image()
        Vicky.imagesHeroes[preload.arguments[0]][(i - 1)].src = "images/heroes/" + preload.arguments[1] + "" + i + ".png"
        Vicky.imagesHeroes[preload.arguments[0]][(i - 1)].width = "150";
        Vicky.imagesHeroes[preload.arguments[0]][(i - 1)].id = "heroe";

    }
}