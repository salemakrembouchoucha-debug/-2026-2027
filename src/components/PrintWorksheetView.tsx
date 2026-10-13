import React, { useState } from 'react';
import { ALL_QUESTIONS, UNITS_INFO } from '../data/scienceCurriculumData';
import { QuestionItem, StudentProfile } from '../types/quiz';
import { OfficialHeader } from './OfficialHeader';
import { ScienceDiagram } from './diagrams/ScienceDiagrams';
import { Printer, FileDown, CheckCircle, Eye, Settings, Filter } from 'lucide-react';

interface PrintWorksheetProps {
  student?: StudentProfile;
}

export const PrintWorksheetView: React.FC<PrintWorksheetProps> = ({ student }) => {
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const [selectedUnit, setSelectedUnit] = useState<'all' | '1' | '2'>('all');

  const filteredQuestions = ALL_QUESTIONS.filter((q) => {
    if (selectedUnit === 'all') return true;
    return q.unitId.toString() === selectedUnit;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Print Control Toolbar (Hidden in Print) */}
      <div className="no-print bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
            <span className="text-xs font-bold text-slate-700 px-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>تحديد المحور:</span>
            </span>
            <button
              onClick={() => setSelectedUnit('all')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedUnit === 'all'
                  ? 'bg-[#8A1538] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              جميع المحاور (المراجعة الكاملة)
            </button>
            <button
              onClick={() => setSelectedUnit('1')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedUnit === '1'
                  ? 'bg-[#8A1538] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              المحور الأول: الطبيعة الجسيمية للمادة
            </button>
            <button
              onClick={() => setSelectedUnit('2')}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedUnit === '2'
                  ? 'bg-[#8A1538] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              المحور الثاني: الخلايا الحية والمجهر
            </button>
          </div>

          {/* Toggle Answer Key */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
            <span className="text-xs font-bold text-slate-700 px-2 flex items-center gap-1">
              <Settings className="w-3.5 h-3.5" />
              <span>صيغة الورقة:</span>
            </span>
            <button
              onClick={() => setShowAnswerKey(false)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                !showAnswerKey
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              أوراق عمل الطالب (غير مجابة)
            </button>
            <button
              onClick={() => setShowAnswerKey(true)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${
                showAnswerKey
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              نسخة المعلم (مع الإجابات النموذجية)
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-[#8A1538] hover:bg-[#6c102c] text-white font-extrabold px-5 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer text-sm"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة المراجعة / حفظ PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet Container */}
      <div className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm print:shadow-none print:border-none print:p-0">
        {/* Printable Official Header */}
        <OfficialHeader
          isPrintVersion={true}
          extraMeta={showAnswerKey ? 'نسخة المعلم الإرشادية – مع مفتاح الإجابة النموذجي' : 'نسخة الطالب – للاختبار والتطبيق العملي'}
        />

        {/* Student metadata bar on paper */}
        <div className="mt-4 mb-6 border border-slate-400 p-3 rounded-lg text-xs sm:text-sm font-bold flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 print:bg-white print:border-black">
          <div className="flex items-center gap-2">
            <span>اسم الطالب:</span>
            {student?.name ? (
              <span className="font-black text-slate-900 underline px-2">{student.name}</span>
            ) : (
              <span className="inline-block w-48 border-b-2 border-dotted border-slate-700 print:border-black"></span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span>الصف:</span>
            <span className="text-slate-900 font-extrabold">{student?.gradeSection || 'السابع / .....'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>التاريخ:</span>
            <span className="inline-block w-28 border-b-2 border-dotted border-slate-700 print:border-black"></span>
          </div>
          <div className="flex items-center gap-2">
            <span>الدرجة:</span>
            <span className="inline-block w-20 border-b-2 border-dotted border-slate-700 print:border-black"></span>
          </div>
        </div>

        {/* Notice line */}
        <div className="text-center my-3 text-xs font-black text-rose-700 print:text-black">
          هذه الملزمة لا تغني عن الكتاب المدرسي (برنامج التدريبات العلاجية / الإثرائية)
        </div>

        {/* Questions Loop grouped by Unit & Section */}
        {[1, 2].map((unitId) => {
          if (selectedUnit !== 'all' && selectedUnit !== unitId.toString()) return null;
          const unit = UNITS_INFO.find((u) => u.id === unitId);
          const unitQuestions = filteredQuestions.filter((q) => q.unitId === unitId);
          const mcqQuestions = unitQuestions.filter((q) => q.section === 'mcq');
          const essayQuestions = unitQuestions.filter((q) => q.section === 'essay');

          return (
            <div key={unitId} className="space-y-6 mb-8 print:mb-6">
              {/* Unit Title Banner */}
              <div className="bg-[#8A1538] text-white p-3 rounded-lg font-black text-base sm:text-lg text-center print:bg-black print:text-white print-avoid-break">
                {unit?.title}
              </div>

              {/* Part 1: MCQs */}
              {mcqQuestions.length > 0 && (
                <div className="space-y-4">
                  <div className="bg-slate-100 border-r-4 border-[#8A1538] p-2 text-sm font-extrabold text-slate-900 print:bg-transparent print:border-black">
                    أولاً: الأسئلة الموضوعية (الاختيار من متعدد)
                  </div>

                  <div className="space-y-4">
                    {mcqQuestions.map((q) => (
                      <div
                        key={q.id}
                        className="print-avoid-break border border-slate-200 rounded-lg p-3.5 print:border-slate-400 bg-white"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-extrabold text-sm sm:text-base text-slate-900">
                            .{q.originalNumber} {q.prompt}
                          </div>
                        </div>

                        {q.diagramId && (
                          <div className="my-2.5 flex justify-center">
                            <ScienceDiagram id={q.diagramId} className="max-w-sm" />
                          </div>
                        )}

                        {q.options && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5 text-xs sm:text-sm">
                            {q.options.map((opt) => {
                              const isCorrect = opt.key === q.correctOption;
                              return (
                                <div
                                  key={opt.key}
                                  className={`p-2 rounded border flex items-center gap-2 ${
                                    showAnswerKey && isCorrect
                                      ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950 print:bg-slate-100 print:border-black'
                                      : 'border-slate-200 print:border-slate-300'
                                  }`}
                                >
                                  <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                                    showAnswerKey && isCorrect
                                      ? 'bg-emerald-600 text-white print:bg-black'
                                      : 'bg-slate-100 text-slate-700 print:bg-slate-200'
                                  }`}>
                                    {opt.key}
                                  </span>
                                  <span>{opt.text}</span>
                                  {showAnswerKey && isCorrect && (
                                    <span className="mr-auto text-[11px] font-bold text-emerald-700 print:text-black">
                                      [الإجابة الصحيحة]
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Part 2: Essay / Structured Questions */}
              {essayQuestions.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="bg-slate-100 border-r-4 border-[#8A1538] p-2 text-sm font-extrabold text-slate-900 print:bg-transparent print:border-black">
                    ثانياً: الأسئلة المقالية والتركيبية
                  </div>

                  <div className="space-y-6">
                    {essayQuestions.map((q) => (
                      <div
                        key={q.id}
                        className="print-avoid-break border border-slate-300 rounded-lg p-4 bg-white space-y-3"
                      >
                        <div className="font-extrabold text-sm sm:text-base text-slate-900 flex items-baseline gap-2">
                          <span className="bg-[#8A1538] text-white px-2 py-0.5 rounded text-xs print:bg-black">
                            سؤال {q.originalNumber}
                          </span>
                          <span>{q.prompt}</span>
                        </div>

                        {q.diagramId && (
                          <div className="my-3 flex justify-center">
                            <ScienceDiagram id={q.diagramId} className="max-w-md" />
                          </div>
                        )}

                        {/* Subquestions with dotted answer lines */}
                        {q.subQuestions && q.subQuestions.length > 0 && (
                          <div className="space-y-3 pt-1">
                            {q.subQuestions.map((sub) => (
                              <div key={sub.id} className="space-y-1.5 text-xs sm:text-sm">
                                <div className="font-bold text-slate-800 flex items-start gap-1.5">
                                  <span className="text-[#8A1538] font-black print:text-black">
                                    {sub.subNumber}
                                  </span>
                                  <span>{sub.prompt}</span>
                                </div>

                                <div className="flex items-center gap-2 text-slate-600 pr-4">
                                  <span className="font-bold shrink-0">الإجابة:</span>
                                  {showAnswerKey ? (
                                    <span className="font-black text-emerald-800 print:text-black bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 print:border-none print:p-0">
                                      {sub.modelAnswer}
                                    </span>
                                  ) : (
                                    <span className="flex-1 border-b-2 border-dotted border-slate-400 print:border-black h-5"></span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Table check rows if type is table_check (Unit 2 Q3) */}
                        {q.type === 'table_check' && q.tableCheckRows && (
                          <div className="overflow-x-auto pt-2">
                            <table className="w-full text-right border-collapse border border-slate-400 text-xs sm:text-sm">
                              <thead>
                                <tr className="bg-slate-100 text-slate-900 font-extrabold">
                                  <th className="p-2 border border-slate-400">جزء الخلية</th>
                                  <th className="p-2 border border-slate-400 text-center w-32">خلية حيوانية</th>
                                  <th className="p-2 border border-slate-400 text-center w-32">خلية نباتية</th>
                                </tr>
                              </thead>
                              <tbody>
                                {q.tableCheckRows.map((r, i) => (
                                  <tr key={i}>
                                    <td className="p-2 border border-slate-400 font-bold">{r.organelle}</td>
                                    <td className="p-2 border border-slate-400 text-center font-bold">
                                      {showAnswerKey ? (r.animalCell ? '✓' : '') : ''}
                                    </td>
                                    <td className="p-2 border border-slate-400 text-center font-bold">
                                      {showAnswerKey ? (r.plantCell ? '✓' : '') : ''}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}

                        {/* Specialized cells table (Unit 2 Q6) */}
                        {q.type === 'specialized_cells_table' && q.specializedCells && (
                          <div className="overflow-x-auto pt-2">
                            <table className="w-full text-right border-collapse border border-slate-400 text-xs sm:text-sm">
                              <thead>
                                <tr className="bg-slate-100 text-slate-900 font-extrabold">
                                  <th className="p-2 border border-slate-400 w-32">شكل الخلية</th>
                                  <th className="p-2 border border-slate-400 w-48">اسم الخلية</th>
                                  <th className="p-2 border border-slate-400">الوظيفة</th>
                                </tr>
                              </thead>
                              <tbody>
                                {q.specializedCells.map((c) => (
                                  <tr key={c.id}>
                                    <td className="p-2 border border-slate-400 font-bold">{c.name}</td>
                                    <td className="p-2 border border-slate-400 font-bold">
                                      {showAnswerKey ? c.name : '................................'}
                                    </td>
                                    <td className="p-2 border border-slate-400">
                                      {showAnswerKey ? c.function : '................................................................'}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Footer on print */}
        <div className="mt-8 pt-4 border-t-2 border-[#8A1538] text-center text-xs font-bold text-slate-700 print:text-black">
          مع تمنياتنا لجميع طلاب الصف السابع بالنجاح والتفوق – قسم العلوم بمدرسة الريان الخاصة
        </div>
      </div>
    </div>
  );
};
