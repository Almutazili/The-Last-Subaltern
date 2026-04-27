// pages/archive.js
import Layout from '../components/Layout'
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'archive.json')
  const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : { items: [] }
  return { props: { items: data.items || [] } }
}

export default function ArchivePage({ items }) {
  return (
    <Layout title="Archive" activePage="archive">
      <style>{`
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 600; color: #1e2a2e; margin-bottom: 0.5rem; }
        .page-subtitle { color: #6b5e4a; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; }
        .archive-list { margin-top: 1.5rem; }
        .archive-item { display: flex; align-items: baseline; gap: 1.5rem; padding: 1.2rem 0; border-bottom: 1px solid #e2d9cf; }
        .archive-volume { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 600; color: #b78c3a; min-width: 140px; text-transform: uppercase; letter-spacing: 1px; }
        .archive-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; color: #1e2a2e; }
        .archive-year { font-size: 0.75rem; color: #6b5e4a; text-transform: uppercase; letter-spacing: 1px; margin-left: auto; }
        @media (max-width: 600px) { .archive-item { flex-direction: column; gap: 0.3rem; } .archive-year { margin-left: 0; } }
      `}</style>

      <div className="thin-divider" style={{marginTop: 0}}></div>
      <h1 className="page-title">Archive</h1>
      <p className="page-subtitle">A complete record of published issues</p>
      <div className="section-head">All Issues</div>
      <div className="archive-list">
        {items.map((item, i) => (
          <div className="archive-item" key={i}>
            <div className="archive-volume">{item.volume}</div>
            <div className="archive-title">{item.title}</div>
            <div className="archive-year">{item.year}</div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
