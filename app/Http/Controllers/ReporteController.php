<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade as PDF;   

class ReporteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reporte=\DB::select("declare @return_value int exec @return_value=[dbo].[reportesAll] ");
        return compact('reporte');
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
    public function filtrar(Request $request)
    {
        $fil='';
        // for ($i=0; $i <$request['filtro']; $i++) { 
        //     $fil+='';
        // }
        // var_dump($request['filtro']);
        foreach ($request['filtro'] as $key => $value) {
            if($value!=''){
                switch ($key) {
                    case 'tipoVehiculo':
                        $fil=$fil.'tv.id='.$value.' and ';
                        break;
                    case 'numPlaca':
                        $fil=$fil.'re.numPlaca=\''.$value.'\' and ';
                        break;
                    case 'transportista':
                        $fil=$fil.'pers.dni='.$value.' and ';
                        break;
                    case 'comite':
                        $fil=$fil.'c.id='.$value.' and ';
                        break;
                    case 'proveedor':
                        $fil=$fil.'pro.id='.$value.' and ';
                        break;
                    case 'desde':
                        $fil=$fil.' date(re.created_at) >= \''.$value.'\'';
                        break;
                    case 'hasta':
                        $fil=$fil.' and date(re.created_at) <= \''.$value.'\'';
                        break;
                }
            }
        }
        // echo $fil;
        $reporte=\DB::select("SELECT re.id, tv.descripcion as vehiculo, re.numPlaca as placa, concat(pers.nombre,' ',pers.apellidos) as transportista, re.created_at,
        GROUP_CONCAT(rp.numPesas) as pesas, GROUP_CONCAT(c.nombre) as comite, GROUP_CONCAT(pro.nombre) as proveedor, pes.fechaHoraInicio as entrada,
        pes.fechaHoraFin as salida,concat('1.',pes.ObservacionInicio,' - 2.',pes.ObservacionFin) as observaciones1, concat(pif.fechaInicio,' ',pif.HoraInicio) as descargaInicio, concat(pif.fechaFin,' ',pif.horaFin) as descargaFin, concat('1.',pif.ObservacionInicio,' - 2.',pif.ObservacionFin) as observaciones2
        FROM registroentrada re
        INNER JOIN tipoVehiculo tv ON re.tipoVehiculo=tv.id
        INNER JOIN persona pers on re.transportista=pers.dni
        INNER JOIN registropesas rp ON re.id = rp.idregistroentrada
        INNER JOIN proveedor pro on rp.proveedor=pro.id
        INNER JOIN comite c ON rp.comite = c.id
        INNER JOIN pendiente_entrada_salida pes ON re.id=pes.idRegistroEntrada
        INNER JOIN pendientedescarga_inicio_fin pif ON re.id=pif.idRegistroEntrada
        WHERE (".$fil.")
        GROUP by re.id ");

        return compact('reporte');
        
    }

    public function pdf(Request $request)
    {   
        if($request['filtro']['desde']=='' || $request['filtro']['hasta']==''){
            $query=$this->index();
        }else{
            $query = $this->filtrar($request);
        }
        $pdf = PDF::loadView('reporte', $query)->setPaper('a4', 'landscape');
        $output = $pdf->stream();
        return $output;
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
