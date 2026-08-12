import React, { useState } from 'react';
import { mockAiPromptCategories } from '../../data/mockData';
import {
  Sparkles,
  Bot,
  BookMarked,
  FileText,
  ClipboardList,
  BookOpen,
  Sliders,
  Gamepad2,
  Send,
  Copy,
  Check,
  RefreshCw,
  Zap,
} from 'lucide-react';

interface AiHubMainProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const AiHubMain: React.FC<AiHubMainProps> = ({ activeTab, setActiveTab }) => {
  // Common states
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [resultOutput, setResultOutput] = useState('');

  // 1. Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: 'Xin chào Thầy/Cô và các em học sinh! Tôi là Trợ Lý AI Giáo Dục THCS. Tôi có thể hỗ trợ Soạn giáo án CV 5512, tạo Đề thi có ma trận, Giải đáp bài tập Toán/Văn/Anh hoặc tư vấn tâm lý học đường. Bạn cần hỗ trợ gì hôm nay?',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  // 2. Lesson Plan Form State
  const [lpTopic, setLpTopic] = useState('Hệ phương trình bậc nhất hai ẩn');
  const [lpGrade, setLpGrade] = useState('Khối 9');
  const [lpSubject, setLpSubject] = useState('Toán học');
  const [lpDuration, setLpDuration] = useState('2 tiết');

  // 3. Exam Form State
  const [examTopic, setExamTopic] = useState('Khảo sát chất lượng Giữa kỳ 1');
  const [examGrade, setExamGrade] = useState('Khối 9');
  const [examSubject, setExamSubject] = useState('Toán học');

