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
                                    Departments
                                </div>
                                <div class="ml-auto showcase_row_area">
                                    <div class="col-md-9 showcase_content_area">
                                        <a href="{{ route('department.create') }}" class="btn btn-primary">
                                            New Department
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
                                            <option value="">Dept</option>
                                            @foreach ($listdepts as $dept)
                                            <option value={{ $dept->name }}>{{ $dept->name }}</option>
                                    @endforeach
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
                                                <input type="checkbox" wire:model="selectPage" @if(!is_null($departments) &&
                                                    $departments->isEmpty())
                                                disabled
                                                @endif>
                                            </th>
                                            <th>Name</th>
                                            <th>Abr</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        @foreach ($departments as $department)
                                        <tr class="@if ($this->isChecked($department->id))
                                            table-primary
                                        @endif">
                                            <td><input type="checkbox" value="{{ $department->id }}" wire:model="checked">
                                            </td>
                                            <td>{{ $department->name }}</td>

                                            <td>{{ $department->abr }}</td>

                                            <td>
                                                <div class="d-flex">
                                                    <a href="{{ route('department.edit', ['Uid'=>$department->id]) }}"
                                                        class="btn btn-xs btn-primary mr-2">Edit
                                                    </a>
                                                    <a href="#" class="btn btn-xs btn-danger" type="button"
                                                        onclick="confirm('Are you sure you want to Delete these Record?') || event.stopImmediatePropagation()"
                                                        wire:click="delete({{ $department->id }})">
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
                                    {{ $departments->links() }}
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
