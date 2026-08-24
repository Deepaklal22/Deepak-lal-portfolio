import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDownRight, ArrowUpRight, Check, Code2, Github, Layers3, Linkedin, Mail, MapPin, Menu, MoveRight, Send, Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { id: 'home', label: 'Start' },
  { id: 'about', label: 'Profile' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Path' },
  { id: 'contact', label: 'Contact' },
];

const projects = [
  {
    number: '01',
    type: 'Performance study',
    title: 'Sorting, measured',
    description: 'A runtime case study comparing Bubble Sort and Insertion Sort across practical data sets — turning classroom theory into readable evidence.',
    stack: ['ASP.NET', 'C#', 'Algorithms'],
    accent: 'mint',
  },
  {
    number: '02',
    type: 'Management system',
    title: 'Alumni network',
    description: 'An ASP.NET platform for keeping alumni information useful, searchable and connected beyond graduation day.',
    stack: ['ASP.NET', 'C#', 'SQL'],
    accent: 'coral',
  },
  {
    number: '03',
    type: 'Social impact',
    title: 'Orphanage management',
    description: 'A focused system that brings people, records and resources into one considered workflow for an orphanage.',
    stack: ['HTML/CSS', 'Python', 'MySQL'],
    accent: 'sun',
  },
  {
    number: '04',
    type: 'Full-stack build',
    title: 'Event management',
    description: 'A complete event experience: Bootstrap frontend, Python backend, MySQL data and Laravel integration working as one.',
    stack: ['Bootstrap', 'Python', 'Laravel'],
    accent: 'ink',
  },
];

const skills = [
  { group: 'Build', items: ['Laravel', 'Python', 'Java', 'C++', 'PHP'] },
  { group: 'Shape', items: ['HTML/CSS', 'Bootstrap', 'Figma', 'Canva'] },
  { group: 'Store', items: ['MySQL'] },
];

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3 text-[hsl(var(--primary))]">
      <span className="mono-label">{index}</span>
      <span className="h-px w-8 bg-[hsl(var(--primary))]" />
      <span className="mono-label">{children}</span>
    </div>
  );
}

function ArrowButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      data-testid={`link-${String(children).toLowerCase().replaceAll(' ', '-')}`}
      className="group inline-flex items-center gap-2 border-b border-[hsl(var(--foreground)/.35)] pb-2 text-sm font-semibold hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--primary))]"
    >
      {children}
      <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

