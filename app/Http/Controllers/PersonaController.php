<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Persona;
use App\User;

class PersonaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Personas = Persona::all();
        return compact('Personas');
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
        $persona=Persona::updateOrCreate(
            ['id'=>$request['persona']['id']],
            [
                'nombre'        =>$request['persona']['nombre'],
                'apellidos'     =>$request['persona']['apellidos'],
                'dni'           =>$request['persona']['dni'],
                'email'         =>$request['persona']['email'],
                'direccion'     =>$request['persona']['direccion'],
                'tipo'          =>$request['persona']['tipoP'],
            ]
        );
        if($request['persona']['tipoP']!="5"){
            $user=User::updateOrCreate(
                ['id'=>$request['persona']['id']],
                [
                    'idPersona'             =>$persona->id,
                    'user'                  =>$request['persona']['dni'],
                    'tipo'                  =>$request['persona']['tipoP'],
                    'password'              =>bcrypt($request['password']['password']),
                    'remember_token'        =>null
                ]
            );
        }
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
    public function destroy($dni)
    {
        $p =Persona::where('dni', $dni)->get();
        $eliminarP=Persona::where('dni',$dni)->delete();
        $eliminarUsu=User::where('idPersona',$p->id)->delete();
        if($eliminarP){
            return "OK";
        }else{
            return "FAIL";
        }
    }
}
