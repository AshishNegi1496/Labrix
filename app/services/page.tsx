import Link from 'next/link';
import PageTransition from '@/components/PageTransition';
import SectionWrapper from '@/components/SectionWrapper';
import Ticker from '@/components/Ticker';
import HeroBanner from '@/components/HeroBanner';

const heroImage = 'https://picsum.photos/seed/labrix-services-hero/1600/900';

const services = [
  {
    title: 'Analytical testing',
    text: 'High precision assays with clear reporting cycles.',
  },
  {
    title: 'Biomedical research',
    text: 'Custom lab programs built for clinical rigor.',
  },
  {
    title: 'Toxicology analysis',
    text: 'Compound safety and validation workflows.',
  },
  {
    title: 'Environmental science',
    text: 'Data-driven monitoring for critical environments.',
  },
  {
    title: 'Diagnostics',
    text: 'Rapid testing for high confidence decision making.',
  },
  {
    title: 'Innovation lab',
    text: 'Prototyping new research pathways with speed.',
  },
];

const stats = [
  { value: '980+', label: 'Projects delivered' },
  { value: '4.8', label: 'Client satisfaction' },
  { value: '24/7', label: 'Lab monitoring' },
  { value: '18', label: 'Research hubs' },
];

export default function Services() {
  return (
    <PageTransition>
      <HeroBanner
        title='Our services'
        breadcrumb='Home / Our Services'
        image={heroImage}
      />
      <Ticker />

      <SectionWrapper>
        <div className='grid gap-6 md:grid-cols-3'>
          {services.map((service) => (
            <div
              key={service.title}
              className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'
            >
              <h3 className='text-lg font-semibold'>{service.title}</h3>
              <p className='mt-2 text-sm text-[var(--muted-color)]'>
                {service.text}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className='rounded-3xl bg-[var(--primary-color)] p-8 md:p-12 text-white'>
          <div className='grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center'>
            <div>
              <p className='text-xs uppercase tracking-[0.4em] text-white/60'>
                Performance
              </p>
              <h2 className='mt-4 text-3xl md:text-4xl font-semibold'>
                98% client retention across long-term engagements
              </h2>
              <p className='mt-4 text-sm md:text-base text-white/70'>
                Our lab partners stay with us because we keep clarity and
                accountability at every stage.
              </p>
              <div className='mt-6'>
                <Link href='/contact' className='btn-default btn-sm'>
                  Start a project
                </Link>
              </div>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className='rounded-2xl border border-white/15 bg-white/5 p-4'
                >
                  <p className='text-2xl font-semibold'>{stat.value}</p>
                  <p className='mt-2 text-xs text-white/70'>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className='rounded-3xl bg-[var(--accent-color)] p-8 md:p-12'>
          <div className='grid gap-8 lg:grid-cols-[1.1fr_1fr] items-center'>
            <div>
              <p className='text-xs uppercase tracking-[0.4em] text-[var(--primary-color)]'>
                Engagement
              </p>
              <h3 className='mt-4 text-3xl font-semibold text-[var(--primary-color)]'>
                One team, one roadmap
              </h3>
              <p className='mt-4 text-sm md:text-base text-[var(--primary-color)] opacity-80'>
                We operate like an embedded partner with weekly demos, shared
                channels, and clear milestones.
              </p>
            </div>
            <div className='h-64 rounded-3xl bg-white/90 shadow-sm' />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className='mx-auto h-52 w-52 rounded-3xl bg-[var(--accent-color)]' />
      </SectionWrapper>
    </PageTransition>
  );
}
