exports.handler = async function () {
  const token = process.env.NETLIFY_API_TOKEN;
  const siteId = process.env.NETLIFY_SITE_ID;

  if (!token || !siteId) {
    return {
      statusCode: 200,
      body: JSON.stringify({ remaining: 20, used: 0 }),
    };
  }

  try {
    const res = await fetch(
      `https://api.netlify.com/api/v1/sites/${siteId}/forms`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const forms = await res.json();
    const betaForm = forms.find((f) => f.name === 'beta-nuvos');
    const used = betaForm ? betaForm.submission_count : 0;
    const remaining = Math.max(0, 20 - used);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ remaining, used }),
    };
  } catch {
    return {
      statusCode: 200,
      body: JSON.stringify({ remaining: 20, used: 0 }),
    };
  }
};
