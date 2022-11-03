<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registro;
use Illuminate\Http\Request;

class RegistroController extends Controller
{
        public function index()
    {
        $registros = Registro::all();
        return $registros;
    }

    public function store(Request $request)
    {
        $registro = new Registro();
        $registro->ingreso = $request->ingreso;
        $registro->salida = $request->salida;
        $registro->estado = $request->estado;
        $registro->total = $request->total;
        $registro->id_placa = $request->id_placa;

        $registro->save();
    }

    public function show($id)
    {
        $registros = Registro::find($id);
        return $registros;
    }

    public function update(Request $request, $id)
    {
        $registro = Registro::findOrFail($request->id);
        $registro->salida = $request->salida;
        $registro->estado = $request->estado;
        $registro->total = $request->total;

        $registro->save();
        return $registro;
    }

    public function destroy($id)
    {
        $registro = Registro::destroy($id);
        return $registro;
    }
}
