export default function handler(req, res) {
  const { GITHUB_CLIENT_ID } = process.env;

  if (!GITHUB_CLIENT_ID) {
    return res.status(500).json({ error: "GITHUB_CLIENT_ID is not set" });
  }

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    scope: "repo,user",
    redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params}`);
}
