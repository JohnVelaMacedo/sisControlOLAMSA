<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\PendienteDescarga;

class PendienteDescargaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $codigo = 0;
        $pendiente_descarga = DB::table('pendientedescarga_inicio_fin')
                            ->join('registroentrada', 'pendientedescarga_inicio_fin.idRegistroEntrada', '=', 'registroentrada.id')
                            ->join('persona', 'registroentrada.transportista', '=', 'persona.dni')
                            ->join('tipovehiculo', 'registroentrada.tipoVehiculo', '=', 'tipovehiculo.id')
                            ->select('registroentrada.id as idRegistroEntrada', 'registroentrada.tipoVehiculo', 
                                'tipovehiculo.descripcion as descripcion_tipo_vehiculo', 'tipovehiculo.tiempoEspera',
                                'registroentrada.numPlaca', 'registroentrada.transportista',  
                                DB::raw("CONCAT_WS(' ', persona.nombre, persona.apellidos) as full_name"),
                                'registroentrada.observaciones', 'pendientedescarga_inicio_fin.id as idPendienteDescarga',
                                'pendientedescarga_inicio_fin.idRegistroEntrada', 'pendientedescarga_inicio_fin.checkInicio',
                                'pendientedescarga_inicio_fin.checkFin', 'pendientedescarga_inicio_fin.ObservacionInicio', 
                                'pendientedescarga_inicio_fin.ObservacionFin', 'pendientedescarga_inicio_fin.fechaInicio', 
                                'pendientedescarga_inicio_fin.horaInicio', 'pendientedescarga_inicio_fin.fechaFin', 
                                'pendientedescarga_inicio_fin.horaFin')
                            ->get();
                                          
        return compact('pendiente_descarga', 'codigo');
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
        date_default_timezone_set('America/Lima');
        $data = $request->data;

        if ($data['ObservacionFin']) {
            $isUpdate = PendienteDescarga::where('id', $id)
                ->update(
                    [ 
                        'checkFin' => 1, 
                        'ObservacionFin' => $data['ObservacionFin'], 
                        'fechaFin' => date('Y-m-d'), 
                        'horaFin' => date('H:i:s')
                    ]
            );
        } else {
            $isUpdate = PendienteDescarga::where('id', $id)
                    ->update(
                        [ 
                            'checkInicio' => 1, 
                            'ObservacionInicio' => $data['ObservacionInicio'], 
                            'fechaInicio' => date('Y-m-d'), 
                            'horaInicio' => date('H:i:s')
                        ]
            );
        }

        return $isUpdate ? "bien" : "error";
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
