@section('title') {{'Create Department'}} @endsection

<div class="page-content-wrapper-inner">
    <div class="viewport-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb has-arrow">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Create Department</li>
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
                                    Create a Department
                                </div>
                                <div class="ml-auto showcase_row_area">
                                    <div class="col-md-9 showcase_content_area">
                                        <a href="{{ route('department.view') }}" class="btn btn-primary">
                                            View Department
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
                                    <form wire:submit.prevent="storeDepartment" enctype="multipart/form-data">
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Department Name</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="text" class="form-control" id="" placeholder="Department Name"
                                                    wire:model="department" required />
                                            </div>
                                        </div>
                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label>Abbrivation Name</label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <input type="text" class="form-control" id="" placeholder="Abbrivation Name"
                                                    wire:model="abbr" required />
                                            </div>
                                        </div>

                                        <div class="form-group row showcase_row_area">
                                            <div class="col-md-3 showcase_text_area">
                                                <label></label>
                                            </div>
                                            <div class="col-md-9 showcase_content_area">
                                                <button type="submit" class="btn btn-sm btn-primary">
                                                    Create
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
