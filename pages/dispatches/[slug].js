import Layout from '../../components/Layout'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export async function getStaticPaths() {
  const folder = path.join(process.cwd(), 'content', 'dispatches')
  const slugs = fs.existsSync(folder)
    ? fs.readdirSync(folder).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''))
    : []
  return { paths: slugs.map(slug => ({ params: { slug } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content', 'dispatches', `${params.slug}.json`)
  const item = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  return { props: { item } }
}

export default function DispatchPage({ item }) {
  const paragraphs = item.body ? item.body.split('\n\n').filter(Boolean) : []

  return (
    <Layout title={item.title} activePage="dispatches">
      <style>{`
        .back-link { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: #b78c3a; text-decoration: none; font-weight: 600; display: inline-block; margin-bottom: 2rem; }
        .back-link:hover { text-decoration: underline; }
        .article-category { font-size: 0.7rem; letter-spacing: 2px; font-weight: 500; color: #b78c3a; text-transform: uppercase; margin-bottom: 0.75rem; }
        .article-title { font-family: 'Cormorant Garamond', serif; font-size: 3.2rem; font-weight: 600; line-height: 1.15; color: #1e2a2e; margin-bottom: 1rem; }
        .article-dek { font-size: 1.2rem; color: #3e3a33; max-width: 700px; margin-bottom: 1.2rem; line-height: 1.5; }
        .article-meta { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; color: #5b5546; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e0d8cc; }
        .article-body { max-width: 720px; }
        .article-body p { font-size: 1.05rem; line-height: 1.8; color: #2a2820; margin-bottom: 1.4rem; }
        .article-body p:first-child::first-letter { font-size: 3.2rem; font-weight: 600; font-family: 'Cormorant Garamond', serif; float: left; line-height: 0.85; margin-right: 0.6rem; color: #b78c3a; }
        .article-footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #e0d8cc; font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-style: italic; color: #5a5243; }
        .no-body { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-style: italic; color: #6b5e4a; padding: 2rem 0; }
        @media (max-width: 780px) { .article-title { font-size: 2.2rem; } }
      `}</style>

      <Link href="/dispatches" className="back-link">← Back to Dispatches</Link>
      <article>
        <div className="article-category">{item.category}</div>
        <h1 className="article-title">{item.title}</h1>
        {item.excerpt && <p className="article-dek">{item.excerpt}</p>}
        <div className="article-meta">
          <span>By {item.author}</span>
          {item.read_time && <span>{item.read_time}</span>}
          {item.date && <span>{item.date}</span>}
        </div>
        <div className="article-body">
          {paragraphs.length > 0 ? paragraphs.map((p, i) => <p key={i}>{p}</p>) : <p className="no-body">Full dispatch coming soon.</p>}
        </div>
        <div className="article-footer">— {item.author}</div>
      </article>
    </Layout>
  )
}
