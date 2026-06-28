import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronRight,
  AtSign,
  Mail,
  Menu,
  MessageCircle,
  MousePointer2,
  Send,
  X,
} from 'lucide-react';
import InteractiveStage from './components/InteractiveStage';
import Reveal from './components/Reveal';
import SectionTitle from './components/SectionTitle';
import { portfolio, processSteps, services } from './data/content';

const whatsappNumber = '5575982321124';
const whatsappBase = `https://wa.me/${whatsappNumber}`;

const navItems = [
  ['Home', '#home'],
  ['Motorcycle', '#motorcycle'],
  ['Services', '#services'],
  ['Portfolio', '#portfolio'],
  ['About', '#about'],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [formStatus, setFormStatus] = useState('');
  const { scrollYProgress } = useScroll();
  const heroTextY = useTransform(scrollYProgress, [0, 0.18], [0, 90]);
  const heroModelY = useTransform(scrollYProgress, [0, 0.18], [0, 35]);

  useEffect(() => {
    const updateHeader = () => setHeaderSolid(window.scrollY > 40);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const submitQuote = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const hasFile = Boolean(data.get('reference')?.name);
    const message = [
      'Hello, I found MN Animat through the website and I would like to request a quote for a 3D project.',
      '',
      `Name: ${data.get('name') || '-'}`,
      `Company / Brand: ${data.get('company') || '-'}`,
      `Email: ${data.get('email') || '-'}`,
      `WhatsApp: ${data.get('phone') || '-'}`,
      `Service: ${data.get('service') || '-'}`,
      `Desired deadline: ${data.get('deadline') || '-'}`,
      `Available budget: ${data.get('budget') || '-'}`,
      `Project description: ${data.get('description') || '-'}`,
      hasFile ? 'I also have a reference file to send.' : '',
    ].filter(Boolean).join('\n');

    window.open(`${whatsappBase}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setFormStatus('Your quote summary was opened in WhatsApp. Review it and tap send.');
  };

  return (
    <div className="app-shell">
      <div className="noise" aria-hidden="true" />
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      <header className={`site-header ${headerSolid ? 'site-header--solid' : ''}`}>
        <a className="brand" href="#home" aria-label="MN Animat home">
          <img src="/assets/logo-mn.svg" alt="MN Animat" />
          <span><strong>MN</strong> Animat</span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}
        </nav>

        <a className="header-cta" href="#quote">Request a Quote <ArrowRight size={16} /></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <Menu />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <button type="button" onClick={closeMenu} aria-label="Close menu"><X /></button>
        <div className="mobile-menu-brand">
          <img src="/assets/logo-mn.svg" alt="" />
          <span>MN Animat</span>
        </div>
        <nav>
          {navItems.map(([label, href], index) => (
            <a key={label} href={href} onClick={closeMenu}><span>0{index + 1}</span>{label}</a>
          ))}
          <a href="#quote" onClick={closeMenu}><span>06</span>Request a Quote</a>
        </nav>
      </div>

      <main>
        <section className="hero" id="home">
          <div className="hero-orb hero-orb--left" />
          <div className="hero-orb hero-orb--right" />
          <div className="hero-content container">
            <motion.div className="hero-copy" style={{ y: heroTextY }}>
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span /> 3D modeling · animation · interactive web
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                We transform ideas into <em>3D experiences.</em>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.18 }}
              >
                Modeling, animation, rendering and interactive visualization for products, projects and brands that deserve to be explored.
              </motion.p>
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.28 }}
              >
                <a href="#motorcycle" className="button button--primary">Explore the Motorcycle <ArrowDown size={17} /></a>
                <a href="#quote" className="button button--ghost">Request a Quote <ArrowRight size={17} /></a>
              </motion.div>
              <motion.div
                className="hero-proof"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
              >
                <div><strong>360°</strong><span>interactive viewing</span></div>
                <div><strong>Web-ready</strong><span>responsive 3D</span></div>
                <div><strong>Custom</strong><span>production pipeline</span></div>
              </motion.div>
            </motion.div>

            <motion.div className="hero-stage-wrap" style={{ y: heroModelY }}>
              <InteractiveStage compact />
              <div className="drag-hint"><MousePointer2 size={16} /> Drag to explore</div>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#motorcycle" aria-label="Scroll to motorcycle section"><span /> Scroll</a>
        </section>

        <section className="explore section" id="motorcycle">
          <div className="container">
            <SectionTitle
              eyebrow="Featured interactive project"
              title="Explore every detail."
              text="Rotate, zoom, present component groups and activate the exploded view to inspect how the motorcycle is built."
            />
            <Reveal className="explore-stage-wrap">
              <InteractiveStage />
            </Reveal>
            <div className="feature-strip">
              {[
                ['01', 'Animated exploded view', 'Separate and reassemble the motorcycle parts directly in the browser.'],
                ['02', 'Sequential presentation', 'Major component groups are highlighted one at a time with synchronized labels.'],
                ['03', 'Real-time interaction', 'Rotate, zoom and inspect the model using mouse or touch controls.'],
              ].map(([n, title, text], index) => (
                <Reveal key={title} delay={index * 0.08} className="feature-strip-item">
                  <span>{n}</span><div><h3>{title}</h3><p>{text}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="process section">
          <div className="container process-layout">
            <div className="process-sticky">
              <SectionTitle
                eyebrow="Production workflow"
                title="From the initial idea to the final model."
                text="A clear, scalable workflow keeps creative quality and technical performance working together."
              />
              <a className="text-link" href="#quote">Start a project <ArrowRight size={16} /></a>
            </div>
            <div className="process-list">
              {processSteps.map(([number, title, text], index) => (
                <Reveal key={title} delay={index * 0.04} className="process-item">
                  <span className="process-number">{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <ChevronRight size={22} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="container">
            <SectionTitle
              eyebrow="MN Animat services"
              title="Creative and technical 3D production."
              text="A complete set of services for brands, creators, companies and professionals."
              align="center"
            />
            <div className="services-grid">
              {services.map(({ icon: Icon, title, text, price }, index) => (
                <Reveal key={title} delay={(index % 4) * 0.06} className="service-card">
                  <div className="service-icon"><Icon size={22} /></div>
                  <span className="service-index">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <strong className="service-price">{price}</strong>
                  <a href="#quote">Request a Quote <ArrowRight size={15} /></a>
                </Reveal>
              ))}
            </div>
            <p className="pricing-note">Starting prices are estimates. The final quote varies according to complexity, duration, revisions, licensing and delivery format.</p>
          </div>
        </section>

        <section className="portfolio section" id="portfolio">
          <div className="container">
            <div className="portfolio-heading">
              <SectionTitle
                eyebrow="Selected work"
                title="Projects designed to be remembered."
                text="Use this area to present completed work, process breakdowns and client results."
              />
              <a className="button button--ghost" href="#quote">Plan your project <ArrowRight size={16} /></a>
            </div>
            <div className="portfolio-grid">
              {portfolio.map(([title, category, text], index) => (
                <Reveal key={title} delay={(index % 3) * 0.07} className={`portfolio-card portfolio-card--${index + 1}`}>
                  <div className="portfolio-art">
                    <div className="portfolio-shape" />
                    <span>MN / {String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="portfolio-meta">
                    <span>{category}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <a href="#quote">View project concept <ArrowRight size={15} /></a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="about section" id="about">
          <div className="container about-layout">
            <Reveal className="about-mark">
              <div className="about-logo-ring">
                <img src="/assets/logo-mn.svg" alt="MN Animat logo" />
              </div>
              <span>Modeling motion.<br />Building experiences.</span>
            </Reveal>
            <div className="about-copy">
              <SectionTitle eyebrow="About MN Animat" title="Digital experiences with dimension and movement." />
              <Reveal>
                <p className="about-lead">MN Animat specializes in 3D modeling, animation, rendering and interactive digital experiences.</p>
                <p>We develop custom projects for companies, creators, brands and professionals who want to present ideas in a modern, dynamic and visually impactful way.</p>
                <p>Our goal is to transform concepts into digital experiences capable of explaining products, demonstrating projects, attracting customers and strengthening visual identity.</p>
              </Reveal>
              <Reveal className="about-checks" delay={0.1}>
                {['Purpose-driven visual design', 'Technical optimization for web', 'Flexible production for different formats'].map((item) => (
                  <span key={item}><Check size={16} /> {item}</span>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section className="quote section" id="quote">
          <div className="quote-orb" />
          <div className="container quote-layout">
            <div className="quote-copy">
              <SectionTitle
                eyebrow="Start a project"
                title="Tell us what you want to bring to life."
                text="Share the main details. The form creates an organized WhatsApp message for direct contact with MN Animat."
              />
              <div className="contact-cards">
                <a href={`${whatsappBase}?text=${encodeURIComponent('Hello, I found MN Animat through the website and I would like to request a quote for a 3D project.')}`} target="_blank" rel="noreferrer">
                  <MessageCircle size={20} /><div><span>WhatsApp</span><strong>+55 (75) 98232-1124</strong></div><ArrowRight size={17} />
                </a>
                <a href="mailto:mnanimat@gmail.com">
                  <Mail size={20} /><div><span>Email</span><strong>mnanimat@gmail.com</strong></div><ArrowRight size={17} />
                </a>
              </div>
            </div>

            <Reveal className="quote-form-card">
              <form onSubmit={submitQuote}>
                <div className="form-grid">
                  <label><span>Full Name *</span><input name="name" required placeholder="Your name" /></label>
                  <label><span>Company or Brand</span><input name="company" placeholder="Company name" /></label>
                  <label><span>Email Address *</span><input name="email" type="email" required placeholder="you@example.com" /></label>
                  <label><span>WhatsApp Number *</span><input name="phone" type="tel" required placeholder="+55 00 00000-0000" /></label>
                  <label className="form-full"><span>Type of Service *</span>
                    <select name="service" required defaultValue="">
                      <option value="" disabled>Select a service</option>
                      {services.map((item) => <option key={item.title} value={item.title}>{item.title} — {item.price}</option>)}
                      <option value="Other">Other</option>
                    </select>
                  </label>
                  <label><span>Desired Deadline</span><input name="deadline" placeholder="Example: 30 days" /></label>
                  <label><span>Available Budget</span><input name="budget" placeholder="Example: R$ 3,000" /></label>
                  <label className="form-full"><span>Project Description *</span><textarea name="description" required rows="5" placeholder="Describe the project, intended use, style and main deliverables." /></label>
                  <label className="form-full file-input"><span>Reference File</span><input name="reference" type="file" accept="image/*,.pdf,.zip,.blend,.fbx,.glb,.gltf" /><small>The file is not uploaded by the site. Send it in WhatsApp after opening the message.</small></label>
                </div>
                <button className="button button--primary form-submit" type="submit">Create WhatsApp Quote <Send size={17} /></button>
                {formStatus && <p className="form-status" role="status">{formStatus}</p>}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <a className="brand" href="#home"><img src="/assets/logo-mn.svg" alt="" /><span><strong>MN</strong> Animat</span></a>
            <p>3D modeling, animation and interactive experiences built to make ideas visible.</p>
          </div>
          <div className="footer-links">
            <div><strong>Navigation</strong>{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</div>
            <div><strong>Services</strong><a href="#services">3D Modeling</a><a href="#services">Animation</a><a href="#services">Rendering</a><a href="#services">Interactive Web</a></div>
            <div><strong>Contact</strong><a href={`${whatsappBase}`} target="_blank" rel="noreferrer">WhatsApp</a><a href="mailto:mnanimat@gmail.com">Email</a><a href="https://instagram.com/mnanimat" target="_blank" rel="noreferrer"><AtSign size={14} /> Instagram</a></div>
          </div>
        </div>
        <div className="container legal-notes">
          <details id="privacy">
            <summary>Privacy Policy</summary>
            <p>Information entered in the quote form is used only to prepare the WhatsApp message opened on your device. This template does not store the form data on a server. When contacting MN Animat through WhatsApp or email, the respective platform’s privacy rules also apply.</p>
          </details>
          <details id="terms">
            <summary>Terms of Use</summary>
            <p>Portfolio examples and interactive demonstrations are presented for informational purposes. Scope, deadlines, licensing, payment terms and final deliverables must be defined in a separate written proposal or service agreement.</p>
          </details>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 MN Animat. All rights reserved.</span>
          <div><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Use</a></div>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href={`${whatsappBase}?text=${encodeURIComponent('Hello, I found MN Animat through the website and I would like to request a quote for a 3D project.')}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact MN Animat on WhatsApp"
      >
        <MessageCircle size={23} />
        <span>Request a quote</span>
      </a>
    </div>
  );
}

export default App;
