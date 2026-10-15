import Link from 'next/link';
import { formatDate } from '@/lib/format';

export default function NewsCard({ post, size = 'md' }) {
  return (
    <article className={`news-card news-card--${size}`}>
      <Link href={`/news/${post.slug}`} className="news-card-link">
        <div className="news-card-media">
          {post.image ? <img src={post.image} alt={post.imageAlt || ''} loading="lazy" /> : <div className="media-fallback" />}
        </div>
        <div className="news-card-body">
          <p className="meta">
            <span className="tag">{post.category}</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
          <h3>{post.title}</h3>
          {size === 'lg' && post.excerpt ? <p className="excerpt">{post.excerpt}</p> : null}
        </div>
      </Link>
    </article>
  );
}
