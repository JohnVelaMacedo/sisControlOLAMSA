<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
})->middleware('guest');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/home_user', 'HomeController@getUser');

// Rutas Evaluador
Route::resource('/pendiente_descarga', 'PendienteDescargaController')->middleware('auth');

//ruta Persona
Route::post('/agregarPersona','PersonaController@store')->name('agregarPersona');
Route::get('/eliminarPersona/{dni}','PersonaController@destroy')->name('eliminarPersona');
Route::get('/getPersona/{dni}','PersonaController@edit')->name('editarPersona');
Route::resource('/listaPersona','PersonaController');

//rutas tipos de vehiculos
Route::post('/agregarTipoVehiculo','TipoVehiculoController@store')->name('agregartipoVehiculo');
Route::get('/getTipoVehiculo/{id}','TipoVehiculoController@edit')->name('editarTipoVehiculo');
Route::resource('/listaTipoVehiculo','TipoVehiculoController');
Route::get('/eliminarTipoVehiculo/{dni}','TipoVehiculoController@destroy')->name('eliminarProveedor');

//rutas proveedor
Route::post('/agregarProveedor','ProveedorController@store')->name('agregarProveedor');
Route::get('/getProveedor/{id}','ProveedorController@edit')->name('editarProveedor');
Route::resource('/listaProveedor','ProveedorController');
Route::get('/eliminarProveedor/{dni}','ProveedorController@destroy')->name('eliminarProveedor');

//rutas comite
Route::post('/agregarComite','ComiteController@store')->name('agregarComite');
Route::get('/getComite/{id}','ComiteController@edit')->name('editarComite');
Route::resource('/listaComite','ComiteController');
Route::get('/eliminarComite/{dni}','ComiteController@destroy')->name('eliminarComite');

//ruta para registro-entrada
Route::get('/getTransportistas/{id}','RegistroEntradaController@showTransporista')->name('transportistaShow');
Route::get('/getRegEntrada/{id}','RegistroEntradaController@edit')->name('editarRegEntrada');
Route::post('/agregarRegistroEntrada','RegistroEntradaController@store')->name('agregarRegEntrada');
Route::resource('/listaRegistroEntrada','RegistroEntradaController');
Route::get('/eliminarRegEntrada/{dni}','RegistroEntradaController@destroy')->name('eliminarRE');
Route::get('/verInfo/{dni}','RegistroEntradaController@verInfo')->name('verinfo');
Route::post('/filtroTablaReg','RegistroEntradaController@filtrar')->name('filtrar');
// rutas tipo persona
Route::resource('/tipoPersona', 'TipoPersonaController');

//rutas pendiente entrada salida
Route::resource('/listaPendienteEntradaSalida','PendienteEntradaSalidaController');
Route::post('/checkInicio','PendienteEntradaSalidaController@checkInicio')->name('checkInicio');
Route::post('/checkFin','PendienteEntradaSalidaController@checkFin')->name('checkFin');

//rutas para reportes
Route::resource('/listaInicialReporte','ReporteController');
Route::post('/filtroTabla','ReporteController@filtrar')->name('filtrar');
Route::post('/pdf','ReporteController@pdf')->name('pdf');

// Rutas alternas
// Route::view('/{path?}', 'app');
Route::get('{path}', 'HomeController@index')->where('path', '([A-z\d-\/_.]+)?');