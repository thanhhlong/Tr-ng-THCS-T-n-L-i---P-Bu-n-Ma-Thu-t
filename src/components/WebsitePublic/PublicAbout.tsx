import React from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import tanLoiLogo from '../../assets/images/tan_loi_logo_1786361503805.jpg';
import { Building, GraduationCap, Award, Users, CheckCircle, Heart, Target, Sparkles } from 'lucide-react';

export const PublicAbout: React.FC = () => {
  const { schoolInfo } = useSiteContent();

  return (
    <div className="space-y-10">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-8">
        <img
          src={tanLoiLogo}
          alt="Logo Trường THCS Tân Lợi"
          referrerPolicy="no-referrer"
          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-contain ring-4 ring-emerald-500/40 bg-white p-1 shadow-2xl shrink-0"
        />

        <div className="relative z-10 max-w-3xl space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 rounded-full text-xs font-semibold backdrop-blur-md">
            <GraduationCap className="w-4 h-4 text-emerald-300" />
            <span>THÀNH LẬP NĂM {schoolInfo.establishedYear} — TP. BUÔN MA THUỘT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            GIỚI THIỆU {schoolInfo.name.toUpperCase()}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100 font-light leading-relaxed">
            Hơn 27 năm (từ {schoolInfo.establishedYear}) xây dựng và phát triển, {schoolInfo.name} luôn tiên phong thực hiện phương châm phong trào <span className="font-bold underline text-white">"{schoolInfo.slogan}"</span>, ứng dụng công nghệ số và trí tuệ nhân tạo để kiến tạo môi trường học tập hiện đại, nhân văn.
          </p>
        </div>
      </div>

      {/* Principal Statement */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-center">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
            alt={schoolInfo.principal}
            className="w-40 h-40 rounded-full object-cover mx-auto ring-4 ring-emerald-500/30 shadow-lg"
          />
          <h3 className="text-base font-bold text-slate-900 mt-4">{schoolInfo.principal}</h3>
          <p className="text-xs text-emerald-700 font-bold">Hiệu trưởng Nhà trường</p>
        </div>

        <div className="md:col-span-2 space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            THÔNG ĐIỆP TỪ HIỆU TRƯỜNG
          </div>
          <p className="text-base font-semibold text-slate-900 italic">
            "Mỗi em học sinh tại {schoolInfo.name} là một mầm xanh tài năng độc bản. Chúng tôi cam kết duy trì truyền thống {schoolInfo.slogan} và kiến tạo một không gian giáo dục an toàn, hiện đại."
          </p>
          <p>
            Nhà trường chú trọng phát triển hài hòa giữa Kiến thức nền tảng – Kỹ năng thế kỷ 21 – Năng lực tự chủ. Sự đồng hành khăng khít giữa Nhà trường, Giáo viên, Phụ huynh và Công nghệ AI chính là chìa khóa mở ra tương lai rạng rỡ cho các em.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">SỨ MỆNH</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Đào tạo thế hệ học sinh THCS có tư duy sáng tạo, lòng yêu thương, thể chất lành mạnh và năng lực tự học suốt đời.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">TẦM NHÌN</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Trở thành mô hình Trường học Số & Hệ sinh thái AI Giáo Dục kiểu mẫu hàng đầu thành phố Buôn Ma Thuột.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">GIÁ TRỊ CỐT LÕI</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Dạy Tốt — Học Tốt • Kỷ Khương — Tình Thương — Trách Nhiệm. Tôn trọng sự khác biệt và khơi dậy tiềm năng mỗi cá nhân.
          </p>
        </div>
      </div>
    </div>
  );
};
