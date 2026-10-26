import { notFound } from "next/navigation";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
import { BlogPostLayout } from "@/components/blog";
import { blogPosts, getPost } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found | TranslateWala" };
  return pageMetadata(post.title, post.description, `/blog/${slug}`);
}
export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  return <BlogPostLayout post={post} />;
}
