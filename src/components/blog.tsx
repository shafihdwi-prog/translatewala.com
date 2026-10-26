import Link from "next/link";
import Image from "next/image";
import { Icon } from "./icons";
import { WhatsAppLink } from "./whatsapp-link";
import { blogPosts, type BlogPost } from "@/lib/blog";
import { site } from "@/lib/site";

export function BlogGrid({ posts = blogPosts }: { posts?: BlogPost[] }) {
  const [featured, ...rest] = posts;
  return <section className="section editorial-blog" id="blog"><div className="container">
    <div className="editorial-heading"><div><p className="eyebrow"><span />Journal</p><h2>Notes for people building across languages.</h2></div><Link href="/blog" className="text-link">All articles<Icon name="arrow-up-right" size={16} /></Link></div>
    <div className="editorial-layout">{featured && <FeaturedPost post={featured} />}{rest.length > 0 && <div className="editorial-list">{rest.map(post => <CompactPost key={post.slug} post={post} />)}</div>}</div>
  </div></section>;
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return <article className="featured-post"><Link href={`/blog/${post.slug}`} className="featured-media"><Image src={post.image} alt="" fill sizes="(max-width: 760px) 92vw, 62vw" /><span>{post.category}</span></Link><div><p>{post.date} · {post.readTime}</p><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.description}</p><Link href={`/blog/${post.slug}`} className="text-link">Continue reading<Icon name="arrow" size={16} /></Link></div></article>;
}

function CompactPost({ post }: { post: BlogPost }) {
  return <article className="compact-post"><Link href={`/blog/${post.slug}`}><Image src={post.image} alt="" width={118} height={86} /><span><small>{post.category}</small><strong>{post.title}</strong><em>{post.date}</em></span></Link></article>;
}

export function BlogIndex({ posts = blogPosts }: { posts?: BlogPost[] }) {
  return <div className="blog-index">{posts.map((post, index) => <article className={index === 0 ? "index-feature" : "index-card"} key={post.slug}><Link href={`/blog/${post.slug}`}><div className="index-media"><Image src={post.image} alt="" fill sizes="(max-width: 760px) 92vw, 40vw" /><span>{String(index + 1).padStart(2, "0")}</span></div><div><small>{post.category} · {post.readTime}</small><h2>{post.title}</h2><p>{post.description}</p><time>{post.date}</time></div></Link></article>)}</div>;
}

export function BlogPostLayout({ post }: { post: BlogPost }) {
  const articleData = { "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.description, datePublished: post.date, author: { "@type": "Organization", name: site.name }, publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/images/translatewala-original.png` } }, image: `${site.url}${post.image}`, mainEntityOfPage: `${site.url}/blog/${post.slug}` };
  return <main id="main-content" className="article-page"><section className="article-hero"><div className="container article-hero-grid"><div><p className="eyebrow"><span />{post.category}</p><h1>{post.title}</h1><p>{post.description}</p><div className="article-byline"><span>{post.author}</span><time>{post.date}</time><span>{post.readTime}</span></div></div><div className="article-cover"><Image src={post.image} alt="" fill priority sizes="(max-width: 760px) 92vw, 46vw" /></div></div></section><section className="section"><div className="container article-layout"><article className="article-copy">{post.content.map(block => <section key={block.heading || block.paragraphs[0]}>{block.heading && <h2>{block.heading}</h2>}{block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{block.list && <ul>{block.list.map(item => <li key={item}>{item}</li>)}</ul>}</section>)}</article><aside><div className="article-side"><p>More from the journal</p>{blogPosts.filter(item => item.slug !== post.slug).map(item => <Link key={item.slug} href={`/blog/${item.slug}`}>{item.title}<Icon name="arrow-up-right" size={14} /></Link>)}</div><WhatsAppLink className="button article-chat" message={`Hello TranslateWala, I read “${post.title}” and would like to discuss a project.`}>Discuss this with us</WhatsAppLink></aside></div></section><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }} /></main>;
}
