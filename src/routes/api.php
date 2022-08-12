<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('/checkingAuthenication', function(){
    
  if(!auth('sanctum')->check()){
    
    return response()->json(['success'=>false,'message'=>'not login']);

  }else{

    return response()->json(['success'=>true,'message'=>'you are in'], 200);

  }

});

Route::middleware(['auth:sanctum'])->group(function () {

  Route::prefix('profile')->group(function () {

    Route::get('/', [UserController::class, 'profile']);

    Route::post('edit', [UserController::class, 'editProfile']);

    Route::post('changePassword', [UserController::class, 'changePassword']);

  });

  Route::post('logout', [AuthController::class, 'logout']);

});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
