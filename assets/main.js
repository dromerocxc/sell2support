$(function (){  
   var client = ZAFClient.init();  
   client.invoke('resize', { width: '100%', height: '450px' });
   client.get('deal.contact').then(function(data){
        $("#contacto").val(data['deal.contact'].name);    
       })
   let PromiseContact = new Promise((resolve, reject) => {
        let a;
        a = client.get('deal').then(function(data){
            return(data); // ¡Todo salió bien!
        });
        if(a){
            resolve(a);
        } 
        else {
        reject(false);}});
    PromiseContact.then((successMessage) => {
        $("#nombre_trato").val(successMessage.deal.name); //NOMBRE DEL TRATO PARA EL REPORTE (OPTIMIZAR)
        cuenta_ticket(successMessage.deal.name);
    });
client.context().then(function(context) {
            var request = context.currentUser.email;  
            var opt;
            var tag_opt;
            $("#1500015625741").on('change', function() {
                console.log('val ' + this.value);
                $("#form_general").show();
                $("#propuestas").hide();
                $("#demo").hide();
                $("#diagnostico").hide();
                $("#apoyo").hide();
                $("#compatibilidad").hide();
                if(this.value == 1){
                    tag_opt = 'propuesta';
                    $("#propuestas").show();}
                if(this.value == 2){
                    tag_opt = 'demo';
                    $("#demo").show();}
                if(this.value == 3){
                    tag_opt = 'diagnostico';
                    $("#diagnostico").show();}
                if(this.value == 4){
                    tag_opt = 'apoyo_para_levantamiento';                    
                    $("#apoyo").show();}
                if(this.value == 5){
                    tag_opt = 'compatibilidad_app';                    
                    $("#compatibilidad").show();}
                opt = this.value;
        })   
        $("#actionbtna").on('click', function(){
           client.get("deal.name").then(function(data) 
                { 
                //console.log(data);
                //console.log(data["deal.name"]);
                $("#trato").val(data['deal.name']); //NOMBRE DEL TRATO PARA EL TICKET (OPTIMIZAR)     
                f_btn(opt, client, request, data["deal.name"], tag_opt);
                })
        })
    });
});


function cuenta_ticket(name){
    let PromiseCount = new Promise((resolve, reject) => {
       var client = ZAFClient.init();
       requestSetting = {
            url: "https://slscxc1568216011.zendesk.com/api/v2/search.json?query="+name,
            headers: {"Authorization": "Basic "+btoa('dromero@cxc.mx:21Claudia21!*')},
            secure: true,
            cors: true,
            type: "GET",
            dataType: 'json'
          };  
       client.request(requestSetting).then((data) => {
            let count = 0;
            data.results.forEach(function(value, index){
               count ++;
            })
            solicitudes(count);
        });
    });
}


