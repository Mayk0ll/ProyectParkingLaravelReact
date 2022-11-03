<?php

use App\Http\Controllers\Api\ConductorController;
use App\Http\Controllers\Api\VehiculoController;
use App\Http\Controllers\Api\RegistroController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(ConductorController::class)->group(function() {
    Route::get('/conductores','index');
    Route::post('/conductor','store');
    Route::get('/conductor/{id}','show');
    Route::put('/conductor/{id}','update');
    Route::delete('/conductor/{id}','destroy');
});

Route::controller(VehiculoController::class)->group(function() {
    Route::get('/vehiculos','index');
    Route::post('/vehiculo','store');
    Route::get('/vehiculo/{id}','show');
    Route::put('/vehiculo/{id}','update');
    Route::delete('/vehiculo/{id}','destroy');
});

Route::controller(RegistroController::class)->group(function() {
    Route::get('/registros','index');
    Route::post('/registro','store');
    Route::get('/registro/{id}','show');
    Route::put('/registro/{id}','update');
    Route::delete('/registro/{id}','destroy');
});