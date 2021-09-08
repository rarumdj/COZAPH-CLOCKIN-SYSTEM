<?php

namespace App\Http\Livewire;

use Livewire\Component;

class MailerComponent extends Component
{
    public function render()
    {
        return view('livewire.mailer-component')->layout('layouts.base');
    }
}
