<?php

namespace App\Http\Controllers;

use App\Article;
use App\Comment;
use App\Events\CommentWasCreated;
use App\User;
use Illuminate\Http\Request;
use App\Notifications\NewComment;
use Illuminate\Notifications\Notifiable;

class CommentController extends Controller
{

    public function store(Article $article, Request $request){
        //$comment = $article->addComment($request->all());
        $comment = Comment::create($request->all());
        Article::findOrFail(77)->user->notify(new NewComment($comment));

        return $comment;
    }
}
