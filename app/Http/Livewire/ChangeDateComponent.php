<?php

namespace App\Http\Livewire;

use Livewire\Component;

class ChangeDateComponent extends Component
{
    public $date;
    public function mount()
    {
        $this->fill(request()->only('date'));
    }


    public function render()
    {

        return view('livewire.change-date-component');
    }
}
