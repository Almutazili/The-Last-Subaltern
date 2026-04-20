export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Missing OAuth code");
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );

    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      return res.status(401).send(`GitHub OAuth error: ${tokenData.error_description}`);
    }

    const { access_token, token_type } = tokenData;

    // Post the token back to the CMS window opener
    const script = `
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e);
            window.opener.postMessage(
              'authorization:github:success:${JSON.stringify({ token: access_token, provider: "github" }).replace(/'/g, "\\'")}',
              e.origin
            );
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage("authorizing:github", "*");
        })();
      </script>
    `;

    res.setHeader("Content-Type", "text/html");
    res.send(`<!DOCTYPE html><html><body>${script}</body></html>`);
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).send("Internal server error during OAuth exchange");
  }
}
