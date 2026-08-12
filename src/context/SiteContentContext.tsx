import React, { createContext, useContext, useState } from 'react';
import { SchoolInfo, NewsArticle, Announcement, DocumentItem, Achievement, User } from '../types';
import { mockSchoolInfo, mockNewsArticles, mockAnnouncements, mockDocuments, mockAchievements, demoUsers } from '../data/mockData';

interface SiteContentContextType {
  // Authentication State & Handlers
  isAuthenticated: boolean;
  currentUser: User;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  login: (codeOrUser: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;
  switchUserRole: (role: User['role']) => void;

  // School General Info
  schoolInfo: SchoolInfo;
  updateSchoolInfo: (info: Partial<SchoolInfo>) => void;

  // News Articles
  newsArticles: NewsArticle[];
  addNewsArticle: (article: Omit<NewsArticle, 'id'>) => void;
  updateNewsArticle: (id: string, article: Partial<NewsArticle>) => void;
  deleteNewsArticle: (id: string) => void;

  // Announcements
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  // Documents
  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id' | 'downloadCount'>) => void;
  updateDocument: (id: string, doc: Partial<DocumentItem>) => void;
  deleteDocument: (id: string) => void;

  // Achievements
  achievements: Achievement[];
  addAchievement: (ach: Omit<Achievement, 'id'>) => void;
  updateAchievement: (id: string, ach: Partial<Achievement>) => void;
  deleteAchievement: (id: string) => void;
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default logged in for easy demo access
  const [currentUser, setCurrentUser] = useState<User>(demoUsers[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Content States
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(mockSchoolInfo);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(mockNewsArticles);
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [documents, setDocuments] = useState<DocumentItem[]>(mockDocuments);
  const [achievements, setAchievements] = useState<Achievement[]>(mockAchievements);

  // Authentication Actions
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const login = (codeOrUser: string, pass: string) => {
    const term = codeOrUser.toLowerCase().trim();
    if (pass.trim() !== '123456' && pass.trim() !== 'admin' && pass.trim() !== '123') {
      return { success: false, message: 'Mật khẩu không chính xác! (Mật khẩu mặc định: 123456)' };
    }

    let matchedUser: User | undefined;
    if (term === 'admin' || term === 'bgh' || term === 'bgh01') {
      matchedUser = demoUsers.find((u) => u.role === 'principal' || u.role === 'admin') || demoUsers[0];
    } else if (term === 'gvcn' || term === 'teacher' || term === 'gv101') {
      matchedUser = demoUsers.find((u) => u.role === 'homeroom_teacher') || demoUsers[1];
    } else if (term === 'hocsinh' || term === 'student' || term === 'hs901') {
      matchedUser = demoUsers.find((u) => u.role === 'student') || demoUsers[3];
    } else if (term === 'phuhuynh' || term === 'parent' || term === 'ph901') {
      matchedUser = demoUsers.find((u) => u.role === 'parent') || demoUsers[4];
    } else {
      matchedUser = demoUsers.find(
        (u) => u.code.toLowerCase() === term || u.email.toLowerCase().includes(term) || u.name.toLowerCase().includes(term)
      );
    }

    if (!matchedUser) {
      matchedUser = demoUsers[0]; // fallback to admin
    }

    setCurrentUser(matchedUser);
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    return { success: true, message: `Xin chào ${matchedUser.name}!` };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(demoUsers[5] || {
      id: 'guest',
      code: 'GUEST',
      name: 'Khách Ghé Thăm',
      email: 'khach@thcstanloi.edu.vn',
      role: 'guest',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      status: 'active',
    });
  };

  const switchUserRole = (role: User['role']) => {
    const userMatch = demoUsers.find((u) => u.role === role) || demoUsers[0];
    setCurrentUser(userMatch);
    setIsAuthenticated(role !== 'guest');
  };

  // Content Handlers
  const updateSchoolInfo = (info: Partial<SchoolInfo>) => {
    setSchoolInfo((prev) => ({ ...prev, ...info }));
  };

  const addNewsArticle = (articleData: Omit<NewsArticle, 'id'>) => {
    const newArt: NewsArticle = {
      ...articleData,
      id: `news-${Date.now()}`,
    };
    setNewsArticles((prev) => [newArt, ...prev]);
  };

  const updateNewsArticle = (id: string, articleData: Partial<NewsArticle>) => {
    setNewsArticles((prev) => prev.map((art) => (art.id === id ? { ...art, ...articleData } : art)));
  };

  const deleteNewsArticle = (id: string) => {
    setNewsArticles((prev) => prev.filter((art) => art.id !== id));
  };

  const addAnnouncement = (annData: Omit<Announcement, 'id'>) => {
    const newAnn: Announcement = {
      ...annData,
      id: `ann-${Date.now()}`,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const updateAnnouncement = (id: string, annData: Partial<Announcement>) => {
    setAnnouncements((prev) => prev.map((ann) => (ann.id === id ? { ...ann, ...annData } : ann)));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
  };

  const addDocument = (docData: Omit<DocumentItem, 'id' | 'downloadCount'>) => {
    const newDoc: DocumentItem = {
      ...docData,
      id: `doc-${Date.now()}`,
      downloadCount: 0,
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const updateDocument = (id: string, docData: Partial<DocumentItem>) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, ...docData } : doc)));
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const addAchievement = (achData: Omit<Achievement, 'id'>) => {
    const newAch: Achievement = {
      ...achData,
      id: `ach-${Date.now()}`,
    };
    setAchievements((prev) => [newAch, ...prev]);
  };

  const updateAchievement = (id: string, achData: Partial<Achievement>) => {
    setAchievements((prev) => prev.map((ach) => (ach.id === id ? { ...ach, ...achData } : ach)));
  };

  const deleteAchievement = (id: string) => {
    setAchievements((prev) => prev.filter((ach) => ach.id !== id));
  };

  return (
    <SiteContentContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
        switchUserRole,
        schoolInfo,
        updateSchoolInfo,
        newsArticles,
        addNewsArticle,
        updateNewsArticle,
        deleteNewsArticle,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        documents,
        addDocument,
        updateDocument,
        deleteDocument,
        achievements,
        addAchievement,
        updateAchievement,
        deleteAchievement,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
};
