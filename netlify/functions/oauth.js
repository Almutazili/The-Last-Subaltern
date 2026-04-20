// From https://github.com/decaporg/decap-cms/blob/master/packages/decap-cms-backend-github/src/__tests__/fixtures/oauth-client-example.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { code } = JSON.parse(event.body);
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
