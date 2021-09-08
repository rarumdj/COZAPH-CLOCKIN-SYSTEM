<?php

namespace App\Exports;

use App\Models\Attendance;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AttendancesExport implements FromQuery, WithHeadings
{
    /**
     * @return \Illuminate\Support\Collection
     */
    use Exportable;
    protected $attendances;

    public function __construct($attendances)
    {
        $this->attendances = $attendances;
    }

    public function query()
    {
        return Attendance::query()->whereKey($this->attendances);
    }

    public function headings(): array
    {
        return  [
            'ID',
            'Reg No',
            'Full Name',
            'Department',
            'Email',
            'Phone',
            'Call Time',
            'Clocked in',
            'Clocked out',
            'Co_status',
            'Permit',
            'Status',
            'Image',
            'Created_at',
            'Updated_at',
        ];
    }
}
