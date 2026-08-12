import React, { useState } from 'react';
import { mockStudents9A1 } from '../../data/mockData';
import { CheckCircle2, XCircle, Clock, Save, MessageSquare, Send } from 'lucide-react';

export const ClassAttendanceManager: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2026-08-10');
  const [selectedClass, setSelectedClass] = useState('9A1');

  const [attendanceState, setAttendanceState] = useState<
    Record<string, { status: 'present' | 'absent_excused' | 'absent_unexcused'; note: string }>
  >({
    HS901: { status: 'present', note: '' },
    HS902: { status: 'present', note: '' },
    HS903: { status: 'present', note: '' },
    HS904: { status: 'present', note: '' },
    HS905: { status: 'present', note: '' },
    HS906: { status: 'absent_excused', note: 'Sốt nhẹ, PHHS đã gửi giấy phép' },
    HS907: { status: 'present', note: '' },
    HS908: { status: 'present', note: '' },
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleStatus = (studentCode: string, newStatus: 'present' | 'absent_excused' | 'absent_unexcused') => {
    setAttendanceState({
      ...attendanceState,
      [studentCode]: {
        ...attendanceState[studentCode],
        status: newStatus,
      },
    });
  };

  const handleNoteChange = (studentCode: string, text: string) => {
    setAttendanceState({
      ...attendanceState,
      [studentCode]: {
        ...attendanceState[studentCode],
        note: text,
      },
    });
  };

  const handleSaveAttendance = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <span>ĐIỂM DANH LỚP CHỦ NHIỆM {selectedClass}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Cập nhật chuyên cần hàng ngày & gửi thông báo tự động tới phụ huynh</p>
        </div>

        <button
          onClick={handleSaveAttendance}
          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shadow-md"
          id="save-attendance-btn"
        >
          <Save className="w-4 h-4" />
          <span>Lưu & Gửi SMS Cho PHHS</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Đã lưu chuyên cần và gửi thông báo tới Phụ huynh thành công!</span>
        </div>
      )}

      {/* Date & Class Selectors */}
      <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-slate-200 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-700">Ngày điểm danh:</span>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
          />
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-bold text-slate-700">Lớp:</span>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900"
          >
            <option value="9A1">Lớp 9A1</option>
            <option value="9A2">Lớp 9A2</option>
          </select>
        </div>
      </div>

      {/* Attendance Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-100">
          {mockStudents9A1.map((s) => {
            const att = attendanceState[s.code] || { status: 'present', note: '' };

            return (
              <div
                key={s.id}
                className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-700 text-xs flex items-center justify-center shrink-0">
                    {s.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-xs">{s.name}</div>
                    <div className="text-[10px] text-slate-500">
                      Mã HS: {s.code} • PH: {s.parentName} ({s.parentPhone})
                    </div>
                  </div>
                </div>

                {/* Status Toggle Buttons */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleStatus(s.code, 'present')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      att.status === 'present'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Có mặt
                  </button>

                  <button
                    onClick={() => toggleStatus(s.code, 'absent_excused')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      att.status === 'absent_excused'
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Vắng có phép
                  </button>

                  <button
                    onClick={() => toggleStatus(s.code, 'absent_unexcused')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      att.status === 'absent_unexcused'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Vắng không phép
                  </button>
                </div>

                {/* Note Input */}
                <input
                  type="text"
                  placeholder="Ghi chú (Lý do vắng, vi phạm...)"
                  value={att.note}
                  onChange={(e) => handleNoteChange(s.code, e.target.value)}
                  className="w-full sm:w-64 p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
