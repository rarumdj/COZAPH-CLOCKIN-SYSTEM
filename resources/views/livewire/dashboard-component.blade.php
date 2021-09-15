@section('title') {{'Dashboard'}} @endsection
<div class="page-content-wrapper-inner">
    <div class="content-viewport">
        <div class="row">
            <div class="col-12 py-5">
                <h4>Dashboard</h4>
                <p class="text-gray">Welcome!</p>
            </div>
            <div class="col-lg-12">
                <div class=" py-3">
                    <div class="d-flex justify-content-between">
                        <div class="ml-auto">
                            <div class="col-12 col-sm-12 py-1">
                                <a href="#" class="form-control bg-info text-white" type="button"
                                    onclick="confirm('Are you sure you want to send these report?') || event.stopImmediatePropagation()"
                                    wire:click="sendReport()">
                                    Send Report
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-12">
                <div class="grid py-3">

                    @livewire('change-date-component')

                </div>
            </div>
        </div>

        <livewire:summary-record-component />


        <livewire:dasboard-table-component />


        <livewire:pie-chart-component />

    </div>
</div>

<!-- DATA MODAL -->
<div class="modal fade bd-example-modal-lg" id="teamUser" tabindex="-1" role="dialog" aria-labelledby="teamUserLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h5 class="modal-title" id="memberLable">Member Details</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <!-- Modal body -->
            <!-- <div class="modal-body" id="members_detail"> -->

            <!-- </div> -->
            <div class="modal-body" id="viewMember">

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