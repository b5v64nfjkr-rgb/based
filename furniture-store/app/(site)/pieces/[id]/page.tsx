import Link from 'next/link'

export default function PiecePage({ params }: { params: { id: string }}) {
  const id = params.id
  return (
    <main className="container piece-page">
      <div className="piece-left">
        <div className="thumbs">
          {[1,2,3,4].map((n) => (
            <img key={n} src={`/images/p-${n}.jpg`} alt={`thumb ${n}`} />
          ))}
        </div>
        <div className="main-image">
          <img src={`/images/p-1.jpg`} alt="main" />
        </div>
      </div>
      <aside className="piece-right">
        <div className="details">
          <h1>Piece {id}</h1>
          <p>$799</p>
          <p>Lovely piece from our curated selection.</p>
          <div className="actions">
            <button className="pill filled">Add to cart</button>
            <button className="pill">Save</button>
          </div>
        </div>
      </aside>
    </main>
  )
}
