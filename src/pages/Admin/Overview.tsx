import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import {
  Briefcase,
  GraduationCap,
  Newspaper,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Plus,
} from 'lucide-react';

interface OverviewProps {
  onSelectTab: (tab: string) => void;
}

export const Overview: React.FC<OverviewProps> = ({ onSelectTab }) => {
  const [projectsCount, setProjectsCount] = useState(0);
  const [publishedProjectsCount, setPublishedProjectsCount] = useState(0);
  const [programsCount, setProgramsCount] = useState(0);
  const [newsCount, setNewsCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const projs = db.getProjects();
    setProjectsCount(projs.length);
    setPublishedProjectsCount(projs.filter((p) => p.published).length);
    setProgramsCount(db.getPrograms().length);
    setNewsCount(db.getNews().length);
    setMediaCount(db.getMedia().length);
    const msgs = db.getMessages();
    setMessagesCount(msgs.length);
    setUnreadMessages(msgs.filter((m) => !m.read).length);
  }, []);

  const stats = [
    {
      label: 'Total Projects',
      value: projectsCount,
      sublabel: `${publishedProjectsCount} published online`,
      icon: Briefcase,
      color: 'bg-blue-500',
      tab: 'projects',
    },
    {
      label: 'Cohort Programs',
      value: programsCount,
      sublabel: 'Active & upcoming tracks',
      icon: GraduationCap,
      color: 'bg-emerald-500',
      tab: 'programs',
    },
    {
      label: 'News & Articles',
      value: newsCount,
      sublabel: 'Published journal entries',
      icon: Newspaper,
      color: 'bg-amber-500',
      tab: 'news',
    },
    {
      label: 'Media Assets',
      value: mediaCount,
      sublabel: 'Images & project media',
      icon: ImageIcon,
      color: 'bg-indigo-500',
      tab: 'media',
    },
    {
      label: 'Contact Messages',
      value: messagesCount,
      sublabel: `${unreadMessages} unread inquiries`,
      icon: MessageSquare,
      color: 'bg-rose-500',
      tab: 'messages',
    },
  ];

  const recentMessages = db.getMessages().slice(0, 4);
  const recentProjects = db.getProjects().slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Wangarawa Tech Administrator Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your company website content, projects, training cohorts, and community inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('projects')}
            className="px-4 py-2 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-colors flex items-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>New Project</span>
          </button>
          <button
            onClick={() => onSelectTab('programs')}
            className="px-4 py-2 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors flex items-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Program</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              onClick={() => onSelectTab(s.tab)}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600">{s.label}</span>
                <div className={`p-2 rounded-xl text-white ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                  {s.value}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{s.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2-Column Split: Recent Projects + Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Featured Projects</h3>
            <button
              onClick={() => onSelectTab('projects')}
              className="text-xs text-[#0B2545] font-semibold hover:underline"
            >
              Manage all &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/40 transition-colors"
              >
                <div className="space-y-0.5 max-w-xs">
                  <p className="text-xs font-bold text-slate-800 truncate">{p.title}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{p.category} · {p.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.published
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {p.published ? 'Published' : 'Draft'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recent Contact Messages</h3>
            <button
              onClick={() => onSelectTab('messages')}
              className="text-xs text-[#0B2545] font-semibold hover:underline"
            >
              View inbox ({unreadMessages} unread) &rarr;
            </button>
          </div>

          <div className="space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No inquiries received yet. Visitors can submit messages via the public Contact page.
              </p>
            ) : (
              recentMessages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => onSelectTab('messages')}
                  className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                    !m.read
                      ? 'bg-amber-50/70 border-amber-200'
                      : 'bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{m.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                    {m.subject || m.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
