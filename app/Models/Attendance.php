<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'clockout',
        'status',
        'co_status',
        'permit',
    ];
    protected $table = "attendances";

    public function scopeSearch($query, $term)
    {
        $term = "%$term%";
        $query->where(function ($query) use ($term) {
            $query->where('fullname', 'like', $term)
                ->orWhere('email', 'like', $term)
                ->orWhere('department', 'like', $term)
                ->orWhere('user_id', 'like', $term);
        });
    }
}
