<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegistroEntrada extends Model
{
<<<<<<< HEAD
    public $timestamps = false;
    protected $fillable = ['id', 'tipoVehiculo', 'numPlaca', 'transportista', 'observaciones'];
    public $table = 'registroentrada';
=======
    public $table="registroentrada";
    public $timestamps=false;
    protected $fillable=[
        'id',
        'tipoVehiculo',
        'numPlaca',
        'transportista',
        'observaciones'
    ];
>>>>>>> origin/master
}
