import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { Library, Search, Download, FileText, Filter, BookOpen } from 'lucide-react';

export const PublicDocs: React.FC = () => {
  const { documents } = useSiteContent();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const categories = [
    'Tất cả',
    'Giáo án',
    'Đề kiểm tra',
    'Văn bản - Thông tư',
    'Tài liệu môn học',
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = selectedCategory === 'Tất cả' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.subjectName && doc.subjectName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 sm:p-8 rounded-3xl shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
          <Library className="w-8 h-8 text-sky-400" />
          <span>THƯ VIỆN SỐ & TÀI LIỆU DẠY HỌC</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2">
          Kho học liệu, giáo án chuẩn CV 5512, đề thi khảo sát và văn bản công khai nhà trường
        </p>

        {/* Search Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm tên bài học, giáo án, môn học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 rounded-xl text-xs font-medium focus:outline-hidden ring-1 ring-slate-300"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Document List Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500 font-bold">
          <span>DANH SÁCH TÀI LIỆU ({filteredDocs.length})</span>
          <span>HỖ TRỢ ĐỊNH DẠNG: PDF, WORD, EXCEL, PPT</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-4 sm:p-5 hover:bg-blue-50/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
                  .{doc.fileType}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {doc.category}
                    </span>
                    {doc.grade && (
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        Khối {doc.grade}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{doc.title}</h3>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Đăng bởi: {doc.uploadedBy} • Ngày: {doc.uploadedDate} • Dung lượng: {doc.fileSize}
                  </div>
                </div>
              </div>

              <button
                onClick={() => alert(`Đang tải file: ${doc.title}`)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center space-x-1.5 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải Về ({doc.downloadCount})</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
