import React from 'react';
import { mockSchoolInfo } from '../../data/mockData';
import {
  Users,
  GraduationCap,
  FolderKanban,
  CheckCircle2,
  TrendingUp,
  Award,
  Bell,
  Clock,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Welcome & Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-purple-500/20 text-purple-200 border border-purple-400/30 rounded-full text-xs font-semibold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />
            <span>BAN GIÁM HIỆU - TRUNG TÂM ĐIỀU HÀNH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            CỔNG QUẢN TRỊ TRƯỜNG THCS
          </h1>
          <p className="text-xs sm:text-sm text-purple-100 mt-1">
            Tổng quan dữ liệu thời gian thực: Học sinh, Giáo viên, Chuyên cần & Báo cáo chất lượng
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
          <Clock className="w-4 h-4 text-purple-300" />
          <span className="text-xs font-mono font-bold text-white">Thứ Hai, 10/08/2026</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">HỌC SINH</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{mockSchoolInfo.totalStudents}</div>
          <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>100% Khối 6-9</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">GIÁO VIÊN</span>
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{mockSchoolInfo.totalTeachers}</div>
          <div className="text-[10px] text-slate-500 font-semibold">8 Tổ chuyên môn</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">LỚP HỌC</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{mockSchoolInfo.totalClasses}</div>
          <div className="text-[10px] text-slate-500 font-semibold">Khối 6, 7, 8, 9</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">PHỤ HUYNH</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{mockSchoolInfo.totalParents}</div>
          <div className="text-[10px] text-slate-500 font-semibold">Đã liên kết tài khoản</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 col-span-2 md:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">CHUYÊN CẦN</span>
            <div className="p-2 rounded-xl bg-rose-100 text-rose-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{mockSchoolInfo.todayAttendanceRate}%</div>
          <div className="text-[10px] text-emerald-600 font-bold">1.260 HS có mặt</div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Students per Grade Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <span>THỐNG KÊ HỌC SINH THEO KHỐI</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Tổng: 1.280 HS</span>
          </div>

          <div className="space-y-3 pt-2">
            {[
              { grade: 'Khối 6 (8 lớp)', count: 320, pct: '100%', color: 'bg-blue-600' },
              { grade: 'Khối 7 (8 lớp)', count: 325, pct: '101%', color: 'bg-indigo-600' },
              { grade: 'Khối 8 (8 lớp)', count: 315, pct: '98%', color: 'bg-purple-600' },
              { grade: 'Khối 9 (8 lớp)', count: 320, pct: '100%', color: 'bg-emerald-600' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.grade}</span>
                  <span>{item.count} Học sinh</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.count / 350) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Academic Performance Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-purple-600" />
              <span>XẾP LOẠI HỌC TẬP TOÀN TRƯỜNG</span>
            </h3>
            <span className="text-xs text-emerald-600 font-bold">92.5% Khá & Giỏi</span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
              <div className="text-[10px] font-bold text-emerald-800 uppercase">XUẤT SẮC (GPA ≥ 9.0)</div>
              <div className="text-xl font-black text-emerald-900 mt-1">28.4%</div>
              <div className="text-[10px] text-emerald-700">363 Học sinh</div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="text-[10px] font-bold text-blue-800 uppercase">GIỎI (8.0 - 8.9)</div>
              <div className="text-xl font-black text-blue-900 mt-1">45.2%</div>
              <div className="text-[10px] text-blue-700">578 Học sinh</div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="text-[10px] font-bold text-amber-800 uppercase">KHÁ (6.5 - 7.9)</div>
              <div className="text-xl font-black text-amber-900 mt-1">18.9%</div>
              <div className="text-[10px] text-amber-700">242 Học sinh</div>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
              <div className="text-[10px] font-bold text-rose-800 uppercase">CẦN CỐ GẮNG (&lt; 6.5)</div>
              <div className="text-xl font-black text-rose-900 mt-1">7.5%</div>
              <div className="text-[10px] text-rose-700">97 Học sinh</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts & Actions */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <span>CÔNG VIỆC VÀ NGHỊ QUYẾT BGH CẦN XỬ LÝ</span>
          </h3>
          <span className="text-xs text-blue-600 font-bold cursor-pointer">Xem tất cả</span>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
              <div>
                <div className="text-xs font-bold text-slate-900">Phê duyệt Ma trận & Đề thi Khảo sát Khối 9</div>
                <div className="text-[11px] text-slate-500">Tổ Toán - Tin đã gửi đề thi thử lần 1 lên hệ thống.</div>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold shrink-0">
              Phê Duyệt
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
              <div>
                <div className="text-xs font-bold text-slate-900">Báo cáo Chuyên cần & Vắng mặt Khối 7</div>
                <div className="text-[11px] text-slate-500">Đã gửi thông báo SMS tới 4 phụ huynh học sinh vắng có phép.</div>
              </div>
            </div>
            <button className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold shrink-0">
              Chi Tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