  // 4. Student Feedback State
  const [stName, setStName] = useState('Nguyễn Gia Bảo');
  const [stGpa, setStGpa] = useState('9.2');
  const [stTraits, setStTraits] = useState('Năng nổ, tự giác, tư duy logic tốt, hăng hái phát biểu');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // AI Chat submission handler
  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || loading) return;

    const userText = chatInput;
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', text: userText }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          systemInstruction: 'Bạn là chuyên gia giáo dục THCS Việt Nam, hỗ trợ giáo viên và học sinh chuẩn chương trình GDPT 2018.',
        }),
      });

      const data = await res.json();
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: data.result || 'Đã xảy ra lỗi khi tạo phản hồi.' },
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Không thể kết nối đến máy chủ AI. Vui lòng thử lại sau.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Generic AI Feature Runner
  const runAiEndpoint = async (endpoint: string, payload: any) => {
    setLoading(true);
    setResultOutput('');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResultOutput(data.result || data.error || 'Hoàn tất xử lý.');
    } catch (e) {
      setResultOutput('Lỗi kết nối máy chủ AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Hub Header */}
      <div className="bg-gradient-to-r from-rose-900 via-pink-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-rose-500/20 text-rose-200 border border-rose-400/30 rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>TRUNG TÂM TRÍ TUỆ NHÂN TẠO GIÁO DỤC THCS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI EDUCATION HUB
          </h1>
          <p className="text-xs sm:text-sm text-rose-100 mt-1">
            Ứng dụng Mô hình Ngôn ngữ Lớn Gemini trong soạn giảng chuẩn Công văn 5512, tạo ma trận đề thi & trợ lý học tập
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs for AI Hub */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {[
          { id: 'ai-chat', label: '🤖 AI Chatbot', icon: Bot },
          { id: 'ai-prompts', label: '📚 Thư Viện Prompt', icon: BookMarked },
          { id: 'ai-lesson-plan', label: '📄 Soạn Giáo Án 5512', icon: FileText },
          { id: 'ai-exam-quiz', label: '📝 Tạo Đề Thi & Ma Trận', icon: ClipboardList },
          { id: 'ai-worksheet', label: '📑 Phiếu Học Tập', icon: BookOpen },
          { id: 'ai-ppt', label: '📊 Dàn Ý PowerPoint', icon: Sliders },
          { id: 'ai-game', label: '🎮 Trò Chơi Học Tập', icon: Gamepad2 },
          { id: 'ai-feedback', label: '✍️ Nhận Xét Học Sinh', icon: Send },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setResultOutput('');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeTab === tab.id
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT RENDER */}

      {/* 1. AI CHATBOT */}
      {activeTab === 'ai-chat' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden flex flex-col h-[520px]">
          <div className="p-4 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-rose-600" />
              <span>TRỢ LÝ AI CHUYÊN NGHÀNH GIÁO DỤC THCS</span>
            </span>
            <span className="text-[10px] text-emerald-600 font-mono">MODEL: GEMINI FLASH 2.5</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-4 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-rose-600 text-white rounded-br-none font-medium'
                      : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center space-x-2 text-rose-600 font-bold text-xs p-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI đang tư duy và tạo câu trả lời...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSendChat} className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Hỏi AI về phương pháp dạy học, soạn bài, giải Toán hay tư vấn..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden ring-1 ring-slate-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center gap-1 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span>Gửi</span>
            </button>
          </form>
        </div>
      )}

      {/* 2. PROMPT LIBRARY */}
      {activeTab === 'ai-prompts' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              THƯ VIỆN 100+ PROMPT AI MẪU CHUYÊN DÙNG CHO GIÁO VIÊN THCS
            </h2>
            <p className="text-xs text-slate-500">
              Bấm "Sử dụng Prompt này" để tự động gửi câu lệnh tối ưu hóa cho AI Chatbot.
            </p>
          </div>

          <div className="space-y-6">
            {mockAiPromptCategories.map((cat) => (
              <div key={cat.id} className="space-y-3">
                <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider px-1">
                  {cat.categoryName} ({cat.prompts.length} PROMPT)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.prompts.map((p) => (
                    <div
                      key={p.id}
                      className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-rose-300 transition-all space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-900">{p.title}</div>
                        <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 italic leading-relaxed">
                          "{p.promptText}"
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('ai-chat');
                          setChatInput(p.promptText);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-900 hover:bg-rose-100 font-bold text-xs transition-colors flex items-center space-x-1 justify-center"
                      >
                        <Zap className="w-3.5 h-3.5 text-rose-600" />
                        <span>Sử dụng Prompt này trong AI Chat</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. AI LESSON PLAN CV 5512 */}
      {activeTab === 'ai-lesson-plan' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              NHẬP THÔNG TIN BÀI DẠY (CÔNG VĂN 5512)
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên Bài Học / Chủ Đề</label>
                <input
                  type="text"
                  value={lpTopic}
                  onChange={(e) => setLpTopic(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Khối Lớp</label>
                  <select
                    value={lpGrade}
                    onChange={(e) => setLpGrade(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 bg-white"
                  >
                    <option value="Khối 6">Khối 6</option>
                    <option value="Khối 7">Khối 7</option>
                    <option value="Khối 8">Khối 8</option>
                    <option value="Khối 9">Khối 9</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Môn Học</label>
                  <select
                    value={lpSubject}
                    onChange={(e) => setLpSubject(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 bg-white"
                  >
                    <option value="Toán học">Toán học</option>
                    <option value="Ngữ văn">Ngữ văn</option>
                    <option value="Tiếng Anh">Tiếng Anh</option>
                    <option value="Vật lý">Vật lý</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Thời Lượng</label>
                  <input
                    type="text"
                    value={lpDuration}
                    onChange={(e) => setLpDuration(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <button
                onClick={() =>
                  runAiEndpoint('/api/ai/lesson-plan', {
                    topic: lpTopic,
                    grade: lpGrade,
                    subject: lpSubject,
                    duration: lpDuration,
                  })
                }
                disabled={loading}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2"
                id="generate-lesson-plan-btn"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'AI Đang Soạn Giáo Án...' : 'Tạo Giáo Án Chuẩn CV 5512'}</span>
              </button>
            </div>
          </div>

          {/* Result Output Panel */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between h-[500px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-rose-300">KẾT QUẢ GIÁO ÁN CHUẨN CV 5512</span>
              {resultOutput && (
                <button
                  onClick={() => handleCopy(resultOutput)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-bold hover:bg-slate-700 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã Sao Chép' : 'Sao Chép'}</span>
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto my-3 text-xs leading-relaxed whitespace-pre-wrap font-mono text-slate-200">
              {resultOutput || (
                <div className="h-full flex items-center justify-center text-slate-500 text-center">
                  Bấm "Tạo Giáo Án Chuẩn CV 5512" để AI sinh văn bản hoàn chỉnh bao gồm: Mục tiêu (Kiến thức, Năng lực, Phẩm chất), Thiết bị dạy học, Tiến trình dạy học 4 hoạt động.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. AI EXAM & MATRIX */}
      {activeTab === 'ai-exam-quiz' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              THÔNG TIN TẠO ĐỀ THI & MA TRẬN
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên Kỳ Thi / Chủ Đề</label>
                <input
                  type="text"
                  value={examTopic}
                  onChange={(e) => setExamTopic(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Khối Lớp</label>
                  <select
                    value={examGrade}
                    onChange={(e) => setExamGrade(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 bg-white"
                  >
                    <option value="Khối 6">Khối 6</option>
                    <option value="Khối 7">Khối 7</option>
                    <option value="Khối 8">Khối 8</option>
                    <option value="Khối 9">Khối 9</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Môn Học</label>
                  <select
                    value={examSubject}
                    onChange={(e) => setExamSubject(e.target.value)}
                    className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 bg-white"
                  >
                    <option value="Toán học">Toán học</option>
                    <option value="Ngữ văn">Ngữ văn</option>
                    <option value="Tiếng Anh">Tiếng Anh</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() =>
                  runAiEndpoint('/api/ai/exam-quiz', {
                    topic: examTopic,
                    grade: examGrade,
                    subject: examSubject,
                  })
                }
                disabled={loading}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'AI Đang Soạn Đề...' : 'Tạo Đề Thi & Bảng Ma Trận'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between h-[500px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-rose-300">ĐỀ THI & MA TRẬN TẠO TỰ ĐỘNG</span>
              {resultOutput && (
                <button
                  onClick={() => handleCopy(resultOutput)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-bold hover:bg-slate-700 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao Chép</span>
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto my-3 text-xs leading-relaxed whitespace-pre-wrap font-mono text-slate-200">
              {resultOutput || (
                <div className="h-full flex items-center justify-center text-slate-500 text-center">
                  Bấm "Tạo Đề Thi & Bảng Ma Trận" để sinh đề thi hoàn chỉnh kèm Ma trận phân bổ 4 mức độ: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 5. STUDENT FEEDBACK */}
      {activeTab === 'ai-feedback' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              NHẬP THÔNG TIN HỌC SINH CẦN VIẾT NHẬN XẾP LOẠI
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Tên Học Sinh</label>
                <input
                  type="text"
                  value={stName}
                  onChange={(e) => setStName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Điểm Trung Bình (GPA)</label>
                <input
                  type="text"
                  value={stGpa}
                  onChange={(e) => setStGpa(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Đặc Điểm Tính Cách & Ý Thức</label>
                <textarea
                  rows={3}
                  value={stTraits}
                  onChange={(e) => setStTraits(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-slate-900"
                ></textarea>
              </div>

              <button
                onClick={() =>
                  runAiEndpoint('/api/ai/student-feedback', {
                    studentName: stName,
                    gpa: stGpa,
                    traits: stTraits,
                  })
                }
                disabled={loading}
                className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? 'AI Đang Sinh Nhận Xét...' : 'Tạo Nhận Xét Học Bạ Điền Tự Động'}</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col justify-between h-[450px]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-rose-300">NHẬN XẾP HỌC BẠ SỔ LIÊN LẠC</span>
              {resultOutput && (
                <button
                  onClick={() => handleCopy(resultOutput)}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-bold hover:bg-slate-700 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao Chép</span>
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto my-3 text-xs leading-relaxed whitespace-pre-wrap font-mono text-slate-200">
              {resultOutput || (
                <div className="h-full flex items-center justify-center text-slate-500 text-center">
                  Bấm "Tạo Nhận Xét Học Bạ" để AI viết lời nhận xét chuẩn sư phạm, động viên học sinh.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fallback for other AI tabs (Worksheet, PPT, Games) */}
      {(activeTab === 'ai-worksheet' || activeTab === 'ai-ppt' || activeTab === 'ai-game') && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900">
            {activeTab === 'ai-worksheet'
              ? 'AI TẠO PHIẾU HỌC TẬP (WORKSHEET)'
              : activeTab === 'ai-ppt'
              ? 'AI TẠO DÀN Ý SLIDE POWERPOINT'
              : 'AI TẠO TRÒ CHƠI HỌC TẬP (KAHOOT / QUIZ)'}
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nhập tên chủ đề bài học..."
              value={lpTopic}
              onChange={(e) => setLpTopic(e.target.value)}
              className="flex-1 p-3 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
            />
            <button
              onClick={() =>
                runAiEndpoint(
                  activeTab === 'ai-worksheet'
                    ? '/api/ai/worksheet'
                    : activeTab === 'ai-ppt'
                    ? '/api/ai/ppt-outline'
                    : '/api/ai/learning-game',
                  { topic: lpTopic, grade: 'Khối 9' }
                )
              }
              disabled={loading}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors shrink-0"
            >
              Tạo Ngay
            </button>
          </div>

          <div className="p-6 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono whitespace-pre-wrap min-h-[300px]">
            {resultOutput || 'Kết quả sẽ hiển thị tại đây sau khi tạo.'}
          </div>
        </div>
      )}
    </div>
  );
};
