@section('title') {{'Register Admin'}} @endsection
<div class="page-content-wrapper-inner">
    <div class="viewport-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb has-arrow">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Register new admin</li>
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
                                    Register Admin
                                </div>
                                <div class="ml-auto showcase_row_area">
                                    <div class="col-md-9 showcase_content_area">
                                        <a href="" class="btn btn-primary">
                                            View Admins
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
                                    <form wire:submit.prevent="registerUser">
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Name</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="text" class="form-control" id="" placeholder="Name"
                                                    required autofocus autocomplete="name" wire:model="name" />
                                            </div>
                                        </div>

                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="email" class="form-control" placeholder="mail@email.com"
                                                    required wire:model="email" />
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Password</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="password" class="form-control" placeholder="**********"
                                                    required autocomplete="new-password" wire:model="password" />
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Comfirm Password</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="password" class="form-control" placeholder="**********"
                                                    required autocomplete="new-password"
                                                    wire:model="confirm_password" />
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label></label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <button type="submit" name="submit" class="btn btn-sm btn-primary">
                                                    Register
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
@push('script')
<script>
    window.livewire.on('alert', param => {
    toastr[param['type']](param['message']);
});
</script>
@endpush