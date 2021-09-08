<?php

namespace App\Http\Livewire;

use App\Models\Worker;
use Livewire\Component;

class EditWorkersComponent extends Component
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

    public function mount($user_id)
    {
        $this->user_id = $user_id;
        $worker = Worker::where('user_id', $user_id)->first();
        $this->firstname = $worker->firstname;
        $this->lastname = $worker->lastname;
        $this->department = $worker->department;
        $this->email = $worker->email;
        $this->phone = $worker->phone;
        $this->m_status = $worker->m_status;
        $this->b_day = $worker->b_day;
        $this->user_id = $worker->user_id;
    }

    public function updateWorker()
    {
        $updateWorker = Worker::where('user_id', $this->user_id)->first();
        $updateWorker->firstname = $this->firstname;
        $updateWorker->lastname = $this->lastname;
        $updateWorker->department = $this->department;
        $updateWorker->email = $this->email;
        $updateWorker->phone = $this->phone;
        $updateWorker->m_status = $this->m_status;
        $updateWorker->b_day = $this->b_day;
        // $newWorker->image = $this->image;
        $updateWorker->user_id = $this->user_id;
        $updateWorker->save();
        $this->emit('alert', ['type' => 'success', 'message' => 'Worker has been updated successfully.']);
        // return redirect()->to('/workers');
    }

    public function render()
    {
        return view('livewire.edit-workers-component')->layout('layouts.base');;
    }
}
