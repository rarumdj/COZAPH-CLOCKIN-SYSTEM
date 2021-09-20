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
                'link_early' => url('/attendance/earlyreport/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')),
                'co_late' => $this->co_late,
                'link_late' => url('/attendance/latereport/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')),
                'co_absent' => $this->co_absent,
                'link_absent' => url('/attendance/absentreport/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')),
                'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d'),
            ];

            Mail::to('pstoyewolesoetan@gmail.com')
                ->cc('davemoses3@gmail.com')
                ->queue(new SendReport($body));
            $this->emit('alert', ['type' => 'success', 'message' => 'Mail sent successfully.']);
        } else if ($this->date) {
            $body = [
                'type' => 'dashboard',
                'co_members' => $this->co_members,
                'co_early' => $this->co_early,
                'link_early' => url('/attendance/earlyreport/' . $this->date),
                'co_late' => $this->co_late,
                'link_late' =>  url('/attendance/latereport/' . $this->date),
                'co_absent' => $this->co_absent,
                'link_absent' => url('/attendance/absentreport/' . $this->date),
                'date' => $this->date,
            ];

            Mail::to('pstoyewolesoetan@gmail.com')
                ->cc('davemoses3@gmail.com')
                ->queue(new SendReport($body));
            $this->emit('alert', ['type' => 'success', 'message' => 'Mail sent successfully.']);
        }
    }
    public function render()
    {
        return view('livewire.dated-dashboard-component')->layout('layouts.base');
    }
}
