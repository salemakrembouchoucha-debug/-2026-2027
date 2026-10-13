import React, { useState, useEffect } from 'react';
import { ALL_QUESTIONS, UNITS_INFO, SUB_TOPICS_INFO, getSubTopicIdForQuestion } from './data/scienceCurriculumData';
import { UserAnswerRecord, StudentProfile, AnswerVisibilityMode } from './types/quiz';
import { OfficialHeader } from './components/OfficialHeader';
import { InteractiveQuestionCard } from './components/InteractiveQuestionCard';
import { ConceptSummaryView } from './components/ConceptSummaryView';
import { PrintWorksheetView } from './components/PrintWorksheetView';
import { StudentReportView } from './components/StudentReportView';
import { AuditReportView } from './components/AuditReportView';
import { ScienceSimulationView } from './components/ScienceSimulationView';
import { CertificateView } from './components/CertificateView';
import { StudentIntakeModal } from './components/StudentIntakeModal';
import {
  BookOpen,
  CheckCircle,
  HelpCircle,
  Printer,
  BarChart3,
  Layers,
  ChevronRight,
  ChevronLeft,
  Grid,
  RotateCcw,
  Sparkles,
  FileText,
  ShieldCheck,
  FlaskConical,
  Award,
  User,
  Edit3,
  Lock,
  Eye,
  CheckCircle2,
  Atom,
  Microscope,
  ListFilter,
} from 'lucide-react';

