<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Notifications\MailResetPasswordToken;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'facebook_id', 'verified','email_token','email_verified_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function generateToken(){

        $this->api_token = str_random(60);
        $this->save();

        return $this->api_token;
        
    }

    public function image()
    {
        return $this->morphOne('App\Image', 'imageable');
    }

    public function role(){
        return $this->belongsToMany('App\Role','role_has_users');
    }

    public function hasAnyRoles($roles){
        if(is_array($roles)){
            foreach ($roles as $role)
                if($this->has_role($role))
                    return true;
        }else{
            return $this->has_role($roles);
        }
        return false;
    }

    public function has_role($role){
        if($this->role()->where('name',$role)->first()){
            return true;
        }
        return false;
    }

    public function addNew($input)
    {
        $check = static::where('facebook_id',$input['facebook_id'])->first();

        if(is_null($check)){
            $check = static::where('email',$input['email'])->first();
            if(is_null($check)){
                return static::create($input);
            }
            $check->update($input);
            return $check;
        }

        return $check;
    }

    public function receivesBroadcastNotificationsOn()
    {
        return 'App.User.' . $this->id;
    }


    public function sendPasswordResetNotification($token)
    {
        $this->notify(new MailResetPasswordToken($token));
    }
}
