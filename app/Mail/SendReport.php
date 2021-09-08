<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendReport extends Mailable
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
        if ($this->body['type'] == 'dashboard') {
            return $this->subject('COZAPH Workforce Report(' . $this->body['date'] . ')')->markdown('emails.report-mail', ['body' => $this->body]);
        } elseif ($this->body['type'] == 'clockin') {
            return $this->subject('COZAPH Workforce Clockin Report(' . $this->body['date'] . ')')->markdown('emails.clockin-mail', ['body' => $this->body]);
        }
    }
}
