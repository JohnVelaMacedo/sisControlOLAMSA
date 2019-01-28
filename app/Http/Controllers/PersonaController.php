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
        
        if($request['persona']['id']){
            $op=Persona::where('id',$request['persona']['id'])->update([
                'nombre'        =>$request['persona']['nombre'],
                'apellidos'     =>$request['persona']['apellidos'],
                'dni'           =>$request['persona']['dni'],
                'email'         =>$request['persona']['email'],
                'telefono'         =>$request['persona']['telefono'],
                'direccion'     =>$request['persona']['direccion'],
                'tipo'          =>$request['persona']['tipoP'],
                'licencia'          =>$request['persona']['licencia']
            ]);
            $persona=$request['persona']['id'];
        }else{
            $persona=Persona::insertGetId([
                'nombre'        =>$request['persona']['nombre'],
                'apellidos'     =>$request['persona']['apellidos'],
                'dni'           =>$request['persona']['dni'],
                'email'         =>$request['persona']['email'],
                'telefono'         =>$request['persona']['telefono'],
                'direccion'     =>$request['persona']['direccion'],
                'tipo'          =>$request['persona']['tipoP'],
                'licencia'          =>$request['persona']['licencia']
            ]);
        }
        if($request['persona']['tipoP']!="5"){
            if(User::where('idPersona',$persona)->first()){
                $user=User::where('id',$persona)->update(
                    [
                        'idPersona'             =>$persona,
                        'user'                  =>$request['persona']['dni'],
                        'tipo'                  =>$request['persona']['tipoP'],
                        'password'              =>bcrypt($request['password']['password']),
                        'remember_token'        =>null
                    ]
                );
            }else{
                $user=User::insert([
                    'idPersona'             =>$persona,
                    'user'                  =>$request['persona']['dni'],
                    'tipo'                  =>$request['persona']['tipoP'],
                    'password'              =>bcrypt($request['password']['password']),
                    'remember_token'        =>null
                ]);
            }
        }else{
            $eliminarUsu=User::where('idPersona',$persona)->delete();
        }
        if($persona){
            return "OK";
        }else{
            return "FAIL";
        }
        // $persona=Persona::updateOrCreate(
        //     ['id'=>$request['persona']['id']],
        //     [
        //         'nombre'        =>$request['persona']['nombre'],
        //         'apellidos'     =>$request['persona']['apellidos'],
        //         'dni'           =>$request['persona']['dni'],
        //         'email'         =>$request['persona']['email'],
        //         'telefono'         =>$request['persona']['telefono'],
        //         'direccion'     =>$request['persona']['direccion'],
        //         'tipo'          =>$request['persona']['tipoP'],
        //         'licencia'          =>$request['persona']['licencia'],
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
    public function edit($dni)
    {
        $p =\DB::select("SELECT id,nombre, apellidos,dni,email,telefono,direccion,tipo as tipoP,coalesce(licencia,'') as licencia from persona where dni=$dni");
        //$u =\DB::table('user')->where('idPersona', $p->id)->first();
        return compact('p');
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
        $p =\DB::table('persona')->where('dni', $dni)->first();
        $eliminarP=Persona::where('dni',$dni)->delete();
        $eliminarUsu=User::where('idPersona',$p->id)->delete();
        if($eliminarP){
            return "OK";
        }else{
            return "FAIL";
        }
    }
}
