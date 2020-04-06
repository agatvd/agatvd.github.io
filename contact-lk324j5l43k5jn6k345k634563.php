<?php
/**
 * Created by PhpStorm.
 * User: b3ndr
 * Date: 21/02/16
 * Time: 03:03
 */
ob_start();

$value = array();
//if (isset($_POST['contact-form-submit']) && $_POST['email']) {
if ($_POST['email'] && $_POST['name']) {
    if (!filter_var($_POST['email'] , FILTER_VALIDATE_EMAIL)) {
        die(json_encode(array('error' => "Адрес почты<br/> введён неверно", 'reason' => 'email')));
    }

    $value["email"] = $_POST['email'] ? $_POST['email'] : NULL;
    $value["name"] .= $_POST['name'] ? " ".$_POST['name'] : NULL;
    $value["phone"] = $_POST['phone'] ? $_POST['phone'] : NULL;
    $value["message"] = $_POST['message'] ? $_POST['message'] : NULL;

    // set header to ajax progress bar
    header('Content-Length: ' . $value["attachment"]["size"]);

    $to = 's@oxton.ru';
    $from = $value["email"];

    $subject = "[".rand(1000,9999)."]";
    $subject .= $value["name"] ? " ".$value["name"] : '';

    $message = $value["message"] ? 'Сообщение: '.$value["message"] : '';
    $message .= $value["phone"] ? "\r\nТелефон: ".$value["phone"] : '';

    mail_attachment(NULL,NULL,$to, $from, $value["name"], $value["email"],$subject,$message);
} else if (!$_POST['email'] && $_POST['name']) {
    die(json_encode(array('error' => "Адрес почты<br/> введён неверно", 'reason' => 'email')));
} else if ($_POST['email'] && !$_POST['name']) {
    die(json_encode(array('error' => "Пожалуйста, <br/> введите Ваше имя", 'reason' => 'name')));
} else {
    die(json_encode(array('error' => "Неверный запрос")));
}


function mail_attachment($filename, $path, $mailto, $from_mail, $from_name, $replyto, $subject, $message) {

    if ($filename) {
        $file = $path.$filename;
        $file_size = filesize($file);
        $handle = fopen($file, "r");
        $content = fread($handle, $file_size);
        fclose($handle);
        $content = chunk_split(base64_encode($content));
    }

    $uid = md5(uniqid(time()));
    $header = "From: ".$from_name." <".$from_mail.">\r\n";
    $header .= "Reply-To: ".$replyto."\r\n";
    $header .= "MIME-Version: 1.0\r\n";
    $header .= "Content-Type: multipart/mixed; boundary=\"".$uid."\"\r\n\r\n";
    $header .= "This is a multi-part message in MIME format.\r\n";
    $header .= "--".$uid."\r\n";
    $header .= "Content-type:text/plain; charset=utf-8\r\n";
    $header .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $header .= $message."\r\n\r\n";
    $header .= "--".$uid."\r\n";

    if ($filename) {
        $header .= "Content-Type: application/octet-stream; name=\"".$filename."\"\r\n"; // use different content types here
        $header .= "Content-Transfer-Encoding: base64\r\n";
        $header .= "Content-Disposition: attachment; filename=\"".$filename."\"\r\n\r\n";
        $header .= $content."\r\n\r\n";
        $header .= "--".$uid."--";
    }

    if (mail($mailto, $subject, "", $header)) {
        if (file_exists($path.$filename)) {
            unlink($path.$filename);
        }
        die(json_encode(array('success' => "Ваше сообщение<br/> отправлено!")));
    } else {
        if (file_exists($path.$filename)) {
            unlink($path.$filename);
        }
        die(json_encode(array('error' => "Ошибка отправки<br/> Попробуйте еще раз")));
    }
}

header('Content-Length: '.ob_get_length());
header('Accept-Ranges: bytes');
ob_end_flush();