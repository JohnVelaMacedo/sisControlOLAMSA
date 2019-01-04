<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comite extends Model
{
    public $table="comite";
    public $timestamps=false;
    protected $fillable=[
        'id',
        'nombre',
        'descripcion'
    ];
}
