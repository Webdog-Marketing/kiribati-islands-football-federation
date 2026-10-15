export default function ProductCard({ product: p, showBlurb = false }) {
  return (
    <article className="product">
      <a href={p.url} className="product-link" target="_blank" rel="noopener noreferrer">
        <div className="product-media">
          {p.image ? <img src={p.image} alt={p.imageAlt || p.name} loading="lazy" /> : <img className="crest" src="/logos/kiribati-crest.svg" alt="" />}
          {p.soldOut ? <span className="sold-out">Sold out</span> : null}
        </div>
        <div className="product-body">
          <p className="product-kicker">WOVN x Kiribati</p>
          <h3>{p.name}</h3>
          {showBlurb && p.blurb ? <p className="product-blurb">{p.blurb}</p> : null}
          <div className="product-foot">
            {p.price ? <span className="price">{p.price}</span> : null}
            <span className="btn btn-red">{p.soldOut ? 'View' : 'Buy now'}</span>
          </div>
        </div>
      </a>
    </article>
  );
}
