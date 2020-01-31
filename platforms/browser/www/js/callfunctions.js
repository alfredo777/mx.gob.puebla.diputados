var HOST = "https://www.congresopuebla.app";


var oldXHR = window.XMLHttpRequest;
function newXHR() {
    var realXHR = new oldXHR();
    realXHR.addEventListener("readystatechange", function() {
        if(realXHR.readyState==1){
            $('#progress').attr('value',20);
        }
        if(realXHR.readyState==2){
            $('#progress').attr('value',40);
        }
        if(realXHR.readyState==3){
            $('#progress').attr('value',60);
        }
        if(realXHR.readyState==4){
            $('#progress').attr('value',100);
            setTimeout(function(){
              $('#progress').attr('value',0);
            },1000)
        }
    }, false);
    return realXHR;
}
window.XMLHttpRequest = newXHR;



/*document.addEventListener("deviceready", onDeviceReady, false);
'devicemodel': device.model,
      'devicename': device.manufacturer,
      'deviceplatform': device.platform,
      'deviceuuid': device.uuid,
      'deviceversion': device.version,
      'virtual': device.isVirtual,
      'serial': device.serial*/

function loginINC(){

  var nombre = $('#nombre').val();
  var apellidos = $('#apellidos').val();
  var email = $('#email').val();
  var cp = $('#cp').val();
  var municipio = $('#municipio').val();
  var seccionel = $('#seccionel').val();


  var data = {
      'nombre': nombre,
      'apellidos': apellidos,
      'email': email,
      'cp': cp,
      'municipio': municipio,
      'seccionel': seccionel    
  }


    $.ajax({
        url: HOST+'/api_general/register_user',
        cache: true,
        data: data,
        dataType: 'json',
        contentType: 'application/json',
        success: function (json) {
             console.log(json);
             alert(json.respuesta);
             window.localStorage.setItem("user", json.id);
             window.localStorage.setItem("email", json.email);
             window.localStorage.setItem("name", json.name);
             window.localStorage.setItem("municipio", json.municipio);
             var name = window.localStorage.getItem("name");
             $('#myname').html(name);
             GetHome();
        },
        error: function(error) {
          alert(error);
        }
    });


}

function OpenMenu(){
  var menu = document.getElementById('menu');
  console.log(menu);
  var name = window.localStorage.getItem("name");
  $('#myname').html(name);
  menu.open();
};

function CloseSESSion(){
  window.localStorage.setItem("user", "null");
  window.localStorage.setItem("email", "null");
  window.localStorage.setItem("name", "null");
  window.location.reload();
  setTimeout(function(){
   GetIntro();
  },1000);
}

function GetIntro(){
   LoadHTML('./pages/intro.hbs', 'app');
   setTimeout(function(){
   LoadHTMLPC('./pages/tutorial.hbs','.page__content div#tutorialxfg');
   },100);
}

function GetHome(){
  setTimeout(function(){
    var diputados = HOST+"/api_general/diputados";
    LoadHTML('./pages/menu.hbs', 'app');
    HTPL("diputados",'diputados', diputados);
    data = HOST+"/api_general/transmision";
    HTPL("noticetransmision", 'transmision', data);
  },200);

  var name = window.localStorage.getItem("name");
  $('#myname').html(name);
}


function changePage(pushpage){
document.querySelector('#navigateINDEX').pushPage(pushpage);
var menu = document.getElementById('menu');
menu.close();
}

function LoadProfile(id){
changePage('profile.html');
data = HOST+"/api_general/diputado?id="+id;
HTPL("perfil", 'perfil', data);

}

function Solicitud(id){
  changePage('solicitud.html');
  HTPL("form_peticion", 'solicitud', "./data/form_peticion.json");
  var user_id = window.localStorage.getItem("user");
  setTimeout(function(){
     document.getElementById('form-action-base-id').innerHTML = "<input type='text' id='diputado_id' name='id' style='display:none;' value="+"'"+id+"'"+"></input>";
     document.getElementById('form-action-user-id').innerHTML = "<input type='text' id='user_id' name='user_id' style='display:none;' value="+"'"+user_id+"'"+"></input>";
  },1000);
}

function Propuestas(id){
  changePage('propuestas.html');
  data = HOST+"/api_general/propuestas_diputado?id="+id;
  HTPL("propuestas", 'propuesta', data);

}

function Propuesta(id){
  changePage('propuesta.html');
  data = HOST+"/api_general/read_propose?id="+id;
  HTPL("propuesta", 'leerpropuesta', data);

}

function Ranking(id){
  changePage('ranking.html');
  data = HOST+"/api_general/ranking_diputado?id="+id;
  HTPL("ranking", 'ranking', data);
}

function GetTrasmision(fecha){
  changePage('transmisionx.html');
  data = HOST+"/api_general/transmision";
  HTPL("nexttrasnmision", 'transmisionx', data);
}

function sendFormBase(){

  var formData = new FormData($("#form-action-base")[0]);
  console.log(formData);

  $.ajax({
    url: HOST+'/api_general/gestion',
    cache: true,
    data: formData,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function (json) {
       console.log(json);
       alert(json.notice);
       if(json.registro != 0){
       Peticion(json.registro);
       }
    },
    error: function(error) {
      alert(error);
    }
  });
  

}

function Peticion(id){
  changePage('peticion.html');
  data = HOST+"/api_general/peticion?id="+id;
  HTPL("peticion", 'peticionxgt', data);

}

function Peticiones(id){
  GetHome();
  setTimeout(function(){
  changePage('peticiones.html');
  data = HOST+"/api_general/peticiones?id="+id;
  console.log(JSON.stringify(data));
  HTPL("peticiones", 'peticionesxgt', data);
  },700);
}

function DipFinder(){
  var numerodistrito = window.localStorage.getItem("municipio");
  changePage('findedip.html');
  data = HOST+"/api_general/search_diputado?numerodistrito="+numerodistrito;
  console.log(data);
  HTPL("findedip", 'findedipxgt', data);

}

function Privacidad(){
  changePage('privacidad.html');
  LoadHTML('./pages/privacidad.html','privacidadxgt');
}

function AyudaSoporte(){
  changePage('soporte.html');
  LoadHTML('./pages/soporte.html','soportexgt');
}



