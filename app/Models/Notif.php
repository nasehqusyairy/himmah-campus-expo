<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notif extends Model
{
    protected $fillable = ['user_id', 'title', 'message', 'action', 'read_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
