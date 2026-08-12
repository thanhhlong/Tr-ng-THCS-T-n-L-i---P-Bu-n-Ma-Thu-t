import React, { useState } from 'react';
import tanLoiLogo from '../../assets/images/LOGO.jpg';
import { useSiteContent } from '../../context/SiteContentContext';
import {
  Calendar,
  ChevronRight,
  Download,
  Image as ImageIcon,
  BookOpen,
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Volume2,
  ExternalLink,
  Activity,
  UserCheck,
  Building,
  Clock,
  Send,
  Eye,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

interface PublicHomeProps {
  onNavigateTab: (tab: string) => void;
  onSelectArticle: (article: any) => void;
  onOpenAiHub: () => void;
}

export const PublicHome: React.FC<PublicHomeProps> = ({
  onNavigateTab,
  onSelectArticle,
  onOpenAiHub,
}) => {
  const { schoolInfo, newsArticles, documents } = useSiteContent();
  const [newsCategoryTab, setNewsCategoryTab] = useState<string>('Tất cả');
  const [selectedScheduleDay, setSelectedScheduleDay] = useState<number>(1); // 1 = T2, 2 = T3...
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackContent, setFeedbackContent] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const featuredArticle = newsArticles[0] || {
    id: 1,
    title: 'Hội nghị Tổng kết Năm học và Triển khai Nhiệm vụ Chuyển đổi Số Giáo dục 2026-2027',
    summary: 'Trường THCS Tân Lợi tiên phong áp dụng AI Hub và Sổ liên lạc số toàn diện, nâng cao chất lượng dạy và học.',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
    publishedDate: '10/08/2026',
    category: 'Tin Nổi Bật',
    author: 'Ban Giám Hiệu',
  };

  const breakingNews = newsArticles.slice(1, 5);

  const filteredArticles =
    newsCategoryTab === 'Tất cả'
      ? newsArticles
      : newsArticles.filter((a) => a.category === newsCategoryTab);

  const daysOfWeek = [
    { day: 1, label: 'Thứ Hai', date: '10/08' },
    { day: 2, label: 'Thứ Ba', date: '11/08' },
    { day: 3, label: 'Thứ Tư', date: '12/08' },
    { day: 4, label: 'Thứ Năm', date: '13/08' },
    { day: 5, label: 'Thứ Sáu', date: '14/08' },
    { day: 6, label: 'Thứ Bảy', date: '15/08' },
  ];

  const daySchedules: Record<number, Array<{ time: string; event: string; location: string }>> = {
    1: [
      { time: '07h15', event: 'Lễ Chào cờ & Sinh hoạt dưới cờ đầu tuần', location: 'Sân trường chính' },
      { time: '08h00', event: 'Tập huấn nâng cao năng lực ứng dụng AI cho GV', location: 'Phòng Tin học 1' },
      { time: '14h00', event: 'Họp Tổ chuyên môn Toán - Tin & Ngữ văn', location: 'Phòng Hội đồng' },
    ],
    2: [
      { time: '07h30', event: 'Kiểm tra chuyên đề chất lượng khối 9', location: 'Các phòng học' },
      { time: '14h30', event: 'Sinh hoạt Câu lạc bộ STEM Rô-bốt', location: 'Phòng Đa năng' },
    ],
    3: [
      { time: '08h00', event: 'Chung kết Hội thi Rùa Vàng Toán Học Khối 8', location: 'Hội trường A' },
      { time: '15h00', event: 'Giao lưu thể thao Đoàn - Đội', location: 'Sân bóng đá' },
    ],
    4: [
      { time: '07h30', event: 'Dự giờ thao giảng cấp Trường khối 6, 7', location: 'Phòng học thông minh' },
      { time: '14h00', event: 'Họp Hội đồng Thi đua Khen thưởng', location: 'Phòng Hiệu trưởng' },
    ],
    5: [
      { time: '08h00', event: 'Sơ kết phong trào "Trường học Hạnh phúc"', location: 'Hội trường A' },
      { time: '16h00', event: 'Tổng vệ sinh khuôn viên trường xanh - sạch - đẹp', location: 'Toàn trường' },
    ],
    6: [
      { time: '07h30', event: 'Họp BGH chuẩn bị Lễ Khai giảng năm học mới', location: 'Phòng họp BGH' },
      { time: '14h00', event: 'Trả bài kiểm tra định kỳ trực tuyến', location: 'Cổng Học sinh' },
    ],
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedbackContent.trim()) {
      setFeedbackSuccess(true);
      setTimeout(() => {
        setFeedbackContent('');
        setFeedbackEmail('');
        setFeedbackSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6 pb-12 font-sans text-slate-800">
      {/* 1. RUNNING NEWS TICKER BAR (Dòng sự kiện / Tin mới nhất - daklak.edu.vn style) */}
      <section className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-900 border border-amber-500 rounded-xl px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center space-x-2 shrink-0">
          <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-red-700 text-white font-black text-xs uppercase tracking-wider animate-pulse">
            <Volume2 className="w-3.5 h-3.5 text-amber-300" />
            <span>TIN MỚI NHẤT</span>
          </span>
          <span className="text-[11px] font-bold text-slate-900 hidden md:inline">
            10/08/2026:
          </span>
        </div>

        <div className="flex-1 overflow-hidden w-full text-xs font-bold text-slate-900 truncate">
          <span className="cursor-pointer hover:underline" onClick={() => onNavigateTab('public-announcements')}>
            📢 THÔNG BÁO TỪ BGH: Tất cả phụ huynh các khối 6, 7, 8, 9 họp mặt đầu năm học lúc 08h00 Chủ Nhật ngày 16/08/2026 tại Sân trường chính.
          </span>
        </div>

        <button
          onClick={() => onNavigateTab('public-announcements')}
          className="text-xs font-extrabold text-red-900 hover:text-red-950 underline shrink-0 flex items-center gap-1"
        >
          <span>Xem tất cả thông báo</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* 2. MAIN PORTAL GRID (Bố cục 2 cột Cổng thông tin: 8 Cột Trái + 4 Cột Phải) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================== */}
        {/* LEFT MAIN COLUMN (8 Columns - 66.6% width) */}
        {/* ========================================== */}
        <div className="lg:col-span-8 space-y-6">
          {/* A. SPOTLIGHT FEATURED NEWS GRID (Tin Tiêu Điểm) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-800/20 pb-2.5">
              <h2 className="text-sm font-extrabold text-emerald-950 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-5 bg-emerald-700 rounded-xs"></span>
                <span>TIN TIÊU ĐIỂM & SỰ KIỆN NỔI BẬT</span>
              </h2>
              <button
                onClick={() => onNavigateTab('public-news')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <span>Xem thêm</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {/* Big Spotlight Story (Left 7 cols) */}
              <div
                onClick={() => onSelectArticle(featuredArticle)}
                className="md:col-span-7 group cursor-pointer space-y-2 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4"
                id="featured-news-spotlight"
              >
                <div className="relative rounded-xl overflow-hidden bg-slate-100 h-52 sm:h-60 shadow-xs">
                  <img
                    src={featuredArticle.imageUrl}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-800 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded shadow-md">
                    {featuredArticle.category}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent p-3 text-white">
                    <div className="text-[10px] text-amber-300 font-medium flex items-center gap-2">
                      <span>📅 {featuredArticle.publishedDate}</span>
                      <span>•</span>
                      <span>Tác giả: {featuredArticle.author}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {featuredArticle.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {featuredArticle.summary}
                </p>
              </div>

              {/* Breaking News List (Right 5 cols) */}
              <div className="md:col-span-5 space-y-3">
                <div className="text-xs font-bold text-slate-700 border-b border-slate-100 pb-1 flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tin mới cập nhật</span>
                </div>

                {breakingNews.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectArticle(item)}
                    className="group cursor-pointer flex gap-3 items-start p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <img
                      src={
                        item.imageUrl ||
                        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=300'
                      }
                      alt={item.title}
                      className="w-16 h-12 rounded object-cover shrink-0 border border-slate-200"
                    />
                    <div className="space-y-0.5">
                      <div className="text-[10px] font-bold text-emerald-800">
                        {item.publishedDate}
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2 leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* B. NEWS CATEGORY TABS & GRID (Khối Chuyên Mục Tin Tức - daklak.edu.vn style) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
              <h2 className="text-sm font-extrabold text-emerald-950 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-5 bg-amber-500 rounded-xs"></span>
                <span>TIN TỨC - HOẠT ĐỘNG GIÁO DỤC</span>
              </h2>

              {/* Category Pills */}
              <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
                {['Tất cả', 'Thành tích', 'STEM', 'Tuyển sinh', 'Hoạt động'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setNewsCategoryTab(cat)}
                    className={`px-2.5 py-1 rounded text-xs font-bold whitespace-nowrap transition-all ${
                      newsCategoryTab === cat
                        ? 'bg-emerald-800 text-amber-300 shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="group bg-slate-50/70 border border-slate-200/80 rounded-xl p-3 hover:border-emerald-500 hover:bg-white transition-all cursor-pointer flex flex-col justify-between"
                  id={`article-card-${article.id}`}
                >
                  <div className="space-y-2">
                    <div className="relative h-36 rounded-lg overflow-hidden bg-slate-200">
                      <img
                        src={
                          article.imageUrl ||
                          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600'
                        }
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 left-2 bg-emerald-800 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                        {article.category}
                      </span>
                    </div>

                    <div className="text-[10px] text-slate-500 font-medium">
                      📅 {article.publishedDate} • Tác giả: {article.author}
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 line-clamp-2 leading-snug">
                      {article.title}
                    </h4>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-emerald-700 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Xem tiếp bài viết</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* C. DOCUMENT & OFFICIAL NOTICES BOARD (Bảng Văn Bản - Công Văn daklak.edu.vn style) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-sm font-extrabold text-emerald-950 uppercase tracking-wide flex items-center gap-2">
                <span className="w-2.5 h-5 bg-sky-600 rounded-xs"></span>
                <span>VĂN BẢN CHỈ ĐẠO & CÔNG VĂN MỚI BAN HÀNH</span>
              </h2>

              <button
                onClick={() => onNavigateTab('public-library')}
                className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1"
              >
                <span>Kho tài liệu</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-emerald-900 text-amber-300 font-bold text-[11px] uppercase border-b border-emerald-950">
                    <th className="p-2.5 w-24">Số / Ký hiệu</th>
                    <th className="p-2.5">Trích yếu nội dung văn bản</th>
                    <th className="p-2.5 w-28">Ban hành</th>
                    <th className="p-2.5 w-16 text-center">Tải về</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {documents.map((doc, idx) => (
                    <tr key={doc.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                      <td className="p-2.5 font-mono font-bold text-emerald-900">
                        {`CV-${2026}-${doc.id}`}
                      </td>
                      <td className="p-2.5 font-semibold text-slate-800 hover:text-emerald-700 cursor-pointer">
                        {doc.title}
                        <div className="text-[10px] text-slate-500 font-normal">
                          Phân loại: {doc.category} • Môn: {doc.subjectName || 'Chung'}
                        </div>
                      </td>
                      <td className="p-2.5 text-slate-600 font-medium whitespace-nowrap">
                        10/08/2026
                      </td>
                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => alert(`Đang tải văn bản: ${doc.title}`)}
                          className="p-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
                          title="Tải văn bản"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* D. PHOTO & VIDEO ACTIVITY GALLERY */}
          <section className="bg-slate-900 text-white rounded-2xl p-4 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-extrabold text-amber-300 uppercase tracking-wide flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-emerald-400" />
                <span>THƯ VIỆN HÌNH ẢNH & VIDEO HOẠT ĐỘNG</span>
              </h2>
              <span className="text-xs text-slate-400">Trường THCS Tân Lợi — BMT</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: 'Lễ Khai Giảng Hào Hùng', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400' },
                { title: 'Ngày Hội STEM Rô-bốt', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400' },
                { title: 'Hội Thi Văn Nghệ 20/11', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400' },
                { title: 'Giải Bóng Đá Học Sinh Khối 9', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400' },
              ].map((item, idx) => (
                <div key={idx} className="group relative rounded-xl overflow-hidden bg-slate-800 h-28 cursor-pointer border border-slate-700">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-90" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent p-2 flex items-end">
                    <span className="text-[10px] font-bold text-slate-100 line-clamp-1">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* =========================================== */}
        {/* RIGHT SIDEBAR COLUMN (4 Columns - 33.3% width) */}
        {/* =========================================== */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. PRINCIPAL MESSAGE CARD (Thông Điệp BGH) */}
          <section className="bg-gradient-to-b from-emerald-900 to-emerald-950 text-white rounded-2xl p-4 shadow-md border border-emerald-800 space-y-3">
            <div className="text-xs font-extrabold text-amber-300 uppercase tracking-wider border-b border-emerald-800 pb-2 flex items-center justify-between">
              <span>THÔNG ĐIỆP BAN GIÁM HIỆU</span>
              <GraduationCap className="w-4 h-4 text-emerald-300" />
            </div>

            <div className="pt-1">
              <div className="text-xs font-extrabold text-amber-300 uppercase">{schoolInfo.principal}</div>
              <div className="text-[10px] text-emerald-200 font-semibold mt-0.5">Hiệu trưởng {schoolInfo.name}</div>
              <div className="text-[11px] text-emerald-100 mt-2 italic border-l-2 border-amber-400 pl-2.5 py-0.5">"Xây dựng môi trường giáo dục hạnh phúc, kỷ cương, chất lượng số."</div>
            </div>

            <p className="text-[11px] text-emerald-100 leading-relaxed pt-1 border-t border-emerald-800/80">
              Nhà trường cam kết chuyển đổi số toàn diện, ứng dụng công nghệ AI tiên phong trong quản lý giảng dạy và đồng hành cùng sự phát triển của học sinh Buôn Ma Thuột.
            </p>
          </section>

          {/* 2. WEEKLY WORK SCHEDULE WIDGET (Lịch Công Tác Tuần) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>LỊCH CÔNG TÁC TUẦN BGH</span>
              </h2>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Tuần 01
              </span>
            </div>

            {/* Days of Week Selector */}
            <div className="grid grid-cols-6 gap-1 text-center text-[10px] font-bold">
              {daysOfWeek.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setSelectedScheduleDay(d.day)}
                  className={`py-1 rounded transition-all ${
                    selectedScheduleDay === d.day
                      ? 'bg-emerald-800 text-amber-300 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <div>{d.label.replace('Thứ ', 'T')}</div>
                  <div className="text-[9px] font-normal opacity-80">{d.date}</div>
                </button>
              ))}
            </div>

            {/* Schedule List for selected day */}
            <div className="space-y-2 pt-1 min-h-[110px]">
              {daySchedules[selectedScheduleDay]?.map((item, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs space-y-0.5">
                  <div className="flex items-center justify-between font-bold text-emerald-900">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>{item.time}</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-normal">📍 {item.location}</span>
                  </div>
                  <div className="text-[11px] text-slate-800 font-medium">{item.event}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. QUICK ACTION BANNERS (Banners liên kết nhanh - daklak.edu.vn style) */}
          <section className="space-y-2.5">
            <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider px-1">
              TIỆN ÍCH TRỰC TUYẾN
            </div>

            {/* Banner 1: Dịch vụ công */}
            <button
              onClick={() => onNavigateTab('public-admissions')}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-900 p-3 rounded-xl shadow-xs font-black text-xs text-left hover:scale-[1.02] transition-transform flex items-center justify-between border border-amber-400"
            >
              <div className="flex items-center space-x-2.5">
                <Building className="w-5 h-5 text-slate-900" />
                <div>
                  <div className="uppercase">CỔNG DỊCH VỤ CÔNG & TUYỂN SINH</div>
                  <div className="text-[10px] font-semibold text-slate-800">Đăng ký nhập học Lớp 6 trực tuyến</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Banner 2: Sổ liên lạc số */}
            <button
              onClick={() => alert('Vui lòng Đăng nhập tài khoản Phụ huynh/Học sinh để tra cứu Sổ liên lạc số.')}
              className="w-full bg-gradient-to-r from-emerald-800 to-emerald-900 text-white p-3 rounded-xl shadow-xs font-black text-xs text-left hover:scale-[1.02] transition-transform flex items-center justify-between border border-emerald-700"
            >
              <div className="flex items-center space-x-2.5">
                <UserCheck className="w-5 h-5 text-amber-300" />
                <div>
                  <div className="uppercase">SỔ LIÊN LẠC ĐIỆN TỬ HỌC SINH</div>
                  <div className="text-[10px] font-normal text-emerald-200">Tra cứu điểm số, thời khóa biểu & chuyên cần</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Banner 3: AI Hub */}
            <button
              onClick={onOpenAiHub}
              className="w-full bg-gradient-to-r from-rose-700 to-pink-700 text-white p-3 rounded-xl shadow-xs font-black text-xs text-left hover:scale-[1.02] transition-transform flex items-center justify-between border border-rose-600"
            >
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <div>
                  <div className="uppercase">TRỢ LÝ AI EDUCATION HUB</div>
                  <div className="text-[10px] font-normal text-rose-200">Hỏi đáp học tập & Ôn thi thông minh</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </section>

          {/* 4. ONLINE FEEDBACK BOX (Hộp thư góp ý trực tuyến) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
            <div className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider border-b border-slate-200 pb-2 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-emerald-700" />
              <span>HỘP THƯ GÓP Ý & HỎI ĐÁP BGH</span>
            </div>

            {feedbackSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Cảm ơn ý kiến đóng góp! BGH đã nhận thông tin.</span>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-2">
                <input
                  type="email"
                  placeholder="Email / Số điện thoại liên hệ..."
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  required
                />
                <textarea
                  placeholder="Nội dung ý kiến đóng góp, câu hỏi..."
                  rows={3}
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:ring-2 focus:ring-emerald-600 focus:outline-hidden resize-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Gửi ý kiến đóng góp</span>
                </button>
              </form>
            )}
          </section>

          {/* 5. ACCESS COUNTER WIDGET (Thống kê truy cập daklak.edu.vn style) */}
          <section className="bg-slate-900 text-white rounded-2xl p-4 shadow-md space-y-3">
            <div className="text-xs font-extrabold text-amber-300 uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center justify-between">
              <span>THỐNG KÊ TRUY CẬP CỔNG</span>
              <Eye className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-[10px] text-slate-400">Đang truy cập</div>
                <div className="text-sm font-black text-emerald-400 font-mono">42</div>
              </div>
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-[10px] text-slate-400">Hôm nay</div>
                <div className="text-sm font-black text-amber-300 font-mono">1,280</div>
              </div>
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-[10px] text-slate-400">Tuần này</div>
                <div className="text-sm font-black text-sky-300 font-mono">9,840</div>
              </div>
              <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                <div className="text-[10px] text-slate-400">Tổng lượt truy cập</div>
                <div className="text-sm font-black text-white font-mono">358,920</div>
              </div>
            </div>
          </section>

          {/* 6. EXTERNAL EDUCATION LINKS DROPDOWN */}
          <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-2">
            <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
              <span>LIÊN KẾT NGÀNH GIÁO DỤC</span>
            </div>

            <select
              onChange={(e) => {
                if (e.target.value) window.open(e.target.value, '_blank');
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:outline-hidden"
            >
              <option value="">-- Chọn website liên kết --</option>
              <option value="https://daklak.edu.vn">Sở GD&ĐT Đắk Lắk (daklak.edu.vn)</option>
              <option value="https://moet.gov.vn">Bộ Giáo dục và Đào tạo</option>
              <option value="https://buonmathuot.daklak.gov.vn">UBND TP. Buôn Ma Thuột</option>
            </select>
          </section>
        </div>
      </div>

      {/* 3. OFFICIAL PORTAL FOOTER (Chân trang Cổng Thông Tin Điện Tử daklak.edu.vn style) */}
      <footer className="bg-emerald-950 text-slate-200 rounded-2xl p-6 sm:p-8 border-t-4 border-amber-400 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Col 1: Brand & Organization Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-3">
              <img
                src={tanLoiLogo}
                alt="Logo THCS Tân Lợi"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-contain ring-2 ring-amber-400 bg-white p-0.5"
              />
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-tight">
                  CỔNG THÔNG TIN ĐIỆN TỬ TRƯỜNG THCS TÂN LỢI
                </h3>
              </div>
            </div>

            <p className="text-xs text-emerald-100 leading-relaxed font-light">
              Hệ thống Cổng thông tin điện tử & Quản trị Giáo dục Số chính thức của Trường THCS Tân Lợi. Đảm bảo an toàn thông tin, minh bạch và chuyển đổi số chất lượng cao.
            </p>
          </div>

          {/* Col 2: Official Contact Info */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <div className="font-extrabold text-amber-300 uppercase tracking-wider mb-2 border-b border-emerald-900 pb-1">
              THÔNG TIN LIÊN HỆ BGH
            </div>
            <div className="flex items-start space-x-2 text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{schoolInfo.address}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Điện thoại: {schoolInfo.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Email: c2tanloi.bmt@daklak.edu.vn</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Người chịu trách nhiệm chính: Hiệu trưởng {schoolInfo.principal}</span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="md:col-span-3 space-y-2 text-xs">
            <div className="font-extrabold text-amber-300 uppercase tracking-wider mb-2 border-b border-emerald-900 pb-1">
              CHUYÊN MỤC CỔNG
            </div>
            <div className="grid grid-cols-1 gap-1.5 text-slate-300 font-medium">
              <span className="hover:text-amber-300 cursor-pointer" onClick={() => onNavigateTab('public-news')}>📰 Tin tức - Sự kiện</span>
              <span className="hover:text-amber-300 cursor-pointer" onClick={() => onNavigateTab('public-announcements')}>📢 Thông báo & Công văn</span>
              <span className="hover:text-amber-300 cursor-pointer" onClick={() => onNavigateTab('public-library')}>📁 Văn bản & Tài liệu số</span>
              <span className="hover:text-amber-300 cursor-pointer" onClick={() => onNavigateTab('public-admissions')}>🏛️ Tuyển sinh Lớp 6</span>
              <span className="hover:text-amber-300 cursor-pointer" onClick={onOpenAiHub}>🤖 Cổng AI Education Hub</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-emerald-900 text-center text-[11px] text-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-2 font-medium">
          <div>
            © 2026 Bản quyền thuộc về Cổng Thông tin Điện tử TRƯỜNG THCS TÂN LỢI - TP. BUÔN MA THUỘT.
          </div>
          <div className="text-slate-400">
            Ghi rõ nguồn "Cổng TTĐT THCS Tân Lợi (daklak.edu.vn)" khi phát hành lại thông tin.
          </div>
        </div>
      </footer>
    </div>
  );
};

