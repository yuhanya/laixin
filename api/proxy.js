module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { url, method, headers, body } = req.body;
  try {
    const response = await fetch(url, {
      method: method || 'GET',
      headers: headers || {},
      body: body || undefined,
    });
    const data = await response.text();
    res.status(response.status).json({
      status: response.status,
      data: data,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
