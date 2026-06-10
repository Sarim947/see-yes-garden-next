export function ReadyProjectCta() {
  return (
    <section className="contact-final-cta">
      <h2>Ready to Start Your Project?</h2>
      <p>Send us your product requirements and get a factory quotation today.</p>
      <div className="contact-actions">
        <a className="primary-btn" href="/contact#inquiry">
          Submit Inquiry
        </a>
        <a className="secondary-btn" href="https://wa.me/8615325897927">
          Contact on WhatsApp
        </a>
        <a className="secondary-btn" href="/">
          Back to Home
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="footer-brand">
        <a href="/" className="footer-logo">
          SEEYES
          <span>GARDEN</span>
        </a>
        <p>Outdoor Structure Manufacturer</p>
        <p>
          Professional manufacturer of aluminum pergolas, metal sheds, garden
          beds, carports and more outdoor structures.
        </p>
        <div className="footer-socials" aria-label="Social links">
          <span>f</span>
          <span>◎</span>
          <span>♪</span>
          <span>▶</span>
          <span>in</span>
        </div>
      </div>

      <nav aria-label="Footer products">
        <h3>Products</h3>
        <a href="/products?category=aluminum-pergola">Aluminum Pergola</a>
        <a href="/products?category=metal-shed">Metal Shed</a>
        <a href="/products?category=raised-garden-bed">Raised Garden Bed</a>
        <a href="/products?category=greenhouse">Greenhouse</a>
        <a href="/products?category=carport">Carport</a>
        <a href="/products">View All Products</a>
      </nav>

      <nav aria-label="Footer solutions">
        <h3>OEM/ODM Solutions</h3>
        <a href="/quote">OEM Service</a>
        <a href="/quote">ODM Service</a>
        <a href="/quote">Design Support</a>
        <a href="/quote">Sample Development</a>
        <a href="/quote">Private Label</a>
        <a href="/quote">Packaging Solution</a>
      </nav>

      <nav aria-label="Footer company">
        <h3>Company</h3>
        <a href="/#about">About Us</a>
        <a href="/#manufacturing">Factory</a>
        <a href="/#projects">Projects</a>
        <a href="/#projects">News</a>
        <a href="/contact">FAQ</a>
        <a href="/contact">Contact Us</a>
      </nav>

      <div>
        <h3>Contact Us</h3>
        <p>Add: NO. 3988, BINHONG WEST ROAD, WUCHENG DISTRICT, JINHUA, ZHEJIANG 321000, CHINA</p>
        <p>+86 15325897927</p>
        <p>edison@seeyesgarden.com</p>
      </div>
    </footer>
  );
}
