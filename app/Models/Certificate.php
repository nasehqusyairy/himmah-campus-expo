<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificate extends Model
{
    protected $fillable = ['participant_id'];
    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }
}