function f_btn(opt, client, request, trato, tag_opt){
    /*console.log("TRATO: " + trato);
    console.log('este es el contacto: ' + $("#contacto").val());
    console.log('este es el tag: ' + tag_opt);*/
    var campos;
    var data;
    var obser = $('#obser').val();
    if(opt == 1){
        data = JSON.stringify({"ticket": {"subject": "Propuesta s2s para el trato.: "+trato+" del contacto.: "+$("#contacto").val(),"tags":["s2s", "s2s-propuesta"],"comment":{ "body": "Notas.: " +obser },"requester": { "email": request },"custom_fields": [{"id": 1500015625741, "value": tag_opt},{"id": 1500015626001, "value": $('#1500015626001').val()},{"id": 1900007276365, "value": $('#1900007276365').val()},{"id": 1500015680862, "value": $('#1500015680862').val()},{"id": 1900007274885, "value": $('#1900007274885').val()}]}});
        $('#1500015626001').val(0); 
        $('#1900007276365').val(0);
        $('#1500015680862').val('');
        $('#1900007274885').val('');
        $("#propuestas").hide();    
    }
    if(opt == 2){
        data = JSON.stringify({"ticket": {"subject": "Demo s2s para el trato.: "+trato+" del contacto.: "+$("#contacto").val(),"tags":["s2s", "s2s-demo"],"comment":{ "body": "Notas.: " +obser },"requester": { "email": request },"custom_fields": [{"id": 1500015625741, "value": tag_opt},{"id": 1500015626221, "value": $('#1500015626221').val()},{"id": 1500015682942, "value": $('#1500015682942').val()},{"id": 1500015626801, "value": $('#1500015626801').val()}]}});
        $('#1500015626221').val(0); 
        $('#1500015682942').val(0); 
        $('#1500015626801').val('');  
        $("#demo").hide();    
    }
    if(opt == 3){
       data = JSON.stringify({"ticket": {"subject": "Diagnóstico s2s para el trato.: "+trato+" del contacto.: "+$("#contacto").val(),"tags":["s2s", "s2s-Diagnostico"],"comment":{ "body": "Notas.: " +obser },"requester": { "email": request },"custom_fields": [{"id": 1500015625741, "value": tag_opt},{"id": 1500015683082, "value": $('#1500015683082').val()},{"id": 1900007277085, "value": $('#1900007277085').val()}, {"id": 1500015626281, "value": $('#1500015626281').val()}, {"id": 1500015626301, "value": $('#1500015626301').val()}]}});
       $('#1500015683082').val(0);
       $('#1900007277085').val('');
       $('#1500015626281').val('');
       $('#1500015626301').val('');
       $("#diagnostico").hide();    
    }
    if(opt == 4){
       data = JSON.stringify({"ticket": {"subject": "Apoyo para levantamiento s2s para el trato.: "+trato+" del contacto.: "+$("#contacto").val(),"tags":["s2s", "s2s-Apoyo-para-levantamiento"],"comment":{ "body": "Notas.: " +obser },"requester": { "email": request },"custom_fields": [{"id": 1500015625741, "value": tag_opt},{"id": 1500015626841, "value": $('#1500015626841').val()},{"id": 1500015683522, "value": $('#1500015683522').val()}]}});
       $("#1500015626841").val('');
       $("#1500015683522").val('');
       $("#apoyo").hide();    
    }
    if(opt == 5){
        data = JSON.stringify({"ticket": {"subject": "Compatibilidad s2s para el trato.: "+trato+" del contacto.: "+$("#contacto").val(),"tags":["s2s", "s2s-Compatibilidad"],"comment":{ "body": "Notas.: " +obser },"requester": { "email": request },"custom_fields": [{"id": 1500015625741, "value": tag_opt},{"id": 1900007536365, "value": $('#1900007536365').val()}]}});
        $("#1900007536365").val('');
        $("#compatibilidad").hide();    
    }
    $("#principal").val(0);
    $("#form_general").hide();
    setTimeout(showTooltip, 2000)
    //console.log(data);
      requestSetting = {
      url: "https://slscxc1568216011.zendesk.com/api/v2/tickets.json",
      contentType: "application/json",
      headers: {"Authorization": "Basic "+btoa('dromero@cxc.mx:21Claudia21!*')},
      secure: true,
      cors: true,
      type: "POST",
      dataType: 'json',
      data: data
  };
    client.request(requestSetting).then((data) => {
      //console.log(data);
    });
}

