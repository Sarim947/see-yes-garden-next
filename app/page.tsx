import Image from "next/image";
import {
  advantages,
  heroSlides,
  manufacturingCards,
  processSteps,
  productCategories,
  projectImages,
  testimonials,
} from "@/data/products";
import HeroCarousel from "@/components/HeroCarousel";

const navItems = [
  ["HOME", "/"],
  ["PRODUCTS", "#products"],
  ["ABOUT", "#about"],
  ["NEWS", "#projects"],
  ["SUPPORT", "#process"],
  ["CONTACT US", "/contact"],
];

export default function Home() {
  return (
    <main>
      <div className="topbar">
        <span>Email: edison@seeyesgarden.com</span>
        <span>WhatsApp: +86 15325897927</span>
      </div>

      <header className="site-header">
        <a className="brand" href="/">
          <span className="brand-mark">SEE</span>
          <span>SEEYES GARDEN</span>
        </a>
        <nav aria-label="Main navigation">
          {navItems.map(([label, href]) => (
            <a key={label} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-cta" href="/quote">
          GET QUOTE
        </a>
      </header>

      <HeroCarousel slides={heroSlides} />

      <section className="section about-section" id="about">
        <div className="about-media">
          <video autoPlay controls loop muted playsInline preload="auto">
            <source
              src="https://seeyesgarden.com/wp-content/uploads/2026/06/seeyesgarden_factory.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <p className="eyebrow">About SeeYes</p>
          <h2>Your Reliable Outdoor Structure Factory</h2>
          <p>
            SeeYes Garden is a professional manufacturer integrating design,
            production and export of outdoor structures. We support global
            distributors, wholesalers and project buyers with stable production
            capacity and OEM / ODM solutions.
          </p>
          <div className="advantage-grid">
            {advantages.map((item) => (
              <div className="advantage-item" key={item}>
                <span>✓</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
          <a className="text-link" href="#manufacturing">
            Visit Our Factory →
          </a>
        </div>
      </section>

      <section className="section product-section" id="products">
        <div className="section-heading centered">
          <p className="eyebrow">Our Products</p>
          <h2>Our Product Range</h2>
          <p>
            We provide high-quality outdoor solutions for gardens, patios, and
            outdoor living spaces.
          </p>
        </div>
        <div className="product-grid">
          {productCategories.map((category) => (
            <article className="product-card" key={category.slug}>
              <div className="product-icon">
                <Image
                  src={category.icon}
                  alt={category.title}
                  fill
                  sizes="180px"
                />
              </div>
              <div className="product-card-body">
                <h3>{category.title}</h3>
                <p>{category.summary}</p>
                <a href="/contact#inquiry">View More →</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Global Projects</p>
          <h2>Our products are trusted by partners in over 30 countries.</h2>
          <div className="filter-row">
            {["ALL", "USA", "GERMANY", "AUSTRALIA", "UK", "FRANCE", "CANADA", "MORE +"].map(
              (item) => (
                <span key={item}>{item}</span>
              ),
            )}
          </div>
        </div>
        <div className="project-grid">
          {projectImages.map((image, index) => (
            <div className="project-tile" key={`${image}-${index}`}>
              <Image src={image} alt="Global project" fill sizes="25vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="testimonial-section">
        <div className="section">
          <div className="section-heading centered">
            <p className="eyebrow">Customer Testimonials</p>
            <h2>Real Feedback from Our Customers</h2>
            <p>
              We support global distributors, wholesalers and project buyers with
              stable outdoor product manufacturing, OEM / ODM solutions and
              factory-direct supply.
            </p>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.title}>
                <div className="testimonial-photo">
                  <Image src={item.image} alt={item.title} fill sizes="360px" />
                  <span>{item.badge}</span>
                </div>
                <div className="testimonial-copy">
                  <div className="quote-mark">“</div>
                  <p>{item.quote}</p>
                  <div className="testimonial-author">
                    <span>{item.initial}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <small>{item.customer}</small>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="section-heading centered">
          <p className="eyebrow">OEM / ODM Process</p>
          <h2>From concept to container, we make your ideas come true.</h2>
        </div>
        <div className="process-grid">
          {processSteps.map(([number, title, text]) => (
            <article className="process-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section manufacturing-section" id="manufacturing">
        <div className="section-heading centered">
          <p className="eyebrow">Manufacturing Strength</p>
          <h2>Factory Strength for Long-Term Outdoor Product Supply</h2>
        </div>
        <div className="manufacturing-grid">
          {manufacturingCards.map((card) => (
            <article className="manufacturing-card" key={card.title}>
              <div className="manufacturing-image">
                <Image src={card.image} alt={card.title} fill sizes="25vw" />
              </div>
              <div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div className="contact-content">
          <p className="eyebrow">Contact Us</p>
          <h2>Get answers to all your questions you might have.</h2>
          <p>
            Add: NO. 3988, BINHONG WEST ROAD, WUCHENG DISTRICT, JINHUA,
            ZHEJIANG 321000, CHINA
          </p>
          <div className="contact-actions">
            <a className="primary-btn" href="/contact#inquiry">
              edison@seeyesgarden.com
            </a>
            <a className="secondary-green" href="https://wa.me/8615325897927">
              WhatsApp: +86 15325897927
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <strong>SEEYES GARDEN</strong>
          <span>Outdoor Structure Manufacturer</span>
        </div>
        <div>
          <strong>PRODUCTS</strong>
          <span>Aluminum Pergola · Metal Shed · Raised Garden Bed · Greenhouse · Carport</span>
        </div>
        <div>
          <strong>OEM/ODM SOLUTIONS</strong>
          <span>OEM Service · ODM Service · Design Support · Private Label Packaging</span>
        </div>
        <div>
          <strong>© 2024 Seeyes Garden.</strong>
          <span>All Rights Reserved.</span>
        </div>
      </footer>
    </main>
  );
}
