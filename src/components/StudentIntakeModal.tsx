import React, { useState } from 'react';
import { StudentProfile } from '../types/quiz';
import { UserCheck, BookOpen, Sparkles, ArrowLeft } from 'lucide-react';

interface StudentIntakeModalProps {
  initialProfile: StudentProfile;
  isOpen: boolean;
  onStartReview: (profile: StudentProfile) => void;
  onClose?: () => void;
}

export const StudentIntakeModal: React.FC<StudentIntakeModalProps> = ({
  initialProfile,
  isOpen,
  onStartReview,
  onClose,
}) => {
  const [name, setName] = useState<string>(initialProfile.name || '');
  const [gradeSection, setGradeSection] = useState<string>(initialProfile.gradeSection || 'السابع / 1');
  const [error, setError] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('يرجى إدخال اسم الطالب للمتابعة');
      return;
    }

    onStartReview({
      name: name.trim(),
      gradeSection: gradeSection.trim() || 'السابع',
      hasStarted: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4" dir="rtl">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 animate-scaleIn">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 bg-rose-50 border-2 border-rose-200 text-[#8A1538] rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
            <BookOpen className="w-7 h-7" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900">
            مراجعة العلوم – الصف السابع
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-bold">
            مدرسة الريان الخاصة – تحت إشراف قسم العلوم
          </p>
          <p className="text-xs text-slate-500">
            يرجى تسجيل بيانات الطالب قبل بدء حل الأسئلة لتضمينها في شهادة الإنجاز والتقرير.
          </p>
        </div>

        {/* Intake Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-extrabold text-slate-800 block">
              اسم الطالب <span className="text-rose-600">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              placeholder="اكتب اسمك الثلاثي هنا..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] transition-all"
            />
            {error && <p className="text-xs text-rose-600 font-bold">{error}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs sm:text-sm font-extrabold text-slate-800 block">
              الصف أو الشعبة
            </label>
            <select
              value={gradeSection}
              onChange={(e) => setGradeSection(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8A1538] transition-all"
            >
              <option value="السابع / 1">السابع / 1</option>
              <option value="السابع / 2">السابع / 2</option>
              <option value="السابع / 3">السابع / 3</option>
              <option value="السابع / 4">السابع / 4</option>
              <option value="السابع / 5">السابع / 5</option>
            </select>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-[#8A1538] hover:bg-[#6c102c] text-white font-black text-sm py-3 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>ابدأ المراجعة</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="text-[11px] text-slate-400 text-center font-medium">
          * بياناتك تحفظ محلياً على جهازك ولا تُرسل لأي جهة خارجية.
        </div>
      </div>
    </div>
  );
};
