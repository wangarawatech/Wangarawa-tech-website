import React from 'react';
import {
  ShieldCheck,
  Target,
  Compass,
  MapPin,
  CheckCircle2,
  Users,
  Building2,
  Handshake,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AboutProps {
  onNavigate: (path: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const supportAreas = [
    {
      title: 'Training Infrastructure',
      desc: 'Computers, desks/chairs, projector/display, networking and reliable power solutions.',
    },
    {
      title: 'Media & Content',
      desc: 'Podcast/media equipment, lighting, microphones and content production support.',
    },
    {
      title: 'Connectivity',
      desc: 'Reliable internet and communication infrastructure for online learning and services.',
    },
    {
      title: 'Marketing & Outreach',
      desc: 'School/community outreach, promotional materials and awareness campaigns.',
    },
    {
      title: 'Programme Sponsorship',
      desc: 'Sponsorship of students/youth who cannot afford practical technology training.',
    },
    {
      title: 'Technical Partnership',
      desc: 'Trainers, mentors, software/tools, curriculum support and institutional partnerships.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8">
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B2545] rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold font-mono">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>RC No. 9161655 · Dutse, Jigawa State</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              About Wangarawa Global Technology Limited
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              “Empowering the next generation of innovators.” Wangarawa Tech is a technology and digital skills company focused on helping young people, students, businesses and organisations build practical digital capacity and access useful technology services.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Official Vision & Mission (Exact Source of Truth) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B2545]">
              <Compass className="w-6 h-6 text-amber-600" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">Official Vision</span>
              <h3 className="text-xl font-bold text-[#0B2545]">Our Vision</h3>
            </div>
            <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed italic border-l-2 border-amber-400 pl-4">
              “To become a trusted technology and digital skills hub from Jigawa, serving people and organisations across Nigeria and contributing to a globally competitive generation of innovators.”
            </blockquote>
          </div>

          {/* Mission */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B2545]">
              <Target className="w-6 h-6 text-[#0B2545]" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#0B2545]">Official Mission</span>
              <h3 className="text-xl font-bold text-[#0B2545]">Our Mission</h3>
            </div>
            <blockquote className="text-slate-700 text-sm sm:text-base leading-relaxed italic border-l-2 border-[#0B2545] pl-4">
              “To make practical technology education and digital services accessible, useful and career-oriented, while creating opportunities for young people to learn, build, work and solve real-world problems with technology.”
            </blockquote>
          </div>
        </div>
      </section>

      {/* 3. Company Narrative & Leadership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                Company Description & Scope
              </p>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545] tracking-tight">
                Building Practical Technology Capacity in Dutse
              </h2>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Wangarawa Global Technology Limited (Wangarawa Tech) was founded to tackle digital skill gaps and provide essential technology services in Dutse, Jigawa State. Under the leadership of <strong>Sulaiman Ado (Director General)</strong>, the company combines structured technology training with practical everyday digital services and community-driven innovation.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              The immediate strategic focus is to build a credible technology centre in Dutse, deliver practical training, serve local businesses and students, and grow a strong talent pipeline that can compete beyond Jigawa.
            </p>

            {/* Strategic Roles */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase">Wangarawa Tech is Positioned As:</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>A practical technology training and digital services centre.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>A youth-focused platform for digital skills, AI and emerging technology.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>A service provider for individuals, businesses, schools and organisations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>A foundation for future technology products, partnerships and innovation programmes.</span>
                </li>
              </ul>
            </div>

            {/* Official Headquarters Card */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0B2545]">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Physical Technology Centre</span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                No. 003 Wangara Shopping Complex, Sabuwar Takur, Dutse, Jigawa State, Nigeria.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-4/3 bg-slate-900">
              <img
                src="/images/hero_wangarawa_tech.jpg"
                alt="Wangarawa Tech Lab and Students"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-16/9 bg-slate-900">
              <img
                src="/images/office_innovation_hub.jpg"
                alt="Wangarawa Tech Office Interior"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. How Wangarawa Tech Operates (5 Principles) */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Operating Model</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545]">
              How Wangarawa Tech Operates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our sustainable operational methodology combines revenue-generating services with impactful training.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="font-mono text-xs font-black text-amber-600">01</span>
              <h3 className="text-base font-bold text-[#0B2545]">TRAIN</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Deliver structured practical training with projects, exercises and certificates where applicable.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="font-mono text-xs font-black text-amber-600">02</span>
              <h3 className="text-base font-bold text-[#0B2545]">SERVE</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide reliable day-to-day digital services to generate recurring local revenue.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="font-mono text-xs font-black text-amber-600">03</span>
              <h3 className="text-base font-bold text-[#0B2545]">BUILD</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Develop websites, data solutions and digital products for clients and internal projects.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="font-mono text-xs font-black text-amber-600">04</span>
              <h3 className="text-base font-bold text-[#0B2545]">CONNECT</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Create partnerships with schools, institutions, government programmes, businesses and technology communities.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <span className="font-mono text-xs font-black text-amber-600">05</span>
              <h3 className="text-base font-bold text-[#0B2545]">GROW</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Develop trainers, volunteers and young professionals who can expand the company's capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Support & Strategic Partnership Opportunities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Strategic Collaboration</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2545]">
            Support & Partnership
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Wangarawa Tech is open to strategic support from individuals, institutions, organisations and partners who believe in youth technology development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportAreas.map((area, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <h4 className="text-sm font-bold text-[#0B2545]">{area.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>

        {/* Guiding Principle */}
        <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200">
          <p className="text-xs font-bold text-amber-900 uppercase">Guiding Principle:</p>
          <p className="text-xs text-amber-800 mt-1 leading-relaxed">
            Support will be directed toward productive assets and activities that increase the centre's ability to train people, serve customers and generate sustainable revenue.
          </p>
        </div>
      </section>

      {/* 6. Professional Commitment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0B2545] text-white space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">Our Pledge</span>
            <h3 className="text-xl sm:text-3xl font-extrabold">Professional Commitment</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Wangarawa Tech prioritises activities that directly strengthen training quality, customer service, technology infrastructure and sustainable growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-xs font-bold text-amber-400">Professional Service Delivery</p>
              <p className="text-[11px] text-slate-300">High standards across document services and classroom instruction.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-xs font-bold text-amber-400">Transparent Use of Support</p>
              <p className="text-[11px] text-slate-300">Accountability for partner investments and productive assets.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-xs font-bold text-amber-400">Continuous Learning</p>
              <p className="text-[11px] text-slate-300">Continual curriculum refinement to keep pace with AI and tech.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <p className="text-xs font-bold text-amber-400">Measurable Impact</p>
              <p className="text-[11px] text-slate-300">Tracking people trained, projects delivered and businesses served.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
