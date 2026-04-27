import Link from 'next/link'
import Head from 'next/head'
import { useEffect } from 'react'
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const contentDir = path.join(process.cwd(), 'content')

  const hero        = JSON.parse(fs.readFileSync(path.join(contentDir, 'hero.json'), 'utf8'))
  const letter      = JSON.parse(fs.readFileSync(path.join(contentDir, 'editor-letter.json'), 'utf8'))
  const pullQuote   = JSON.parse(fs.readFileSync(path.join(contentDir, 'pull-quote.json'), 'utf8'))
  const quotesData  = JSON.parse(fs.readFileSync(path.join(contentDir, 'quotes.json'), 'utf8'))
  const archiveData = JSON.parse(fs.readFileSync(path.join(contentDir, 'archive.json'), 'utf8'))

  const readFolder = (folder) => {
    if (!fs.existsSync(folder)) return []
    return fs.readdirSync(folder)
      .filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(folder, f), 'utf8')))
      .sort((a, b) => a.order - b.order)
  }

  const issues = readFolder(path.join(contentDir, 'issues'))
  const essays = readFolder(path.join(contentDir, 'essays'))
  return {
    props: {
      hero,
      letter,
      pullQuote,
      quotes:  quotesData.quotes,
      archive: archiveData.items,
      issues,
      essays,
    },
  }
}

