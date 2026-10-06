import React, { useState } from 'react';
import { db } from '../../services/db';
import { AdminLayout } from './AdminLayout';
import { Overview } from './Overview';
import { ProjectsManager } from './ProjectsManager';
import { ProgramsManager } from './ProgramsManager';
import { ServicesManager } from './ServicesManager';
import { NewsManager } from './NewsManager';
import { MediaLibrary } from './MediaLibrary';
import { TeamManager } from './TeamManager';
import { HomepageManager } from './HomepageManager';
import { TestimonialsManager } from './TestimonialsManager';
import { PartnersManager } from './PartnersManager';
import { MessagesManager } from './MessagesManager';
import { SettingsManager } from './SettingsManager';

interface AdminDashboardProps {
  onLogout: () => void;
  onViewWebsite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onLogout,
  onViewWebsite,
}) => {
  const [currentTab, setCurrentTab] = useState<string>('overview');

  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return <Overview onSelectTab={setCurrentTab} />;
      case 'projects':
        return <ProjectsManager />;
      case 'programs':
        return <ProgramsManager />;
      case 'services':
        return <ServicesManager />;
      case 'news':
        return <NewsManager />;
      case 'media':
        return <MediaLibrary />;
      case 'team':
        return <TeamManager />;
      case 'homepage':
        return <HomepageManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'partners':
        return <PartnersManager />;
      case 'messages':
        return <MessagesManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <Overview onSelectTab={setCurrentTab} />;
    }
  };

  return (
    <AdminLayout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      onLogout={onLogout}
      onViewWebsite={onViewWebsite}
    >
      {renderContent()}
    </AdminLayout>
  );
};
