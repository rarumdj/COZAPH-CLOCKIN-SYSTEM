{{-- <x-guest-layout>
    <x-jet-authentication-card>
        <x-slot name="logo">
            <x-jet-authentication-card-logo />
        </x-slot>

        <x-jet-validation-errors class="mb-4" />

        <form method="POST" action="{{ route('password.update') }}">
@csrf

<input type="hidden" name="token" value="{{ $request->route('token') }}">

<div class="block">
    <x-jet-label for="email" value="{{ __('Email') }}" />
    <x-jet-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email', $request->email)"
        required autofocus />
</div>

<div class="mt-4">
    <x-jet-label for="password" value="{{ __('Password') }}" />
    <x-jet-input id="password" class="block mt-1 w-full" type="password" name="password" required
        autocomplete="new-password" />
</div>

<div class="mt-4">
    <x-jet-label for="password_confirmation" value="{{ __('Confirm Password') }}" />
    <x-jet-input id="password_confirmation" class="block mt-1 w-full" type="password" name="password_confirmation"
        required autocomplete="new-password" />
</div>

<div class="flex items-center justify-end mt-4">
    <x-jet-button>
        {{ __('Reset Password') }}
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
                            <form method="POST" action="{{ route('password.update') }}">
                                @csrf
                                <input type="hidden" name="token" value="{{ $request->route('token') }}">

                                <div class="form-group input-rounded"><input type="email" class="form-control"
                                        placeholder="Email" name="email" :value="old('email', $request->email)" required
                                        autofocus>
                                </div>
                                <div class="form-group input-rounded"><input type="email" class="form-control"
                                        placeholder="Password" name="password" required autocomplete="new-password">
                                </div>
                                <div class="form-group input-rounded"><input type="email" class="form-control"
                                        placeholder="Confirm Password" name="password_confirmation" required
                                        autocomplete="new-password">
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