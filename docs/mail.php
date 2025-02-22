<?php

$to = 'contact@maniartech.com';

// Initialize variables
$name     = trim($_POST['name']);
$phone    = trim($_POST['phone']);
$email    = trim($_POST['email']);
$message  = trim($_POST['message']);
$subject  = trim($_POST['subject']);

// Validate form fields
if ($name == "") {
    $msg['err'] = "\n Name can not be empty!";
    $msg['field'] = "name";
    $msg['code'] = FALSE;
} else if ($phone == "") {
    $msg['err'] = "\n Phone number can not be empty!";
    $msg['field'] = "phone";
    $msg['code'] = FALSE;
} else if (!preg_match("/^[0-9 \\-\\+]{4,17}$/i", trim($phone))) {
    $msg['err'] = "\n Please put a valid phone number!";
    $msg['field'] = "phone";
    $msg['code'] = FALSE;
} else if ($email == "") {
    $msg['err'] = "\n Email can not be empty!";
    $msg['field'] = "email";
    $msg['code'] = FALSE;
} else if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    $msg['err'] = "\n Please put a valid email address!";
    $msg['field'] = "email";
    $msg['code'] = FALSE;
} else if ($subject == "") {
    $msg['err'] = "\n Subject can not be empty!";
    $msg['field'] = "subject";
    $msg['code'] = FALSE;
} else if ($message == "") {
    $msg['err'] = "\n Message can not be empty!";
    $msg['field'] = "message";
    $msg['code'] = FALSE;
} else {
    $_message = '<html><head></head><body>';
    $_message .= '<p>Name: '    . $name     . '</p>';
    $_message .= '<p>Message: ' . $phone    . '</p>';
    $_message .= '<p>Email: '   . $email    . '</p>';
    $_message .= '<p>Subject: ' . $subject  . '</p>';
    $_message .= '<p>Message: ' . $message  . '</p>';
    $_message .= '</body></html>';

    $headers = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From:  ManiarTech Contact ' . $name . ' <' . $email . '>' . "\r\n";
        $headers .= 'cc: aamir.maniar@maniartech.com' . "\r\n";
    $headers .= 'bcc: nomaan.maniar@maniartech.com' . "\r\n";

    mail($to, $subject, $_message, $headers, '-f contact@maniartech.com');

    $msg['success'] = "\n Email has been sent successfully.";
    $msg['code'] = TRUE;
}
echo json_encode($msg);