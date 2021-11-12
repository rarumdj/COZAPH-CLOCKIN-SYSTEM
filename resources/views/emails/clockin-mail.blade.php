@component('mail::message')
<div class="mb-5 w-100 text-center">
    <h1>Dear, {{ $body['name'] }}</h1>
    <p>Clockin activity {{ $body['date'] }}.</p>
</div>

<div class="p-5 text-center">
    @component('mail::panel')
    <p>Clockin ID: {{ $body['user_id'] }}</p>
    @endcomponent
</div>
<div class="p-5 text-center">
    @component('mail::panel')
    <p>Call Time: {{ $body['calltime'] }}</p>
    @endcomponent
</div>
<div class="p-5 text-center">
    @component('mail::panel')
    <p>Time in: {{ $body['time'] }}</p>
    @endcomponent
</div>
<div class="p-5 text-center">
    @component('mail::panel')
    <p>Status: {{ $body['status'] }}</p>
    @endcomponent
</div>
Thanks and Regards!<br>
{{ config('app.name') }}<br>
COZA Admin.
@endcomponent