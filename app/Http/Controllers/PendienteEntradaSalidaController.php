<?php

namespace App\Http\Controllers;
date_default_timezone_set('America/Lima');
use Illuminate\Http\Request;
use App\PendienteEntradaSalida;
use App\PendienteDescarga;

class PendienteEntradaSalidaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $regEn=\DB::select("SELECT re.id, pen.id as idPendiente,pen.checkIngreso as checkIn,
        pen.checksalida as checkOut , v.descripcion as vehiculo, re.numPlaca as placa, 
        concat(t.nombre,' ',t.apellidos) as transportista,
        concat('Entrada: ',pen.ObservacionInicio,'.\n Salida: ',pen.ObservacionFin) as observaciones from pendiente_entrada_salida pen 
        inner join registroentrada re on pen.idRegistroEntrada=re.id 
        INNER JOIN tipovehiculo v ON re.tipoVehiculo=v.id 
        INNER JOIN persona t ON re.transportista=t.dni where (pen.checkIngreso!=1 || pen.checksalida!=1) ");

        return compact('regEn');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    public function checkInicio(Request $request)
    {
        // var_dump($request['pendiente']);
            $pendiente=PendienteDescarga::updateOrCreate(
                ['id'   =>null],
                [
                    'idRegistroEntrada' =>$request['pendiente']['idRegEntrada']
                ]
            );

            $reg=PendienteEntradaSalida::updateOrCreate(
                ['id'=>$request['pendiente']['idPendiente']],
                [
                    'checkIngreso'              =>$request['pendiente']['check'],
                    'ObservacionInicio'         =>$request['pendiente']['observaciones'],
                    'fechaHoraInicio'           =>date("Y-m-d H:i:s")
                ]
            );

        if($pendiente && $reg){
            return "OK";
        }else{
            return "FAIL";
        }
    }

    public function checkFin(Request $request)
    {

        $reg=PendienteEntradaSalida::updateOrCreate(
            ['id'=>$request['pendiente']['idPendiente']],
            [
                'checksalida'              =>$request['pendiente']['check'],
                'ObservacionFin'         =>$request['pendiente']['observaciones'],
                'fechaHoraFin'           =>date("Y-m-d H:i:s")
            ]
        );

    if($reg){
        return "OK";
    }else{
        return "FAIL";
    }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
