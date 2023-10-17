<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MyMongoModel;
use App\Models\Urls;
use MongoDB\Client;

class DataController extends Controller
{

    public function index()
    {
        echo '<pre>';
        $result = Urls::all();
        var_dump($result);
        die;
        $data = ['message' => 'This is your Laravel API data'];
        return response()->json($data);
    }


    public function showUrls(){
        
        $result = Urls::all();
        return response()->json($result);

    }

    public function postData(Request $request)
    {

        $inputData = $request->input('inputField');
        Urls::create([$inputData]);

        $data = ['message' => 'Data received from Angular: ' . $inputData];
        return response()->json($data);    }
}
