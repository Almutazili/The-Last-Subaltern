import Layout from '../components/Layout'
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'about.json')
  const data = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : {}
  return { props: { about: data } }
}

export default function AboutPage({ about }) {
  const paragraphs = about.body ? about.body.split('\n\n').filter(Boolean) : []

  return (
    <Layout title="About" activePage="about">
      <style>{`
        .page-title { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 600; color: #1e2a2e; margin-bottom: 2rem; }
        .about-body { max-width: 720px; }
        .about-body p { font-size: 1.05rem; line-height: 1.8; color: #2a2820; margin-bottom: 1.4rem; }
        .about-body p:first-child::first-letter { font-size: 3.2rem; font-weight: 600; font-family: 'Cormorant Garamond', serif; float: left; line-height: 0.85; margin-right: 0.6rem; color: #b78c3a; }
        .empty-state { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-style: italic; color: #6b5e4a; }
      `}</style>

      <div className="thin-divider" style={{marginTop: 0}}></div>
      <h1 className="page-title">{about.title || 'About The Last Subaltern'}</h1>
      <div className="about-body">
        {paragraphs.length > 0
          ? paragraphs.map((p, i) => <p key={i}>{p}</p>)
          : <p className="empty-state">About page coming soon.</p>
        }
      </div>
    </Layout>
  )
}