type AppTab = 'interactive' | 'simulation' | 'concepts' | 'print' | 'report' | 'certificate' | 'audit';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('interactive');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  
  // Axis Selection State ('1': Unit 1, '2': Unit 2, 'all': All units)
  const [selectedAxis, setSelectedAxis] = useState<'1' | '2' | 'all'>('1');
  const [selectedSubTopic, setSelectedSubTopic] = useState<string>('all');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<'all' | 'mcq' | 'essay'>('all');
  
  // Answer Visibility Mode (Default: student_hidden - ANSWERS COMPLETELY HIDDEN)
  const [answerMode, setAnswerMode] = useState<AnswerVisibilityMode>('student_hidden');
  
  const [showQuestionGrid, setShowQuestionGrid] = useState<boolean>(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState<boolean>(false);

  // Student Profile state
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('qatar_science_student_profile');
      return saved
        ? JSON.parse(saved)
        : { name: '', gradeSection: 'السابع / 1', hasStarted: false };
    } catch {
      return { name: '', gradeSection: 'السابع / 1', hasStarted: false };
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('qatar_science_student_profile', JSON.stringify(studentProfile));
    } catch (e) {
      console.error(e);
    }
  }, [studentProfile]);

  // Student answers stored in localStorage
  const [answers, setAnswers] = useState<Record<string, UserAnswerRecord>>(() => {
    try {
      const saved = localStorage.getItem('qatar_science_grade7_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('qatar_science_grade7_answers', JSON.stringify(answers));
    } catch (e) {
      console.error(e);
    }
  }, [answers]);

  // Handle Axis change
  const handleSelectAxis = (axis: '1' | '2' | 'all') => {
    setSelectedAxis(axis);
    setSelectedSubTopic('all');
    setCurrentQuestionIndex(0);
  };

  // Filtered list of questions based on selected Axis, Sub-topic, and Section type
  const filteredQuestions = ALL_QUESTIONS.filter((q) => {
    if (selectedAxis !== 'all' && q.unitId.toString() !== selectedAxis) {
      return false;
    }
    if (selectedSubTopic !== 'all' && getSubTopicIdForQuestion(q) !== selectedSubTopic) {
      return false;
    }
    if (selectedSectionFilter !== 'all' && q.section !== selectedSectionFilter) {
      return false;
    }
    return true;
  });

  const activeQuestion = filteredQuestions[currentQuestionIndex] || ALL_QUESTIONS[0];

  const handleUpdateAnswer = (record: UserAnswerRecord) => {
    setAnswers((prev) => ({
      ...prev,
      [record.questionId]: record,
    }));
  };

  const handleResetAll = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في تصفير جميع الإجابات والبدء من جديد؟')) {
      setAnswers({});
      localStorage.removeItem('qatar_science_grade7_answers');
      setCurrentQuestionIndex(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Completion calculation for Axis 1, Axis 2 and Overall
  const totalAllQuestions = ALL_QUESTIONS.length; // 60
  const answeredCount = Object.keys(answers).filter((k) => {
    const rec = answers[k];
    return rec.selectedOption || (rec.essayAnswers && Object.keys(rec.essayAnswers).length > 0);
  }).length;
  const progressPercent = Math.round((answeredCount / totalAllQuestions) * 100);

  // Axis 1 stats (30 questions)
  const axis1Questions = ALL_QUESTIONS.filter((q) => q.unitId === 1);
  const axis1Answered = axis1Questions.filter((q) => {
    const rec = answers[q.id];
    return rec && (rec.selectedOption || (rec.essayAnswers && Object.keys(rec.essayAnswers).length > 0));
  }).length;
  const axis1Percent = Math.round((axis1Answered / axis1Questions.length) * 100);

  // Axis 2 stats (30 questions)
  const axis2Questions = ALL_QUESTIONS.filter((q) => q.unitId === 2);
  const axis2Answered = axis2Questions.filter((q) => {
    const rec = answers[q.id];
    return rec && (rec.selectedOption || (rec.essayAnswers && Object.keys(rec.essayAnswers).length > 0));
  }).length;
  const axis2Percent = Math.round((axis2Answered / axis2Questions.length) * 100);

  // MCQs metrics for certificate
  const mcqQuestions = ALL_QUESTIONS.filter((q) => q.section === 'mcq');
  const essayQuestions = ALL_QUESTIONS.filter((q) => q.section === 'essay');
  const mcqCorrectCount = mcqQuestions.filter((q) => answers[q.id]?.selectedOption === q.correctOption).length;
  const essayCompletedCount = essayQuestions.filter(
    (q) => answers[q.id]?.essayAnswers && Object.keys(answers[q.id].essayAnswers!).length > 0
  ).length;

  // Active Axis Title for display
  const currentAxisTitle =
    selectedAxis === '1'
      ? 'المحور الأول: الطبيعة الجسيمية للمادة'
      : selectedAxis === '2'
      ? 'المحور الثاني: الخلايا الحية والمجهر'
      : 'جميع المحاور (مراجعة شاملة)';

  // Relevant sub-topics for currently selected axis
  const relevantSubTopics = SUB_TOPICS_INFO.filter((st) => {
    if (selectedAxis === 'all') return true;
    return st.unitId.toString() === selectedAxis;
  });

  return (
    <div className="min-h-screen bg-slate-100/80 text-slate-800 flex flex-col font-sans" dir="rtl">
      {/* Student Intake Modal shown before first start or on profile edit */}
      <StudentIntakeModal
        initialProfile={studentProfile}
        isOpen={!studentProfile.hasStarted || showEditProfileModal}
        onStartReview={(updated) => {
          setStudentProfile(updated);
          setShowEditProfileModal(false);
        }}
        onClose={() => setShowEditProfileModal(false)}
      />

      {/* Top Main Navigation Bar (Hidden in Print) */}
      <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 gap-3">
            {/* Logo / Brand Text */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#8A1538] flex items-center justify-center p-2 shadow-xs text-white">
                <BookOpen className="w-5 h-5 mx-auto" />
              </div>
              <div>
                <h1 className="font-black text-sm sm:text-base text-slate-900 leading-tight">
                  مراجعة العلوم – الصف السابع
                </h1>
                <p className="text-[11px] text-slate-500 font-bold">
                  مدرسة الريان الخاصة | تحت إشراف قسم العلوم
                </p>
              </div>
            </div>

            {/* Student Name badge with edit trigger */}
            {studentProfile.name && (
              <button
                onClick={() => setShowEditProfileModal(true)}
                className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all cursor-pointer border border-slate-200"
                title="تعديل اسم الطالب والشعبة"
              >
                <User className="w-3.5 h-3.5 text-[#8A1538]" />
                <span>الطالب: {studentProfile.name}</span>
                <span className="text-slate-400">({studentProfile.gradeSection})</span>
                <Edit3 className="w-3 h-3 text-slate-400 mr-1" />
              </button>
            )}

            {/* Navigation Buttons */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setActiveTab('interactive')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'bg-[#8A1538] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">المراجعة التفاعلية</span>
                <span className="sm:hidden">التفاعلية</span>
              </button>

              <button
                onClick={() => setActiveTab('simulation')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  activeTab === 'simulation'
                    ? 'bg-[#8A1538] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <FlaskConical className="w-4 h-4" />
                <span className="hidden sm:inline">المحاكاة العلمية</span>
                <span className="sm:hidden">المحاكاة</span>
              </button>

              <button
                onClick={() => setActiveTab('concepts')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  activeTab === 'concepts'
                    ? 'bg-[#8A1538] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">الملخص المفاهيمي</span>
                <span className="sm:hidden">الملخص</span>
              </button>

              <button
                onClick={() => setActiveTab('print')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  activeTab === 'print'
                    ? 'bg-[#8A1538] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">الطباعة الرسمية</span>
                <span className="sm:hidden">الطباعة</span>
              </button>

              <button
                onClick={() => setActiveTab('report')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                  activeTab === 'report'
                    ? 'bg-[#8A1538] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">تقرير النتائج</span>
                <span className="sm:hidden">النتائج</span>
              </button>

              <button
                onClick={() => setActiveTab('certificate')}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'certificate'
                    ? 'bg-amber-500 text-slate-900 shadow-xs'
                    : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                }`}
                title="شهادة الإنجاز"
              >
                <Award className="w-4 h-4" />
                <span className="hidden lg:inline">الشهادة</span>
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  activeTab === 'audit'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
                title="سجل التدقيق والمطابقة"
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="hidden xl:inline">التدقيق</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Official Header Banner on Top of App Interface (Texts only, NO logos) */}
        <div className="no-print bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <OfficialHeader extraMeta="أوراق عمل رفع الكفاءة – برنامج التدريبات العلاجية والإثرائية" />
        </div>

        {/* ============================================================== */}
        {/* INTERACTIVE REVIEW TAB */}
        {/* ============================================================== */}
        {activeTab === 'interactive' && (
          <div className="space-y-6">
            {/* ========================================================== */}
            {/* AXIS SELECTION HUB (فصل واختيار المحاور التعليمية) */}
            {/* ========================================================== */}
            <div className="no-print bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#8A1538]"></span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      اختر المحور الدراسي للبدء بالمراجعة:
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold">
                    تم فصل محاور المنهج لتمكين الطالب من التركيز على محور محدد أو حل المراجعة الكاملة.
                  </p>
                </div>

                {/* Answer Visibility Mode Toggle */}
                <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 self-start sm:self-auto border border-slate-200 shadow-2xs">
                  <button
                    onClick={() => setAnswerMode('student_hidden')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      answerMode === 'student_hidden'
                        ? 'bg-[#8A1538] text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                    title="الإجابات الصحيحة والنموذجية مخفية تماماً على الطالب أثناء الحل"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>وضع الطالب (إخفاء الإجابات)</span>
                  </button>

                  <button
                    onClick={() => setAnswerMode('practice_check')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      answerMode === 'practice_check'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                    title="التحقق من صحة الإجابة بعد النقر على زر التحقق فقط"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>تحقق عند الطلب</span>
                  </button>

                  <button
                    onClick={() => setAnswerMode('teacher_review')}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      answerMode === 'teacher_review'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    }`}
                    title="كشف الإجابات النموذجية كاملة للمراجعة المباشرة"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>كشف الإجابات (المعلم)</span>
                  </button>
                </div>
              </div>

              {/* Axis Selector 3 Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                {/* Axis 1 Card */}
                <div
                  onClick={() => handleSelectAxis('1')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                    selectedAxis === '1'
                      ? 'border-[#8A1538] bg-rose-50/40 ring-4 ring-rose-100 shadow-sm'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        selectedAxis === '1' ? 'bg-[#8A1538] text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        <Atom className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-[#8A1538] block">المحور الأول</span>
                        <h4 className="font-extrabold text-sm text-slate-900 leading-tight">الطبيعة الجسيمية للمادة</h4>
                      </div>
                    </div>
                    {selectedAxis === '1' && (
                      <span className="bg-[#8A1538] text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                        نشط الآن
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                    30 سؤالاً • حالات المادة الثلاث، الكثافة، الانضغاط، وانتشار الجسيمات
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">تم إنجاز: {axis1Answered} / 30</span>
                    <span className="text-[#8A1538] font-black">{axis1Percent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="bg-[#8A1538] h-full rounded-full transition-all"
                      style={{ width: `${axis1Percent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Axis 2 Card */}
                <div
                  onClick={() => handleSelectAxis('2')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                    selectedAxis === '2'
                      ? 'border-emerald-600 bg-emerald-50/40 ring-4 ring-emerald-100 shadow-sm'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        selectedAxis === '2' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        <Microscope className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-emerald-800 block">المحور الثاني</span>
                        <h4 className="font-extrabold text-sm text-slate-900 leading-tight">الخلايا الحية والمجهر</h4>
                      </div>
                    </div>
                    {selectedAxis === '2' && (
                      <span className="bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                        نشط الآن
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                    30 سؤالاً • المجهر الضوئي، تركيب الخلايا، الخاصية الأسموزية، والخلايا المتخصصة
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">تم إنجاز: {axis2Answered} / 30</span>
                    <span className="text-emerald-700 font-black">{axis2Percent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${axis2Percent}%` }}
                    ></div>
                  </div>
                </div>

                {/* All Axes Card */}
                <div
                  onClick={() => handleSelectAxis('all')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
                    selectedAxis === 'all'
                      ? 'border-indigo-600 bg-indigo-50/40 ring-4 ring-indigo-100 shadow-sm'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        selectedAxis === 'all' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-indigo-700 block">المراجعة الشاملة</span>
                        <h4 className="font-extrabold text-sm text-slate-900 leading-tight">جميع المحاور والوحدات</h4>
                      </div>
                    </div>
                    {selectedAxis === 'all' && (
                      <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                        نشط الآن
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium mt-2 leading-relaxed">
                    60 سؤالاً كاملاً • تدريب شامل يجمع المحورين معاً لاختبار منتصف الفصل
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">تم إنجاز: {answeredCount} / 60</span>
                    <span className="text-indigo-700 font-black">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full rounded-full transition-all"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Sub-Topics Pill Selector for Selected Axis */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
                  <ListFilter className="w-3.5 h-3.5 text-[#8A1538]" />
                  <span>تصفية الموضوعات الفرعية:</span>
                </span>

                <button
                  onClick={() => {
                    setSelectedSubTopic('all');
                    setCurrentQuestionIndex(0);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    selectedSubTopic === 'all'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {selectedAxis === '1'
                    ? 'كامل المحور الأول (30 سؤالاً)'
                    : selectedAxis === '2'
                    ? 'كامل المحور الثاني (30 سؤالاً)'
                    : 'جميع موضوعات المنهج (60 سؤالاً)'}
                </button>

                {relevantSubTopics.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      setSelectedSubTopic(st.id);
                      setCurrentQuestionIndex(0);
                    }}
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      selectedSubTopic === st.id
                        ? 'bg-[#8A1538] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>{st.shortTitle}</span>
                    <span className="mr-1.5 opacity-75 text-[11px]">({st.rangeDescription})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Quick Toolbar: Type filter and Index Grid Toggle */}
            <div className="no-print bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                <span className="bg-rose-50 text-[#8A1538] px-3 py-1.5 rounded-xl border border-rose-200">
                  {currentAxisTitle}
                </span>
                <span className="text-slate-400">|</span>
                <span>الأسئلة المعروضة: {filteredQuestions.length} سؤال</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedSectionFilter}
                  onChange={(e) => {
                    setSelectedSectionFilter(e.target.value as any);
                    setCurrentQuestionIndex(0);
                  }}
                  className="text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#8A1538]"
                >
                  <option value="all">جميع أنواع الأسئلة</option>
                  <option value="mcq">أسئلة الاختيار من متعدد فقط</option>
                  <option value="essay">الأسئلة المقالية والتركيبية فقط</option>
                </select>

                <button
                  onClick={() => setShowQuestionGrid(!showQuestionGrid)}
                  className={`flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-xl border transition-colors cursor-pointer ${
                    showQuestionGrid
                      ? 'bg-[#8A1538] text-white border-[#8A1538]'
                      : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                  title="فهرس أسئلة المحور الحالي"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">فهرس أسئلة المحور</span>
                  <span className="sm:hidden">الفهرس</span>
                </button>
              </div>
            </div>

            {/* Question Quick Jump Grid Modal/Drawer */}
            {showQuestionGrid && (
              <div className="no-print bg-white p-5 rounded-3xl border-2 border-[#8A1538]/30 shadow-md space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Grid className="w-4 h-4 text-[#8A1538]" />
                    <h4 className="font-black text-sm text-slate-900">
                      الانتقال المباشر لأسئلة {currentAxisTitle} ({filteredQuestions.length} سؤال):
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> تم حله
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> لم يُحل
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2 max-h-64 overflow-y-auto p-1">
                  {filteredQuestions.map((q, idx) => {
                    const ans = answers[q.id];
                    const isAnswered =
                      ans && (ans.selectedOption || (ans.essayAnswers && Object.keys(ans.essayAnswers).length > 0));
                    const isCurrent = idx === currentQuestionIndex;

                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setCurrentQuestionIndex(idx);
                          setShowQuestionGrid(false);
                        }}
                        className={`h-9 rounded-xl font-black text-xs flex items-center justify-center transition-all cursor-pointer ${
                          isCurrent ? 'ring-2 ring-[#8A1538] font-black scale-105 shadow-xs' : ''
                        } ${
                          isAnswered
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {q.section === 'mcq' ? q.originalNumber : `مـ${q.originalNumber}`}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Current Question View */}
            {activeQuestion ? (
              <div className="space-y-4">
                <InteractiveQuestionCard
                  key={activeQuestion.id}
                  question={activeQuestion}
                  userAnswer={answers[activeQuestion.id]}
                  onUpdateAnswer={handleUpdateAnswer}
                  currentIndex={currentQuestionIndex}
                  totalQuestions={filteredQuestions.length}
                  answerMode={answerMode}
                  onToggleAnswerMode={setAnswerMode}
                  axisTitle={activeQuestion.unitId === 1 ? 'المحور الأول: الطبيعة الجسيمية' : 'المحور الثاني: الخلايا والمجهر'}
                />

                {/* Bottom Navigation Controls */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                      currentQuestionIndex === 0
                        ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs cursor-pointer'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4" />
                    <span>السابق</span>
                  </button>

                  <div className="text-xs font-black text-slate-700 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-2xs">
                    سؤال {currentQuestionIndex + 1} من {filteredQuestions.length}
                  </div>

                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === filteredQuestions.length - 1}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
                      currentQuestionIndex === filteredQuestions.length - 1
                        ? 'opacity-40 cursor-not-allowed bg-slate-200 text-slate-500'
                        : 'bg-[#8A1538] hover:bg-[#6e102d] text-white shadow-xs cursor-pointer'
                    }`}
                  >
                    <span>التالي</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-3xl text-center space-y-3">
                <p className="text-slate-600 font-bold">لا توجد أسئلة تطابق التصفية المحددة في هذا المحور.</p>
                <button
                  onClick={() => {
                    setSelectedSubTopic('all');
                    setSelectedSectionFilter('all');
                  }}
                  className="bg-[#8A1538] text-white px-5 py-2 rounded-xl text-xs font-bold"
                >
                  إعادة ضبط التصفية
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* SCIENTIFIC SIMULATION TAB */}
        {/* ============================================================== */}
        {activeTab === 'simulation' && (
          <ScienceSimulationView onBackToReview={() => setActiveTab('interactive')} />
        )}

        {/* ============================================================== */}
        {/* CONCEPT SUMMARIES TAB */}
        {/* ============================================================== */}
        {activeTab === 'concepts' && <ConceptSummaryView />}

        {/* ============================================================== */}
        {/* OFFICIAL PRINTABLE WORKSHEET TAB */}
        {/* ============================================================== */}
        {activeTab === 'print' && <PrintWorksheetView student={studentProfile} />}

        {/* ============================================================== */}
        {/* STUDENT RESULTS REPORT TAB */}
        {/* ============================================================== */}
        {activeTab === 'report' && (
          <StudentReportView
            answers={answers}
            student={studentProfile}
            onNavigateToQuestion={(targetIndex) => {
              setCurrentQuestionIndex(targetIndex);
              setActiveTab('interactive');
            }}
            onResetAll={handleResetAll}
            onGoToPrint={() => setActiveTab('print')}
            onViewCertificate={() => setActiveTab('certificate')}
          />
        )}

        {/* ============================================================== */}
        {/* CERTIFICATE OF ACHIEVEMENT TAB */}
        {/* ============================================================== */}
        {activeTab === 'certificate' && (
          <CertificateView
            student={studentProfile}
            totalQuestions={totalAllQuestions}
            mcqCorrect={mcqCorrectCount}
            mcqTotal={mcqQuestions.length}
            essayCompleted={essayCompletedCount}
            essayTotal={essayQuestions.length}
            onBack={() => setActiveTab('report')}
          />
        )}

        {/* ============================================================== */}
        {/* OFFICIAL AUDIT MATRIX TAB */}
        {/* ============================================================== */}
        {activeTab === 'audit' && <AuditReportView />}
      </main>

      {/* Footer (Hidden in Print) */}
      <footer className="no-print mt-auto bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 space-y-1">
        <div className="font-extrabold text-slate-700">
          وزارة التربية والتعليم والتعليم العالي – دولة قطر | مدرسة الريان الخاصة – تحت إشراف قسم العلوم
        </div>
        <div className="font-medium">
          مراجعة منتصف الفصل الدراسي الأول – الصف السابع | تدريبات علاجية وإثرائية
        </div>
      </footer>
    </div>
  );
}
