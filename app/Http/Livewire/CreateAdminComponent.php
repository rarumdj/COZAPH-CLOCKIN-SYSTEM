<?php

namespace App\Http\Livewire;

use App\Mail\Registration;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Livewire\Component;

class CreateAdminComponent extends Component
{
    public $name, $email, $password, $confirm_password;

    protected $rules = [
        'name' => 'required|min:6',
        'email' => 'required|email',
        'password' => 'required',
        'confirm_password' => 'required|same:password',
    ];

    public function registerUser()
    {

        $this->validate();


        $usercheck = User::where('email', $this->email)->first();
        if (!$usercheck) {
            $newUser = new User;
            $newUser->name = $this->name;
            $newUser->email = $this->email;
            $newUser->password = bcrypt($this->password);
            $newUser->save();
            $this->emit('alert', ['type' => 'success', 'message' => 'User has been added successfully.']);
            $body = [
                'name' => $this->name,
                'password' => $this->password,
                'email' => $this->email,
                'type' => 'admin',
            ];

            Mail::to($this->email)->queue(new Registration($body));
            $this->reset();
        } else {
            $this->emit('alert', ['type' => 'error', 'message' => 'User already exists.']);
        }
    }
    public function render()
    {

        if (count($this->getErrorBag()->all()) > 0) {
            $this->emit('alert', ['type' => 'error', 'message' => 'Password validation failed.']);
            $this->resetErrorBag();
            $this->resetValidation();
        }

        return view('livewire.create-admin-component')->layout('layouts.base');
    }
}
