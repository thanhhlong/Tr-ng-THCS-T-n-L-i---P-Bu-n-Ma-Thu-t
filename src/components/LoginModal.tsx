import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext';
import tanLoiLogo from '../assets/images/LOGO1024.jpg';
import { ShieldCheck, Lock, User, Eye, EyeOff, KeyRound, Check, X, AlertCircle } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useSiteContent();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!usernameInput.trim()) {
      setErrorMessage('Vui lòng nhập Mã định danh hoặc Tên đăng nhập!');
      return;
    }
    if (!passwordInput.trim()) {
      setErrorMessage('Vui lòng nhập mật khẩu xác thực!');
      return;
    }

    const res = login(usernameInput, passwordInput);
    if (!res.success) {
      setErrorMessage(res.message || 'Đăng nhập không thành công');
    } else {
      setSuccessMessage(res.message || 'Đăng nhập thành công!');
      setTimeout(() => {
        closeLoginModal();
      }, 500);
    }
  };

  const handleQuickLogin = (roleUsername: string) => {
    setUsernameInput(roleUsername);
    setPasswordInput('123456');
    setErrorMessage('');
    const res = login(roleUsername, '123456');
    if (res.success) {
      setSuccessMessage(res.message || 'Đăng nhập thành công!');
      setTimeout(() => {
        closeLoginModal();
      }, 400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10"
          id="close-login-modal"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 text-center relative overflow-hidden">
          <div className="flex justify-center mb-3">
            <img
              src={tanLoiLogo}
              alt="Logo THCS Tân Lợi"
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-contain ring-4 ring-emerald-500/40 shadow-lg bg-white p-0.5"
            />
          </div>
          <h2 className="text-xl font-extrabold uppercase tracking-wide">
            Đăng Nhập Cổng Giáo Dục Số
          </h2>
          <p className="text-xs text-emerald-200 font-medium mt-1">
            Trường THCS Tân Lợi — Bảo Mật Xác Thực 2 Lớp
          </p>

          <div className="inline-flex items-center gap-1 mt-3 px-3 py-0.5 rounded-full bg-emerald-500/20 text-[10px] font-bold text-emerald-300 border border-emerald-400/30">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>Mã hóa bảo mật SSL-256</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username / Code input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Mã Định Danh / Tên Đăng Nhập
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Ví dụ: admin, gvcn, hs901, ph901"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-hidden transition-all"
                  id="login-username-input"
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Mật Khẩu Xác Thực
                </label>
                <span className="text-[10px] text-slate-400 font-semibold">Gợi ý: 123456</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Mật khẩu bảo mật..."
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-xs font-medium text-slate-900 placeholder:text-slate-400 outline-hidden transition-all"
                  id="login-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              id="login-submit-btn"
            >
              <KeyRound className="w-4 h-4" />
              <span>Đăng Nhập Ngay</span>
            </button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div className="pt-3 border-t border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5 text-center">
              ⚡ Đăng nhập nhanh theo vai trò (Demo)
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickLogin('admin')}
                className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-left transition-colors flex items-center gap-2"
                id="quick-login-admin"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  👑
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate">Admin / BGH</div>
                  <div className="text-[10px] text-purple-600 font-mono truncate">admin / 123456</div>
                </div>
              </button>

              <button
                onClick={() => handleQuickLogin('gvcn')}
                className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-left transition-colors flex items-center gap-2"
                id="quick-login-teacher"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  👩‍🏫
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate">Giáo Viên</div>
                  <div className="text-[10px] text-blue-600 font-mono truncate">gvcn / 123456</div>
                </div>
              </button>

              <button
                onClick={() => handleQuickLogin('hocsinh')}
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-left transition-colors flex items-center gap-2"
                id="quick-login-student"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  🎓
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate">Học Sinh 9A1</div>
                  <div className="text-[10px] text-emerald-600 font-mono truncate">hocsinh / 123456</div>
                </div>
              </button>

              <button
                onClick={() => handleQuickLogin('phuhuynh')}
                className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-left transition-colors flex items-center gap-2"
                id="quick-login-parent"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                  👨‍👩‍👧
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate">Phụ Huynh</div>
                  <div className="text-[10px] text-amber-600 font-mono truncate">phuhuynh / 123456</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
