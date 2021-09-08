<?php

namespace App\Http\Livewire;

use App\Mail\SendReport;
use App\Models\Attendance;
use App\Models\Worker;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Livewire\Component;

class DatedDashboardComponent extends Component
{
    public $co_early;
    public $co_late;
    public $co_absent;
    public $co_members;
    public $date;

    public function getOldDateProperty()
    {
        $limit_attendance = Attendance::latest('created_at')->limit(1)->pluck('created_at')->first();
        if (!is_null($limit_attendance)) {
            return  $limit_attendance;
        }
    }

    public function mount()
    {
        $this->co_members = Worker::all()->count();
        $this->fill(request()->only('date'));
        if (!$this->date && !is_null($this->oldDate)) {
            $this->co_early = Attendance::where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->co_late = Attendance::where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->co_absent = Attendance::where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
        } else if ($this->date) {
            $this->co_early = Attendance::where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->co_late = Attendance::where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->co_absent = Attendance::where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
        } else {
        }
    }

    public function sendReport()
    {
        $this->fill(request()->only('date'));
        if (!$this->date && !is_null($this->oldDate)) {
            $body = [
                'type' => 'dashboard',
                'co_members' => $this->co_members,
                'co_early' => $this->co_early,
                'co_late' => $this->co_late,
                'co_absent' => $this->co_absent,
                'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d'),
            ];

            Mail::to('pstoyewolesoetan@gmail.com')
                ->cc('davemoses3@gmail.com')
                ->queue(new SendReport($body));
        } else if ($this->date) {
            $body = [
                'type' => 'dashboard',
                'co_members' => $this->co_members,
                'co_early' => $this->co_early,
                'co_late' => $this->co_late,
                'co_absent' => $this->co_absent,
                'date' => $this->date,
            ];

            Mail::to('pstoyewolesoetan@gmail.com')
                ->cc('davemoses3@gmail.com')
                ->queue(new SendReport($body));
        }
    }
    public function render()
    {
        return view('livewire.dated-dashboard-component')->layout('layouts.base');
    }
}
