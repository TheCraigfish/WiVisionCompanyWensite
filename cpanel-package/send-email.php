<?php
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

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
    exit();
}

$type = $input['type'] ?? '';
$data = $input['data'] ?? [];

// Email configuration - UPDATE THESE WITH YOUR DETAILS
$to_email = 'info@wivision.co.za';  // Change to your email
$from_email = 'noreply@yourdomain.com';  // Change to your domain

// Generate email content based on type
$subject = '';
$message = '';
$reply_to = '';

switch ($type) {
    case 'free-trial':
        $subject = 'New Free Trial Request - WiVision Website';
        $reply_to = $data['businessEmail'] ?? $from_email;
        $message = "=== FREE TRIAL REQUEST ===\n\n";
        $message .= "COMPANY INFORMATION:\n";
        $message .= "Company: " . ($data['company'] ?? 'Not provided') . "\n";
        $message .= "Company Size: " . ($data['companySize'] ?? 'Not provided') . "\n";
        $message .= "Country: " . ($data['country'] ?? 'Not provided') . "\n";
        $message .= "Postal Code: " . ($data['postalCode'] ?? 'Not provided') . "\n\n";
        
        $message .= "CONTACT INFORMATION:\n";
        $message .= "Name: " . ($data['firstName'] ?? '') . " " . ($data['lastName'] ?? '') . "\n";
        $message .= "Business Email: " . ($data['businessEmail'] ?? 'Not provided') . "\n";
        $message .= "Business Phone: " . ($data['businessPhone'] ?? 'Not provided') . "\n\n";
        
        $message .= "ADDITIONAL DETAILS:\n";
        $message .= "Additional Info: " . ($data['additionalInfo'] ?? 'None provided') . "\n";
        $message .= "Email Marketing Consent: " . (($data['emailConsent'] ?? false) ? 'Yes' : 'No') . "\n\n";
        
        $message .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
        $message .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
        break;
        
    case 'partner':
        $subject = 'New Partnership Application - WiVision Website';
        $reply_to = $data['businessEmail'] ?? $from_email;
        $message = "=== PARTNERSHIP APPLICATION ===\n\n";
        $message .= "COMPANY INFORMATION:\n";
        $message .= "Company: " . ($data['company'] ?? 'Not provided') . "\n";
        $message .= "Company Size: " . ($data['companySize'] ?? 'Not provided') . "\n";
        $message .= "Country: " . ($data['country'] ?? 'Not provided') . "\n";
        $message .= "Postal Code: " . ($data['postalCode'] ?? 'Not provided') . "\n\n";
        
        $message .= "CONTACT INFORMATION:\n";
        $message .= "Name: " . ($data['firstName'] ?? '') . " " . ($data['lastName'] ?? '') . "\n";
        $message .= "Business Email: " . ($data['businessEmail'] ?? 'Not provided') . "\n";
        $message .= "Business Phone: " . ($data['businessPhone'] ?? 'Not provided') . "\n\n";
        
        $message .= "ADDITIONAL DETAILS:\n";
        $message .= "Interest/Notes: " . ($data['additionalInfo'] ?? 'None provided') . "\n";
        $message .= "Email Marketing Consent: " . (($data['emailConsent'] ?? false) ? 'Yes' : 'No') . "\n\n";
        
        $message .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
        $message .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
        break;
        
    case 'contact':
        $subject = 'New Contact Form Submission - WiVision Website';
        $reply_to = $data['email'] ?? $from_email;
        $message = "=== CONTACT FORM SUBMISSION ===\n\n";
        $message .= "CONTACT INFORMATION:\n";
        $message .= "Name: " . ($data['name'] ?? 'Not provided') . "\n";
        $message .= "Email: " . ($data['email'] ?? 'Not provided') . "\n";
        $message .= "Company: " . ($data['company'] ?? 'Not provided') . "\n";
        $message .= "Phone: " . ($data['phone'] ?? 'Not provided') . "\n\n";
        
        $message .= "MESSAGE:\n";
        $message .= ($data['message'] ?? 'No message provided') . "\n\n";
        
        $message .= "Submitted: " . date('Y-m-d H:i:s') . "\n";
        $message .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
        break;
        
    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid form type']);
        exit();
}

// Email headers
$headers = array(
    'From' => $from_email,
    'Reply-To' => $reply_to,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Priority' => '3',
    'Return-Path' => $from_email
);

// Convert headers array to string
$headers_string = '';
foreach ($headers as $key => $value) {
    $headers_string .= $key . ': ' . $value . "\r\n";
}

// Log the attempt (optional - for debugging)
error_log("Email attempt - Type: $type, To: $to_email, Subject: $subject");

// Send email
$success = mail($to_email, $subject, $message, $headers_string);

if ($success) {
    echo json_encode([
        'success' => true, 
        'message' => 'Email sent successfully'
    ]);
} else {
    error_log("Email failed - Type: $type, Error: " . error_get_last()['message']);
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Failed to send email. Please try again or contact us directly.'
    ]);
}
?>