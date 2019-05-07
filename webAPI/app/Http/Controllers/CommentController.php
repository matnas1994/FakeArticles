<?php

namespace App\Http\Controllers;

use App\Article;
use App\Comment;
use App\Events\CommentWasCreated;
use App\User;
use Illuminate\Http\Request;
use App\Notifications\NewComment;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    public function store(Article $article, Request $request){
        $comment = Comment::create($request->all()+['article_id' => $article->id]+['user_id' => Auth::user()->id]);
        $article->user->notify(new NewComment($comment));
        $commentWithRelaction = Comment::with('user')->findOrFail($comment->id);
        broadcast(new CommentWasCreated($commentWithRelaction,$article->id));
        return response()->json($commentWithRelaction,201);
    }
}
