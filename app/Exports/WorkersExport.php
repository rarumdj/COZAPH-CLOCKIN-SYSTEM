<?php

namespace App\Exports;

use App\Models\Worker;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;

class WorkersExport implements FromQuery, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    use Exportable;
    protected $workers;

    public function __construct($workers)
    {
        $this->workers = $workers;
    }

    public function query()
    {
        return Worker::query()->whereKey($this->workers);
    }

    public function headings(): array
    {
        return  [
            'ID',
            'Reg No',
            'First Name',
            'Last Name',
            'Department',
            'Email',
            'Phone',
            'Occupation',
            'Marital Status',
            'Birthday',
            'Image',
            'Role',
            'Created_at',
            'Updated_at',
        ];
    }
}
