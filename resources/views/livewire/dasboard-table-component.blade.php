<div class="row">
    <div class="col-lg-12">
        <div class="grid">
            <div class="border-bottom px-3 py-3 d-block">
                Attendance Report
            </div>
            @if ($checked)

            <div class="border-bottom bg-inverse-secondary px-3 py-3 d-block d-flex justify-content-between">
                {{-- <div class="ml-auto">
                    <div class="col-12 col-sm-12 showcase_content_area mb-2 pl-1">
                        <input type="button" class="form-control bg-white" value="Mail" />
                    </div>
                </div>
                <div class="">
                    <div class="col-12 col-sm-12 showcase_content_area mb-2 pl-1">
                        <input type="button" class="form-control bg-white" value="Print" />
                    </div>
                </div> --}}
                <div class="ml-auto">
                    <div class="col-12 col-sm-12 showcase_content_area mb-2 pl-1">
                        <input type="button" class="form-control bg-white"
                            onclick="confirm('Are you sure you want to Download these Records?') || event.stopImmediatePropagation()"
                            wire:click="download()" value="Download" />
                    </div>
                </div>
            </div>
            @endif

            <div class="grid-body">
                <div class="item-wrapper">
                    <div class="d-flex justify-content-between row align-content-center mb-2">
                        <div>
                            <div class="col-12 col-md-12 d-flex align-items-center mb-2">
                                <label for="paginate" class="text-nowrap mr-2 mb-0">Show</label>
                                <select wire:model="paginate" name="paginate" id="paginate"
                                    class="form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div class="col-12 col-md-12 d-flex align-items-center  mb-2">
                                <label for="Dept" class="text-nowrap mr-2 mb-0">Dept</label>
                                <select class="form-control form-control-sm" wire:model="selectedDept">
                                    <option value="Avalanche">Avalanche</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Altar Management">Altar Management</option>
                                    <option value="COZA Care">COZA Care</option>
                                    <option value="COZA Transfer Service">COZA Transfer Service</option>
                                    <option value="Child Care">Child Care</option>
                                    <option value="Decoration">Decoration</option>
                                    <option value="Drama">Drama</option>
                                    <option value="Media">Media</option>
                                    <option value="Hospitality">Hospitality</option>
                                    <option value="Host & Hostess">Host & Hostess</option>
                                    <option value="Partnership">Partnership</option>
                                    <option value="Pastoral Care">Pastoral Care</option>
                                    <option value="Public Relations">Public Relations</option>
                                    <option value="M & E">M & E</option>
                                    <option value="Sound">Sound</option>
                                    <option value="Outreach">Outreach</option>
                                    <option value="New Convert">New Convert</option>
                                    <option value="Traffic & Security">Traffic & Security</option>
                                    <option value="Ushering">Ushering</option>
                                    <option value="Witty">Witty</option>
                                    <option value="Word Factory">Word Factory</option>
                                    <option value="Sparkles">Sparkles</option>
                                    <option value="Protocol">Protocol</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <div class="col-12 col-md-12 d-flex align-items-center  mb-2">
                                <label for="status" class="text-nowrap mr-2 mb-0">Status</label>
                                <select class="form-control form-control-sm" wire:model="selectedStatus">
                                    <option value="">Status</option>
                                    <option value="Early">Early</option>
                                    <option value="Late">Late</option>
                                    <option value="Absent">Absent</option>
                                </select>
                            </div>
                        </div>

                        {{-- <div class="">
                            @if ($checked)
                            <div class="col-12 col-md-12 d-flex align-items-center dropdown  mb-2">
                                <button class="btn btn-secondary form-control btn-xs dropdown-toggle"
                                    data-toggle="dropdown">With Checked
                                    ({{ count($checked) }})
                                </button>
                                <div class="dropdown-menu">
                                    <a href="#" class="dropdown-item" type="button"
                                        onclick="confirm('Are you sure you want to Clockout these Records?') || event.stopImmediatePropagation()"
                                        wire:click="clockoutMass()">
                                        Clockout
                                    </a>
                                    <a href="#" class="dropdown-item" type="button"
                                        onclick="confirm('Are you sure you want to Permit these Records?') || event.stopImmediatePropagation()"
                                        wire:click="permitMass()">
                                        Permit
                                    </a>

                                </div>
                            </div>
                            @endif
                        </div> --}}

                        <div class="">
                            <div class="col-md-12 col-12 mb-2">
                                <input type="search" wire:model.debounce.500ms="search" class="form-control"
                                    placeholder="Search...">
                            </div>
                        </div>

                        @if ($selectPage)
                        <div class="col-md-10 mb-2">
                            @if ($selectAll)
                            <div>
                                You have selected all <strong>{{ $attendances->total() }}</strong> items.
                            </div>
                            @else
                            <div>
                                You have selected <strong>{{ count($checked) }}</strong> items, Do you want to
                                Select All
                                <strong>{{ $attendances->total() }}</strong>?
                                <a href="#" class="ml-2" wire:click="selectAll">Select All</a>
                            </div>
                            @endif

                        </div>
                        @endif


                    </div>
                    <div class="table-responsive">
                        <table class="table table-hover" width="100%">
                            <thead>
                                <tr>
                                    <th><input type="checkbox" wire:model="selectPage" @if (!is_null($attendances) &&
                                            $attendances->isEmpty())
                                        disabled
                                        @endif>
                                    </th>
                                    <th>Worker</th>
                                    <th>Reg ID</th>
                                    <th>Clocked in</th>
                                    <th>Clocked out</th>
                                </tr>
                            </thead>
                            <tbody>
                                @if(!is_null($attendances))
                                @foreach ($attendances as $attendance)
                                <tr class="@if ($this->isChecked($attendance->id))
                                    table-primary
                                @endif">
                                    <td><input type="checkbox" value="{{ $attendance->id }}" wire:model="checked">
                                    </td>
                                    <td class="d-flex align-items-center border-top-0">
                                        <img class="profile-img img-sm img-rounded mr-2"
                                            src="{{ asset('assets/images/profile/male/image_1.png') }}"
                                            alt="profile image" />
                                        <span>{{ $attendance->fullname }}
                                            <br />
                                            {{ $attendance->department }}</span>
                                    </td>
                                    <td>{{ $attendance->user_id }}</td>
                                    <td>{{ $attendance->clockin ? date('h:i a', strtotime($attendance->clockin)) : '' }}
                                    </td>
                                    <td>{{ $attendance->clockout ? date('h:i a', strtotime($attendance->clockout)) : ''
                                        }}</td>
                                </tr>
                                @endforeach
                                @endif
                            </tbody>


                        </table>
                    </div>
                    <div class="row mt-4">
                        <div class="col-sm-6 offset-5">
                            @if(!is_null($attendances))
                            {{ $attendances->links() }}
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>