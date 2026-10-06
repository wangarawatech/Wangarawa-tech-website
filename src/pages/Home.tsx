import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { HeroSlide, Service, Program, Project, NewsArticle } from '../types';
import { Logo } from '../components/common/Logo';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Sparkles,
  Monitor,
  BarChart3,
  Globe,
  Code,
  Shield,
  Printer,
  Mic,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Layers,
  Building2,
  Handshake,
  Compass,
  TrendingUp,
} from 'lucide-react';

interface HomeProps {
  onNavigate: (path: string) => void;
  onSelectProject?: (slug: string) => void;
  onSelectArticle?: (slug: string) => void;
}

// Icon helper for official services
const getServiceIcon = (name: string) => {
  switch (name) {
    case 'Printer': return <Printer className="w-5 h-5 text-amber-500" />;
    case 'Globe': return <Globe className="w-5 h-5 text-amber-500" />;
    case 'Code': return <Code className="w-5 h-5 text-amber-500" />;
    case 'BarChart3': return <BarChart3 className="w-5 h-5 text-amber-500" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-500" />;
    case 'Mic': return <Mic className="w-5 h-5 text-amber-500" />;
    default: return <Sparkles className="w-5 h-5 text-amber-500" />;
  }
};

const getProgramIcon = (title: string) => {
  if (title.includes('AI')) return <Cpu className="w-5 h-5 text-amber-500" />;
  if (title.includes('Data')) return <BarChart3 className="w-5 h-5 text-amber-500" />;
  if (title.includes('Cyber')) return <Shield className="w-5 h-5 text-amber-500" />;
  if (title.includes('Web')) return <Code className="w-5 h-5 text-amber-500" />;
  return <Monitor className="w-5 h-5 text-amber-500" />;
};

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onSelectProject,
  onSelectArticle,
}) => {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const loadedSlides = db.getHeroSlides().filter((s) => s.active);
    setSlides(loadedSlides.length > 0 ? loadedSlides : db.getHeroSlides());
    setServices(db.getServices().filter((s) => s.published));
    setPrograms(db.getPrograms().filter((p) => p.published));
    setProjects(db.getProjects().filter((p) => p.published));
    setNews(db.getNews().filter((n) => n.published).slice(0, 3));
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [slides.length]);

  const activeSlide = slides[currentSlideIndex] || slides[0];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* ======================================================== */}
      {/* 1. OFFICIAL HERO SECTION */}
      {/* ======================================================== */}
      <section className="relative min-h-[620px] sm:min-h-[680px] lg:min-h-[720px] flex items-center justify-center bg-slate-950 overflow-hidden">
        {/* Background Rotating Slide Media */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlideIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            } transform transition-transform duration-7000`}
          >
            <img
              src={slide.bgImageUrl}
              alt={slide.headline}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* Measured Scrim for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30" />
          </div>
        ))}

        {/* Hero Content Frame */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl space-y-6">
            {/* Corporate Identity Lockup */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-md border border-white/15 text-slate-200 text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-white font-mono">RC No. 9161655</span>
              <span className="text-slate-400" aria-hidden="true">·</span>
              <span className="text-amber-300 font-medium">Dutse, Jigawa State, Nigeria</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] text-balance">
              {activeSlide?.headline || 'Empowering the Next Generation of Innovators.'}
            </h1>

            {/* Tagline & Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {activeSlide?.subheadline ||
                'Wangarawa Global Technology Limited (Wangarawa Tech) is a technology and digital skills company focused on helping young people, students, businesses and organisations build practical digital capacity and access useful technology services.'}
            </p>

            {/* Three Primary CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  onNavigate('/programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2"
              >
                <span>Explore Training</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onNavigate('/services');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
              >
                <span>Our Services</span>
              </button>

              <button
                onClick={() => {
                  onNavigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-lg bg-transparent hover:bg-white/10 text-slate-300 hover:text-white text-xs sm:text-sm font-medium transition-all"
              >
                <span>Contact Us</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Slider Navigation Controls */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 right-6 sm:right-12 z-20 flex items-center gap-2">
            <button
              onClick={handlePrevSlide}
              aria-label="Previous slide"
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 px-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlideIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNextSlide}
              aria-label="Next slide"
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* ======================================================== */}
      {/* 2. COMPANY PROFILE & STRATEGIC POSITIONING */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Profile Frame */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-900 aspect-4/3 relative">
              <img
                src="/src/assets/images/office_innovation_hub_1791311014618.jpg"
                alt="Wangarawa Tech Centre in Dutse"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[11px] uppercase font-bold tracking-wider text-amber-400 font-mono">
                  Physical Base in Dutse
                </p>
                <p className="text-xs font-medium text-slate-200">
                  No. 003 Wangara Shopping Complex, Sabuwar Takur, Dutse
                </p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg border border-slate-200 p-4 max-w-xs hidden sm:block">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Leadership</p>
              <p className="text-xs font-bold text-[#0B2545]">Sulaiman Ado</p>
              <p className="text-[10px] text-amber-600 font-medium">Director General</p>
            </div>
          </div>

          {/* Editorial Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
                About Wangarawa Tech
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
                Practical Technology Training & Digital Services Centre
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Wangarawa Global Technology Limited (Wangarawa Tech) is a technology and digital skills company focused on helping young people, students, businesses and organisations build practical digital capacity and access useful technology services.
            </p>

            {/* Approach Triad */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
                <p className="text-xs font-bold text-[#0B2545]">Technology Training</p>
                <p className="text-[11px] text-slate-600 mt-1">Structured practical learning in AI, data, web, and safety.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
                <p className="text-xs font-bold text-[#0B2545]">Practical Digital Services</p>
                <p className="text-[11px] text-slate-600 mt-1">Reliable day-to-day document, printing, web, and online support.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100">
                <p className="text-xs font-bold text-[#0B2545]">Community Innovation</p>
                <p className="text-[11px] text-slate-600 mt-1">Youth empowerment, summits, workshops, and ecosystem collaboration.</p>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              The immediate strategic focus is to build a credible technology centre in Dutse, deliver practical training, serve local businesses and students, and grow a strong talent pipeline that can compete beyond Jigawa.
            </p>

            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate('/about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2545] hover:text-[#133E87]"
              >
                <span>Read Full Company Profile, Vision & Operating Model</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CORE TRAINING PROGRAMMES (Official 5 Tracks) */}
      {/* ======================================================== */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Official Core Curriculum
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
                Core Training Programmes
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Practical, career-oriented cohorts delivered with hands-on computer exercises at our Sabuwar Takur centre in Dutse.
              </p>
            </div>

            <button
              onClick={() => {
                onNavigate('/programs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B2545] text-white hover:bg-[#133E87] text-xs font-bold transition-all whitespace-nowrap"
            >
              <span>View All Training Programmes</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      {getProgramIcon(prog.title)}
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0B2545]">
                      {prog.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Dutse Centre</span>
                  <button
                    onClick={() => {
                      onNavigate('/contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-[#0B2545] hover:text-amber-600 inline-flex items-center gap-1"
                  >
                    <span>Enroll / Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. OFFICIAL DIGITAL SERVICES (Official 6 Services) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Reliable Local & Online Solutions
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
              Official Digital Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Providing reliable day-to-day technology services to students, businesses, schools and organisations in Jigawa.
            </p>
          </div>

          <button
            onClick={() => {
              onNavigate('/services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:border-[#0B2545] text-xs font-bold text-slate-800 transition-colors whitespace-nowrap"
          >
            <span>Explore All 6 Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:border-blue-300 hover:shadow-lg transition-all"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  {getServiceIcon(service.iconName)}
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    onNavigate('/contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#0B2545] hover:text-amber-600 inline-flex items-center gap-1"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <span className="text-[10px] font-mono text-slate-400">Sabuwar Takur</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. WHO WE SERVE */}
      {/* ======================================================== */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Community & Target Audience
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
              Who Wangarawa Tech Serves
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <div className="text-amber-500 font-black text-sm">01</div>
              <h4 className="text-xs font-bold text-slate-900">Students & Young People</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Seeking employable digital skills, computer literacy, and modern AI capability.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <div className="text-amber-500 font-black text-sm">02</div>
              <h4 className="text-xs font-bold text-slate-900">Schools & Institutions</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Requiring practical technology programmes, student training, and digital curriculum support.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <div className="text-amber-500 font-black text-sm">03</div>
              <h4 className="text-xs font-bold text-slate-900">Small & Growing Businesses</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Needing websites, digital tools, branding, data reporting, and online visibility.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <div className="text-amber-500 font-black text-sm">04</div>
              <h4 className="text-xs font-bold text-slate-900">Organisations & Programmes</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Community development groups requiring digital training, youth cohorts, or IT support.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
              <div className="text-amber-500 font-black text-sm">05</div>
              <h4 className="text-xs font-bold text-slate-900">Individuals</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Seeking reliable walk-in printing, scanning, typing, CV preparation, and online applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. HOW WANGARAWA TECH OPERATES (5 Principles) */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Operating Model
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2545]">
            How Wangarawa Tech Operates
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            A balanced five-part principle ensuring educational quality, local utility, and sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B2545] font-bold text-xs flex items-center justify-center font-mono">
              01
            </div>
            <h4 className="text-sm font-bold text-[#0B2545]">TRAIN</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deliver structured practical training with projects, exercises and certificates where applicable.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B2545] font-bold text-xs flex items-center justify-center font-mono">
              02
            </div>
            <h4 className="text-sm font-bold text-[#0B2545]">SERVE</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provide reliable day-to-day digital services to generate recurring local revenue.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B2545] font-bold text-xs flex items-center justify-center font-mono">
              03
            </div>
            <h4 className="text-sm font-bold text-[#0B2545]">BUILD</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Develop websites, data solutions and digital products for clients and internal projects.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B2545] font-bold text-xs flex items-center justify-center font-mono">
              04
            </div>
            <h4 className="text-sm font-bold text-[#0B2545]">CONNECT</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Create partnerships with schools, institutions, government programmes, businesses and technology communities.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0B2545] font-bold text-xs flex items-center justify-center font-mono">
              05
            </div>
            <h4 className="text-sm font-bold text-[#0B2545]">GROW</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Develop trainers, volunteers and young professionals who can expand the company's capacity.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 7. CURRENT GROWTH DIRECTION & PROPOSED 12-MONTH OUTCOMES */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Priorities Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Immediate Focus
            </div>
            <h3 className="text-xl font-bold text-[#0B2545]">
              Current Growth Direction
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The Dutse office is being positioned as the physical base for training, digital services, community engagement and technology development.
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Completing and professionally organising the Dutse technology centre.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Launching focused training cohorts in AI, data, cybersecurity, web development and digital skills.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Building awareness among schools, students, businesses and organisations in Jigawa.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Developing a reliable internal team of trainers, content creators, developers and support staff.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Creating partnerships that can scale training beyond one physical office.</span>
              </li>
            </ul>
          </div>

          {/* 12-Month Proposed Outcomes Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-4 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Growth Goals
            </div>
            <h3 className="text-xl font-bold text-[#0B2545]">
              Proposed 12-Month Outcomes
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Presented as strategic targets that Wangarawa Tech is working to accomplish:
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>Establish a recognised technology and digital skills centre in Dutse.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>Run regular practical training cohorts across the five core programmes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>Train and certify a growing number of students and young people.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>Serve individuals, businesses and organisations through digital services.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>Build a competent local team and trainer network.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>Secure strategic partnerships with schools, institutions, businesses and public programmes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>Develop a stronger digital presence and position Wangarawa Tech beyond Jigawa.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 8. SUPPORT & PARTNERSHIP INVITATION */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B2545] via-[#07172C] to-[#040D1A] text-white p-8 sm:p-12 relative overflow-hidden shadow-2xl space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">
              <Handshake className="w-3.5 h-3.5 text-amber-400" />
              <span>Support & Strategic Partnership</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Partner With Wangarawa Tech
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Wangarawa Tech is open to strategic support from individuals, institutions, organisations and partners who believe in youth technology development. Support is directed toward productive assets — training infrastructure, media equipment, connectivity, outreach, and programme sponsorship — that increase our centre's ability to train people, serve customers, and generate sustainable local value.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  onNavigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-lg transition-all"
              >
                Discuss Partnership With Director General
              </button>

              <button
                onClick={() => {
                  onNavigate('/about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all"
              >
                Read Support Areas
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
