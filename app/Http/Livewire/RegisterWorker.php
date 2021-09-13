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
    // public $image;
    public $user_id;



    public function mount()
    {
        $worker = Worker::all()->count();
        if ($worker < 1) {
            $this->user_id = '001';
        } else {
            $max_uid = Worker::max('user_id');
            $this->user_id = str_pad($max_uid + 1, 3, "0", STR_PAD_LEFT);
        }
        $this->user_id = $this->user_id;
        $this->department = 'Avalanche';
        $this->m_status = 'Single';
    }

    public function storeWorker()
    {
        $exWorker = Worker::where(['firstname' => $this->firstname, 'email' => $this->email])->first();
        if (!$exWorker) {
            $newWorker = new Worker;
            $newWorker->firstname = $this->firstname;
            $newWorker->lastname = $this->lastname;
            $newWorker->department = $this->department;
            $newWorker->email = $this->email;
            $newWorker->phone = $this->phone;
            $newWorker->m_status = $this->m_status;
            $newWorker->b_day = $this->b_day;
            // $newWorker->image = $this->image;
            $newWorker->user_id = $this->user_id;
            $newWorker->save();
            // session()->flash('message', 'Worker has been added successfully');
            $this->emit('alert', ['type' => 'success', 'message' => 'Worker has been added successfully.']);
            $body = [
                'name' => $this->firstname . ' ' . $this->lastname,
                'user_id' => $this->user_id,
                'type' => 'worker',
            ];

            Mail::to($this->email)->queue(new Registration($body));

            $this->reset();
            $max_uid = Worker::max('user_id');
            $this->user_id = str_pad($max_uid + 1, 3, "0", STR_PAD_LEFT);
            $this->department = 'Avalanche';
            $this->m_status = 'Single';
        } else {
            $this->emit('alert', ['type' => 'error', 'message' => 'Worker already exists.']);
        }
    }
    public function render()
    {
        return view('livewire.register-worker')->layout('layouts.base');
    }
}
