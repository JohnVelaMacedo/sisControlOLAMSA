<?php

namespace App\Http\Controllers;
date_default_timezone_set('America/Lima');
use Illuminate\Http\Request;
use App\RegistroEntrada;
use App\RegistroPesas;
use App\PendienteEntradaSalida;
use Barryvdh\DomPDF\Facade as PDF;
use App\PendienteDescarga;
use App\Ticket;

class RegistroEntradaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $regEn=\DB::select("SELECT re.id, v.descripcion as vehiculo, re.numPlaca as placa, 
        concat(t.nombre,' ',t.apellidos) as transportista,
        re.observaciones from registroentrada re
        INNER JOIN tipovehiculo v ON re.tipoVehiculo=v.id 
        INNER JOIN persona t ON re.transportista=t.dni ORDER BY re.id desc limit 50");
        return compact('regEn');
    }

    public function filtrar(Request $request){

        $desde=$request['filtro']['desde'];
        $hasta=$request['filtro']['hasta'];
        $regEn=\DB::select("SELECT re.id, v.descripcion as vehiculo, re.numPlaca as placa, 
        concat(t.nombre,' ',t.apellidos) as transportista,
        re.observaciones from registroentrada re
        INNER JOIN tipovehiculo v ON re.tipoVehiculo=v.id 
        INNER JOIN persona t ON re.transportista=t.dni where date(re.created_at) BETWEEN CAST('$desde' AS DATE) AND CAST('$hasta' AS DATE)");
        // where re.created_at BETWEEN CAST('$desde' AS DATE) AND CAST('$hasta' AS DATE)
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
        // $reg=RegistroEntrada::updateOrCreate(
        //     ['id'=>$request['registro']['id']],
        //     [
                
        //     ]
        // );
        if($request['registro']['id']){
            $reg=RegistroEntrada::where('id',$request['registro']['id'])->update([
                'tipoVehiculo'  =>$request['registro']['tipoVehiculo'],
                'numPlaca'      =>$request['registro']['numPlaca'],
                'transportista' =>$request['registro']['transportista'],
                'observaciones' =>$request['registro']['observaciones'],
                'updated_at'    =>date("Y-m-d H:i:s")
            ]);
            $reg=$request['registro']['id'];
        }else{
            $reg=RegistroEntrada::insertGetId([
                'tipoVehiculo'  =>$request['registro']['tipoVehiculo'],
                'numPlaca'      =>$request['registro']['numPlaca'],
                'transportista' =>$request['registro']['transportista'],
                'observaciones' =>$request['registro']['observaciones'],
                'updated_at'    =>date("Y-m-d H:i:s")
            ]);
        }

        $eliPesas=RegistroPesas::where('idregistroentrada',$reg)->delete();
        for($i=0;$i<count($request['pesas']);$i++){

            // $pesa=RegistroPesas::updateOrCreate(
            //     ['id'=>$request['pesas'][$i]['id']],
            //     [
            //         'idregistroentrada'      =>$reg,
            //         'numPesas'      =>$request['pesas'][$i]['numPesas'],
            //         'comite'        =>$request['pesas'][$i]['comite'],
            //         'proveedor'     =>$request['pesas'][$i]['proveedor']
            //     ]
            // );
            if(RegistroPesas::where('id',$request['pesas'][$i]['id'])->first()){
                $pesa=RegistroPesas::where('id',$request['pesas'][$i]['id'])->update([
                    'idregistroentrada'      =>$reg,
                    'numPesas'      =>$request['pesas'][$i]['numPesas'],
                    'comite'        =>$request['pesas'][$i]['comite'],
                    'proveedor'     =>$request['pesas'][$i]['proveedor']
                ]);
            }else{
                $pesa=RegistroPesas::insert([
                    'idregistroentrada'      =>$reg,
                    'numPesas'      =>$request['pesas'][$i]['numPesas'],
                    'comite'        =>$request['pesas'][$i]['comite'],
                    'proveedor'     =>$request['pesas'][$i]['proveedor']
                ]);
            }
        }
        $ticket;
        if($request['registro']['id']==''){
            
            // $pend=PendienteEntradaSalida::updateOrCreate(
            //     ['id'   =>null],
            //     [
            //         'idRegistroEntrada' =>$reg
            //     ]
            // );
            $pend=PendienteEntradaSalida::insert([
                'idRegistroEntrada' =>$reg
            ]);
            $claseV=\DB::table('tipovehiculo')->where('id', $request['registro']['tipoVehiculo'])->first();
            $num=\DB::select("SELECT newTicket($reg, '$claseV->clasificacion') AS newTicket;");
            // var_dump($num);
            $ticket=array($claseV->clasificacion.'-'.$num[0]->newTicket,$claseV->descripcion,$request['registro']['numPlaca'],$claseV->tiempoEspera,date("Y-m-d H:i:s"));
        }else{
            $pend=false;
        }

        if($pend){
            $pdf = PDF::loadView('ticket',compact('ticket'))->setPaper('a4', 'landscape');
            $output = $pdf->stream();
            return $output;
        }else{
            return "UPDATE";
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showTransporista($id)
    {
        $showT=\DB::select("SELECT dni as id,concat(nombre,' ',apellidos,'-',dni) as text from persona where tipo='5' and nombre like '$id%'");
        return compact('showT');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $pr =\DB::select("select id, tipoVehiculo, numPlaca, transportista, coalesce(observaciones, '') as observaciones, created_at, updated_at from registroentrada where id='$id' ");
        $p=$pr[0];
        $t =\DB::select("SELECT dni as id, concat(nombre,' ',apellidos) as text from persona where dni=".$p->transportista."");
        $r=\DB::select("SELECT * from registropesas where idregistroentrada=$id");
        return compact('p','t','r');
    }

    public function verInfo($id)
    {
        $pesas=\DB::select("SELECT r.numPesas, c.nombre as comite, p.nombre as proveedor from registropesas r inner join comite c on r.comite=c.id inner join proveedor p on r.proveedor=p.id where idregistroentrada=$id");
        return compact('pesas');
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
        $elimR=RegistroEntrada::where('id',$id)->delete();
        $elimP=PendienteEntradaSalida::where('idRegistroEntrada',$id)->delete();
        $elimD=PendienteDescarga::where('idRegistroEntrada',$id)->delete();
        $elimPS=RegistroPesas::where('idregistroentrada',$id)->delete();
        $elimT=Ticket::where('idregistroentrada',$id)->delete();
        if($elimP && $elimR && $elimD && $elimPS && $elimT){
            return "OK";
        }else{
            return "FAIL";
        }
    }
}
