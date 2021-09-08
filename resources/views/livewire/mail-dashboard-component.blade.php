<div class="page-content-wrapper-inner">
    <div class="viewport-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb has-arrow">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Mail Dashboard</li>
            </ol>
        </nav>
    </div>
    <div class="content-viewport">

        <div class="row">
            <div class="col-lg col-md-6 col-sm-6 equel-grid">
                <div class="grid">
                    <div class="grid-body text-gray">
                        <a href="{{ route('mail.mailer') }}" class="d-flex align-self-center justify-content-center">
                            <!-- <p>Send Text</p> -->

                            <h5 class="my-4 text-center">Send Mail</h5>
                        </a>

                    </div>
                </div>
            </div>
            <div class="col-lg col-md-6 col-sm-6 equel-grid">
                <div class="grid">
                    <div class="grid-body text-gray">
                        <div class="d-flex align-self-center justify-content-center">
                            <!-- <p>Send Text</p> -->

                            <h5 class="my-4 text-center">Send Text</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="grid">
                    <div class="border-bottom px-3 py-3 d-block">History Log</div>
                    <div class="border-bottom bg-inverse-secondary px-3 py-3 d-block d-flex justify-content-between">
                        <div class="ml-auto">
                            <div class="col-12 col-sm-12 showcase_content_area mb-2 pl-1">
                                <input type="button" class="form-control bg-white" value="Mail" />
                            </div>
                        </div>
                        <div class="">
                            <div class="col-12 col-sm-12 showcase_content_area mb-2 pl-1">
                                <input type="button" class="form-control bg-white" value="Print" />
                            </div>
                        </div>
                        <div class="">
                            <div class="col-12 col-sm-12 showcase_content_area mb-2 pl-1">
                                <input type="button" class="form-control bg-white" value="Download" />
                            </div>
                        </div>
                    </div>
                    <div class="grid-body">
                        <div class="item-wrapper">
                            <div class="table-responsive" id="members_sum_details">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</div>