function Portfolio() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const current = navItems
        .map((item) => {
          const element = document.getElementById(item.id);
          return { id: item.id, top: element ? Math.abs(element.getBoundingClientRect().top - 120) : Number.POSITIVE_INFINITY };
        })
        .sort((a, b) => a.top - b.top)[0];
      if (current) setActiveSection(current.id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio hello from ${form.name || 'a new connection'}`);
    const body = encodeURIComponent(`${form.message}\n\nReply to: ${form.email}`);
    window.location.href = `mailto:j.deepak22lal@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="portfolio-shell">
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-[hsl(var(--foreground)/.08)] bg-[hsl(var(--background)/.88)] backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={() => scrollTo('home')} data-testid="button-mobile-logo" className="display-font text-lg font-bold tracking-[-.05em]">
            DL<span className="text-[hsl(var(--accent))]">.</span>
          </button>
          <button onClick={() => scrollTo('home')} data-testid="button-mobile-identity" className="text-center">
            <span className="display-font block text-sm font-bold tracking-[-.04em]">Deepak Lal J</span>
            <span className="mono-label text-[9px] text-[hsl(var(--muted-foreground))]">Kanyakumari · Developer</span>
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} data-testid="button-mobile-menu" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} className="rounded-full p-2 hover:bg-[hsl(var(--muted))]">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileOpen && (
          <nav className="border-t border-[hsl(var(--foreground)/.08)] px-5 pb-5 pt-3">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} data-testid={`button-mobile-nav-${item.id}`} className="block w-full border-b border-[hsl(var(--foreground)/.08)] py-3 text-left text-sm font-semibold">
                <span className="mr-3 font-mono text-[10px] text-[hsl(var(--accent))]">0{navItems.indexOf(item) + 1}</span>{item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-[minmax(360px,38%)_minmax(0,1fr)]">
        <aside className="sticky-panel z-20 hidden flex-col justify-between border-r border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--secondary))] p-10 text-[hsl(var(--secondary-foreground))] lg:flex xl:p-14">
          <div>
            <button onClick={() => scrollTo('home')} data-testid="button-logo" className="display-font text-xl font-bold tracking-[-.06em]">
              deepak<span className="text-[hsl(var(--accent))]">/</span>lal<span className="text-[hsl(var(--accent))]">.</span>
            </button>
              <div className="identity-card-3d mt-24 max-w-[360px]">
              <div className="mb-7 flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--primary))] opacity-50" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[hsl(var(--primary))]" />
                </span>
                <span className="mono-label text-[hsl(var(--secondary-foreground)/.65)]">Available for opportunities</span>
              </div>
              <h1 data-testid="text-name" className="display-font text-[clamp(3.7rem,6vw,6.9rem)] font-semibold leading-[.88] tracking-[-.09em]">
                Deepak<br /><span className="text-[hsl(var(--primary))]">Lal J</span>
              </h1>
              <p data-testid="text-role" className="mt-8 max-w-[280px] text-lg leading-relaxed text-[hsl(var(--secondary-foreground)/.7)]">
                Fresher software developer building useful things, with a growing eye for 3D and digital design.
              </p>
               <div className="mt-8 grid max-w-[310px] grid-cols-2 gap-3 border-t border-[hsl(var(--secondary-foreground)/.14)] pt-5">
                 <div>
                   <span className="mono-label text-[hsl(var(--secondary-foreground)/.48)]">Currently</span>
                   <p className="mt-2 text-sm text-[hsl(var(--secondary-foreground)/.82)]">MCA graduate</p>
                 </div>
                 <div>
                   <span className="mono-label text-[hsl(var(--secondary-foreground)/.48)]">Focus</span>
                   <p className="mt-2 text-sm text-[hsl(var(--secondary-foreground)/.82)]">Web + 3D design</p>
                 </div>
               </div>
            </div>
          </div>
          <div>
            <div className="mb-8 flex items-center gap-2 text-[hsl(var(--secondary-foreground)/.62)]">
              <MapPin size={15} className="text-[hsl(var(--accent))]" />
              <span className="text-sm">Kanyakumari, Tamil Nadu</span>
            </div>
            <nav aria-label="Primary navigation" className="mb-10 space-y-1">
              {navItems.map((item, index) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} data-testid={`button-nav-${item.id}`} className={`nav-link group flex w-full items-center gap-4 py-2 text-left text-sm ${activeSection === item.id ? 'text-[hsl(var(--primary))]' : 'text-[hsl(var(--secondary-foreground)/.62)] hover:text-[hsl(var(--secondary-foreground))]'}`}>
                  <span className="mono-label w-6 text-[10px] text-[hsl(var(--secondary-foreground)/.4)]">0{index + 1}</span>
                  <span className={`h-px transition-all duration-300 ${activeSection === item.id ? 'w-10 bg-[hsl(var(--primary))]' : 'w-5 bg-[hsl(var(--secondary-foreground)/.3)] group-hover:w-10'}`} />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-4 border-t border-[hsl(var(--secondary-foreground)/.14)] pt-5">
              <a href="mailto:j.deepak22lal@gmail.com" data-testid="link-email-sidebar" aria-label="Email Deepak" className="social-link text-[hsl(var(--secondary-foreground)/.6)] hover:text-[hsl(var(--primary))]"><Mail size={17} /></a>
              <a href="https://www.linkedin.com/in/deepak-lal-821717264" target="_blank" rel="noreferrer" data-testid="link-linkedin-sidebar" aria-label="LinkedIn profile" className="social-link text-[hsl(var(--secondary-foreground)/.6)] hover:text-[hsl(var(--primary))]"><Linkedin size={17} /></a>
              <a href="https://github.com/Deepaklal22" target="_blank" rel="noreferrer" data-testid="link-github-sidebar" aria-label="GitHub profile" className="social-link text-[hsl(var(--secondary-foreground)/.6)] hover:text-[hsl(var(--primary))]"><Github size={17} /></a>
              <span className="ml-auto mono-label text-[10px] text-[hsl(var(--secondary-foreground)/.4)]">© 2025</span>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
           <section id="home" className="section-anchor grid-lines relative flex min-h-[100dvh] items-center overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pt-16 xl:px-24">
            <div className="absolute right-[8%] top-[13%] h-[clamp(180px,27vw,420px)] w-[clamp(180px,27vw,420px)] opacity-90">
              <div className="orb orb-a absolute inset-[17%] border border-[hsl(var(--primary)/.5)] bg-[hsl(var(--primary)/.12)] shadow-[inset_-20px_-15px_60px_hsl(var(--primary)/.12)]" />
              <div className="orb orb-b absolute right-0 top-0 h-[45%] w-[45%] border border-[hsl(var(--accent)/.6)] bg-[hsl(var(--accent)/.8)] mix-blend-multiply" />
              <div className="absolute bottom-[3%] left-[4%] h-[30%] w-[30%] rotate-45 border border-[hsl(var(--secondary)/.5)] bg-[hsl(var(--secondary)/.9)]" />
              <div className="absolute left-[17%] top-[4%] h-[1px] w-[110%] origin-left -rotate-[28deg] bg-[hsl(var(--foreground)/.22)]" />
              <div className="absolute left-[48%] top-[-12%] h-[125%] w-px rotate-[35deg] bg-[hsl(var(--foreground)/.18)]" />
            </div>
             <div className="hero-identity-card absolute bottom-[13%] right-[8%] hidden w-52 rotate-[4deg] rounded-2xl border border-[hsl(var(--foreground)/.16)] bg-[hsl(var(--card)/.8)] p-4 shadow-[18px_22px_0_hsl(var(--secondary)/.14),0_24px_70px_hsl(var(--foreground)/.12)] backdrop-blur-sm lg:block">
               <div className="mb-8 flex items-start justify-between">
                 <span className="mono-label text-[hsl(var(--primary))]">DL / 01</span>
                 <div className="h-7 w-7 rounded-full border border-[hsl(var(--accent)/.7)] bg-[hsl(var(--accent)/.65)]" />
               </div>
               <div className="display-font text-2xl font-semibold leading-none tracking-[-.08em]">Deepak<br /><span className="text-[hsl(var(--primary))]">Lal J</span></div>
               <div className="mt-5 flex items-end justify-between">
                 <span className="mono-label text-[hsl(var(--muted-foreground))]">Kanyakumari<br />India</span>
                 <span className="text-[hsl(var(--accent))]"><ArrowDownRight size={19} /></span>
               </div>
             </div>
            <div className="relative z-10 max-w-3xl">
              <div className="reveal mb-8 flex items-center gap-3 text-[hsl(var(--primary))]">
                <Sparkles size={16} />
                <span className="mono-label">Software / design / curiosity</span>
              </div>
              <h2 data-testid="text-hero-title" className="reveal reveal-delay-1 display-font max-w-[850px] text-[clamp(3.4rem,8.4vw,9.5rem)] font-semibold leading-[.86] tracking-[-.095em]">
                I make<br /><span className="text-[hsl(var(--primary))]">useful</span> feel<br /><i className="font-normal text-[hsl(var(--accent))]">considered.</i>
              </h2>
              <div className="reveal reveal-delay-2 mt-12 flex max-w-xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-sm text-base leading-7 text-[hsl(var(--muted-foreground))]">
                  I am passionate about IT, learning technologies and creating applications that solve real problems. Currently exploring the space where code gets a dimension.
                </p>
                <button onClick={() => scrollTo('work')} data-testid="button-explore-work" className="group flex shrink-0 items-center gap-3 text-sm font-bold">
                  Explore selected work <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--accent))] transition-transform duration-300 group-hover:translate-x-1"><ArrowDownRight size={18} /></span>
                </button>
              </div>
              <div className="reveal reveal-delay-3 mt-16 flex items-center gap-3">
                <span className="mono-label text-[hsl(var(--muted-foreground))]">Scroll to inspect</span>
                <span className="h-px w-14 bg-[hsl(var(--foreground)/.25)]" />
              </div>
               <div className="reveal reveal-delay-3 mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-[hsl(var(--foreground)/.14)] pt-5">
                 <div><span className="mono-label text-[hsl(var(--muted-foreground))]">01</span><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">MCA<br />graduate</p></div>
                 <div><span className="mono-label text-[hsl(var(--muted-foreground))]">02</span><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Internships<br />completed</p></div>
                 <div><span className="mono-label text-[hsl(var(--muted-foreground))]">03</span><p className="mt-2 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Designing<br />what’s next</p></div>
               </div>
            </div>
            <div className="absolute bottom-7 right-8 hidden rotate-90 mono-label text-[hsl(var(--muted-foreground))] xl:block">01 — 05</div>
          </section>

          <div className="overflow-hidden border-y border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--primary))] py-3 text-[hsl(var(--primary-foreground))]">
            <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
              {[...Array(2)].flatMap(() => ['Software development', 'Digital design', 'Problem solving', '3D curiosity', 'Always learning']).map((item, index) => (
                <span key={`${item}-${index}`} className="display-font text-sm font-semibold uppercase tracking-[.13em]">{item}<span className="ml-8 text-[hsl(var(--accent))]">/</span></span>
              ))}
            </div>
          </div>

          <section id="about" className="section-anchor border-b border-[hsl(var(--foreground)/.1)] px-6 py-24 sm:px-10 lg:px-16 lg:py-36 xl:px-24">
            <SectionLabel index="02">Profile</SectionLabel>
            <div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr]">
              <div>
                <h2 data-testid="text-about-heading" className="display-font max-w-2xl text-4xl font-medium leading-[1.02] tracking-[-.065em] sm:text-6xl">
                  Learning fast.<br /><span className="text-[hsl(var(--muted-foreground))]">Thinking in systems.</span>
                </h2>
                <p className="mt-8 max-w-xl text-lg leading-8 text-[hsl(var(--muted-foreground))]">
                  My foundation is in computer science, but my focus is always on what a person needs next. I enjoy taking a messy brief, finding its logic and shaping a clear, dependable experience around it.
                </p>
              </div>
              <div className="flex flex-col justify-end border-l border-[hsl(var(--foreground)/.16)] pl-6 lg:pl-10">
                <div className="mono-label mb-4 text-[hsl(var(--accent))]">A note from the studio</div>
                <p className="display-font text-2xl font-medium leading-tight tracking-[-.04em]">“The best projects teach you something you could not have googled first.”</p>
                <div className="mt-8 flex items-center gap-3 text-sm text-[hsl(var(--muted-foreground))]"><span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" /> Kanyakumari, India</div>
              </div>
            </div>
            <div className="mt-20 grid grid-cols-2 border-t border-[hsl(var(--foreground)/.14)] pt-7 sm:grid-cols-4">
              <div><div className="display-font text-3xl font-semibold tracking-[-.07em]">MCA</div><div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Computer applications</div></div>
              <div><div className="display-font text-3xl font-semibold tracking-[-.07em]">7.8</div><div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">CGPA at St. Joseph's</div></div>
              <div className="mt-7 sm:mt-0"><div className="display-font text-3xl font-semibold tracking-[-.07em]">02</div><div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Internships completed</div></div>
              <div className="mt-7 sm:mt-0"><div className="display-font text-3xl font-semibold tracking-[-.07em]">∞</div><div className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Things left to learn</div></div>
            </div>
          </section>

          <section id="work" className="section-anchor border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--card))] px-6 py-24 sm:px-10 lg:px-16 lg:py-36 xl:px-24">
            <SectionLabel index="03">Selected work</SectionLabel>
            <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <h2 className="display-font text-5xl font-medium tracking-[-.08em] sm:text-7xl">Things I have<br /><span className="text-[hsl(var(--primary))]">built.</span></h2>
              <p className="max-w-xs text-sm leading-6 text-[hsl(var(--muted-foreground))]">A small archive of practical systems, experiments and studies — each one a little clearer than the last.</p>
            </div>
            <div className="divide-y divide-[hsl(var(--foreground)/.14)] border-y border-[hsl(var(--foreground)/.14)]">
              {projects.map((project) => (
                <article key={project.number} data-testid={`card-project-${project.number}`} className="project-card group relative grid gap-5 py-8 sm:grid-cols-[80px_1fr_36px] sm:items-start">
                  <div className="project-number display-font text-2xl font-semibold tracking-[-.07em] text-[hsl(var(--muted-foreground)/.55)]">{project.number}</div>
                  <div>
                    <div className="mono-label mb-3 text-[hsl(var(--muted-foreground))]">{project.type}</div>
                    <h3 className="display-font text-3xl font-medium tracking-[-.06em] sm:text-4xl">{project.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[hsl(var(--muted-foreground))]">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((tag) => <span key={tag} className="rounded-full border border-[hsl(var(--foreground)/.15)] px-3 py-1 text-[11px] text-[hsl(var(--muted-foreground))]">{tag}</span>)}</div>
                  </div>
                  <div className={`project-arrow flex h-9 w-9 items-center justify-center rounded-full ${project.accent === 'mint' ? 'bg-[hsl(var(--primary))]' : project.accent === 'coral' ? 'bg-[hsl(var(--accent))]' : project.accent === 'sun' ? 'bg-[#e6c65c]' : 'bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]'}`}><ArrowUpRight size={16} /></div>
                </article>
              ))}
            </div>
          </section>

          <section id="experience" className="section-anchor border-b border-[hsl(var(--foreground)/.1)] px-6 py-24 sm:px-10 lg:px-16 lg:py-36 xl:px-24">
            <SectionLabel index="04">Path so far</SectionLabel>
            <div className="grid gap-20 lg:grid-cols-[1.1fr_.9fr]">
              <div>
                <h2 className="display-font mb-12 text-5xl font-medium tracking-[-.08em] sm:text-7xl">Proof of<br /><span className="text-[hsl(var(--accent))]">practice.</span></h2>
                <div className="space-y-0">
                  <div className="relative border-l border-[hsl(var(--primary)/.55)] pb-12 pl-8">
                    <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[hsl(var(--primary))]" />
                    <div className="mono-label text-[hsl(var(--primary))]">May 2025 · Internship</div>
                    <h3 className="display-font mt-3 text-2xl font-semibold tracking-[-.05em]">Zworks Technology</h3>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-[hsl(var(--muted-foreground))]">Web development across HTML, CSS, PHP, Bootstrap and Laravel — learning how real requirements become shippable work.</p>
                  </div>
                  <div className="relative border-l border-[hsl(var(--primary)/.55)] pl-8">
                    <span className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-[hsl(var(--accent))]" />
                    <div className="mono-label text-[hsl(var(--accent))]">May 2024 · Internship</div>
                    <h3 className="display-font mt-3 text-2xl font-semibold tracking-[-.05em]">ShreeVijay Technology Solutions</h3>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-[hsl(var(--muted-foreground))]">An early deep dive into Python, translating concepts into working logic and building confidence through repetition.</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-8 flex items-center gap-3"><Layers3 size={19} className="text-[hsl(var(--accent))]" /><h3 className="display-font text-2xl font-semibold tracking-[-.05em]">Education</h3></div>
                <div className="space-y-4">
                  <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-5"><div className="flex items-start justify-between gap-4"><div><h4 className="font-semibold">Master of Computer Applications</h4><p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">St. Joseph's College, Trichy</p></div><span className="mono-label text-[hsl(var(--primary))]">7.8 CGPA</span></div></div>
                  <div className="rounded-xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-5"><div className="flex items-start justify-between gap-4"><div><h4 className="font-semibold">BSc Computer Science</h4><p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">St. Joseph's College, Trichy</p></div><span className="mono-label text-[hsl(var(--primary))]">7.7 CGPA</span></div></div>
                  <div className="grid grid-cols-2 gap-4"><div className="rounded-xl border border-[hsl(var(--foreground)/.14)] p-5"><div className="mono-label text-[hsl(var(--muted-foreground))]">HSC</div><div className="mt-3 display-font text-2xl font-semibold">85%</div><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Carmel School, Nagercoil</p></div><div className="rounded-xl border border-[hsl(var(--foreground)/.14)] p-5"><div className="mono-label text-[hsl(var(--muted-foreground))]">SSLC</div><div className="mt-3 display-font text-2xl font-semibold">79%</div><p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">Carmel School, Nagercoil</p></div></div>
                </div>
              </div>
            </div>
          </section>

          <section id="toolkit" className="section-anchor border-b border-[hsl(var(--foreground)/.1)] bg-[hsl(var(--secondary))] px-6 py-24 text-[hsl(var(--secondary-foreground))] sm:px-10 lg:px-16 lg:py-32 xl:px-24">
            <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
              <div><SectionLabel index="05">Toolkit</SectionLabel><h2 className="display-font text-5xl font-medium leading-[.95] tracking-[-.08em] sm:text-6xl">Tools for<br /><span className="text-[hsl(var(--primary))]">making.</span></h2><p className="mt-7 max-w-sm text-sm leading-6 text-[hsl(var(--secondary-foreground)/.62)]">A practical stack with room to grow. I care more about learning the right tool for the job than collecting tools.</p></div>
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-3">{skills.map((skill) => <div key={skill.group}><div className="mb-5 flex items-center gap-2 text-[hsl(var(--accent))]"><Code2 size={15} /><span className="mono-label">{skill.group}</span></div><ul className="space-y-3">{skill.items.map((item) => <li key={item} className="display-font text-lg text-[hsl(var(--secondary-foreground)/.8)]">{item}</li>)}</ul></div>)}</div>
            </div>
          </section>

          <section id="contact" className="section-anchor relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16 lg:py-36 xl:px-24">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[40px] border-[hsl(var(--accent)/.7)] opacity-60" />
            <div className="relative grid gap-16 lg:grid-cols-[1fr_.9fr]">
              <div>
                <SectionLabel index="06">Contact</SectionLabel>
                <h2 data-testid="text-contact-heading" className="display-font max-w-2xl text-[clamp(3.5rem,7vw,7.5rem)] font-medium leading-[.87] tracking-[-.1em]">Let's make<br /><span className="text-[hsl(var(--primary))]">something</span><br /><i className="font-normal text-[hsl(var(--accent))]">useful.</i></h2>
                <p className="mt-9 max-w-md text-base leading-7 text-[hsl(var(--muted-foreground))]">Have a role, a project or a good problem? I would like to hear about it.</p>
                <a href="mailto:j.deepak22lal@gmail.com" data-testid="link-contact-email" className="mt-8 inline-flex items-center gap-3 text-lg font-semibold hover:text-[hsl(var(--primary))]"><Mail size={19} className="text-[hsl(var(--accent))]" /> j.deepak22lal@gmail.com</a>
                <div className="mt-10 flex flex-wrap gap-6"><ArrowButton href="https://www.linkedin.com/in/deepak-lal-821717264">LinkedIn</ArrowButton><ArrowButton href="https://github.com/Deepaklal22">GitHub</ArrowButton></div>
              </div>
              <form onSubmit={submitForm} className="rounded-2xl border border-[hsl(var(--foreground)/.14)] bg-[hsl(var(--card))] p-6 shadow-[0_18px_55px_hsl(var(--foreground)/.06)] sm:p-8">
                <div className="mb-8 flex items-center justify-between"><div><div className="mono-label text-[hsl(var(--primary))]">Open channel</div><h3 className="display-font mt-2 text-2xl font-semibold tracking-[-.05em]">Send a note</h3></div><Send size={20} className="text-[hsl(var(--accent))]" /></div>
                <label className="mb-5 block"><span className="mono-label mb-2 block text-[hsl(var(--muted-foreground))]">Your name</span><input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} data-testid="input-contact-name" className="w-full border-b border-[hsl(var(--foreground)/.2)] bg-transparent py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--primary))]" placeholder="How should I call you?" /></label>
                <label className="mb-5 block"><span className="mono-label mb-2 block text-[hsl(var(--muted-foreground))]">Email</span><input required type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} data-testid="input-contact-email" className="w-full border-b border-[hsl(var(--foreground)/.2)] bg-transparent py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--primary))]" placeholder="you@company.com" /></label>
                <label className="mb-6 block"><span className="mono-label mb-2 block text-[hsl(var(--muted-foreground))]">Message</span><textarea required rows={3} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} data-testid="input-contact-message" className="w-full resize-none border-b border-[hsl(var(--foreground)/.2)] bg-transparent py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--primary))]" placeholder="Tell me a little about the opportunity..." /></label>
                <button type="submit" data-testid="button-send-message" className="group flex w-full items-center justify-between rounded-lg bg-[hsl(var(--secondary))] px-5 py-4 text-sm font-bold text-[hsl(var(--secondary-foreground))] transition-transform hover:-translate-y-1">Open email draft <MoveRight size={18} className="transition-transform group-hover:translate-x-1" /></button>
                {sent && <p data-testid="status-email-opened" className="mt-4 flex items-center gap-2 text-xs text-[hsl(var(--primary))]"><Check size={14} /> Your email app should be opening now.</p>}
              </form>
            </div>
            <footer className="mt-28 flex flex-col justify-between gap-4 border-t border-[hsl(var(--foreground)/.14)] pt-5 text-xs text-[hsl(var(--muted-foreground))] sm:flex-row"><span>Deepak Lal J · Software developer</span><span>Built with curiosity in Kanyakumari</span></footer>
          </section>
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Portfolio} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;