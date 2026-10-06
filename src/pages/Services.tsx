import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Service } from '../types';
import {
  Printer,
  Globe,
  Code,
  BarChart3,
  Sparkles,
  Mic,
  ArrowRight,
  CheckCircle,
  MapPin,
  Clock,
} from 'lucide-react';

interface ServicesProps {
  onNavigate: (path: string) => void;
}

const getServiceIcon = (name: string) => {
  switch (name) {
    case 'Printer': return <Printer className="w-6 h-6 text-amber-500" />;
    case 'Globe': return <Globe className="w-6 h-6 text-amber-500" />;
    case 'Code': return <Code className="w-6 h-6 text-amber-500" />;
    case 'BarChart3': return <BarChart3 className="w-6 h-6 text-amber-500" />;
    case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-500" />;
    case 'Mic': return <Mic className="w-6 h-6 text-amber-500" />;
    default: return <Sparkles className="w-6 h-6 text-amber-500" />;
  }
};

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    setServices(db.getServices().filter((s) => s.published));
  }, []);

  return (
    <div className="space-y-16 sm:space-y-20 py-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2545] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">
              Official Digital Services
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Our Digital Services
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Providing dependable technology and documentation solutions to individuals, businesses, schools and organisations at our Sabuwar Takur centre in Dutse, Jigawa State.
            </p>
          </div>
        </div>
      </section>

      {/* Six Official Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    {getServiceIcon(service.iconName)}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    SERVICE 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">
                    {service.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {service.longDescription && (
                  <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                    {service.longDescription}
                  </p>
                )}
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <MapPin className="w-3 h-3 text-amber-600" />
                  <span>Dutse Office</span>
                </div>

                <button
                  onClick={() => {
                    onNavigate('/contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-50 hover:bg-[#0B2545] hover:text-white text-[#0B2545] text-xs font-bold transition-colors"
                >
                  Request Service
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Physical Office Availability Notice */}
        <div className="p-6 rounded-2xl bg-slate-100/70 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-[#0B2545]">Walk-in Service Hours at Sabuwar Takur</h4>
            <p className="text-xs text-slate-600">
              Monday – Friday: 8:00 AM – 6:00 PM · Saturday: 9:00 AM – 4:00 PM · No. 003 Wangara Shopping Complex, Dutse
            </p>
          </div>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-5 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] shrink-0"
          >
            Visit Our Office
          </button>
        </div>
      </section>
    </div>
  );
};
