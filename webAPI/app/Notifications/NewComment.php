<?php

namespace App\Notifications;

use App\Comment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewComment extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    private $comment;

    public function __construct(Comment $comment)
    {
        $this->comment = $comment;
    }
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }
    public function toArray($notifiable)
    {
        return [ 'article' =>[
                'id' => $this->comment->article_id
            ],
            'author' => [
                'id' => $this->comment->user_id,
                'name' => $this->comment->user->name,
            ],
            'comment' => [
                'id' => $this->comment->id,
            ]
           ];
     }

    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }

    public function broadcastType()
    {
        return 'new-comment';
    }
}
