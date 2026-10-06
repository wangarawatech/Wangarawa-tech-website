import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Project } from '../types';
import {
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  ChevronLeft,
  CheckCircle,
  Building2,
  Sparkles,
} from 'lucide-react';

interface ProjectsProps {
  onNavigate: (path: string) => void;
  selectedSlug?: string | null;
  onSelectProject?: (slug: string | null) => void;
}

export const Projects: React.FC<ProjectsProps> = ({
  onNavigate,
  selectedSlug,
  onSelectProject,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    const list = db.getProjects().filter((p) => p.published);
    setProjects(list);

    if (selectedSlug) {
      const match = list.find((p) => p.slug === selectedSlug || p.id === selectedSlug);
      if (match) setActiveProject(match);
    }
  }, [selectedSlug]);

  if (activeProject) {
    return (
      <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => {
            setActiveProject(null);
            if (onSelectProject) onSelectProject(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#0B2545] hover:text-[#133E87]"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Impact Activities</span>
        </button>

        {/* Header */}
        <div className="bg-[#0B2545] rounded-3xl p-8 sm:p-12 text-white space-y-4">
          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold">
            {activeProject.category}
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {activeProject.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{activeProject.projectDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{activeProject.location}</span>
            </div>
          </div>
        </div>

        {/* Narrative & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
              <h3 className="text-xl font-bold text-[#0B2545]">Activity Overview</h3>
              <p className="text-base font-medium text-slate-800 leading-relaxed">
                {activeProject.shortDescription}
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                {activeProject.fullDescription}
              </p>
            </div>

            {/* Impact Areas */}
            {activeProject.impactMetrics && activeProject.impactMetrics.length > 0 && (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                {activeProject.impactMetrics.map((m, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                    <p className="text-xs text-slate-500">{m.label}</p>
                    <p className="text-sm font-bold text-[#0B2545] mt-0.5">{m.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-wide">
                Key Details
              </h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-semibold text-slate-800">{activeProject.category}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold text-slate-800">{activeProject.location}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Timeline:</span>
                  <span className="font-semibold text-slate-800">{activeProject.projectDate}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onNavigate('/contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87]"
                >
                  Partner With Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 sm:space-y-20 py-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2545] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">
              Direction & Operational Capacity
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Projects & Community Impact
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Wangarawa Tech is being built around practical community engagement, technology education and real-world digital skills across Dutse, Jigawa State and Northern Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Measurable Areas Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/80 p-8 rounded-3xl border border-slate-200 space-y-4">
          <div className="max-w-2xl space-y-1">
            <h3 className="text-lg font-bold text-[#0B2545]">How Impact is Measured</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In accordance with our professional commitment to transparency and measurable outcomes, Wangarawa Tech evaluates progress around real operational dimensions:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <p className="text-xs font-bold text-slate-900">People Trained</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Students, youth & learners</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <p className="text-xs font-bold text-slate-900">Projects Delivered</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Websites, data & media</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <p className="text-xs font-bold text-slate-900">Businesses Served</p>
              <p className="text-[11px] text-slate-500 mt-0.5">SMEs, schools & shops</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <p className="text-xs font-bold text-slate-900">Partnerships Established</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Schools & institutions</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <p className="text-xs font-bold text-slate-900">Opportunities Connected</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Youth & career pathways</p>
            </div>
          </div>
        </div>
      </section>

      {/* Directory of Initiatives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h3 className="text-xl font-bold text-[#0B2545]">Current Activities & Initiatives</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                setActiveProject(proj);
                if (onSelectProject) onSelectProject(proj.slug);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-[#0B2545]">
                    {proj.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{proj.projectDate}</span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 leading-snug hover:text-[#0B2545] transition-colors">
                  {proj.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {proj.shortDescription}
                </p>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{proj.location}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B2545] inline-flex items-center gap-1">
                  <span>Read Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[10px] text-amber-600 font-semibold">{proj.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
