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
        $regEn=RegistroEntrada::all();
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
        $eliminarP=TipoVehiculo::where('id',$id)->delete();
        if($eliminarP){
            return "OK";
        }else{
            return "FAIL";
        }
    }
}
