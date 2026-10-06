import React, { useState } from 'react';
import { Logo } from '../../components/common/Logo';
import { db } from '../../services/db';
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Sparkles,
  Newspaper,
  Image as ImageIcon,
  Users,
  Sliders,
  MessageSquare,
  Handshake,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Star,
} from 'lucide-react';

interface AdminLayoutProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
  onViewWebsite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  onViewWebsite,
  children,
}) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const unreadMessagesCount = db.getMessages().filter((m) => !m.read).length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects & Impact', icon: Briefcase },
    { id: 'programs', label: 'Programs & Training', icon: GraduationCap },
    { id: 'services', label: 'Services', icon: Sparkles },
    { id: 'news', label: 'News & Updates', icon: Newspaper },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'homepage', label: 'Homepage Slides', icon: Sliders },
    { id: 'testimonials', label: 'Testimonials', icon: Star },
    { id: 'partners', label: 'Partners', icon: Handshake },
    {
      id: 'messages',
      label: 'Contact Messages',
      icon: MessageSquare,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    { id: 'settings', label: 'Settings & Supabase', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#07172C] text-white p-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Logo variant="light" size="sm" />
          <span className="text-xs font-bold text-amber-400 font-mono">CMS</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 rounded-lg bg-white/10 text-white"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileSidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 bg-[#07172C] text-slate-300 flex flex-col justify-between shrink-0 md:sticky md:top-0 md:h-screen border-r border-white/5 z-40`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Logo & Brand Zone */}
          <div className="px-2 pt-2 pb-4 border-b border-white/10">
            <Logo variant="light" size="md" showRc />
            <div className="mt-2 text-[10px] text-amber-400 font-mono font-semibold">
              Admin CMS Control Panel
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold shadow'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-slate-950 text-white'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-[#040D1A]">
          <button
            onClick={onViewWebsite}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-amber-400" />
            <span>View Public Website</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-50 p-4 sm:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
};
