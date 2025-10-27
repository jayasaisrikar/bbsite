import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Reveal from '@/components/ui/Reveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import NetworkCarousel from '@/components/NetworkCarousel';
import LatestPosts from '@/components/LatestPosts';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { TeamMembers } from '@/components/TeamMembers';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'BlocksBridge - Bitcoin-native Communications',
  description: 'Strategic communications for Bitcoin miners, treasury companies, and hyperscalers.',
};

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  company: string;
}

async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials_home')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data || [];
}

export default async function Home() {
  const testimonials = await getTestimonials();
  // Fetch latest posts server-side and pass to LatestPosts component
  let getPosts = [];
  try {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (backend) {
      const res = await fetch(
        `${backend}/wp-json/wp/v2/posts?acf_format=standard&per_page=4&_=${Date.now()}`,
        { next: { revalidate: 3600 } }
      );
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json)) getPosts = json;
      } else {
        console.error('Home: WP fetch failed', res.status, res.statusText);
      }
    } else {
      console.warn('Home: NEXT_PUBLIC_BACKEND_URL not set; LatestPosts will fallback');
    }
  } catch (e) {
    console.error('Home: fetch error', e);
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative h-[1200px] md:h-[100vh] bg-center bg-cover md:bg-fixed text-white flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      >
        <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-blue-900 via-blue-800 to-black"></div>
        <Reveal>
          <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-[64px] lg:text-[72px] font-extrabold mb-6 leading-tight tracking-tight">
              Bitcoin-native communications
              <span className="block text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] font-semibold mt-3 md:mt-6">for miners, treasury companies, and hyperscalers</span>
            </h1>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-red-500 hover:bg-gray-100">
                Get in touch
              </Button>
            </Link>
          </div>
        </Reveal>
      </section>

  {/* About BlocksBridge Section */}
  <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  About <span className="text-red-600">BlocksBridge</span>
                </h2>
              </Reveal>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We believe energy and capital should move freely to unlock an age of abundance. The companies building that future in hyperscale infrastructure, AI, and Bitcoin need communications that match their pace. We work with pioneers of the new industrial frontier.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✓</span>
                  <span className="text-gray-700">Senior time on every mandate.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✓</span>
                  <span className="text-gray-700">Clarity over volume.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✓</span>
                  <span className="text-gray-700">Sensible conflict management across close competitors</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-xl mt-1">✓</span>
                  <span className="text-gray-700">Confidentiality and trust.</span>
                </div>
              </div>
              <Link href="/about">
                <Button size="lg" variant="outline" className="mt-8">
                  About Us
                </Button>
              </Link>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center overflow-hidden">

              <Image
                src="/images/about.png"
                alt="Global infrastructure network"
                fill
                className="object-cover"
              />


            </div>
          </div>
        </div>
      </section>

      {/* What We Solve Section */}
  <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl font-bold mb-8 text-center">What we solve</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bitcoin Mining Companies */}
            <Reveal>
              <div className="group border-2 border-gray-300 rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative h-96 bg-gradient-to-b from-orange-400 via-orange-500 to-blue-900 flex items-end justify-end p-4">
                  <Image src="/images/img1.png" alt="Bitcoin mining infrastructure" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/40" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-lg font-bold mb-3 text-green-700">For Bitcoin Mining Companies</h3>
                  <p className="text-gray-700 text-sm">
                    You need a clear, durable story that works through price swings, satisfies investors, and earns community trust. We align executive, investor, and public messaging with consistent cadence.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Bitcoin Treasury Companies */}
            <Reveal>
              <div className="group border-2 border-gray-300 rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative h-96 bg-gradient-to-b from-yellow-600 via-orange-600 to-black flex items-end justify-end p-4">
                  <Image src="/images/img2.png" alt="Treasury and finance" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/40" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-lg font-bold mb-3">For Bitcoin Treasury Companies</h3>
                  <p className="text-gray-700 text-sm">
                    We explain strategy, controls, execution, and risk in simple terms whether it is covering custody, security, liquidity, and market execution, so boards and investors can underwrite with confidence.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Hyperscalers and Energy */}
            <Reveal>
              <div className="group border-2 border-gray-300 rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="relative h-96 bg-gradient-to-b from-blue-400 via-orange-400 to-orange-600 flex items-end justify-end p-4">
                  <Image src="/images/img3.png" alt="Hyperscale energy infrastructure" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/40" />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-lg font-bold mb-3">For Hyperscalers And Energy Infrastructure</h3>
                  <p className="text-gray-700 text-sm">
                    At the intersection of power, land, and compute, we position you with partners, regulators, and communities to build trust at the pace of your growth.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services Section removed from here and will be re-inserted before Testimonials */}

      {/* BlocksBridge Network Section */}
  <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl font-bold mb-12">
              The <span className="text-red-500">BlocksBridge</span> Network
            </h2>
          </Reveal>
          <NetworkCarousel />
        </div>
      </section>

  {/* Latest Posts from TheMinerMag */}
  <LatestPosts getPosts={getPosts} />

      {/* Re-inserted: How We Can Help (Services) - moved to be just above Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">How <span className="text-red-500">We</span> Can Help</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="narrative">
              <AccordionTrigger className="text-lg md:text-xl font-medium">
                Corporate narrative and message architecture
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Define a clear value proposition, proof points, and phrases that your executive team can repeat in every setting. We document the narrative, align it with investor goals, and keep it current as the plan evolves.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="earnings">
              <AccordionTrigger className="text-lg md:text-xl font-medium">
                Earnings and disclosure program
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Strategic planning and execution of quarterly earnings and disclosure communications to maintain consistent investor relations and market confidence.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="media">
              <AccordionTrigger className="text-lg md:text-xl font-medium">
                Media and analyst relations
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Direct engagement with key media outlets and analyst relationships in the Bitcoin and energy sectors to ensure accurate coverage and positioning.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="community">
              <AccordionTrigger className="text-lg md:text-xl font-medium">
                Community and regulator engagement
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Building and maintaining relationships with local communities and regulatory bodies to support operations and reduce friction in permitting.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="crisis">
              <AccordionTrigger className="text-lg md:text-xl font-medium">
                Issues and crisis management
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Strategic response planning and execution for sensitive or crisis situations to protect brand reputation and stakeholder confidence.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="growth">
              <AccordionTrigger className="text-lg md:text-xl font-medium">
                Growth transactions and partnerships
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Communications strategy for M&A, partnerships, and major corporate announcements to maximize value and market reception.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="events">
              <AccordionTrigger className="text-lg md:text-xl font-medium">
                Events and field programs
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                High-impact events and field programs that bring stakeholders together for meaningful conversations and relationship building.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="research">
              <AccordionTrigger className="text-lg md:text-xl font-medium">
                Research-informed content
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-600">
                Develop thought leadership through research-backed content that positions your company as an industry authority and trusted advisor.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-1 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl font-bold mb-12 text-center">Testimonials</h2>
          </Reveal>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Team Section */}
  <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl font-bold mb-12 text-center">Meet Our Team</h2>
          </Reveal>
          <TeamMembers />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-red-500 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <Reveal>
            <h2 className="text-4xl font-bold mb-6">Ready to level up your communications?</h2>
          </Reveal>
          <p className="text-lg mb-8">Let's talk about how we can help your business.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-red-500 hover:bg-gray-100">
              Get in touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
