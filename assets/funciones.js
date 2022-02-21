/********************* 3 PCpsySDComercial */
function PCpsySDComercial(){
    var opt  = "<option value = 0 >Seleccione una opción</option><option value = 1>1- Propuesta</option><option value = 2>2- Demo</option><option value = 3>3- Diagnóstico</option><option value = 4>4- Apoyo para levantamiento</option><option value = 5>5- Compatibilidad APP in ZD</option>";
    return opt;
}



getValPCpsySDComercial(value){
    var html = "<select name='PCpsySDComercialFrm' class='form-control' onchage='getValPCpsySDComercial(this.value)'>";

    if(opt == 1) {
    }
    // 1- Propuesta
    if(opt == 2) {
    } 
    // 2- Demo
    if(opt == 3) {
    }
    // 3- Diagnóstico
    if(opt == 4) {

    } // 4- Apoyo para levantamiento
    if(opt == 5) {
    }
    // 5- Compatibilidad APP 

    html +=  "</select>";

    $("#trigger3Div").empty();
    $("#trigger3Div").append(html);

}*/

