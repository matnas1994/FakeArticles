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




Auth::routes(['verify' => true]);
Route::post('fbLogin', 'Auth\LoginController@fbLogin');

Route::post('comment/{articles}', 'CommentController@store');


Route::middleware('auth:api')->get('/logged', 'UserController@logged');



Route::middleware('auth:api')
    ->get('/user', function (Request $request) {
        return \Illuminate\Support\Facades\Auth::user();
    });

Route::get('/', function () {
    return view('welcome');
});
Route::get('articles', 'ArticleController@index');
Route::middleware('auth:api')->post('articles', 'ArticleController@store');
Route::get('articles/{article}', 'ArticleController@show');
Route::middleware('auth:api')->put('articles/{article}', 'ArticleController@update')->middleware('can:update-article,article');
Route::delete('articles/{article}', 'ArticleController@delete')->middleware('can:delete-article,article');


Route::group(['middleware' => ['api-header']], function(){


});




Route::group(['middleware' => ['auth:api','roles'], 'roles' => 'admin'], function() {
   // Route::get('articles', 'ArticleController@index');
  //  Route::put('articles/{article}', 'ArticleController@update')->middleware('can:update-article,article');
 //   Route::delete('articles/{article}', 'ArticleController@delete')->middleware('can:delete-article,article');
});



Route::group(['middleware' => 'roles', 'roles' => ['asdasd','admin']],function (){
Route::get('role', function () {
    return (String)\Illuminate\Support\Facades\Auth::user()->hasAnyRoles('admin');
});
});



Route::get('auth/facebook', 'Auth\FacebookController@redirectToFacebook');
Route::get('auth/facebook/callback', 'Auth\FacebookController@handleFacebookCallback');

Route::get('register/verify/{token}', 'Auth\RegisterController@verify');


Route::get('sendEmail',function(){
    $job = (new \App\Jobs\SendEmailJob())->delay(Carbon::now()->addSecond(5));
    dispatch($job);
   return 'Email is Send Properly';
});