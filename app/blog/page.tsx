import Link from "next/link";
import { FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import HeroBanner from "@/components/HeroBanner";
import GlassCard from "@/components/GlassCard";
import Button from "@/components/ui/Button";
import { blogHero, blogPosts, blogCategories, type BlogPost } from "@/data";
import { ReactNode } from "react";

export default function Blog() {
  const featured = blogPosts[0];
  const recent = blogPosts.slice(1, 4);
  const rest = blogPosts.slice(4);
  const Ping = () => (
    <span className="relative h-2.5 w-2.5">
      <span className="absolute inset-0 rounded-full bg-green-300 animate-ping" />
      <span className="absolute inset-0.5 rounded-full bg-green-300" />
    </span>
  );

  const Badge = ({ children }: { children: ReactNode }) => (
    <p className="inline-flex items-center gap-2 rounded-full border border-black/50 px-4 py-1.5 text-sm">
      <Ping />
      {children}
    </p>
  );
  return (
    <PageTransition>
      <HeroBanner
        title={blogHero.title}
        breadcrumb={blogHero.breadcrumb}
        image={blogHero.image}
      />

      {/* Featured Post */}
      <SectionWrapper>
        <Link href={`/blog/${featured.slug}`} className="group block">
          <GlassCard
            className="p-0 overflow-hidden border-white/10 hover:border-(--primary-color) transition"
            height="h-auto"
            hoverEffect="scale"
            overlayOpacity="bg-black/20"
            contentPadding="p-0"
          >
            <div className="grid gap-0 lg:grid-cols-2 min-h-[500px]">
              {/* Image Side */}
              <div className="relative h-64 lg:h-full overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content Side */}
              <div className="p-8 lg:p-10 flex flex-col justify-center bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm">
                <div className="flex flex-wrap items-center gap-3 text-sm mb-4">
                  <span className="px-3 py-1 rounded-full bg-(--primary-color)/20 ) font-medium">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1 text-white/70">
                    <FiClock size={14} /> {featured.readTime}
                  </span>
                </div>

                <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-(--color-accent) transition">
                  {featured.title}
                </p>

                <p className="text-white/80 mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>

                <div className="flex items-center gap-3 text-sm text-white/80 border-t border-white/10 pt-4 group-hover:text-(--color-accent)">
                  <span className="flex items-center gap-1">
                    <FiUser size={14} /> {featured.author}
                  </span>
                  <span>•</span>
                  <span>{featured.date}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </Link>
      </SectionWrapper>

      {/* Recent Posts */}
      <SectionWrapper fullBleed>
        <section className="bg-(--color-primary) rounded-2xl py-24 px-6">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-white/60">
              Recent
            </p>
            <p className="mt-2 text-3xl md:text-4xl font-bold text-white">
              Latest Articles
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {recent.map((post, i) => (
              <BlogCard key={i} post={post} featured={false} />
            ))}
          </div>
        </section>
      </SectionWrapper>

      {/* All Posts */}
      <SectionWrapper>
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {blogCategories.map((cat, i) => (
            <button
              key={i}
              className="px-5 py-2 rounded-full text-sm border border-white/20 hover:bg-(--primary-color) hover:text-white hover:border-(--primary-color) transition-all"
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <BlogCard key={i} post={post} featured={false} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button label="Load More" icon={FiArrowRight} className="group" />
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}

function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <GlassCard
        className="p-0 overflow-hidden border-white/10 hover:border-(--primary-color)/30 transition-all h-full"
        height="h-full"
        hoverEffect="both"
        overlayOpacity="bg-black/40"
        glowColor="bg-(--primary-color)/20"
        contentPadding="p-0"
      >
        {/* Image Container with Overlay Text */}
        <div className="relative h-72 w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-110"
          />

          {/* Dark gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Category Badge - top left */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium border border-white/20 z-10">
            {post.category}
          </span>

          {/* Text Content Over Image - Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white z-10">
            {/* Meta Info */}
            <div className="flex items-center justify-between text-xs text-white/80 mb-2">
              <span className="flex items-center gap-1">
                <FiUser size={12} /> {post.author}
              </span>
              <span className="flex items-center gap-1">
                <FiClock size={12} /> {post.readTime}
              </span>
            </div>

            {/* Title */}
            <p className="text-lg font-semibold text-white group-hover:text-(--color-accent) transition line-clamp-2 mb-1">
              {post.title}
            </p>

            {/* Excerpt */}
            <p className="text-sm text-white/80 line-clamp-2 mb-2">
              {post.excerpt}
            </p>

            {/* Date */}
            <div className="text-xs text-white/60">{post.date}</div>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
