<?php

namespace App\Http\Livewire;

use App\Exports\AttendancesExport;
use App\Mail\DeptReport;
use App\Mail\SendReport;
use App\Models\Attendance;
use App\Models\Worker;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Livewire\Component;
use Livewire\WithPagination;

class DashboardComponent extends Component
{
    public $co_early, $earl_aval, $earl_admin, $earl_alMan, $earl_ccare, $earl_cts, $earl_childc, $earl_deco, $earl_drama, $earl_media, $earl_hosp, $earl_hnh, $earl_partner, $earl_pru, $earl_pcu, $earl_mne, $earl_sound, $earl_outreach, $earl_newco, $earl_ts, $earl_usher, $earl_witty, $earl_wf, $earl_spark, $earl_pro;
    public $co_late, $late_aval, $late_admin, $late_alMan, $late_ccare, $late_cts, $late_childc, $late_deco, $late_drama, $late_media, $late_hosp, $late_hnh, $late_partner, $late_pru, $late_pcu, $late_mne, $late_sound, $late_outreach, $late_newco, $late_ts, $late_usher, $late_witty, $late_wf, $late_spark, $late_pro;
    public $co_absent, $abs_aval, $abs_admin, $abs_alMan, $abs_ccare, $abs_cts, $abs_childc, $abs_deco, $abs_drama, $abs_media, $abs_hosp, $abs_hnh, $abs_partner, $abs_pru, $abs_pcu, $abs_mne, $abs_sound, $abs_outreach, $abs_newco, $abs_ts, $abs_usher, $abs_witty, $abs_wf, $abs_spark, $abs_pro;
    public $co_members, $co_aval, $co_admin, $co_alMan, $co_ccare, $co_cts, $co_childc, $co_deco, $co_drama, $co_media, $co_hosp, $co_hnh, $co_partner, $co_pru, $co_pcu, $co_mne, $co_sound, $co_outreach, $co_newco, $co_ts, $co_usher, $co_witty, $co_wf, $co_spark, $co_pro;
    public $date;

    public function getOldDateProperty()
    {
        $limit_attendance = Attendance::latest('created_at')->limit(1)->pluck('created_at')->first();
        if (!is_null($limit_attendance)) {
            return  $limit_attendance;
        }
    }

