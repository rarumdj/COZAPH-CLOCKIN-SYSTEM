<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DownloadReportController;
use App\Http\Livewire\ChangeDateComponent;
use App\Http\Livewire\ClockinComponent;
use App\Http\Livewire\ClockoutComponent;
use App\Http\Livewire\CreateAdminComponent;
use App\Http\Livewire\DashboardComponent;
use App\Http\Livewire\DatedDashboardComponent;
use App\Http\Livewire\EditWorkersComponent;
use App\Http\Livewire\MailDashboardComponent;
use App\Http\Livewire\MailerComponent;
use App\Http\Livewire\RegisterWorker;
use App\Http\Livewire\ViewWorkersComponent;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('dashboard');
// });



Route::get('worker/register/', RegisterWorker::class)->name('worker.register');
Route::get('attendance/earlyreport/{date}', [DownloadReportController::class, 'downloadEarly']);
Route::get('attendance/latereport/{date}', [DownloadReportController::class, 'downloadLate']);
Route::get('attendance/absentreport/{date}', [DownloadReportController::class, 'downloadAbsent']);


// for admin
Route::middleware(['auth:sanctum', 'verified', 'authadmin'])->group(function () {
    Route::get('/', DashboardComponent::class);
    Route::get('/', DatedDashboardComponent::class)->name('search.date');
    Route::get('workers/', ViewWorkersComponent::class)->name('worker.view');
    Route::get('worker/edit/{user_id}', EditWorkersComponent::class)->name('worker.edit');
    Route::get('worker/clockin/', ClockinComponent::class)->name('worker.clockin');
    Route::get('worker/clockout/', ClockoutComponent::class)->name('worker.clockout');
    Route::get('mail-dashborad/', MailDashboardComponent::class)->name('mail.dashboard');
    Route::get('mail-dashborad/mailer/', MailerComponent::class)->name('mail.mailer');
    Route::get('/register-admin', CreateAdminComponent::class)->name('admin.register');
});

require_once __DIR__ . '/fortify.php';
