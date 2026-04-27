import Head from 'next/head'
import Link from 'next/link'

const baseStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #fefaf5; background-image: radial-gradient(rgba(200,180,140,0.03) 1px, transparent 1px); background-size: 24px 24px; color: #1e1e1e; font-family: 'Inter', system-ui, sans-serif; line-height: 1.5; scroll-behavior: smooth; }
  .site-header { position: sticky; top: 0; background: #fefaf5; z-index: 1000; border-bottom: 1px solid #e8e0d3; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
  .header-container { max-width: 1280px; margin: 0 auto; padding: 1.2rem 2rem 0.8rem; }
  .masthead { text-align: center; border-top: 1px solid #dcd3c4; border-bottom: 1px solid #dcd3c4; padding: 0.9rem 0; margin-bottom: 0.6rem; }
  .publication-name { font-family: 'Cormorant Garamond', serif; font-size: 2.5rem; font-weight: 600; letter-spacing: -0.5px; color: #1e2a2e; text-transform: uppercase; text-decoration: none; display: block; }
  .motto { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: #5e5a4f; margin-top: 6px; }
  .nav-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 1.5rem; align-items: center; margin: 0.75rem 0 0.25rem; }
  .nav-links { display: flex; flex-wrap: wrap; gap: 1.6rem; list-style: none; }
  .nav-links a { text-decoration: none; font-size: 0.85rem; font-weight: 500; color: #2c2b28; text-transform: uppercase; transition: color 0.2s; }
  .nav-links a:hover, .nav-links a.active { color: #b78c3a; }
  .subscribe-nav { background: transparent; border: 1px solid #b78c3a; padding: 0.3rem 1rem; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; border-radius: 24px; transition: all 0.2s; color: #1e1e1e; text-decoration: none; }
  .subscribe-nav:hover { background: #b78c3a; color: #fefaf5; }
  .container { max-width: 1200px; margin: 0 auto; padding: 2rem 2rem 3rem; }
  .thin-divider { height: 1px; background: #e0d8cc; margin: 2rem 0; }
  .section-head { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 2px; color: #6b5e4a; border-bottom: 1px solid #e3d9ce; display: inline-block; padding-bottom: 6px; margin-bottom: 1.5rem; }
  .footer { border-top: 1px solid #ddd2c2; margin-top: 2rem; padding: 2rem 0; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; font-size: 0.75rem; text-transform: uppercase; }
  .footer-links { display: flex; flex-wrap: wrap; gap: 1.2rem; }
  .footer-links a, .social-links a { text-decoration: none; color: #4b463b; transition: color 0.2s; }
  .footer-links a:hover, .social-links a:hover { color: #b78c3a; }
  .social-links { display: flex; gap: 1rem; font-size: 1rem; }
  @media (max-width: 780px) { .container { padding: 1rem 1.5rem; } .nav-row { flex-direction: column; gap: 0.5rem; } .nav-links { justify-content: center; gap: 1rem; } .publication-name { font-size: 1.8rem; } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeInUp 0.55s ease forwards; }
`

export default function Layout({ children, title = 'The Last Subaltern', activePage = '' }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title ? `${title} | The Last Subaltern` : 'The Last Subaltern | A Journal of Ideas'}</title>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <style>{baseStyles}</style>
      </Head>

      <header className="site-header">
        <div className="header-container">
          <div className="masthead">
            <Link href="/" className="publication-name">THE LAST SUBALTERN</Link>
            <div className="motto">A JOURNAL OF IDEAS &amp; CRITICISM — EST. 2022</div>
          </div>
          <div className="nav-row">
            <ul className="nav-links">
              <li><Link href="/essays" className={activePage === 'essays' ? 'active' : ''}>Essays</Link></li>
              <li><Link href="/dispatches" className={activePage === 'dispatches' ? 'active' : ''}>Dispatches</Link></li>
              <li><Link href="/reviews" className={activePage === 'reviews' ? 'active' : ''}>Reviews</Link></li>
              <li><Link href="/archive" className={activePage === 'archive' ? 'active' : ''}>Archive</Link></li>
              <li><Link href="/contributors" className={activePage === 'contributors' ? 'active' : ''}>Contributors</Link></li>
              <li><Link href="/about" className={activePage === 'about' ? 'active' : ''}>About</Link></li>
            </ul>
            <a href="https://theblackpaper.substack.com" target="_blank" rel="noreferrer" className="subscribe-nav">
              <i className="far fa-envelope" style={{marginRight:'6px'}}></i> Subscribe
            </a>
          </div>
        </div>
      </header>

      <main className="container fade-in">
        {children}
      </main>

      <div style={{maxWidth:'1200px', margin:'0 auto', padding:'0 2rem'}}>
        <footer className="footer">
          <div className="footer-links">
            <Link href="/about">About</Link>
            <Link href="/contributors">Contributors</Link>
            <a href="#">Submission Guidelines</a>
            <a href="#">Contact</a>
            <a href="#">Ethics Policy</a>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://theblackpaper.substack.com" aria-label="Substack"><i className="fas fa-newspaper"></i></a>
            <a href="#" aria-label="Bluesky"><i className="fas fa-cloud"></i></a>
          </div>
          <div style={{fontSize:'0.7rem', width:'100%', textAlign:'center', marginTop:'1rem'}}>© The Last Subaltern — All rights reserved.</div>
        </footer>
      </div>
    </>
  )
}
