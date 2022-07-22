<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Worker extends Model
{
    use HasFactory;
    protected $table = "workers";

    public function scopeSearch($query, $term)
    {
        $term = "%$term%";
        $query->where(function ($query) use ($term) {
            $query->where('firstname', 'like', $term)
                ->orWhere('lastname', 'like', $term)
                ->orWhere('email', 'like', $term)
                ->orWhere('department', 'like', $term)
                ->orWhere('user_id', 'like', $term)
                ->orWhere('role', 'like', $term);
        });
    }
}
