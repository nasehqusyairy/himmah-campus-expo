<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participant extends Model
{
    protected $fillable = ['invoice_id', 'name', 'presence_token', 'present_at'];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function certificate()
    {
        return $this->hasOne(Certificate::class);
    }
}
