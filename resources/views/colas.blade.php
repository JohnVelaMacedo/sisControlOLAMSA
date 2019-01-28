<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <title>Cola</title>
</head>
<style>
  /* #banner {
    background-image: linear-gradient(120deg, #91C4FF 0%, #F0F7FF 87%);
    position: relative;
    width: 100%;
    height:950px;
  } */
  
  #cloud-scroll {
    background: url("images/fon-ol.jpg") repeat-x;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    position: absolute;
    -webkit-animation: 10000000s backgroundScroll infinite linear;
    -moz-animation: 10000000s backgroundScroll infinite linear;
    -o-animation: 10000000s backgroundScroll infinite linear;
    -ms-animation: 10000000s backgroundScroll infinite linear;
    animation: 10000000s backgroundScroll infinite linear;
  }
  
  @-webkit-keyframes backgroundScroll {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -99999999px 0;
    }
  }
  
  @keyframes backgroundScroll {
    from {
      background-position: 0 0;
    }
    to {
      background-position: -99999999px 0;
    }
  }
  #bt{
      background-color: rgba(255, 255, 255, 0.88);
  }
  table {
      font-weight: 700 !important;
      font-size: 1.4em !important;
      color: #4d4d4e;
  }

  .blink{
animation-name: blinker;
animation-duration: 1s;
animation-timing-function: linear;
animation-iteration-count: infinite;
  /* For Chrome and Opera browser support*/
-webkit-animation-name: blinker;
-webkit-animation-duration: 1s;
-webkit-animation-timing-function: linear;
-webkit-animation-iteration-count: infinite;
/* For Mozilla browser support*/
-moz-animation-name: blinker;
-moz-animation-duration: 1s;
-moz-animation-timing-function: linear;
-moz-animation-iteration-count: infinite;
color: orange;
}
@keyframes blinker {  
0% { opacity: 1.0; }
50% { opacity: 0.0; }
100% { opacity: 1.0; }
}
/* For Mozilla browser key frames support*/
@-moz-keyframes blinker {  
0% { opacity: 1.0; }
50% { opacity: 0.0; }
100% { opacity: 1.0; }
}
/* For Chrome and Opera browser key frames support*/
@-webkit-keyframes blinker {  
0% { opacity: 1.0; }
50% { opacity: 0.0; }
100% { opacity: 1.0; }
}
</style>
<body >
    <div id="banner">
        <div id="cloud-scroll">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h1 class="display-5 mt-4 text-center"> Lista de Espera</h1>
                        <div class="row pt-4 pb-2" id="bt" style="height:520px;">
                                <div class="col-md-4" style="height:450px; overflow:auto; display:block;">
                                    <h2 class="text-center text-muted">Pesados</h2>
                                        <table class="table" id="tbPesados">
                                                <thead class="thead-red">
                                                  <tr class="table-active">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Ticket</th>
                                                    <th scope="col">Estado</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  
                                                </tbody>
                                              </table>
                                    </div>
                                    <div class="col-md-4" style="height:450px; overflow:auto; display:block;">
                                        <h2 class="text-center text-muted">Livianos</h2>
                                            <table class="table" id="tbLivianos" >
                                                    <thead class="thead-red">
                                                        <tr class="table-active">
                                                        <th scope="col">#</th>
                                                        <th scope="col">Ticket</th>
                                                        <th scope="col">Estado</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                    </tbody>
                                                    </table>
                                        </div>
                            <div class="col-md-4" style="height:450px; overflow:auto; display:block;">
                                    <h2 class="text-center text-muted">Otros</h2>
                                        <table class="table" id="tbOtros">
                                                <thead class="thead-red">
                                                    <tr class="table-active">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Ticket</th>
                                                    <th scope="col">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    
                                                </tbody>
                                                </table>
                                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
<script src="{{ asset('js/app.js') }}"></script>
<script>
  (function blink() { 
        $('.blink').fadeOut(500).fadeIn(500, blink); 
    })();
  $(document).ready(function(){
    pesados();
    livianos();
    otros();
  });
  setInterval(function(){
        pesados();
        livianos();
        otros();
    }, 3000);
//   $.ajaxSetup({
//     headers: {
//         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
//     }
// });
  function pesados() {
          $.ajax({
              type: 'GET',
              url: '/ticketsPE',
              dataType: 'json',
              success: function(data) {
                  var v = eval(data);
                  var valor=v.tickets;
                  var tam = Object.keys(valor).length;
                  $("#tbPesados > tbody").html("");
                  var i;
                  for (i = 0; i < tam; i++) {
                    var color='';
                    var clase='';
                    valor[i].estado=='ESPERA'?color='gray':
                    valor[i].estado=='DESCARGANDO'?color='green':clase='blink';
                    $("#tbPesados > tbody").
                    append(`<tr>
                    <td>${valor[i].numero}</td>
                    <td>${valor[i].prefijo+'-'+valor[i].numero}</td>
                    <td style='color:${color}' class='${clase}'>${valor[i].estado}</td>
                    </tr>`);
                      }
              }
          });
    }
    function livianos() {
          $.ajax({
              type: 'GET',
              url: '/ticketsLV',
              dataType: 'json',
              success: function(data) {
                  var v = eval(data);
                  var valor=v.tickets;
                  var tam = Object.keys(valor).length;
                  $("#tbLivianos > tbody").html("");
                  var i;
                  for (i = 0; i < tam; i++) {
                    var color='';
                    var clase='';
                    valor[i].estado=='ESPERA'?color='gray':
                    valor[i].estado=='DESCARGANDO'?color='green':clase='blink';
                    $("#tbLivianos > tbody").
                    append(`<tr>
                    <td>${valor[i].numero}</td>
                    <td>${valor[i].prefijo+'-'+valor[i].numero}</td>
                    <td style='color:${color}' class='${clase}'>${valor[i].estado}</td>
                    </tr>`);
                      }
              }
          });
    }
    function otros() {
          $.ajax({
              type: 'GET',
              url: '/ticketsOT',
              dataType: 'json',
              success: function(data) {
                  var v = eval(data);
                  var valor=v.tickets;
                  var tam = Object.keys(valor).length;
                  $("#tbOtros > tbody").html("");
                  var i;
                  //console.log(valor);
                  for (i = 0; i < tam; i++) {
                    var color='';
                    var clase='';
                    valor[i].estado=='ESPERA'?color='gray':
                    valor[i].estado=='DESCARGANDO'?color='green':clase='blink';
                    $("#tbOtros > tbody").
                    append(`<tr>
                    <td>${valor[i].numero}</td>
                    <td>${valor[i].prefijo+'-'+valor[i].numero}</td>
                    <td style='color:${color}' class='${clase}'>${valor[i].estado}</td>
                    </tr>`);
                      }
              }
          });
    }
</script>