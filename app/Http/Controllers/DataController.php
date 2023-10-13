<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DataController extends Controller
{
// app/Http/Controllers/DataController.php
    public function index()
    {
        $data = ['message' => 'This is your Laravel API data'];
        return response()->json($data);
    }

    public function postData(Request $request)
    {
        var_dump($request->all());
        die;
        // Get the input data from the request
        $inputData = $request->input('inputField');

        // Process the data or save it to the database
        
        // You can return a response or data if needed
        $data = ['message' => 'Data received from Angular: ' . $inputData];
        return response()->json($data);
    }

}
