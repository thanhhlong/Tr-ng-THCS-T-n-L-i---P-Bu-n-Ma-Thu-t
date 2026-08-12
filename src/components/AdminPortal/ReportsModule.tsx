import React, { useState } from 'react';
import { FileSpreadsheet, Download, Printer, BarChart2, PieChart, TrendingUp, CheckCircle, Award } from 'lucide-react';

export const ReportsModule: React.FC = () => {
  const [reportType, setReportType] = useState<'academic' | 'attendance' | 'teachers'>('academic');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
            <span>TRUNG TÂM BÁO CÁO & XUẤT DỮ LIỆU BGH</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Báo cáo tổng hợp chất lượng giáo dục, chuyên cần và hiệu suất bộ môn</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>In Báo Cáo</span>
          </button>
          <button
            onClick={() => alert('Xuất báo cáo định dạng Excel thành công!')}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>
        </div>
      </div>

      {/* Report Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setReportType('academic')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            reportType === 'academic'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          📊 Báo Cáo Kết Quả Học Tập
        </button>
        <button
          onClick={() => setReportType('attendance')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            reportType === 'attendance'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          📅 Báo Cáo Chuyên Cần & Vắng
        </button>
        <button
          onClick={() => setReportType('teachers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            reportType === 'teachers'
              ? 'bg-purple-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100'
          }`}
        >
          👩🏫 Thống Kê Giảng Dạy Giáo Viên
        </button>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">BÁO CÁO TỔNG HỢP NĂM HỌC 2025 - 2026</div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              {reportType === 'academic'
                ? 'TỔNG HỢP HỌC LỰC CÁC KHỐI LỚP 6, 7, 8, 9'
                : reportType === 'attendance'
                ? 'BÁO CÁO CHUYÊN CẦN THÁNG 08/2026'
                : 'ĐÁNH GIÁ TIẾN ĐỘ VÀ CHẤT LƯỢNG GIẢNG DẠY CỦA CÁC TỔ CHUYÊN MÔN'}
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-mono bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
            Ngày lập: 10/08/2026
          </div>
        </div>

        {/* Data Summary Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">ĐƠN VỊ / KHỐI</th>
                <th className="p-3">SĨ SỐ</th>
                <th className="p-3">XUẤT SẮC / GIỎI</th>
                <th className="p-3">KHÁ</th>
                <th className="p-3">TRUNG BÌNH</th>
                <th className="p-3">CẦN CỐ GẮNG</th>
                <th className="p-3 text-right">TỶ LỆ ĐẠT YÊU CẦU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold">
              {[
                { name: 'Khối 6 (8 Lớp)', count: 320, top: '78%', kha: '18%', tb: '3.5%', weak: '0.5%', pass: '99.5%' },
                { name: 'Khối 7 (8 Lớp)', count: 325, top: '75%', kha: '20%', tb: '4.0%', weak: '1.0%', pass: '99.0%' },
                { name: 'Khối 8 (8 Lớp)', count: 315, top: '72%', kha: '22%', tb: '5.0%', weak: '1.0%', pass: '99.0%' },
                { name: 'Khối 9 (8 Lớp)', count: 320, top: '82%', kha: '15%', tb: '2.5%', weak: '0.5%', pass: '99.5%' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{row.name}</td>
                  <td className="p-3">{row.count} HS</td>
                  <td className="p-3 text-emerald-700 font-bold">{row.top}</td>
                  <td className="p-3 text-blue-700">{row.kha}</td>
                  <td className="p-3 text-amber-700">{row.tb}</td>
                  <td className="p-3 text-rose-700">{row.weak}</td>
                  <td className="p-3 text-right font-bold text-purple-900">{row.pass}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
