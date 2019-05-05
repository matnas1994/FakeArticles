<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable=['title','body','user_id'];

    public function user(){
        return $this->belongsTo('App\User','user_id','id')->select(['id', 'name', 'email']);
    }

    public function image()
    {
        return $this->morphOne('App\Image', 'imageable');
    }

    public function  comments(){
        return $this->hasMany('App\Comment','article_id','id')->with('user');
    }
}
