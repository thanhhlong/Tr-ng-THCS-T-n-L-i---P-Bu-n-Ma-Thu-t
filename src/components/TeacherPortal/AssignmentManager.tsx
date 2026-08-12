import React, { useState } from 'react';
import { mockAssignments } from '../../data/mockData';
import { Assignment } from '../../types';
import { BookOpen, Plus, Calendar, FileText, CheckCircle2, Clock, X } from 'lucide-react';

export const AssignmentManager: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Toán học');
  const [className, setClassName] = useState('9A1');
  const [dueDate, setDueDate] = useState('2026-08-15');
  const [description, setDescription] = useState('');

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newAss: Assignment = {
      id: 'ass-' + Date.now(),
      title,
      subjectName: subject,
      className,
      assignedBy: 'Thầy Trần Quốc Bảo',
      assignedDate: '10/08/2026',
      dueDate,
      description,
      totalStudents: 40,
      submittedCount: 0,
      status: 'active',
    };

    setAssignments([newAss, ...assignments]);
    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <span>QUẢN LÝ BÀI TẬP VỀ NHÀ & NỘP BÀI ONLINE</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Giao bài tập, đính kèm phiếu học tập & Chấm điểm phản hồi trực tuyến</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2 shrink-0"
          id="create-assignment-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo Bài Tập Mới</span>
        </button>
      </div>

      {/* Assignment List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assignments.map((ass) => (
          <div
            key={ass.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-purple-300 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200">
                  {ass.subjectName} • Lớp {ass.className}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Hạn nộp: {ass.dueDate}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{ass.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">{ass.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="text-slate-500">
                Tiến độ: <span className="font-bold text-slate-900">{ass.submittedCount}/{ass.totalStudents} HS nộp</span>
              </div>

              <button
                onClick={() => alert(`Mở bảng chấm bài trực tuyến cho bài tập: ${ass.title}`)}
                className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-900 hover:bg-purple-100 font-bold transition-colors"
              >
                Chấm Bài Online
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">GIAO BÀI TẬP VỀ NHÀ MỚI</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên Bài Tập / Chủ Đề</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Luyện tập Giải Hệ Phương Trình Bậc Nhất 2 Ẩn"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Môn Học</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 bg-white"
                  >
                    <option value="Toán học">Toán học</option>
                    <option value="Ngữ văn">Ngữ văn</option>
                    <option value="Tiếng Anh">Tiếng Anh</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hạn Nộp Bài</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nội Dung Yêu Cầu & Hướng Dẫn</label>
                <textarea
                  rows={4}
                  placeholder="Nhập yêu cầu chi tiết bài tập..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700"
                >
                  Đăng Bài Tập
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
