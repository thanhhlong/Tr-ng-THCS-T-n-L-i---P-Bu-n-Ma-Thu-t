import React from 'react';
import { User } from '../types';
import tanLoiLogo from '../assets/images/tan_loi_logo_1786361503805.jpg';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  FileText,
  Award,
  Sparkles,
  MessageSquare,
  ClipboardList,
  CheckCircle2,
  FolderKanban,
  Library,
  ShieldCheck,
  Settings,
  HelpCircle,
  Newspaper,
  BookMarked,
  FileSpreadsheet,
  Gamepad2,
  Sliders,
  Send,
  Bell,
  Home,
  Bot,
  Globe,
} from 'lucide-react';

interface SidebarProps {
  currentUser: User;
  activePortal: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setActivePortal: (portal: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activePortal,
  activeTab,
  setActiveTab,
  setActivePortal,
  isOpen,
  setIsOpen,
}) => {
  // Navigation links dependent on activePortal
  const getNavSections = () => {
    switch (activePortal) {
      case 'public':
        return [
          {
            title: '🌐 WEBSITE TRƯỜNG THCS',
            items: [
              { id: 'public-home', label: 'Trang Chủ Công Khai', icon: Home },
              { id: 'public-about', label: 'Giới Thiệu Trường', icon: HelpCircle },
              { id: 'public-news', label: 'Tin Tức & Hoạt Động', icon: Newspaper },
              { id: 'public-announcements', label: 'Thông Báo Nhà Trường', icon: Bell },
              { id: 'public-admissions', label: 'Thông Tin Tuyển Sinh', icon: GraduationCap },
              { id: 'public-library', label: 'Thư Viện Số & Học Liệu', icon: Library },
              { id: 'public-documents', label: 'Văn Bản & Thông Tư', icon: FileText },
              { id: 'public-schedule', label: 'Lịch Công Tác Tuần', icon: Calendar },
            ],
          },
        ];

      case 'admin':
        return [
          {
            title: '🛠️ CỔNG QUẢN TRỊ BGH',
            items: [
              { id: 'admin-dashboard', label: 'Dashboard Điều Hành', icon: LayoutDashboard },
              { id: 'admin-cms', label: 'Quản Lý Content Website', icon: Globe },
              { id: 'admin-teachers', label: 'Quản Lý Giáo Viên', icon: Users },
              { id: 'admin-students', label: 'Quản Lý Học Sinh', icon: GraduationCap },
              { id: 'admin-parents', label: 'Quản Lý Phụ Huynh', icon: Users },
              { id: 'admin-classes', label: 'Quản Lý Lớp & Khối', icon: FolderKanban },
              { id: 'admin-timetable', label: 'Thời Khóa Biểu Trường', icon: Calendar },
              { id: 'admin-reports', label: 'Báo Cáo & Thống Kê BGH', icon: FileSpreadsheet },
              { id: 'admin-roles', label: 'Phân Quyền RBAC', icon: ShieldCheck },
              { id: 'admin-settings', label: 'Cài Đặt Hệ Thống', icon: Settings },
            ],
          },
        ];

      case 'teacher':
        return [
          {
            title: '👨🏫 CỔNG GIÁO VIÊN',
            items: [
              { id: 'teacher-dashboard', label: 'Dashboard Giáo Viên', icon: LayoutDashboard },
              { id: 'teacher-classes', label: 'Lớp Phụ Trách & Sơ Đồ', icon: FolderKanban },
              { id: 'teacher-grades', label: 'Nhập & Quản Lý Điểm', icon: ClipboardList },
              { id: 'teacher-attendance', label: 'Điểm Danh Học Sinh', icon: CheckCircle2 },
              { id: 'teacher-assignments', label: 'Giao Bài & Chấm Bài', icon: BookOpen },
              { id: 'teacher-timetable', label: 'Thời Khóa Biểu Dạy', icon: Calendar },
            ],
          },
        ];

      case 'student':
        return [
          {
            title: '👨🎓 CỔNG HỌC SINH',
            items: [
              { id: 'student-dashboard', label: 'Dashboard Học Sinh', icon: LayoutDashboard },
              { id: 'student-timetable', label: 'Thời Khóa Biểu Lớp', icon: Calendar },
              { id: 'student-grades', label: 'Kết Quả Học Tập & Điểm', icon: Award },
              { id: 'student-attendance', label: 'Lịch Chuyên Cần', icon: CheckCircle2 },
              { id: 'student-assignments', label: 'Bài Tập & Nộp Bài', icon: BookOpen },
              { id: 'student-library', label: 'Thư Viện Bài Giảng', icon: Library },
            ],
          },
        ];

      case 'parent':
        return [
          {
            title: '👨👩👧 CỔNG PHỤ HUYNH',
            items: [
              { id: 'parent-dashboard', label: 'Tổng Quan Theo Dõi Con', icon: LayoutDashboard },
              { id: 'parent-grades', label: 'Bảng Điểm Môn Học', icon: Award },
              { id: 'parent-attendance', label: 'Chuyên Cần & Vắng Mặt', icon: CheckCircle2 },
              { id: 'parent-messaging', label: 'Trao Đổi Với GVCN', icon: MessageSquare },
              { id: 'parent-announcements', label: 'Thông Báo Lớp & Trường', icon: Bell },
            ],
          },
        ];

      case 'ai-hub':
        return [
          {
            title: '🤖 AI EDUCATION HUB',
            items: [
              { id: 'ai-chat', label: 'AI Chatbot Trợ Lý', icon: Bot },
              { id: 'ai-prompts', label: 'Thư Viện Prompt AI', icon: BookMarked },
              { id: 'ai-lesson-plan', label: 'AI Tạo Giáo Án CV 5512', icon: FileText },
              { id: 'ai-exam-quiz', label: 'AI Tạo Đề Thi & Ma Trận', icon: ClipboardList },
              { id: 'ai-worksheet', label: 'AI Tạo Phiếu Học Tập', icon: BookOpen },
              { id: 'ai-ppt', label: 'AI Tạo Dàn Ý PowerPoint', icon: Sliders },
              { id: 'ai-game', label: 'AI Tạo Trò Chơi Học Tập', icon: Gamepad2 },
              { id: 'ai-feedback', label: 'AI Tạo Nhận Xét Học Sinh', icon: Send },
            ],
          },
        ];

      default:
        return [];
    }
  };

  const sections = getNavSections();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-16 left-0 z-30 w-60 bg-white text-slate-800 h-[calc(100vh-4rem)] flex flex-col border-r border-slate-200 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        id="app-sidebar"
      >
        {/* School Logo Brand Block */}
        <div className="px-4 py-3 border-b border-slate-200 bg-emerald-50/50 flex items-center gap-3">
          <img
            src={tanLoiLogo}
            alt="Logo THCS Tân Lợi"
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-contain ring-2 ring-emerald-600/30 shrink-0"
          />
          <div className="overflow-hidden">
            <div className="text-xs font-black text-emerald-950 uppercase tracking-tight truncate">
              THCS TÂN LỢI
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold truncate">
              Dạy Tốt — Học Tốt
            </div>
          </div>
        </div>

        {/* User Role Badge Card */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">
            Đang truy cập với vai trò
          </div>
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
              {currentUser.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</div>
              <div className="text-[11px] font-semibold text-blue-600 truncate">
                {currentUser.role === 'principal'
                  ? 'Ban Giám Hiệu'
                  : currentUser.role === 'homeroom_teacher'
                  ? `GVCN Lớp ${currentUser.className}`
                  : currentUser.role === 'student'
                  ? `Học sinh Lớp ${currentUser.className}`
                  : currentUser.role === 'parent'
                  ? `PHHS ${currentUser.childName}`
                  : 'Cổng Công Khai'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Item List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {sections.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                {sec.title}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    id={`sidebar-item-${item.id}`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Quick Footer Links */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50">
          <button
            onClick={() => {
              setActivePortal('ai-hub');
              setActiveTab('ai-chat');
            }}
            className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold border border-purple-200/60 transition-colors"
            id="sidebar-open-ai-btn"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>AI School Hub</span>
          </button>
        </div>
      </aside>
    </>
  );
};
