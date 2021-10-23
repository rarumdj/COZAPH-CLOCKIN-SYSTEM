<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DeptReport extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $deptBody;
    public function __construct($deptBody)
    {
        $this->deptBody = $deptBody;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('COZAPH Workforce ' . $this->deptBody['dept'] . ' Report(' . $this->deptBody['date'] . ')')->markdown('emails.dept-report-mail', ['body' => $this->deptBody]);
    }
}
