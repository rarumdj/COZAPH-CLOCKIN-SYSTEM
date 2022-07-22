
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
