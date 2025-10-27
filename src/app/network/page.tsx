import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Network - BlocksBridge',
  description: 'The Miner Mag, Miner Weekly, and Bitcoin mining events.',
};

export default function Network() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-800 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-400 via-blue-800 to-black"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-6">Our Network</h1>
          <p className="text-xl md:text-2xl font-light">
            Publications, newsletters, and events for the Bitcoin ecosystem
          </p>
        </div>
      </section>

      {/* Network Items */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-1 gap-12">
            {/* The Miner Mag */}
            <div className="flex md:flex-row flex-col gap-8 items-center">
              <div className="md:w-1/2">
                <div className="w-full h-96 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">📰</div>
                    <p className="text-xl font-semibold">The Miner Mag</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-4xl font-bold mb-4">The Miner Mag</h2>
                <p className="text-lg text-gray-600 mb-4">
                  An editorially independent publication focused on Bitcoin mining. Known for accurate, data‑driven reporting and analysis on market structure and company activity.
                </p>
                <p className="text-gray-600 mb-6">
                  TheMinerMag operates independently. BlocksBridge may reference its public research and data. Editorial decisions remain with TheMinerMag.
                </p>
                <Link href="https://theminermag.com" target="_blank">
                  <Button size="lg">Visit The Miner Mag</Button>
                </Link>
              </div>
            </div>

            {/* Miner Weekly */}
            <div className="flex md:flex-row flex-col gap-8 items-center">
              <div className="md:w-1/2 md:order-2">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=400&fit=crop"
                  alt="Miner Weekly"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-1/2 md:order-1">
                <h2 className="text-4xl font-bold mb-4">Miner Weekly</h2>
                <p className="text-lg text-gray-600 mb-4">
                  The most read weekly for investors, analysts, bankers, and operators who follow Bitcoin mining. Backed by data and research. Free signup and no spam.
                </p>
                <p className="text-gray-600 mb-6">
                  Subscribe to get curated insights, market analysis, and industry news delivered to your inbox every week.
                </p>
                <Link href="https://theminermag.com" target="_blank">
                  <Button size="lg">Subscribe to Miner Weekly</Button>
                </Link>
              </div>
            </div>

            {/* Events */}
            <div className="flex md:flex-row flex-col gap-8 items-center">
              <div className="md:w-1/2">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                  alt="Events"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-4xl font-bold mb-4">Events</h2>
                <p className="text-lg text-gray-600 mb-4">
                  High‑signal gatherings for operators, investors, and infrastructure leaders. We host private roundtables and site tours by request.
                </p>
                <p className="text-gray-600 mb-6">
                  Our events bring together key decision-makers in the Bitcoin mining and infrastructure space for meaningful conversations and networking.
                </p>
                <Link href="/contact">
                  <Button size="lg">Inquire About Events</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Stay Connected</h2>
          <p className="text-lg text-gray-700 mb-8">
            Get the latest updates on Bitcoin mining, energy infrastructure, and industry insights.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="https://theminermag.com" target="_blank">
              <Button size="lg" variant="outline">
                Visit The Miner Mag
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg">Get in Touch</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