    public function mount()
    {
        ////////////////////////////// Count for members in all departments
        $this->co_members = Worker::all()->count();
        $this->co_aval = Worker::where('department', 'Avalanche')->count();
        $this->co_admin = Worker::where('department', 'Admin')->count();
        $this->co_alMan = Worker::where('department', 'Altar Management')->count();
        $this->co_ccare = Worker::where('department', 'COZA Care')->count();
        $this->co_cts = Worker::where('department', 'COZA Transfer Service')->count();
        $this->co_childc = Worker::where('department', 'Child Care')->count();
        $this->co_deco = Worker::where('department', 'Decoration')->count();
        $this->co_drama = Worker::where('department', 'Drama')->count();
        $this->co_media = Worker::where('department', 'Media')->count();
        $this->co_hosp = Worker::where('department', 'Hospitality')->count();
        $this->co_hnh = Worker::where('department', 'Host & Hostess')->count();
        $this->co_partner = Worker::where('department', 'Partnership')->count();
        $this->co_pcu = Worker::where('department', 'Pastoral Care')->count();
        $this->co_pru = Worker::where('department', 'Public Relations')->count();
        $this->co_mne = Worker::where('department', 'M & E')->count();
        $this->co_sound = Worker::where('department', 'Sound')->count();
        $this->co_outreach = Worker::where('department', 'Outreach')->count();
        $this->co_newco = Worker::where('department', 'New Convert')->count();
        $this->co_ts = Worker::where('department', 'Traffic & Security')->count();
        $this->co_usher = Worker::where('department', 'Ushering')->count();
        $this->co_witty = Worker::where('department', 'Witty')->count();
        $this->co_wf = Worker::where('department', 'Word Factory')->count();
        $this->co_spark = Worker::where('department', 'Sparkles')->count();
        $this->co_pro = Worker::where('department', 'Protocol')->count();
        /////////////////////////

        $this->fill(request()->only('date'));
        if (!$this->date && !is_null($this->oldDate)) {
            //////////////////////////////// Count attendance status in all department
            $this->co_early = Attendance::where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->co_late = Attendance::where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->co_absent = Attendance::where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_aval = Attendance::where('department', 'Avalanche')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_aval = Attendance::where('department', 'Avalanche')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_aval = Attendance::where('department', 'Avalanche')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_admin = Attendance::where('department', 'Admin')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_admin = Attendance::where('department', 'Admin')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_admin = Attendance::where('department', 'Admin')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_alMan = Attendance::where('department', 'Altar Management')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_alMan = Attendance::where('department', 'Altar Management')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_alMan = Attendance::where('department', 'Altar Management')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_ccare = Attendance::where('department', 'COZA Care')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_ccare = Attendance::where('department', 'COZA Care')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_ccare = Attendance::where('department', 'COZA Care')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_cts = Attendance::where('department', 'COZA Transfer Service')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_cts = Attendance::where('department', 'COZA Transfer Service')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_cts = Attendance::where('department', 'COZA Transfer Service')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_childc = Attendance::where('department', 'Child Care')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_childc = Attendance::where('department', 'Child Care')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_childc = Attendance::where('department', 'Child Care')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_deco = Attendance::where('department', 'Decoration')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_deco = Attendance::where('department', 'Decoration')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_deco = Attendance::where('department', 'Decoration')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_drama = Attendance::where('department', 'Drama')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_drama = Attendance::where('department', 'Drama')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_drama = Attendance::where('department', 'Drama')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_media = Attendance::where('department', 'Media')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_media = Attendance::where('department', 'Media')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_media = Attendance::where('department', 'Media')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_hosp = Attendance::where('department', 'Hospitality')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_hosp = Attendance::where('department', 'Hospitality')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_hosp = Attendance::where('department', 'Hospitality')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_hnh = Attendance::where('department', 'Host & Hostess')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_hnh = Attendance::where('department', 'Host & Hostess')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_hnh = Attendance::where('department', 'Host & Hostess')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_partner = Attendance::where('department', 'Partnership')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_partner = Attendance::where('department', 'Partnership')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_partner = Attendance::where('department', 'Partnership')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_pru = Attendance::where('department', 'Public Relations')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_pru = Attendance::where('department', 'Public Relations')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_pru = Attendance::where('department', 'Public Relations')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_pcu = Attendance::where('department', 'Pastoral Care')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_pcu = Attendance::where('department', 'Pastoral Care')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_pcu = Attendance::where('department', 'Pastoral Care')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_mne = Attendance::where('department', 'M & E')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_mne = Attendance::where('department', 'M & E')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_mne = Attendance::where('department', 'M & E')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_sound = Attendance::where('department', 'Sound')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_sound = Attendance::where('department', 'Sound')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_sound = Attendance::where('department', 'Sound')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_outreach = Attendance::where('department', 'Outreach')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_outreach = Attendance::where('department', 'Outreach')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_outreach = Attendance::where('department', 'Outreach')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_newco = Attendance::where('department', 'New Convert')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_newco = Attendance::where('department', 'New Convert')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_newco = Attendance::where('department', 'New Convert')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_ts = Attendance::where('department', 'Traffic & Security')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_ts = Attendance::where('department', 'Traffic & Security')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_ts = Attendance::where('department', 'Traffic & Security')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_usher = Attendance::where('department', 'Ushering')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_usher = Attendance::where('department', 'Ushering')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_usher = Attendance::where('department', 'Ushering')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_witty = Attendance::where('department', 'Witty')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_witty = Attendance::where('department', 'Witty')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_witty = Attendance::where('department', 'Witty')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_wf = Attendance::where('department', 'Word Factory')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_wf = Attendance::where('department', 'Word Factory')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_wf = Attendance::where('department', 'Word Factory')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_spark = Attendance::where('department', 'Sparkles')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_spark = Attendance::where('department', 'Sparkles')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_spark = Attendance::where('department', 'Sparkles')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_pro = Attendance::where('department', 'Protocol')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_pro = Attendance::where('department', 'Protocol')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_pro = Attendance::where('department', 'Protocol')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            ///////////////////////////////
        } else if ($this->date) {

            $this->co_early = Attendance::where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->co_late = Attendance::where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->co_absent = Attendance::where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_aval = Attendance::where('department', 'Avalanche')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_aval = Attendance::where('department', 'Avalanche')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_aval = Attendance::where('department', 'Avalanche')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_admin = Attendance::where('department', 'Admin')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_admin = Attendance::where('department', 'Admin')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_admin = Attendance::where('department', 'Admin')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_alMan = Attendance::where('department', 'Altar Management')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_alMan = Attendance::where('department', 'Altar Management')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_alMan = Attendance::where('department', 'Altar Management')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_ccare = Attendance::where('department', 'COZA Care')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_ccare = Attendance::where('department', 'COZA Care')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_ccare = Attendance::where('department', 'COZA Care')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_cts = Attendance::where('department', 'COZA Transfer Service')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_cts = Attendance::where('department', 'COZA Transfer Service')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_cts = Attendance::where('department', 'COZA Transfer Service')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_childc = Attendance::where('department', 'Child Care')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_childc = Attendance::where('department', 'Child Care')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_childc = Attendance::where('department', 'Child Care')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_deco = Attendance::where('department', 'Decoration')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_deco = Attendance::where('department', 'Decoration')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_deco = Attendance::where('department', 'Decoration')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_drama = Attendance::where('department', 'Drama')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_drama = Attendance::where('department', 'Drama')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_drama = Attendance::where('department', 'Drama')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_media = Attendance::where('department', 'Media')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_media = Attendance::where('department', 'Media')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_media = Attendance::where('department', 'Media')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_hosp = Attendance::where('department', 'Hospitality')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_hosp = Attendance::where('department', 'Hospitality')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_hosp = Attendance::where('department', 'Hospitality')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_hnh = Attendance::where('department', 'Host & Hostess')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_hnh = Attendance::where('department', 'Host & Hostess')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_hnh = Attendance::where('department', 'Host & Hostess')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_partner = Attendance::where('department', 'Partnership')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_partner = Attendance::where('department', 'Partnership')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_partner = Attendance::where('department', 'Partnership')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_pru = Attendance::where('department', 'Public Relations')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_pru = Attendance::where('department', 'Public Relations')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_pru = Attendance::where('department', 'Public Relations')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_pcu = Attendance::where('department', 'Pastoral Care')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_pcu = Attendance::where('department', 'Pastoral Care')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_pcu = Attendance::where('department', 'Pastoral Care')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_mne = Attendance::where('department', 'M & E')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_mne = Attendance::where('department', 'M & E')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_mne = Attendance::where('department', 'M & E')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_sound = Attendance::where('department', 'Sound')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_sound = Attendance::where('department', 'Sound')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_sound = Attendance::where('department', 'Sound')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_outreach = Attendance::where('department', 'Outreach')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_outreach = Attendance::where('department', 'Outreach')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_outreach = Attendance::where('department', 'Outreach')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_newco = Attendance::where('department', 'New Convert')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_newco = Attendance::where('department', 'New Convert')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_newco = Attendance::where('department', 'New Convert')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_ts = Attendance::where('department', 'Traffic & Security')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_ts = Attendance::where('department', 'Traffic & Security')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_ts = Attendance::where('department', 'Traffic & Security')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_usher = Attendance::where('department', 'Ushering')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_usher = Attendance::where('department', 'Ushering')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_usher = Attendance::where('department', 'Ushering')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_witty = Attendance::where('department', 'Witty')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_witty = Attendance::where('department', 'Witty')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_witty = Attendance::where('department', 'Witty')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_wf = Attendance::where('department', 'Word Factory')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_wf = Attendance::where('department', 'Word Factory')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_wf = Attendance::where('department', 'Word Factory')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_spark = Attendance::where('department', 'Sparkles')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_spark = Attendance::where('department', 'Sparkles')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_spark = Attendance::where('department', 'Sparkles')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_pro = Attendance::where('department', 'Protocol')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_pro = Attendance::where('department', 'Protocol')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_pro = Attendance::where('department', 'Protocol')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
        } else {
        }
    }

