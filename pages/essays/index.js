import Layout from '../../components/Layout'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const folder = path.join(process.cwd(), 'content', 'essays')
  const essays = fs.existsSync(folder)
    ? fs.readdirSync(folder)
        .filter(f => f.endsWith('.json'))
        .map(f => {
          const data = JSON.parse(fs.readFileSync(path.join(folder, f), 'utf8'))
          return { ...data, slug: f.replace('.json', '') }
        })
        .sort((a, b) => a.order - b.order)
    : []
  return { props: { essays } }
}

export default function EssaysPage({ essays }) {
  return (
    <Layout title="Essays" activePage="essays">
      <style>{`
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 600; color: #1e2a2e; margin-bottom: 0.5rem; }
        .page-subtitle { color: #6b5e4a; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; }
        .articles-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2.5rem; margin-top: 2rem; }
        .article-card { border-bottom: 1px solid #e2d9cf; padding-bottom: 1.5rem; transition: transform 0.2s; }
        .article-card:hover { transform: translateY(-4px); }
        .card-category { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: #b78c3a; letter-spacing: 1px; margin-bottom: 0.5rem; }
        .card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 600; color: #1e2a2e; margin-bottom: 0.4rem; line-height: 1.2; }
        .card-title a { text-decoration: none; color: inherit; transition: color 0.2s; }
        .card-title a:hover { color: #b78c3a; }
        .card-meta { font-size: 0.75rem; text-transform: uppercase; color: #6b6253; margin-bottom: 0.6rem; }
        .card-excerpt { font-size: 0.9rem; color: #35332d; line-height: 1.5; }
        .read-link { display: inline-block; margin-top: 0.8rem; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #1e2a2e; text-decoration: none; border-bottom: 1px solid #b78c3a; padding-bottom: 2px; transition: color 0.2s; }
        .read-link:hover { color: #b78c3a; }
        .empty-state { text-align: center; padding: 4rem 0; color: #6b5e4a; font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-style: italic; }
      `}</style>

      <div className="thin-divider" style={{marginTop: 0}}></div>
      <h1 className="page-title">Essays</h1>
      <p className="page-subtitle">Long-form criticism, argument, and intellectual inquiry</p>
      <div className="section-head">All Essays</div>

      {essays.length === 0 ? (
        <div className="empty-state">No essays published yet. Check back soon.</div>
      ) : (
        <div className="articles-grid">
          {essays.map((essay, i) => (
            <div className="article-card" key={i}>
              <div className="card-category">{essay.category}</div>
              <div className="card-title">
                <Link href={`/essays/${essay.slug}`}>{essay.title}</Link>
              </div>
              <div className="card-meta">By {essay.author} · {essay.read_time} {essay.date && `· ${essay.date}`}</div>
              <div className="card-excerpt">{essay.excerpt}</div>
              <Link href={`/essays/${essay.slug}`} className="read-link">Read Essay →</Link>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}
