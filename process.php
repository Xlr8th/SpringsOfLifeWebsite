<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name  = trim($_POST['name']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);

    // Prepare data to save
    $entry = "Name: $name, Email: $email, Phone: $phone" . PHP_EOL;

    // 1. Save to registrations.txt
    file_put_contents("registrations.txt", $entry, FILE_APPEND | LOCK_EX);

    // 2. Send email notification
    $to = "solmissionswebsite@gmail.com";  // <-- change to your own email
    $subject = "New Webinar Registration";
    $message = "You have a new webinar registration:\n\nName: $name\nEmail: $email\nPhone: $phone";
    $headers = "From: noreply@solmissions.org"; // <-- use your domain email for better delivery

    @mail($to, $subject, $message, $headers);

    // 3. Redirect to Zoom registration page
    header("Location: https://us06web.zoom.us/j/88512771537?pwd=29rhftMstYMYK9CeVcNbYj1Ta1ccib.1"); // <-- replace with your actual Zoom registration link
    exit();
}
?>