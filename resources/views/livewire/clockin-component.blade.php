@section('title') {{'Clockin Worker'}} @endsection
<div class="page-content-wrapper-inner">
    <div class="viewport-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb has-arrow">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Clock in</li>
            </ol>
        </nav>
    </div>
    <div class="content-viewport">
        <div class="row">
            <div class="col-lg-12">

                <div class="grid">
                    <div class="grid-header">
                        <div class="col-md-12">

                            <div class="align-items-center justify-content-between d-flex">
                                <div>
                                    Workforce Clockin
                                </div>
                                <div class="ml-auto showcase_row_area">
                                    <div class="col-md-9 showcase_content_area">
                                        <a href="#" class="btn btn-sm btn-danger" type="button"
                                            onclick="confirm('Are you sure you want to close today\'s attendance?') || event.stopImmediatePropagation()"
                                            wire:click="closeAttendance()">
                                            Close Attendance
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid-body">
                        <div class="item-wrapper">
                            <div class="row mb-3">
                                <div class="col-md-8 mx-auto">

                                    @if (Session::has('success'))
                                    <div class="alert alert-success" role="alert">{{ Session::get('success') }}</div>
                                    @elseif (Session::has('error'))
                                    <div class="alert alert-danger" role="alert">{{ Session::get('error') }}</div>
                                    @elseif (Session::has('check'))
                                    <div class="alert alert-warning" role="alert"><input type="text"
                                            class="form-control bg-transparent border-0 font-weight-bold"
                                            wire:model="checkid" disabled>
                                    </div>
                                    @endif
                                    <form wire:submit.prevent="clockin">
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label for="inputType1">Call Time</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="time" class="form-control" placeholder="calltime"
                                                    wire:model="calltime" />
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label for="inputType1">Worker ID</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="text" class="form-control" placeholder="Worker ID"
                                                    wire:model="user_id" wire:keyup="verifyuserid" />
                                            </div>
                                        </div>
                                        <div x-data="{ show: false }" class="form-group showcase_row_area">
                                            <div class="form-group row showcase_row_area">
                                                <div class="col-md-3 showcase_text_area">
                                                    <label for="inputType1"></label>
                                                </div>
                                                <div class="col-md-9 showcase_content_area">
                                                    <div class="custom-control custom-switch">
                                                        <input type="checkbox" class="custom-control-input"
                                                            id="customSwitch" @click="show = !show"
                                                            :aria-expanded="show ? 'true' : 'false'"
                                                            :class="{ 'active': show }" />
                                                        <label class="custom-control-label" for="customSwitch">Use
                                                            Manual
                                                            Time</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="form-group row showcase_row_area" x-show="show">
                                                <div class="col-md-3 showcase_text_area">
                                                    <label for="inputType1">Clockin Time</label>
                                                </div>
                                                <div class="col-md-9 showcase_content_area">
                                                    <input type="time" class="form-control" placeholder="time"
                                                        wire:model="time" />
                                                </div>
                                            </div>
                                        </div>



                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label for="inputType13"></label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <button type="submit" class="btn btn-sm btn-primary">
                                                    Clockin
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>