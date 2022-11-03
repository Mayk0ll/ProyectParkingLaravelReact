<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehiculo;
use Illuminate\Http\Request;

class VehiculoController extends Controller
{
    
    public function index()
    {
        $vehiculos = Vehiculo::all();
        return $vehiculos;
    }

    public function store(Request $request)
    {
        $vehiculo = new Vehiculo();
        $vehiculo->placa = $request->placa;
        $vehiculo->tipo = $request->tipo;
        $vehiculo->id_conductor = $request->id_conductor;

        $vehiculo->save();
    }

    public function show($id)
    {
        $vehiculo = Vehiculo::find($id);
        return $vehiculo;
    }

    public function update(Request $request, $id)
    {
        $vehiculo = Vehiculo::findOrFail($request->id);
        $vehiculo->placa = $request->placa;
        $vehiculo->tipo = $request->tipo;

        $vehiculo->save();
        return $vehiculo;
    }

    public function destroy($id)
    {
        $vehiculo = Vehiculo::destroy($id);
        return $vehiculo;
    }
}
