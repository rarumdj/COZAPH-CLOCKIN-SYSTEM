<?php

namespace App\Http\Livewire;

use App\Models\Attendance;
use Livewire\Component;
use Asantibanez\LivewireCharts\Facades\LivewireCharts;
use Carbon\Carbon;

class PieChartComponent extends Component
{

    public $date;
    public $attendance;

    public $types = ['Early', 'Late', 'Absent'];

    public $colors = [
        'Early' => '#00FF00',
        'Late' => '#ff0000',
        'Absent' => '#FFA500',
        // 'travel' => '#66DA26',
        // 'other' => '#cbd5e0',
    ];

    public $firstRun = true;

    public $showDataLabels = true;

    // protected $listeners = [
    //     'onPointClick' => 'handleOnPointClick',
    //     'onSliceClick' => 'handleOnSliceClick',
    //     'onColumnClick' => 'handleOnColumnClick',
    // ];

    // public function handleOnPointClick($point)
    // {
    //     dd($point);
    // }

    // public function handleOnSliceClick($slice)
    // {
    //     dd($slice);
    // }

    // public function handleOnColumnClick($column)
    // {
    //     dd($column);
    // }

    public function getOldDateProperty()
    {
        $limit_attendance = Attendance::latest('created_at')->limit(1)->pluck('created_at')->first();
        if (!is_null($limit_attendance)) {
            return  $limit_attendance;
        }
    }

    public function mount()
    {
        $this->fill(request()->only('date'));

        if (!$this->date && !is_null($this->oldDate)) {
            $this->attendance = Attendance::whereIn('status', $this->types)->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->get();
        } else if ($this->date) {
            $this->attendance = Attendance::whereIn('status', $this->types)->where('created_at', 'LIKE', '%' . $this->date . '%')->get();
        } else {
        }
        // dd($this->attendance);
    }
    public function render()
    {
        if ($this->attendance) {
            $pieChartModel = $this->attendance->groupBy('status')
                ->reduce(
                    function ($pieChartModel, $data) {
                        $type = $data->first()->status;
                        $value = $data->count();

                        return $pieChartModel->addSlice($type, $value, $this->colors[$type]);
                    },
                    LivewireCharts::pieChartModel()
                        //->setTitle('Expenses by Type')
                        ->setAnimated($this->firstRun)
                        ->withOnSliceClickEvent('onSliceClick')
                        //->withoutLegend()
                        ->legendPositionBottom()
                        ->legendHorizontallyAlignedCenter()
                        ->setDataLabelsEnabled($this->showDataLabels)
                        ->setColors(['#FFA500', '#ff0000', '#00FF00'])
                );

            $this->firstRun = false;
        } else {
            $pieChartModel = null;
        }

        return view('livewire.pie-chart-component', ['pieChartModel' => $pieChartModel]);
    }
}
