<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    public $table = 'persona';
    public $timestamps = false;
    protected $fillable = [
        'id', 'nombre', 'apellidos', 'dni', 'email','telefono', 'direccion', 'tipo','licencia'
    ];
}
