<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RegistroEntrada;
use App\RegistroPesas;

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
        t.nombre as transportista,
        re.observaciones from registroentrada re 
        INNER JOIN tipovehiculo v ON re.tipoVehiculo=v.id 
        INNER JOIN persona t ON re.transportista=t.dni ");

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
        $reg=RegistroEntrada::updateOrCreate(
            ['id'=>$request['registro']['id']],
            [
                'tipoVehiculo'  =>$request['registro']['tipoVehiculo'],
                'numPlaca'      =>$request['registro']['numPlaca'],
                'transportista' =>$request['registro']['transportista'],
                'observaciones' =>$request['registro']['observaciones'],
            ]
        );
        for($i=0;$i<count($request['pesas']);$i++){
            $pesa=RegistroPesas::updateOrCreate(
                ['id'=>$request['pesas'][$i]['id']],
                [
                    'idregistroentrada'      =>$reg->id,
                    'numPesas'      =>$request['pesas'][$i]['numPesas'],
                    'comite'        =>$request['pesas'][$i]['comite'],
                    'proveedor'     =>$request['pesas'][$i]['proveedor']
                ]
            );
        }

        if($reg && $pesa){
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
        $p =\DB::table('registroentrada')->where('id', $id)->first();
        $t =\DB::select("SELECT dni as id, concat(nombre,' ',apellidos) as text from persona where dni=$p->transportista");
        $r=\DB::select("SELECT * from registropesas");
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
        $eliminarP=RegistroEntrada::where('id',$id)->delete();
        if($eliminarP){
            return "OK";
        }else{
            return "FAIL";
        }
    }
}
