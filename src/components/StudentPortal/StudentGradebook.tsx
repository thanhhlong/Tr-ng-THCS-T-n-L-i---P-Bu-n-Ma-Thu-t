import React from 'react';
import { mockGrades } from '../../data/mockData';
import { Award, CheckCircle, TrendingUp, Download, Printer } from 'lucide-react';

export const StudentGradebook: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-600" />
            <span>BẢNG ĐIỂM & KẾT QUẢ HỌC TẬP HỌC KỲ I</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Sổ điểm điện tử môn học, điểm thường xuyên, giữa kỳ, cuối kỳ & TB môn</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center space-x-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>In Bảng Điểm</span>
          </button>
        </div>
      </div>

      {/* Grade Summary Box */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-6 rounded-3xl shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-[10px] font-bold text-purple-200 uppercase">ĐIỂM TRUNG BÌNH MÔN</div>
          <div className="text-3xl font-black text-amber-300 mt-1">9.2</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-purple-200 uppercase">XẾP LOẠI HỌC LỰC</div>
          <div className="text-lg font-black text-emerald-300 mt-1">XUẤT SẮC</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-purple-200 uppercase">RÈN LUYỆN (HẠNH KIỂM)</div>
          <div className="text-lg font-black text-blue-300 mt-1">TỐT</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-purple-200 uppercase">XẾP HẠNG TRONG LỚP</div>
          <div className="text-2xl font-black text-sky-300 mt-1">01 / 40</div>
        </div>
      </div>

      {/* Subject Grades Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">MÔN HỌC & GIÁO VIÊN</th>
                <th className="p-4 text-center">TX 1</th>
                <th className="p-4 text-center">TX 2</th>
                <th className="p-4 text-center">TX 3</th>
                <th className="p-4 text-center">GIỮA KỲ</th>
                <th className="p-4 text-center">CUỐI KỲ</th>
                <th className="p-4 text-center">TB MÔN</th>
                <th className="p-4">ĐÁNH GIÁ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {mockGrades.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{g.subjectName}</div>
                    <div className="text-[10px] text-slate-400">GV: {g.teacherName || 'Bộ môn'}</div>
                  </td>

                  <td className="p-4 text-center font-mono font-bold">{g.frequentScores[0] ?? '—'}</td>
                  <td className="p-4 text-center font-mono font-bold">{g.frequentScores[1] ?? '—'}</td>
                  <td className="p-4 text-center font-mono font-bold">{g.frequentScores[2] ?? '—'}</td>
                  <td className="p-4 text-center font-mono font-bold text-blue-700">{g.midtermScore}</td>
                  <td className="p-4 text-center font-mono font-bold text-indigo-700">{g.finalScore}</td>

                  <td className="p-4 text-center">
                    <span className="inline-block px-2.5 py-1 rounded-xl font-mono font-black text-sm bg-purple-100 text-purple-900 border border-purple-200">
                      {g.averageScore}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className="text-emerald-700 font-bold text-xs">
                      {(g.averageScore ?? 0) >= 9.0 ? 'Xuất sắc' : (g.averageScore ?? 0) >= 8.0 ? 'Giỏi' : 'Khá'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
