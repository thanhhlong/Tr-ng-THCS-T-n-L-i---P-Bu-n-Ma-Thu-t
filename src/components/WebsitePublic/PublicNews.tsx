import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { NewsArticle } from '../../types';
import {
  Newspaper,
  Search,
  Tag,
  Calendar,
  User,
  Image as ImageIcon,
  Video,
  FileText,
  ChevronLeft,
  Share2,
} from 'lucide-react';

interface PublicNewsProps {
  selectedArticle: NewsArticle | null;
  onClearSelectedArticle: () => void;
  onSelectArticle: (article: NewsArticle) => void;
}

export const PublicNews: React.FC<PublicNewsProps> = ({
  selectedArticle,
  onClearSelectedArticle,
  onSelectArticle,
}) => {
  const { newsArticles } = useSiteContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const categories = ['Tất cả', 'Thành tích', 'STEM', 'Tuyển sinh', 'Hoạt động', 'Sự kiện'];

  const filteredArticles = newsArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'Tất cả' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs">
        <button
          onClick={onClearSelectedArticle}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          id="back-to-news-btn"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Quay lại danh sách tin tức</span>
        </button>

        <div className="space-y-4">
          <div className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {selectedArticle.category}
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
            {selectedArticle.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 border-y border-slate-100 py-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-slate-400" />
              {selectedArticle.publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-4 h-4 text-slate-400" />
              {selectedArticle.author}
            </span>
            <span className="ml-auto flex items-center gap-1 text-blue-600 cursor-pointer font-semibold">
              <Share2 className="w-4 h-4" />
              Chia sẻ
            </span>
          </div>

          {selectedArticle.imageUrl && (
            <div className="rounded-2xl overflow-hidden my-4 border border-slate-200">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-80 object-cover"
              />
            </div>
          )}

          <div className="text-sm text-slate-700 leading-relaxed space-y-4 font-normal">
            <p className="font-bold text-slate-900 text-base leading-snug bg-slate-50 p-4 rounded-xl border-l-4 border-blue-600">
              {selectedArticle.summary}
            </p>
            <p>{selectedArticle.content}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
          <Newspaper className="w-8 h-8 text-blue-300" />
          <span>TIN TỨC & SỰ KIỆN NHÀ TRƯỜNG</span>
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 mt-2">
          Cập nhật nhanh nhất tin tức giảng dạy, thành tích học sinh và phong trào giáo dục THCS
        </p>

        {/* Search & Category Filter */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bài viết theo từ khóa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-white text-blue-950 shadow-md'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => onSelectArticle(art)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={
                    art.imageUrl ||
                    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600'
                  }
                  alt={art.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {art.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="text-[11px] text-slate-400">
                  {art.publishedDate} • Tác giả: {art.author}
                </div>
                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 mt-3 text-xs text-blue-600 font-bold">
              Đọc tiếp →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
