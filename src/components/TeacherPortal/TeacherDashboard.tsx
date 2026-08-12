import React from 'react';
import { User } from '../../types';
import { mockTimetable9A1, mockAssignments, mockAttendanceRecords } from '../../data/mockData';
import {
  Calendar,
  Clock,
  CheckCircle2,
  BookOpen,
  ClipboardList,
  AlertCircle,
  Users,
  Award,
  ChevronRight,
  Plus,
  Sparkles,
} from 'lucide-react';

interface TeacherDashboardProps {
  currentUser: User;
  onNavigateTab: (tab: string) => void;
  onOpenAiHub: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  currentUser,
  onNavigateTab,
  onOpenAiHub,
}) => {
  const todayClasses = mockTimetable9A1.filter((tt) => tt.dayOfWeek === 'Thứ 2');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 rounded-full text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5 text-emerald-300" />
            <span>XIN CHÀO, {currentUser.name.toUpperCase()}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            CỔNG GIÁO VIÊN BỘ MÔN & CHỦ NHIỆM
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            {currentUser.department} • Bộ môn: {currentUser.subject} {currentUser.className ? `• GVCN Lớp ${currentUser.className}` : ''}
          </p>
        </div>

        <button
          onClick={onOpenAiHub}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-2 shrink-0"
          id="teacher-open-ai-btn"
        >
          <Sparkles className="w-4 h-4" />
          <span>Mở AI Trợ Lý Giáo Án</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">LỊCH DẠY HÔM NAY</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{todayClasses.length} Tiết dạy</div>
          <div className="text-[10px] text-blue-600 font-bold">Lớp 9A1 • Phòng P.401</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">LỚP CHỦ NHIỆM</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">9A1 (40 HS)</div>
          <div className="text-[10px] text-emerald-600 font-bold">39/40 Có mặt hôm nay</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">CẦN NHẬP ĐIỂM</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">Điểm Thường Xuyên</div>
          <div className="text-[10px] text-amber-700 font-semibold">Cột điểm số 3 môn Toán</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">BÀI TẬP ĐÃ GIAO</span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">38/40 Đã nộp</div>
          <div className="text-[10px] text-purple-600 font-bold">Phương trình bậc hai</div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today Schedule & Homeroom Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today Teaching Periods */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>LỊCH GIẢNG DẠY HÔM NAY (THỨ HAI, 10/08)</span>
              </h3>
              <button
                onClick={() => onNavigateTab('teacher-timetable')}
                className="text-xs text-blue-600 font-bold flex items-center gap-1 hover:underline"
              >
                <span>TKB Toàn Tuần</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {todayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                      T.{cls.period}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">
                        {cls.subjectName} — {cls.className}
                      </div>
                      <div className="text-xs text-slate-500">
                        Phòng: <span className="font-semibold text-slate-800">{cls.roomNumber}</span> • Buổi {cls.session}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigateTab('teacher-attendance')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                  >
                    Điểm Danh Lớp
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Homeroom Class Attendance Overview */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>TÌNH HÌNH LỚP CHỦ NHIỆM 9A1 HÔM NAY</span>
              </h3>
              <button
                onClick={() => onNavigateTab('teacher-attendance')}
                className="text-xs text-emerald-700 font-bold hover:underline"
              >
                Quản lý chuyên cần
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-[10px] font-bold text-emerald-800 uppercase">CÓ MẶT</div>
                <div className="text-xl font-black text-emerald-900 mt-1">39 / 40 HS</div>
                <div className="text-[10px] text-emerald-700">Tỷ lệ: 97.5%</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <div className="text-[10px] font-bold text-amber-800 uppercase">VẮNG CÓ PHÉP</div>
                <div className="text-xl font-black text-amber-900 mt-1">1 HS</div>
                <div className="text-[10px] text-amber-700">Phạm Minh Khôi (Sốt nhẹ)</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-center">
                <div className="text-[10px] font-bold text-blue-800 uppercase">ĐIỂM TRUNG BÌNH LỚP</div>
                <div className="text-xl font-black text-blue-900 mt-1">8.92</div>
                <div className="text-[10px] text-blue-700">Xếp thứ 1 Toàn Khối 9</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Actions & Pending Homework */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              THAO TÁC NHANH GIÁO VIÊN
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigateTab('teacher-grades')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <ClipboardList className="w-4 h-4 text-blue-600" />
                  <span>Sổ Nhập Điểm Điện Tử</span>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={() => onNavigateTab('teacher-assignments')}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 text-xs font-bold transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>Giao Bài Tập & Chấm Điểm</span>
                </div>
                <ChevronRight className="w-4 h-4 text-purple-600" />
              </button>

              <button
                onClick={onOpenAiHub}
                className="w-full flex items-center justify-between p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-900 text-xs font-bold transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-rose-600" />
                  <span>AI Soạn Giáo Án CV 5512</span>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
