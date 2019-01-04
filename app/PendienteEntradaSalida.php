<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PendienteEntradaSalida extends Model
{
    public $table="pendiente_entrada_salida";
    public $timestamps=false;
    protected $fillable=[
        'id',
        'idRegistroEntrada',
        'checkIngreso',
        'checksalida',
        'ObservacionInicio',
        'ObservacionFin',
        'fechaHoraInicio',
        'fechaHoraFin'
    ];
}
