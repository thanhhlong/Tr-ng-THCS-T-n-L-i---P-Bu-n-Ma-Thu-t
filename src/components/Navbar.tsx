import React, { useState } from 'react';
import { UserRole } from '../types';
import { demoUsers } from '../data/mockData';
import { useSiteContent } from '../context/SiteContentContext';
import tanLoiLogo from '../assets/images/LOGO.jpg';
import {
  Search,
  Bell,
  ChevronDown,
  ShieldAlert,
  Sparkles,
  Menu,
  X,
  Building,
  Users,
  BookOpen,
  LogOut,
  Sliders,
  LogIn,
  UserCheck,
  Calendar,
  FileText,
  Phone,
  Globe,
  Home,
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  activePortal: string;
  setActivePortal: (portal: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  activeTab?: string;
  onNavigateTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  activePortal,
  setActivePortal,
  sidebarOpen,
  setSidebarOpen,
  activeTab = 'public-home',
  onNavigateTab,
}) => {
  const { schoolInfo, isAuthenticated, currentUser, openLoginModal, logout, switchUserRole } = useSiteContent();
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const roleLabels: Record<UserRole, { label: string; badge: string; color: string }> = {
    principal: { label: 'Ban Giám Hiệu / Admin', badge: 'BGH Admin', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    admin: { label: 'Quản trị hệ thống', badge: 'Admin', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    super_admin: { label: 'Super Admin', badge: 'SuperAdmin', color: 'bg-rose-100 text-rose-800 border-rose-200' },
    homeroom_teacher: { label: 'GV Chủ Nhiệm & Bộ Môn', badge: 'GVCN 9A1', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    teacher: { label: 'Giáo Viên Bộ Môn', badge: 'Giáo Viên', color: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
    student: { label: 'Học Sinh', badge: 'Học Sinh 9A1', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    parent: { label: 'Phụ Huynh Học Sinh', badge: 'Phụ Huynh', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    guest: { label: 'Khách Ghé Thăm', badge: 'Công Khai', color: 'bg-slate-100 text-slate-700 border-slate-200' },
  };

  const portalOptions = [
    { id: 'public', name: 'Website Cổng TTĐT', icon: Building, color: 'text-amber-300' },
    { id: 'admin', name: 'Cổng Quản Trị BGH', icon: Sliders, color: 'text-purple-300', roleAllowed: ['principal', 'admin', 'super_admin'] },
    { id: 'teacher', name: 'Cổng Giáo Viên', icon: Users, color: 'text-sky-300', roleAllowed: ['principal', 'admin', 'super_admin', 'homeroom_teacher', 'teacher'] },
    { id: 'student', name: 'Cổng Học Sinh', icon: BookOpen, color: 'text-emerald-300', roleAllowed: ['principal', 'admin', 'super_admin', 'student'] },
    { id: 'parent', name: 'Cổng Phụ Huynh', icon: UserCheck, color: 'text-amber-300', roleAllowed: ['principal', 'admin', 'super_admin', 'parent'] },
    { id: 'ai-hub', name: 'AI Education Hub', icon: Sparkles, color: 'text-rose-300' },
  ];

  const publicNavMenu = [
    { id: 'public-home', label: 'TRANG CHỦ', icon: Home },
    { id: 'public-about', label: 'GIỚI THIỆU', icon: Building },
    { id: 'public-news', label: 'TIN TỨC - SỰ KIỆN', icon: FileText },
    { id: 'public-announcements', label: 'THÔNG BÁO - CÔNG VĂN', icon: Bell },
    { id: 'public-library', label: 'VĂN BẢN - TÀI LIỆU', icon: BookOpen },
    { id: 'public-schedule', label: 'LỊCH CÔNG TÁC', icon: Calendar },
  ];

  return (
    <header className="z-40 w-full shadow-md">
      {/* 1. TOP UTILITY BAR (Cổng thông tin cấp cao - daklak.edu.vn style) */}
      <div className="bg-emerald-950 text-slate-200 text-[11px] py-1.5 px-4 sm:px-8 border-b border-emerald-900/80">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          {/* Left info */}
          <div className="flex items-center space-x-3 text-emerald-100 font-medium">
            <span className="text-slate-300">
              Thứ Ba, ngày 11/08/2026
            </span>
            <span className="hidden lg:inline text-emerald-600">•</span>
            <span className="hidden lg:flex items-center space-x-1 text-slate-300">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Hotline: {schoolInfo.phone}</span>
            </span>
          </div>

          {/* Right utilities & login */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 text-slate-300">
              <span className="hover:text-white cursor-pointer" title="Cỡ chữ">
                A-
              </span>
              <span className="hover:text-white cursor-pointer font-bold" title="Cỡ chữ chuẩn">
                A
              </span>
              <span className="hover:text-white cursor-pointer text-xs font-bold" title="Cỡ chữ lớn">
                A+
              </span>
            </div>
            <span className="text-emerald-700 hidden sm:inline">|</span>
            <div className="flex items-center space-x-1 text-amber-300 font-semibold cursor-pointer">
              <Globe className="w-3 h-3" />
              <span>Tiếng Việt</span>
            </div>
            <span className="text-emerald-700">|</span>

            {/* Role Switcher Drawer Button */}
            <div className="relative">
              <button
                onClick={() => setShowRoleSelector(!showRoleSelector)}
                className="flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 hover:bg-amber-500/30 border border-amber-400/40 font-bold transition-all"
                id="role-switcher-toggle"
              >
                <ShieldAlert className="w-3 h-3 text-amber-300" />
                <span>Đổi Vai Trò</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {/* Role Switcher Menu */}
              {showRoleSelector && (
                <div
                  className="absolute right-0 mt-2 w-80 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-3 z-50"
                  id="role-switcher-menu"
                >
                  <div className="px-2 py-1.5 border-b border-slate-100 mb-2">
                    <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                      <span>⚡ CHỌN VAI TRÒ DEMO</span>
                      <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded-full font-semibold">
                        Cổng GD 1-Click
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Chuyển phân hệ quản trị BGH, Giáo viên, Học sinh, Phụ huynh.
                    </p>
                  </div>

                  <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
                    {demoUsers.map((u) => {
                      const isSelected = u.id === currentUser.id;
                      const roleConfig = roleLabels[u.role];
                      return (
                        <button
                          key={u.id}
                          onClick={() => {
                            switchUserRole(u.role);
                            setShowRoleSelector(false);
                            if (u.role === 'principal' || u.role === 'admin') setActivePortal('admin');
                            else if (u.role === 'homeroom_teacher' || u.role === 'teacher') setActivePortal('teacher');
                            else if (u.role === 'student') setActivePortal('student');
                            else if (u.role === 'parent') setActivePortal('parent');
                            else setActivePortal('public');
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                            isSelected
                              ? 'bg-emerald-50 border border-emerald-300 ring-1 ring-emerald-500'
                              : 'hover:bg-slate-50 border border-transparent'
                          }`}
                          id={`select-role-${u.code}`}
                        >
                          <div className="flex items-center space-x-2">
                            {u.avatar ? (
                              <img
                                src={u.avatar}
                                alt={u.name}
                                className="w-7 h-7 rounded-full object-cover border border-slate-200"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                                {u.name.charAt(0)}
                              </div>
                            )}
                            <div>
                              <div className="text-xs font-bold text-slate-900">{u.name}</div>
                              <div className="text-[10px] text-slate-500">
                                {u.code} • {u.department || u.className || 'Hệ thống'}
                              </div>
                            </div>
                          </div>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${roleConfig.color}`}
                          >
                            {roleConfig.badge}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Authentication Login Button / Profile */}
            {!isAuthenticated || currentUser.role === 'guest' ? (
              <button
                onClick={openLoginModal}
                className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-xs"
                id="login-modal-trigger"
              >
                <LogIn className="w-3 h-3" />
                <span>Đăng Nhập</span>
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-1.5 px-2 py-0.5 rounded bg-emerald-800/80 hover:bg-emerald-800 text-white font-bold"
                  id="user-profile-toggle"
                >
                  <span className="max-w-[100px] truncate">{currentUser.name}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>

                {showProfileMenu && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-2 z-50"
                    id="user-profile-menu"
                  >
                    <div className="p-3 bg-emerald-50 rounded-lg mb-2">
                      <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{currentUser.email}</div>
                      <div className="mt-1.5 inline-block text-[10px] px-2 py-0.5 rounded-full font-semibold bg-emerald-200 text-emerald-900">
                        Mã ID: {currentUser.code}
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <button
                        onClick={() => {
                          setActivePortal('public');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                      >
                        <Building className="w-4 h-4 text-emerald-600" />
                        <span>Xem Cổng Thông Tin Điện Tử</span>
                      </button>
                      <button
                        onClick={() => {
                          setActivePortal('ai-hub');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
                      >
                        <Sparkles className="w-4 h-4 text-rose-500" />
                        <span>Trợ Lý AI Education Hub</span>
                      </button>
                      <div className="border-t border-slate-100 my-1"></div>
                      <button
                        onClick={() => {
                          logout();
                          setActivePortal('public');
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất / Về Trang Khách</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. OFFICIAL PORTAL HEADER BANNER (Chính chủ daklak.edu.vn style) */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white border-b-2 border-amber-400 relative overflow-hidden py-4 px-4 sm:px-8 shadow-inner">
        {/* Background decorative pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          {/* Left: Official Logo + Title Block */}
          <div className="flex items-center space-x-4 text-center md:text-left">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-amber-200 hover:text-white hover:bg-emerald-700/60 lg:hidden focus:outline-hidden"
              id="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div
              onClick={() => {
                setActivePortal('public');
                if (onNavigateTab) onNavigateTab('public-home');
              }}
              className="flex items-center space-x-3.5 cursor-pointer group"
              id="brand-logo-btn"
            >
              <img
                src={tanLoiLogo}
                alt="Logo Trường THCS Tân Lợi"
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain ring-4 ring-amber-400/80 shadow-xl bg-white p-0.5 group-hover:scale-105 transition-transform shrink-0"
              />
              <div>
                <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tight drop-shadow-md leading-tight max-w-[750px] w-full">
                  CỔNG THÔNG TIN ĐIỆN TỬ {schoolInfo.name.toUpperCase()}
                </h1>
                <div className="text-xs sm:text-sm font-medium text-emerald-100 flex items-center gap-2 justify-center md:justify-start mt-0.5">
                  <span className="font-bold text-amber-300 italic">"{schoolInfo.slogan}"</span>
                  <span className="text-emerald-400">•</span>
                  <span className="text-slate-200 font-mono text-xs">Thành lập năm {schoolInfo.establishedYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Portal Quick Search & System Portal Switcher */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Box */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Tìm kiếm tin tức, công văn..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onOpenSearch();
                }}
                className="w-full bg-emerald-950/80 border border-amber-400/50 rounded-lg px-3 py-1.5 pl-8 text-xs text-white placeholder-emerald-200/60 focus:outline-hidden focus:ring-2 focus:ring-amber-400"
              />
              <Search className="w-3.5 h-3.5 text-amber-300 absolute left-2.5 top-2.5" />
            </div>

            {/* Portal Dropdown Menu */}
            <div className="flex items-center space-x-1 bg-emerald-950/90 border border-amber-400/40 p-1 rounded-lg shrink-0">
              {portalOptions.map((p) => {
                const Icon = p.icon;
                const isActive = activePortal === p.id;
                const isAllowed = !p.roleAllowed || p.roleAllowed.includes(currentUser.role);

                if (!isAllowed) return null;

                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePortal(p.id)}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                      isActive
                        ? 'bg-amber-400 text-emerald-950 shadow-md font-extrabold'
                        : 'text-emerald-100 hover:text-white hover:bg-emerald-800/80'
                    }`}
                    id={`nav-portal-${p.id}`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-950' : p.color}`} />
                    <span className="hidden xl:inline">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 3. HORIZONTAL MAIN NAVIGATION BAR (Thanh Menu ngang chuẩn Cổng thông tin) */}
      <div className="bg-emerald-900 text-white shadow-md border-b border-emerald-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <nav className="flex items-center justify-between overflow-x-auto py-0">
            <div className="flex items-center space-x-0 sm:space-x-1">
              {publicNavMenu.map((item) => {
                const Icon = item.icon;
                const isActive = activePortal === 'public' && activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePortal('public');
                      if (onNavigateTab) onNavigateTab(item.id);
                    }}
                    className={`flex items-center space-x-1.5 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 ${
                      isActive
                        ? 'bg-emerald-800 text-amber-300 border-amber-400 shadow-inner'
                        : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white border-transparent'
                    }`}
                    id={`public-menu-${item.id}`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-emerald-300'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Special AI Hub Menu Button */}
            <button
              onClick={() => setActivePortal('ai-hub')}
              className="hidden lg:flex items-center space-x-1.5 px-4 py-1.5 my-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-emerald-950 font-black text-xs uppercase shadow-md transition-all shrink-0 ml-2"
              id="nav-ai-hub-highlight-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-950" />
              <span>CỔNG AI HUB</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