export default function Home({ hero, letter, pullQuote, quotes, archive, issues, essays }) {
  useEffect(() => {
    // Reading progress bar
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      const bar = document.getElementById('readingProgressBar')
      if (bar) bar.style.width = scrolled + '%'
    }
    window.addEventListener('scroll', handleScroll)

    // Rotating quotes
    let quoteIndex = 0
    const quoteEl  = document.getElementById('rotatingQuote')
    const authorEl = document.getElementById('rotatingAuthor')
    const rotateQuote = () => {
      quoteIndex = (quoteIndex + 1) % quotes.length
      if (quoteEl && authorEl) {
        quoteEl.style.opacity = '0'
        setTimeout(() => {
          quoteEl.innerText  = quotes[quoteIndex].text
          authorEl.innerText = quotes[quoteIndex].author
          quoteEl.style.opacity = '1'
        }, 200)
      }
    }
    const quoteInterval = setInterval(rotateQuote, 8000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(quoteInterval)
    }
  }, [quotes])

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="description" content="The Last Subaltern: a journal of ideas, criticism, and depth." />
        <title>The Last Subaltern | A Journal of Ideas</title>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { background: #fefaf5; background-image: radial-gradient(rgba(200,180,140,0.03) 1px, transparent 1px); background-size: 24px 24px; color: #1e1e1e; font-family: 'Inter', system-ui, sans-serif; line-height: 1.5; scroll-behavior: smooth; }
          .progress-container { position: fixed; top: 0; left: 0; width: 100%; height: 3px; background: #e4ddd0; z-index: 2000; }
          .progress-bar { height: 3px; background: #b78c3a; width: 0%; transition: width 0.08s linear; box-shadow: 0 0 2px rgba(183,140,58,0.4); }
          .site-header { position: sticky; top: 0; background: #fefaf5; z-index: 1000; border-bottom: 1px solid #e8e0d3; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
          .header-container { max-width: 1280px; margin: 0 auto; padding: 1.2rem 2rem 0.8rem; }
          .masthead { text-align: center; border-top: 1px solid #dcd3c4; border-bottom: 1px solid #dcd3c4; padding: 0.9rem 0; margin-bottom: 0.6rem; }
          .publication-name { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-weight: 600; letter-spacing: -0.5px; color: #1e2a2e; text-transform: uppercase; }
          .motto { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: #5e5a4f; margin-top: 6px; }
          .nav-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 1.5rem; align-items: center; margin: 0.75rem 0 0.25rem; }
          .nav-links { display: flex; flex-wrap: wrap; gap: 1.6rem; list-style: none; }
          .nav-links a { text-decoration: none; font-size: 0.85rem; font-weight: 500; color: #2c2b28; text-transform: uppercase; transition: color 0.2s; }
          .nav-links a:hover { color: #b78c3a; }
          .subscribe-nav { background: transparent; border: 1px solid #b78c3a; padding: 0.3rem 1rem; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; border-radius: 24px; transition: all 0.2s; color: #1e1e1e; text-decoration: none; }
          .subscribe-nav:hover { background: #b78c3a; color: #fefaf5; }
          .container { max-width: 1200px; margin: 0 auto; padding: 2rem 2rem 3rem; }
          .thin-divider { height: 1px; background: #e0d8cc; margin: 2rem 0; }
          .section-head { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 2px; color: #6b5e4a; border-bottom: 1px solid #e3d9ce; display: inline-block; padding-bottom: 6px; margin-bottom: 1.5rem; }
          .hero { margin: 1rem 0 2rem; }
          .hero-label { font-size: 0.7rem; letter-spacing: 2px; font-weight: 500; color: #b78c3a; text-transform: uppercase; margin-bottom: 0.75rem; }
          .hero-title { font-family: 'Cormorant Garamond', serif; font-size: 3.3rem; font-weight: 600; line-height: 1.2; color: #1e2a2e; letter-spacing: -0.02em; margin: 0.5rem 0; }
          .hero-dek { font-size: 1.2rem; color: #3e3a33; max-width: 85%; margin: 0.75rem 0 1rem; }
          .byline-meta { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.85rem; color: #5b5546; text-transform: uppercase; letter-spacing: 0.5px; margin: 0.8rem 0 1.2rem; }
          .btn-essay { background: none; border: 1px solid #1e2a2e; padding: 0.6rem 1.8rem; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; transition: all 0.25s; display: inline-block; text-decoration: none; color: #1e2a2e; }
          .btn-essay:hover { background: #1e2a2e; color: #fefaf5; }
          .issue-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 2rem; margin: 1rem 0 2rem; }
          .issue-card { border-bottom: 1px dashed #e2d9cf; padding-bottom: 1rem; }
          .issue-category { font-size: 0.7rem; text-transform: uppercase; color: #b78c3a; font-weight: 500; letter-spacing: 1px; }
          .issue-title { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; font-weight: 600; margin: 0.5rem 0 0.25rem; }
          .issue-author { font-size: 0.8rem; font-weight: 500; color: #5e5a4f; text-transform: uppercase; margin-bottom: 0.5rem; }
          .issue-abstract { font-size: 0.9rem; color: #3e3c36; line-height: 1.4; }
          .essays-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 2rem; margin: 1rem 0 2rem; }
          .essay-card { transition: transform 0.2s ease; padding: 0.2rem 0 0.6rem; border-bottom: 1px solid #ece3d8; }
          .essay-card:hover { transform: translateY(-4px); }
          .card-category { font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: #b78c3a; letter-spacing: 1px; }
          .essay-card h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.5rem; margin: 0.5rem 0 0.3rem; font-weight: 600; }
          .essay-meta { font-size: 0.7rem; text-transform: uppercase; color: #6b6253; margin-bottom: 0.5rem; }
          .essay-excerpt { font-size: 0.9rem; color: #35332d; }
          .editor-letter { background: #fbf8f2; padding: 2rem 2.5rem; margin: 2rem 0; border-left: 3px solid #b78c3a; box-shadow: 0 2px 8px rgba(0,0,0,0.02); }
          .dropcap:first-letter { font-size: 3.2rem; font-weight: 600; font-family: 'Cormorant Garamond', serif; float: left; line-height: 0.85; margin-right: 0.6rem; color: #b78c3a; }
          .signature { margin-top: 1.2rem; font-style: italic; font-family: 'Cormorant Garamond', serif; font-size: 1rem; text-align: right; color: #5a5243; }
          .pull-quote { margin: 2rem 0; text-align: center; font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-style: italic; color: #2c3b36; border-top: 1px solid #e2d6c8; border-bottom: 1px solid #e2d6c8; padding: 2rem 0; }
          .marginalia { background: #fbf9f4; padding: 2rem; margin: 2rem 0; text-align: center; }
          .quote-text { font-size: 1.4rem; font-style: italic; font-family: 'Cormorant Garamond', serif; color: #1e2a2e; max-width: 700px; margin: 0 auto; transition: opacity 0.4s; }
          .quote-author { margin-top: 1rem; font-size: 0.85rem; letter-spacing: 1px; text-transform: uppercase; color: #7b6e58; }
          .subscription { text-align: center; background: #fefaf5; border: 1px solid #e2d7ca; padding: 2.5rem 1.5rem; margin: 2rem 0; }
          .sub-title { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 500; }
          .archive-timeline { margin: 2rem 0 1rem; }
          .timeline-list { display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: space-between; border-top: 1px solid #e1d6c9; padding-top: 1.8rem; }
          .timeline-item { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px; }
          .timeline-item strong { font-weight: 600; color: #b78c3a; }
          .footer { border-top: 1px solid #ddd2c2; margin-top: 2rem; padding: 2rem 0; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; font-size: 0.75rem; text-transform: uppercase; }
          .footer-links { display: flex; flex-wrap: wrap; gap: 1.2rem; }
          .footer-links a, .social-links a { text-decoration: none; color: #4b463b; transition: color 0.2s; }
          .footer-links a:hover, .social-links a:hover { color: #b78c3a; }
          .social-links { display: flex; gap: 1rem; font-size: 1rem; }
          @media (max-width: 780px) { .hero-title { font-size: 2.2rem; } .container { padding: 1rem 1.5rem; } .nav-row { flex-direction: column; gap: 0.5rem; } .nav-links { justify-content: center; gap: 1rem; } .editor-letter { padding: 1.5rem; } .pull-quote { font-size: 1.3rem; } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
          section, .hero, .issue-grid, .essays-grid, .editor-letter, .marginalia, .subscription, .archive-timeline { animation: fadeInUp 0.55s ease forwards; }
        `}</style>
      </Head>

      <div className="progress-container">
        <div className="progress-bar" id="readingProgressBar"></div>
      </div>

      <header className="site-header">
        <div className="header-container">
          <div className="masthead">
            <div className="publication-name">THE LAST SUBALTERN</div>
            <div className="motto">A JOURNAL OF IDEAS &amp; CRITICISM — EST. 2022</div>
          </div>
          <div className="nav-row">
            <ul className="nav-links">
  <li><Link href="/">Home</Link></li>
  <li><Link href="/essays">Essays</Link></li>
  <li><Link href="/reviews">Reviews</Link></li>
  <li><Link href="/archive">Archive</Link></li>
  <li><Link href="/contributors">Contributors</Link></li>
  <li><Link href="/about">About</Link></li>
</ul>
            </ul>
            <a href="#" className="subscribe-nav"><i className="far fa-envelope" style={{marginRight:'6px'}}></i> Subscribe</a>
          </div>
        </div>
      </header>

      <main className="container">

        {/* Hero */}
        <section className="hero">
          <div className="hero-label">{hero.label}</div>
          <h1 className="hero-title">{hero.title}</h1>
          <p className="hero-dek">{hero.dek}</p>
          <div className="byline-meta">
            <span>{hero.author}</span>
            <span>{hero.read_time}</span>
            <span>{hero.date}</span>
          </div>
          <Link href="/essays" className="btn-essay">{hero.btn_text}</Link>
        </section>

        <div className="thin-divider"></div>

        {/* Current Issue */}
        <div>
          <div className="section-head">CURRENT ISSUE</div>
          <div className="issue-grid">
            {issues.map((issue, i) => (
              <div className="issue-card" key={i}>
                <div className="issue-category">{issue.category}</div>
                <div className="issue-title">{issue.title}</div>
                <div className="issue-author">{issue.author}</div>
                <div className="issue-abstract">{issue.abstract}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="thin-divider"></div>

        {/* Recent Essays */}
        <div>
          <div className="section-head">RECENT ESSAYS</div>
          <div className="essays-grid">
            {essays.map((essay, i) => (
              <div className="essay-card" key={i}>
                <div className="card-category">{essay.category}</div>
                <h3>{essay.title}</h3>
                <div className="essay-meta">By {essay.author} · {essay.read_time}</div>
                <div className="essay-excerpt">{essay.excerpt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pull Quote */}
        <div className="pull-quote">&ldquo;{pullQuote.quote}&rdquo;</div>

        {/* Editor's Letter */}
        <div className="editor-letter">
          <p className="dropcap">{letter.body}</p>
          <div className="signature">{letter.signature}</div>
        </div>

        {/* Marginalia */}
        <div className="marginalia">
          <div style={{fontSize:'0.7rem', letterSpacing:'2px', textTransform:'uppercase', color:'#b78c3a'}}>MARGINALIA</div>
          <div id="rotatingQuote" className="quote-text">&ldquo;{quotes[0]?.text}&rdquo;</div>
          <div id="rotatingAuthor" className="quote-author">{quotes[0]?.author}</div>
        </div>

        {/* Subscription */}
        <div className="subscription">
          <div className="sub-title">Join readers who still believe in thinking.</div>
          <p style={{marginTop:'0.6rem', color:'#4b473e'}}>Subscribe for premium essays, archival access, and the quarterly print folio.</p>
          <iframe src="https://theblackpaper.substack.com/embed" width="480" height="320" style={{border:'1px solid #EEE', background:'white', marginTop:'1rem'}} frameBorder="0" scrolling="no"></iframe>
        </div>

        {/* Archive */}
        <div className="archive-timeline">
          <div className="section-head">SELECTED ARCHIVE / TIMELINE</div>
          <div className="timeline-list">
            {archive.map((item, i) => (
              <div className="timeline-item" key={i}>
                <strong>{item.volume}</strong> — {item.title} ({item.year})
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-links">
            <a href="#">Submission Guidelines</a>
            <a href="#">Contact</a>
            <a href="#">Advertise</a>
            <a href="#">Ethics Policy</a>
            <a href="#">RSS</a>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Substack"><i className="fas fa-newspaper"></i></a>
            <a href="#" aria-label="Bluesky"><i className="fas fa-cloud"></i></a>
          </div>
          <div style={{fontSize:'0.7rem', width:'100%', textAlign:'center', marginTop:'1rem'}}>© The Last Subaltern — All rights reserved.</div>
        </footer>

      </main>
    </>
  )
}
