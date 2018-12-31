<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\RegistroEntrada;

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
        t.nombre as transportista, re.numPesas as pesas, c.nombre as comite, p.nombre as proveedor,
        re.observaciones from registroentrada re 
        INNER JOIN tipovehiculo v ON re.tipoVehiculo=v.id 
        INNER JOIN persona t ON re.transportista=t.dni 
        INNER JOIN comite c ON re.comite=c.id 
        INNER JOIN proveedor p on re.proveedor=p.id");
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
        $persona=RegistroEntrada::updateOrCreate(
            ['id'=>$request['registro']['id']],
            [
                'tipoVehiculo'  =>$request['registro']['tipoVehiculo'],
                'numPlaca'      =>$request['registro']['numPlaca'],
                'transportista' =>$request['registro']['transportista'],
                'numPesas'      =>$request['registro']['numPesas'],
                'comite'        =>$request['registro']['comite'],
                'proveedor'     =>$request['registro']['proveedor'],
                'observaciones' =>$request['registro']['observaciones'],
            ]
        );
        if($persona){
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
        $showT=\DB::select("SELECT dni as id,concat(nombre,' ',apellidos) as text from persona where tipo='5' and nombre like '$id%'");
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
        $eliminarP=RegistroEntrada::where('id',$id)->delete();
        if($eliminarP){
            return "OK";
        }else{
            return "FAIL";
        }
    }
}
