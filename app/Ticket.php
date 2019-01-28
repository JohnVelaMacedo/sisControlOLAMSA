<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    public $table="ticket";
    public $timestamp=false;
    public $fillable=[
        'id',
        'idregistroentrada',
        'prefijo',
        'numero',
        'fechaHora',
        'estado',
        'created_at',
        'updated_at'
    ];
}
