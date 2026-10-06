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

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(db.isAdminLoggedIn());

  // Listen for browser back/forward or hash changes if any
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname || '/';
      if (path.startsWith('/admin')) {
        setCurrentPath('/admin');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (slug: string | null) => {
    setSelectedProjectSlug(slug);
    setCurrentPath('/projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (slug: string | null) => {
    setSelectedArticleSlug(slug);
    setCurrentPath('/news');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setCurrentPath('/admin');
  };

  const handleAdminLogout = () => {
    db.logoutAdmin();
    setIsAdminLoggedIn(false);
    setCurrentPath('/');
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
