import React from 'react';
import { mockTimetable9A1 } from '../../data/mockData';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

export const StudentTimetable: React.FC = () => {
  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const periods = [1, 2, 3, 4, 5];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-blue-600" />
          <span>THỜI KHÓA BIỂU TOÀN TUẦN — LỚP 9A1</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">Áp dụng từ ngày 10/08/2026 • Phòng học P.401 (Tầng 4)</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white font-bold text-center">
                <th className="p-3 w-16 border-r border-slate-800">TIẾT</th>
                {days.map((day) => (
                  <th key={day} className="p-3 border-r border-slate-800 min-w-[130px]">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {periods.map((period) => (
                <tr key={period} className="text-center">
                  <td className="p-3 font-bold bg-slate-50 text-slate-700 border-r border-slate-200">
                    Tiết {period}
                  </td>
                  {days.map((day) => {
                    const item = mockTimetable9A1.find(
                      (t) => t.dayOfWeek === day && t.period === period
                    );

                    return (
                      <td
                        key={day}
                        className="p-2 border-r border-slate-100 h-20 align-top hover:bg-blue-50/30 transition-colors"
                      >
                        {item ? (
                          <div className="h-full bg-blue-50/80 p-2 rounded-xl border border-blue-200/80 flex flex-col justify-between text-left">
                            <div className="font-bold text-blue-950 text-xs">{item.subjectName}</div>
                            <div className="text-[10px] text-slate-600 truncate">{item.teacherName}</div>
                            <div className="text-[9px] text-blue-700 font-mono">Phòng: {item.roomNumber}</div>
                          </div>
                        ) : (
                          <div className="h-full flex items-center justify-center text-slate-300 italic">
                            —
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
