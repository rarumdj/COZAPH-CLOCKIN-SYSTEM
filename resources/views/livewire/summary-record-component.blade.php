<div class="row">
    <div class="col-lg col-md-6 col-sm-6 equel-grid">
        <div class="grid">
            <div class="grid-body text-gray">
                <div class="d-flex justify-content-center">


                    <p>Total Workers</p>
                </div>
                @if (!is_null($co_members))
                <h5 class="my-3 text-center">
                    {{ $co_members }}
                </h5>
                @else
                <h5 class="my-3 text-center">
                    0
                </h5>
                @endif
            </div>
        </div>
    </div>
    <div class="col-lg col-md-6 col-sm-6 equel-grid">
        <div class="grid">
            <div class="grid-body text-gray">
                <div class="d-flex justify-content-center">


                    <p>Present (Early)</p>
                </div>
                @if (!is_null($co_early))
                <h5 class="my-3 text-center">{{ $co_early }}</h5>
                @else
                <h5 class="my-3 text-center">0</h5>
                @endif

            </div>
        </div>
    </div>
    <div class="col-lg col-md-6 col-sm-6 equel-grid">
        <div class="grid">
            <div class="grid-body text-gray">
                <div class="d-flex justify-content-center">


                    <p>Present (Late)</p>
                </div>

                @if (!is_null($co_late)) <h5 class="my-3 text-center">{{ $co_late }}</h5>
                @else
                <h5 class="my-3 text-center">0</h5>
                @endif

            </div>
        </div>
    </div>
    <div class="col-lg col-md-6 col-sm-6 equel-grid">
        <div class="grid">
            <div class="grid-body text-gray">
                <div class="d-flex justify-content-center">


                    <p>Absent</p>
                </div>
                @if (!is_null($co_absent))
                <h5 class="my-3 text-center">{{ $co_absent }}</h5>
                @else
                <h5 class="my-3 text-center">0</h5>
                @endif

            </div>
        </div>
    </div>
</div>