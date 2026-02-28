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
    let payload = req.body;

    // In some cases Vercel passes the raw string body, so attempt to parse it if needed
    if (typeof payload === 'string') {
      try {
        payload = JSON.parse(payload);
      } catch (e) {
        console.warn('Could not JSON parse req.body string');
      }
    }

    console.log('--- Incoming Cashfree Webhook ---');
    console.log('Data:', JSON.stringify(payload, null, 2));
    console.log('---------------------------------');

    // Return exact status and response requested
    return res.status(200).json({ status: "ok" });
  } catch (error) {
    console.error('Error processing Cashfree webhook:', error);
    // Still return 200 with ok status so cashfree doesn't retry infinitely on error
    return res.status(200).json({ status: "ok" });
  }
}