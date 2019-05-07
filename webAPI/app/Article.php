<?php

namespace App;

use App\Events\CommentWasCreated;
use App\Notifications\NewComment;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable=['title','body','user_id'];

    public function user(){
        return $this->hasOne('App\User','id','user_id')->select(['id', 'name', 'email']);
    }

    public function image()
    {
        return $this->morphOne('App\Image', 'imageable');
    }

    public function  comments(){
        return $this->hasMany('App\Comment','article_id','id')->with('user');
    }
}
