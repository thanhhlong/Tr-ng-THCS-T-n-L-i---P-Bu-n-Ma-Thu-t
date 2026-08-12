import React from 'react';
import { User } from '../../types';
import { mockTimetable9A1, mockAssignments, mockGrades } from '../../data/mockData';
import {
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface StudentDashboardProps {
  currentUser: User;
  onNavigateTab: (tab: string) => void;
  onOpenAiHub: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  onNavigateTab,
  onOpenAiHub,
}) => {
  const todayClasses = mockTimetable9A1.filter((tt) => tt.dayOfWeek === 'Thứ 2');

  return (
    <div className="space-y-8">
      {/* Student Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-blue-400/30 shadow-lg shrink-0"
          />
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-0.5 bg-blue-500/20 text-blue-200 border border-blue-400/30 rounded-full text-[11px] font-bold mb-1">
              <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
              <span>HỌC SINH LỚP {currentUser.className} • MÃ: {currentUser.code}</span>
            </div>
            <h1 className="text-2xl font-extrabold">{currentUser.name.toUpperCase()}</h1>
            <p className="text-xs text-blue-100 mt-0.5">Xếp loại Học kỳ 1: Xuất sắc (GPA: 9.2)</p>
          </div>
        </div>

        <button
          onClick={onOpenAiHub}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-2 shrink-0"
          id="student-open-ai-btn"
        >
          <Sparkles className="w-4 h-4" />
          <span>Mở AI Gia Sư Trợ Lý Học Tập</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">TIẾT HỌC HÔM NAY</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{todayClasses.length} Tiết học</div>
          <div className="text-[10px] text-blue-600 font-bold">Thứ 2 (10/08/2026)</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">ĐIỂM TRUNG BÌNH HỌC KỲ</span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">9.2 / 10</div>
          <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Học sinh Xuất sắc</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">BÀI TẬP CẦN NỘP</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">1 Bài tập</div>
          <div className="text-[10px] text-amber-700 font-semibold">Toán 9 • Hạn 15/08</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">CHUYÊN CẦN</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">100%</div>
          <div className="text-[10px] text-emerald-600 font-bold">Không vắng mặt</div>
        </div>
      </div>

      {/* Schedule & Homework */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Timetable */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>THỜI KHÓA BIỂU LỚP {currentUser.className} HÔM NAY</span>
            </h3>
            <button
              onClick={() => onNavigateTab('student-timetable')}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              Xem cả tuần
            </button>
          </div>

          <div className="space-y-2.5">
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                    T.{cls.period}
                  </span>
                  <div>
                    <div className="text-xs font-bold text-slate-900">{cls.subjectName}</div>
                    <div className="text-[11px] text-slate-500">GV: {cls.teacherName}</div>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                  Phòng {cls.roomNumber}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Homework */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600" />
              <span>BÀI TẬP CỦA TÔI</span>
            </h3>
            <button
              onClick={() => onNavigateTab('student-assignments')}
              className="text-xs text-purple-600 font-bold hover:underline"
            >
              Tất cả bài tập
            </button>
          </div>

          <div className="space-y-3">
            {mockAssignments.map((ass) => (
              <div key={ass.id} className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-900">{ass.subjectName}</span>
                  <span className="text-[10px] text-slate-500 font-mono">Hạn: {ass.dueDate}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900">{ass.title}</h4>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onNavigateTab('student-assignments')}
                    className="px-3 py-1 rounded-xl bg-purple-600 text-white text-[11px] font-bold hover:bg-purple-700"
                  >
                    Nộp Bài Ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
