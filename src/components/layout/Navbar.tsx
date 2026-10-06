import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isAdminLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  isAdminLoggedIn,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const primaryLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Training & Programmes', path: '/programs' },
    { label: 'Projects & Impact', path: '/projects' },
  ];

  const secondaryLinks = [
    { label: 'News & Updates', path: '/news' },
    { label: 'Team', path: '/team' },
    { label: 'Contact', path: '/contact' },
  ];

  const allLinks = [...primaryLinks, ...secondaryLinks];

  return (
    <>
      {/* Top Corporate Strip with CAC and Verified Contact in Dutse */}
      <div className="bg-[#07172C] text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-semibold font-mono tracking-tight">
              RC No. 9161655
            </span>
            <span className="hidden sm:inline text-slate-600" aria-hidden="true">|</span>
            <span className="hidden sm:inline text-slate-300 font-medium">
              Sabuwar Takur, Dutse, Jigawa State
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href="tel:08169323996"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>08169323996</span>
            </a>
            <span className="text-slate-600" aria-hidden="true">/</span>
            <a
              href="tel:08104508713"
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <span>08104508713</span>
            </a>
            <span className="hidden md:inline text-slate-600" aria-hidden="true">|</span>
            <a
              href="mailto:wangarawatech@gmail.com"
              className="hidden md:flex items-center gap-1.5 hover:text-amber-400 transition-colors"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span>wangarawatech@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Navigation */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
            : 'bg-white border-b border-slate-200/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Zone 1: Official Logo */}
          <button
            onClick={() => {
              onNavigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg"
          >
            <Logo variant="dark" size="md" showRc />
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            {primaryLinks.map((link) => {
              const active = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => {
                    onNavigate(link.path);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    active
                      ? 'text-[#0B2545] font-bold'
                      : 'hover:text-[#0B2545] text-slate-600'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}

            {/* Dropdown for More */}
            <div className="relative">
              <button
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                className={`flex items-center gap-1 py-1 transition-colors whitespace-nowrap ${
                  secondaryLinks.some((l) => l.path === currentPath)
                    ? 'text-[#0B2545] font-bold'
                    : 'text-slate-600 hover:text-[#0B2545]'
                }`}
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {companyDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-100 py-1.5 z-50"
                  onMouseLeave={() => setCompanyDropdownOpen(false)}
                >
                  {secondaryLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => {
                        onNavigate(link.path);
                        setCompanyDropdownOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                        currentPath === link.path
                          ? 'bg-blue-50/70 text-[#0B2545] font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => {
                onNavigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#0B2545] hover:bg-[#133E87] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 focus-visible:outline-none"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl">
            <div className="flex flex-col space-y-1">
              {allLinks.map((link) => {
                const active = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => {
                      onNavigate(link.path);
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-sm text-left ${
                      active
                        ? 'bg-blue-50 text-[#0B2545] font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  onNavigate('/contact');
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-bold text-white bg-[#0B2545] rounded-lg shadow"
              >
                Contact Wangarawa Tech
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
