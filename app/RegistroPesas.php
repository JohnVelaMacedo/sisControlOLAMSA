<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegistroPesas extends Model
{
    public $table = 'registropesas';
    public $timestamps = false;
    protected $fillable = [
        'id', 'idregistroentrada', 'numPesas', 'comite', 'proveedor' 
    ];
}
