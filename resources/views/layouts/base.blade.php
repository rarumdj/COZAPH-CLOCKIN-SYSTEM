<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>COZAPH - @yield('title')</title>
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
    {{-- icons --}}
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('assets/images/logo.svg') }}">
    <link rel="icon" type="image/png" href="{{ asset('assets/images/logo.svg') }}" sizes="32x32">
    <link rel="icon" type="image/png" href="{{ asset('assets/images/logo.svg') }}" sizes="16x16">
    <link rel="mask-icon" href="{{ asset('assets/images/logo.svg') }}" color="#5bbad5">
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('assets/images/logo.svg') }}">
    @yield('styles')
    @livewireStyles
</head>

<body class="header-fixed">
    <!-- partial:partials/_header.html -->
    <nav class="t-header">
        <div class="t-header-brand-wrapper">
            <a href="/">
                <img class="logo" style="width: 50px" src="{{ asset('assets/images/logo.svg') }}" alt="">
                <img class="logo-mini" style="width: 50px" src="{{ asset('assets/images/logo_mini.svg') }}" alt="">
            </a>
            <button class="t-header-toggler t-header-desk-toggler d-none d-lg-block">
                <svg class="logo" viewBox="0 0 200 200">
                    <path class="top" d="
                M 40, 80
                C 40, 80 120, 80 140, 80
                C180, 80 180, 20  90, 80
                C 60,100  30,120  30,120
              "></path>
                    <path class="middle" d="
                M 40,100
                L140,100
              "></path>
                    <path class="bottom" d="
                M 40,120
                C 40,120 120,120 140,120
                C180,120 180,180  90,120
                C 60,100  30, 80  30, 80
              "></path>
                </svg>
            </button>
        </div>
        <div class="t-header-content-wrapper">
            <div class="t-header-content">
                <button class="t-header-toggler t-header-mobile-toggler d-block d-lg-none">
                    <i class="mdi mdi-menu"></i>
                </button>
                <form action="#" class="t-header-search-box">
                    <div class="input-group">
                        <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Search"
                            autocomplete="off">
                        <button class="btn btn-primary" type="submit"><i class="mdi mdi-arrow-right-thick"></i></button>
                    </div>
                </form>
                {{-- <ul class="nav ml-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" id="notificationDropdown" data-toggle="dropdown"
                            aria-expanded="false">
                            <i class="mdi mdi-bell-outline mdi-1x"></i>
                        </a>
                        <div class="dropdown-menu navbar-dropdown dropdown-menu-right"
                            aria-labelledby="notificationDropdown">
                            <div class="dropdown-header">
                                <h6 class="dropdown-title">Notifications</h6>
                                <p class="dropdown-title-text">You have 4 unread notification</p>
                            </div>
                            <div class="dropdown-body">
                                <div class="dropdown-list">
                                    <div class="icon-wrapper rounded-circle bg-inverse-primary text-primary">
                                        <i class="mdi mdi-alert"></i>
                                    </div>
                                    <div class="content-wrapper">
                                        <small class="name">Storage Full</small>
                                        <small class="content-text">Server storage almost full</small>
                                    </div>
                                </div>
                                <div class="dropdown-list">
                                    <div class="icon-wrapper rounded-circle bg-inverse-success text-success">
                                        <i class="mdi mdi-cloud-upload"></i>
                                    </div>
                                    <div class="content-wrapper">
                                        <small class="name">Upload Completed</small>
                                        <small class="content-text">3 Files uploded successfully</small>
                                    </div>
                                </div>
                                <div class="dropdown-list">
                                    <div class="icon-wrapper rounded-circle bg-inverse-warning text-warning">
                                        <i class="mdi mdi-security"></i>
                                    </div>
                                    <div class="content-wrapper">
                                        <small class="name">Authentication Required</small>
                                        <small class="content-text">Please verify your password to continue using cloud
                                            services</small>
                                    </div>
                                </div>
                            </div>
                            <div class="dropdown-footer">
                                <a href="#">View All</a>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" href="#" id="messageDropdown" data-toggle="dropdown" aria-expanded="false">
                            <i class="mdi mdi-message-outline mdi-1x"></i>
                            <span
                                class="notification-indicator notification-indicator-primary notification-indicator-ripple"></span>
                        </a>
                        <div class="dropdown-menu navbar-dropdown dropdown-menu-right"
                            aria-labelledby="messageDropdown">
                            <div class="dropdown-header">
                                <h6 class="dropdown-title">Messages</h6>
                                <p class="dropdown-title-text">You have 4 unread messages</p>
                            </div>
                            <div class="dropdown-body">
                                <div class="dropdown-list">
                                    <div class="image-wrapper">
                                        <img class="profile-img"
                                            src="{{ asset('assets/images/profile/male/image_1.png') }}"
                alt="profile image">
                <div class="status-indicator rounded-indicator bg-success"></div>
            </div>
            <div class="content-wrapper">
                <small class="name">Clifford Gordon</small>
                <small class="content-text">Lorem ipsum dolor sit amet.</small>
            </div>
        </div>
        <div class="dropdown-list">
            <div class="image-wrapper">
                <img class="profile-img" src="{{ asset('assets/images/profile/female/image_2.png') }}"
                    alt="profile image">
                <div class="status-indicator rounded-indicator bg-success"></div>
            </div>
            <div class="content-wrapper">
                <small class="name">Rachel Doyle</small>
                <small class="content-text">Lorem ipsum dolor sit amet.</small>
            </div>
        </div>
        <div class="dropdown-list">
            <div class="image-wrapper">
                <img class="profile-img" src="{{ asset('assets/images/profile/male/image_3.png') }}"
                    alt="profile image">
                <div class="status-indicator rounded-indicator bg-warning"></div>
            </div>
            <div class="content-wrapper">
                <small class="name">Lewis Guzman</small>
                <small class="content-text">Lorem ipsum dolor sit amet.</small>
            </div>
        </div>
        </div>
        <div class="dropdown-footer">
            <a href="#">View All</a>
        </div>
        </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link" href="#" id="appsDropdown" data-toggle="dropdown" aria-expanded="false">
                <i class="mdi mdi-apps mdi-1x"></i>
            </a>
            <div class="dropdown-menu navbar-dropdown dropdown-menu-right" aria-labelledby="appsDropdown">
                <div class="dropdown-header">
                    <h6 class="dropdown-title">Apps</h6>
                    <p class="dropdown-title-text mt-2">Authentication required for 3 apps</p>
                </div>
                <div class="dropdown-body border-top pt-0">
                    <a class="dropdown-grid">
                        <i class="grid-icon mdi mdi-jira mdi-2x"></i>
                        <span class="grid-tittle">Jira</span>
                    </a>
                    <a class="dropdown-grid">
                        <i class="grid-icon mdi mdi-trello mdi-2x"></i>
                        <span class="grid-tittle">Trello</span>
                    </a>
                    <a class="dropdown-grid">
                        <i class="grid-icon mdi mdi-artstation mdi-2x"></i>
                        <span class="grid-tittle">Artstation</span>
                    </a>
                    <a class="dropdown-grid">
                        <i class="grid-icon mdi mdi-bitbucket mdi-2x"></i>
                        <span class="grid-tittle">Bitbucket</span>
                    </a>
                </div>
                <div class="dropdown-footer">
                    <a href="#">View All</a>
                </div>
            </div>
        </li>
        </ul> --}}
        </div>
        </div>
    </nav>
    <!-- partial -->
    <div class="page-body">
        <!-- partial:partials/_sidebar.html -->
        <div class="sidebar">

            @if (Route::has('login'))
            @auth
            @if(Auth::user())
            <div class="user-profile">
                <div class="display-avatar animated-avatar">
                    <img class="profile-img img-lg rounded-circle"
                        src="{{ asset('assets/images/profile/male/image_1.png') }}" alt="profile image">
                </div>
                <div class="info-wrapper">
                    <p class="user-name">Hello</p>
                    <p class="display-income">{{ Auth::user()->name }}</p>
                </div>
            </div>
            <ul class="navigation-menu">
                <li class="nav-category-divider">MAIN</li>

                <li>
                    <a href="/">
                        <span class="link-title">Dashboard</span>
                        <i class="mdi mdi-gauge link-icon"></i>
                    </a>
                </li>
                <li>
                    <a href="{{ route('worker.view') }}">
                        <span class="link-title">Workforce</span>
                        <i class="mdi mdi-clipboard-outline link-icon"></i>
                    </a>
                </li>
                <li>
                    <a href="#sample-pages" data-toggle="collapse" aria-expanded="false">
                        <span class="link-title">Attendance</span>
                        <i class="mdi mdi-clock-outline link-icon"></i>
                    </a>
                    <ul class="collapse navigation-submenu" id="sample-pages">
                        <li>
                            <a href="{{ route('worker.clockin') }}" target="">Clock in</a>
                        </li>
                        <li>
                            <a href="{{ route('worker.clockout') }}" target="">Clock out</a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="{{ route('mail.dashboard') }}">
                        <span class="link-title">Mailer</span>
                        <i class="mdi mdi-email-outline link-icon"></i>
                    </a>
                </li>
                <li>
                    <a href="{{ route('admin.register') }}">
                        <span class="link-title">New Admin</span>
                        <i class="mdi mdi-account-plus link-icon"></i>
                    </a>

                </li>
                <li class="nav-category-divider">Logout</li>
                <li>
                    <a href="{{ route('logout') }}"
                        onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                        <span class="link-title">Logout</span>
                        <i class="mdi mdi-logout link-icon"></i>
                    </a>
                    <form id="logout-form" method="POST" action="{{ route('logout') }}">
                        @csrf
                    </form>
                </li>
            </ul>

            @endif
            @else
            <ul class="navigation-menu">
                <li class="nav-category-divider">MAIN</li>

                <li>
                    <a href="{{ route('worker.register') }}">
                        <span class="link-title">Workforce</span>
                        <i class="mdi mdi-clipboard-outline link-icon"></i>
                    </a>
                </li>
            </ul>
            @endauth
            @endif





        </div>
        <!-- partial -->
        <div class="page-content-wrapper">



            {{ $slot }}
            @yield('content')



            <!-- partial-->
            <footer class="footer">
                <div class="row">
                    <div class="col-sm-6 text-center text-sm-right order-sm-1">
                        <ul class="text-gray">
                            <li><a href="#">Terms of use</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-6 text-center text-sm-left mt-3 mt-sm-0">
                        <small class="text-muted d-block">Copyright © {{ date('Y') }} <a>COZA</a>. All rights
                            reserved</small>
                        {{-- <small class="text-gray mt-2">Handcrafted With <i class="mdi mdi-heart text-danger"></i></small> --}}
                    </div>
                </div>
            </footer>
            <!-- partial -->
        </div>
        <!-- page content ends -->
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