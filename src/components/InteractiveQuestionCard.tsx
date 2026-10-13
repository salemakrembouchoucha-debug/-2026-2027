import React, { useState } from 'react';
import { QuestionItem, UserAnswerRecord, AnswerVisibilityMode } from '../types/quiz';
import { ScienceDiagram } from './diagrams/ScienceDiagrams';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eye,
  EyeOff,
  Award,
  MoveHorizontal,
  Check,
  Lock,
  Layers,
} from 'lucide-react';

interface QuestionCardProps {
  question: QuestionItem;
  userAnswer?: UserAnswerRecord;
  onUpdateAnswer: (record: UserAnswerRecord) => void;
  currentIndex: number;
  totalQuestions: number;
  answerMode?: AnswerVisibilityMode;
  onToggleAnswerMode?: (mode: AnswerVisibilityMode) => void;
  axisTitle?: string;
}

export const InteractiveQuestionCard: React.FC<QuestionCardProps> = ({
  question,
  userAnswer,
  onUpdateAnswer,
  currentIndex,
  totalQuestions,
  answerMode = 'student_hidden',
  axisTitle,
}) => {
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [hasCheckedAnswer, setHasCheckedAnswer] = useState<boolean>(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [selectedMobileItem, setSelectedMobileItem] = useState<string | null>(null);
  const [dragDropFeedback, setDragDropFeedback] = useState<boolean>(false);
  const [dragSavedNotice, setDragSavedNotice] = useState<boolean>(false);

  // For MCQs
  const selectedOption = userAnswer?.selectedOption;
  const isCorrectMCQ = selectedOption && selectedOption === question.correctOption;
  const isAnsweredMCQ = !!selectedOption;

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    onUpdateAnswer({
      questionId: question.id,
      selectedOption: key,
      essayAnswers: userAnswer?.essayAnswers,
      tableAnswers: userAnswer?.tableAnswers,
      dragDropAnswers: userAnswer?.dragDropAnswers,
      isSelfEvaluatedCorrect: userAnswer?.isSelfEvaluatedCorrect,
    });

    // In student_hidden mode: DO NOT reveal answer!
    if (answerMode === 'student_hidden') {
      setHasCheckedAnswer(false);
    } else if (answerMode === 'teacher_review') {
      setHasCheckedAnswer(true);
    } else {
      // In practice mode, wait for student to click "Verify"
      setHasCheckedAnswer(false);
    }
  };

  const handleReset = () => {
    onUpdateAnswer({
      questionId: question.id,
      selectedOption: undefined,
      essayAnswers: {},
      tableAnswers: {},
      dragDropAnswers: {},
      isSelfEvaluatedCorrect: undefined,
    });
    setHasCheckedAnswer(false);
    setShowModelAnswer(false);
    setDragDropFeedback(false);
    setDragSavedNotice(false);
    setSelectedMobileItem(null);
  };

  // For Essay Subquestions
  const essayAnswers = userAnswer?.essayAnswers || {};
  const handleSubAnswerChange = (subId: string, val: string) => {
    const updated = { ...essayAnswers, [subId]: val };
    onUpdateAnswer({
      questionId: question.id,
      selectedOption: userAnswer?.selectedOption,
      essayAnswers: updated,
      tableAnswers: userAnswer?.tableAnswers,
      dragDropAnswers: userAnswer?.dragDropAnswers,
      isSelfEvaluatedCorrect: userAnswer?.isSelfEvaluatedCorrect,
    });
  };

  // For Drag and Drop Answers (targetId -> itemId)
  const dragDropAnswers = userAnswer?.dragDropAnswers || {};
  const handleAssignItemToTarget = (targetId: string, itemId: string) => {
    const updated = { ...dragDropAnswers, [targetId]: itemId };
    onUpdateAnswer({
      questionId: question.id,
      selectedOption: userAnswer?.selectedOption,
      essayAnswers: userAnswer?.essayAnswers,
      tableAnswers: userAnswer?.tableAnswers,
      dragDropAnswers: updated,
      isSelfEvaluatedCorrect: userAnswer?.isSelfEvaluatedCorrect,
    });
    setSelectedMobileItem(null);
    setDragSavedNotice(true);
  };

  const handleRemoveFromTarget = (targetId: string) => {
    const updated = { ...dragDropAnswers };
    delete updated[targetId];
    onUpdateAnswer({
      questionId: question.id,
      selectedOption: userAnswer?.selectedOption,
      essayAnswers: userAnswer?.essayAnswers,
      tableAnswers: userAnswer?.tableAnswers,
      dragDropAnswers: updated,
      isSelfEvaluatedCorrect: userAnswer?.isSelfEvaluatedCorrect,
    });
  };

  // For Table Check (Unit 2 Q3)
  const tableAnswers = userAnswer?.tableAnswers || {};
  const handleTableToggle = (organelle: string, col: 'animal' | 'plant') => {
    const current = tableAnswers[organelle] || { animal: false, plant: false };
    const updatedCol = {
      ...current,
      [col]: !current[col],
    };
    const updated = {
      ...tableAnswers,
      [organelle]: updatedCol,
    };
    onUpdateAnswer({
      questionId: question.id,
      selectedOption: userAnswer?.selectedOption,
      essayAnswers: userAnswer?.essayAnswers,
      tableAnswers: updated,
      dragDropAnswers: userAnswer?.dragDropAnswers,
      isSelfEvaluatedCorrect: userAnswer?.isSelfEvaluatedCorrect,
    });
  };

  const handleSelfEvaluate = (correct: boolean) => {
    onUpdateAnswer({
      questionId: question.id,
      selectedOption: userAnswer?.selectedOption,
      essayAnswers: userAnswer?.essayAnswers,
      tableAnswers: userAnswer?.tableAnswers,
      dragDropAnswers: userAnswer?.dragDropAnswers,
      isSelfEvaluatedCorrect: correct,
    });
  };

  // Evaluation logic according to answerMode
  const isShowingEvaluation =
    answerMode === 'teacher_review' ||
    (answerMode === 'practice_check' && hasCheckedAnswer);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-8 space-y-6 transition-all" dir="rtl">
      {/* Question Header & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#8A1538] text-white font-black text-sm px-3.5 py-1.5 rounded-xl shadow-xs">
            سؤال {question.numberLabel}
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-100 text-slate-700">
            {question.section === 'mcq' ? 'اختيار من متعدد' : 'سؤال مقالي / تركيبي'}
          </span>
          <span className="text-xs text-slate-500 font-semibold">
            (السؤال {currentIndex + 1} من {totalQuestions})
          </span>
          {axisTitle && (
            <span className="text-xs font-extrabold text-[#8A1538] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              <span>{axisTitle}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs">
          {/* Status Indicator Badge */}
          {answerMode === 'student_hidden' ? (
            <span className="bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>وضع الطالب: الإجابات مخفية</span>
            </span>
          ) : answerMode === 'practice_check' ? (
            <span className="bg-blue-50 text-blue-900 border border-blue-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
              <span>وضع التدريب: تحقق عند الطلب</span>
            </span>
          ) : (
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
              <span>وضع المعلم: الإجابات مكشوفة</span>
            </span>
          )}

          <span className="bg-slate-50 border border-slate-200 text-slate-500 px-2.5 py-1 rounded-lg font-medium hidden sm:inline-block">
            {question.sourcePageRef}
          </span>
        </div>
      </div>

      {/* Question Title */}
      {question.title && (
        <h4 className="text-sm sm:text-base font-extrabold text-slate-800 bg-rose-50/40 p-3 rounded-xl border-r-4 border-[#8A1538]">
          {question.title}
        </h4>
      )}

      {/* Question Prompt */}
      <div className="text-base sm:text-xl font-extrabold text-slate-900 leading-relaxed">
        {question.prompt}
      </div>

      {/* Associated Vector Diagram */}
      {question.diagramId && (
        <div className="my-5">
          <ScienceDiagram id={question.diagramId} />
        </div>
      )}

      {/* ========================================================= */}
      {/* DRAG AND DROP ACTIVITY (when dragDropItems exist) */}
      {/* ========================================================= */}
      {question.dragDropItems && question.dragDropTargets && (
        <div className="space-y-5 pt-2">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-slate-800 font-bold text-xs sm:text-sm">
              <MoveHorizontal className="w-5 h-5 text-[#8A1538] shrink-0" />
              <span>
                <strong>نشاط تفاعلي بالسحب والإفلات أو النقر:</strong> اسحب المصطلح العلمي وضعه في موقعه المناسب، أو انقر للاختيار.
              </span>
            </div>

            {answerMode !== 'student_hidden' ? (
              <button
                onClick={() => setDragDropFeedback(true)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs self-start sm:self-auto"
              >
                التحقق من التوصيل
              </button>
            ) : (
              <div className="text-xs text-slate-500 font-bold bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                {dragSavedNotice ? '✓ تم حفظ التوصيل بنجاح' : 'اسحب المصطلحات إلى أماكنها'}
              </div>
            )}
          </div>

          {/* Available Items Pool */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-slate-600 block">
              المصطلحات المتاحة للسحب / النقر:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {question.dragDropItems.map((item) => {
                const isAssigned = Object.values(dragDropAnswers).includes(item.id);
                const isSelectedForMobile = selectedMobileItem === item.id;

                return (
                  <div
                    key={item.id}
                    draggable={!isAssigned}
                    onDragStart={() => setDraggedItemId(item.id)}
                    onClick={() => {
                      if (!isAssigned) {
                        setSelectedMobileItem(selectedMobileItem === item.id ? null : item.id);
                      }
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-black transition-all cursor-grab active:cursor-grabbing border-2 ${
                      isAssigned
                        ? 'opacity-40 bg-slate-100 text-slate-400 border-dashed border-slate-300 cursor-not-allowed'
                        : isSelectedForMobile
                        ? 'bg-[#8A1538] text-white border-[#8A1538] ring-4 ring-rose-200 scale-105 shadow-md'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-[#8A1538] hover:shadow-xs'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isSelectedForMobile && <span className="mr-2 text-xs font-normal">(مُحدد - انقر على الصندوق لتعيينه)</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Targets Drop Zones */}
          <div className="grid grid-cols-1 gap-3.5 pt-2">
            {question.dragDropTargets.map((target) => {
              const assignedItemId = dragDropAnswers[target.id];
              const assignedItem = question.dragDropItems?.find((it) => it.id === assignedItemId);
              const isCorrectTarget = assignedItem?.targetId === target.id;

              let dropBorder = 'border-slate-300 bg-slate-50/60';
              if (dragDropFeedback && answerMode !== 'student_hidden') {
                dropBorder = isCorrectTarget
                  ? 'border-emerald-500 bg-emerald-50/80'
                  : 'border-rose-400 bg-rose-50/80';
              } else if (assignedItem) {
                dropBorder = 'border-slate-400 bg-white';
              }

              return (
                <div
                  key={target.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (draggedItemId) {
                      handleAssignItemToTarget(target.id, draggedItemId);
                      setDraggedItemId(null);
                    }
                  }}
                  onClick={() => {
                    if (selectedMobileItem) {
                      handleAssignItemToTarget(target.id, selectedMobileItem);
                    }
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${dropBorder}`}
                >
                  <div className="space-y-1 flex-1">
                    <span className="text-xs font-black text-[#8A1538] bg-rose-50 px-2 py-0.5 rounded-md inline-block">
                      {target.title}
                    </span>
                    <p className="text-sm font-bold text-slate-900 leading-relaxed">
                      {target.description}
                    </p>
                  </div>

                  {/* Drop Slot */}
                  <div className="min-w-44 flex items-center justify-end gap-2">
                    {assignedItem ? (
                      <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-300 shadow-xs">
                        <span className="font-extrabold text-sm text-slate-900">
                          {assignedItem.label}
                        </span>
                        {dragDropFeedback && answerMode !== 'student_hidden' && (
                          <span>
                            {isCorrectTarget ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-600" />
                            )}
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromTarget(target.id);
                          }}
                          className="text-slate-400 hover:text-rose-600 text-xs px-1 font-bold cursor-pointer"
                          title="إلغاء التعيين"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="w-full text-center py-2 px-3 border-2 border-dashed border-slate-300 rounded-xl text-xs font-bold text-slate-400 bg-white/60">
                        {selectedMobileItem ? 'انقر لوضع المصطلح هنا' : 'أسقط المصطلح هنا'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MCQ Options Rendering */}
      {/* ========================================================= */}
      {question.type === 'mcq' && question.options && (
        <div className="space-y-3.5 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {question.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              const isOptionCorrect = opt.key === question.correctOption;

              let borderClass = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/80';
              let badgeClass = 'bg-slate-100 text-slate-700';

              if (isShowingEvaluation) {
                // Evaluation Mode (Teacher review OR Practice mode after clicking verify)
                if (isOptionCorrect) {
                  borderClass = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-bold ring-2 ring-emerald-400/30';
                  badgeClass = 'bg-emerald-600 text-white';
                } else if (isSelected && !isOptionCorrect) {
                  borderClass = 'border-rose-400 bg-rose-50/80 text-rose-950 font-bold';
                  badgeClass = 'bg-rose-600 text-white';
                }
              } else if (isSelected) {
                // Student Mode (Hidden Answers) OR Practice Mode before clicking Verify:
                // HIGHLIGHT ONLY THE USER'S SELECTION NEUTRALLY - ZERO HINTS!
                borderClass = 'border-[#8A1538] bg-rose-50/60 text-slate-900 font-bold ring-2 ring-rose-200';
                badgeClass = 'bg-[#8A1538] text-white';
              }

              return (
                <button
                  key={opt.key}
                  onClick={() => handleSelectOption(opt.key)}
                  className={`w-full text-right p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 text-sm sm:text-base cursor-pointer ${borderClass}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors shadow-2xs ${badgeClass}`}>
                      {opt.key}
                    </span>
                    <span className="font-bold">{opt.text}</span>
                  </div>

                  {isShowingEvaluation ? (
                    <div>
                      {isOptionCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      ) : null}
                    </div>
                  ) : isSelected ? (
                    <span className="text-xs font-bold text-[#8A1538] bg-white border border-rose-200 px-2.5 py-1 rounded-lg">
                      اختيارك
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Feedback Bar when in Student Mode: Reassuring answer saved notice, NO answers revealed */}
          {answerMode === 'student_hidden' && isAnsweredMCQ && (
            <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <Check className="w-4 h-4 text-[#8A1538]" />
                <span>تم تسجيل اختيارك (الخيار {selectedOption}). الإجابة الصحيحة مخفية في وضع الطالب.</span>
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-slate-500 hover:text-rose-700 text-xs font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إلغاء أو تعديل الاختيار</span>
              </button>
            </div>
          )}

          {/* Practice Check Mode: Show Verify Button, and Feedback once verified */}
          {answerMode === 'practice_check' && (
            <div className="space-y-3">
              {isAnsweredMCQ && !hasCheckedAnswer && (
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setHasCheckedAnswer(true)}
                    className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>التحقق من صحة إجابتي</span>
                  </button>
                </div>
              )}

              {hasCheckedAnswer && (
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 animate-fadeIn ${
                  isCorrectMCQ
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}>
                  <div className="flex items-center gap-3">
                    {isCorrectMCQ ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-black text-sm sm:text-base">إجابة صحيحة ومطابقة!</span>
                          <p className="text-xs text-emerald-700 font-medium">وفق نموذج الإجابة الرسمي: {question.modelAnswer}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-6 h-6 text-rose-600 shrink-0" />
                        <div>
                          <span className="font-black text-sm sm:text-base">إجابة غير صحيحة، حاول مجدداً!</span>
                          <p className="text-xs text-rose-700 font-medium">
                            الخيار الصحيح في نموذج الإجابة هو: <strong>{question.modelAnswer}</strong>
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors shrink-0 shadow-2xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة المحاولة</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Teacher Review Mode: Direct Model Answer Display */}
          {answerMode === 'teacher_review' && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs sm:text-sm text-emerald-900 font-bold flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>الإجابة النموذجية المعتمدة: <strong>{question.modelAnswer}</strong></span>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* Subquestions Rendering (for Essay & Structured) */}
      {/* ========================================================= */}
      {question.subQuestions && question.subQuestions.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="text-xs font-extrabold text-slate-700 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            أجب عن جميع الفروع التالية ثم انتقل للسؤال التالي:
          </div>

          <div className="space-y-4">
            {question.subQuestions.map((sub) => {
              const currentVal = essayAnswers[sub.id] || '';
              return (
                <div key={sub.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="bg-[#8A1538] text-white text-xs font-black px-2.5 py-1 rounded-lg mt-0.5 shrink-0 shadow-2xs">
                      {sub.subNumber}
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-relaxed">
                      {sub.prompt}
                    </span>
                  </div>

                  <div>
                    <input
                      type="text"
                      value={currentVal}
                      onChange={(e) => handleSubAnswerChange(sub.id, e.target.value)}
                      placeholder="اكتب إجابتك هنا..."
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#8A1538] focus:border-transparent transition-all shadow-2xs"
                    />
                  </div>

                  {/* Model answer revealed ONLY in non-student modes when requested */}
                  {showModelAnswer && answerMode !== 'student_hidden' && (
                    <div className="mt-2 p-3.5 bg-emerald-50/90 border border-emerald-300 rounded-xl text-xs animate-fadeIn">
                      <span className="font-extrabold text-emerald-900 block mb-0.5">الإجابة النموذجية الأصلية:</span>
                      <p className="font-black text-emerald-800 text-sm">{sub.modelAnswer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* Table Check Rendering (Unit 2 Q3) */}
      {/* ========================================================= */}
      {question.type === 'table_check' && question.tableCheckRows && (
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-right border-collapse border border-slate-300 rounded-2xl overflow-hidden shadow-2xs">
            <thead>
              <tr className="bg-slate-100 text-slate-800 text-xs sm:text-sm font-black border-b border-slate-300">
                <th className="p-3.5 border-l border-slate-300">جزء الخلية (العضية)</th>
                <th className="p-3.5 border-l border-slate-300 text-center w-36">خلية حيوانية</th>
                <th className="p-3.5 text-center w-36">خلية نباتية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              {question.tableCheckRows.map((row) => {
                const checkedState = tableAnswers[row.organelle] || { animal: false, plant: false };
                return (
                  <tr key={row.organelle} className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-slate-800 border-l border-slate-200">
                      {row.organelle}
                    </td>
                    <td className="p-3.5 text-center border-l border-slate-200">
                      <label className="inline-flex items-center justify-center cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={checkedState.animal}
                          onChange={() => handleTableToggle(row.organelle, 'animal')}
                          className="w-5 h-5 text-emerald-600 rounded-md border-slate-300 focus:ring-emerald-500 cursor-pointer"
                        />
                      </label>
                      {showModelAnswer && answerMode !== 'student_hidden' && (
                        <div className="text-[11px] font-bold mt-1 text-slate-600">
                          {row.animalCell ? (
                            <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">صحيح (✓)</span>
                          ) : (
                            <span className="text-slate-400">لا تحتوي</span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="p-3.5 text-center">
                      <label className="inline-flex items-center justify-center cursor-pointer p-1">
                        <input
                          type="checkbox"
                          checked={checkedState.plant}
                          onChange={() => handleTableToggle(row.organelle, 'plant')}
                          className="w-5 h-5 text-emerald-600 rounded-md border-slate-300 focus:ring-emerald-500 cursor-pointer"
                        />
                      </label>
                      {showModelAnswer && answerMode !== 'student_hidden' && (
                        <div className="text-[11px] font-bold mt-1 text-slate-600">
                          {row.plantCell ? (
                            <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">صحيح (✓)</span>
                          ) : (
                            <span className="text-slate-400">لا تحتوي</span>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================= */}
      {/* Specialized Cells Table Rendering */}
      {/* ========================================================= */}
      {question.type === 'specialized_cells_table' && question.specializedCells && (
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-right border-collapse border border-slate-300 rounded-2xl overflow-hidden text-xs sm:text-sm shadow-2xs">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-black border-b border-slate-300">
                <th className="p-3.5 border-l border-slate-300">شكل الخلية</th>
                <th className="p-3.5 border-l border-slate-300">اسم الخلية</th>
                <th className="p-3.5">الوظيفة المعتمدة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {question.specializedCells.map((cell) => (
                <tr key={cell.id} className="hover:bg-slate-50">
                  <td className="p-3.5 border-l border-slate-200 font-bold text-slate-900 w-36">
                    <span className="bg-slate-100 px-2.5 py-1 rounded-lg block text-center font-extrabold text-[#8A1538]">
                      {cell.name}
                    </span>
                  </td>
                  <td className="p-3.5 border-l border-slate-200">
                    <input
                      type="text"
                      placeholder="اكتب اسم الخلية..."
                      value={essayAnswers[`cell-name-${cell.id}`] || ''}
                      onChange={(e) => handleSubAnswerChange(`cell-name-${cell.id}`, e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs"
                    />
                    {showModelAnswer && answerMode !== 'student_hidden' && (
                      <div className="mt-1 text-[11px] text-emerald-800 font-bold">
                        الاسم: {cell.name}
                      </div>
                    )}
                  </td>
                  <td className="p-3.5">
                    <input
                      type="text"
                      placeholder="اكتب وظيفتها العلمية..."
                      value={essayAnswers[`cell-fn-${cell.id}`] || ''}
                      onChange={(e) => handleSubAnswerChange(`cell-fn-${cell.id}`, e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 shadow-2xs"
                    />
                    {showModelAnswer && answerMode !== 'student_hidden' && (
                      <div className="mt-1 text-[11px] text-emerald-800 font-bold">
                        الوظيفة: {cell.function}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Model Answer Toggle & Self-Assessment Controls */}
      <div className="border-t border-slate-200 pt-4 flex flex-wrap items-center justify-between gap-3">
        {answerMode === 'student_hidden' ? (
          <div className="flex items-center gap-2 text-xs text-slate-600 font-bold bg-slate-50 px-3.5 py-2.5 rounded-xl border border-slate-200 w-full sm:w-auto">
            <Lock className="w-4 h-4 text-[#8A1538] shrink-0" />
            <span>الإجابات النموذجية مخفية على الطالب لضمان بيئة اختبار واعية وموثوقة.</span>
          </div>
        ) : (
          <button
            onClick={() => setShowModelAnswer(!showModelAnswer)}
            className="flex items-center gap-2 text-xs sm:text-sm font-black px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors cursor-pointer shadow-2xs"
          >
            {showModelAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showModelAnswer ? 'إخفاء الإجابة النموذجية' : 'إظهار الإجابة النموذجية الأصلية'}</span>
          </button>
        )}

        {question.section === 'essay' && showModelAnswer && answerMode !== 'student_hidden' && (
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-700 font-bold px-2">تقييمي لإجابتي:</span>
            <button
              onClick={() => handleSelfEvaluate(true)}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                userAnswer?.isSelfEvaluatedCorrect === true
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>مطابقة (صحيحة)</span>
            </button>
            <button
              onClick={() => handleSelfEvaluate(false)}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                userAnswer?.isSelfEvaluatedCorrect === false
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white text-rose-700 border border-rose-300 hover:bg-rose-50'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>تحتاج مراجعة</span>
            </button>
          </div>
        )}
      </div>

      {/* General Model Answer Box if shown and not in student hidden mode */}
      {showModelAnswer && answerMode !== 'student_hidden' && question.modelAnswer && !question.subQuestions && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl space-y-1.5 animate-fadeIn">
          <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
            <Award className="w-4 h-4 text-emerald-700" />
            <span>الإجابة النموذجية المعتمدة (من الوثائق الرسمية):</span>
          </div>
          <p className="text-sm font-black text-emerald-800 leading-relaxed">
            {question.modelAnswer}
          </p>
        </div>
      )}
    </div>
  );
};