    public function sendReport()
    {
        $this->fill(request()->only('date'));
        if (!$this->date && !is_null($this->oldDate)) {

            $body = [
                'type' => 'dashboard',
                'co_members' => $this->co_members,
                'co_early' => $this->co_early,
                'link_early' => url('/attendance/earlyreport/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')),
                'co_late' => $this->co_late,
                'link_late' => url('/attendance/latereport/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')),
                'co_absent' => $this->co_absent,
                'link_absent' => url('/attendance/absentreport/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')),
                'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d'),
            ];

            Mail::to('pstoyewolesoetan@gmail.com')
                ->cc('omoalu@outlook.com')
                ->bcc('davemoses3@gmail.com')
                ->queue(new SendReport($body));

            $deptBodys = [
                ['email' => 'ireoluwasoetan@gmail.com', 'data' => ['name' => 'Ireoluwa Soetan', 'dept' => 'Avalanche', 'co_members' => $this->co_aval, 'co_early' => $this->earl_aval, 'co_late' => $this->late_aval, 'co_absent' => $this->abs_aval, 'link' => url('/attendance/report/Avalanche/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'davemoses3@gmail.com', 'data' => ['name' => 'David Johnson', 'dept' => 'Admin', 'co_members' => $this->co_admin, 'co_early' => $this->earl_admin, 'co_late' => $this->late_admin, 'co_absent' => $this->abs_admin, 'link' => url('/attendance/report/Admin/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'mail.sdmorris@gmail.com', 'data' => ['name' => 'Morris Sordum', 'dept' => 'Altar Management', 'co_members' => $this->co_alMan, 'co_early' => $this->earl_alMan, 'co_late' => $this->late_alMan, 'co_absent' => $this->abs_alMan, 'link' => url('/attendance/report/Altar Management/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'uju92154@gmail.com', 'data' => ['name' => 'Elsie Nwaneri', 'dept' => 'COZA Care', 'co_members' => $this->co_ccare, 'co_early' => $this->earl_ccare, 'co_late' => $this->late_ccare, 'co_absent' => $this->abs_ccare, 'link' => url('/attendance/report/COZA Care/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'udehmarshall@gmail.com', 'data' => ['name' => 'Marshall Udeh', 'dept' => 'COZA Transfer Service', 'co_members' => $this->co_cts, 'co_early' => $this->earl_cts, 'co_late' => $this->late_cts, 'co_absent' => $this->abs_cts, 'link' => url('/attendance/report/COZA Transfer Service/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'modupeativie@gmail.com', 'data' => ['name' => 'Modupe Ativie', 'dept' => 'Child Care', 'co_members' => $this->co_childc, 'co_early' => $this->earl_childc, 'co_late' => $this->late_childc, 'co_absent' => $this->abs_childc, 'link' => url('/attendance/report/Child Care/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'kalio.winifred@gmail.com', 'data' => ['name' => 'Freeman Kalio Winifred', 'dept' => 'Decoration', 'co_members' => $this->co_deco, 'co_early' => $this->earl_deco, 'co_late' => $this->late_deco, 'co_absent' => $this->abs_deco, 'link' => url('/attendance/report/Decoration/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'auntymma123@gmail.com', 'data' => ['name' => 'Emily Clarkson', 'dept' => 'Drama', 'co_members' => $this->co_drama, 'co_early' => $this->earl_drama, 'co_late' => $this->late_drama, 'co_absent' => $this->abs_drama, 'link' => url('/attendance/report/Drama/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'edokaabel@gmail.com', 'data' => ['name' => 'Abel Edoka', 'dept' => 'Media', 'co_members' => $this->co_media, 'co_early' => $this->earl_media, 'co_late' => $this->late_media, 'co_absent' => $this->abs_media, 'link' => url('/attendance/report/Media/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                // ['email' => 'getrommy@yahoo.com', 'data' => ['name' => 'Oroma Chigbo', 'dept' => 'Hospitality', 'co_members' => $this->co_hosp, 'co_early' => $this->earl_hosp, 'co_late' => $this->late_hosp, 'co_absent' => $this->abs_hosp, 'link' => url('/attendance/report/Hospitality/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'just_ine2002@yahoo.com', 'data' => ['name' => 'Justin Masi', 'dept' => 'Host & Hostess', 'co_members' => $this->co_hnh, 'co_early' => $this->earl_hnh, 'co_late' => $this->late_hnh, 'co_absent' => $this->abs_hnh, 'link' => url('/attendance/report/Host & Hostess/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'afagunjade@gmail.com', 'data' => ['name' => 'Ayoola Fagunjade', 'dept' => 'Partnership', 'co_members' => $this->co_partner, 'co_early' => $this->earl_partner, 'co_late' => $this->late_partner, 'co_absent' => $this->abs_partner, 'link' => url('/attendance/report/Partnership/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'sheldonnwosu@gmail.com', 'data' => ['name' => 'Sheldon Nwosu', 'dept' => '', 'co_members' => $this->co_pcu, 'co_early' => $this->earl_pcu, 'co_late' => $this->late_pcu, 'co_absent' => $this->abs_pcu, 'link' => url('/attendance/report/Pastoral Care/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'akinpeluakinyinka@gmail.com', 'data' => ['name' => 'Akinpelu Akinyinka', 'dept' => 'Public Relations', 'co_members' => $this->co_pru, 'co_early' => $this->earl_pru, 'co_late' => $this->late_pru, 'co_absent' => $this->abs_pru, 'link' => url('/attendance/report/Public Relations/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'omoalu@outlook.com', 'data' => ['name' => 'Omodolapo Alu', 'dept' => 'M & E', 'co_members' => $this->co_mne, 'co_early' => $this->earl_mne, 'co_late' => $this->late_mne, 'co_absent' => $this->abs_mne, 'link' => url('/attendance/report/M & E/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'victoranyanwu04@gmail.com', 'data' => ['name' => 'Victor Anyanwu', 'dept' => 'Sound', 'co_members' => $this->co_sound, 'co_early' => $this->earl_sound, 'co_late' => $this->late_sound, 'co_absent' => $this->abs_sound, 'link' => url('/attendance/report/Sound/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'nneka.enang@yahoo.com', 'data' => ['name' => 'Nneka Enang', 'dept' => 'Outreach', 'co_members' => $this->co_outreach, 'co_early' => $this->earl_outreach, 'co_late' => $this->late_outreach, 'co_absent' => $this->abs_outreach, 'link' => url('/attendance/report/Outreach/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'idongenang@gmail.com', 'data' => ['name' => 'Idongesit Enang', 'dept' => 'New Convert', 'co_members' => $this->co_newco, 'co_early' => $this->earl_newco, 'co_late' => $this->late_newco, 'co_absent' => $this->abs_newco, 'link' => url('/attendance/report/New Convert/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'leoativie@yahoo.com', 'data' => ['name' => 'Leo Ativie', 'dept' => 'Traffic & Security', 'co_members' => $this->co_ts, 'co_early' => $this->earl_ts, 'co_late' => $this->late_ts, 'co_absent' => $this->abs_ts, 'link' => url('/attendance/report/Traffic & Security/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'ujuobi44@hotmail.com', 'data' => ['name' => 'Obianuju Ukwuoma', 'dept' => 'Ushering', 'co_members' => $this->co_usher, 'co_early' => $this->earl_usher, 'co_late' => $this->late_usher, 'co_absent' => $this->abs_usher, 'link' => url('/attendance/report/Ushering/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'ifeomagbemudu@gmail.com', 'data' => ['name' => 'Ifeoma Nkem-Gbemudu', 'dept' => 'Witty', 'co_members' => $this->co_witty, 'co_early' => $this->earl_witty, 'co_late' => $this->late_witty, 'co_absent' => $this->abs_witty, 'link' => url('/attendance/report/Witty/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'chineloihuoma.nnadi@gmail.com', 'data' => ['name' => 'Chinelo Ihuoma', 'dept' => 'Word Factory', 'co_members' => $this->co_wf, 'co_early' => $this->earl_wf, 'co_late' => $this->late_wf, 'co_absent' => $this->abs_wf, 'link' => url('/attendance/report/Word Factory/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'janfetekservices@gmail.com', 'data' => ['name' => 'Nwoko-omere Ifeoma', 'dept' => 'Sparkles', 'co_members' => $this->co_spark, 'co_early' => $this->earl_spark, 'co_late' => $this->late_spark, 'co_absent' => $this->abs_spark, 'link' => url('/attendance/report/Sparkles/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'leoativie@yahoo.com', 'data' => ['name' => 'Leo Ativie', 'dept' => 'Protocol', 'co_members' => $this->co_pro, 'co_early' => $this->earl_pro, 'co_late' => $this->late_pro, 'co_absent' => $this->abs_pro, 'link' => url('/attendance/report/Protocol/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],

            ];
            foreach ($deptBodys as $deptBody) {
                Mail::to($deptBody['email'])
                    ->queue(new DeptReport($deptBody['data']));
            }
            $this->emit('alert', ['type' => 'success', 'message' => 'Mail sent successfully.']);
        } else if ($this->date) {
            $body = [
                'type' => 'dashboard',
                'co_members' => $this->co_members,
                'co_early' => $this->co_early,
                'link_early' => url('/attendance/earlyreport/' . $this->date),
                'co_late' => $this->co_late,
                'link_late' =>  url('/attendance/latereport/' . $this->date),
                'co_absent' => $this->co_absent,
                'link_absent' => url('/attendance/absentreport/' . $this->date),
                'date' => $this->date,
            ];

            Mail::to('pstoyewolesoetan@gmail.com')
                ->cc('omoalu@outlook.com')
                ->bcc('davemoses3@gmail.com')
                ->queue(new SendReport($body));

            $deptBodys = [
                ['email' => 'ireoluwasoetan@gmail.com', 'data' => ['name' => 'Ireoluwa Soetan', 'dept' => 'Avalanche', 'co_members' => $this->co_aval, 'co_early' => $this->earl_aval, 'co_late' => $this->late_aval, 'co_absent' => $this->abs_aval, 'link' => url('/attendance/report/Avalanche/' . $this->date), 'date' => $this->date]],
                ['email' => 'davemoses3@gmail.com', 'data' => ['name' => 'David Johnson', 'dept' => 'Admin', 'co_members' => $this->co_admin, 'co_early' => $this->earl_admin, 'co_late' => $this->late_admin, 'co_absent' => $this->abs_admin, 'link' => url('/attendance/report/Admin/' . $this->date), 'date' => $this->date]],
                ['email' => 'mail.sdmorris@gmail.com', 'data' => ['name' => 'Morris Sordum', 'dept' => 'Altar Management', 'co_members' => $this->co_alMan, 'co_early' => $this->earl_alMan, 'co_late' => $this->late_alMan, 'co_absent' => $this->abs_alMan, 'link' => url('/attendance/report/Altar Management/' . $this->date), 'date' => $this->date]],
                ['email' => 'uju92154@gmail.com', 'data' => ['name' => 'Elsie Nwaneri', 'dept' => 'COZA Care', 'co_members' => $this->co_ccare, 'co_early' => $this->earl_ccare, 'co_late' => $this->late_ccare, 'co_absent' => $this->abs_ccare, 'link' => url('/attendance/report/COZA Care/' . $this->date), 'date' => $this->date]],
                ['email' => 'udehmarshall@gmail.com', 'data' => ['name' => 'Marshall Udeh', 'dept' => 'COZA Transfer Service', 'co_members' => $this->co_cts, 'co_early' => $this->earl_cts, 'co_late' => $this->late_cts, 'co_absent' => $this->abs_cts, 'link' => url('/attendance/report/COZA Transfer Service/' . $this->date), 'date' => $this->date]],
                ['email' => 'modupeativie@gmail.com', 'data' => ['name' => 'Modupe Ativie', 'dept' => 'Child Care', 'co_members' => $this->co_childc, 'co_early' => $this->earl_childc, 'co_late' => $this->late_childc, 'co_absent' => $this->abs_childc, 'link' => url('/attendance/report/Child Care/' . $this->date), 'date' => $this->date]],
                ['email' => 'kalio.winifred@gmail.com', 'data' => ['name' => 'Freeman Kalio Winifred', 'dept' => 'Decoration', 'co_members' => $this->co_deco, 'co_early' => $this->earl_deco, 'co_late' => $this->late_deco, 'co_absent' => $this->abs_deco, 'link' => url('/attendance/report/Decoration/' . $this->date), 'date' => $this->date]],
                ['email' => 'auntymma123@gmail.com', 'data' => ['name' => 'Emily Clarkson', 'dept' => 'Drama', 'co_members' => $this->co_drama, 'co_early' => $this->earl_drama, 'co_late' => $this->late_drama, 'co_absent' => $this->abs_drama, 'link' => url('/attendance/report/Drama/' . $this->date), 'date' => $this->date]],
                ['email' => 'edokaabel@gmail.com', 'data' => ['name' => 'Abel Edoka', 'dept' => 'Media', 'co_members' => $this->co_media, 'co_early' => $this->earl_media, 'co_late' => $this->late_media, 'co_absent' => $this->abs_media, 'link' => url('/attendance/report/Media/' . $this->date), 'date' => $this->date]],
                // ['email' => 'getrommy@yahoo.com', 'data' => ['name' => 'Oroma Chigbo', 'dept' => 'Hospitality', 'co_members' => $this->co_hosp, 'co_early' => $this->earl_hosp, 'co_late' => $this->late_hosp, 'co_absent' => $this->abs_hosp, 'link' => url('/attendance/report/Hospitality/' . $this->date), 'date' => $this->date]],
                ['email' => 'just_ine2002@yahoo.com', 'data' => ['name' => 'Justin Masi', 'dept' => 'Host & Hostess', 'co_members' => $this->co_hnh, 'co_early' => $this->earl_hnh, 'co_late' => $this->late_hnh, 'co_absent' => $this->abs_hnh, 'link' => url('/attendance/report/Host & Hostess/' . $this->date), 'date' => $this->date]],
                ['email' => 'afagunjade@gmail.com', 'data' => ['name' => 'Ayoola Fagunjade', 'dept' => 'Partnership', 'co_members' => $this->co_partner, 'co_early' => $this->earl_partner, 'co_late' => $this->late_partner, 'co_absent' => $this->abs_partner, 'link' => url('/attendance/report/Partnership/' . $this->date), 'date' => $this->date]],
                ['email' => 'akinpeluakinyinka@gmail.com', 'data' => ['name' => 'Akinyinka Akinpelu', 'dept' => 'Pastoral Care', 'co_members' => $this->co_pcu, 'co_early' => $this->earl_pcu, 'co_late' => $this->late_pcu, 'co_absent' => $this->abs_pcu, 'link' => url('/attendance/report/Pastoral Care/' . $this->date), 'date' => $this->date]],
                ['email' => 'sheldonnwosu@gmail.com', 'data' => ['name' => 'Sheldon Nwosu', 'dept' => 'Public Relations', 'co_members' => $this->co_pru, 'co_early' => $this->earl_pru, 'co_late' => $this->late_pru, 'co_absent' => $this->abs_pru, 'link' => url('/attendance/report/Public Relations/' . $this->date), 'date' => $this->date]],
                ['email' => 'omoalu@outlook.com', 'data' => ['name' => 'Omodolapo Alu', 'dept' => 'M & E', 'co_members' => $this->co_mne, 'co_early' => $this->earl_mne, 'co_late' => $this->late_mne, 'co_absent' => $this->abs_mne, 'link' => url('/attendance/report/M & E/' . $this->date), 'date' => $this->date]],
                ['email' => 'victoranyanwu04@gmail.com', 'data' => ['name' => 'Victor Anyanwu', 'dept' => 'Sound', 'co_members' => $this->co_sound, 'co_early' => $this->earl_sound, 'co_late' => $this->late_sound, 'co_absent' => $this->abs_sound, 'link' => url('/attendance/report/Sound/' . $this->date), 'date' => $this->date]],
                ['email' => 'nneka.enang@yahoo.com', 'data' => ['name' => 'Nneka Enang', 'dept' => 'Outreach', 'co_members' => $this->co_outreach, 'co_early' => $this->earl_outreach, 'co_late' => $this->late_outreach, 'co_absent' => $this->abs_outreach, 'link' => url('/attendance/report/Outreach/' . $this->date), 'date' => $this->date]],
                ['email' => 'idongenang@gmail.com', 'data' => ['name' => 'Idongesit Enang', 'dept' => 'New Convert', 'co_members' => $this->co_newco, 'co_early' => $this->earl_newco, 'co_late' => $this->late_newco, 'co_absent' => $this->abs_newco, 'link' => url('/attendance/report/New Convert/' . $this->date), 'date' => $this->date]],
                ['email' => 'leoativie@yahoo.com', 'data' => ['name' => 'Leo Ativie', 'dept' => 'Traffic & Security', 'co_members' => $this->co_ts, 'co_early' => $this->earl_ts, 'co_late' => $this->late_ts, 'co_absent' => $this->abs_ts, 'link' => url('/attendance/report/Traffic & Security/' . $this->date), 'date' => $this->date]],
                ['email' => 'ujuobi44@hotmail.com', 'data' => ['name' => 'Obianuju Ukwuoma', 'dept' => 'Ushering', 'co_members' => $this->co_usher, 'co_early' => $this->earl_usher, 'co_late' => $this->late_usher, 'co_absent' => $this->abs_usher, 'link' => url('/attendance/report/Ushering/' . $this->date), 'date' => $this->date]],
                ['email' => 'ifeomagbemudu@gmail.com', 'data' => ['name' => 'Ifeoma Nkem-Gbemudu', 'dept' => 'Witty', 'co_members' => $this->co_witty, 'co_early' => $this->earl_witty, 'co_late' => $this->late_witty, 'co_absent' => $this->abs_witty, 'link' => url('/attendance/report/Witty/' . $this->date), 'date' => $this->date]],
                ['email' => 'chineloihuoma.nnadi@gmail.com', 'data' => ['name' => 'Chinelo Ihuoma', 'dept' => 'Word Factory', 'co_members' => $this->co_wf, 'co_early' => $this->earl_wf, 'co_late' => $this->late_wf, 'co_absent' => $this->abs_wf, 'link' => url('/attendance/report/Word Factory/' . $this->date), 'date' => $this->date]],
                ['email' => 'janfetekservices@gmail.com', 'data' => ['name' => 'Nwoko-omere Ifeoma', 'dept' => 'Sparkles', 'co_members' => $this->co_spark, 'co_early' => $this->earl_spark, 'co_late' => $this->late_spark, 'co_absent' => $this->abs_spark, 'link' => url('/attendance/report/Sparkles/' . $this->date), 'date' => $this->date]],
                ['email' => 'leoativie@yahoo.com', 'data' => ['name' => 'Leo Ativie', 'dept' => 'Protocol', 'co_members' => $this->co_pro, 'co_early' => $this->earl_pro, 'co_late' => $this->late_pro, 'co_absent' => $this->abs_pro, 'link' => url('/attendance/report/Protocol/' . $this->date), 'date' => $this->date]],

            ];
            foreach ($deptBodys as $deptBody) {
                Mail::to($deptBody['email'])
                    ->queue(new DeptReport($deptBody['data']));
            }
            $this->emit('alert', ['type' => 'success', 'message' => 'Mail sent successfully.']);
        }
    }
    public function render()
    {
        return view('livewire.dashboard-component')->layout('layouts.base');
    }
}
