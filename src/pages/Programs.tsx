import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { Program } from '../types';
import {
  Cpu,
  BarChart3,
  Shield,
  Code,
  Monitor,
  CheckCircle2,
  MapPin,
  Users,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface ProgramsProps {
  onNavigate: (path: string) => void;
}

const getProgramIcon = (title: string) => {
  if (title.includes('AI')) return <Cpu className="w-6 h-6 text-amber-500" />;
  if (title.includes('Data')) return <BarChart3 className="w-6 h-6 text-amber-500" />;
  if (title.includes('Cyber')) return <Shield className="w-6 h-6 text-amber-500" />;
  if (title.includes('Web')) return <Code className="w-6 h-6 text-amber-500" />;
  return <Monitor className="w-6 h-6 text-amber-500" />;
};

export const Programs: React.FC<ProgramsProps> = ({ onNavigate }) => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    setPrograms(db.getPrograms().filter((p) => p.published));
  }, []);

  return (
    <div className="space-y-16 sm:space-y-20 py-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2545] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">
              Official Core Training Curriculum
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Training & Programmes
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Wangarawa Tech delivers practical, career-oriented training across five core tracks designed to build real digital capacity for students, youth, job seekers and local businesses in Dutse.
            </p>
          </div>
        </div>
      </section>

      {/* Official 5 Core Programmes Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, idx) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                      {getProgramIcon(prog.title)}
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#0B2545] border border-blue-100">
                      Track 0{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-amber-600 font-medium">
                      {prog.status}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Highlights */}
                  {prog.curriculumHighlights && prog.curriculumHighlights.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <p className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                        Core Syllabus Modules:
                      </p>
                      {prog.curriculumHighlights.slice(0, 3).map((mod, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{mod}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1 text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{prog.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{prog.targetAudience}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2 border-t border-slate-50 mt-4">
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                >
                  View Full Syllabus Outline
                </button>
                <button
                  onClick={() => {
                    onNavigate('/contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Register at Dutse Centre</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Program Details Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase font-mono">
                  Official Wangarawa Tech Track
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{selectedProgram.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700">
              <p className="leading-relaxed font-medium">{selectedProgram.description}</p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-2">
                <div>
                  <span className="text-slate-400 block font-semibold">Location:</span>
                  <span className="text-slate-800">{selectedProgram.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Target Audience:</span>
                  <span className="text-slate-800">{selectedProgram.targetAudience}</span>
                </div>
              </div>

              {selectedProgram.curriculumHighlights && selectedProgram.curriculumHighlights.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                    Full Syllabus Breakdown
                  </h4>
                  <div className="space-y-2">
                    {selectedProgram.curriculumHighlights.map((mod, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedProgram(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedProgram(null);
                  onNavigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87]"
              >
                Apply for Next Cohort
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
