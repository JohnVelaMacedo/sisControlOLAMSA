<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="widtd=device-widtd, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Reporte Graduados</title>
    
    
</head>
<style>
body{
  background-color:#FFFFFF;
  overflow:hidden;
  font-family: 'Raleway', sans-serif;
}

.main-wrap{
  padding:3%;
  max-width:1200px;
  display:block;
  margin: 10px auto;
}

.table.table-striped {
  width:100%;
    border-collapse: collapse;
      background: #fff;
    overflow: hidden;
    box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -o-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
    -ms-box-shadow: 0 0px 40px 0px rgba(0, 0, 0, 0.15);
}

.table.table-striped thead {
    background: #fff;
    box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
    -o-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: 0 5px 20px 0px rgba(0, 0, 0, 0.1);
}

.table.table-striped th {
    padding: 0.9rem 0.5rem;
    font-weight: bold;
      border: 1px solid #efefef;
    text-align: left;
    border-top: 0px;
}

.table.table-striped tbody tr:nth-child(odd){
    background-color: rgba(0,0,0,.02);
}

.table.table-striped tbody tr td a {
    color: #3c2f17;
    font-size: 4px;
    text-decoration:none;
  font-weight:500;
}

.table.table-striped tr:nth-child(even) {
    background-color: #fff;
}

.table.table-striped tbody tr td {
    border: 1px solid #efefef;
    padding: 0.7rem;
    text-align: left;
    border-top: 0px;
}

.ftr{
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
}

.ftr a{
    color: #fff;
}
</style>
<body>
    <center>
    <h1>Reporte</h1>
    <hr>
    <table class="table table-striped" style="font-size:10px;">
     <tr class="tr" align="center">
        <td class="td">ID</td>
        <td class="td">Comite</td>
        <td class="td">Proveedor</td>
        <td class="td">Pesas</td>
        <td class="td">Vehículo</td>
        <td class="td">Placa</td>
        <td class="td">Transportista</td>
        <td class="td">Entrada</td>
        <td class="td">Salida</td>
        <td class="td">Observaciones</td>
        <td class="td">Inicio Descarga</td>
        <td class="td">Inicio Fin</td>
        <td class="td">Observaciones</td>
     </tr>
     @foreach ($reporte as $report)
        <tr>
            <td>{{$report->id}}</td>
            <td>{{$report->comite}}</td>
            <td>{{$report->proveedor}}</td>
            <td>{{$report->pesas}}</td>
            <td>{{$report->vehiculo}}</td>
            <td>{{$report->placa}}</td>
            <td>{{$report->transportista}}</td>
            <td>{{$report->entrada}}</td>
            <td>{{$report->salida}}</td>
            <td>{{$report->observaciones1}}</td>
            <td>{{$report->descargaInicio}}</td>
            <td>{{$report->descargaFin}}</td>
            <td>{{$report->observaciones2}}</td>
        </tr>
     @endforeach  
        <tr>
            {{-- <td colspan="14" align="center">Numeo de Egresados: {{count($Reporte)}}</td>     --}}
        </tr>   
    </table>
    </center>
</body>
</html>   