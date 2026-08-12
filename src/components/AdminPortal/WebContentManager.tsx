import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { NewsArticle, Announcement, DocumentItem, Achievement } from '../../types';
import {
  Globe,
  FileText,
  Bell,
  FolderDown,
  Award,
  Plus,
  Edit,
  Trash2,
  Save,
  CheckCircle,
  Search,
  Sparkles,
  Image as ImageIcon,
  Calendar,
  X,
  Star,
  Building,
} from 'lucide-react';

export const WebContentManager: React.FC = () => {
  const {
    schoolInfo,
    updateSchoolInfo,
    newsArticles,
    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    documents,
    addDocument,
    updateDocument,
    deleteDocument,
    achievements,
    addAchievement,
    updateAchievement,
    deleteAchievement,
  } = useSiteContent();

  const [activeSubTab, setActiveSubTab] = useState<
    'info' | 'news' | 'announcements' | 'docs' | 'achievements'
  >('info');

  // Success Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ---------------- SCHOOL INFO FORM STATE ----------------
  const [infoForm, setInfoForm] = useState({ ...schoolInfo });

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolInfo(infoForm);
    showToast('Cập nhật thông tin tổng quan & Slogan trường thành công!');
  };

  // ---------------- NEWS ARTICLES MODAL STATE ----------------
  const [newsSearch, setNewsSearch] = useState('');
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    category: 'Tin tức' as NewsArticle['category'],
    summary: '',
    content: '',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    author: 'Ban Giám Hiệu',
    publishedDate: new Date().toISOString().split('T')[0],
    isFeatured: false,
  });

  const handleOpenArticleModal = (art?: NewsArticle) => {
    if (art) {
      setEditingArticleId(art.id);
      setArticleForm({
        title: art.title,
        category: art.category,
        summary: art.summary,
        content: art.content,
        imageUrl: art.imageUrl || '',
        author: art.author,
        publishedDate: art.publishedDate,
        isFeatured: art.isFeatured || false,
      });
    } else {
      setEditingArticleId(null);
      setArticleForm({
        title: '',
        category: 'Tin tức',
        summary: '',
        content: '',
        imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
        author: 'Ban Giám Hiệu',
        publishedDate: new Date().toISOString().split('T')[0],
        isFeatured: false,
      });
    }
    setIsArticleModalOpen(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title.trim() || !articleForm.content.trim()) return;

    if (editingArticleId) {
      updateNewsArticle(editingArticleId, articleForm);
      showToast('Đã cập nhật bài viết tin tức thành công!');
    } else {
      addNewsArticle(articleForm);
      showToast('Đã đăng bài viết tin tức mới lên website!');
    }
    setIsArticleModalOpen(false);
  };

  // ---------------- ANNOUNCEMENT MODAL STATE ----------------
  const [isAnnModalOpen, setIsAnnModalOpen] = useState(false);
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);
  const [annForm, setAnnForm] = useState({
    title: '',
    type: 'Thông báo chung',
    date: new Date().toISOString().split('T')[0],
    targetRole: 'all' as Announcement['targetRole'],
    content: '',
  });

  const handleOpenAnnModal = (ann?: Announcement) => {
    if (ann) {
      setEditingAnnId(ann.id);
      setAnnForm({
        title: ann.title,
        type: ann.type,
        date: ann.date,
        targetRole: ann.targetRole,
        content: ann.content,
      });
    } else {
      setEditingAnnId(null);
      setAnnForm({
        title: '',
        type: 'Thông báo chung',
        date: new Date().toISOString().split('T')[0],
        targetRole: 'all',
        content: '',
      });
    }
    setIsAnnModalOpen(true);
  };

  const handleSaveAnn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annForm.title.trim() || !annForm.content.trim()) return;

    if (editingAnnId) {
      updateAnnouncement(editingAnnId, annForm);
      showToast('Đã cập nhật thông báo thành công!');
    } else {
      addAnnouncement(annForm);
      showToast('Đã phát hành thông báo mới!');
    }
    setIsAnnModalOpen(false);
  };

  // ---------------- DOCUMENT MODAL STATE ----------------
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [editingDocId, setEditingDocId] = useState<string | null>(null);
  const [docForm, setDocForm] = useState({
    title: '',
    category: 'Văn bản - Thông tư',
    subjectName: 'Toán học',
    grade: 9,
    fileType: 'pdf' as 'pdf' | 'docx' | 'pptx' | 'xlsx',
    fileSize: '2.5 MB',
    uploadedBy: 'Ban Giám Hiệu',
    uploadedDate: new Date().toISOString().split('T')[0],
  });

  const handleOpenDocModal = (doc?: DocumentItem) => {
    if (doc) {
      setEditingDocId(doc.id);
      setDocForm({
        title: doc.title,
        category: doc.category,
        subjectName: doc.subjectName || 'Khác',
        grade: doc.grade || 9,
        fileType: doc.fileType,
        fileSize: doc.fileSize,
        uploadedBy: doc.uploadedBy,
        uploadedDate: doc.uploadedDate,
      });
    } else {
      setEditingDocId(null);
      setDocForm({
        title: '',
        category: 'Văn bản - Thông tư',
        subjectName: 'Toán học',
        grade: 9,
        fileType: 'pdf',
        fileSize: '2.5 MB',
        uploadedBy: 'Ban Giám Hiệu',
        uploadedDate: new Date().toISOString().split('T')[0],
      });
    }
    setIsDocModalOpen(true);
  };

  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docForm.title.trim()) return;

    if (editingDocId) {
      updateDocument(editingDocId, docForm);
      showToast('Đã cập nhật tài liệu thành công!');
    } else {
      addDocument(docForm);
      showToast('Đã tải lên tài liệu mới vào thư viện!');
    }
    setIsDocModalOpen(false);
  };

  // ---------------- ACHIEVEMENT MODAL STATE ----------------
  const [isAchModalOpen, setIsAchModalOpen] = useState(false);
  const [editingAchId, setEditingAchId] = useState<string | null>(null);
  const [achForm, setAchForm] = useState({
    title: '',
    category: 'Nhà trường' as Achievement['category'],
    year: '2025 - 2026',
    description: '',
    award: '',
    recipient: '',
    imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
  });

  const handleOpenAchModal = (ach?: Achievement) => {
    if (ach) {
      setEditingAchId(ach.id);
      setAchForm({
        title: ach.title,
        category: ach.category,
        year: ach.year,
        description: ach.description,
        award: ach.award,
        recipient: ach.recipient,
        imageUrl: ach.imageUrl || '',
      });
    } else {
      setEditingAchId(null);
      setAchForm({
        title: '',
        category: 'Nhà trường',
        year: '2025 - 2026',
        description: '',
        award: '',
        recipient: '',
        imageUrl: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=800',
      });
    }
    setIsAchModalOpen(true);
  };

  const handleSaveAch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!achForm.title.trim()) return;

    if (editingAchId) {
      updateAchievement(editingAchId, achForm);
      showToast('Đã cập nhật thành tích bảng vàng!');
    } else {
      addAchievement(achForm);
      showToast('Đã thêm thành tích vinh danh mới!');
    }
    setIsAchModalOpen(false);
  };

  const filteredArticles = newsArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
      a.category.toLowerCase().includes(newsSearch.toLowerCase()) ||
      a.summary.toLowerCase().includes(newsSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 rounded-full text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5 text-emerald-300" />
            <span>QUẢN TRỊ NỘI DUNG NÂNG CAO (WEBSITE CMS)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Chỉnh Sửa Toàn Bộ Nội Dung Website
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            Quản lý Slogan, bài viết tin tức, thông báo khẩn, thư viện tài liệu và vinh danh thành tích trường
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 text-xs font-bold text-white">
          <Sparkles className="w-4 h-4 text-emerald-300" />
          <span>Thời gian thực • Cập nhật ngay</span>
        </div>
      </div>

      {/* Sub-Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('info')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'info'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
          id="cms-tab-info"
        >
          <Building className="w-4 h-4" />
          <span>1. Thông Tin & Slogan Trường</span>
        </button>

        <button
          onClick={() => setActiveSubTab('news')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'news'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
          id="cms-tab-news"
        >
          <FileText className="w-4 h-4" />
          <span>2. Tin Tức & Bài Viết ({newsArticles.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('announcements')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'announcements'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
          id="cms-tab-announcements"
        >
          <Bell className="w-4 h-4" />
          <span>3. Thông Báo Khẩn ({announcements.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('docs')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'docs'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
          id="cms-tab-docs"
        >
          <FolderDown className="w-4 h-4" />
          <span>4. Thư Viện Tài Liệu ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('achievements')}
          className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeSubTab === 'achievements'
              ? 'bg-emerald-700 text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
          id="cms-tab-achievements"
        >
          <Award className="w-4 h-4" />
          <span>5. Bảng Vàng Thành Tích ({achievements.length})</span>
        </button>
      </div>

      {/* ---------------- SUB-TAB 1: SCHOOL INFO ---------------- */}
      {activeSubTab === 'info' && (
        <form onSubmit={handleSaveInfo} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Thông Tin Tổng Quan & Khẩu Hiệu Trường</h3>
              <p className="text-xs text-slate-500">Các thay đổi sẽ được áp dụng ngay lập tức lên Header, Footer & Trang chủ</p>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              id="save-school-info-btn"
            >
              <Save className="w-4 h-4" />
              <span>Lưu Cập Nhật</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Tên Trường</label>
              <input
                type="text"
                value={infoForm.name}
                onChange={(e) => setInfoForm({ ...infoForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Khẩu Hiệu / Slogan</label>
              <input
                type="text"
                value={infoForm.slogan}
                onChange={(e) => setInfoForm({ ...infoForm, slogan: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Hiệu Trưởng Nhà Trường</label>
              <input
                type="text"
                value={infoForm.principal}
                onChange={(e) => setInfoForm({ ...infoForm, principal: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Năm Thành Lập</label>
              <input
                type="number"
                value={infoForm.establishedYear}
                onChange={(e) => setInfoForm({ ...infoForm, establishedYear: Number(e.target.value) })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Địa Chỉ Trường</label>
              <input
                type="text"
                value={infoForm.address}
                onChange={(e) => setInfoForm({ ...infoForm, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Số Điện Thoại Liên Hệ</label>
              <input
                type="text"
                value={infoForm.phone}
                onChange={(e) => setInfoForm({ ...infoForm, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-semibold text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Email Chính Thức</label>
              <input
                type="email"
                value={infoForm.email}
                onChange={(e) => setInfoForm({ ...infoForm, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-semibold text-slate-900"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-3">Chỉ Số Thống Kê Hiển Thị</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Tổng Học Sinh</label>
                <input
                  type="number"
                  value={infoForm.totalStudents}
                  onChange={(e) => setInfoForm({ ...infoForm, totalStudents: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Tổng Giáo Viên</label>
                <input
                  type="number"
                  value={infoForm.totalTeachers}
                  onChange={(e) => setInfoForm({ ...infoForm, totalTeachers: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Tổng Số Lớp</label>
                <input
                  type="number"
                  value={infoForm.totalClasses}
                  onChange={(e) => setInfoForm({ ...infoForm, totalClasses: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-600">Tổng Phụ Huynh</label>
                <input
                  type="number"
                  value={infoForm.totalParents}
                  onChange={(e) => setInfoForm({ ...infoForm, totalParents: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ---------------- SUB-TAB 2: NEWS & ARTICLES ---------------- */}
      {activeSubTab === 'news' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={newsSearch}
                onChange={(e) => setNewsSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
              />
            </div>

            <button
              onClick={() => handleOpenArticleModal()}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              id="add-news-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng Bài Viết Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map((art) => (
              <div key={art.id} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex gap-4 relative overflow-hidden">
                {art.imageUrl && (
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-24 h-24 rounded-xl object-cover shrink-0 border border-slate-100"
                  />
                )}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                      {art.category}
                    </span>
                    {art.isFeatured && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200 flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
                        <span>Nổi bật</span>
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 line-clamp-2">{art.title}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">{art.summary}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                    <span>{art.publishedDate} • {art.author}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenArticleModal(art)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-md"
                        title="Sửa"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
                            deleteNewsArticle(art.id);
                            showToast('Đã xóa bài viết!');
                          }
                        }}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded-md"
                        title="Xóa"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 3: ANNOUNCEMENTS ---------------- */}
      {activeSubTab === 'announcements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">Danh sách Thông Báo & Lịch Khẩn</span>
            <button
              onClick={() => handleOpenAnnModal()}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              id="add-ann-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Phát Hành Thông Báo</span>
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div key={ann.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold text-[10px] border border-rose-200">
                      {ann.type}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{ann.date}</span>
                    <span className="text-[10px] text-slate-500 font-bold">Dành cho: {ann.targetRole}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{ann.title}</h4>
                  <p className="text-xs text-slate-600">{ann.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenAnnModal(ann)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Bạn có chắc muốn xóa thông báo này?')) {
                        deleteAnnouncement(ann.id);
                        showToast('Đã xóa thông báo!');
                      }
                    }}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 4: DOCUMENTS ---------------- */}
      {activeSubTab === 'docs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">Thư Viện Tài Liệu Giáo Án & Văn Bản</span>
            <button
              onClick={() => handleOpenDocModal()}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              id="add-doc-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Tài Liệu Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="uppercase text-[10px] font-black px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-200">
                      {doc.fileType} • {doc.fileSize}
                    </span>
                    <span className="text-[10px] text-slate-500 font-semibold">{doc.category}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{doc.title}</h4>
                  <p className="text-[11px] text-slate-400">Đăng bởi: {doc.uploadedBy} ({doc.uploadedDate})</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenDocModal(doc)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg border border-slate-200"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Bạn có muốn xóa tài liệu này?')) {
                        deleteDocument(doc.id);
                        showToast('Đã xóa tài liệu!');
                      }
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg border border-slate-200"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- SUB-TAB 5: ACHIEVEMENTS ---------------- */}
      {activeSubTab === 'achievements' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700">Bảng Vàng Thành Tích Vinh Danh</span>
            <button
              onClick={() => handleOpenAchModal()}
              className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              id="add-ach-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Vinh Danh Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((ach) => (
              <div key={ach.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex gap-4">
                {ach.imageUrl && (
                  <img src={ach.imageUrl} alt={ach.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                )}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                      {ach.award}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{ach.year}</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900">{ach.title}</h4>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{ach.description}</p>
                  <p className="text-[10px] font-bold text-emerald-800">Cá nhân/Tập thể: {ach.recipient}</p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button onClick={() => handleOpenAchModal(ach)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Bạn có muốn xóa thành tích này?')) {
                        deleteAchievement(ach.id);
                        showToast('Đã xóa thành tích!');
                      }
                    }}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---------------- MODAL: EDIT/ADD ARTICLE ---------------- */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingArticleId ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Tin Tức Mới'}
              </h3>
              <button onClick={() => setIsArticleModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tiêu đề bài viết</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Chuyên mục</label>
                  <select
                    value={articleForm.category}
                    onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  >
                    <option value="Tin tức">Tin tức</option>
                    <option value="Thành tích">Thành tích</option>
                    <option value="STEM">STEM & Sáng tạo</option>
                    <option value="Tuyển sinh">Tuyển sinh</option>
                    <option value="Hoạt động phong trào">Hoạt động phong trào</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Tác giả / Nguồn</label>
                  <input
                    type="text"
                    value={articleForm.author}
                    onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">URL Ảnh Đại Diện Bài Viết</label>
                <input
                  type="text"
                  value={articleForm.imageUrl}
                  onChange={(e) => setArticleForm({ ...articleForm, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tóm tắt vắn tắt (Summary)</label>
                <textarea
                  rows={2}
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nội dung chi tiết (Content)</label>
                <textarea
                  rows={5}
                  required
                  value={articleForm.content}
                  onChange={(e) => setArticleForm({ ...articleForm, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={articleForm.isFeatured}
                  onChange={(e) => setArticleForm({ ...articleForm, isFeatured: e.target.checked })}
                  className="rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="isFeatured" className="text-xs font-bold text-slate-700">Ghim làm Bài Viết Nổi Bật Trang Chủ</label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md"
                >
                  Lưu Bài Viết
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: ANNOUNCEMENT ---------------- */}
      {isAnnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingAnnId ? 'Sửa Thông Báo' : 'Phát Hành Thông Báo Mới'}
              </h3>
              <button onClick={() => setIsAnnModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAnn} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tiêu đề thông báo</label>
                <input
                  type="text"
                  required
                  value={annForm.title}
                  onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Loại thông báo</label>
                  <input
                    type="text"
                    value={annForm.type}
                    onChange={(e) => setAnnForm({ ...annForm, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Đối tượng nhận</label>
                  <select
                    value={annForm.targetRole}
                    onChange={(e) => setAnnForm({ ...annForm, targetRole: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  >
                    <option value="all">Tất cả (Toàn trường)</option>
                    <option value="teachers">Giáo viên</option>
                    <option value="students">Học sinh</option>
                    <option value="parents">Phụ huynh</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Nội dung thông báo</label>
                <textarea
                  rows={4}
                  required
                  value={annForm.content}
                  onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAnnModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md"
                >
                  Phát Hành
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: DOCUMENT ---------------- */}
      {isDocModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingDocId ? 'Sửa Tài Liệu' : 'Thêm Tài Liệu Thư Viện'}
              </h3>
              <button onClick={() => setIsDocModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDoc} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tên tài liệu / Văn bản</label>
                <input
                  type="text"
                  required
                  value={docForm.title}
                  onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Chuyên mục</label>
                  <input
                    type="text"
                    value={docForm.category}
                    onChange={(e) => setDocForm({ ...docForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Định dạng file</label>
                  <select
                    value={docForm.fileType}
                    onChange={(e) => setDocForm({ ...docForm, fileType: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="docx">Word Document (.docx)</option>
                    <option value="pptx">PowerPoint (.pptx)</option>
                    <option value="xlsx">Excel (.xlsx)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDocModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md"
                >
                  Lưu Tài Liệu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- MODAL: ACHIEVEMENT ---------------- */}
      {isAchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900">
                {editingAchId ? 'Sửa Vinh Danh' : 'Thêm Thành Tích Vinh Danh'}
              </h3>
              <button onClick={() => setIsAchModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAch} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Tên thành tích</label>
                <input
                  type="text"
                  required
                  value={achForm.title}
                  onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Danh hiệu / Giải thưởng</label>
                  <input
                    type="text"
                    value={achForm.award}
                    onChange={(e) => setAchForm({ ...achForm, award: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Người/Tập thể nhận</label>
                  <input
                    type="text"
                    value={achForm.recipient}
                    onChange={(e) => setAchForm({ ...achForm, recipient: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Mô tả chi tiết</label>
                <textarea
                  rows={3}
                  value={achForm.description}
                  onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAchModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md"
                >
                  Lưu Vinh Danh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
