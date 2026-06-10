import Image from "next/image";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { ReadyProjectCta, SiteFooter } from "@/components/FooterSections";
import SiteHeader from "@/components/SiteHeader";

const contactInfo = [
  ["Email", "edison@seeyesgarden.com", "✉"],
  ["Phone / WhatsApp", "+86 15325897927", "☎"],
  [
    "Address",
    "NO. 3988, BINHONG WEST ROAD, WUCHENG DISTRICT, JINHUA, ZHEJIANG 321000, CHINA",
    "●",
  ],
  ["Business Hours", "Monday - Saturday, 9:00 AM - 6:00 PM", "◷"],
];

const reasons = [
  ["Factory Direct Supply", "Direct quotation and manufacturing support from our factory team.", "▥"],
  ["OEM / ODM Customization", "Custom size, color, material, logo and packaging for bulk orders.", "✕"],
  ["Multiple Product Categories", "Garden beds, sheds, planters, screens, pergolas and more.", "▦"],
  ["Fast Response", "Send your requirements and our sales team will reply as soon as possible.", "☏"],
];

const faqs = [
  [
    "Are you a factory or trading company?",
    "We are a factory supplier for outdoor structures and garden products. Our team can support direct quotation, production details, packaging and export coordination.",
  ],
  [
    "Can I customize product size, color and packaging?",
    "Yes. We support custom dimensions, powder coating colors, logo labels, manuals, cartons and private label packaging for wholesale and project orders.",
  ],
  [
    "How can I get a quotation?",
    "Please send product type, size, quantity, destination country and any reference drawings. Clear details help us calculate the most accurate factory price.",
  ],
  [
    "Do you support OEM / ODM orders?",
    "Yes. We can work from your drawings, samples, photos or market requirements, then provide product suggestions and production solutions.",
  ],
  [
    "How soon can I get a reply?",
    "Our sales team usually replies within 24 hours on business days. Urgent requests can also be sent through WhatsApp for faster communication.",
  ],
];

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />

      <section className="contact-hero">
        <Image
          src="/images/factory-about.webp"
          alt="SeeYes Garden factory"
          fill
          priority
          sizes="100vw"
        />
        <div>
          <p className="eyebrow">Contact Us</p>
          <h1>Contact Us</h1>
          <p>
            Get in touch with our factory team for product quotations,
            customization, bulk orders and OEM/ODM cooperation.
          </p>
          <a className="primary-btn" href="/quote">
            Request A Quote
          </a>
        </div>
      </section>

      <div className="contact-page-wrap">
        <section className="contact-panel">
          <h2>Factory Contact Information</h2>
          <div className="contact-info-list">
            {contactInfo.map(([title, text, icon]) => (
              <article key={title}>
                <span>{icon}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-panel" id="inquiry">
          <h2>Send Your Inquiry</h2>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </section>

        <section className="contact-panel">
          <h2>Our Factory Location</h2>
          <div className="map-frame">
            <iframe
              title="SeeYes Garden factory location"
              src="https://www.google.com/maps?q=NO.%203988%2C%20BINHONG%20WEST%20ROAD%2C%20WUCHENG%20DISTRICT%2C%20JINHUA%2C%20ZHEJIANG%20321000%2C%20CHINA&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="contact-panel">
          <h2>Why Contact Our Factory</h2>
          <div className="reason-grid">
            {reasons.map(([title, text, icon]) => (
              <article key={title}>
                <span>{icon}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-panel">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>

      <ReadyProjectCta />
      <SiteFooter />
    </main>
  );
}
