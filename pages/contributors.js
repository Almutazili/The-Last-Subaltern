import Layout from '../components/Layout'
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'contributors.json')
  const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : { contributors: [] }
  return { props: { contributors: data.contributors || [] } }
}

export default function ContributorsPage({ contributors }) {
  return (
    <Layout title="Contributors" activePage="contributors">
      <style>{`
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 600; color: #1e2a2e; margin-bottom: 0.5rem; }
        .page-subtitle { color: #6b5e4a; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; }
        .contributors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; margin-top: 1.5rem; }
        .contributor-card { border-bottom: 1px dashed #e2d9cf; padding-bottom: 1.2rem; }
        .contributor-name { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 600; color: #1e2a2e; margin-bottom: 0.3rem; }
        .contributor-role { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; color: #b78c3a; font-weight: 500; margin-bottom: 0.5rem; }
        .contributor-bio { font-size: 0.9rem; color: #35332d; line-height: 1.5; }
        .empty-state { text-align: center; padding: 4rem 0; color: #6b5e4a; font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-style: italic; }
      `}</style>

      <div className="thin-divider" style={{marginTop: 0}}></div>
      <h1 className="page-title">Contributors</h1>
      <p className="page-subtitle">The writers and thinkers behind The Last Subaltern</p>
      <div className="section-head">Our Writers</div>

      {contributors.length === 0 ? (
        <div className="empty-state">Contributors page coming soon.</div>
      ) : (
        <div className="contributors-grid">
          {contributors.map((c, i) => (
            <div className="contributor-card" key={i}>
              <div className="contributor-name">{c.name}</div>
              {c.role && <div className="contributor-role">{c.role}</div>}
              {c.bio && <div className="contributor-bio">{c.bio}</div>}
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}
