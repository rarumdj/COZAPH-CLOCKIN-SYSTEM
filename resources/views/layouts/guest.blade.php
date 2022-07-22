<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Christ Heaven - Clockin App</title>
    <!-- plugins:css -->
    <link rel="stylesheet" href="{{ asset('assets/vendors/iconfonts/mdi/css/materialdesignicons.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/vendors/css/vendor.addons.css') }}" />
    <!-- endinject -->
    <!-- vendor css for this page -->
    <!-- End vendor css for this page -->
    <!-- inject:css -->
    <link rel="stylesheet" href="{{ asset('assets/css/shared/style.css') }}" />
    <!-- endinject -->
    <!-- Layout style -->
    <link rel="stylesheet" href="{{ asset('assets/css/demo_1/style.css') }}" />
    <link rel="stylesheet" href="{{ asset('assets/css/toastr.css') }}" />
    <!-- Layout style -->
    <link rel="shortcut icon" href="{{ asset('assets/images/favicon.ico') }}" />
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="{{ asset('assets/css/custom.css') }}" rel="stylesheet" />
    @yield('styles')
    @livewireStyles
</head>

<body>
    <div class="authentication-theme auth-style_1">
        <div class="row">
            <div class="col-12 logo-section"><a href="/" class="logo"><img class="img-fluid"
                        src="{{ asset('assets/images/logo.svg') }}" alt="logo"></a></div>
        </div>

        {{ $slot }}
        @yield('content')

        <div class="auth_footer">
            <p class="text-muted text-center">© Christ Heaven  {{ date('Y') }}</p>
        </div>
    </div>
    <!--page body ends -->
    <!-- SCRIPT LOADING START FORM HERE /////////////-->
    <!-- plugins:js -->
    <script src="{{ asset('assets/vendors/js/core.js') }}"></script>
    <script src="{{ asset('assets/vendors/js/vendor.addons.js') }}"></script>
    <!-- endinject -->
    <!-- Vendor Js For This Page Ends-->
    <script src="{{ asset('assets/vendors/apexcharts/apexcharts.min.js') }}"></script>
    <script src="{{ asset('assets/vendors/chartjs/Chart.min.js') }}"></script>
    <script src="{{ asset('assets/js/charts/chartjs.addon.js') }}"></script>
    <!-- Vendor Js For This Page Ends-->
    <script src="{{ asset('assets/vendors/d3/d3.min.js') }}"></script>
    <script src="{{ asset('assets/vendors/c3/c3.js') }}"></script>

    <script src="{{ asset('assets/js/script.js') }}"></script>
    <!-- endbuild -->
    <script src="{{ asset('assets/js/summernote-lite.min') }}"></script>
    <script src="{{ asset('assets/js/tinymce/tinymce.min.js') }}"></script>
    <script src="{{ asset('assets/js/custom.js') }}"></script>
    <script src="{{ asset('assets/js/toastr.min.js') }}"></script>
    <script src="{{ asset('assets/js/toastr.js') }}"></script>
    {{-- <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script> --}}

    @livewireScripts
    @livewireChartsScripts
    <script src="{{ asset('assets/js/alpinejs-3.3.1.min.js') }}"></script>

    @yield('scripts')
    @stack('script')
</body>

</html>
