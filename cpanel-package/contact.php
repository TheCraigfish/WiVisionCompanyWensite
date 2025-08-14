<?php
// ============================================
// CPANEL EMAIL CONFIGURATION
// ============================================
// IMPORTANT: Replace these with your actual cPanel email settings
$smtp_host = 'mail.mydomain.com';        // Your cPanel mail server (usually mail.yourdomain.com)
$smtp_port = 465;                        // Port 465 for SSL, 587 for TLS
$smtp_username = 'contact@mydomain.com'; // Your cPanel email address
$smtp_password = 'YOUR_PASSWORD_HERE';   // Your cPanel email password
$to_email = 'info@wivision.co.za';      // Where to send the emails

// ============================================
// CORS HEADERS FOR REACT APP
// ============================================
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// ============================================
// LOAD PHPMAILER
// ============================================
require_once 'phpmailer/Exception.php';
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// ============================================
// PROCESS FORM DATA
// ============================================
// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit();
}

// Sanitize and validate inputs
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Extract and validate form type
$type = isset($input['type']) ? sanitizeInput($input['type']) : '';
$data = isset($input['data']) ? $input['data'] : [];

// Validate required fields based on type
$errors = [];

if ($type === 'contact') {
    // Contact form validation
    $name = isset($data['name']) ? sanitizeInput($data['name']) : '';
    $email = isset($data['email']) ? sanitizeInput($data['email']) : '';
    $company = isset($data['company']) ? sanitizeInput($data['company']) : '';
    $phone = isset($data['phone']) ? sanitizeInput($data['phone']) : '';
    $message = isset($data['message']) ? sanitizeInput($data['message']) : '';
    
    if (empty($name)) $errors[] = 'Name is required';
    if (empty($email) || !validateEmail($email)) $errors[] = 'Valid email is required';
    if (empty($message)) $errors[] = 'Message is required';
    
} elseif ($type === 'free-trial') {
    // Free trial form validation
    $company = isset($data['company']) ? sanitizeInput($data['company']) : '';
    $companySize = isset($data['companySize']) ? sanitizeInput($data['companySize']) : '';
    $country = isset($data['country']) ? sanitizeInput($data['country']) : '';
    $firstName = isset($data['firstName']) ? sanitizeInput($data['firstName']) : '';
    $lastName = isset($data['lastName']) ? sanitizeInput($data['lastName']) : '';
    $businessEmail = isset($data['businessEmail']) ? sanitizeInput($data['businessEmail']) : '';
    $businessPhone = isset($data['businessPhone']) ? sanitizeInput($data['businessPhone']) : '';
    $additionalInfo = isset($data['additionalInfo']) ? sanitizeInput($data['additionalInfo']) : '';
    $emailConsent = isset($data['emailConsent']) ? (bool)$data['emailConsent'] : false;
    
    if (empty($company)) $errors[] = 'Company is required';
    if (empty($companySize)) $errors[] = 'Company size is required';
    if (empty($country)) $errors[] = 'Country is required';
    if (empty($firstName)) $errors[] = 'First name is required';
    if (empty($lastName)) $errors[] = 'Last name is required';
    if (empty($businessEmail) || !validateEmail($businessEmail)) $errors[] = 'Valid business email is required';
    
} elseif ($type === 'partner') {
    // Partner form validation
    $company = isset($data['company']) ? sanitizeInput($data['company']) : '';
    $companySize = isset($data['companySize']) ? sanitizeInput($data['companySize']) : '';
    $country = isset($data['country']) ? sanitizeInput($data['country']) : '';
    $postalCode = isset($data['postalCode']) ? sanitizeInput($data['postalCode']) : '';
    $firstName = isset($data['firstName']) ? sanitizeInput($data['firstName']) : '';
    $lastName = isset($data['lastName']) ? sanitizeInput($data['lastName']) : '';
    $businessEmail = isset($data['businessEmail']) ? sanitizeInput($data['businessEmail']) : '';
    $businessPhone = isset($data['businessPhone']) ? sanitizeInput($data['businessPhone']) : '';
    $additionalInfo = isset($data['additionalInfo']) ? sanitizeInput($data['additionalInfo']) : '';
    $emailConsent = isset($data['emailConsent']) ? (bool)$data['emailConsent'] : false;
    
    if (empty($company)) $errors[] = 'Company is required';
    if (empty($country)) $errors[] = 'Country is required';
    if (empty($firstName)) $errors[] = 'First name is required';
    if (empty($lastName)) $errors[] = 'Last name is required';
    if (empty($businessEmail) || !validateEmail($businessEmail)) $errors[] = 'Valid business email is required';
    if (empty($businessPhone)) $errors[] = 'Business phone is required';
    
} else {
    $errors[] = 'Invalid form type';
}

// Return validation errors
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => implode(', ', $errors)]);
    exit();
}

// ============================================
// GENERATE EMAIL CONTENT
// ============================================
$subject = '';
$body = '';
$replyTo = '';

if ($type === 'contact') {
    $subject = 'New Contact Form - WiVision';
    $replyTo = $email;
    $body = "
CONTACT FORM SUBMISSION

Name: $name
Email: $email
Company: " . ($company ?: 'Not provided') . "
Phone: " . ($phone ?: 'Not provided') . "

Message:
$message

---
Sent from WiVision Contact Form
";

} elseif ($type === 'free-trial') {
    $subject = 'New Free Trial Request - WiVision';
    $replyTo = $businessEmail;
    $body = "
FREE TRIAL REQUEST

Company Information:
- Company: $company
- Size: $companySize
- Country: $country

Contact Information:
- Name: $firstName $lastName
- Email: $businessEmail
- Phone: " . ($businessPhone ?: 'Not provided') . "

Additional Information:
" . ($additionalInfo ?: 'None provided') . "

Email Consent: " . ($emailConsent ? 'Yes' : 'No') . "

---
Sent from WiVision Free Trial Form
";

} elseif ($type === 'partner') {
    $subject = 'New Partnership Application - WiVision';
    $replyTo = $businessEmail;
    $body = "
PARTNERSHIP APPLICATION

Company Information:
- Company: $company
- Size: " . ($companySize ?: 'Not specified') . "
- Country: $country
- Postal Code: " . ($postalCode ?: 'Not provided') . "

Contact Information:
- Name: $firstName $lastName
- Email: $businessEmail
- Phone: $businessPhone

Additional Information:
" . ($additionalInfo ?: 'None provided') . "

Email Consent: " . ($emailConsent ? 'Yes' : 'No') . "

---
Sent from WiVision Partner Application Form
";
}

// ============================================
// SEND EMAIL USING PHPMAILER
// ============================================
try {
    // Create PHPMailer instance
    $mail = new PHPMailer(true);
    
    // Server settings
    $mail->isSMTP();
    $mail->Host       = $smtp_host;
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtp_username;
    $mail->Password   = $smtp_password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL encryption
    $mail->Port       = $smtp_port;
    
    // Recipients
    $mail->setFrom($smtp_username, 'WiVision Website');
    $mail->addAddress($to_email, 'WiVision');
    if ($replyTo) {
        $mail->addReplyTo($replyTo);
    }
    
    // Content
    $mail->isHTML(false); // Plain text email
    $mail->Subject = $subject;
    $mail->Body    = $body;
    
    // Send the email
    $mail->send();
    
    // Success response
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    
} catch (Exception $e) {
    // Error response
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Failed to send email: ' . $mail->ErrorInfo
    ]);
}
?>