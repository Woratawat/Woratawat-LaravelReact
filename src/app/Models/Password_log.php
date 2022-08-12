<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Password_log extends Model
{
    use HasFactory;

    protected $fillable = [
      'user_id',
      'password',
    ];

    // protected $hidden = [
    //   'password',
    // ];
}
