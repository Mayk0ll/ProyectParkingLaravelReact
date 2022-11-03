<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Registro extends Model
{
    use HasFactory;
    protected $fillable = ['salida','estado','total','id_placa'];

    public function vehiculo(){
        return $this->belongsTo(Vehiculo::class);
    }
}
