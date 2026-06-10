import { categorySlug, getCategoryCounts } from "@/data/productsCatalog";

const navItems = [
  ["HOME", "/"],
  ["ABOUT", "/#about"],
  ["NEWS", "/#projects"],
  ["SUPPORT", "/#process"],
  ["CONTACT US", "/contact"],
];

export default function SiteHeader() {
  const categories = getCategoryCounts();

  return (
    <header className="site-header">
      <a className="brand" href="/">
        <span className="brand-mark">SEE</span>
        <span>SEEYES GARDEN</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/">HOME</a>
        <div className="nav-dropdown">
          <a href="/products">PRODUCTS</a>
          <div className="nav-dropdown-menu">
            {categories.map((item) => (
              <a key={item.category} href={`/products?category=${categorySlug(item.category)}`}>
                {item.category}
              </a>
            ))}
          </div>
        </div>
        {navItems.slice(1).map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="/quote">
        GET QUOTE
      </a>
    </header>
  );
}
