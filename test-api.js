const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ message: 'API server is working!' });
});

// Email endpoint
app.post('/api/send-email', async (req, res) => {
  console.log('Received email request:', req.body);
  
  try {
    const { type, data } = req.body;
    
    // For now, just log the data and return success
    console.log('Form type:', type);
    console.log('Form data:', data);
    
    // Here we would normally send the email
    // For testing, we'll just simulate success
    
    res.json({ 
      success: true, 
      message: 'Email would be sent successfully',
      type: type,
      data: data
    });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Test API server running on http://localhost:${PORT}`);
  console.log('Test endpoint: http://localhost:3001/test');
  console.log('Email endpoint: http://localhost:3001/api/send-email');
});