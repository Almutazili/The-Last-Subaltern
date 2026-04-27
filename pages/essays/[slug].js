import Layout from '../../components/Layout'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'

export async function getStaticPaths() {
  const folder = path.join(process.cwd(), 'content', 'essays')
  const slugs = fs.existsSync(folder)
    ? fs.readdirSync(folder).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''))
    : []
  return {
    paths: slugs.map(slug => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content', 'essays', `${params.slug}.json`)
  const essay = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  return { props: { essay, slug: params.slug } }
}

export default function EssayPage({ essay }) {
  const paragraphs = essay.body ? essay.body.split('\n\n').filter(Boolean) : []

  return (
    <Layout title={essay.title} activePage="essays">
      <style>{`
        .back-link { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: #b78c3a; text-decoration: none; font-weight: 600; display: inline-block; margin-bottom: 2rem; }
        .back-link:hover { text-decoration: underline; }
        .essay-category { font-size: 0.7rem; letter-spacing: 2px; font-weight: 500; color: #b78c3a; text-transform: uppercase; margin-bottom: 0.75rem; }
        .essay-title { font-family: 'Cormorant Garamond', serif; font-size: 3.2rem; font-weight: 600; line-height: 1.15; color: #1e2a2e; letter-spacing: -0.02em; margin-bottom: 1rem; }
        .essay-dek { font-size: 1.2rem; color: #3e3a33; max-width: 700px; margin-bottom: 1.2rem; line-height: 1.5; }
        .essay-meta { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.8rem; color: #5b5546; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e0d8cc; }
        .essay-body { max-width: 720px; }
        .essay-body p { font-size: 1.05rem; line-height: 1.8; color: #2a2820; margin-bottom: 1.4rem; font-family: 'Inter', serif; }
        .essay-body p:first-child::first-letter { font-size: 3.2rem; font-weight: 600; font-family: 'Cormorant Garamond', serif; float: left; line-height: 0.85; margin-right: 0.6rem; color: #b78c3a; }
        .essay-footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #e0d8cc; }
        .essay-footer-author { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-style: italic; color: #5a5243; }
        .no-body { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-style: italic; color: #6b5e4a; padding: 2rem 0; }
        @media (max-width: 780px) { .essay-title { font-size: 2.2rem; } .essay-dek { font-size: 1rem; } }
      `}</style>

      <Link href="/essays" className="back-link">← Back to Essays</Link>

      <article>
        <div className="essay-category">{essay.category}</div>
        <h1 className="essay-title">{essay.title}</h1>
        {essay.excerpt && <p className="essay-dek">{essay.excerpt}</p>}
        <div className="essay-meta">
          <span>By {essay.author}</span>
          {essay.read_time && <span>{essay.read_time}</span>}
          {essay.date && <span>{essay.date}</span>}
        </div>

        <div className="essay-body">
          {paragraphs.length > 0 ? (
            paragraphs.map((para, i) => <p key={i}>{para}</p>)
          ) : (
            <p className="no-body">Full essay coming soon.</p>
          )}
        </div>

        <div className="essay-footer">
          <div className="essay-footer-author">— {essay.author}</div>
        </div>
      </article>
    </Layout>
  )
}
