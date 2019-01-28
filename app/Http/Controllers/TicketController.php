<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Ticket;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ticket=Ticket::where('estado','!=','FINALIZADO')->orWhere('estado','!=','CANCELADO')->get();
        return response()->json(['success'=>true,'tickets'=>$ticket]);
    }

    public function getLivianos(){
        $ticket1=Ticket::where('prefijo','=','LV')->where('estado','!=','CANCELADO')
                                                 ->where('estado','!=','FINALIZADO')->get();
        return response()->json(['success'=>true,'tickets'=>$ticket1]);
    }

    public function getPesados(){
        $ticket2=Ticket::where('prefijo','=','PE')->where('estado','!=','CANCELADO')
                                                 ->where('estado','!=','FINALIZADO')->get();
        return response()->json(['success'=>true,'tickets'=>$ticket2]);
    }

    public function getOtros(){
        $ticket3=Ticket::where('prefijo','=','OT')->where('estado','!=','CANCELADO')
                                                 ->where('estado','!=','FINALIZADO')->get();
        return response()->json(['success'=>true,'tickets'=>$ticket3]);
    }

    public function llamarTicket(Request $request,$id){
        
        $ticket=Ticket::where('idregistroentrada',$id)->update(['estado'=>$request['opcion']]);
        return $ticket;
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
