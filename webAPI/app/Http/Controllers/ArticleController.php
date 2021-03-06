<?php

namespace App\Http\Controllers;

use App\Article;
use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function index(){
        return Article::with('user','image','tags')->get();
    }

    public function show(Article $article){
        return Article::with('user','image','comments','tags')->findOrFail($article->id);
    }

    public function store(Request $request){
        $image = new Image(['url' => $request->url]);
        $article = Article::create($request->all()+ ['user_id' => Auth::user()->id]);
        $article->addtags($request->tags);
        $article->image()->save($image);
        return response()->json(Article::with('user','image','tags')->findOrFail($article->id), 201);
    }

    public function update(Request $request, Article $article){
        $article->update($request->all());
        return response()->json($article, 200);
    }

    public function delete(Article $article){
        $article->delete();
        return response()->json(null, 204);
    }
}
