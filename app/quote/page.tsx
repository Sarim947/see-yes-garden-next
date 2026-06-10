import Image from "next/image";
import { ReadyProjectCta, SiteFooter } from "@/components/FooterSections";

const solutionCards = [
  ["Custom Size", "Tailored to your exact dimensions", "▧"],
  ["Custom Color", "Multiple colors and finishes", "▥"],
  ["OEM / ODM Service", "Design and develop as your brand", "⚙"],
  ["Logo & Packaging", "Custom logo and packaging", "▤"],
  ["Bulk Order Support", "Large quantity with best terms", "▣"],
];

const products = [
  "Aluminum Pergola",
  "Metal Shed",
  "Raised Garden Bed",
  "Greenhouse",
  "Carport",
  "Other",
];

const customNeeds = [
  "Custom Size",
  "Custom Color",
  "Logo",
  "Packaging",
  "OEM / ODM",
  "Full Project Solution",
];

const footerBenefits = [
  ["Factory Direct Price", "Competitive pricing from our own factory.", "▥"],
  ["OEM & ODM Support", "Professional team to support your brand.", "◇"],
  ["Fast Production", "Efficient lead time and stable quality.", "◷"],
  ["On-time Delivery", "Reliable logistics to your destination.", "▭"],
];

export default function QuotePage() {
  return (
    <main className="quote-page">
      <header className="site-header">
        <a className="brand" href="/">
          <span className="brand-mark">SEE</span>
          <span>SEEYES GARDEN</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="/">HOME</a>
          <a href="/#products">PRODUCTS</a>
          <a href="/#about">ABOUT</a>
          <a href="/#projects">NEWS</a>
          <a href="/#process">SUPPORT</a>
          <a href="/contact">CONTACT US</a>
        </nav>
        <a className="header-cta" href="/quote">
          GET QUOTE
        </a>
      </header>

      <section className="quote-hero">
        <Image
          src="/images/slide-pergola.webp"
          alt="Custom outdoor pergola project"
          fill
          priority
          sizes="100vw"
        />
        <div className="quote-hero-copy">
          <h1>Start Your Custom Project</h1>
          <p>
            OEM/ODM outdoor structure solutions with custom size, color,
            packaging and bulk supply.
          </p>
        </div>
      </section>

      <section className="quote-cards">
        {solutionCards.map(([title, text, icon]) => (
          <article key={title}>
            <span>{icon}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="quote-form-panel">
        <div className="quote-form-heading">
          <span>▤</span>
          <div>
            <h2>Custom Outdoor Structure Inquiry</h2>
            <p>Please fill in the form below. Our sales team will contact you within 24 hours.</p>
          </div>
        </div>

        <form className="quote-form" action="/api/contact" method="post" encType="multipart/form-data">
          <div className="quote-group">
            <strong>Product Type *</strong>
            <div className="checkbox-grid">
              {products.map((item) => (
                <label key={item}>
                  <input name="productType" type="checkbox" value={item} />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="quote-group">
            <strong>Customization Needed *</strong>
            <div className="checkbox-grid">
              {customNeeds.map((item) => (
                <label key={item}>
                  <input name="customization" type="checkbox" value={item} />
                  {item}
                </label>
              ))}
            </div>
          </div>

          <div className="quote-group">
            <strong>Upload Drawing or Reference Image</strong>
            <label className="quote-upload">
              <input name="attachment" type="file" accept=".jpg,.jpeg,.png,.webp,.pdf,.dwg,.dxf" />
              <span>Click to upload or drag and drop</span>
              <small>JPG, PNG, PDF, CAD files up to 20MB</small>
            </label>
          </div>

          <div className="quote-fields">
            <input name="name" required placeholder="Your Name *" />
            <input name="phone" placeholder="WhatsApp" />
            <input name="email" required type="email" placeholder="Email *" />
            <select name="materialPreference" defaultValue="">
              <option value="" disabled>
                Select Material
              </option>
              <option>Aluminum</option>
              <option>Galvanized Steel</option>
              <option>Polycarbonate</option>
              <option>Not Sure Yet</option>
            </select>
            <select name="country" defaultValue="">
              <option value="" disabled>
                Select Country / Market
              </option>
              <option>USA</option>
              <option>Canada</option>
              <option>Australia</option>
              <option>Europe</option>
              <option>Other</option>
            </select>
            <input name="quantity" placeholder="Order Quantity" />
          </div>

          <textarea
            name="message"
            required
            maxLength={1000}
            placeholder="Please describe your project, size, design idea, special requirements, etc. *"
            rows={5}
          />

          <button type="submit">Submit Custom Request →</button>
        </form>
      </section>

      <section className="quote-benefits">
        {footerBenefits.map(([title, text, icon]) => (
          <article key={title}>
            <span>{icon}</span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </section>

      <ReadyProjectCta />
      <SiteFooter />
    </main>
  );
}
