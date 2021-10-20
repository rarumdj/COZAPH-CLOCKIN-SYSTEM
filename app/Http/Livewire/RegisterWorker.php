<?php

namespace App\Http\Livewire;

use App\Mail\Registration;
use App\Models\Worker;
use Illuminate\Support\Facades\Mail;
use Livewire\Component;

class RegisterWorker extends Component
{
    public $firstname;
    public $lastname;
    public $department;
    public $email;
    public $phone;
    public $m_status;
    public $b_day;
    public $user_id;
    public $success = '';



    public function mount()
    {

        $this->department = 'Avalanche';
        $this->m_status = 'Single';
    }

    public function getUserIdProperty()
    {

        $worker = Worker::all()->count();
        if ($worker < 1) {
            return '001';
        } else {
            $max_uid = Worker::max('user_id');
            return str_pad($max_uid + 1, 3, "0", STR_PAD_LEFT);
        }
        // $this->user_id = $this->user_id;
    }

    public function storeWorker()
    {
        $exWorker = Worker::where(['email' => $this->email])->orWhere(['phone' => $this->phone])->first();
        if (!$exWorker) {
            $newWorker = new Worker;
            $newWorker->firstname = $this->firstname;
            $newWorker->lastname = $this->lastname;
            $newWorker->department = $this->department;
            $newWorker->email = $this->email;
            $newWorker->phone = $this->phone;
            $newWorker->m_status = $this->m_status;
            $newWorker->b_day = $this->b_day;
            $newWorker->user_id = $this->userId;
            $newWorker->save();
            // session()->flash('message', 'Worker has been added successfully');
            $this->emit('alert', ['type' => 'success', 'message' => 'Worker has been added successfully.']);
            $body = [
                'name' => $newWorker->firstname . ' ' . $newWorker->lastname,
                'user_id' => $newWorker->user_id,
                'type' => 'worker',
            ];

            Mail::to($this->email)->queue(new Registration($body));

            $this->reset();
            // $max_uid = Worker::max('user_id');
            // $this->user_id = str_pad($max_uid + 1, 3, "0", STR_PAD_LEFT);
            $this->department = 'Avalanche';
            $this->m_status = 'Single';
            $this->success = $newWorker;
        } else {
            $this->emit('alert', ['type' => 'error', 'message' => 'Worker already exists.']);
        }
    }
    public function render()
    {
        return view('livewire.register-worker', ['newWorker' => $this->success])->layout('layouts.base');
    }
}
