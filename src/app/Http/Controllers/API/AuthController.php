<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
  public function register(Request $request)
  {

    $validate = Validator::make($request->all(), [
      'user'=>'unique:users,name'
    ]);

    if($validate->fails()){

      return response()->json([
        'success'=>false,
        'user'=>'มีusernameนี้แล้วในระบบ',
      ]);

    }else{

      if ($request->hasFile('pic')) {

        $imageName = $request->file('pic')->getClientOriginalName();

        $request->file('pic')->storeAs('/images/profile/',$imageName,'public');

      }else{

        $imageName = '' ;
        
      }

      $user = User::create([
        'name' => $request->get('user'),
        'password' => Hash::make($request->get('pass')),
        'firstname' => $request->get('fname'),
        'lastname' => $request->get('lname'),
        'pic' => $imageName,        
      ]);

      $token = $user->createToken($user->name.'_token')->plainTextToken;

      return response()->json([
        'success'=>true,
        'user'=>$request->get('user'),
        'token'=>$token,
        'message'=>'Registered Successfully',
      ], 200);

    }

  }
  
  public function login(Request $request)
  {

    $user = User::where('name', $request->get('user'),)->first();
 
    if (! $user || ! Hash::check($request->get('pass'), $user->password)) {

      return response()->json([
        'success'=>false,
        'pass'=>'Username or Password incorrect',
      ]);

    }else{

      $token = $user->createToken($user->name.'_token')->plainTextToken;

      return response()->json([
        'success'=>true,
        'user'=>$request->get('user'),
        'token'=>$token,
        'message'=>'Logged in Successfully',
      ], 200);

    }

  }

  public function logout(Request $request)
  {
    auth()->user()->tokens()->delete();

    return response()->json([
      'success'=>true,
      'message'=>'Logged out Successfully',
    ], 200);

  }

}
