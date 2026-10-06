import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Programs } from './pages/Programs';
import { Projects } from './pages/Projects';
import { News } from './pages/News';
import { Team } from './pages/Team';
import { Contact } from './pages/Contact';
import { AdminLogin } from './pages/Admin/AdminLogin';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { db } from './services/db';
import { MessageCircle } from 'lucide-react';

// Helper to parse route from browser pathname or hash
function resolveCurrentRoute(): string {
  if (typeof window === 'undefined') return '/';

  // 1. Check window.location.pathname
  let pathname = (window.location.pathname || '').trim();
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  const lowerPath = pathname.toLowerCase();
  if (lowerPath === '/admin' || lowerPath.startsWith('/admin/')) {
    return '/admin';
  }
  if (lowerPath === '/staff' || lowerPath === '/staff/login' || lowerPath === '/login') {
    return '/admin';
  }

  // 2. Check window.location.hash fallback (supports #/admin or #admin)
  const hash = (window.location.hash || '').trim().toLowerCase();
  if (hash === '#/admin' || hash === '#admin' || hash.startsWith('#/admin') || hash.startsWith('#admin')) {
    return '/admin';
  }
  if (hash === '#/staff' || hash === '#/staff/login') {
    return '/admin';
  }

  const validPaths = ['/about', '/services', '/programs', '/projects', '/news', '/team', '/contact'];
  for (const p of validPaths) {
    if (lowerPath === p || lowerPath.startsWith(`${p}/`)) {
      return p;
    }
    if (hash === `#${p}` || hash === `#${p}/` || hash.startsWith(`#${p}`)) {
      return p;
    }
  }

  return pathname || '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(resolveCurrentRoute);
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => db.isAdminLoggedIn());

  // Bidirectional route sync across browser history (popstate, pushstate, hashchange)
  useEffect(() => {
    const handleUrlChange = () => {
      const detected = resolveCurrentRoute();
      setCurrentPath(detected);
      setIsAdminLoggedIn(db.isAdminLoggedIn());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Initial check on mount
    const initial = resolveCurrentRoute();
    if (initial !== currentPath) {
      setCurrentPath(initial);
    }

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [currentPath]);

  // Update dynamic document title based on current page
  useEffect(() => {
    const titleMap: Record<string, string> = {
      '/': 'Wangarawa Global Technology Limited | Empowering the Next Generation of Innovators',
      '/about': 'About Us | Wangarawa Global Technology Limited (RC 9161655)',
      '/services': 'Services & Solutions | Wangarawa Global Technology Limited',
      '/programs': 'Programs & Cohort Training | Wangarawa Global Technology Limited',
      '/projects': 'Projects & Our Impact in Jigawa | Wangarawa Global Technology Limited',
      '/news': 'News & Updates | Wangarawa Global Technology Limited',
      '/team': 'Executive & Technical Team | Wangarawa Global Technology Limited',
      '/contact': 'Contact & Location in Dutse | Wangarawa Global Technology Limited',
      '/admin': 'Admin CMS Portal | Wangarawa Global Technology Limited',
    };

    document.title = titleMap[currentPath] || 'Wangarawa Global Technology Limited';
  }, [currentPath]);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setSelectedProjectSlug(null);
    setSelectedArticleSlug(null);
    if (typeof window !== 'undefined' && window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (slug: string | null) => {
    setSelectedProjectSlug(slug);
    setCurrentPath('/projects');
    if (typeof window !== 'undefined' && window.location.pathname !== '/projects') {
      window.history.pushState(null, '', '/projects');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string | null) => {
    setSelectedArticleSlug(slug);
    setCurrentPath('/news');
    if (typeof window !== 'undefined' && window.location.pathname !== '/news') {
      window.history.pushState(null, '', '/news');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentPath('/admin');
    if (typeof window !== 'undefined' && window.location.pathname !== '/admin') {
      window.history.pushState(null, '', '/admin');
    }
  };

  const handleAdminLogout = () => {
    db.logoutAdmin();
    setIsAdminLoggedIn(false);
    setCurrentPath('/');
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
  };

  // If in Admin route
  if (currentPath === '/admin') {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          onLoginSuccess={handleAdminLoginSuccess}
          onBackToWebsite={() => handleNavigate('/')}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={handleAdminLogout}
        onViewWebsite={() => handleNavigate('/')}
      />
    );
  }

  // Render Public Website Page
  const renderPublicPage = () => {
    switch (currentPath) {
      case '/':
        return (
          <Home
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
            onSelectArticle={handleSelectArticle}
          />
        );
      case '/about':
        return <About onNavigate={handleNavigate} />;
      case '/services':
        return <Services onNavigate={handleNavigate} />;
      case '/programs':
        return <Programs onNavigate={handleNavigate} />;
      case '/projects':
        return (
          <Projects
            onNavigate={handleNavigate}
            selectedSlug={selectedProjectSlug}
            onSelectProject={handleSelectProject}
          />
        );
      case '/news':
        return (
          <News
            onNavigate={handleNavigate}
            selectedSlug={selectedArticleSlug}
            onSelectArticle={handleSelectArticle}
          />
        );
      case '/team':
        return <Team onNavigate={handleNavigate} />;
      case '/contact':
        return <Contact onNavigate={handleNavigate} />;
      default:
        return (
          <Home
            onNavigate={handleNavigate}
            onSelectProject={handleSelectProject}
            onSelectArticle={handleSelectArticle}
          />
        );
    }
  };

  const whatsappQuickUrl = `https://wa.me/2348169323996?text=Hello%20Wangarawa%20Global%20Technology%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navbar */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {renderPublicPage()}
      </main>

      {/* Corporate Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Quick Action Button */}
      <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40">
        <a
          href={whatsappQuickUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 p-3 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          aria-label="Direct WhatsApp Contact Desk"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline text-xs font-bold tracking-tight">
            Chat with Us
          </span>
        </a>
      </aside>
    </div>
  );
}
