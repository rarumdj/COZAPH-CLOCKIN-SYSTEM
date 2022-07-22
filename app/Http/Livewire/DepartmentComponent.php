<?php

namespace App\Http\Livewire;

use App\Models\Department;
use App\Models\Worker;
use Livewire\Component;
use Livewire\WithPagination;

class DepartmentComponent extends Component
{
    use WithPagination;
    protected $paginationTheme = 'bootstrap';
    public $paginate = 10;
    public $search = '';
    public $selectedDept = null;
    public $checked = [];
    public $selectPage = false;
    public $selectAll = false;


    public function getDepartmentsProperty()
    {
        return $this->departmentsQuery->paginate($this->paginate);
    }

    public function getDepartmentsQueryProperty()
    {
        return Department::when($this->selectedDept, function ($query) {
            $query->where('name', $this->selectedDept);
        })
            ->search(trim($this->search));
    }

    public function updatedSelectPage($value)
    {
        if ($value) {
            $this->checked = $this->departments->pluck('id')->map(fn ($item) => (string) $item)->toArray();
        } else {
            $this->checked = [];
            $this->selectAll = false;
        }
    }

    public function updatedChecked()
    {
        $this->selectPage = false;
    }

    public function selectAll()
    {
        $this->selectAll = true;
        $this->checked = $this->departmentsQuery->pluck('id')->map(fn ($item) => (string) $item)->toArray();
    }

    public function isChecked($id)
    {
        return in_array($id, $this->checked);
    }

    public function delete($id)
    {
        Department::findorfail($id)->delete();
        $this->checked = array_diff($this->checked, [$id]);
        $this->emit('alert', ['type' => 'success', 'message' => 'Department has been deleted successfully.']);
    }

    public function deleteMultiple()
    {
        Department::whereKey($this->checked)->delete();
        $this->checked = [];
        $this->selectAll = false;
        $this->selectPage = false;
        $this->emit('alert', ['type' => 'success', 'message' => 'Selected Departments has been deleted successfully.']);
    }


    public function getListDepartmentsProperty()
    {
        $list_dept = Department::all();
        if (!is_null($list_dept)) {
            return  $list_dept;
        }
    }

    public function render()
    {
        return view('livewire.department-component', ['departments' => $this->departments, 'listdepts'=> $this->listdepartments])->layout('layouts.base');
    }
}
