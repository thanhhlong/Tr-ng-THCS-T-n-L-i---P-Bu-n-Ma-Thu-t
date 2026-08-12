import React, { useState } from 'react';
import { NewsArticle } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LoginModal } from './components/LoginModal';
import { SiteContentProvider, useSiteContent } from './context/SiteContentContext';
import tanLoiLogo from './assets/images/tan_loi_logo_1786361503805.jpg';

// Portal 1: Website Public Components
import { PublicHome } from './components/WebsitePublic/PublicHome';
import { PublicNews } from './components/WebsitePublic/PublicNews';
import { PublicDocs } from './components/WebsitePublic/PublicDocs';
import { PublicAbout } from './components/WebsitePublic/PublicAbout';

// Portal 2: Admin Portal Components
import { AdminDashboard } from './components/AdminPortal/AdminDashboard';
import { WebContentManager } from './components/AdminPortal/WebContentManager';
import { TeacherManagement } from './components/AdminPortal/TeacherManagement';
import { StudentManagement } from './components/AdminPortal/StudentManagement';
import { ParentManagement } from './components/AdminPortal/ParentManagement';
import { ClassManagement } from './components/AdminPortal/ClassManagement';
import { ReportsModule } from './components/AdminPortal/ReportsModule';

// Portal 3: Teacher Portal Components
import { TeacherDashboard } from './components/TeacherPortal/TeacherDashboard';
import { ClassGradeManager } from './components/TeacherPortal/ClassGradeManager';
import { ClassAttendanceManager } from './components/TeacherPortal/ClassAttendanceManager';
import { AssignmentManager } from './components/TeacherPortal/AssignmentManager';

// Portal 4: Student Portal Components
import { StudentDashboard } from './components/StudentPortal/StudentDashboard';
import { StudentGradebook } from './components/StudentPortal/StudentGradebook';
import { StudentTimetable } from './components/StudentPortal/StudentTimetable';
import { StudentAssignments } from './components/StudentPortal/StudentAssignments';

// Portal 5: Parent Portal Components
import { ParentDashboard } from './components/ParentPortal/ParentDashboard';

// Portal 6: AI Education Hub
import { AiHubMain } from './components/AiHub/AiHubMain';

