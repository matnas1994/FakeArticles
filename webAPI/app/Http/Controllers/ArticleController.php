<?php

namespace App\Http\Controllers;

use App\Article;
use App\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function index(){
        return Article::with('user','image')->get();
    }

    public function show(Article $article){
        return Article::with('user','image','comments')->findOrFail($article->id);
    }

    public function store(Request $request){
        $image = new Image(['url' => $request->url]);
        $article = Article::create($request->all()+ ['user_id' => Auth::user()->id]);
        $article->image()->save($image);
        $article = Article::with('user','image')->findOrFail($article->id);
        return response()->json($article, 201);
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