function solicitudes(tipo){
    $("#solicitudes").show(1000);
    //$("#menu_solicitudes").show(2000);
    $("#bodytable").empty();
   var htmlstatus = "<span class='badge badge-warning'>??</span>";
   if(tipo >= 1) {
           var client = ZAFClient.init();
           var criterio;
           client.context().then(function(context) {
           $("#contacto_subject").append('Tickets de este trato.: <b>'+$("#nombre_trato").val()+'</b>');
           requestSetting = {
                url: "https://slscxc1568216011.zendesk.com/api/v2/search.json?query="+$("#nombre_trato").val(),
                contentType: "application/json",
                headers: {"Authorization": "Basic "+btoa('dromero@cxc.mx:21Claudia21!*')},
                secure: true,
                cors: true,
                type: "GET",
                dataType: 'json'
              };
            client.request(requestSetting).then((data) => {
                       var tipificacion;
                       var funtipo;
                       var funstring = ''; 
                      $("#tlWaiting").hide(1000);
                      data.results.forEach(function(value, index){
                        //console.log(value);
                        var tip = value.fields;
                        var tipificacion = tip.filter(function (tipi) {
                            if(tipi.value != 'false' || tipi.lenght>4){
                                return  tipi.value;                        
                            }
                        });
                        tipificacion.forEach(function(value){
                            funstring += f_tipificacion(value);
                        })
                        //console.log(funstring);
                        if(value.status === 'new'){
                            htmlstatus = "<span class='badge bg-warning'>Nuevo</span>";
                        }
                        if(value.status === 'open'){
                            htmlstatus = "<span class='badge bg-danger'>Abierto</span>";
                        }
                        if(value.status === 'pending'){
                            htmlstatus = "<span class='badge bg-success'>Pendiente</span>";
                        }
                        if(value.status === 'closed'){
                            htmlstatus = "<span class='badge bg-info'>Cerrado</span>";
                        }
                        $("#bodytable").append('<tr><td><h6>'+value.id+' - '+htmlstatus+'</h6><h5><u>'+value.subject+'</u></h5><p><i>'+value.description+'</i></p><br>'+funstring+'</td></tr>');
                        funstring = '';
                      })
                });
            });
    } else {
       $("#bodytable").append('<tr><td><h6>No existen requerimientos.</h6></td></tr>');
       funstring = '';    
       $("#tlWaiting").hide(3000);
   }
}

function f_tipificacion(tipo){
    var html = '';
    if(tipo.id == 1500015625741) { //SELECT PRINCIPAL
        if(tipo.value == 'propuesta')
           {html += '<br><b>Tipo: </b> Propuesta.';}
        if(tipo.value == 'demo')
           {html += '<br><b>Tipo: </b> Demo';}
        if(tipo.value == 'diagnostico')
           {html += '<br><b>Tipo: </b> Diagnóstico.';}
        if(tipo.value == 'apoyo_para_levantamiento')
           {html += '<br><b>Tipo: </b> Diagnóstico';}
        if(tipo.value == 'compatibilidad')
           {html += '<br><b>Tipo: </b> Compatibilidad.';}
        }
    if(tipo.id == 1500015626001) { //SELECT PROPUESTA
        if(tipo.value == 'propuesta_de_implementación'){
            html += '<br><b>Propuesta de: </b> Implementación.';}
        if(tipo.value == 'propuesta_de_optimizacion'){
            html += '<br><b>Propuesta de: </b> Optimización. ';}
        if(tipo.value == 'arquitectura'){
            html += '<br><b>Propuesta de: </b> Arquitectura. ';}
        if(tipo.value == 'ajustes_de_propuesta'){
            html += '<br><b>Propuesta de: </b> Ajuste de Propuesta.';}
        if(tipo.value == 'ajuste_horas'){
            html += '<br><b>Propuesta de: </b> Ajuste de Horas.';}
    }
    if(tipo.id == 1900007276365) { //ESTADO DE LA PROPUESTA
        if(tipo.value == 'revisando_levantamiento'){
            html += '<br> <b>Estado: </b> Revisando el levantamiento. ';}
        if(tipo.value == 'en_elaboracion'){
            html += '<br> </b>Estado: <b> En elaboración.';}
        if(tipo.value == 'en_ajustes'){
            html += '<br> <b>Estado: </b> En ajustes ';}
        if(tipo.value == 'esperando_por_comercial'){
            html += '<br> </b>Estado: <b> Esperando por comercial.';}
        if(tipo.value == 'entregada'){
            html += '<br> <b>Estado: </b> Entregada.';}
        if(tipo.value == 'no_avanzo'){
            html += '<br> <b>Estado: </b> No Avanzó.';}
    }

    if(tipo.id == 1500015680862){
        html += "<br><b>Fecha de entrega de la propuesta:</b> " + tipo.value;        
    }
    if(tipo.id == 1900007274885){ //URL PROPUESTA
        html += "<br><b>URL de la propuesta: </b> " + tipo.value;
    }

    if(tipo.id == 1500015626221){ //ESTADO DEL DEMO
        if(tipo.value == 'en_revision'){
            html += '<br> </b>Estado: <b>En revisión';}
        if(tipo.value == 'en_configuracion'){
            html += '<br> <b>Estado: </b> En configuración.';}
        if(tipo.value == 'esperando_a_comercial'){
            html += '<br> <b>Estado: </b> Esperando a comercial.';}
        if(tipo.value == 'realizado'){
            html += '<br> <b>Estado: </b> Realizado.';}
        if(tipo.value == 'no_avanzo'){
            html += '<br> <b>Estado: </b> No avanzó.';}
    }
    if(tipo.id == 1500015682942){ //TIPO CUENTA DEMO
        if(tipo.value == 'estrategico'){
            html += '<br> <b>Tipo de cuenta: </b> Estrátegica';}
        if(tipo.value == 'normal'){
            html += '<br> <b>Tipo de cuenta: </b> Normal';}
    }
    if(tipo.id == 1500015626801){ //FECHA DE ENTREGA DE DEMO
        html += "<br><b>Fecha de entrega de demo:</b> " + tipo.value;
    }

    if(tipo.id == 1500015683082){ //URL DIAGNOSTICO
        html += "<br><b>URL de diagnóstico: </b> " + tipo.value;
    }
    if(tipo.id == 1900007277085){ //USUARIO DIAGNOSTICO
        html += "<br><b>Usuario diagnóstico: </b>" + tipo.value;
    }
    if(tipo.id == 1500015626281){ //CONTRASEÑA DIAGNOSTICO
        html += "<br><b>Contraseña diagnóstico: </b> " + tipo.value;
    }
    if(tipo.id == 1500015626301){ //FECHA DE ENTREGA DIAGNOSTICO
        html += "<br><b>Fecha de entrega diagnóstico: </b> " + tipo.value;
    }
    if(tipo.id == 1500015626841){ //APOYO PARA LEVANTAMIENTO
        if(tipo.value == 'implementacion_proceso_de_atencion'){
            html += '<br> <b>Tipo de levantamiento: </b> Implementación en el proceso de atención';}
        if(tipo.value == 'tecnico_im'){
            html += '<br> <b>Tipo de levantamiento: </b> Técnico';}
        if(tipo.value == 'dual'){
            html += '<br> <b>Tipo de levantamiento: </b> Dual';}
    }
    if(tipo.id == 1500015683522){ //FECHA DE ENTREGA LEVANTAMIENTO
        html += "<br><b>Fecha de entrega levantamiento: </b>" + tipo.value;
    }
    if(tipo.id == 1900007536365){ //COMPATIBILIDAD
        html += "<br><b>Nombre APP: </b>" + tipo.value;
    }
   return html;
}

