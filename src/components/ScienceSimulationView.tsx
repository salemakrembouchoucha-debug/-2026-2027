import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Thermometer,
  Layers,
  ArrowRight,
  Flame,
  Snowflake,
  Info,
  Sliders,
  MoveDown,
} from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
}

export const ScienceSimulationView: React.FC<{ onBackToReview: () => void }> = ({ onBackToReview }) => {
  const [activeTab, setActiveTab] = useState<'diffusion' | 'states'>('diffusion');

  // ==========================================
  // Simulation 1: Diffusion & Temperature
  // ==========================================
  const [temperature, setTemperature] = useState<number>(50); // 10 to 90 °C
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [crystalAdded, setCrystalAdded] = useState<boolean>(true);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Initialize diffusion particles
  const initDiffusionParticles = () => {
    const particles: Particle[] = [];
    // If crystal added, generate particles initially at bottom center of beaker
    if (crystalAdded) {
      for (let i = 0; i < 90; i++) {
        particles.push({
          x: 150 + (Math.random() - 0.5) * 24,
          y: 250 + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          color: '#7e22ce',
          radius: 4,
        });
      }
    }
    particlesRef.current = particles;
    setElapsedSeconds(0);
  };

  useEffect(() => {
    initDiffusionParticles();
  }, [crystalAdded]);

  // Animation Loop for Diffusion
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas || activeTab !== 'diffusion') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const beakerLeft = 40;
    const beakerRight = width - 40;
    const beakerTop = 70;
    const beakerBottom = height - 25;

    let timerCount = 0;

    const render = () => {
      if (isPlaying) {
        timerCount++;
        if (timerCount % 60 === 0) {
          setElapsedSeconds((prev) => prev + 1);
        }

        // Speed factor proportional to temperature (10°C is slow, 90°C is fast)
        const speedFactor = 0.3 + (temperature / 100) * 2.8;

        particlesRef.current.forEach((p) => {
          p.vx += (Math.random() - 0.5) * 0.25 * speedFactor;
          p.vy += (Math.random() - 0.5) * 0.25 * speedFactor;

          // Dampen maximum velocity
          const maxV = 2.2 * speedFactor;
          p.vx = Math.max(-maxV, Math.min(maxV, p.vx));
          p.vy = Math.max(-maxV, Math.min(maxV, p.vy));

          p.x += p.vx;
          p.y += p.vy;

          // Boundary bouncing within beaker water zone
          if (p.x < beakerLeft + p.radius) {
            p.x = beakerLeft + p.radius;
            p.vx *= -1;
          }
          if (p.x > beakerRight - p.radius) {
            p.x = beakerRight - p.radius;
            p.vx *= -1;
          }
          if (p.y < beakerTop + p.radius) {
            p.y = beakerTop + p.radius;
            p.vy *= -1;
          }
          if (p.y > beakerBottom - p.radius) {
            p.y = beakerBottom - p.radius;
            p.vy *= -1;
          }
        });
      }

      // Draw background beaker & water
      ctx.clearRect(0, 0, width, height);

      // Water body
      ctx.fillStyle = temperature > 60 ? '#eff6ff' : '#f0fdf4';
      ctx.fillRect(beakerLeft, beakerTop, beakerRight - beakerLeft, beakerBottom - beakerTop);

      // Water surface curve
      ctx.fillStyle = '#bae6fd';
      ctx.beginPath();
      ctx.ellipse(
        (beakerLeft + beakerRight) / 2,
        beakerTop,
        (beakerRight - beakerLeft) / 2,
        8,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Glass Beaker Outline
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(beakerLeft, 30);
      ctx.lineTo(beakerLeft, beakerBottom - 8);
      ctx.quadraticCurveTo(beakerLeft, beakerBottom, beakerLeft + 10, beakerBottom);
      ctx.lineTo(beakerRight - 10, beakerBottom);
      ctx.quadraticCurveTo(beakerRight, beakerBottom, beakerRight, beakerBottom - 8);
      ctx.lineTo(beakerRight, 30);
      ctx.stroke();

      // Graduations on beaker side
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.5;
      for (let y = beakerTop + 30; y < beakerBottom; y += 35) {
        ctx.beginPath();
        ctx.moveTo(beakerLeft, y);
        ctx.lineTo(beakerLeft + 15, y);
        ctx.stroke();
      }

      // Crystal at the bottom if recently added
      if (crystalAdded && elapsedSeconds < 15) {
        const opacity = Math.max(0.1, 1 - elapsedSeconds / 15);
        ctx.fillStyle = `rgba(88, 28, 135, ${opacity})`;
        ctx.beginPath();
        ctx.rect(140, beakerBottom - 14, 20, 10);
        ctx.fill();
        ctx.strokeStyle = '#3b0764';
        ctx.stroke();
      }

      // Draw diffusing particles
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = '#9333ea';
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, isPlaying, temperature, crystalAdded]);

  // ==========================================
  // Simulation 2: Gas Compression & 3 States
  // ==========================================
  const [selectedState, setSelectedState] = useState<'solid' | 'liquid' | 'gas'>('gas');
  const [pistonHeight, setPistonHeight] = useState<number>(80); // piston position (compression)

  return (
    <div className="space-y-6" dir="rtl">
      {/* Simulation Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#8A1538] text-white text-xs font-black px-2.5 py-1 rounded-lg">
              المحاكاة العلمية التفاعلية
            </span>
            <span className="text-xs text-slate-500 font-bold">
              متوافقة حصرياً مع مفاهيم وتجارب منهج العلوم للصف السابع
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 mt-1">
            مختبر المحاكاة الاستكشافي للعلوم
          </h2>
        </div>

        <button
          onClick={onBackToReview}
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-black px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-2xs"
        >
          <span>العودة إلى المراجعة</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('diffusion')}
          className={`flex items-center gap-2 px-5 py-3 font-black text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === 'diffusion'
              ? 'border-[#8A1538] text-[#8A1538] bg-rose-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Thermometer className="w-4 h-4" />
          <span>تجربة انتشار بلورة برمنجنات البوتاسيوم وأثر درجة الحرارة</span>
        </button>

        <button
          onClick={() => setActiveTab('states')}
          className={`flex items-center gap-2 px-5 py-3 font-black text-sm border-b-2 transition-all cursor-pointer ${
            activeTab === 'states'
              ? 'border-[#8A1538] text-[#8A1538] bg-rose-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>محاكاة حالات المادة الثلاث وضغط الغاز</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* EXPERIMENT 1: DIFFUSION SIMULATION */}
      {/* ========================================================= */}
      {activeTab === 'diffusion' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Canvas Display */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-between w-full border-b border-slate-100 pb-3 text-xs sm:text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-purple-900">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                بلورة برمنجنات البوتاسيوم في الماء الدافئ
              </span>
              <span className="bg-slate-100 px-3 py-1 rounded-lg">
                الوقت المنقضي: <strong>{elapsedSeconds} ثانية</strong>
              </span>
            </div>

            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="bg-slate-50/50 rounded-2xl border border-slate-200 max-w-full shadow-inner"
            />

            {/* Scientific takeaway matching PDF */}
            <div className="w-full bg-purple-50 border border-purple-200 rounded-2xl p-4 text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-black text-purple-950">
                <Info className="w-4 h-4 text-purple-700" />
                <span>النتيجة العلمية المستخلصة (من الملزمة المعتمدة):</span>
              </div>
              <p className="text-purple-900 font-semibold leading-relaxed">
                • الانتشار هو حركة الجسيمات من منطقة ذات تركيز عالٍ إلى منطقة ذات تركيز منخفض.<br />
                • <strong>أثر درجة الحرارة:</strong> كلما ارتفعت درجة الحرارة، ازدادت الطاقة الحركية للجسيمات، وبالتالي ازدادت سرعة انتشار المادة.<br />
                • يتوقف الانتشار عندما يتساوى التركيز في جميع أجزاء الإناء.
              </p>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#8A1538]" />
              <span>لوحة التحكم في التجربة</span>
            </h3>

            {/* Temperature Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs sm:text-sm font-black">
                <span className="text-slate-700">درجة حرارة الماء:</span>
                <span className={`px-2.5 py-1 rounded-lg ${
                  temperature > 65
                    ? 'bg-rose-100 text-rose-800'
                    : temperature < 30
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {temperature} °C
                </span>
              </div>

              <input
                type="range"
                min="10"
                max="90"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-[#8A1538] cursor-pointer"
              />

              <div className="flex justify-between text-[11px] font-bold text-slate-400">
                <span className="flex items-center gap-1"><Snowflake className="w-3 h-3 text-blue-500" /> ماء بارد (10°C)</span>
                <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-rose-500" /> ماء ساخن (90°C)</span>
              </div>
            </div>

            {/* Simulation Play / Pause / Reset */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-full py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                  isPlaying
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'إيقاف التجربة مؤقتاً' : 'متابعة حركة الجسيمات'}</span>
              </button>

              <button
                onClick={() => {
                  setCrystalAdded(false);
                  setTimeout(() => setCrystalAdded(true), 80);
                }}
                className="w-full py-2.5 rounded-2xl font-bold text-xs bg-purple-100 hover:bg-purple-200 text-purple-900 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>إضافة بلورة برمنجنات جديدة</span>
              </button>

              <button
                onClick={initDiffusionParticles}
                className="w-full py-2.5 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة ضبط التجربة من البداية</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* EXPERIMENT 2: STATES OF MATTER & COMPRESSION */}
      {/* ========================================================= */}
      {activeTab === 'states' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Interactive States Display */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col items-center justify-center space-y-5">
            <div className="w-full flex items-center justify-between border-b border-slate-100 pb-3 text-xs sm:text-sm font-extrabold text-slate-800">
              <span>الحالة المختارة: <strong>{selectedState === 'solid' ? 'الحالة الصلبة' : selectedState === 'liquid' ? 'الحالة السائلة' : 'الحالة الغازية'}</strong></span>
              {selectedState === 'gas' && (
                <span className="text-[#8A1538] font-black">حجم الغاز في الأسطوانة: {160 - pistonHeight} مل</span>
              )}
            </div>

            {/* Cylinder / Box Simulation SVG */}
            <div className="w-64 h-72 bg-slate-50 border-2 border-slate-400 rounded-2xl relative overflow-hidden shadow-inner flex flex-col justify-end">
              {/* Piston (in gas mode) */}
              {selectedState === 'gas' && (
                <div
                  className="absolute left-0 right-0 bg-slate-700 border-b-4 border-slate-900 transition-all duration-150 flex items-center justify-center shadow-md z-10"
                  style={{ top: 0, height: `${pistonHeight}px` }}
                >
                  <div className="w-4 h-16 bg-slate-500 rounded-sm mb-4"></div>
                </div>
              )}

              {/* Particle Renderings */}
              {selectedState === 'solid' && (
                <div className="p-4 grid grid-cols-5 gap-2 w-full justify-items-center">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-700 shadow-2xs border border-blue-900"
                    ></div>
                  ))}
                </div>
              )}

              {selectedState === 'liquid' && (
                <div className="p-4 flex flex-wrap gap-2.5 w-full justify-center bg-cyan-100/50 h-44 rounded-b-xl">
                  {Array.from({ length: 22 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-linear-to-br from-cyan-300 to-cyan-600 shadow-2xs border border-cyan-800 animate-pulse"
                    ></div>
                  ))}
                </div>
              )}

              {selectedState === 'gas' && (
                <div
                  className="p-3 relative w-full transition-all duration-150 flex flex-wrap items-center justify-around"
                  style={{ height: `${288 - pistonHeight}px` }}
                >
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-linear-to-br from-rose-400 to-rose-700 shadow-2xs border border-rose-900"
                    ></div>
                  ))}
                </div>
              )}
            </div>

            {/* Note on Gas Compression */}
            {selectedState === 'gas' && (
              <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-950 font-bold leading-relaxed">
                <strong>ملاحظة هامة (سؤال 20 في الامتحان):</strong> ماذا يحدث لحجم الغاز عندما يتم ضغطه؟<br />
                ➔ <strong>يقل الحجم</strong>؛ لأن المسافات بين جسيمات الغاز متباعدة جداً وقوى التجاذب بينها ضعيفة، مما يجعل الغاز قابلاً للانضغاط بسهولة.
              </div>
            )}
          </div>

          {/* State Controls */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-black text-slate-900 text-base border-b border-slate-100 pb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8A1538]" />
              <span>التحكم في حالات المادة</span>
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() => setSelectedState('solid')}
                className={`w-full p-3 rounded-2xl font-black text-xs sm:text-sm text-right transition-all cursor-pointer border-2 ${
                  selectedState === 'solid'
                    ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                • الحالة الصلبة (شكل وحجم ثابت، جسيمات متراصة)
              </button>

              <button
                onClick={() => setSelectedState('liquid')}
                className={`w-full p-3 rounded-2xl font-black text-xs sm:text-sm text-right transition-all cursor-pointer border-2 ${
                  selectedState === 'liquid'
                    ? 'border-cyan-600 bg-cyan-50 text-cyan-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                • الحالة السائلة (حجم ثابت، شكل غير ثابت)
              </button>

              <button
                onClick={() => setSelectedState('gas')}
                className={`w-full p-3 rounded-2xl font-black text-xs sm:text-sm text-right transition-all cursor-pointer border-2 ${
                  selectedState === 'gas'
                    ? 'border-rose-600 bg-rose-50 text-rose-900 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                • الحالة الغازية (شكل وحجم غير ثابتين، قابل للانضغاط)
              </button>
            </div>

            {selectedState === 'gas' && (
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-black text-slate-700">
                  <span className="flex items-center gap-1.5"><MoveDown className="w-4 h-4 text-[#8A1538]" /> قوة ضغط المكبس:</span>
                  <span>{Math.round((pistonHeight / 160) * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="160"
                  value={pistonHeight}
                  onChange={(e) => setPistonHeight(Number(e.target.value))}
                  className="w-full accent-[#8A1538] cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 font-medium">
                  حرّك المؤشر للأسفل لمشاهدة كيف يقل حجم الغاز مع تقارب الجسيمات.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
