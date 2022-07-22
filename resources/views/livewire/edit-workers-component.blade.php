@section('title') {{'Edit Worker'}} @endsection
<div class="page-content-wrapper-inner">
    <div class="viewport-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb has-arrow">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Register new worker</li>
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
                                    Edit Worker
                                </div>
                                <div class="ml-auto showcase_row_area">
                                    <div class="col-md-9 showcase_content_area">
                                        <a href="{{ route('worker.view') }}" class="btn btn-primary">
                                            View Workers
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
                                    <form wire:submit.prevent="updateWorker" enctype="multipart/form-data">
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>First Name</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="text" class="form-control" id="" placeholder="First Name"
                                                    wire:model="firstname" required />
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Last Name</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="text" class="form-control" id="" placeholder="Last Name"
                                                    wire:model="lastname" required />
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label for="inputType13">Department</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <select class="form-control" wire:model="department" required>
                                                    @foreach ($departments as $department)
                                            <option value={{ $department->name }}>{{ $department->name }}</option>
                                            @endforeach
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="email" class="form-control" placeholder="mail@email.com"
                                                    wire:model="email" required />
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Phone</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="text" class="form-control" placeholder="08090000000"
                                                    wire:model="phone"
                                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                                                    required />
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Marital Status</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <select class="form-control" wire:model="m_status" required>
                                                    <option value="Single">Single</option>
                                                    <option value="Married">
                                                        Married
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Birthday</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <div id="datepicker-popup" class="input-group date datepicker">
                                                    <input type="text" class="form-control" wire:model="b_day"
                                                        onchange="this.dispatchEvent(new InputEvent('input'))"
                                                        placeholder="Date" />
                                                    <span class="input-group-addon input-group-append"><span
                                                            class="mdi mdi-calendar input-group-text"></span></span>
                                                </div>
                                            </div>
                                        </div>
                                        {{-- <div class="row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Worker Image</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input" wire:model="image" />
                                                    <label class="custom-file-label" for="customFile">Choose
                                                        file</label>
                                                </div>
                                            </div>
                                        </div> --}}
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Reg No.</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="text" class="form-control" id="inputType3"
                                                    placeholder="001" wire:model="user_id" disabled />
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label></label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <button type="submit" class="btn btn-sm btn-primary">
                                                    Update
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
