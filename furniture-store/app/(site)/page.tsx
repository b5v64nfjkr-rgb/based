import Link from 'next/link'

export default function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="carousel">
          <div className="slide"> 
            <div className="slide-inner">
              <h2>Season 1</h2>
              <p>Minimal Scandinavian pieces</p>
              <Link href="/seasons/1" className="btn">Shop Season 1</Link>
            </div>
          </div>
          <div className="slide"> 
            <div className="slide-inner">
              <h2>Season 2</h2>
              <p>Bold colorful accents</p>
              <Link href="/seasons/2" className="btn">Shop Season 2</Link>
            </div>
          </div>
          <div className="slide"> 
            <div className="slide-inner">
              <h2>Season 3</h2>
              <p>Modern classic blends</p>
              <Link href="/seasons/3" className="btn">Shop Season 3</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="filters">
        <div className="container">
          <button className="pill">All</button>
          <button className="pill">Chairs</button>
          <button className="pill">Tables</button>
          <button className="pill">Sofas</button>
        </div>
      </section>

      <section className="products container">
        {/* these would be rendered from the API */}
        {[1,2,3,4,5,6].map((i) => (
          <article key={i} className="product-card">
            <Link href={`/pieces/${i}`}>
              <img src={`/images/p-${i}.jpg`} alt={`Piece ${i}`} />
              <h3>Piece {i}</h3>
              <p>$499</p>
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
