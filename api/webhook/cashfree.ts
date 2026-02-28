export default async function handler(req, res) {
  // Add CORS headers if Cashfree needs them, though usually server-to-server doesn't strictly need them
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed. Expected POST.'
    });
  }

  try {
    const payload = req.body;
    console.log('--- Incoming Cashfree Webhook ---');
    console.log('Event Type:', payload?.type);
    console.log('Data:', JSON.stringify(payload?.data || payload));
    console.log('---------------------------------');

    // Return 200 immediately to acknowledge receipt of the webhook to Cashfree
    return res.status(200).json({
      success: true,
      message: 'Webhook received successfully'
    });
  } catch (error) {
    console.error('Error processing Cashfree webhook:', error);
    return res.status(400).json({
      success: false,
      message: 'Invalid request'
    });
  }
}