function regresar(){
    $("#formulario").show(500);
    $("#solicitudes").hide(1000);
    $("#menu_principal").show(1500);
    $("#menu_solicitudes").hide(2000);   
}

function showTooltip(){
  $("#message").show("slow");
  setTimeout(hideTooltip, 3000)}

function hideTooltip(){
   $("#message").hide("slow");}

function tratos(){
   var client = ZAFClient.init();  
   client.invoke('instances.create', {
         location: 'modal',
             url: 'assets/modal-tratos.html',
         size: { // optional
           width: '650px',
           height: '500px'
          }})
   .then(function(modalContext) {
          // The modal is on screen now
          var modalClient = client.instance(modalContext['instances.create'][0].instanceGuid);
          modalClient.on('modal.closed', function() {
          // The modal has been closed
          });
        });
}

function clientes(){
   var client = ZAFClient.init();  
   client.invoke('instances.create', {
         location: 'modal',
             url: 'assets/modal-clientes.html',
         size: { // optional
           width: '450px',
           height: '300px'
          }})
   .then(function(modalContext) {
          // The modal is on screen now
          var modalClient = client.instance(modalContext['instances.create'][0].instanceGuid);
          modalClient.on('modal.closed', function() {
          // The modal has been closed
          });
        });
}

function general(){
   var client = ZAFClient.init();  
   client.invoke('instances.create', {
         location: 'modal',
             url: 'assets/modal-general.html',
         size: { // optional
           width: '450px',
           height: '300px'
          }})
   .then(function(modalContext) {
          // The modal is on screen now
          var modalClient = client.instance(modalContext['instances.create'][0].instanceGuid);
          console.log(modalClient);
          modalClient.on('modal.closed', function() {
          // The modal has been closed
          });
        });
}

