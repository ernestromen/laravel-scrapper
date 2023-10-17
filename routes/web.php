<?php

use Illuminate\Support\Facades\Route;


Route::get('/', 'App\Http\Controllers\DataController@index');
Route::get('/urls', 'App\Http\Controllers\DataController@showUrls');
Route::post('/', 'App\Http\Controllers\DataController@postData');