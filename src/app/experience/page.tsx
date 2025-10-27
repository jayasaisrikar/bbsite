import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'Our Experience - BlocksBridge',
  description: 'See the brands we\'ve worked with and testimonials from our clients.',
};

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  company: string;
}

async function getClients(): Promise<string[]> {
  const { data, error } = await supabase
    .from('clients')
    .select('name')
    .order('id');

  if (error) {
    console.error('Error fetching clients:', error);
    return [];
  }

  return data?.map(client => client.name) || [];
}

async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials_experience')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return data || [];
}

export default async function Experience() {
  const clients = await getClients();
  const testimonials = await getTestimonials();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-800 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-400 via-blue-800 to-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-6">Our Experience</h1>
          <p className="text-xl md:text-2xl font-light">
            Proven results for leading Bitcoin companies
          </p>
        </div>
      </section>

      {/* Brands We've Worked With */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Brands We've Worked With</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, idx) => (
              <div key={idx} className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-32">
                <p className="font-bold text-center text-gray-700">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Results That Matter</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Investor Confidence</h3>
              <p className="text-gray-600 mb-4">
                Clients maintained consistent buy‑side understanding across price cycles by keeping disclosure cadence steady and narrative consistent.
              </p>
              <p className="text-sm text-gray-500">Result: Stable stock price and investor relations</p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Operational Support</h3>
              <p className="text-gray-600 mb-4">
                Programs that addressed power, noise, and jobs improved local sentiment and reduced friction in permitting and operations.
              </p>
              <p className="text-sm text-gray-500">Result: Faster permitting and smoother operations</p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Media Relations</h3>
              <p className="text-gray-600 mb-4">
                Targeted education of analysts and reporters led to more accurate articles and fewer corrections, which reduced time spent on reactive work.
              </p>
              <p className="text-sm text-gray-500">Result: Higher quality media coverage</p>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Stakeholder Alignment</h3>
              <p className="text-gray-600 mb-4">
                Clear materials for utilities, landowners, and equipment partners shortened review loops and gave executives a shared script.
              </p>
              <p className="text-sm text-gray-500">Result: Faster partnership agreements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Testimonials</h2>
          <div className="grid md:grid-cols-1 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-lg border-l-4 border-blue-600">
                <p className="text-gray-700 mb-6 italic text-lg">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-lg">{testimonial.author}</p>
                  <p className="text-gray-600">{testimonial.title}</p>
                  <p className="text-gray-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Add Your Success Story?</h2>
          <p className="text-lg mb-8">Let's discuss how BlocksBridge can help your company achieve similar results.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Get in touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
