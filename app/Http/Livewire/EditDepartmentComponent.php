<?php

namespace App\Http\Livewire;

use App\Models\Department;
use Livewire\Component;

class EditDepartmentComponent extends Component
{
    public $department;
    public $abbr;
    public $Uid;

    public function mount($Uid)
    {
        $this->Uid = $Uid;
        $department = Department::where('id', $Uid)->first();
        $this->department = $department->name;
        $this->abbr = $department->abr;
    }

    public function updateDepartments()
    {
        $updateDepartments = Department::where('id', $this->Uid)->first();
        $updateDepartments->name = $this->department;
        $updateDepartments->abr = $this->abbr;
        $updateDepartments->save();
        $this->emit('alert', ['type' => 'success', 'message' => 'Department has been updated successfully.']);
        // return redirect()->to('/workers');
    }


    public function render()
    {
        return view('livewire.edit-department-component')->layout('layouts.base');;
    }
}
