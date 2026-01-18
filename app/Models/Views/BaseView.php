<?php

namespace App\Models\Views;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

abstract class BaseView extends Model
{
    protected $primaryKey = 'user_id';
    public $incrementing = false;
    public $timestamps = false;
    protected $guarded = [];

    public function getTable()
    {
        // ViewAlumniDelegation -> alumni_delegations
        $name = class_basename($this);
        $name = Str::snake(Str::replaceFirst('View', '', $name));

        return 'view_' . $name;
    }
}
