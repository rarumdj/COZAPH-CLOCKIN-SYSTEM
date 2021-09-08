<?php

namespace App\Http\Livewire;

use Livewire\Component;

class MailDashboardComponent extends Component
{
    public function render()
    {
        return view('livewire.mail-dashboard-component')->layout('layouts.base');
    }
}
