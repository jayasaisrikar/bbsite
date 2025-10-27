'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In production, you would send this to your backend/Supabase
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', company: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-blue-900 to-blue-800 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop"
            alt="Contact"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl font-light">
            Let's discuss how we can help your business
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <a href="mailto:consult@blocksbridge.com" className="text-blue-600 hover:text-blue-800">
                  consult@blocksbridge.com
                </a>
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Follow Us</h3>
                <div className="space-y-2">
                  <a href="https://www.linkedin.com/company/blocksbridge" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">
                    LinkedIn →
                  </a>
                  <a href="https://x.com/BlocksBridge_" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">
                    Twitter/X →
                  </a>
                  <a href="https://www.facebook.com/BlocksBridge" target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">
                    Facebook →
                  </a>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold mb-2">Quick Response</h3>
                <p className="text-sm text-gray-600">
                  We typically respond to inquiries within 24 hours.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
              
              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6">
                  Thank you! We've received your message and will get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    How can we help you? *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your communications needs..."
                    rows={6}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="mt-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>What industries do you specialize in?</AccordionTrigger>
                <AccordionContent>
                  We focus on Bitcoin miners, Bitcoin treasury companies and hyperscale energy and infrastructure providers. Our team has deep domain experience in energy, capital markets and crypto-native communications.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2">
                <AccordionTrigger>How quickly can you start a project?</AccordionTrigger>
                <AccordionContent>
                  For standard retainers we can typically begin within 1–2 weeks. For urgent or crisis assignments, we can mobilize faster depending on availability and scope.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3">
                <AccordionTrigger>What is your pricing model?</AccordionTrigger>
                <AccordionContent>
                  We offer retainer-based work, project-based engagements, and hybrid models. We price work based on scope, seniority required and deliverables — we'll propose a model that aligns with your goals.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4">
                <AccordionTrigger>How do you handle confidentiality and conflicts?</AccordionTrigger>
                <AccordionContent>
                  Confidentiality is a core principle. We execute NDAs as needed and manage conflicts by establishing clear engagement scopes and information barriers internally where required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5">
                <AccordionTrigger>Can you work with distributed or remote teams?</AccordionTrigger>
                <AccordionContent>
                  Yes. Our team is experienced working remotely across time zones and collaborating with in-house communications, legal and executive leadership teams.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q6">
                <AccordionTrigger>How do you measure success?</AccordionTrigger>
                <AccordionContent>
                  Success metrics are defined per engagement and can include media coverage quality, investor engagement, share of voice, stakeholder sentiment, and delivery against a communications roadmap.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q7">
                <AccordionTrigger>Do you provide ongoing reporting?</AccordionTrigger>
                <AccordionContent>
                  Yes — we provide regular reporting and a cadence agreed up front, including media coverage summaries, measurement against KPIs and strategic recommendations.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

    </div>
  );
}
