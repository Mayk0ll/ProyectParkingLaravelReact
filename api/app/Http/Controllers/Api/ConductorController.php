<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conductor;

class ConductorController extends Controller
{
    
    public function index()
    {
        $conductores = Conductor::all();
        return $conductores;
    }

    public function store(Request $request)
    {
        $conductor = new Conductor();
        $conductor->id = $request->id;
        $conductor->nombre = $request->nombre;
        $conductor->apellido = $request->apellido;
        $conductor->apellido2 = $request->apellido2;
        $conductor->telefono = $request->telefono;
        $conductor->correo = $request->correo;

        $conductor->save();
    }

    public function show($id)
    {
        $conductor = Conductor::find($id);
        return $conductor;
    }

    public function update(Request $request, $id)
    {
        $conductor = Conductor::findOrFail($request->id);
        $conductor->nombre = $request->nombre;
        $conductor->apellido = $request->apellido;
        $conductor->apellido2 = $request->apellido2;
        $conductor->telefono = $request->telefono;
        $conductor->correo = $request->correo;

        $conductor->save();
        return $conductor;
    }

    public function destroy($id)
    {
        $conductor = Conductor::destroy($id);
        return $conductor;
    }
}
