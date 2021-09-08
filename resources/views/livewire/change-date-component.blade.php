<div class="d-flex justify-content-between">

    {{-- <div class="">
        <div class="px-3 py-2 d-block">Today's Attendance (Sunday)</div>
    </div> --}}
    <div class="ml-auto">
        <form action="{{ route('search.date') }}">
            <div class="col-12 col-sm-12 showcase_content_area  py-0 ">
                <div class="demo-wrapper">
                    <div id="datepicker-popup" class="input-group date datepicker">
                        <input type="text" name="date" value="{{ $date }}" class="form-control bg-white"
                            placeholder="Set Date" />
                        <span class="input-group-addon input-group-append"><span
                                class="mdi mdi-calendar input-group-text bg-white"></span></span>
                    </div>
                </div>
            </div>
    </div>
    <div class="">
        <div class="col-12 col-sm-12 py-1">
            <button type="submit" class="form-control bg-info text-white">Search</button>
        </div>
    </div>
    </form>
</div>