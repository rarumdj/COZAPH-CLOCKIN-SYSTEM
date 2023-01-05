<?php

namespace App\Http\Livewire;

use App\Mail\DeptReport;
use App\Mail\SendReport;
use App\Models\Attendance;
use App\Models\Worker;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Livewire\Component;

class DatedDashboardComponent extends Component
{
    public $co_early;
    public $earl_aval;
    public $earl_admin;
    public $earl_alMan;
    public $earl_welfare;
    public $earl_cts;
    public $earl_childc;
    public $earl_deco;
    public $earl_drama;
    public $earl_media;
    public $earl_hosp;
    public $earl_hnh;
    public $earl_partner;
    public $earl_pru;
    public $earl_pcu;
    public $earl_mne;
    public $earl_sound;
    public $earl_outreach;
    public $earl_newco;
    public $earl_ts;
    public $earl_usher;
    public $earl_witty;
    public $earl_wf;
    public $earl_spark;
    public $earl_pro;
    public $co_late;
    public $late_aval;
    public $late_admin;
    public $late_alMan;
    public $late_welfare;
    public $late_cts;
    public $late_childc;
    public $late_deco;
    public $late_drama;
    public $late_media;
    public $late_hosp;
    public $late_hnh;
    public $late_partner;
    public $late_pru;
    public $late_pcu;
    public $late_mne;
    public $late_sound;
    public $late_outreach;
    public $late_newco;
    public $late_ts;
    public $late_usher;
    public $late_witty;
    public $late_wf;
    public $late_spark;
    public $late_pro;
    public $co_absent;
    public $abs_aval;
    public $abs_admin;
    public $abs_alMan;
    public $abs_welfare;
    public $abs_cts;
    public $abs_childc;
    public $abs_deco;
    public $abs_drama;
    public $abs_media;
    public $abs_hosp;
    public $abs_hnh;
    public $abs_partner;
    public $abs_pru;
    public $abs_pcu;
    public $abs_mne;
    public $abs_sound;
    public $abs_outreach;
    public $abs_newco;
    public $abs_ts;
    public $abs_usher;
    public $abs_witty;
    public $abs_wf;
    public $abs_spark;
    public $abs_pro;
    public $co_members;
    public $co_aval;
    public $co_admin;
    public $co_alMan;
    public $co_welfare;
    public $co_cts;
    public $co_childc;
    public $co_deco;
    public $co_drama;
    public $co_media;
    public $co_hosp;
    public $co_hnh;
    public $co_partner;
    public $co_pru;
    public $co_pcu;
    public $co_mne;
    public $co_sound;
    public $co_outreach;
    public $co_newco;
    public $co_ts;
    public $co_usher;
    public $co_witty;
    public $co_wf;
    public $co_spark;
    public $co_pro;
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
        $this->co_welfare = Worker::where('department', 'Welfare')->count();
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
        $this->co_light = Worker::where('department', 'Light')->count();
        $this->co_how = Worker::where('department', 'Head of Workforce')->count();
        $this->co_qc = Worker::where('department', 'Quality Control')->count();
        $this->co_intern = Worker::where('department', 'Internship')->count();
        $this->co_photismos = Worker::where('department', 'Photismos')->count();
        $this->co_special_duties = Worker::where('department', 'Special Duties')->count();

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

            $this->earl_welfare = Attendance::where('department', 'Welfare')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_welfare = Attendance::where('department', 'Welfare')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_welfare = Attendance::where('department', 'Welfare')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

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

