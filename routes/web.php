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
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/home_user', 'HomeController@getUser');

// Rutas Evaluador
Route::resource('/fecha_hora_descarga', 'FechaHoraDescargaController');

// Rutas alternas
// Route::view('/{path?}', 'app');
Route::get('{path}', 'HomeController@index')->where('path', '([A-z\d-\/_.]+)?');