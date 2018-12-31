<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FechaHoraDescarga extends Model
{
    public $table = 'fechahoradescarga';
    public $timestamps = false;
    protected $fillable = [
        'id', 'id_pendienteDescarga', 'observaciones', 'fechaReg', 'horaReg', 'fechafinReg', 'horafinReg'
    ];
}
