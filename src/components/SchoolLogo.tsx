import React from 'react';
import tanLoiLogo from '..src/assets/images/logo1024.jpg';

interface SchoolLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={tanLoiLogo}
        alt="Logo Trường THCS Tân Lợi"
        referrerPolicy="no-referrer"
        className={`${sizeClasses[size]} rounded-full object-contain ring-2 ring-emerald-600/20 shadow-xs shrink-0`}
      />
      {showText && (
        <div className="leading-tight">
          <h1 className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-emerald-950">
            Trường THCS Tân Lợi
          </h1>
          <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest">
            Dạy Tốt — Học Tốt • BMT 1999
          </p>
        </div>
      )}
    </div>
  );
};

export { tanLoiLogo };
