import React from 'react';

interface OfficialHeaderProps {
  className?: string;
  isPrintVersion?: boolean;
  extraMeta?: string;
}

export const OfficialHeader: React.FC<OfficialHeaderProps> = ({
  className = '',
  isPrintVersion = false,
  extraMeta,
}) => {
  return (
    <header
      className={`border-b-2 border-[#8A1538] pb-3 text-right bg-white transition-all ${className}`}
      dir="rtl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        {/* Official Institutional Texts only - No logos or graphic emblems */}
        <div className="space-y-1">
          <div className="text-base sm:text-lg font-black text-[#8A1538] leading-tight tracking-wide">
            وزارة التربية والتعليم والتعليم العالي – دولة قطر
          </div>
          <div className="text-sm sm:text-base font-extrabold text-slate-800 leading-tight">
            مدرسة الريان الخاصة
          </div>
          <div className="text-xs sm:text-sm font-bold text-emerald-800 inline-block bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 print:bg-transparent print:border-none print:p-0">
            تحت إشراف قسم العلوم
          </div>
        </div>

        {extraMeta && (
          <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-center print:border-none print:bg-transparent">
            {extraMeta}
          </div>
        )}
      </div>

      {/* Sub-bar / Document Metadata */}
      <div className="mt-2.5 pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-600 font-medium">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-extrabold text-[#8A1538]">مراجعة منتصف الفصل الدراسي الأول</span>
          <span className="text-slate-400">|</span>
          <span className="font-bold text-slate-800">العلوم – الصف السابع</span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600 font-semibold">العام الأكاديمي 2026-2027م</span>
        </div>
      </div>
    </header>
  );
};
