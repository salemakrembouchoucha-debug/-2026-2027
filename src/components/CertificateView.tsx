import React from 'react';
import { StudentProfile } from '../types/quiz';
import { Printer, ArrowRight, Award, CheckCircle } from 'lucide-react';

interface CertificateProps {
  student: StudentProfile;
  totalQuestions: number;
  mcqCorrect: number;
  mcqTotal: number;
  essayCompleted: number;
  essayTotal: number;
  onBack: () => void;
}

export const CertificateView: React.FC<CertificateProps> = ({
  student,
  totalQuestions,
  mcqCorrect,
  mcqTotal,
  essayCompleted,
  essayTotal,
  onBack,
}) => {
  const currentDate = new Date().toLocaleDateString('ar-QA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrintCertificate = () => {
    window.print();
  };

  const mcqPercentage = mcqTotal > 0 ? Math.round((mcqCorrect / mcqTotal) * 100) : 0;

  return (
    <div className="space-y-6" dir="rtl">
      {/* Top Toolbar (Hidden on print) */}
      <div className="no-print bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900">شهادة إتمام مراجعة العلوم</h2>
          <p className="text-xs text-slate-500 font-semibold">
            جاهزة للعرض والطباعة على ورق A4 باسم الطالب {student.name}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة إلى التقرير</span>
          </button>

          <button
            onClick={handlePrintCertificate}
            className="flex items-center gap-2 bg-[#8A1538] hover:bg-[#6c102c] text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة الشهادة / حفظ PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Certificate Frame */}
      <div className="bg-white p-8 sm:p-14 rounded-3xl border-8 border-double border-[#8A1538] shadow-sm max-w-4xl mx-auto print:border-8 print:border-double print:border-black print:p-8 print:shadow-none print-avoid-break">
        {/* Certificate Inner Border */}
        <div className="border border-slate-300 p-8 sm:p-12 rounded-2xl text-center space-y-6 print:border-slate-400">
          {/* Header Texts - Strictly text, NO graphic emblems */}
          <div className="space-y-1.5 border-b-2 border-slate-200 pb-5 print:border-black">
            <h1 className="text-lg sm:text-2xl font-black text-[#8A1538] print:text-black">
              وزارة التربية والتعليم والتعليم العالي – دولة قطر
            </h1>
            <h2 className="text-base sm:text-xl font-extrabold text-slate-800 print:text-black">
              مدرسة الريان الخاصة
            </h2>
            <p className="text-sm font-bold text-emerald-800 print:text-black">
              تحت إشراف قسم العلوم
            </p>
          </div>

          {/* Certificate Title */}
          <div className="py-2">
            <span className="inline-block bg-rose-50 text-[#8A1538] text-xs font-black px-4 py-1 rounded-full border border-rose-200 print:border-black print:bg-transparent print:text-black mb-2">
              برنامج التدريبات العلاجية والإثرائية
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-wide">
              شهادة إنجاز مراجعة العلوم
            </h3>
          </div>

          {/* Grantee Declaration */}
          <div className="space-y-3 py-2">
            <p className="text-base sm:text-lg text-slate-700 font-bold">
              تُمنح هذه الشهادة للطالب:
            </p>

            <div className="text-2xl sm:text-3xl font-black text-[#8A1538] border-b-2 border-dotted border-slate-400 inline-block px-8 py-1 print:text-black print:border-black">
              {student.name || 'طالب متميز'}
            </div>

            <div className="text-sm sm:text-base font-extrabold text-slate-700">
              الصف أو الشعبة: <span className="text-slate-900 underline font-black">{student.gradeSection || 'السابع'}</span>
            </div>

            <p className="text-base sm:text-lg text-slate-800 font-extrabold max-w-xl mx-auto leading-relaxed pt-2">
              وذلك لإتمام مراجعة العلوم للصف السابع (منتصف الفصل الدراسي الأول) وحل التدريبات المعتمدة في الطبيعة الجسيمية للمادة والخلايا.
            </p>
          </div>

          {/* Academic Achievement Breakdown */}
          <div className="max-w-md mx-auto grid grid-cols-2 gap-3 pt-3 text-xs sm:text-sm">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl print:border-black">
              <span className="text-slate-500 font-bold block text-[11px]">الأسئلة الموضوعية المصححة:</span>
              <strong className="text-emerald-700 font-black text-base print:text-black">
                {mcqCorrect} من {mcqTotal} ({mcqPercentage}%)
              </strong>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl print:border-black">
              <span className="text-slate-500 font-bold block text-[11px]">الأسئلة المقالية المكتملة:</span>
              <strong className="text-slate-800 font-black text-base print:text-black">
                {essayCompleted} من {essayTotal} سؤالاً
              </strong>
            </div>
          </div>

          {/* Notice & Date */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs sm:text-sm text-slate-600 font-bold gap-4 print:border-black">
            <div>
              تاريخ إتمام المراجعة: <strong>{currentDate}</strong>
            </div>

            <div className="text-left text-[11px] text-slate-500 font-medium">
              * شهادة إتمام للمراجعة المدرسية الذاتية وليست اعتماداً رسمياً
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
