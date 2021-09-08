@component('mail::message')
<div class="mb-5 w-100 text-center">
    <h1>Good Day sir,</h1>
    <p>Please find below details of service report from {{ $body['date'] }}.</p>
</div>

<div class="p-5 text-center">
    @component('mail::panel')
    <p>Total Workers: {{ $body['co_members'] }}</p>
    @endcomponent
</div>
<div class="p-5 text-center">
    @component('mail::panel')
    <p>Present (Early): {{ $body['co_early'] }}</p>
    @endcomponent
</div>
<div class="p-5 text-center">
    @component('mail::panel')
    <p>Present (Late): {{ $body['co_late'] }}</p>
    @endcomponent
</div>
<div class="p-5 text-center">
    @component('mail::panel')
    <p>Absent: {{ $body['co_absent'] }}</p>
    @endcomponent
</div>
Thanks and Regards!<br>
{{ config('app.name') }}<br>
COZA Admin.
@endcomponent