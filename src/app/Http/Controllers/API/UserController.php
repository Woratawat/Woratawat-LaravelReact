<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Password_log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
  public function profile(Request $request)
  {
    $data = auth()->user();

    $dir = url('storage/images/profile/');

    $data['pic'] = $dir.'/'.$data['pic'];

    return response()->json([
      'success'=>true,
      'data'=>$data,
    ]);

  }

  public function editProfile(Request $request)
  {

    $id = $request->get('id');
    $fname = $request->get('fname');
    $lname = $request->get('lname');

    if ($request->hasFile('pic')) {

      $oldimg = User::where('id', $id)->select('pic')->first();

      $has_img = public_path('storage/images/profile/').$oldimg->pic;

      if (file_exists($has_img)) {
      
        \File::delete($has_img);
        
      }
  
      $imageName = $request->file('pic')->getClientOriginalName();

      $request->file('pic')->storeAs('/images/profile/',$imageName,'public');

      User::where('id', $id)
          ->update([
            'firstname' => $fname,
            'lastname' => $lname,
            'pic' => $imageName,
          ]);

    }else{

      User::where('id', $id)
      ->update([
        'firstname' => $fname,
        'lastname' => $lname,
      ]);
      
    }

    return response()->json([
      'success'=>true,
      'message'=>'Edit yore profile Successfully',
    ]);

  }

  public function changePassword(Request $request)
  {
  
    $id = $request->get('id');
    $pass = $request->get('pass');
    $testPass = [];
    $pass_log = Password_log::where('user_id', $id)->select('user_id','password')->get();

    foreach ($pass_log as $key => $value) {

      if(Hash::check($pass , $pass_log[$key]->password)){

        array_push($testPass , true);

      }else{

        array_push($testPass , false);

      }

    } 

    $trueResult = count(array_filter($testPass));


    if($trueResult == 0){

        if(count($pass_log) >= 5){
          
          Password_log::where('user_id', $id)->first()->delete();
    
        }

        Password_log::create([
          'user_id' => $id,
          'password' => Hash::make($request->get('pass')),  
        ]);

        User::where('id', $id)
        ->update([
          'password' => Hash::make($request->get('pass')),
        ]);

      $message = 'Change password successful';
      $status = true;
    }else{
      $status = false;
      $message = 'Password must be unique  previous 5 times.';
    } 


    return response()->json([
      'success'=>$status,
      'message'=>$message,
    ]);

  }

}
