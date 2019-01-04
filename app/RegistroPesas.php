<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RegistroPesas extends Model
{
<<<<<<< HEAD
    public $table = 'registropesas';
    public $timestamps = false;
    protected $fillable = [
        'id', 'idregistroentrada', 'numPesas', 'comite', 'proveedor' 
=======
    public $table="registropesas";
    public $timestamps=false;
    protected $fillable=[
        'id',
        'idregistroentrada',
        'numPesas',
        'comite',
        'proveedor'
>>>>>>> origin/master
    ];
}
