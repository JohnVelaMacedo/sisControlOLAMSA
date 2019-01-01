<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegistroEntrada extends Model
{
    public $table="registroentrada";
    public $timestamps=false;
    protected $fillable=[
        'id',
        'tipoVehiculo',
        'numPlaca',
        'transportista',
        'observaciones'
    ];
}
