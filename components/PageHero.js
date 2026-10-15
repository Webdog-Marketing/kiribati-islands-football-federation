import Waves from './Waves';

export default function PageHero({ title, intro, image, imageAlt = '', position = 'center' }) {
  return (
    <section className={`page-hero ${image ? 'has-image' : ''}`}>
      {image ? <img className="page-hero-img" src={image} alt={imageAlt} style={{ objectPosition: position }} /> : null}
      <div className="wrap page-hero-inner">
        <h1>{title}</h1>
        {intro ? <p className="lede">{intro}</p> : null}
      </div>
      <Waves />
    </section>
  );
}