            $this->earl_light = Attendance::where('department', 'Light')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_light = Attendance::where('department', 'Light')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_light = Attendance::where('department', 'Light')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_qc = Attendance::where('department', 'Quality Control')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_qc = Attendance::where('department', 'Quality Control')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_qc = Attendance::where('department', 'Quality Control')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_how = Attendance::where('department', 'Head of Workforce')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_how = Attendance::where('department', 'Head of Workforce')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_how = Attendance::where('department', 'Head of Workforce')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_intern= Attendance::where('department', 'Internship')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_intern = Attendance::where('department', 'Internship')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_intern = Attendance::where('department', 'Internship')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_photismos= Attendance::where('department', 'Photismos')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_photismos = Attendance::where('department', 'Photismos')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_photismos = Attendance::where('department', 'Photismos')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            $this->earl_special_duties= Attendance::where('department', 'Special Duties')->where('status', 'Early')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->late_special_duties = Attendance::where('department', 'Special Duties')->where('status', 'Late')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();
            $this->abs_special_duties = Attendance::where('department', 'Special Duties')->where('status', 'Absent')->where('created_at', 'LIKE', '%' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d') . '%')->count();

            
        ///////////////////////////////
        } elseif ($this->date) {
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

            $this->earl_welfare = Attendance::where('department', 'Welfare')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_welfare = Attendance::where('department', 'Welfare')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_welfare = Attendance::where('department', 'Welfare')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

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

            $this->earl_light = Attendance::where('department', 'Light')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_light = Attendance::where('department', 'Light')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_light = Attendance::where('department', 'Light')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_qc = Attendance::where('department', 'Quality Control')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_qc = Attendance::where('department', 'Quality Control')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_qc = Attendance::where('department', 'Quality Control')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_how = Attendance::where('department', 'Head of Workforce')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_how = Attendance::where('department', 'Head of Workforce')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_how = Attendance::where('department', 'Head of Workforce')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_intern = Attendance::where('department', 'Internship')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_intern = Attendance::where('department', 'Internship')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_intern = Attendance::where('department', 'Internship')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_photismos = Attendance::where('department', 'Photismos')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_photismos = Attendance::where('department', 'Photismos')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_photismos = Attendance::where('department', 'Photismos')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

            $this->earl_special_duties = Attendance::where('department', 'Special Duties')->where('status', 'Early')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->late_special_duties = Attendance::where('department', 'Special Duties')->where('status', 'Late')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();
            $this->abs_special_duties = Attendance::where('department', 'Special Duties')->where('status', 'Absent')->where('created_at', 'LIKE', '%' .  $this->date . '%')->count();

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

            Mail::to('cozacorporateph@gmail.com')
                ->cc('nneomaudeariry@gmail.com')
                ->bcc('davemoses3@gmail.com')
                ->queue(new SendReport($body));

            $deptBodys = [
                ['email' => 'ireoluwasoetan@gmail.com', 'data' => ['name' => 'Ireoluwa Soetan', 'dept' => 'Avalanche', 'co_members' => $this->co_aval, 'co_early' => $this->earl_aval, 'co_late' => $this->late_aval, 'co_absent' => $this->abs_aval, 'link' => url('/attendance/report/Avalanche/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'davemoses3@gmail.com', 'data' => ['name' => 'David Johnson', 'dept' => 'Admin', 'co_members' => $this->co_admin, 'co_early' => $this->earl_admin, 'co_late' => $this->late_admin, 'co_absent' => $this->abs_admin, 'link' => url('/attendance/report/Admin/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'mobbbikpd@gmail.com', 'data' => ['name' => 'Amobi Nwankwo', 'dept' => 'Altar Management', 'co_members' => $this->co_alMan, 'co_early' => $this->earl_alMan, 'co_late' => $this->late_alMan, 'co_absent' => $this->abs_alMan, 'link' => url('/attendance/report/Altar Management/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'joycebong2012@gmail.com ', 'data' => ['name' => 'Joyce Ebong', 'dept' => 'Welfare', 'co_members' => $this->co_welfare, 'co_early' => $this->earl_welfare, 'co_late' => $this->late_welfare, 'co_absent' => $this->abs_welfare, 'link' => url('/attendance/report/Welfare/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'otisichidinma@gmail.com', 'data' => ['name' => 'Chidinma Joseph', 'dept' => 'COZA Transfer Service', 'co_members' => $this->co_cts, 'co_early' => $this->earl_cts, 'co_late' => $this->late_cts, 'co_absent' => $this->abs_cts, 'link' => url('/attendance/report/COZA Transfer Service/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'robertihuoma@gmail.com', 'data' => ['name' => 'Robert Ihuoma', 'dept' => 'Child Care', 'co_members' => $this->co_childc, 'co_early' => $this->earl_childc, 'co_late' => $this->late_childc, 'co_absent' => $this->abs_childc, 'link' => url('/attendance/report/Child Care/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                // ['email' => 'kalio.winifred@gmail.com', 'data' => ['name' => 'Freeman Kalio Winifred', 'dept' => 'Decoration', 'co_members' => $this->co_deco, 'co_early' => $this->earl_deco, 'co_late' => $this->late_deco, 'co_absent' => $this->abs_deco, 'link' => url('/attendance/report/Decoration/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'akinpeluakinyinka@gmail.com', 'data' => ['name' => 'Akinyinka Akinpelu', 'dept' => 'Internship', 'co_members' => $this->co_intern, 'co_early' => $this->earl_intern            , 'co_late' => $this->late_intern, 'co_absent' => $this->abs_intern, 'link' => url('/attendance/report/Internship/' . $this->date), 'date' => $this->date]],
                // ['email' => 'auntymma123@gmail.com', 'data' => ['name' => 'Emily Clarkson', 'dept' => 'Drama', 'co_members' => $this->co_drama, 'co_early' => $this->earl_drama, 'co_late' => $this->late_drama, 'co_absent' => $this->abs_drama, 'link' => url('/attendance/report/Drama/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'leoativie@yahoo.com', 'data' => ['name' => 'Leo Ativie', 'dept' => 'Media', 'co_members' => $this->co_media, 'co_early' => $this->earl_media, 'co_late' => $this->late_media, 'co_absent' => $this->abs_media, 'link' => url('/attendance/report/Media/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                // ['email' => 'getrommy@yahoo.com', 'data' => ['name' => 'Oroma Chigbo', 'dept' => 'Hospitality', 'co_members' => $this->co_hosp, 'co_early' => $this->earl_hosp, 'co_late' => $this->late_hosp, 'co_absent' => $this->abs_hosp, 'link' => url('/attendance/report/Hospitality/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'edokaabel@gmail.com', 'data' => ['name' => 'Abel Edoka', 'dept' => 'Host & Hostess', 'co_members' => $this->co_hnh, 'co_early' => $this->earl_hnh, 'co_late' => $this->late_hnh, 'co_absent' => $this->abs_hnh, 'link' => url('/attendance/report/Host & Hostess/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'nneka.enang@yahoo.com', 'data' => ['name' => 'Nneka Enang', 'dept' => 'Partnership', 'co_members' => $this->co_partner, 'co_early' => $this->earl_partner, 'co_late' => $this->late_partner, 'co_absent' => $this->abs_partner, 'link' => url('/attendance/report/Partnership/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'nneka.enang@yahoo.com', 'data' => ['name' => 'Nneka Enang', 'dept' => 'Quality Control', 'co_members' => $this->co_qc, 'co_early' => $this->earl_qc, 'co_late' => $this->late_qc, 'co_absent' => $this->abs_qc, 'link' => url('/attendance/report/Quality Control/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'modupeativie@gmail.com', 'data' => ['name' => 'Modupe Ativie', 'dept' => 'Pastoral Care', 'co_members' => $this->co_pcu, 'co_early' => $this->earl_pcu, 'co_late' => $this->late_pcu, 'co_absent' => $this->abs_pcu, 'link' => url('/attendance/report/Pastoral Care/' . $this->date), 'date' => $this->date]],
                ['email' => 'just_ine2002@yahoo.com', 'data' => ['name' => 'Justin Masi', 'dept' => 'Public Relations', 'co_members' => $this->co_pru, 'co_early' => $this->earl_pru, 'co_late' => $this->late_pru, 'co_absent' => $this->abs_pru, 'link' => url('/attendance/report/Public Relations/' . $this->date), 'date' => $this->date]],
                ['email' => 'nneomaudeariry@gmail.com', 'data' => ['name' => 'Nneoma Ekeh', 'dept' => 'M & E', 'co_members' => $this->co_mne, 'co_early' => $this->earl_mne, 'co_late' => $this->late_mne, 'co_absent' => $this->abs_mne, 'link' => url('/attendance/report/M & E/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'victoranyanwu04@gmail.com', 'data' => ['name' => 'Victor Anyanwu', 'dept' => 'Sound', 'co_members' => $this->co_sound, 'co_early' => $this->earl_sound, 'co_late' => $this->late_sound, 'co_absent' => $this->abs_sound, 'link' => url('/attendance/report/Sound/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                // ['email' => 'nneka.enang@yahoo.com', 'data' => ['name' => 'Nneka Enang', 'dept' => 'Outreach', 'co_members' => $this->co_outreach, 'co_early' => $this->earl_outreach, 'co_late' => $this->late_outreach, 'co_absent' => $this->abs_outreach, 'link' => url('/attendance/report/Outreach/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                // ['email' => 'idongenang@gmail.com', 'data' => ['name' => 'Idongesit Enang', 'dept' => 'New Convert', 'co_members' => $this->co_newco, 'co_early' => $this->earl_newco, 'co_late' => $this->late_newco, 'co_absent' => $this->abs_newco, 'link' => url('/attendance/report/New Convert/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'fynceejay@gmail.com', 'data' => ['name' => 'Sunny Jacob', 'dept' => 'Traffic & Security', 'co_members' => $this->co_ts, 'co_early' => $this->earl_ts, 'co_late' => $this->late_ts, 'co_absent' => $this->abs_ts, 'link' => url('/attendance/report/Traffic & Security/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'sofiri.ezekiel.hart@gmail.com ', 'data' => ['name' => 'Sofiri Ezekiel-Hart', 'dept' => 'Ushering', 'co_members' => $this->co_usher, 'co_early' => $this->earl_usher, 'co_late' => $this->late_usher, 'co_absent' => $this->abs_usher, 'link' => url('/attendance/report/Ushering/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'aludolapo@gmail.com', 'data' => ['name' => 'Omodolapo Alu', 'dept' => 'Witty', 'co_members' => $this->co_witty, 'co_early' => $this->earl_witty, 'co_late' => $this->late_witty, 'co_absent' => $this->abs_witty, 'link' => url('/attendance/report/Witty/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'auntymma123@gmail.com', 'data' => ['name' => 'Emily Clarkson', 'dept' => 'Word Factory', 'co_members' => $this->co_wf, 'co_early' => $this->earl_wf, 'co_late' => $this->late_wf, 'co_absent' => $this->abs_wf, 'link' => url('/attendance/report/Word Factory/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'janfetekservices@gmail.com', 'data' => ['name' => 'Nwoko-omere Ifeoma', 'dept' => 'Sparkles', 'co_members' => $this->co_spark, 'co_early' => $this->earl_spark, 'co_late' => $this->late_spark, 'co_absent' => $this->abs_spark, 'link' => url('/attendance/report/Sparkles/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'afagunjade@gmail.com', 'data' => ['name' => 'Ayo Fagunjade', 'dept' => 'Protocol', 'co_members' => $this->co_pro, 'co_early' => $this->earl_pro, 'co_late' => $this->late_pro, 'co_absent' => $this->abs_pro, 'link' => url('/attendance/report/Protocol/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'sopsco@yahoo.com', 'data' => ['name' => 'Kelvin Ekeh', 'dept' => 'Special Duties', 'co_members' => $this->co_special_duties, 'co_early' => $this->earl_special_duties, 'co_late' => $this->late_special_duties, 'co_absent' => $this->abs_special_duties, 'link' => url('/attendance/report/Special Duties/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'chineloihuoma.nnadi@gmail.com', 'data' => ['name' => 'Chinelo Ihuoma', 'dept' => 'Photismos', 'co_members' => $this->co_photismos, 'co_early' => $this->earl_photismos, 'co_late' => $this->late_photismos, 'co_absent' => $this->abs_photismos, 'link' => url('/attendance/report/Photismos/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                ['email' => 'nneomaudeariry@gmail.com', 'data' => ['name' => 'Nneoma Ekeh', 'dept' => 'Light', 'co_members' => $this->co_light, 'co_early' => $this->earl_light, 'co_late' => $this->late_light, 'co_absent' => $this->abs_light, 'link' => url('/attendance/report/Light/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],

            ];
            foreach ($deptBodys as $deptBody) {
                Mail::to($deptBody['email'])
                    ->queue(new DeptReport($deptBody['data']));
            }
            $this->emit('alert', ['type' => 'success', 'message' => 'Mail sent successfully.']);
        } elseif ($this->date) {
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

            Mail::to('cozacorporateph@gmail.com')
                ->cc('nneomaudeariry@gmail.com')
                ->bcc('davemoses3@gmail.com')
                ->queue(new SendReport($body));

                $deptBodys = [
                    ['email' => 'ireoluwasoetan@gmail.com', 'data' => ['name' => 'Ireoluwa Soetan', 'dept' => 'Avalanche', 'co_members' => $this->co_aval, 'co_early' => $this->earl_aval, 'co_late' => $this->late_aval, 'co_absent' => $this->abs_aval, 'link' => url('/attendance/report/Avalanche/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'davemoses3@gmail.com', 'data' => ['name' => 'David Johnson', 'dept' => 'Admin', 'co_members' => $this->co_admin, 'co_early' => $this->earl_admin, 'co_late' => $this->late_admin, 'co_absent' => $this->abs_admin, 'link' => url('/attendance/report/Admin/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'mobbbikpd@gmail.com', 'data' => ['name' => 'Amobi Nwankwo', 'dept' => 'Altar Management', 'co_members' => $this->co_alMan, 'co_early' => $this->earl_alMan, 'co_late' => $this->late_alMan, 'co_absent' => $this->abs_alMan, 'link' => url('/attendance/report/Altar Management/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'joycebong2012@gmail.com ', 'data' => ['name' => 'Joyce Ebong', 'dept' => 'Welfare', 'co_members' => $this->co_welfare, 'co_early' => $this->earl_welfare, 'co_late' => $this->late_welfare, 'co_absent' => $this->abs_welfare, 'link' => url('/attendance/report/Welfare/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'otisichidinma@gmail.com', 'data' => ['name' => 'Chidinma Joseph', 'dept' => 'COZA Transfer Service', 'co_members' => $this->co_cts, 'co_early' => $this->earl_cts, 'co_late' => $this->late_cts, 'co_absent' => $this->abs_cts, 'link' => url('/attendance/report/COZA Transfer Service/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'robertihuoma@gmail.com', 'data' => ['name' => 'Robert Ihuoma', 'dept' => 'Child Care', 'co_members' => $this->co_childc, 'co_early' => $this->earl_childc, 'co_late' => $this->late_childc, 'co_absent' => $this->abs_childc, 'link' => url('/attendance/report/Child Care/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    // ['email' => 'kalio.winifred@gmail.com', 'data' => ['name' => 'Freeman Kalio Winifred', 'dept' => 'Decoration', 'co_members' => $this->co_deco, 'co_early' => $this->earl_deco, 'co_late' => $this->late_deco, 'co_absent' => $this->abs_deco, 'link' => url('/attendance/report/Decoration/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'akinpeluakinyinka@gmail.com', 'data' => ['name' => 'Akinyinka Akinpelu', 'dept' => 'Internship', 'co_members' => $this->co_intern, 'co_early' => $this->earl_intern            , 'co_late' => $this->late_intern, 'co_absent' => $this->abs_intern, 'link' => url('/attendance/report/Internship/' . $this->date), 'date' => $this->date]],
                    // ['email' => 'auntymma123@gmail.com', 'data' => ['name' => 'Emily Clarkson', 'dept' => 'Drama', 'co_members' => $this->co_drama, 'co_early' => $this->earl_drama, 'co_late' => $this->late_drama, 'co_absent' => $this->abs_drama, 'link' => url('/attendance/report/Drama/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'leoativie@yahoo.com', 'data' => ['name' => 'Leo Ativie', 'dept' => 'Media', 'co_members' => $this->co_media, 'co_early' => $this->earl_media, 'co_late' => $this->late_media, 'co_absent' => $this->abs_media, 'link' => url('/attendance/report/Media/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    // ['email' => 'getrommy@yahoo.com', 'data' => ['name' => 'Oroma Chigbo', 'dept' => 'Hospitality', 'co_members' => $this->co_hosp, 'co_early' => $this->earl_hosp, 'co_late' => $this->late_hosp, 'co_absent' => $this->abs_hosp, 'link' => url('/attendance/report/Hospitality/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'edokaabel@gmail.com', 'data' => ['name' => 'Abel Edoka', 'dept' => 'Host & Hostess', 'co_members' => $this->co_hnh, 'co_early' => $this->earl_hnh, 'co_late' => $this->late_hnh, 'co_absent' => $this->abs_hnh, 'link' => url('/attendance/report/Host & Hostess/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'nneka.enang@yahoo.com', 'data' => ['name' => 'Nneka Enang', 'dept' => 'Partnership', 'co_members' => $this->co_partner, 'co_early' => $this->earl_partner, 'co_late' => $this->late_partner, 'co_absent' => $this->abs_partner, 'link' => url('/attendance/report/Partnership/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'nneka.enang@yahoo.com', 'data' => ['name' => 'Nneka Enang', 'dept' => 'Quality Control', 'co_members' => $this->co_qc, 'co_early' => $this->earl_qc, 'co_late' => $this->late_qc, 'co_absent' => $this->abs_qc, 'link' => url('/attendance/report/Quality Control/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'modupeativie@gmail.com', 'data' => ['name' => 'Modupe Ativie', 'dept' => 'Pastoral Care', 'co_members' => $this->co_pcu, 'co_early' => $this->earl_pcu, 'co_late' => $this->late_pcu, 'co_absent' => $this->abs_pcu, 'link' => url('/attendance/report/Pastoral Care/' . $this->date), 'date' => $this->date]],
                    ['email' => 'just_ine2002@yahoo.com', 'data' => ['name' => 'Justin Masi', 'dept' => 'Public Relations', 'co_members' => $this->co_pru, 'co_early' => $this->earl_pru, 'co_late' => $this->late_pru, 'co_absent' => $this->abs_pru, 'link' => url('/attendance/report/Public Relations/' . $this->date), 'date' => $this->date]],
                    ['email' => 'nneomaudeariry@gmail.com', 'data' => ['name' => 'Nneoma Ekeh', 'dept' => 'M & E', 'co_members' => $this->co_mne, 'co_early' => $this->earl_mne, 'co_late' => $this->late_mne, 'co_absent' => $this->abs_mne, 'link' => url('/attendance/report/M & E/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'victoranyanwu04@gmail.com', 'data' => ['name' => 'Victor Anyanwu', 'dept' => 'Sound', 'co_members' => $this->co_sound, 'co_early' => $this->earl_sound, 'co_late' => $this->late_sound, 'co_absent' => $this->abs_sound, 'link' => url('/attendance/report/Sound/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    // ['email' => 'nneka.enang@yahoo.com', 'data' => ['name' => 'Nneka Enang', 'dept' => 'Outreach', 'co_members' => $this->co_outreach, 'co_early' => $this->earl_outreach, 'co_late' => $this->late_outreach, 'co_absent' => $this->abs_outreach, 'link' => url('/attendance/report/Outreach/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    // ['email' => 'idongenang@gmail.com', 'data' => ['name' => 'Idongesit Enang', 'dept' => 'New Convert', 'co_members' => $this->co_newco, 'co_early' => $this->earl_newco, 'co_late' => $this->late_newco, 'co_absent' => $this->abs_newco, 'link' => url('/attendance/report/New Convert/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'fynceejay@gmail.com', 'data' => ['name' => 'Sunny Jacob', 'dept' => 'Traffic & Security', 'co_members' => $this->co_ts, 'co_early' => $this->earl_ts, 'co_late' => $this->late_ts, 'co_absent' => $this->abs_ts, 'link' => url('/attendance/report/Traffic & Security/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'sofiri.ezekiel.hart@gmail.com ', 'data' => ['name' => 'Sofiri Ezekiel-Hart', 'dept' => 'Ushering', 'co_members' => $this->co_usher, 'co_early' => $this->earl_usher, 'co_late' => $this->late_usher, 'co_absent' => $this->abs_usher, 'link' => url('/attendance/report/Ushering/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'aludolapo@gmail.com', 'data' => ['name' => 'Omodolapo Alu', 'dept' => 'Witty', 'co_members' => $this->co_witty, 'co_early' => $this->earl_witty, 'co_late' => $this->late_witty, 'co_absent' => $this->abs_witty, 'link' => url('/attendance/report/Witty/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'auntymma123@gmail.com', 'data' => ['name' => 'Emily Clarkson', 'dept' => 'Word Factory', 'co_members' => $this->co_wf, 'co_early' => $this->earl_wf, 'co_late' => $this->late_wf, 'co_absent' => $this->abs_wf, 'link' => url('/attendance/report/Word Factory/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'janfetekservices@gmail.com', 'data' => ['name' => 'Nwoko-omere Ifeoma', 'dept' => 'Sparkles', 'co_members' => $this->co_spark, 'co_early' => $this->earl_spark, 'co_late' => $this->late_spark, 'co_absent' => $this->abs_spark, 'link' => url('/attendance/report/Sparkles/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'afagunjade@gmail.com', 'data' => ['name' => 'Ayo Fagunjade', 'dept' => 'Protocol', 'co_members' => $this->co_pro, 'co_early' => $this->earl_pro, 'co_late' => $this->late_pro, 'co_absent' => $this->abs_pro, 'link' => url('/attendance/report/Protocol/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'sopsco@yahoo.com', 'data' => ['name' => 'Kelvin Ekeh', 'dept' => 'Special Duties', 'co_members' => $this->co_special_duties, 'co_early' => $this->earl_special_duties, 'co_late' => $this->late_special_duties, 'co_absent' => $this->abs_special_duties, 'link' => url('/attendance/report/Special Duties/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'chineloihuoma.nnadi@gmail.com', 'data' => ['name' => 'Chinelo Ihuoma', 'dept' => 'Photismos', 'co_members' => $this->co_photismos, 'co_early' => $this->earl_photismos, 'co_late' => $this->late_photismos, 'co_absent' => $this->abs_photismos, 'link' => url('/attendance/report/Photismos/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
                    ['email' => 'nneomaudeariry@gmail.com', 'data' => ['name' => 'Nneoma Ekeh', 'dept' => 'Light', 'co_members' => $this->co_light, 'co_early' => $this->earl_light, 'co_late' => $this->late_light, 'co_absent' => $this->abs_light, 'link' => url('/attendance/report/Light/' . Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')), 'date' => Carbon::createFromFormat('Y-m-d H:i:s', $this->oldDate)->format('Y-m-d')]],
    
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
        return view('livewire.dated-dashboard-component')->layout('layouts.base');
    }
}
