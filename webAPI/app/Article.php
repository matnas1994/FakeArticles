<?php

namespace App;

use App\Events\CommentWasCreated;
use App\Notifications\NewComment;
use Illuminate\Database\Eloquent\Model;
use App\Tag;

class Article extends Model
{
    protected $fillable=['title','body','user_id'];

    protected $table="articles";

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

    public function tags(){
        return $this->belongsToMany('App\Tag','tag_to_articles');
    }

    public function addTags($inputTags){
        $tags = new Tag();
        $tags = $tags->findOrCreate($inputTags);
        foreach ($tags as $tag){
            static::tags()->attach($tag['id']);
        }
    }

}
