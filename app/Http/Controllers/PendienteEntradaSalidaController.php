<?php

namespace App\Http\Controllers;
date_default_timezone_set('America/Lima');
use Illuminate\Http\Request;
use App\PendienteEntradaSalida;
use App\PendienteDescarga;
use App\Ticket;

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
        concat('Entrada: ',pen.ObservacionInicio,'.\n Salida: ',pen.ObservacionFin) as observaciones, tk.estado 
        from pendiente_entrada_salida pen 
        inner join registroentrada re on pen.idRegistroEntrada=re.id 
        INNER JOIN tipovehiculo v ON re.tipoVehiculo=v.id
        inner join ticket tk on tk.idregistroentrada=re.id
        INNER JOIN persona t ON re.transportista=t.dni 
        where (pen.checksalida=0)
         order by re.id asc");
// where (pen.checkIngreso!=1 || pen.checksalida!=1)                                                    
// where (pen.checksalida=0) and
//         (TIMEDIFF(CURRENT_TIMESTAMP,re.created_at)<v.tiempoEspera or pen.checkIngreso=1)
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
            
            $pendiente=\DB::table('pendientedescarga_inicio_fin')->insert([
                'idRegistroEntrada' =>$request['pendiente']['idRegEntrada']
            ]);
            $reg=\DB::table('pendiente_entrada_salida')->where('id',$request['pendiente']['idPendiente'])->update([
                    'checkIngreso'              =>$request['pendiente']['check'],
                    'ObservacionInicio'         =>$request['pendiente']['observaciones'],
                    'fechaHoraInicio'           =>date("Y-m-d H:i:s")
            ]);
            $ticket=Ticket::where('idregistroentrada',$request['pendiente']['idPendiente'])->update(['estado'=>'DESCARGANDO']);
        if($pendiente && $reg){
            return "OK";
        }else{
            return "FAIL";
        }
        // $pendiente=PendienteDescarga::updateOrCreate(
        //     ['id'   =>null],
        //     [
        //         'idRegistroEntrada' =>$request['pendiente']['idRegEntrada']
        //     ]
        // );

        // $reg=PendienteEntradaSalida::updateOrCreate(
        //     ['id'=>$request['pendiente']['idPendiente']],
        //     [
        //         'checkIngreso'              =>$request['pendiente']['check'],
        //         'ObservacionInicio'         =>$request['pendiente']['observaciones'],
        //         'fechaHoraInicio'           =>date("Y-m-d H:i:s")
        //     ]
        // );
    }

    public function checkFin(Request $request)
    {
        $reg=\DB::table('pendiente_entrada_salida')->where('id',$request['pendiente']['idPendiente'])->update([
            'checksalida'              =>$request['pendiente']['check'],
                'ObservacionFin'         =>$request['pendiente']['observaciones'],
                'fechaHoraFin'           =>date("Y-m-d H:i:s")
        ]);
        $ticket=Ticket::where('idregistroentrada',$request['pendiente']['idPendiente'])->update(['estado'=>'FINALIZADO']);
    if($reg && $ticket){
        return "OK";
    }else{
        return "FAIL";
    }
     // $reg=PendienteEntradaSalida::updateOrCreate(
        //     ['id'=>$request['pendiente']['idPendiente']],
        //     [
        //         'checksalida'              =>$request['pendiente']['check'],
        //         'ObservacionFin'         =>$request['pendiente']['observaciones'],
        //         'fechaHoraFin'           =>date("Y-m-d H:i:s")
        //     ]
        // );
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
