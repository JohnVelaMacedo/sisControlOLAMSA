<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TipoVehiculo;
use App\FechaHoraDescarga;
use App\PendienteDescarga;
use App\Persona;

class FechaHoraDescargaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tipo_vehiculo = TipoVehiculo::all();
        $pendiente_descarga = PendienteDescarga::all();
        $fecha_hora_descarga = FechaHoraDescarga::all();
        $persona = Persona::all();

        return compact('tipo_vehiculo', 'pendiente_descarga', 'fecha_hora_descarga', 'persona');
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
        $pendiente_descarga = PendienteDescarga::create([
            'tipoVehiculo' => $request->fecha_hora_descarga['tipoVehiculo'],
            'transportista' => $request->fecha_hora_descarga['transportista'],
            'checkInicioFin' => 1,
            'placa' => $request->fecha_hora_descarga['placa']
        ]);

        $fecha_hora_descarga = FechaHoraDescarga::create([
            'id_pendienteDescarga' => $pendiente_descarga->id,
            'observaciones' => $request->fecha_hora_descarga['observaciones'],
            'fechaReg' => $request->fecha_hora_descarga['fechaReg'],
            'horaReg' => $request->fecha_hora_descarga['horaReg']
        ]);

        return $fecha_hora_descarga && $pendiente_descarga ? "bien" : "error";
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