function AppContent() {
  const { currentUser, schoolInfo } = useSiteContent();

  // Active portal & tab state
  const [activePortal, setActivePortal] = useState<string>('public');
  const [activeTab, setActiveTab] = useState<string>('public-home');

  // Mobile sidebar open state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // News article detail view state
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Switch portal handler
  const handlePortalChange = (portal: string) => {
    setActivePortal(portal);
    setSelectedArticle(null);

    switch (portal) {
      case 'public':
        setActiveTab('public-home');
        break;
      case 'admin':
        setActiveTab('admin-dashboard');
        break;
      case 'teacher':
        setActiveTab('teacher-dashboard');
        break;
      case 'student':
        setActiveTab('student-dashboard');
        break;
      case 'parent':
        setActiveTab('parent-dashboard');
        break;
      case 'ai-hub':
        setActiveTab('ai-chat');
        break;
    }
  };

  // Helper to render main content based on portal and activeTab
  const renderContent = () => {
    // 1. PUBLIC WEBSITE PORTAL
    if (activePortal === 'public') {
      if (activeTab === 'public-about') {
        return <PublicAbout />;
      }
      if (activeTab === 'public-news' || activeTab === 'public-announcements') {
        return (
          <PublicNews
            selectedArticle={selectedArticle}
            onClearSelectedArticle={() => setSelectedArticle(null)}
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        );
      }
      if (activeTab === 'public-library' || activeTab === 'public-documents') {
        return <PublicDocs />;
      }
      if (activeTab === 'public-admissions') {
        return <PublicAbout />;
      }
      // Default: Public Home
      return (
        <PublicHome
          onNavigateTab={(tab) => setActiveTab(tab)}
          onSelectArticle={(art) => {
            setSelectedArticle(art);
            setActiveTab('public-news');
          }}
          onOpenAiHub={() => handlePortalChange('ai-hub')}
        />
      );
    }

    // 2. ADMIN PORTAL
    if (activePortal === 'admin') {
      if (activeTab === 'admin-cms') return <WebContentManager />;
      if (activeTab === 'admin-teachers') return <TeacherManagement />;
      if (activeTab === 'admin-students') return <StudentManagement />;
      if (activeTab === 'admin-parents') return <ParentManagement />;
      if (activeTab === 'admin-classes') return <ClassManagement />;
      if (activeTab === 'admin-reports') return <ReportsModule />;
      if (activeTab === 'admin-timetable') return <StudentTimetable />;
      return <AdminDashboard />;
    }

    // 3. TEACHER PORTAL
    if (activePortal === 'teacher') {
      if (activeTab === 'teacher-classes') return <ClassManagement />;
      if (activeTab === 'teacher-grades') return <ClassGradeManager />;
      if (activeTab === 'teacher-attendance') return <ClassAttendanceManager />;
      if (activeTab === 'teacher-assignments') return <AssignmentManager />;
      if (activeTab === 'teacher-timetable') return <StudentTimetable />;
      return (
        <TeacherDashboard
          currentUser={currentUser}
          onNavigateTab={(tab) => setActiveTab(tab)}
          onOpenAiHub={() => handlePortalChange('ai-hub')}
        />
      );
    }

    // 4. STUDENT PORTAL
    if (activePortal === 'student') {
      if (activeTab === 'student-timetable') return <StudentTimetable />;
      if (activeTab === 'student-grades') return <StudentGradebook />;
      if (activeTab === 'student-attendance') return <ClassAttendanceManager />;
      if (activeTab === 'student-assignments') return <StudentAssignments />;
      if (activeTab === 'student-library') return <PublicDocs />;
      return (
        <StudentDashboard
          currentUser={currentUser}
          onNavigateTab={(tab) => setActiveTab(tab)}
          onOpenAiHub={() => handlePortalChange('ai-hub')}
        />
      );
    }

    // 5. PARENT PORTAL
    if (activePortal === 'parent') {
      if (activeTab === 'parent-grades') return <StudentGradebook />;
      if (activeTab === 'parent-attendance') return <ClassAttendanceManager />;
      return <ParentDashboard currentUser={currentUser} onOpenAiHub={() => handlePortalChange('ai-hub')} />;
    }

    // 6. AI EDUCATION HUB
    if (activePortal === 'ai-hub') {
      return <AiHubMain activeTab={activeTab} setActiveTab={setActiveTab} />;
    }

    return (
      <PublicHome
        onNavigateTab={(tab) => setActiveTab(tab)}
        onSelectArticle={(art) => setSelectedArticle(art)}
        onOpenAiHub={() => handlePortalChange('ai-hub')}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Top Security Authentication Modal */}
      <LoginModal />

      {/* Top Navigation Bar */}
      <Navbar
        onOpenSearch={() => {}}
        activePortal={activePortal}
        setActivePortal={handlePortalChange}
        sidebarOpen={isSidebarOpen}
        setSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setSelectedArticle(null);
        }}
      />

      {/* Body Area with Sidebar and Main Content */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Left Drawer / Sidebar */}
        <Sidebar
          currentUser={currentUser}
          activePortal={activePortal}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setSelectedArticle(null);
          }}
          setActivePortal={handlePortalChange}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Right Main Content Stage */}
        <main className="flex-1 min-w-0 lg:pl-8">
          {renderContent()}
        </main>
      </div>

      {/* Footer */}
      <footer className="h-10 bg-white border-t border-slate-200 px-4 sm:px-8 flex items-center justify-between shrink-0 text-[11px] text-slate-600 font-medium mt-auto">
        <div className="flex items-center gap-2">
          <img
            src={tanLoiLogo}
            alt="Logo Trường THCS Tân Lợi"
            referrerPolicy="no-referrer"
            className="w-5 h-5 rounded-full object-contain shrink-0"
          />
          <p>© 2026 {schoolInfo.name} — Hệ thống Cổng Thông tin & Quản trị Giáo dục Số</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">
            Tình trạng hệ thống: <span className="text-emerald-600 font-bold">● ỔN ĐỊNH (MÃ HÓA SSL)</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SiteContentProvider>
      <AppContent />
    </SiteContentProvider>
  );
}
