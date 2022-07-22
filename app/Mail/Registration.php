<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class Registration extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $body;
    public function __construct($body)
    {
        $this->body = $body;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        if ($this->body['type'] == 'worker') {
            return $this->subject(config('app.name').' Workforce Registration')->markdown('emails.registration-mail', ['body' => $this->body]);
        } elseif ($this->body['type'] == 'admin') {
            return $this->subject(config('app.name').'  Workforce Admin')->markdown('emails.admin-mail', ['body' => $this->body]);
        }
    }
}
