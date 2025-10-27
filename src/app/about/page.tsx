import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export const metadata = {
  title: 'About Us - BlocksBridge',
  description: 'Learn about BlocksBridge strategic communications firm for Bitcoin miners and treasury companies.',
};

interface Service {
  id: number;
  title: string;
  description: string;
}

async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error fetching services:', error);
    return [];
  }

  return data || [];
}

export default async function About() {
  const services = await getServices();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-800 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-400 via-blue-800 to-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-6">About BlocksBridge</h1>
          <p className="text-xl md:text-2xl font-light">
            Strategic communications for the Bitcoin ecosystem
          </p>
        </div>
      </section>

      {/* Company Narrative */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            Founded by an industry expert with deep knowledge of Bitcoin infrastructure and capital markets, BlocksBridge brings senior-level strategic communications expertise to Bitcoin miners, treasury companies, and hyperscalers.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We believe that clear communication builds trust. In an industry as complex as Bitcoin mining and digital infrastructure, companies need partners who understand both the technology and the business. We're that partner.
          </p>
          <p className="text-lg text-gray-700">
            Our core values guide every engagement: senior time on every mandate, clarity over volume, and confidentiality and trust above all else.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Senior Time on Every Mandate</h3>
              <p className="text-gray-600">
                You work directly with experienced strategists, not junior staff. We bring senior-level thinking to every engagement.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Clarity Over Volume</h3>
              <p className="text-gray-600">
                We believe in quality over quantity. Our communications are focused, clear, and designed for impact.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Confidentiality and Trust</h3>
              <p className="text-gray-600">
                Your business is sensitive. We maintain strict confidentiality and operate with the highest integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">How We Can Help</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className="text-lg mb-8">We're ready to discuss how BlocksBridge can support your communications strategy.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
