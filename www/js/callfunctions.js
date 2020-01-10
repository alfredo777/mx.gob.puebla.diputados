var HOST = "http://172.10.200.66:3000";

function GetHome(){
  setTimeout(function(){
    var diputados = HOST+"/api_general/diputados";
    LoadHTML('./pages/menu.html', 'app');
    HTPL("diputados",'diputados', diputados);
    data = HOST+"/api_general/transmision";
    HTPL("noticetransmision", 'transmision', data);
  },5000);
}


function changePage(pushpage){
document.querySelector('#navigateINDEX').pushPage(pushpage);
}

function LoadProfile(id){
changePage('profile.html');
data = HOST+"/api_general/diputado?id="+id;
HTPL("perfil", 'perfil', data);

}

function Solicitud(id){
  changePage('solicitud.html');
  HTPL("form_peticion", 'solicitud', "./data/form_peticion.json");
  setTimeout(function(){
     document.getElementById('form-action-base-id').innerHTML = "<input type='text' id='diputado_id' name='id' style='display:none;' value="+"'"+id+"'"+"></input>";
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
  var data = new FormData(document.getElementById('form-action-base'));
  console.log(data);
  fetch(HOST+'/api_general/gestion', {
     method: 'POST',
     body: data
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
     console.log(json);
     alert('Gracias por ingresar la información pronto le daremos respuesta.');
     GetHome();

  })
  .catch(function(err) {
      console.warn(err);
      return false;
      alert('Gracias por ingresar la información pronto le daremos respuesta.');
      GetHome();
  });

}