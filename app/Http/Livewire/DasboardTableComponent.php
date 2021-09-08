<?php

namespace App\Http\Livewire;

use App\Exports\AttendancesExport;
use App\Models\Attendance;
use Carbon\Carbon;
use Log;
use Livewire\Component;
use Livewire\WithPagination;

class DasboardTableComponent extends Component
{
    use WithPagination;
    protected $paginationTheme = 'bootstrap';
    public $paginate = 10;
    public $search = '';
    public $selectedDept = null;
    public $status = null;
    public $selectedStatus = null;
    public $checked = [];
    public $selectPage = false;
    public $selectAll = false;
    public $date;

    public function mount()
    {
        $this->fill(request()->only('date'));
    }


    public function getOldDateProperty()
    {
        $limit_attendance = Attendance::latest('created_at')->limit(1)->pluck('created_at')->first();
        if (!is_null($limit_attendance)) {
            return $limit_attendance;
        }
    }
    public function getAttendancesProperty()
    {
        if ($this->attendancesQuery) {
            return $this->attendancesQuery->paginate($this->paginate);
        } else {
            // die();
        }
    }

    public function getAttendancesQueryProperty()
    {
        $this->fill(request()->only('date'));
        if (!$this->date && !is_null($this->oldDate)) {
            return Attendance::when($this->selectedDept, function ($query) {
                $query->where('department', $this->selectedDept);
            })
                ->when($this->selectedStatus, function ($query) {
                    $query->where('status', $this->selectedStatus);
                })
                ->search(trim($this->search))
                ->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%');
        } else if ($this->date) {
            return Attendance::when($this->selectedDept, function ($query) {
                $query->where('department', $this->selectedDept);
            })
                ->when($this->selectedStatus, function ($query) {
                    $query->where('status', $this->selectedStatus);
                })
                ->search(trim($this->search))
                ->where('created_at', 'LIKE', '%' . $this->date . '%');
        } else {
        }
    }

    public function updatedSelectPage($value)
    {
        if ($value) {
            $this->checked = $this->attendances->pluck('id')->map(fn ($item) => (string) $item)->toArray();
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
        $this->checked = $this->attendancesQuery->pluck('id')->map(fn ($item) => (string) $item)->toArray();
    }

    public function isChecked($id)
    {
        return in_array($id, $this->checked);
    }

    public function clockoutSingle($id)
    {
        $worker = Attendance::where(['id' => $id, 'clockout' => ''])->first();
        if ($worker) {
            Attendance::find($id)->update(['clockout' => Carbon::now()->format('H:i:s'), 'co_status' => '1']);
        } else {
            Attendance::find($id)->update(['clockout' => '', 'co_status' => 0]);
        }
        $this->checked = array_diff($this->checked, [$id]);
    }

    public function clockoutMass()
    {
        $worker = Attendance::whereKey($this->checked)->where('co_status', 0)->get();
        if ($worker->isNotEmpty()) {
            Attendance::whereKey($this->checked)->where('co_status', 0)->update(['clockout' => Carbon::now()->format('H:i:s'), 'co_status' => 1]);
        } else {
            Attendance::whereKey($this->checked)->where('co_status', 1)->update(['clockout' => '', 'co_status' => 0]);
        }
        $this->checked = [];
        $this->selectAll = false;
        $this->selectPage = false;
        // session()->flash('info', 'Selected Records were deleted Successfully');
    }


    public function permitSingle($id)
    {
        $worker = Attendance::where(['id' => $id, 'permit' => 'No'])->first();
        if ($worker) {
            Attendance::find($id)->update(['permit' => 'Yes']);
        } else {
            Attendance::find($id)->update(['permit' => 'No']);
        }
        $this->checked = array_diff($this->checked, [$id]);
    }

    public function permitMass()
    {
        $worker = Attendance::whereKey($this->checked)->where('permit', 'No')->get();
        if ($worker->isNotEmpty()) {
            Attendance::whereKey($this->checked)->where('permit', 'No')->update(['permit' => 'Yes']);
        } else {
            Attendance::whereKey($this->checked)->where('permit', 'Yes')->update(['permit' => 'No']);
        }
        $this->checked = [];
        $this->selectAll = false;
        $this->selectPage = false;
        // session()->flash('info', 'Selected Records were deleted Successfully');
    }

    public function download()
    {
        return (new AttendancesExport($this->checked))->download('attendance' . time()  . '.xlsx');
    }

    public function render()
    {
        return view('livewire.dasboard-table-component', ['attendances' => $this->attendances]);
    }
}
