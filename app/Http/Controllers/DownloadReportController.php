<?php

namespace App\Http\Controllers;

use App\Exports\AttendancesExport;
use App\Models\Attendance;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DownloadReportController extends Controller
{

    public function downloadEarly(Request $request, $date)
    {
        $attendance = Attendance::where(['status' => 'Early'])->where('created_at', 'LIKE', '%' . $date . '%')->pluck('id')->map(fn ($item) => (string) $item)->toArray();
        return (new AttendancesExport($attendance))->download('attendance' . time()  . '.xlsx');
    }

    public function downloadLate(Request $request, $date)
    {
        $attendance = Attendance::where(['status' => 'Late'])->where('created_at', 'LIKE', '%' . $date . '%')->pluck('id')->map(fn ($item) => (string) $item)->toArray();
        return (new AttendancesExport($attendance))->download('attendance' . time()  . '.xlsx');
    }

    public function downloadAbsent(Request $request, $date)
    {
        $attendance = Attendance::where(['status' => 'Absent'])->where('created_at', 'LIKE', '%' . $date . '%')->pluck('id')->map(fn ($item) => (string) $item)->toArray();
        return (new AttendancesExport($attendance))->download('attendance' . time()  . '.xlsx');
    }

    public function downloadDeptReport(Request $request, $department, $date)
    {
        $attendance = Attendance::where('department', $department)->where('created_at', 'LIKE', '%' . $date . '%')->pluck('id')->map(fn ($item) => (string) $item)->toArray();
        return (new AttendancesExport($attendance))->download('attendance' . time()  . '.xlsx');
    }
}
