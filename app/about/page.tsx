import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import SectionWrapper from '@/components/SectionWrapper';
import Ticker from '@/components/Ticker';
import HeroBanner from '@/components/HeroBanner';

const images = {
  hero: 'https://picsum.photos/seed/labrix-about-hero/1600/900',
  card1: 'https://picsum.photos/seed/labrix-about-1/640/480',
  card2: 'https://picsum.photos/seed/labrix-about-2/640/480',
  card3: 'https://picsum.photos/seed/labrix-about-3/640/480',
  wide: 'https://picsum.photos/seed/labrix-about-wide/1400/700',
};

const storyCards = [
  {
    title: 'How does it work',
    text: 'Structured discovery and lab validation.',
    image: images.card1,
  },
  {
    title: 'Research partners',
    text: 'Cross-disciplinary collaborations worldwide.',
    image: images.card2,
  },
  {
    title: 'Inside the lab',
    text: 'Modern facilities with transparent workflows.',
    image: images.card3,
  },
];

const testimonials = [
  {
    quote: 'Labrix delivered clarity and momentum to our research program.',
    name: 'Elena Ford',
    role: 'Chief Scientist, Novalab',
  },
  {
    quote: 'Their team kept every stakeholder aligned from week one.',
    name: 'Tariq Wells',
    role: 'Operations Lead, BioPulse',
  },
];

export default function About() {
  return (
    <PageTransition>
      <HeroBanner
        title='About us'
        breadcrumb='Home / About Us'
        image={images.hero}
      />
      <Ticker />

      <SectionWrapper>
        <div className='grid gap-10 lg:grid-cols-[1.1fr_1fr] items-start'>
          <div>
            <p className='text-xs uppercase tracking-[0.4em] text-[var(--muted-color)]'>
              About Labrix
            </p>
            <h2 className='mt-4 text-3xl md:text-4xl font-semibold'>
              Pioneering scientific research to transform knowledge into
              real-world solutions
            </h2>
            <p className='mt-4 text-sm md:text-base text-[var(--muted-color)]'>
              We are a multidisciplinary lab and research partner committed to
              reliable results, repeatable processes, and shared outcomes.
            </p>
            <div className='mt-6'>
              <Link href='/contact' className='btn-default btn-sm'>
                Work with us
              </Link>
            </div>
            <div className='mt-8 flex items-center gap-3 text-sm text-[var(--muted-color)]'>
              <div className='flex -space-x-2'>
                <span className='h-8 w-8 rounded-full border border-white/40 bg-slate-200' />
                <span className='h-8 w-8 rounded-full border border-white/40 bg-slate-300' />
                <span className='h-8 w-8 rounded-full border border-white/40 bg-slate-100' />
              </div>
              Proven track record across global research partners
            </div>
          </div>
          <div className='grid gap-6 sm:grid-cols-2'>
            {storyCards.map((card) => (
              <div
                key={card.title}
                className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'
              >
                <div
                  className='h-36 rounded-xl bg-slate-200 bg-cover'
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <h3 className='mt-4 text-base font-semibold'>{card.title}</h3>
                <p className='mt-2 text-xs text-[var(--muted-color)]'>
                  {card.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className='rounded-3xl bg-[var(--accent-color)] p-8 md:p-12'>
          <div className='grid gap-8 lg:grid-cols-[1.1fr_1fr] items-center'>
            <div>
              <p className='text-xs uppercase tracking-[0.4em] text-[var(--primary-color)]'>
                Our mission
              </p>
              <h3 className='mt-4 text-3xl font-semibold text-[var(--primary-color)]'>
                Advancing research with disciplined scientific rigor
              </h3>
              <p className='mt-4 text-sm md:text-base text-[var(--primary-color)] opacity-80'>
                We invest in modern facilities, expert teams, and clear
                protocols to shorten the distance between questions and
                answers.
              </p>
              <div className='mt-6'>
                <Link href='/services' className='btn-default btn-sm'>
                  Our services
                </Link>
              </div>
            </div>
            <div className='h-56 rounded-3xl bg-white/90 shadow-sm' />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className='grid gap-8 lg:grid-cols-[1fr_1fr] items-center'>
          <div
            className='h-64 rounded-3xl bg-slate-200 bg-cover'
            style={{ backgroundImage: `url(${images.card2})` }}
          />
          <div>
            <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
              <p className='text-3xl font-semibold text-[var(--primary-color)]'>
                12+
              </p>
              <p className='mt-2 text-xs text-[var(--muted-color)]'>
                Years of continuous research programs
              </p>
            </div>
            <p className='mt-4 text-sm text-[var(--muted-color)]'>
              Our teams stay embedded in client challenges, providing
              consistent guidance and scalable research workflows.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className='rounded-3xl bg-[var(--primary-color)] p-8 md:p-12 text-white'>
          <div className='flex flex-wrap items-end justify-between gap-6'>
            <div>
              <p className='text-5xl font-semibold'>98%</p>
              <p className='mt-2 text-sm text-white/70'>
                Environmental science accuracy
              </p>
            </div>
            <div className='max-w-sm text-sm text-white/70'>
              Our lab delivers data-driven insights that protect ecosystems and
              guide strategic decisions.
            </div>
          </div>
        </div>
      </SectionWrapper>

      <section className='py-10'>
        <div className='section-shell'>
          <div
            className='h-72 rounded-3xl bg-slate-200 bg-cover'
            style={{ backgroundImage: `url(${images.wide})` }}
          />
        </div>
      </section>

      <SectionWrapper>
        <div className='rounded-3xl bg-[var(--primary-color)] p-8 md:p-12 text-white'>
          <div className='text-center'>
            <p className='text-xs uppercase tracking-[0.4em] text-white/60'>
              Testimonials
            </p>
            <h2 className='mt-4 text-3xl md:text-4xl font-semibold'>
              Trusted by research leaders across disciplines
            </h2>
          </div>
          <div className='mt-10 grid gap-6 md:grid-cols-2'>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className='rounded-3xl bg-white p-6 text-[var(--primary-color)]'
              >
                <p className='text-sm'>{testimonial.quote}</p>
                <div className='mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--muted-color)]'>
                  {testimonial.name}
                </div>
                <div className='text-xs text-[var(--muted-color)]'>
                  {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className='mx-auto h-48 w-64 rounded-3xl bg-[var(--accent-color)]' />
      </SectionWrapper>
    </PageTransition>
  );
}
