{{-- <x-guest-layout>
    <x-jet-authentication-card>
        <x-slot name="logo">
            <x-jet-authentication-card-logo />
        </x-slot>

        <div class="mb-4 text-sm text-gray-600">
            {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
</div>

@if (session('status'))
<div class="mb-4 font-medium text-sm text-green-600">
    {{ session('status') }}
</div>
@endif

<x-jet-validation-errors class="mb-4" />

<form method="POST" action="{{ route('password.email') }}">
    @csrf

    <div class="block">
        <x-jet-label for="email" value="{{ __('Email') }}" />
        <x-jet-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
            autofocus />
    </div>

    <div class="flex items-center justify-end mt-4">
        <x-jet-button>
            {{ __('Email Password Reset Link') }}
        </x-jet-button>
    </div>
</form>
</x-jet-authentication-card>
</x-guest-layout> --}}

<x-guest-layout>
    <div class="row">
        <div class="col-lg-5 col-md-7 col-sm-9 col-11 mx-auto">
            <div class="grid">
                <div class="grid-body">
                    <div class="row">
                        <div class="col-lg-7 col-md-8 col-sm-9 col-12 mx-auto form-wrapper">
                            <x-jet-validation-errors class="mb-4" />
                            <form method="POST" action="{{ route('password.email') }}">
                                @csrf
                                <div class="form-group input-rounded"><input type="email" class="form-control"
                                        placeholder="Email" name="email" :value="old('email')" required autofocus>
                                </div>
                                <button type="submit" name="submit" class="btn btn-primary btn-block">Reset
                                    Password</button>
                            </form>
                            <div class="signup-link">
                                <p></p><a href="{{ route('login') }}">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-guest-layout>