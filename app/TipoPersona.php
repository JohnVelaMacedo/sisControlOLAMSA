<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoPersona extends Model
{
    public $table   =   "tipopersona";
    public $timestamp=false;
    protected $fillable=[
        'id',
        'descripcion'
    ];
}
