<div class="row">
    <div class="col-lg-4 col-md-6 equel-grid">
        <div class="grid">
            <div class="grid-body">
                <h2 class="grid-title">Attendance Chart</h2>
                <div class="item-wrapper">
                    <div class="sample-chart">
                        @if (!is_null($pieChartModel))
                        <livewire:livewire-pie-chart key="{{ $pieChartModel->reactiveKey() }}"
                            :pie-chart-model="$pieChartModel" />
                        @endif
                    </div>
                    {{-- <livewire:livewire-column-chart :column-chart-model="$columnChartModel" /> --}}
                    {{-- <livewire:livewire-pie-chart key="{{ $pieChartModel->reactiveKey() }}"
                    :pie-chart-model="$pieChartModel" /> --}}
                </div>
            </div>
            <div class="px-4 py-3 d-block">
                {{-- <div class="row">
                    <div class="col text-center" id="countAttend">

                    </div>
                </div> --}}
            </div>
        </div>
    </div>
</div>