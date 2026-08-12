import React, { useState } from 'react';
import { mockClasses } from '../../data/mockData';
import { FolderKanban, ChevronDown, ChevronRight, Users, BookOpen, UserCheck, Calendar } from 'lucide-react';

export const ClassManagement: React.FC = () => {
  const [expandedGrades, setExpandedGrades] = useState<number[]>([6, 7, 8, 9]);

  const toggleGrade = (grade: number) => {
    if (expandedGrades.includes(grade)) {
      setExpandedGrades(expandedGrades.filter((g) => g !== grade));
    } else {
      setExpandedGrades([...expandedGrades, grade]);
    }
  };

  const grades = [6, 7, 8, 9];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FolderKanban className="w-6 h-6 text-purple-600" />
          <span>QUẢN LÝ KHỐI HỌC VÀ DANH SÁCH LỚP (32 LỚP)</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">Cơ cấu tổ chức Khối 6, 7, 8, 9, Giáo viên chủ nhiệm & Phòng học</p>
      </div>

      {/* Accordion List for Grades 6-9 */}
      <div className="space-y-4">
        {grades.map((gradeNum) => {
          const isExpanded = expandedGrades.includes(gradeNum);
          const classesInGrade = mockClasses.filter((c) => c.grade === gradeNum);

          return (
            <div key={gradeNum} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              {/* Grade Header Bar */}
              <button
                onClick={() => toggleGrade(gradeNum)}
                className="w-full p-5 bg-slate-50 hover:bg-slate-100 transition-colors flex items-center justify-between text-left border-b border-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white font-black text-sm flex items-center justify-center">
                    {gradeNum}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">KHỐI LỚP {gradeNum}</h3>
                    <p className="text-xs text-slate-500">8 Lớp học • 320 Học sinh • Tầng {gradeNum - 5}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
                  <span>{isExpanded ? 'Thu gọn' : 'Mở rộng'}</span>
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>

              {/* Class Cards Grid */}
              {isExpanded && (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/40">
                  {classesInGrade.map((cls) => (
                    <div
                      key={cls.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-400 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-base font-black text-purple-900 bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                          {cls.name}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-slate-500">{cls.roomNumber}</span>
                      </div>

                      <div className="space-y-1 text-xs text-slate-700">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>GVCN: {cls.homeroomTeacherName}</span>
                        </div>
                        <div className="text-slate-500 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>Sĩ số: {cls.studentCount} Học sinh</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-purple-700">
                        <button
                          onClick={() => alert(`Xem danh sách sĩ số lớp ${cls.name}`)}
                          className="hover:underline"
                        >
                          Danh sách Lớp
                        </button>
                        <button
                          onClick={() => alert(`Xem Thời khóa biểu lớp ${cls.name}`)}
                          className="hover:underline flex items-center gap-1"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>TKB Lớp</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
