@section('title') {{'Send Mail'}} @endsection
<div class="page-content-wrapper-inner">
    <div class="viewport-header">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb has-arrow">
                <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                <li class="breadcrumb-item"><a href="{{ route('mail.dashboard') }}">Mail Dashboard</a></li>
                <li class="breadcrumb-item active" aria-current="page">Mailer</li>
            </ol>
        </nav>
    </div>
    <div class="content-viewport">
        <div class="row">
            <div class="col-lg-10">
                <div class="grid">
                    <p class="grid-header">Email</p>
                    <div class="grid-body">
                        <div class="item-wrapper">
                            <div class="row showcase_row_area">
                                <div class="col-md-1 showcase_text_area">
                                    <label for="inputType12">From</label>
                                </div>
                                <div class="col-md-10 showcase_content_area">
                                    <select class="custom-select">
                                        <option selected="selected">
                                            davemoses3@gmail.com
                                        </option>
                                        <option value="1">Individuals</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row showcase_row_area">
                                <div class="col-md-1 showcase_text_area">
                                    <label for="inputType12">To</label>
                                </div>
                                <div class="col-md-10 col-10 showcase_content_area">
                                    <div class="input-group">
                                        <textarea type="text" class="form-control form-control-lg" id="tags"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-1 col-1" style="margin-left: -10px">
                                    <div class="">
                                        <button class="
                            mdi mdi-account-multiple-plus
                            input-group-text
                            rb-none
                          " type="button"></button>
                                        <button class="mdi mdi-plus input-group-text rt-none" type="button"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" id="showCc" href="#">Cc</a>
                                            <a class="dropdown-item" id="showBcc" href="#">Bcc</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row showcase_row_area hideCc">
                                <div class="col-md-1 showcase_text_area">
                                    <label for="inputType12">Cc</label>
                                </div>
                                <div class="col-md-10 col-10 showcase_content_area">
                                    <div class="input-group">
                                        <textarea type="text" class="form-control form-control-lg" id="tags"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-1 col-1" style="margin-left: -10px">
                                    <div class="">
                                        <button class="
                            mdi mdi-minus
                            input-group-text
                            bg-danger
                            text-white
                          " id="hideCc" type="button"></button>
                                    </div>
                                </div>
                            </div>
                            <div class="row showcase_row_area hideBcc">
                                <div class="col-md-1 showcase_text_area">
                                    <label for="inputType12">Bcc</label>
                                </div>
                                <div class="col-md-10 col-10 showcase_content_area">
                                    <div class="input-group">
                                        <textarea type="text" class="form-control form-control-lg" id="tags"></textarea>
                                    </div>
                                </div>
                                <div class="col-md-1 col-1" style="margin-left: -10px">
                                    <div class="">
                                        <button class="
                            mdi mdi-minus
                            input-group-text
                            bg-danger
                            text-white
                          " id="hideBcc" type="button"></button>
                                    </div>
                                </div>
                            </div>
                            <div class="row showcase_row_area">
                                <div class="col-md-1 showcase_text_area">
                                    <label for="inputType12">Subject</label>
                                </div>
                                <div class="col-md-10 showcase_content_area">
                                    <div class="input-group">
                                        <input type="text" class="form-control form-control-lg" placeholder="Subject" />
                                    </div>
                                </div>
                            </div>

                            <div class="row showcase_row_area">
                                <div class="col-md-1 showcase_text_area"></div>
                                <div class="col-md-10 showcase_content_area">
                                    <textarea id="mytextarea"></textarea>
                                    <input type="hidden" id="content" name="content" />
                                    <input type="hidden" id="post_id" name="post_id" value="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>