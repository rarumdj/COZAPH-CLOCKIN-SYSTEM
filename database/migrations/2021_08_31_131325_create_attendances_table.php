<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAttendancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('fullname');
            $table->string('department');
            $table->string('email');
            $table->string('phone');
            $table->string('calltime');
            $table->string('clockin')->nullable();
            $table->string('clockout')->nullable();
            $table->boolean('co_status')->default(0);
            $table->string('permit')->default('No');
            $table->string('status')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('attendances');
    }
}
