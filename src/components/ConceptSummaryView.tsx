import React, { useState } from 'react';
import { ScienceDiagram } from './diagrams/ScienceDiagrams';
import { BookOpen, Sparkles, Layers, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

export const ConceptSummaryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'unit1' | 'unit2'>('unit1');

  return (
    <div className="space-y-6" dir="rtl">
      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('unit1')}
          className={`flex items-center gap-2 px-5 py-3 font-bold text-sm sm:text-base border-b-2 transition-all ${
            activeTab === 'unit1'
              ? 'border-[#8A1538] text-[#8A1538] bg-rose-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span>المحور الأول: الطبيعة الجسيمية للمادة</span>
        </button>
        <button
          onClick={() => setActiveTab('unit2')}
          className={`flex items-center gap-2 px-5 py-3 font-bold text-sm sm:text-base border-b-2 transition-all ${
            activeTab === 'unit2'
              ? 'border-[#8A1538] text-[#8A1538] bg-rose-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>المحور الثاني: الخلايا الحية والمجهر</span>
        </button>
      </div>

      {activeTab === 'unit1' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Concept Tree */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="text-center space-y-2">
              <span className="inline-block bg-amber-100 text-amber-900 text-xs px-3 py-1 rounded-full font-bold">
                المخطط المفاهيمي المعتمد في المنهج القطري
              </span>
              <h3 className="text-xl font-black text-slate-800">حالات المادة وخصائصها الجسيمية</h3>
              <p className="text-sm text-slate-600">المادة تتكون من جسيمات وتوجد في ثلاث حالات رئيسية</p>
            </div>

            {/* Tree Diagram visualization matching PDF page 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* الحالة الصلبة */}
              <div className="bg-blue-50/70 border-2 border-blue-200 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="bg-blue-600 text-white font-black text-center py-1.5 rounded-lg text-sm sm:text-base mb-3 shadow-xs">
                    الحالة الصلبة
                  </div>
                  <h4 className="font-extrabold text-blue-950 text-xs mb-2">الخصائص العامة:</h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 font-medium pr-2">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span><strong>شكلها:</strong> ثابت</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span><strong>حجمها:</strong> ثابت</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span><strong>الجسيمات:</strong> متقاربة ومتراصة</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span><strong>قوى التجاذب:</strong> كبيرة جداً</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span><strong>كثافتها:</strong> كبيرة</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span><strong>التدفق والانتشار:</strong> غير قابلة للتدفق</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                      <span><strong>الانضغاط:</strong> غير قابلة للانضغاط</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-200 text-center">
                  <span className="text-[11px] font-bold text-blue-800">مادة صلبة (مثل: الحديد، الخشب)</span>
                </div>
              </div>

              {/* الحالة السائلة */}
              <div className="bg-cyan-50/70 border-2 border-cyan-200 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="bg-cyan-600 text-white font-black text-center py-1.5 rounded-lg text-sm sm:text-base mb-3 shadow-xs">
                    الحالة السائلة
                  </div>
                  <h4 className="font-extrabold text-cyan-950 text-xs mb-2">الخصائص العامة:</h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 font-medium pr-2">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      <span><strong>شكلها:</strong> غير ثابت (يأخذ شكل الإناء)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      <span><strong>حجمها:</strong> ثابت</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      <span><strong>الجسيمات:</strong> متقاربة قليلاً وتنزلق فوق بعضها</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      <span><strong>قوى التجاذب:</strong> متوسطة</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      <span><strong>كثافتها:</strong> متوسطة</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      <span><strong>التدفق والانتشار:</strong> قابلة للتدفق والانتشار</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      <span><strong>الانضغاط:</strong> غير قابلة للانضغاط</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-cyan-200 text-center">
                  <span className="text-[11px] font-bold text-cyan-800">مادة سائلة (مثل: الماء، الزيت)</span>
                </div>
              </div>

              {/* الحالة الغازية */}
              <div className="bg-rose-50/70 border-2 border-rose-200 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="bg-rose-600 text-white font-black text-center py-1.5 rounded-lg text-sm sm:text-base mb-3 shadow-xs">
                    الحالة الغازية
                  </div>
                  <h4 className="font-extrabold text-rose-950 text-xs mb-2">الخصائص العامة:</h4>
                  <ul className="text-xs text-slate-700 space-y-1.5 font-medium pr-2">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                      <span><strong>شكلها:</strong> غير ثابت (يملأ أي حيز)</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                      <span><strong>حجمها:</strong> غير ثابت</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                      <span><strong>الجسيمات:</strong> متباعدة جداً وتتحرك بحرية وسرعة</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                      <span><strong>قوى التجاذب:</strong> قليلة جداً / ضعيفة جداً</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                      <span><strong>كثافتها:</strong> قليلة جداً</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                      <span><strong>التدفق والانتشار:</strong> قابلة للتدفق والانتشار بسهولة</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                      <span><strong>الانضغاط:</strong> قابلة للانضغاط بسهولة</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-rose-200 text-center">
                  <span className="text-[11px] font-bold text-rose-800">مادة غازية (مثل: الهواء، الأكسجين)</span>
                </div>
              </div>
            </div>

            {/* Visual particle diagrams */}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <h4 className="font-extrabold text-slate-800 text-sm mb-3 text-center">
                رسم يوضح ترتيب جسيمات المادة في كل حالة (مطابق للمنهج):
              </h4>
              <ScienceDiagram id="three-states-particles" />
            </div>

            {/* Definitions Box from PDF p10 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
                <span className="font-bold text-emerald-900 text-xs block mb-1">الكثافة:</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  هي كتلة المادة الموجودة في حجم معين (أو مقياس لمدى تقارب الجسيمات في حيز محدد).
                </p>
              </div>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3.5">
                <span className="font-bold text-indigo-900 text-xs block mb-1">الانتشار:</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  هو حركة وانتقال الجسيمات من المناطق عالية التركيز إلى المناطق منخفضة التركيز حتى يتساوى التركيز.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                <span className="font-bold text-amber-900 text-xs block mb-1">أثر الحرارة على الانتشار:</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  كلما ارتفعت درجة الحرارة، زادت الطاقة الحركية للجسيمات، وبالتالي ازدادت سرعة الانتشار.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'unit2' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Main Cells Concept Summary matching PDF page 11 & 22 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="text-center space-y-2">
              <span className="inline-block bg-emerald-100 text-emerald-900 text-xs px-3 py-1 rounded-full font-bold">
                المخطط المفاهيمي المعتمد في المنهج القطري
              </span>
              <h3 className="text-xl font-black text-slate-800">الخلية وأنواعها ووظائف العضيات</h3>
              <p className="text-sm text-slate-600">
                الخلية هي الوحدة الأساسية لبناء أجسام الكائنات الحية، وتُدرس باستخدام <strong>المجهر</strong>
              </p>
            </div>

            {/* Plant vs Animal Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* خلايا حيوانية */}
              <div className="bg-amber-50/70 border-2 border-amber-200 rounded-xl p-5 space-y-3">
                <div className="bg-amber-600 text-white font-black text-center py-2 rounded-lg text-sm sm:text-base shadow-xs">
                  خلايا حيوانية
                </div>
                <h4 className="font-extrabold text-amber-950 text-xs">الأجزاء الرئيسية ووظائفها:</h4>
                <ul className="text-xs text-slate-700 space-y-2 pr-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-amber-500 rounded-full shrink-0"></span>
                    <span><strong>النواة:</strong> تتحكم بأنشطة الخلية المختلفة، وتحتوي المادة الوراثية.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-amber-500 rounded-full shrink-0"></span>
                    <span><strong>الميتوكوندريا:</strong> توفر وتنتج الطاقة للخلية.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-amber-500 rounded-full shrink-0"></span>
                    <span><strong>السيتوبلازم:</strong> سائل مائي هلامي تحدث به معظم أنشطة الخلية.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-amber-500 rounded-full shrink-0"></span>
                    <span><strong>غشاء خلوي:</strong> يتحكم بدخول وخروج المواد من الخلية وإليها.</span>
                  </li>
                </ul>

                <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 mt-2">
                  <span className="text-[11px] font-bold text-rose-800 block mb-1">ما لا تحتويه الخلية الحيوانية:</span>
                  <p className="text-[11px] text-slate-600">
                    - لا تحتوي على جدار خلوي<br />
                    - لا تحتوي على فجوة عصارية كبيرة<br />
                    - لا تحتوي على بلاستيدات خضراء
                  </p>
                </div>
              </div>

              {/* خلايا نباتية */}
              <div className="bg-emerald-50/70 border-2 border-emerald-200 rounded-xl p-5 space-y-3">
                <div className="bg-emerald-600 text-white font-black text-center py-2 rounded-lg text-sm sm:text-base shadow-xs">
                  خلايا نباتية
                </div>
                <h4 className="font-extrabold text-emerald-950 text-xs">الأجزاء الرئيسية ووظائفها:</h4>
                <ul className="text-xs text-slate-700 space-y-2 pr-2">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-emerald-500 rounded-full shrink-0"></span>
                    <span><strong>النواة:</strong> تتحكم بأنشطة الخلية المختلفة.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-emerald-500 rounded-full shrink-0"></span>
                    <span><strong>الميتوكوندريا:</strong> توفر الطاقة للخلية.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-emerald-500 rounded-full shrink-0"></span>
                    <span><strong>السيتوبلازم:</strong> تحدث به معظم الأنشطة وإنتاج المواد.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-emerald-500 rounded-full shrink-0"></span>
                    <span><strong>غشاء خلوي:</strong> يتحكم بدخول وخروج المواد.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-emerald-700 rounded-full shrink-0"></span>
                    <span><strong>جدار خلوي (سليلوز):</strong> يحمي الخلية ويوفر الدعم ويحافظ على شكلها.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-emerald-700 rounded-full shrink-0"></span>
                    <span><strong>فجوة عصارية كبيرة:</strong> تخزن الماء والأملاح وتدعم الخلية.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-1 bg-emerald-700 rounded-full shrink-0"></span>
                    <span><strong>بلاستيدات خضراء:</strong> تصنع الغذاء بواسطة عملية البناء الضوئي.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Specialized cells summary */}
            <div className="pt-4 border-t border-slate-200">
              <h4 className="font-extrabold text-slate-800 text-sm mb-3 text-center">
                الخلايا المتخصصة ووظائفها في الكائنات الحية:
              </h4>
              <ScienceDiagram id="four-specialized-cells" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">الخلايا الحيوانية المتخصصة:</span>
                  <ul className="space-y-1 text-slate-700">
                    <li>• <strong>الخلية العصبية:</strong> نقل الإشارات والمعلومات من وإلى الدماغ.</li>
                    <li>• <strong>الخلايا الطلائية المهدبة:</strong> طرد الملوثات والكائنات الدقيقة بفضل الأهداب.</li>
                    <li>• <strong>الخلايا الدهنية:</strong> تخزين الدهون والعزل الحراري.</li>
                    <li>• <strong>خلايا الدم الحمراء:</strong> نقل الأكسجين إلى خلايا الجسم المختلفة.</li>
                  </ul>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">الخلايا النباتية المتخصصة:</span>
                  <ul className="space-y-1 text-slate-700">
                    <li>• <strong>خلايا الشعيرات الجذرية:</strong> امتصاص الماء والأملاح المعدنية من التربة بفضل الامتداد الطويل.</li>
                    <li>• <strong>أوعية الخشب:</strong> نقل الماء والأملاح المعدنية من الجذور إلى أجزاء النبات.</li>
                    <li>• <strong>لحاء النبات:</strong> نقل الغذاء المصنوع في الأوراق إلى بقية الأجزاء.</li>
                    <li>• <strong>الخلايا العمادية:</strong> ممتلئة بالبلاستيدات الخضراء للقيام بالبناء الضوئي.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
