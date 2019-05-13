<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = ['text'];

    protected $table="tags";

    public function articles(){
        return $this->belongsToMany('App\Articles','tag_to_articles');
    }

    public function findOrCreate($inputTags){
        $tags = [];

        foreach ($inputTags as $tag){
            $foundTag = $this->findTag($tag);
            if(!$foundTag){
                $new = static::create(['text' => $tag['text']]);
                array_push($tags, $new);
            }else{
                array_push($tags, $foundTag);
            }
        }
        return $tags;
    }

    public function findTag($tag){
        $check = static::where('text', $tag['text'])->first();
        if(is_null($check)){
            return false;
        }
        return $check;
    }

}
