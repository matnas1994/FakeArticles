<?php

namespace App\Broadcasting;

use App\Article;
use App\User;

class OrderChannel
{
    /**
     * Create a new channel instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\User  $user
     * @return array|bool
     */
    public function join(User $user, Article $article)
    {
        return $user->id === $article->user_id;
    }
}
