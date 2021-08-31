let listas_plataforma_web_api_url;

$(document).ready(function() {
    $('#divcargando').hide();

    resultadoConsulta(87826, 0);
});

function consulta(id = 0, anio = 0) {
    switch ("localhost"/*location.hostname*/) {
        case "localhost":
            // Para desarrollo
            listas_plataforma_web_api_url = "http://justicia:8001/listas_de_acuerdos_acuerdos?lista_de_acuerdo_id=" + id;
            break;
        case "127.0.0.1":
            // Para desarrollo
            listas_plataforma_web_api_url = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id=" + id + '&ano=' + anio;
            break;
        case "172.30.37.233":
            // Para desarrollo
            listas_plataforma_web_api_url = "http://172.30.37.233:8001/listas_de_acuerdos?autoridad_id=" + id + '&ano=' + anio;
            break;
        default:
            // Para producción
            listas_plataforma_web_api_url = "https://plataforma-web-api-dot-pjecz-268521.uc.r.appspot.com/listas_de_acuerdos?autoridad_id=" + id + '&ano=' + anio;
    }
}

function resultadoConsulta(autoridad, anio){
    consulta(autoridad, anio);

    $(".loop").html('<div class="row"><h1 class="text-center">cargando...</h1></div>');

    var cantidad = 3
    var inicio = 0;
    var final = cantidad;
    var interv = 8000;

    fetch(listas_plataforma_web_api_url)
        .then(res => res.json())
        .then(data => {

                setInterval(function(){ 

                    ciclo(inicio,final,data);
                    inicio = final;
                    final = final + cantidad;
                    

                    if(final >= Object.keys(data).length){
                        inicio = 0;
                        final = cantidad;
                    }

                },interv);
 
            }
        );
}

function ciclo(inicio, final, datos){
    $('.loop').html('');
    for(i = inicio; i < final; i++){
        print_res(datos[i]);
    }
}

function print_res(datos){
    
    $('.loop').append(`
    <div id="go" class="scroll-row">
        <div style="border-bottom: solid 4px #6f6s6f" class="row"> 
            <div style="font-size:32px;" class="col">
                <div class="row text-center pdng2" style="background-color: #eeeeee; color:#000;">
                    <div class="col-1 col-xs-3"></div>
                    <div class="col-2 col-xs-3">
                        <div class="row">
                            <div  class="col-6 col-xs-6">` + datos.id + `</div>
                            <div  class="col-6 col-xs-6">` + datos.fecha + `</div>
                        </div>
                    </div>
                    <div class="col-2 col-xs-3">` + datos.tipo_juicio + `</div>
                    <div class="col-4 col-xs-3">` + datos.actor  + `</div>
                    <div class="col-3 col-xs-3">` + datos.demandado + ` </div>
                </div> 
            </div>
        </div>
    </div>
    `);
}



