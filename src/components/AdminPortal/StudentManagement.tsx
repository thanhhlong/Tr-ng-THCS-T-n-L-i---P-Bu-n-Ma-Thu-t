import React, { useState } from 'react';
import { mockStudents9A1 } from '../../data/mockData';
import { GraduationCap, Search, Filter, Phone, Eye, UserCheck, Shield } from 'lucide-react';

export const StudentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState<number>(9);
  const [classFilter, setClassFilter] = useState('9A1');

  const filteredStudents = mockStudents9A1.filter((s) => {
    return (
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <span>QUẢN LÝ HỌC SINH KHỐI {gradeFilter} ({mockStudents9A1.length} HS/Lớp)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Hồ sơ học sinh, thông tin liên lạc phụ huynh & học lực năm học 2025-2026</p>
        </div>

        {/* Grade Pills */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {[6, 7, 8, 9].map((g) => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                gradeFilter === g ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-white'
              }`}
            >
              Khối {g}
            </button>
          ))}
        </div>
      </div>

      {/* Class Selector & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm Mã HS, Tên học sinh, Phụ huynh..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden ring-1 ring-slate-200"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Chọn Lớp:</span>
          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
          >
            <option value="9A1">Lớp 9A1 (Thầy Bảo CN)</option>
            <option value="9A2">Lớp 9A2 (Cô Trang CN)</option>
            <option value="9A3">Lớp 9A3 (Cô Hoa CN)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">STT & MÃ HS</th>
                <th className="p-4">HỌ VÀ TÊN</th>
                <th className="p-4">GIỚI TÍNH / NGÀY SINH</th>
                <th className="p-4">PHỤ HUYNH LIÊN KẾT</th>
                <th className="p-4">XẾP LOẠI HỌC TẬP</th>
                <th className="p-4 text-right">CHI TIẾT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-mono text-slate-500 font-bold">
                    {idx + 1 < 10 ? `0${idx + 1}` : idx + 1} • {s.code}
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-900">{s.name}</div>
                    <div className="text-[10px] text-blue-600">Lớp {classFilter}</div>
                  </td>

                  <td className="p-4">
                    <div>{s.gender}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{s.dob}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-slate-800">{s.parentName}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3 text-slate-400" /> {s.parentPhone}
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        s.status === 'Xuất sắc'
                          ? 'bg-purple-100 text-purple-800 border-purple-200'
                          : s.status === 'Giỏi'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : 'bg-amber-100 text-amber-800 border-amber-200'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Xem học bạ điện tử học sinh: ${s.name}`)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                    >
                      Học Bạ
                    </button>
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
