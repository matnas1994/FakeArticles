<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'content', 'user_id', 'article_id'
    ];

    public function user(){
        return $this->belongsTo('App\User','user_id','id')->select(['id', 'name', 'email']);
    }

    public function article(){
        return $this->belongsTo('App\Article','article_id','id')->select(['id', 'title']);
    }
}
