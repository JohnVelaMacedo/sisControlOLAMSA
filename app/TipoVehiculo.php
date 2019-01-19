<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoVehiculo extends Model
{
    public $table = 'tipovehiculo';
    public $timestamps = false;
    protected $fillable = ['id', 'descripcion','tiempoEspera','clasificacion'];
}
