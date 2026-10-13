import React, { useEffect, useState } from 'react';
import { ALL_QUESTIONS } from '../data/scienceCurriculumData';
import { UserAnswerRecord, QuestionItem, StudentProfile } from '../types/quiz';
import {
  Trophy,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Printer,
  Award,
  Atom,
  Microscope,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StudentReportProps {
  answers: Record<string, UserAnswerRecord>;
  student: StudentProfile;
  onNavigateToQuestion: (questionIndex: number) => void;
  onResetAll: () => void;
  onGoToPrint: () => void;
  onViewCertificate: () => void;
}

export const StudentReportView: React.FC<StudentReportProps> = ({
  answers,
  student,
  onNavigateToQuestion,
  onResetAll,
  onGoToPrint,
  onViewCertificate,
}) => {
  const [filterWrongByAxis, setFilterWrongByAxis] = useState<'all' | '1' | '2'>('all');

  const mcqQuestions = ALL_QUESTIONS.filter((q) => q.section === 'mcq');
  const essayQuestions = ALL_QUESTIONS.filter((q) => q.section === 'essay');

  const totalQuestions = ALL_QUESTIONS.length;
  const totalMCQs = mcqQuestions.length;

  let answeredMCQs = 0;
  let correctMCQs = 0;
  let incorrectMCQs = 0;

  // Breakdown per axis
  let axis1MCQTotal = 0;
  let axis1MCQAnswered = 0;
  let axis1MCQCorrect = 0;

  let axis2MCQTotal = 0;
  let axis2MCQAnswered = 0;
  let axis2MCQCorrect = 0;

  const wrongMCQs: { question: QuestionItem; index: number; selected: string; correct: string }[] = [];

  mcqQuestions.forEach((q) => {
    const fullIndex = ALL_QUESTIONS.findIndex((item) => item.id === q.id);
    const ans = answers[q.id];

    if (q.unitId === 1) axis1MCQTotal++;
    else axis2MCQTotal++;

    if (ans && ans.selectedOption) {
      answeredMCQs++;
      if (q.unitId === 1) axis1MCQAnswered++;
      else axis2MCQAnswered++;

      if (ans.selectedOption === q.correctOption) {
        correctMCQs++;
        if (q.unitId === 1) axis1MCQCorrect++;
        else axis2MCQCorrect++;
      } else {
        incorrectMCQs++;
        wrongMCQs.push({
          question: q,
          index: fullIndex,
          selected: ans.selectedOption,
          correct: q.correctOption || '',
        });
      }
    }
  });

  const unattemptedMCQs = totalMCQs - answeredMCQs;
  const mcqAccuracy = answeredMCQs > 0 ? Math.round((correctMCQs / answeredMCQs) * 100) : 0;

  const axis1Accuracy = axis1MCQAnswered > 0 ? Math.round((axis1MCQCorrect / axis1MCQAnswered) * 100) : 0;
  const axis2Accuracy = axis2MCQAnswered > 0 ? Math.round((axis2MCQCorrect / axis2MCQAnswered) * 100) : 0;

  // Self-evaluated essay counts
  const selfEvaluatedCorrect = essayQuestions.filter((q) => answers[q.id]?.isSelfEvaluatedCorrect === true).length;
  const selfEvaluatedNeedsReview = essayQuestions.filter((q) => answers[q.id]?.isSelfEvaluatedCorrect === false).length;
  const essayAnsweredCount = essayQuestions.filter((q) => {
    const a = answers[q.id];
    return a && a.essayAnswers && Object.keys(a.essayAnswers).length > 0;
  }).length;

  useEffect(() => {
    if (correctMCQs > 15) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [correctMCQs]);

  // Filtered wrong questions
  const displayedWrongMCQs = wrongMCQs.filter((item) => {
    if (filterWrongByAxis === 'all') return true;
    return item.question.unitId.toString() === filterWrongByAxis;
  });

  return (
    <div className="space-y-6" dir="rtl">
      {/* Hero Banner with Student Name */}
      <div className="bg-gradient-to-r from-[#8A1538] to-[#5b0e25] text-white p-6 sm:p-8 rounded-3xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-2 text-center sm:text-right">
            <span className="bg-white/20 text-white text-xs px-3.5 py-1 rounded-full font-bold inline-block">
              تقرير أداء الطالب: {student.name || 'طالب متميز'} ({student.gradeSection || 'السابع'})
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              {correctMCQs >= 30 ? 'ما شاء الله! إنجاز متميز ومبهر 🌟' : 'أحسنت صنعاً! واصل التدريب والمراجعة 💪'}
            </h2>
            <p className="text-rose-100 text-xs sm:text-sm">
              مبني حصرياً على الإجابات النموذجية الواردة في ملفات مدرسة الريان الخاصة – قسم العلوم.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20 text-center shrink-0">
            <div className="text-3xl sm:text-4xl font-black">{mcqAccuracy}%</div>
            <div className="text-xs text-rose-100 font-bold mt-1">دقة الأسئلة الموضوعية الإجمالية</div>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={onViewCertificate}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
          >
            <Award className="w-4 h-4 text-amber-900" />
            <span>عرض وطباعة شهادة الإنجاز</span>
          </button>

          <button
            onClick={onGoToPrint}
            className="flex items-center gap-2 bg-white text-[#8A1538] hover:bg-rose-50 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة أوراق المراجعة الرسمية</span>
          </button>

          <button
            onClick={onResetAll}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>بدء محاولة جديدة وتصفير الإجابات</span>
          </button>
        </div>
      </div>

      {/* Axis Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Axis 1 Performance */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#8A1538] flex items-center justify-center">
                <Atom className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-black text-[#8A1538] block">المحور الأول</span>
                <h4 className="font-extrabold text-sm text-slate-900">الطبيعة الجسيمية للمادة</h4>
              </div>
            </div>
            <span className="text-xl font-black text-[#8A1538]">{axis1Accuracy}%</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[11px]">الأسئلة المجابة</span>
              <span className="font-black text-slate-800 text-sm">{axis1MCQAnswered} / {axis1MCQTotal}</span>
            </div>
            <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
              <span className="text-emerald-700 block text-[11px]">صحيحة</span>
              <span className="font-black text-emerald-800 text-sm">{axis1MCQCorrect}</span>
            </div>
            <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100">
              <span className="text-rose-700 block text-[11px]">تحتاج تصحيح</span>
              <span className="font-black text-rose-800 text-sm">{axis1MCQAnswered - axis1MCQCorrect}</span>
            </div>
          </div>
        </div>

        {/* Axis 2 Performance */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Microscope className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-black text-emerald-700 block">المحور الثاني</span>
                <h4 className="font-extrabold text-sm text-slate-900">الخلايا الحية والمجهر الضوئي</h4>
              </div>
            </div>
            <span className="text-xl font-black text-emerald-700">{axis2Accuracy}%</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <span className="text-slate-500 block text-[11px]">الأسئلة المجابة</span>
              <span className="font-black text-slate-800 text-sm">{axis2MCQAnswered} / {axis2MCQTotal}</span>
            </div>
            <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
              <span className="text-emerald-700 block text-[11px]">صحيحة</span>
              <span className="font-black text-emerald-800 text-sm">{axis2MCQCorrect}</span>
            </div>
            <div className="bg-rose-50 p-2.5 rounded-xl border border-rose-100">
              <span className="text-rose-700 block text-[11px]">تحتاج تصحيح</span>
              <span className="font-black text-rose-800 text-sm">{axis2MCQAnswered - axis2MCQCorrect}</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-slate-800">{totalQuestions}</div>
          <div className="text-xs font-bold text-slate-500">إجمالي الأسئلة في الملزمة</div>
          <div className="text-[11px] text-slate-400">47 موضوعي + 13 مقالي وتركيبي</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{correctMCQs}</div>
          <div className="text-xs font-bold text-emerald-800">إجابات موضوعية صحيحة</div>
          <div className="text-[11px] text-emerald-600">مطابقة للنموذج الرسمي</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-rose-600">{incorrectMCQs}</div>
          <div className="text-xs font-bold text-rose-800">إجابات تحتاج تصحيح</div>
          <div className="text-[11px] text-rose-500">موضحة بالتفصيل أدناه</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-black text-amber-600">{unattemptedMCQs}</div>
          <div className="text-xs font-bold text-amber-800">أسئلة موضوعية لم تُحل</div>
          <div className="text-[11px] text-amber-500">يمكنك حلها الآن</div>
        </div>
      </div>

      {/* Subjective Essay Summary */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#8A1538]" />
            <h4 className="font-black text-slate-800 text-sm sm:text-base">
              حالة الأسئلة المقالية والتركيبية (التقييم الذاتي):
            </h4>
          </div>
          <span className="text-xs text-slate-500 font-bold">13 سؤالاً مقالياً بإجمالي 69 فرعاً</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          وفقاً للمعايير التربوية الرسمية، لا تُصحح الأسئلة المقالية آلياً لتجنب تخمين المعنى. يُتاح للطالب مقارنة صياغته بنص الإجابة النموذجية المعتمدة وتقييم دقته.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">أسئلة قيّمها الطالب بأنها صحيحة ومطابقة:</span>
            <span className="font-black text-emerald-800 text-base">{selfEvaluatedCorrect}</span>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between">
            <span className="text-xs font-bold text-amber-900">أسئلة قيّمها الطالب بأنها تحتاج مراجعة:</span>
            <span className="font-black text-amber-800 text-base">{selfEvaluatedNeedsReview}</span>
          </div>
        </div>
      </div>

      {/* List of Incorrect MCQs for direct retry with Axis Filtering */}
      {wrongMCQs.length > 0 ? (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-100 pb-3">
            <div className="flex items-center gap-2 text-rose-800 font-black text-base">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>الأسئلة التي أخطأ فيها الطالب ({displayedWrongMCQs.length} سؤال):</span>
            </div>

            {/* Filter Wrong by Axis */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-slate-500">تصفية المحور:</span>
              <button
                onClick={() => setFilterWrongByAxis('all')}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-all ${
                  filterWrongByAxis === 'all'
                    ? 'bg-[#8A1538] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                الكل ({wrongMCQs.length})
              </button>
              <button
                onClick={() => setFilterWrongByAxis('1')}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-all ${
                  filterWrongByAxis === '1'
                    ? 'bg-[#8A1538] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                المحور 1
              </button>
              <button
                onClick={() => setFilterWrongByAxis('2')}
                className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer transition-all ${
                  filterWrongByAxis === '2'
                    ? 'bg-[#8A1538] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                المحور 2
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {displayedWrongMCQs.map(({ question, index, selected, correct }) => (
              <div
                key={question.id}
                className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-rose-50 transition-colors"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-rose-600 text-white font-bold text-xs px-2 py-0.5 rounded">
                      سؤال {question.numberLabel}
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      {question.unitId === 1 ? 'المحور الأول: الطبيعة الجسيمية' : 'المحور الثاني: الخلايا والمجهر'}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{question.prompt}</p>
                  <div className="text-xs space-x-3 space-x-reverse font-semibold pt-1">
                    <span className="text-rose-700">إجابتك: ({selected})</span>
                    <span className="text-emerald-700">الإجابة النموذجية: ({correct})</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToQuestion(index)}
                  className="flex items-center gap-1.5 bg-[#8A1538] hover:bg-[#6c102c] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  <span>إعادة الحل</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : answeredMCQs > 0 ? (
        <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-2xl text-center space-y-2">
          <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
          <h4 className="font-black text-emerald-900 text-lg">تهانينا! لم ترتكب أي خطأ في الأسئلة التي أجبت عليها</h4>
          <p className="text-xs text-emerald-700 font-medium">جميع إجاباتك مطابقة للنموذج الرسمي بدقة 100%.</p>
        </div>
      ) : null}
    </div>
  );
};
