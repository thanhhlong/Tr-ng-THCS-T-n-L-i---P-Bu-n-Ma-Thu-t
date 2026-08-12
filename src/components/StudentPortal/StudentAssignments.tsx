import React, { useState } from 'react';
import { mockAssignments } from '../../data/mockData';
import { BookOpen, Upload, CheckCircle2, Clock, FileText, Send } from 'lucide-react';

export const StudentAssignments: React.FC = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(mockAssignments[0]);
  const [fileAttached, setFileAttached] = useState(false);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmitHomework = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-purple-600" />
          <span>BÀI TẬP VỀ NHÀ & NỘP BÀI ONLINE</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Theo dõi hạn nộp bài, đính kèm file làm bài (Word/PDF/Hình ảnh) & Nhận phản hồi chấm điểm từ thầy cô
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Assignment List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            DANH SÁCH BÀI TẬP ({mockAssignments.length})
          </h3>

          {mockAssignments.map((ass) => {
            const isSelected = selectedAssignment?.id === ass.id;

            return (
              <div
                key={ass.id}
                onClick={() => setSelectedAssignment(ass)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-50 border-purple-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-purple-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-purple-900">{ass.subjectName}</span>
                  <span className="text-[10px] text-slate-400 font-mono">Hạn: {ass.dueDate}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{ass.title}</h4>
                <div className="text-[11px] text-slate-500 mt-2">GV: {ass.assignedBy}</div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Detailed Submission View */}
        <div className="lg:col-span-2 space-y-6">
          {selectedAssignment ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-3 border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-900 rounded-full">
                    Môn: {selectedAssignment.subjectName} • Lớp {selectedAssignment.className}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Hạn nộp: {selectedAssignment.dueDate}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900">{selectedAssignment.title}</h2>
                <div className="text-xs text-slate-500">Giáo viên ra đề: {selectedAssignment.assignedBy} • Ngày đăng: {selectedAssignment.assignedDate}</div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase">NỘI DUNG VÀ YÊU CẦU:</h4>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  {selectedAssignment.description}
                </div>
              </div>

              {/* Submission Form */}
              <form onSubmit={handleSubmitHomework} className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-800 uppercase">GỬI BÀI LÀM TRỰC TUYẾN:</h4>

                {submittedSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Nộp bài thành công! Thầy cô đã nhận được bài làm của bạn.</span>
                  </div>
                )}

                <div className="p-6 border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-2xl bg-slate-50 text-center space-y-2 transition-colors">
                  <Upload className="w-8 h-8 text-purple-600 mx-auto" />
                  <div className="text-xs font-bold text-slate-800">
                    Kéo thả file làm bài (PDF, DOCX, JPG, PNG) vào đây
                  </div>
                  <div className="text-[11px] text-slate-400">hoặc bấm vào bên dưới để chọn file từ máy tính</div>
                  <button
                    type="button"
                    onClick={() => setFileAttached(true)}
                    className="px-4 py-2 rounded-xl bg-purple-100 text-purple-900 text-xs font-bold hover:bg-purple-200 transition-colors"
                  >
                    {fileAttached ? '✓ Đã đính kèm: BaiLam_Toan_9A1.pdf' : 'Chọn File Bài Làm'}
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ghi chú gửi Giáo viên (không bắt buộc)</label>
                  <textarea
                    rows={3}
                    placeholder="Em xin phép nộp bài tập toán số 2..."
                    value={submissionNotes}
                    onChange={(e) => setSubmissionNotes(e.target.value)}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md transition-colors flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Nộp Bài Ngay</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-400 text-xs">
              Vui lòng chọn bài tập từ danh sách bên trái để xem yêu cầu và nộp bài.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
