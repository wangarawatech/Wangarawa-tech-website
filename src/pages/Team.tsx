import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { TeamMember } from '../types';
import { Mail, Linkedin, Twitter, Award, ShieldCheck } from 'lucide-react';

interface TeamProps {
  onNavigate: (path: string) => void;
}

export const Team: React.FC<TeamProps> = ({ onNavigate }) => {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    setTeam(db.getTeam().filter((m) => m.published));
  }, []);

  return (
    <div className="space-y-16 sm:space-y-20 py-8">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2545] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Executive & Technical Leadership
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Our Team
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Meet the instructors, engineers, and community organizers driving digital literacy, artificial intelligence training, and technology excellence at Wangarawa Global Technology Limited.
            </p>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-square overflow-hidden bg-slate-900 relative">
                  <img
                    src={member.profileImage}
                    alt={member.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs text-amber-400 font-semibold">{member.position}</p>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {member.biography}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-3">
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#0B2545] transition-colors"
                      aria-label="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-[#0B2545] transition-colors"
                      aria-label="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <span className="text-[10px] text-amber-600 font-semibold uppercase font-mono">
                  Wangarawa Tech
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recruitment / Community Mentors Note */}
        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-[#0B2545]">Interested in Teaching or Mentoring?</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We are always looking for passionate software developers, AI practitioners, and data instructors in Jigawa State and across Nigeria to join our visiting faculty.
          </p>
          <button
            onClick={() => onNavigate('/contact')}
            className="px-5 py-2.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-all"
          >
            Apply as Instructor / Volunteer
          </button>
        </div>
      </section>
    </div>
  );
};
