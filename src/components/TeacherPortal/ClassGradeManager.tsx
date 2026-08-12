import React, { useState } from 'react';
import { mockStudents9A1, mockGrades } from '../../data/mockData';
import { GradeEntry } from '../../types';
import { ClipboardList, Save, Download, Upload, CheckCircle2, Sparkles, Filter } from 'lucide-react';

export const ClassGradeManager: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('9A1');
  const [selectedSubject, setSelectedSubject] = useState('Toán học');
  const [gradesState, setGradesState] = useState<Record<string, { f1: string; f2: string; f3: string; mid: string; fin: string }>>({
    HS901: { f1: '9.0', f2: '9.5', f3: '9.0', mid: '9.5', fin: '9.8' },
    HS902: { f1: '8.0', f2: '8.5', f3: '8.0', mid: '8.5', fin: '8.5' },
    HS903: { f1: '8.5', f2: '8.5', f3: '9.0', mid: '8.8', fin: '9.0' },
    HS904: { f1: '7.0', f2: '7.5', f3: '8.0', mid: '7.5', fin: '7.8' },
    HS905: { f1: '9.5', f2: '10.0', f3: '9.5', mid: '9.8', fin: '9.8' },
    HS906: { f1: '7.5', f2: '7.0', f3: '7.5', mid: '7.8', fin: '8.0' },
    HS907: { f1: '8.5', f2: '9.0', f3: '8.5', mid: '9.0', fin: '9.2' },
    HS908: { f1: '7.0', f2: '7.5', f3: '7.0', mid: '7.5', fin: '7.5' },
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Helper to calculate Average Grade (TB Môn)
  // Formula: (F1 + F2 + F3 + Midterm*2 + Final*3) / 8
  const calculateGPA = (scores: { f1: string; f2: string; f3: string; mid: string; fin: string }) => {
    const f1 = parseFloat(scores.f1) || 0;
    const f2 = parseFloat(scores.f2) || 0;
    const f3 = parseFloat(scores.f3) || 0;
    const mid = parseFloat(scores.mid) || 0;
    const fin = parseFloat(scores.fin) || 0;

    if (!mid || !fin) return '—';

    const freqSum = f1 + f2 + f3;
    const totalWeight = 3 + 2 + 3; // 3 frequent, 2 midterm weight, 3 final weight
    const totalScore = freqSum + mid * 2 + fin * 3;
    const gpa = totalScore / totalWeight;

    return gpa.toFixed(1);
  };

  const handleInputChange = (studentCode: string, field: string, val: string) => {
    setGradesState({
      ...gradesState,
      [studentCode]: {
        ...gradesState[studentCode],
        [field]: val,
      },
    });
  };

  const handleSaveAll = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-blue-600" />
            <span>SỔ ĐIỂM ĐIỆN TỬ BỘ MÔN — LỚP {selectedClass}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Nhập điểm Thường xuyên, Giữa kỳ, Cuối kỳ & Tự động tính TB môn</p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => alert('Đã xuất file Excel mẫu Sổ điểm lớp 9A1!')}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center space-x-1.5"
          >
            <Download className="w-4 h-4" />
            <span>Xuất Excel</span>
          </button>
          <button
            onClick={handleSaveAll}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-md"
            id="save-grades-btn"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Sổ Điểm</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Đã lưu thành công dữ liệu bảng điểm học sinh Lớp {selectedClass} vào cơ sở dữ liệu!</span>
        </div>
      )}

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 text-xs">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="font-bold text-slate-700 whitespace-nowrap">Chọn Lớp:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
          >
            <option value="9A1">Lớp 9A1</option>
            <option value="9A2">Lớp 9A2</option>
            <option value="8A1">Lớp 8A1</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <span className="font-bold text-slate-700 whitespace-nowrap">Chọn Môn:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
          >
            <option value="Toán học">Toán học</option>
            <option value="Ngữ văn">Ngữ văn</option>
            <option value="Tiếng Anh">Tiếng Anh</option>
            <option value="Vật lý">Vật lý</option>
          </select>
        </div>

        <div className="ml-auto text-[11px] text-slate-500 italic hidden md:block">
          * Điểm trung bình môn được tự động làm tròn theo Thông tư 22/2021.
        </div>
      </div>

      {/* Grade Entry Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">MÃ HS & HỌ TÊN</th>
                <th className="p-4 text-center">TX 1 (15P)</th>
                <th className="p-4 text-center">TX 2 (15P)</th>
                <th className="p-4 text-center">TX 3 (MIỆNG)</th>
                <th className="p-4 text-center">GIỮA KỲ (x2)</th>
                <th className="p-4 text-center">CUỐI KỲ (x3)</th>
                <th className="p-4 text-center">TB MÔN</th>
                <th className="p-4">NHẬN XẾP LOẠI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {mockStudents9A1.map((s) => {
                const scores = gradesState[s.code] || { f1: '', f2: '', f3: '', mid: '', fin: '' };
                const gpa = calculateGPA(scores);

                return (
                  <tr key={s.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">Mã: {s.code}</div>
                    </td>

                    <td className="p-3 text-center">
                      <input
                        type="text"
                        value={scores.f1}
                        onChange={(e) => handleInputChange(s.code, 'f1', e.target.value)}
                        className="w-12 p-1.5 text-center font-mono font-bold bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                      />
                    </td>

                    <td className="p-3 text-center">
                      <input
                        type="text"
                        value={scores.f2}
                        onChange={(e) => handleInputChange(s.code, 'f2', e.target.value)}
                        className="w-12 p-1.5 text-center font-mono font-bold bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                      />
                    </td>

                    <td className="p-3 text-center">
                      <input
                        type="text"
                        value={scores.f3}
                        onChange={(e) => handleInputChange(s.code, 'f3', e.target.value)}
                        className="w-12 p-1.5 text-center font-mono font-bold bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                      />
                    </td>

                    <td className="p-3 text-center">
                      <input
                        type="text"
                        value={scores.mid}
                        onChange={(e) => handleInputChange(s.code, 'mid', e.target.value)}
                        className="w-12 p-1.5 text-center font-mono font-bold bg-blue-50 border border-blue-200 text-blue-900 rounded-lg"
                      />
                    </td>

                    <td className="p-3 text-center">
                      <input
                        type="text"
                        value={scores.fin}
                        onChange={(e) => handleInputChange(s.code, 'fin', e.target.value)}
                        className="w-12 p-1.5 text-center font-mono font-bold bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-lg"
                      />
                    </td>

                    <td className="p-3 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-xl font-mono font-black text-sm bg-purple-100 text-purple-900 border border-purple-200">
                        {gpa}
                      </span>
                    </td>

                    <td className="p-4 text-xs font-semibold">
                      {parseFloat(gpa) >= 9.0 ? (
                        <span className="text-emerald-700 font-bold">Xuất sắc</span>
                      ) : parseFloat(gpa) >= 8.0 ? (
                        <span className="text-blue-700 font-bold">Giỏi</span>
                      ) : (
                        <span className="text-amber-700">Khá</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
