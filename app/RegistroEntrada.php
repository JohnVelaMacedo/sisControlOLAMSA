<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegistroEntrada extends Model
{
    public $table="registroentrada";
    public $timestamps=true;
    protected $fillable=[
        'id',
        'tipoVehiculo',
        'numPlaca',
        'transportista',
        'observaciones',
        'created_at',
        'updated_at'
    ];
}
