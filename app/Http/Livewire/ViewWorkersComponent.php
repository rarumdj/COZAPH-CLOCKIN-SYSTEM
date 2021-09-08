<?php

namespace App\Http\Livewire;

use App\Exports\WorkersExport;
use App\Models\Worker;
use Livewire\Component;
use Livewire\WithPagination;

class ViewWorkersComponent extends Component
{
    use WithPagination;
    protected $paginationTheme = 'bootstrap';
    public $paginate = 10;
    public $search = '';
    public $selectedDept = null;
    public $checked = [];
    public $selectPage = false;
    public $selectAll = false;


    public function getWorkersProperty()
    {

        return $this->workersQuery->paginate($this->paginate);
    }

    public function getWorkersQueryProperty()
    {
        return Worker::when($this->selectedDept, function ($query) {
            $query->where('department', $this->selectedDept);
        })
            ->search(trim($this->search));
    }

    public function updatedSelectPage($value)
    {
        if ($value) {
            $this->checked = $this->workers->pluck('id')->map(fn ($item) => (string) $item)->toArray();
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
        $this->checked = $this->workersQuery->pluck('id')->map(fn ($item) => (string) $item)->toArray();
    }

    public function isChecked($id)
    {
        return in_array($id, $this->checked);
    }

    public function delete($id)
    {
        Worker::findorfail($id)->delete();
        $this->checked = array_diff($this->checked, [$id]);
        $this->emit('alert', ['type' => 'success', 'message' => 'Worker has been deleted successfully.']);
    }

    public function deleteMultiple()
    {
        Worker::whereKey($this->checked)->delete();
        $this->checked = [];
        $this->selectAll = false;
        $this->selectPage = false;
        $this->emit('alert', ['type' => 'success', 'message' => 'Selected Workers has been deleted successfully.']);
    }


    public function download()
    {
        return (new WorkersExport($this->checked))->download('workers' . time()  . '.xlsx');
    }

    public function render()
    {
        return view('livewire.view-workers-component', ['workers' => $this->workers])->layout('layouts.base');
    }
}
