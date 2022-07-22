@component('mail::message')
<div class="mb-5 w-100 text-center">
    <h1>Hello {{$body['name']}},</h1>
    <p>Your registration was successfull! Below is your REG ID for clockin.</p>
</div>

<div class="p-5 text-center">
    @component('mail::panel')
    {{ $body['user_id'] }}
    @endcomponent
</div>
Thanks and Regards!<br>
{{ config('app.name') }}<br>
{{ config('app.name') }} Admin.
@endcomponent
