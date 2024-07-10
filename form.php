<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load Composer's autoloader
require 'vendor/autoload.php';

// Initialize variables to avoid notices
$nom = $email = $message = '';
$status = '';

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    exit(0);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form inputs after basic validation
    $nom = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
    $email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
    $message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

    // Validate required fields (add more as necessary)
    if (empty($nom) || empty($email) || empty($message)) {
        $status = 'error';
        $message = 'Veuillez remplir tous les champs obligatoires.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $status = 'error';
        $message = 'Veuillez fournir une adresse e-mail valide.';
    } else {
        try {
            // Email setup using PHPMailer
            $mail = new PHPMailer(true);

            //Server settings
            $mail->isSMTP();                                             
            $mail->Host       = 'smtp.gmail.com';                        
            $mail->SMTPAuth   = true;                                   
            $mail->Username   = 'oussama.oumaima43@gmail.com';                  
            $mail->Password   = 'ippa bljg ixmu wuzt';                        
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;          
            $mail->Port       = 587;                                    

            //Recipients
            $mail->setFrom($email, '2024.firstonemedia.ma');  // Use sender's email address as "From" 
            $mail->addAddress('oussamaelfarissi2005@gmail.com', 'Admin');     //

            // Content
            $mail->isHTML(true);                                        
            $mail->Subject = "Demande de Realisation de Projet de $nom";
            $mail->Body    = "
                <html>
                <head><title>Demande de Projet</title></head>
                <body>
                <h2>Nouvelle demande de Projet</h2>
                <p><strong>Nom:</strong> $nom</p>
                <p><strong>E-mail:</strong> $email</p>
                <p><strong>Message:</strong><br>$message</p>
                </body>
                </html>
            ";
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            // Send email
            $mail->send();
            $status = 'success';
            $message = 'Votre demande de Projet a été envoyée avec succès.';
        } catch (Exception $e) {
            $status = 'error';
            $message = "Erreur lors de l'envoi de votre demande. Veuillez réessayer.";
            // Uncomment the line below for debugging purposes
            // echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
} else {
    // Display the HTML form
    $status = 'form';

    $status = 'error';
    $message = 'Invalid request method!';
    // You can optionally initialize variables here for default values in your HTML form
}
// After processing the form submission
echo json_encode(array('status' => $status, 'message' => $message));
?>
