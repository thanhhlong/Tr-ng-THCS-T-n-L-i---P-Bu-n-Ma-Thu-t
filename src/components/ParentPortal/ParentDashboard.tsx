import React, { useState } from 'react';
import { User } from '../../types';
import { mockGrades, mockAttendanceRecords } from '../../data/mockData';
import {
  Users,
  Award,
  CheckCircle2,
  MessageSquare,
  Send,
  Bell,
  Phone,
  Calendar,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ParentDashboardProps {
  currentUser: User;
  onOpenAiHub: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({ currentUser, onOpenAiHub }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'parent' | 'teacher'; text: string; time: string }>>([
    {
      sender: 'teacher',
      text: 'Chào phụ huynh em Gia Bảo. Gia Bảo tuần này học môn Toán rất hăng hái và đạt điểm 9.8 thi giữa kỳ!',
      time: '08:30 08/08',
    },
    {
      sender: 'parent',
      text: 'Cảm ơn thầy Bảo ạ! Gia Bảo ở nhà có tích cực tự học và làm bài tập thầy giao không ạ?',
      time: '09:15 08/08',
    },
    {
      sender: 'teacher',
      text: 'Em nộp đầy đủ bài tập trực tuyến và rất tự giác ạ!',
      time: '09:20 08/08',
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setMessages([
      ...messages,
      {
        sender: 'parent',
        text: inputMsg,
        time: 'Vừa xong',
      },
    ]);
    setInputMsg('');
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-500/20 text-amber-200 border border-amber-400/30 rounded-full text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5 text-amber-300" />
            <span>CỔNG THÔNG TIN PHỤ HUYNH HỌC SINH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            SỔ LIÊN LẠC ĐIỆN TỬ
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 mt-1">
            Theo dõi con: <span className="font-bold underline text-white">{currentUser.childName}</span> • Lớp {currentUser.className} • GVCN: Thầy Trần Quốc Bảo
          </p>
        </div>

        <button
          onClick={onOpenAiHub}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white text-xs font-bold shadow-lg shadow-rose-600/30 transition-all flex items-center space-x-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Tư Vấn Đồng Hành Cùng Con</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">HỌC LỰC HIỆN TẠI</span>
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">GPA 9.2 / 10</div>
          <div className="text-[10px] text-purple-700 font-bold">Xếp loại Xuất sắc</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">CHUYÊN CẦN THÁNG</span>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">100% Có mặt</div>
          <div className="text-[10px] text-emerald-700 font-bold">Không nghỉ học</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">HẠNH KIỂM (RÈN LUYỆN)</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">TỐT</div>
          <div className="text-[10px] text-blue-700 font-bold">Thực hiện tốt nội quy</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">LỊCH HỌP SẮP TỚI</span>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">16/08/2026</div>
          <div className="text-[10px] text-amber-800 font-bold">Họp PHHS Đầu Năm (08h00)</div>
        </div>
      </div>

      {/* Main Content Grid: Grades & Chat with GVCN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Child's Grades Preview */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>BẢNG ĐIỂM CỦA CON CON (HỌC KỲ I)</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">Đã cập nhật mới nhất</span>
          </div>

          <div className="space-y-2.5">
            {mockGrades.slice(0, 5).map((g) => (
              <div
                key={g.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{g.subjectName}</div>
                  <div className="text-[10px] text-slate-500">Giữa kỳ: {g.midtermScore} • Cuối kỳ: {g.finalScore}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-black text-sm text-purple-900">{g.averageScore}</div>
                  <div className="text-[10px] text-emerald-700 font-bold">TB Môn</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Chat with GVCN */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                TB
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Thầy Trần Quốc Bảo (GVCN 9A1)</h3>
                <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Đang hoạt động</span>
                </div>
              </div>
            </div>

            <a
              href="tel:0912345678"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
              title="Gọi điện"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>

          {/* Messages Box */}
          <div className="space-y-3 max-h-60 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'parent' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] ${
                    m.sender === 'parent'
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-2xs'
                  }`}
                >
                  <p>{m.text}</p>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      m.sender === 'parent' ? 'text-amber-100' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Nhập tin nhắn gửi cho Thầy CN..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              className="flex-1 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
