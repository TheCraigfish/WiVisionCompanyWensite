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

// Email configuration
$to_email = 'info@wivision.co.za';
$from_email = 'noreply@wivision.co.za';

// Generate email content based on type
$subject = '';
$message = '';

switch ($type) {
    case 'free-trial':
        $subject = 'New Free Trial Request - WiVision';
        $message = "FREE TRIAL REQUEST\n\n";
        $message .= "Company: " . ($data['company'] ?? '') . "\n";
        $message .= "Size: " . ($data['companySize'] ?? '') . "\n";
        $message .= "Country: " . ($data['country'] ?? '') . "\n\n";
        $message .= "Contact: " . ($data['firstName'] ?? '') . " " . ($data['lastName'] ?? '') . "\n";
        $message .= "Email: " . ($data['businessEmail'] ?? '') . "\n";
        $message .= "Phone: " . ($data['businessPhone'] ?? '') . "\n\n";
        $message .= "Additional Info: " . ($data['additionalInfo'] ?? 'None') . "\n";
        $message .= "Email Consent: " . (($data['emailConsent'] ?? false) ? 'Yes' : 'No') . "\n";
        break;
        
    case 'partner':
        $subject = 'New Partnership Application - WiVision';
        $message = "PARTNERSHIP APPLICATION\n\n";
        $message .= "Company: " . ($data['company'] ?? '') . "\n";
        $message .= "Size: " . ($data['companySize'] ?? '') . "\n";
        $message .= "Country: " . ($data['country'] ?? '') . "\n";
        $message .= "Postal Code: " . ($data['postalCode'] ?? '') . "\n\n";
        $message .= "Contact: " . ($data['firstName'] ?? '') . " " . ($data['lastName'] ?? '') . "\n";
        $message .= "Email: " . ($data['businessEmail'] ?? '') . "\n";
        $message .= "Phone: " . ($data['businessPhone'] ?? '') . "\n\n";
        $message .= "Additional Info: " . ($data['additionalInfo'] ?? 'None') . "\n";
        $message .= "Email Consent: " . (($data['emailConsent'] ?? false) ? 'Yes' : 'No') . "\n";
        break;
        
    case 'contact':
        $subject = 'New Contact Form - WiVision';
        $message = "CONTACT FORM SUBMISSION\n\n";
        $message .= "Name: " . ($data['name'] ?? '') . "\n";
        $message .= "Email: " . ($data['email'] ?? '') . "\n";
        $message .= "Company: " . ($data['company'] ?? 'Not provided') . "\n";
        $message .= "Phone: " . ($data['phone'] ?? 'Not provided') . "\n\n";
        $message .= "Message:\n" . ($data['message'] ?? '') . "\n";
        break;
        
    default:
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email type']);
        exit();
}

// Email headers
$headers = array(
    'From' => $from_email,
    'Reply-To' => $data['email'] ?? $data['businessEmail'] ?? $from_email,
    'X-Mailer' => 'PHP/' . phpversion(),
    'Content-Type' => 'text/plain; charset=UTF-8'
);

// Convert headers array to string
$headers_string = '';
foreach ($headers as $key => $value) {
    $headers_string .= $key . ': ' . $value . "\r\n";
}

// Send email
$success = mail($to_email, $subject, $message, $headers_string);

if ($success) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
?>