<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PendienteDescarga extends Model
{
    public $table = "pendientedescarga_inicio_fin";
    public $timestamps = false;
    protected $fillable = [
        'id', 
        'idRegistroEntrada', 
        'checkInicio', 
        'checkFin', 
        'ObservacionInicio', 
        'ObservacionFin',
        'fechaInicio', 
        'horaInicio',
        'fechaFin', 
        'horaFin'  
    ];
}
