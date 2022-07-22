@component('mail::message')
<div class="mb-5 w-100 text-center">
    <h1>Dear {{$body['name']}},</h1>
    <p>Your registration was successfull! Below is your email and password.</p>
</div>

<div class="p-5 text-center">
    @component('mail::panel')
    <p>Email: {{ $body['email'] }} </p>
    @endcomponent
    @component('mail::panel')
    <p>Password: {{ $body['password'] }} </p>
    @endcomponent
</div>
Thanks and Regards!<br>
{{ config('app.name') }}<br>
{{ config('app.name') }} Admin.
@endcomponent
