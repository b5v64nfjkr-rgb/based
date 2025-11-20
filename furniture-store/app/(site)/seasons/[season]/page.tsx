import Link from 'next/link'

export default function SeasonPage({ params }: { params: { season: string }}) {
  const season = params.season
  return (
    <main className="container season-list">
      <h1>Season {season}</h1>
      <div className="products">
        {[1,2,3,4,5,6,7,8].map((i) => (
          <article key={i} className="product-card">
            <Link href={`/pieces/${season}-${i}`}>
              <img src={`/images/p-${i}.jpg`} alt={`Piece ${i}`} />
              <h3>Piece {i}</h3>
              <p>$499</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
