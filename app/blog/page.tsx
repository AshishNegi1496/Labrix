import PageTransition from "@/components/PageTransition";
import SectionWrapper from "@/components/SectionWrapper";
import Ticker from "@/components/Ticker";
import HeroBanner from "@/components/HeroBanner";
import { Card } from "@/components/ui/Card";

const heroImage = "https://picsum.photos/seed/labrix-blog-hero/1600/900";

const posts = [
  {
    title: "Lab operations built for clarity",
    date: "Feb 18, 2026",
    image: "https://picsum.photos/seed/labrix-blog-1/640/480",
  },
  {
    title: "The rise of connected diagnostics",
    date: "Jan 29, 2026",
    image: "https://picsum.photos/seed/labrix-blog-2/640/480",
  },
  {
    title: "Why testing workflows need calm",
    date: "Jan 05, 2026",
    image: "https://picsum.photos/seed/labrix-blog-3/640/480",
  },
];

export default function Blog() {
  return (
    <PageTransition>
      <HeroBanner
        title="Our blog"
        breadcrumb="Home / Our Blog"
        image={heroImage}
      />
      <Ticker />

      <SectionWrapper>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.title} className="p-4">
              <div
                className="h-40 rounded-2xl bg-slate-200 bg-cover"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-[var(--muted-color)]">
                {post.date}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
              <p className="mt-2 text-xs text-[var(--muted-color)]">
                Field notes on product research, lab strategy, and innovation.
              </p>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </PageTransition>
  );
}
