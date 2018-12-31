<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $persona = Persona::all();
        $fecha_hora_descarga = DB::table('fechahoradescarga')
                            ->join('pendientedescarga_inicio_fin', 'fechahoradescarga.id_pendienteDescarga', '=', 'pendientedescarga_inicio_fin.id')
                            ->join('tipovehiculo', 'pendientedescarga_inicio_fin.tipoVehiculo', '=', 'tipovehiculo.id')
                            ->join('persona', 'pendientedescarga_inicio_fin.transportista', '=', 'persona.dni')
                            ->select('fechahoradescarga.id', 'fechahoradescarga.id_pendienteDescarga', 'fechahoradescarga.observaciones',
                            'fechahoradescarga.fechaReg', 'fechahoradescarga.horaReg', 'fechahoradescarga.fechafinReg', 
                            'fechahoradescarga.horafinReg', 'pendientedescarga_inicio_fin.tipoVehiculo', 'tipovehiculo.descripcion', 
                            'pendientedescarga_inicio_fin.transportista','pendientedescarga_inicio_fin.checkInicioFin', 
                            'pendientedescarga_inicio_fin.placa', DB::raw("CONCAT(persona.nombre,' ', persona.apellidos) as full_name"))
                            ->get();

        return compact('tipo_vehiculo', 'fecha_hora_descarga', 'persona');
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
            'observaciones' => e($request->fecha_hora_descarga['observaciones']),
            'fechaReg' => $request->fecha_hora_descarga['fechaReg'],
            'horaReg' => $request->fecha_hora_descarga['horaReg']
        ]);

        return $fecha_hora_descarga && $pendiente_descarga ? "bien" : "error";
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
