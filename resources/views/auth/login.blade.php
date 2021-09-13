{{-- <x-guest-layout>
    <x-jet-authentication-card>
        <x-slot name="logo">
            <x-jet-authentication-card-logo />
        </x-slot>

        <x-jet-validation-errors class="mb-4" />

        @if (session('status'))
            <div class="mb-4 font-medium text-sm text-green-600">
                {{ session('status') }}
</div>
@endif

<form method="POST" action="{{ route('login') }}">
    @csrf

    <div>
        <x-jet-label for="email" value="{{ __('Email') }}" />
        <x-jet-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
            autofocus />
    </div>

    <div class="mt-4">
        <x-jet-label for="password" value="{{ __('Password') }}" />
        <x-jet-input id="password" class="block mt-1 w-full" type="password" name="password" required
            autocomplete="current-password" />
    </div>

    <div class="block mt-4">
        <label for="remember_me" class="flex items-center">
            <x-jet-checkbox id="remember_me" name="remember" />
            <span class="ml-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
        </label>
    </div>

    <div class="flex items-center justify-end mt-4">
        @if (Route::has('password.request'))
        <a class="underline text-sm text-gray-600 hover:text-gray-900" href="{{ route('password.request') }}">
            {{ __('Forgot your password?') }}
        </a>
        @endif

        <x-jet-button class="ml-4">
            {{ __('Log in') }}
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
                            <form method="POST" action="{{ route('login') }}">
                                @csrf
                                <div class="form-group input-rounded"><input type="email" class="form-control"
                                        placeholder="Email" name="email" :value="old('email')" required autofocus>
                                </div>
                                <div class="form-group input-rounded"><input type="password" class="form-control"
                                        placeholder="Password" name="password" required autocomplete="current-password">
                                </div>
                                <div class="form-inline">
                                    <div class="checkbox"><label><input type="checkbox" id="remember_me" name="remember"
                                                class="form-check-input">Remember me
                                            <i class="input-frame"></i></label></div>
                                </div><button type="submit" name="submit"
                                    class="btn btn-primary btn-block">Login</button>
                            </form>
                            <div class="signup-link">
                                <p></p><a href="{{ route('password.request') }}">Forgot password?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</x-guest-layout>