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
Route::resource('/fecha_hora_descarga', 'FechaHoraDescargaController', [
    'except' => ['create', 'show', 'edit']
])->middleware('auth');

// rutas tipo persona
Route::resource('/tipoPersona', 'TipoPersonaController');

//ruta Persona
Route::post('/agregarPersona','PersonaController@store')->name('agregarPersona');
Route::get('/eliminarPersona/{dni}','PersonaController@destroy')->name('eliminarPersona');
Route::get('/getPersona/{dni}','PersonaController@edit')->name('editarPersona');
Route::resource('/listaPersona','PersonaController');

// Rutas alternas
// Route::view('/{path?}', 'app');
Route::get('{path}', 'HomeController@index')->where('path', '([A-z\d-\/_.]+)?');