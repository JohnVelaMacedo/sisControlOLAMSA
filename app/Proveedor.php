<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    public $table = 'proveedor';
    public $timestamps = false;
    protected $fillable = [
        'id', 'nombre', 'descripcion', 'direccion', 'telefono'
    ];
}
