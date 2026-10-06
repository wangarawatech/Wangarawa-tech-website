import React from 'react';
import { Logo } from '../common/Logo';
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Shield,
  Heart,
  Lock,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#07172C] text-slate-300 border-t border-white/10">
      {/* Upper Strategic Callout Banner */}
      <div className="border-b border-white/5 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold font-mono">
                Dutse Technology & Digital Services Centre
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ready to learn practical digital skills or access reliable tech services?
            </p>
            <p className="text-sm text-slate-400">
              Visit our centre at Wangara Shopping Complex, Sabuwar Takur, Dutse.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://wa.me/2348169323996?text=Hello%20Wangarawa%20Tech%2C%20I%20would%20like%20to%20inquire%20about%20your%20training%20programmes%20and%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={() => {
                onNavigate('/contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition-all"
            >
              <span>Contact Dutse Office</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & CAC RC Registration */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" showRc />
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Wangarawa Global Technology Limited (Wangarawa Tech) is a technology and digital skills company focused on helping young people, students, businesses and organisations build practical digital capacity and access useful technology services.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="font-mono text-slate-300 font-medium">
                  CAC RC No. 9161655
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors">
                  About Wangarawa Tech
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/services')} className="hover:text-white transition-colors">
                  Digital Services
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/programs')} className="hover:text-white transition-colors">
                  Training & Programmes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/projects')} className="hover:text-white transition-colors">
                  Projects & Impact
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/news')} className="hover:text-white transition-colors">
                  News & Updates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/team')} className="hover:text-white transition-colors">
                  Leadership Team
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Five Core Training Programmes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Core Programmes
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>AI & Prompt Engineering</li>
              <li>Data Analytics & Data Science</li>
              <li>Cybersecurity Fundamentals</li>
              <li>Web Development</li>
              <li>Basic Digital Skills & Literacy</li>
            </ul>
          </div>

          {/* Column 4: Physical Location & Verified Helplines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Official Headquarters
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  No. 003 Wangara Shopping Complex, Sabuwar Takur, Dutse, Jigawa State, Nigeria.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href="mailto:wangarawatech@gmail.com"
                  className="hover:text-amber-400 transition-colors"
                >
                  wangarawatech@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:08169323996" className="hover:text-amber-400 transition-colors font-mono">
                    08169323996
                  </a>
                  <a href="tel:08104508713" className="hover:text-amber-400 transition-colors font-mono">
                    08104508713
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Discreet Staff Link */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Wangarawa Global Technology Limited.</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved.</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-amber-400/80">RC No. 9161655</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Dutse, Jigawa State, Nigeria <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
            </span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                onNavigate('/staff/login');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-500 hover:text-slate-300 transition-colors inline-flex items-center gap-1"
              title="Staff Access"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
