<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MyMongoModel;
use App\Models\Urls;
use Goutte\Client;

class DataController extends Controller
{

    public function scrapData(Request $request)
    {
        $inputData = $request->input('scrapURL');

        $client = new Client();
        $tagsToScrap = ['h1','h2','h3','h4','a','li','p','article','div'];
        $scrapedData = [];

        try{

            $crawler = $client->request('GET',$inputData);
            $checkForIncapsula = $client->request('GET',$inputData)->text();
      
            if (strpos($checkForIncapsula, "Incapsula incident") !== false || $checkForIncapsula == '') {

                return response()->json(['error'=>'Scrap blocked by Incapsula']);
            }
            
            foreach($tagsToScrap as $tag){
              
                if($crawler->filter($tag)->count() > 0){

                    if($crawler->filter($tag)->count() > 1){
                           
                        if($tag =='a'){
                            $tagToBeAdded = $crawler->filter($tag)->each(function ($node) {      

                                return $node->attr('href');
                            });

                        }else{
                            $tagToBeAdded = $crawler->filter($tag)->each(function ($node) {                                
                                return $node->text();
                            });                            
                        }      
                          
                            $scrapedData[$tag] = $tagToBeAdded;

                        }else{

                            $tagToBeAdded = $tag == 'a' ? $crawler->filter($tag)->attr('href') : $crawler->filter($tag)->text();
                            $scrapedData[$tag] = $tagToBeAdded;
                        }
                    }
                }

                    $data = [$scrapedData];

            } catch (\Exception $e) {
                $data = ['message' => $e->getMessage()];
                }

            if(count($scrapedData) == 0) return response()->json(['error'=>'Nodes are empty']);
 
        return response()->json($data);
    }

    public function showUrls(){
        
        $result = Urls::all();
        return response()->json($result);

    }


    public function postData(Request $request)
    {
    
    try {
        $client = new Client();
        $inputData = $request->input('inputField');
        $crawler = $client->request('GET',$inputData);
        $URLExists = Urls::where('name',$inputData)->first() ? $inputData : null;
        $data = $this->urlCheckIfExists($URLExists,$inputData);
        return response()->json($data);

    } catch (\Exception $e) {

        return response()->json(['message'=>$e->getMessage()]);
        }
    }

    public function deleteUrl($id){

        try{
            $url = Urls::find($id);
          $url = Urls::where('_id', $id)->delete();

        }catch (\Exception $e) {
            $data = ['error' => $e->getMessage()];
        }
        return redirect()->back();
    }
    0
    public function urlCheckIfExists($URLExists,$inputData){
        if(is_null($URLExists)){
            Urls::create(["name"=>$inputData]);
            $data = ['message' => 'URL added!'];
        }else if($URLExists == $inputData){
            $data = ['message' => 'URL already exists in database!'];
        }
        return $data;
    }
}
