<?php

namespace App\Http\Livewire;

use App\Models\Department;
use Livewire\Component;

class CreateDepartmentComponent extends Component
{
    public $department;
    public $abbr;
    public $success = '';

    public function storeDepartment()
    {
        $exDept = Department::where(['name' => $this->department])->first();
        if (!$exDept) {
            $newDept = new Department;
            $newDept->name = $this->department;
            $newDept->abr = $this->abbr;
            $newDept->save();
            // session()->flash('message', 'Worker has been added successfully');
            $this->emit('alert', ['type' => 'success', 'message' => 'Department has been created successfully.']);


            $this->reset();
            // $max_uid = Worker::max('user_id');
            // $this->user_id = str_pad($max_uid + 1, 3, "0", STR_PAD_LEFT);

            $this->success = $newDept;
        } else {
            $this->emit('alert', ['type' => 'error', 'message' => 'Department already exists.']);
        }
    }



    public function render()
    {
        return view('livewire.create-department-component', ['newDept' => $this->success])->layout('layouts.base');
    }
}
