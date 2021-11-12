<?php

namespace App\Http\Livewire;

use App\Mail\SendReport;
use App\Models\Attendance;
use App\Models\CallTime;
use App\Models\Worker;
use Livewire\Component;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;

class ClockinComponent extends Component
{
    public $user_id;
    public $time;
    public $calltime;
    public $checkid;

    public function verifyuserid()
    {
        $worker = Worker::where('user_id', $this->user_id)->first();
        if (is_null($worker)) {
            $this->checkid = '';
        } else {
            $this->checkid = $worker->firstname . ' ' . $worker->lastname;
            session()->flash('check');
        }
    }

    public function clockin()
    {
        if (!$this->calltime == '') {

            $calltimeWith15min = Carbon::createFromFormat('H:i', $this->calltime)->format('H:i:s');

            $checktime_dup = Attendance::where('user_id', $this->user_id)->where('created_at', 'LIKE', '%' . Carbon::now()->format('Y-m-d') . '%')->first();

            if (!$checktime_dup) {
                $check_uid = Worker::where('user_id', $this->user_id)->first();
                if ($check_uid) {
                    if ($this->time == '') {
                        if (Carbon::now()->format('H:i:s') <= $calltimeWith15min) {
                            $clockin = new Attendance;
                            $clockin->user_id = $this->user_id;
                            $clockin->clockin = Carbon::now()->format('H:i:s');
                            $clockin->fullname = $check_uid->firstname . ' ' . $check_uid->lastname;
                            $clockin->department = $check_uid->department;
                            $clockin->email = $check_uid->email;
                            $clockin->phone = $check_uid->phone;
                            $clockin->calltime = $this->calltime;
                            $clockin->status = 'Early';
                            $clockin->save();
                            session()->flash('success', '' . $clockin->fullname . ' has been clocked in');
                            $body = [
                                'type' => 'clockin',
                                'name' => $clockin->fullname,
                                'user_id' => $clockin->user_id,
                                'time' => date('h:i a', strtotime($clockin->clockin)),
                                'calltime' => date('h:i a', strtotime($clockin->calltime)),
                                'status' => 'Early',
                                'date' => Carbon::now()->format('Y-m-d'),

                            ];

                            Mail::to($check_uid->email)
                                ->queue(new SendReport($body));
                        } else {
                            $clockin = new Attendance;
                            $clockin->user_id = $this->user_id;
                            $clockin->clockin = Carbon::now()->format('H:i:s');
                            $clockin->fullname = $check_uid->firstname . ' ' . $check_uid->lastname;
                            $clockin->department = $check_uid->department;
                            $clockin->email = $check_uid->email;
                            $clockin->phone = $check_uid->phone;
                            $clockin->calltime = $this->calltime;
                            $clockin->status = 'Late';
                            $clockin->save();
                            session()->flash('success', '' . $clockin->fullname . ' has been clocked in');
                            $body = [
                                'type' => 'clockin',
                                'name' => $clockin->fullname,
                                'user_id' => $clockin->user_id,
                                'time' => date('h:i a', strtotime($clockin->clockin)),
                                'calltime' => date('h:i a', strtotime($clockin->calltime)),
                                'status' => 'Late',
                                'date' => Carbon::now()->format('Y-m-d'),

                            ];

                            Mail::to($check_uid->email)
                                ->queue(new SendReport($body));
                        }
                    } else {
                        if ($this->time <= $calltimeWith15min) {
                            $clockin = new Attendance;
                            $clockin->user_id = $this->user_id;
                            $clockin->clockin = $this->time;
                            $clockin->fullname = $check_uid->firstname . ' ' . $check_uid->lastname;
                            $clockin->department = $check_uid->department;
                            $clockin->email = $check_uid->email;
                            $clockin->phone = $check_uid->phone;
                            $clockin->calltime = $this->calltime;
                            $clockin->status = 'Early';
                            $clockin->save();
                            session()->flash('success', '' . $clockin->fullname . ' has been clocked in');

                            $body = [
                                'type' => 'clockin',
                                'name' => $clockin->fullname,
                                'user_id' => $clockin->user_id,
                                'time' => date('h:i a', strtotime($clockin->clockin)),
                                'calltime' => date('h:i a', strtotime($clockin->calltime)),
                                'status' => 'Early',
                                'date' => Carbon::now()->format('Y-m-d'),

                            ];

                            Mail::to($check_uid->email)
                                ->queue(new SendReport($body));
                        } else {
                            $clockin = new Attendance;
                            $clockin->user_id = $this->user_id;
                            $clockin->clockin = $this->time;
                            $clockin->fullname = $check_uid->firstname . ' ' . $check_uid->lastname;
                            $clockin->department = $check_uid->department;
                            $clockin->email = $check_uid->email;
                            $clockin->phone = $check_uid->phone;
                            $clockin->calltime = $this->calltime;
                            $clockin->status = 'Late';
                            $clockin->save();
                            session()->flash('success', '' . $clockin->fullname . ' has been clocked in');

                            $body = [
                                'type' => 'clockin',
                                'name' => $clockin->fullname,
                                'user_id' => $clockin->user_id,
                                'time' => date('h:i a', strtotime($clockin->clockin)),
                                'calltime' => date('h:i a', strtotime($clockin->calltime)),
                                'status' => 'Late',
                                'date' => Carbon::now()->format('Y-m-d'),

                            ];

                            Mail::to($check_uid->email)
                                ->queue(new SendReport($body));
                        }
                    }
                } else {
                    session()->flash('error', 'Worker doesnt exsit');
                }
            } else {
                session()->flash('error', 'Worker Already Clocked in');
            }
        } else {
            session()->flash('error', 'Please set calltime');
        }
    }

    public function closeAttendance()
    {
        $allWorker = Attendance::where('created_at', 'LIKE', '%' . Carbon::now()->format('Y-m-d') . '%')->pluck('user_id')->map(fn ($item) => (string) $item)->toArray();
        $check = Worker::select('user_id', 'firstname', 'lastname', 'email', 'department', 'phone')->whereNotIn('user_id', $allWorker)->get();
        if (!is_null($this->calltime)) {
            if (!$check->isEmpty()) {
                foreach ($check as $checks) {
                    $clockin = new Attendance;
                    $clockin->user_id = $checks->user_id;
                    $clockin->clockin = '';
                    $clockin->calltime = $this->calltime;
                    $clockin->fullname = $checks->firstname . ' ' . $checks->lastname;
                    $clockin->department = $checks->department;
                    $clockin->email = $checks->email;
                    $clockin->phone = $checks->phone;
                    $clockin->calltime = $this->calltime;
                    $clockin->status = 'Absent';
                    $clockin->save();
                }
                session()->flash('success', 'Attendance closed successfully');
            } else {
                session()->flash('error', 'Attendance already closed');
            }
        } else {
            session()->flash('error', 'Please set calltime');
        }
    }



    public function render()
    {
        return view('livewire.clockin-component')->layout('layouts.base');
    }
}
