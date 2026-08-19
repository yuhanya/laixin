// api/proxy.js
export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, method, body, headers } = req.body;

  try {
    const response = await fetch(url, {
      method: method || 'GET',
      headers: headers || {},
      body: body || undefined,
    });

    const data = await response.text();
    res.status(response.status).setHeader('Content-Type', 'application/json').send(JSON.stringify({
      status: response.status,
      data: data,
    }));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
