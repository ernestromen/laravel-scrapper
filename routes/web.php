<?php

use Illuminate\Support\Facades\Route;


Route::post('/scrap', 'App\Http\Controllers\DataController@scrapData');
Route::get('/urls', 'App\Http\Controllers\DataController@showUrls');
Route::post('/', 'App\Http\Controllers\DataController@postData');