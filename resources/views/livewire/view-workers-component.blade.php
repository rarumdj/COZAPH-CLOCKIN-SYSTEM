@section('title') {{'Workers'}} @endsection
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
                                    Workforce Members
                                </div>
                                <div class="ml-auto showcase_row_area">
                                    <div class="col-md-9 showcase_content_area">
                                        <a href="{{ route('worker.register') }}" class="btn btn-primary">
                                            New Worker
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class=" grid-body">
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

                                <div class="">
                                    @if ($checked)
                                    <div class="col-12 col-md-12 d-flex align-items-center dropdown  mb-2">
                                        <button class="btn btn-secondary form-control btn-xs dropdown-toggle"
                                            data-toggle="dropdown">With Checked
                                            ({{ count($checked) }})
                                        </button>
                                        <div class="dropdown-menu">
                                            <a href="#" class="dropdown-item" type="button"
                                                onclick="confirm('Are you sure you want to Download these Records?') || event.stopImmediatePropagation()"
                                                wire:click="download()">
                                                Download
                                            </a>
                                            <a href="#" class="dropdown-item" type="button"
                                                onclick="confirm('Are you sure you want to Delete these Records?') || event.stopImmediatePropagation()"
                                                wire:click="deleteMultiple()">
                                                Delete
                                            </a>

                                        </div>
                                    </div>
                                    @endif


                                </div>
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
                                        You have selected all
                                        <strong>{{ $workers->total() }}</strong> items.
                                    </div>
                                    @else
                                    <div>
                                        You have selected <strong>{{ count($checked) }}</strong>
                                        items, Do you want to
                                        Select All
                                        <strong>{{ $workers->total() }}</strong>?
                                        <a href="#" class="ml-2" wire:click="selectAll">Select
                                            All</a>
                                    </div>
                                    @endif

                                </div>
                                @endif


                            </div>
                            <div class="table-responsive">
                                <table class="table table-hover" width="100%">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input type="checkbox" wire:model="selectPage" @if(!is_null($workers) &&
                                                    $workers->isEmpty())
                                                disabled
                                                @endif>
                                            </th>
                                            <th>Reg ID</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Occupation</th>
                                            <th>Marital Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        @foreach ($workers as $worker)
                                        <tr class="@if ($this->isChecked($worker->id))
                                            table-primary
                                        @endif">
                                            <td><input type="checkbox" value="{{ $worker->id }}" wire:model="checked">
                                            </td>
                                            <td>{{ $worker->user_id }}</td>
                                            <td class="d-flex align-items-center border-top-0">
                                                <img class="profile-img img-sm img-rounded mr-2"
                                                    src="{{ asset('assets/images/profile/male/image_1.png') }}"
                                                    alt="profile image" />
                                                <span>{{ $worker->firstname.' '.$worker->lastname }}
                                                    <br />
                                                    {{ $worker->department }}</span>
                                            </td>
                                            <td>{{ $worker->email }}</td>
                                            <td>{{ $worker->phone }}</td>
                                            <td>{{ $worker->occupation }}</td>
                                            <td>{{ $worker->m_status }}</td>
                                            <td>
                                                <div class="d-flex">
                                                    <a href="{{ route('worker.edit', ['user_id'=>$worker->user_id]) }}"
                                                        class="btn btn-xs btn-primary mr-2">Edit
                                                    </a>
                                                    <a href="#" class="btn btn-xs btn-danger" type="button"
                                                        onclick="confirm('Are you sure you want to Delete these Record?') || event.stopImmediatePropagation()"
                                                        wire:click="delete({{ $worker->id }})">
                                                        Delete
                                                    </a>
                                                </div>
                                            </td>

                                        </tr>
                                        @endforeach
                                    </tbody>

                                </table>
                            </div>
                            <div class="row mt-4">
                                <div class="col-sm-6 offset-5">
                                    {{ $workers->links() }}
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