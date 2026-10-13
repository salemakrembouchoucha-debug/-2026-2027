import React from 'react';

interface DiagramProps {
  id: string;
  className?: string;
}

export const ScienceDiagram: React.FC<DiagramProps> = ({ id, className = '' }) => {
  switch (id) {
    case 'three-states-particles':
      return (
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          {/* الشكل (1) - صلب */}
          <div className="flex flex-col items-center bg-white p-3 rounded-lg border border-slate-300 shadow-xs flex-1 max-w-[180px]">
            <svg viewBox="0 0 100 100" className="w-28 h-28">
              <rect x="5" y="5" width="90" height="90" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" rx="4" />
              {[15, 32, 50, 67, 84].map((y, rowIdx) =>
                [15, 32, 50, 67, 84].map((x, colIdx) => (
                  <circle
                    key={`${rowIdx}-${colIdx}`}
                    cx={x}
                    cy={y}
                    r="7.5"
                    fill="url(#solidGrad)"
                    stroke="#1e3a8a"
                    strokeWidth="0.8"
                  />
                ))
              )}
              <defs>
                <radialGradient id="solidGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mt-2 text-center">
              <span className="font-bold text-slate-800 text-sm">الشكل (1)</span>
              <p className="text-xs text-slate-500 font-medium">مادة صلبة</p>
            </div>
          </div>

          {/* الشكل (2) - سائل */}
          <div className="flex flex-col items-center bg-white p-3 rounded-lg border border-slate-300 shadow-xs flex-1 max-w-[180px]">
            <svg viewBox="0 0 100 100" className="w-28 h-28">
              <rect x="5" y="5" width="90" height="90" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" rx="4" />
              {[
                { x: 18, y: 55 }, { x: 33, y: 52 }, { x: 48, y: 56 }, { x: 65, y: 52 }, { x: 80, y: 55 },
                { x: 22, y: 69 }, { x: 38, y: 68 }, { x: 55, y: 70 }, { x: 72, y: 68 }, { x: 86, y: 71 },
                { x: 16, y: 84 }, { x: 32, y: 85 }, { x: 50, y: 84 }, { x: 68, y: 85 }, { x: 83, y: 84 },
                { x: 26, y: 40 }, { x: 43, y: 39 }, { x: 60, y: 41 }, { x: 77, y: 38 }
              ].map((pt, idx) => (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r="7.5"
                  fill="url(#liquidGrad)"
                  stroke="#0284c7"
                  strokeWidth="0.8"
                />
              ))}
              <defs>
                <radialGradient id="liquidGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#0284c7" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mt-2 text-center">
              <span className="font-bold text-slate-800 text-sm">الشكل (2)</span>
              <p className="text-xs text-slate-500 font-medium">مادة سائلة</p>
            </div>
          </div>

          {/* الشكل (3) - غاز */}
          <div className="flex flex-col items-center bg-white p-3 rounded-lg border border-slate-300 shadow-xs flex-1 max-w-[180px]">
            <svg viewBox="0 0 100 100" className="w-28 h-28">
              <rect x="5" y="5" width="90" height="90" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" rx="4" />
              {[
                { x: 22, y: 24, dx: 10, dy: -6 },
                { x: 74, y: 22, dx: -8, dy: -8 },
                { x: 30, y: 55, dx: -9, dy: 6 },
                { x: 78, y: 60, dx: 7, dy: 7 },
                { x: 50, y: 80, dx: 8, dy: -7 },
                { x: 20, y: 82, dx: -7, dy: -5 },
                { x: 68, y: 38, dx: -8, dy: 8 },
              ].map((pt, idx) => (
                <g key={idx}>
                  <line
                    x1={pt.x}
                    y1={pt.y}
                    x2={pt.x + pt.dx}
                    y2={pt.y + pt.dy}
                    stroke="#dc2626"
                    strokeWidth="1.5"
                    markerEnd="url(#arrow)"
                  />
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r="6.5"
                    fill="url(#gasGrad)"
                    stroke="#b91c1c"
                    strokeWidth="0.8"
                  />
                </g>
              ))}
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 1 L 9 5 L 0 9 z" fill="#dc2626" />
                </marker>
                <radialGradient id="gasGrad" cx="35%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="100%" stopColor="#dc2626" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mt-2 text-center">
              <span className="font-bold text-slate-800 text-sm">الشكل (3)</span>
              <p className="text-xs text-slate-500 font-medium">مادة غازية</p>
            </div>
          </div>
        </div>
      );

    case 'flask-gas-particles':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 140 140" className="w-36 h-36">
            <path
              d="M 60 15 L 60 40 L 25 115 A 10 10 0 0 0 35 125 L 105 125 A 10 10 0 0 0 115 115 L 80 40 L 80 15 Z"
              fill="none"
              stroke="#475569"
              strokeWidth="2.5"
            />
            {[
              { x: 50, y: 110 }, { x: 70, y: 115 }, { x: 90, y: 110 },
              { x: 40, y: 95 }, { x: 65, y: 90 }, { x: 88, y: 95 },
              { x: 55, y: 70 }, { x: 75, y: 65 },
              { x: 67, y: 45 }, { x: 72, y: 30 },
              { x: 70, y: 10, out: true }, { x: 65, y: -5, out: true },
            ].map((pt, idx) => (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r={pt.out ? 3.5 : 4}
                fill={pt.out ? '#ef4444' : '#f97316'}
                stroke="#b91c1c"
                strokeWidth="0.8"
              />
            ))}
          </svg>
          <span className="text-xs text-slate-600 font-semibold mt-1">انتشار جسيمات الغاز وخروجها من المخروط</span>
        </div>
      );

    case 'gas-sparse-box':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 120 100" className="w-36 h-32">
            <rect x="10" y="10" width="100" height="80" fill="#f8fafc" stroke="#334155" strokeWidth="2" rx="4" />
            <circle cx="28" cy="28" r="7" fill="#fb923c" stroke="#c2410c" strokeWidth="1" />
            <circle cx="92" cy="30" r="7" fill="#fb923c" stroke="#c2410c" strokeWidth="1" />
            <circle cx="35" cy="72" r="7" fill="#fb923c" stroke="#c2410c" strokeWidth="1" />
            <circle cx="90" cy="76" r="7" fill="#fb923c" stroke="#c2410c" strokeWidth="1" />
          </svg>
          <span className="text-xs text-slate-600 font-semibold mt-1">مخطط الجسيمات المتباعدة</span>
        </div>
      );

    case 'three-containers-states':
      return (
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <div className="flex flex-col items-center bg-white p-2.5 rounded-lg border border-slate-300 shadow-xs flex-1 max-w-[180px]">
            <svg viewBox="0 0 110 90" className="w-28 h-24">
              {[
                [15, 65], [30, 65], [45, 65], [60, 65], [75, 65], [90, 65],
                [18, 52], [33, 52], [48, 52], [63, 52], [78, 52], [93, 52],
                [15, 39], [30, 39], [45, 39], [60, 39], [75, 39], [90, 39]
              ].map(([x, y], idx) => (
                <ellipse key={idx} cx={x} cy={y} rx="6.5" ry="5" fill="#f87171" stroke="#b91c1c" strokeWidth="1" />
              ))}
            </svg>
            <span className="font-bold text-slate-800 text-sm mt-1">الشكل (1)</span>
          </div>

          <div className="flex flex-col items-center bg-white p-2.5 rounded-lg border border-slate-300 shadow-xs flex-1 max-w-[180px]">
            <svg viewBox="0 0 110 90" className="w-28 h-24">
              <path d="M 15 20 L 15 78 A 8 8 0 0 0 23 85 L 87 85 A 8 8 0 0 0 95 78 L 95 20" fill="none" stroke="#64748b" strokeWidth="2" />
              <rect x="17" y="38" width="76" height="45" fill="#bae6fd" opacity="0.4" rx="2" />
              {[
                { x: 26, y: 78 }, { x: 42, y: 77 }, { x: 58, y: 78 }, { x: 74, y: 76 }, { x: 86, y: 78 },
                { x: 23, y: 64 }, { x: 38, y: 65 }, { x: 55, y: 63 }, { x: 71, y: 65 }, { x: 87, y: 64 },
                { x: 30, y: 50 }, { x: 47, y: 51 }, { x: 65, y: 50 }, { x: 81, y: 51 }
              ].map((pt, idx) => (
                <ellipse key={idx} cx={pt.x} cy={pt.y} rx="6" ry="4.5" fill="#fb923c" stroke="#c2410c" strokeWidth="0.8" />
              ))}
            </svg>
            <span className="font-bold text-slate-800 text-sm mt-1">الشكل (2)</span>
          </div>

          <div className="flex flex-col items-center bg-white p-2.5 rounded-lg border border-slate-300 shadow-xs flex-1 max-w-[180px]">
            <svg viewBox="0 0 110 90" className="w-28 h-24">
              <path d="M 50 10 L 50 30 L 25 80 A 6 6 0 0 0 31 87 L 79 87 A 6 6 0 0 0 85 80 L 60 30 L 60 10 Z" fill="none" stroke="#64748b" strokeWidth="1.8" />
              {[
                { x: 38, y: 80 }, { x: 55, y: 82 }, { x: 72, y: 79 },
                { x: 45, y: 68 }, { x: 65, y: 67 },
                { x: 54, y: 52 },
                { x: 55, y: 35 }, { x: 53, y: 18 }, { x: 56, y: 5 }
              ].map((pt, idx) => (
                <circle key={idx} cx={pt.x} cy={pt.y} r="3.8" fill="#ef4444" stroke="#991b1b" strokeWidth="0.8" />
              ))}
            </svg>
            <span className="font-bold text-slate-800 text-sm mt-1">الشكل (3)</span>
          </div>
        </div>
      );

    case 'permanganate-beakers':
      return (
        <div className={`flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 340 190" className="w-80 sm:w-96 max-w-full">
            <defs>
              <linearGradient id="violetFullGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#6b21a8" stopOpacity="0.95" />
              </linearGradient>
              <marker
                id="beakerArrowHead"
                viewBox="0 0 10 10"
                refX="2"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto"
              >
                <path d="M 10 1 L 0 5 L 10 9 z" fill="#1e293b" />
              </marker>
            </defs>

            {/* ======================================================== */}
            {/* السهم في الأعلى: يشير من الكأس الأيمن إلى الكأس الأيسر */}
            {/* ======================================================== */}
            <g>
              {/* نص 'بعد عدة دقائق' في الأعلى فوق السهم */}
              <rect x="110" y="4" width="120" height="22" rx="6" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
              <text
                x="170"
                y="19"
                textAnchor="middle"
                fill="#1e293b"
                fontSize="12"
                fontWeight="900"
                fontFamily="sans-serif"
              >
                بعد عدة دقائق
              </text>

              {/* خط السهم الأفقي في الأعلى يتجه من اليمين إلى اليسار */}
              <line
                x1="225"
                y1="34"
                x2="115"
                y2="34"
                stroke="#1e293b"
                strokeWidth="2.5"
                markerEnd="url(#beakerArrowHead)"
              />
            </g>

            {/* ======================================================== */}
            {/* الكأس الأيمن: عند وضع بلورة برمنجنات البوتاسيوم في البداية */}
            {/* ======================================================== */}
            <g transform="translate(195, 45)">
              {/* Glass Beaker Body */}
              <path
                d="M 15 10 L 15 100 A 10 10 0 0 0 25 110 L 85 110 A 10 10 0 0 0 95 100 L 95 10"
                fill="none"
                stroke="#475569"
                strokeWidth="2.5"
              />
              <path d="M 10 10 L 20 10 M 90 10 L 100 10" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

              {/* Water */}
              <rect x="17.5" y="25" width="75" height="83" fill="#e0f2fe" opacity="0.45" rx="3" />

              {/* Graduations */}
              <line x1="20" y1="45" x2="32" y2="45" stroke="#64748b" strokeWidth="1.2" />
              <text x="35" y="48" fontSize="8" fill="#64748b" fontWeight="bold">300 mL</text>
              <line x1="20" y1="65" x2="30" y2="65" stroke="#64748b" strokeWidth="1.2" />
              <text x="33" y="68" fontSize="8" fill="#64748b" fontWeight="bold">200</text>
              <line x1="20" y1="85" x2="28" y2="85" stroke="#64748b" strokeWidth="1.2" />
              <text x="31" y="88" fontSize="8" fill="#64748b" fontWeight="bold">100</text>

              {/* Potassium Permanganate Crystal at Bottom */}
              <rect x="47" y="100" width="16" height="8" fill="#4a044e" rx="2" stroke="#2e1065" strokeWidth="1" />

              {/* Rising purple dissolution wisps */}
              <path
                d="M 55 100 Q 48 75 56 55 Q 62 40 54 30"
                stroke="#7e22ce"
                strokeWidth="6"
                opacity="0.6"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 50 100 Q 36 82 40 65"
                stroke="#9333ea"
                strokeWidth="3.5"
                opacity="0.5"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 60 100 Q 72 82 66 65"
                stroke="#9333ea"
                strokeWidth="3.5"
                opacity="0.5"
                fill="none"
                strokeLinecap="round"
              />

              {/* Label */}
              <text x="55" y="128" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">
                عند وضع البلورة في الماء
              </text>
            </g>

            {/* ======================================================== */}
            {/* الكأس الأيسر: بعد عدة دقائق - انتشار اللون البنفسجي بالكامل */}
            {/* ======================================================== */}
            <g transform="translate(35, 45)">
              {/* Glass Beaker Body */}
              <path
                d="M 15 10 L 15 100 A 10 10 0 0 0 25 110 L 85 110 A 10 10 0 0 0 95 100 L 95 10"
                fill="none"
                stroke="#475569"
                strokeWidth="2.5"
              />
              <path d="M 10 10 L 20 10 M 90 10 L 100 10" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />

              {/* Fully diffuse violet liquid */}
              <rect x="17.5" y="25" width="75" height="83" fill="url(#violetFullGrad)" rx="3" />

              {/* Graduations */}
              <line x1="20" y1="45" x2="32" y2="45" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
              <text x="35" y="48" fontSize="8" fill="#ffffff" fontWeight="bold" opacity="0.9">300 mL</text>
              <line x1="20" y1="65" x2="30" y2="65" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
              <text x="33" y="68" fontSize="8" fill="#ffffff" fontWeight="bold" opacity="0.9">200</text>
              <line x1="20" y1="85" x2="28" y2="85" stroke="#ffffff" strokeWidth="1.2" opacity="0.8" />
              <text x="31" y="88" fontSize="8" fill="#ffffff" fontWeight="bold" opacity="0.9">100</text>

              {/* Label */}
              <text x="55" y="128" textAnchor="middle" fill="#334155" fontSize="10" fontWeight="bold">
                انتشار اللون في كامل الماء
              </text>
            </g>
          </svg>
        </div>
      );

    case 'copper-sulfate-tubes':
      return (
        <div className={`flex items-center justify-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 40 120" className="w-16 h-36">
              <path d="M 8 10 L 8 100 A 12 12 0 0 0 32 100 L 32 10 Z" fill="none" stroke="#475569" strokeWidth="2.5" />
              <path d="M 10 25 L 10 100 A 10 10 0 0 0 30 100 L 30 25 Z" fill="#0369a1" />
              <ellipse cx="20" cy="25" rx="10" ry="2.5" fill="#0284c7" />
            </svg>
            <span className="font-extrabold text-slate-900 text-base mt-2 bg-blue-100 text-blue-900 px-3 py-0.5 rounded-full border border-blue-300">
              A (الأعلى تركيزاً)
            </span>
          </div>

          <div className="flex flex-col items-center">
            <svg viewBox="0 0 40 120" className="w-16 h-36">
              <path d="M 8 10 L 8 100 A 12 12 0 0 0 32 100 L 32 10 Z" fill="none" stroke="#475569" strokeWidth="2.5" />
              <path d="M 10 25 L 10 100 A 10 10 0 0 0 30 100 L 30 25 Z" fill="#38bdf8" />
              <ellipse cx="20" cy="25" rx="10" ry="2.5" fill="#7dd3fc" />
            </svg>
            <span className="font-extrabold text-slate-900 text-base mt-2 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-300">
              B
            </span>
          </div>

          <div className="flex flex-col items-center">
            <svg viewBox="0 0 40 120" className="w-16 h-36">
              <path d="M 8 10 L 8 100 A 12 12 0 0 0 32 100 L 32 10 Z" fill="none" stroke="#475569" strokeWidth="2.5" />
              <path d="M 10 25 L 10 100 A 10 10 0 0 0 30 100 L 30 25 Z" fill="#e0f2fe" opacity="0.8" />
              <ellipse cx="20" cy="25" rx="10" ry="2.5" fill="#bae6fd" />
            </svg>
            <span className="font-extrabold text-slate-900 text-base mt-2 bg-slate-100 px-3 py-0.5 rounded-full border border-slate-300">
              C (الأقل تركيزاً)
            </span>
          </div>
        </div>
      );

    // ========================================================
    // السؤال 31: المجهر الضوئي - الحرف A يشير إلى العدسة العينية
    // ========================================================
    case 'microscope-basic':
    case 'microscope-mcq-a':
      return (
        <div className={`relative flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 280 280" className="w-64 h-64 max-w-full">
            {/* Base */}
            <path d="M 50 250 C 50 235 90 230 140 230 C 190 230 230 235 230 250 L 235 262 L 45 262 Z" fill="#334155" stroke="#0f172a" strokeWidth="2" />
            {/* Mirror / Light Source */}
            <rect x="120" y="210" width="30" height="20" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
            <circle cx="135" cy="220" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />

            {/* Stage */}
            <rect x="70" y="155" width="105" height="12" rx="2" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            <rect x="95" y="152" width="25" height="3" fill="#94a3b8" />

            {/* Arm */}
            <path d="M 175 230 C 220 220 225 120 170 85 L 150 85" fill="none" stroke="#475569" strokeWidth="20" strokeLinecap="round" />

            {/* Coarse adjustment knob */}
            <circle cx="185" cy="170" r="16" fill="#64748b" stroke="#0f172a" strokeWidth="2" />
            <circle cx="185" cy="170" r="10" fill="#475569" />

            {/* Fine adjustment knob */}
            <circle cx="185" cy="170" r="6" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />

            {/* Body tube */}
            <rect x="135" y="45" width="26" height="65" transform="rotate(-15 148 77)" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />

            {/* Eyepiece / عدسة عينية */}
            <rect x="148" y="18" width="18" height="32" transform="rotate(-15 157 34)" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" rx="2" />
            <ellipse cx="163" cy="22" rx="10" ry="4" transform="rotate(-15 163 22)" fill="#38bdf8" />

            {/* Revolving Nosepiece */}
            <circle cx="130" cy="115" r="15" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />

            {/* Objective Lenses */}
            <rect x="115" y="122" width="10" height="26" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="132" y="124" width="9" height="22" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.5" />

            {/* Pointer A directly to Eyepiece (عدسة عينية) for Q31 */}
            <line x1="172" y1="28" x2="235" y2="28" stroke="#b91c1c" strokeWidth="2.5" />
            <circle cx="172" cy="28" r="3.5" fill="#b91c1c" />
            <rect x="235" y="13" width="30" height="30" fill="#b91c1c" rx="6" />
            <text x="250" y="34" fill="white" fontWeight="900" fontSize="18" textAnchor="middle">A</text>
          </svg>
          <span className="text-xs text-slate-700 font-bold mt-1">
            الشكل: المجهر الضوئي المركّب (الحرف A يشير إلى العدسة العينية)
          </span>
        </div>
      );

    // ========================================================
    // السؤال المقالي الخاص بالمجهر: الأحرف (D, B, C, E, F)
    // ========================================================
    case 'microscope-letters':
    case 'microscope-functions':
      return (
        <div className={`relative flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 280 280" className="w-64 h-64 max-w-full">
            <path d="M 50 250 C 50 235 90 230 140 230 C 190 230 230 235 230 250 L 235 262 L 45 262 Z" fill="#334155" stroke="#0f172a" strokeWidth="2" />
            <rect x="120" y="210" width="30" height="20" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
            <circle cx="135" cy="220" r="6" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />

            <rect x="70" y="155" width="105" height="12" rx="2" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
            <rect x="95" y="152" width="25" height="3" fill="#94a3b8" />

            <path d="M 175 230 C 220 220 225 120 170 85 L 150 85" fill="none" stroke="#475569" strokeWidth="20" strokeLinecap="round" />

            <circle cx="185" cy="170" r="16" fill="#64748b" stroke="#0f172a" strokeWidth="2" />
            <circle cx="185" cy="170" r="10" fill="#475569" />

            <circle cx="185" cy="170" r="6" fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />

            <rect x="135" y="45" width="26" height="65" transform="rotate(-15 148 77)" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />

            <rect x="148" y="18" width="18" height="32" transform="rotate(-15 157 34)" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" rx="2" />
            <ellipse cx="163" cy="22" rx="10" ry="4" transform="rotate(-15 163 22)" fill="#38bdf8" />

            <circle cx="130" cy="115" r="15" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />

            <rect x="115" y="122" width="10" height="26" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="132" y="124" width="9" height="22" fill="#94a3b8" stroke="#1e293b" strokeWidth="1.5" />

            {/* Pointer D: Eyepiece عدسة عينية */}
            <line x1="172" y1="28" x2="235" y2="28" stroke="#dc2626" strokeWidth="2" />
            <circle cx="172" cy="28" r="2.5" fill="#dc2626" />
            <rect x="235" y="16" width="24" height="24" fill="#dc2626" rx="4" />
            <text x="247" y="33" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">D</text>

            {/* Pointer E: Coarse adjustment ضابط كبير */}
            <line x1="202" y1="165" x2="235" y2="165" stroke="#dc2626" strokeWidth="2" />
            <circle cx="202" cy="165" r="2.5" fill="#dc2626" />
            <rect x="235" y="153" width="24" height="24" fill="#dc2626" rx="4" />
            <text x="247" y="170" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">E</text>

            {/* Pointer F: Fine adjustment ضابط صغير */}
            <line x1="192" y1="180" x2="235" y2="200" stroke="#dc2626" strokeWidth="2" />
            <circle cx="192" cy="180" r="2.5" fill="#dc2626" />
            <rect x="235" y="188" width="24" height="24" fill="#dc2626" rx="4" />
            <text x="247" y="205" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">F</text>

            {/* Pointer C: Objective lens عدسة شيئية */}
            <line x1="112" y1="135" x2="35" y2="110" stroke="#dc2626" strokeWidth="2" />
            <circle cx="112" cy="135" r="2.5" fill="#dc2626" />
            <rect x="15" y="98" width="24" height="24" fill="#dc2626" rx="4" />
            <text x="27" y="115" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">C</text>

            {/* Pointer B: Stage منضدة */}
            <line x1="68" y1="160" x2="25" y2="160" stroke="#dc2626" strokeWidth="2" />
            <circle cx="68" cy="160" r="2.5" fill="#dc2626" />
            <rect x="15" y="148" width="24" height="24" fill="#dc2626" rx="4" />
            <text x="27" y="165" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">B</text>

            {/* Pointer A: Base/Light مصدر الضوء/القاعدة */}
            <line x1="118" y1="220" x2="35" y2="220" stroke="#dc2626" strokeWidth="2" />
            <circle cx="118" cy="220" r="2.5" fill="#dc2626" />
            <rect x="15" y="208" width="24" height="24" fill="#dc2626" rx="4" />
            <text x="27" y="225" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">A</text>
          </svg>
          <span className="text-xs text-slate-600 font-semibold mt-1">المجهر الضوئي المركّب وأجزاؤه</span>
        </div>
      );

    // ========================================================
    // السؤال 37: الخلية النباتية - الرمز A يشير صراحةً للنواة (Nucleus)
    // ========================================================
    case 'plant-cell-pointing-nucleus':
      return (
        <div className={`relative flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 250 220" className="w-64 h-56 max-w-full">
            {/* Outer Wall (الجدار الخلوي) */}
            <rect x="25" y="20" width="180" height="175" rx="25" fill="#86efac" stroke="#16a34a" strokeWidth="7" />
            {/* Cell Membrane (الغشاء الخلوي) */}
            <rect x="34" y="29" width="162" height="157" rx="18" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />

            {/* Large Central Vacuole (الفجوة العصارية) */}
            <path
              d="M 55 65 C 55 45 105 45 110 65 C 115 95 115 145 85 155 C 60 160 52 115 55 65 Z"
              fill="#bae6fd"
              stroke="#0284c7"
              strokeWidth="2.5"
            />

            {/* Chloroplasts (البلاستيدات الخضراء) */}
            <ellipse cx="60" cy="40" rx="14" ry="8" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
            <ellipse cx="160" cy="145" rx="14" ry="8" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
            <ellipse cx="65" cy="150" rx="14" ry="8" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />

            {/* Mitochondria (الميتوكوندريا) */}
            <ellipse cx="145" cy="40" rx="11" ry="6" fill="#fca5a5" stroke="#dc2626" strokeWidth="1.2" />

            {/* Nucleus (النواة) - Outside the vacuole, in cytoplasm */}
            <circle cx="150" cy="85" r="24" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="2.5" />
            <circle cx="150" cy="85" r="9" fill="#7e22ce" />

            {/* Line with Letter A pointing unambiguously to the Nucleus (النواة) */}
            <line x1="168" y1="85" x2="225" y2="85" stroke="#b91c1c" strokeWidth="2.5" />
            <circle cx="168" cy="85" r="3.5" fill="#b91c1c" />
            <rect x="225" y="70" width="30" height="30" fill="#b91c1c" rx="6" />
            <text x="240" y="91" fill="white" fontWeight="900" fontSize="18" textAnchor="middle">A</text>
          </svg>
          <span className="text-xs text-slate-700 font-bold mt-1">
            الشكل التخطيطي للخلية النباتية (الحرف A يشير إلى النواة)
          </span>
        </div>
      );

    // ========================================================
    // سؤال الخلية النباتية بالأحرف (A: فجوة، B: جدار، C: نواة، D: بلاستيدة)
    // ========================================================
    case 'plant-cell-abcd':
      return (
        <div className={`relative flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 250 220" className="w-64 h-56 max-w-full">
            {/* Cell Wall (B) */}
            <rect x="25" y="20" width="180" height="175" rx="25" fill="#86efac" stroke="#16a34a" strokeWidth="7" />
            <rect x="34" y="29" width="162" height="157" rx="18" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />

            {/* Large Vacuole (A) */}
            <path
              d="M 55 65 C 55 45 105 45 110 65 C 115 95 115 145 85 155 C 60 160 52 115 55 65 Z"
              fill="#bae6fd"
              stroke="#0284c7"
              strokeWidth="2.5"
            />

            {/* Nucleus (C) */}
            <circle cx="150" cy="85" r="24" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="2.5" />
            <circle cx="150" cy="85" r="9" fill="#7e22ce" />

            {/* Chloroplast (D) */}
            <ellipse cx="60" cy="40" rx="14" ry="8" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />
            <ellipse cx="160" cy="145" rx="14" ry="8" fill="#22c55e" stroke="#15803d" strokeWidth="1.5" />

            {/* Pointer A -> Vacuole */}
            <line x1="85" y1="105" x2="35" y2="105" stroke="#dc2626" strokeWidth="2" />
            <circle cx="85" cy="105" r="2.5" fill="#dc2626" />
            <rect x="12" y="93" width="22" height="22" fill="#ef4444" rx="4" />
            <text x="23" y="109" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">A</text>

            {/* Pointer B -> Cell wall */}
            <line x1="25" y1="160" x2="2" y2="160" stroke="#dc2626" strokeWidth="2" />
            <circle cx="25" cy="160" r="2.5" fill="#dc2626" />
            <rect x="-18" y="148" width="22" height="22" fill="#ef4444" rx="4" />
            <text x="-7" y="164" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">B</text>

            {/* Pointer C -> Nucleus */}
            <line x1="168" y1="72" x2="215" y2="55" stroke="#dc2626" strokeWidth="2" />
            <circle cx="168" cy="72" r="2.5" fill="#dc2626" />
            <rect x="215" y="44" width="22" height="22" fill="#ef4444" rx="4" />
            <text x="226" y="60" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">C</text>

            {/* Pointer D -> Chloroplast */}
            <line x1="170" y1="140" x2="215" y2="140" stroke="#dc2626" strokeWidth="2" />
            <circle cx="170" cy="140" r="2.5" fill="#dc2626" />
            <rect x="215" y="128" width="22" height="22" fill="#ef4444" rx="4" />
            <text x="226" y="144" fill="white" fontWeight="bold" fontSize="14" textAnchor="middle">D</text>
          </svg>
          <span className="text-xs text-slate-600 font-semibold mt-1">الشكل التخطيطي للخلية النباتية وعضياتها</span>
        </div>
      );

    case 'two-cells-comparison':
    case 'plant-animal-cell-labeling':
      return (
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          {/* الشكل (1): خلية حيوانية */}
          <div className="flex flex-col items-center bg-white p-3 rounded-lg border border-slate-300 shadow-xs flex-1 max-w-[210px]">
            <svg viewBox="0 0 160 150" className="w-36 h-36">
              <circle cx="80" cy="75" r="62" fill="#fed7aa" stroke="#ea580c" strokeWidth="3" />
              <circle cx="80" cy="75" r="22" fill="#f472b6" stroke="#db2777" strokeWidth="2" />
              <circle cx="80" cy="75" r="8" fill="#9d174d" />
              <ellipse cx="45" cy="50" rx="10" ry="6" fill="#f87171" stroke="#b91c1c" strokeWidth="1" />
              <ellipse cx="115" cy="100" rx="10" ry="6" fill="#f87171" stroke="#b91c1c" strokeWidth="1" />
              <ellipse cx="48" cy="105" rx="9" ry="5" fill="#f87171" stroke="#b91c1c" strokeWidth="1" />
            </svg>
            <span className="font-bold text-slate-800 text-sm mt-1">الشكل (1)</span>
            <span className="text-xs text-slate-500 font-medium">خلية حيوانية</span>
          </div>

          {/* الشكل (2): خلية نباتية */}
          <div className="flex flex-col items-center bg-white p-3 rounded-lg border border-slate-300 shadow-xs flex-1 max-w-[210px]">
            <svg viewBox="0 0 160 150" className="w-36 h-36">
              <rect x="15" y="12" width="130" height="126" rx="20" fill="#bbf7d0" stroke="#16a34a" strokeWidth="6" />
              <rect x="22" y="19" width="116" height="112" rx="14" fill="#dcfce7" stroke="#22c55e" strokeWidth="1.5" />
              <path d="M 35 45 C 35 30 75 30 80 50 C 85 80 85 110 60 115 C 40 120 35 85 35 45 Z" fill="#7dd3fc" stroke="#0284c7" strokeWidth="2" opacity="0.8" />
              <circle cx="108" cy="58" r="16" fill="#c084fc" stroke="#7e22ce" strokeWidth="2" />
              <circle cx="108" cy="58" r="6" fill="#6b21a8" />
              <ellipse cx="42" cy="28" rx="9" ry="5" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
              <ellipse cx="112" cy="105" rx="9" ry="5" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
              <ellipse cx="50" cy="120" rx="9" ry="5" fill="#22c55e" stroke="#15803d" strokeWidth="1" />
            </svg>
            <span className="font-bold text-slate-800 text-sm mt-1">الشكل (2)</span>
            <span className="text-xs text-slate-500 font-medium">خلية نباتية</span>
          </div>
        </div>
      );

    case 'four-specialized-cells':
      return (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <div className="flex flex-col items-center bg-white p-2.5 rounded-lg border border-slate-200 text-center">
            <svg viewBox="0 0 100 85" className="w-24 h-20">
              <circle cx="35" cy="40" r="12" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
              <circle cx="35" cy="40" r="4" fill="#c2410c" />
              <path d="M 24 35 L 10 25 M 26 48 L 12 55 M 35 28 L 30 14 M 40 29 L 48 16" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
              <path d="M 47 40 L 85 40 M 85 40 L 95 32 M 85 40 L 95 48" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span className="font-bold text-xs text-slate-800 mt-1">الخلية العصبية</span>
          </div>

          <div className="flex flex-col items-center bg-white p-2.5 rounded-lg border border-slate-200 text-center">
            <svg viewBox="0 0 100 85" className="w-24 h-20">
              <rect x="20" y="25" width="28" height="50" rx="3" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.5" />
              <circle cx="34" cy="55" r="6" fill="#6b21a8" />
              <rect x="52" y="25" width="28" height="50" rx="3" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.5" />
              <circle cx="66" cy="55" r="6" fill="#6b21a8" />
              {[22, 26, 30, 34, 38, 42, 46, 54, 58, 62, 66, 70, 74, 78].map((x, i) => (
                <line key={i} x1={x} y1="25" x2={x - 2} y2="14" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" />
              ))}
            </svg>
            <span className="font-bold text-xs text-slate-800 mt-1">الخلايا الطلائية المهدبة</span>
          </div>

          <div className="flex flex-col items-center bg-white p-2.5 rounded-lg border border-slate-200 text-center">
            <svg viewBox="0 0 100 85" className="w-24 h-20">
              <circle cx="50" cy="45" r="30" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
              <circle cx="50" cy="45" r="24" fill="#fde047" opacity="0.9" />
              <circle cx="26" cy="35" r="5" fill="#854d0e" />
            </svg>
            <span className="font-bold text-xs text-slate-800 mt-1">الخلايا الدهنية</span>
          </div>

          <div className="flex flex-col items-center bg-white p-2.5 rounded-lg border border-slate-200 text-center">
            <svg viewBox="0 0 100 85" className="w-24 h-20">
              <circle cx="40" cy="42" r="22" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
              <ellipse cx="40" cy="42" rx="11" ry="8" fill="#fca5a5" />
              <circle cx="70" cy="55" r="16" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.8" />
              <ellipse cx="70" cy="55" rx="8" ry="6" fill="#fca5a5" />
            </svg>
            <span className="font-bold text-xs text-slate-800 mt-1">خلايا الدم الحمراء</span>
          </div>
        </div>
      );

    // ========================================================
    // السؤال 41: خلية الشعيرة الجذرية المحسنة
    // النواة خارج الفجوة العصارية بوضوح تام، والحرف A يشير إلى الفجوة العصارية
    // ========================================================
    case 'root-hair-mcq-pointing-vacuole':
      return (
        <div className={`relative flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 320 160" className="w-80 h-40 max-w-full">
            {/* Soil particles (حبيبات التربة) */}
            {[
              [200, 25, 14], [245, 20, 16], [290, 30, 15],
              [220, 75, 12], [265, 80, 15], [305, 85, 13],
              [200, 130, 15], [250, 135, 16], [295, 125, 14]
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill="#d97706" opacity="0.3" stroke="#92400e" strokeWidth="1.2" />
            ))}
            <text x="250" y="80" fill="#92400e" fontSize="13" fontWeight="bold" textAnchor="middle">تربة</text>

            {/* Cell Wall (الجدار الخلوي) - Outer boundary */}
            <path
              d="M 20 20 L 80 20 L 110 40 L 260 55 A 25 25 0 0 1 260 105 L 110 120 L 80 140 L 20 140 Z"
              fill="#ecfccb"
              stroke="#65a30d"
              strokeWidth="4"
            />

            {/* Plasma Membrane & Cytoplasm (الغشاء والسيتوبلازم) */}
            <path
              d="M 26 26 L 78 26 L 108 44 L 255 59 A 20 20 0 0 1 255 101 L 108 116 L 78 134 L 26 134 Z"
              fill="#fef08a"
              stroke="#84cc16"
              strokeWidth="1.5"
            />

            {/* Elongated Vacuole (الفجوة العصارية) - Strictly does NOT contain nucleus */}
            <path
              d="M 70 52 L 105 52 L 125 58 L 245 68 A 12 12 0 0 1 245 92 L 125 102 L 105 108 L 70 108 Z"
              fill="#bae6fd"
              stroke="#0284c7"
              strokeWidth="2"
            />

            {/* Nucleus (النواة) - Clearly OUTSIDE the vacuole, in the cytoplasm near the cell base */}
            <circle cx="45" cy="80" r="14" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="2.5" />
            <circle cx="45" cy="80" r="5" fill="#6b21a8" />
            <text x="45" y="110" fill="#6b21a8" fontSize="10" fontWeight="bold" textAnchor="middle">النواة (خارج الفجوة)</text>

            {/* Pointer A directly to the Vacuole (الفجوة العصارية) */}
            <line x1="175" y1="80" x2="175" y2="18" stroke="#b91c1c" strokeWidth="2.5" />
            <circle cx="175" cy="80" r="3.5" fill="#b91c1c" />
            <rect x="160" y="2" width="30" height="30" fill="#b91c1c" rx="6" />
            <text x="175" y="23" fill="white" fontWeight="900" fontSize="18" textAnchor="middle">A</text>
          </svg>
          <span className="text-xs text-slate-700 font-bold mt-1">
            خلية شعيرة جذرية ممتدة (الحرف A يشير إلى الفجوة العصارية، والنواة خارج الفجوة)
          </span>
        </div>
      );

    // ========================================================
    // السؤال المقالي الخاص بخلية الشعيرة الجذرية: الأحرف (A, B, C)
    // A: النواة (خارج الفجوة في السيتوبلازم)، B: السيتوبلازم/الغشاء، C: الفجوة العصارية
    // ========================================================
    case 'root-hair-labeled-abc':
      return (
        <div className={`relative flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 320 160" className="w-80 h-40 max-w-full">
            {/* Soil particles */}
            {[
              [200, 25, 14], [245, 20, 16], [290, 30, 15],
              [220, 75, 12], [265, 80, 15], [305, 85, 13],
              [200, 130, 15], [250, 135, 16], [295, 125, 14]
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill="#d97706" opacity="0.3" stroke="#92400e" strokeWidth="1.2" />
            ))}
            <text x="250" y="80" fill="#92400e" fontSize="13" fontWeight="bold" textAnchor="middle">تربة</text>

            {/* Cell wall */}
            <path
              d="M 20 20 L 80 20 L 110 40 L 260 55 A 25 25 0 0 1 260 105 L 110 120 L 80 140 L 20 140 Z"
              fill="#ecfccb"
              stroke="#65a30d"
              strokeWidth="4"
            />

            {/* Cytoplasm */}
            <path
              d="M 26 26 L 78 26 L 108 44 L 255 59 A 20 20 0 0 1 255 101 L 108 116 L 78 134 L 26 134 Z"
              fill="#fef08a"
              stroke="#84cc16"
              strokeWidth="1.5"
            />

            {/* Elongated Vacuole (C) */}
            <path
              d="M 70 52 L 105 52 L 125 58 L 245 68 A 12 12 0 0 1 245 92 L 125 102 L 105 108 L 70 108 Z"
              fill="#bae6fd"
              stroke="#0284c7"
              strokeWidth="2"
            />

            {/* Nucleus (A) - Clearly OUTSIDE vacuole, in cytoplasm */}
            <circle cx="45" cy="80" r="14" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="2.5" />
            <circle cx="45" cy="80" r="5" fill="#6b21a8" />

            {/* Pointer A -> Nucleus (النواة) */}
            <line x1="45" y1="66" x2="45" y2="15" stroke="#b91c1c" strokeWidth="2.5" />
            <circle cx="45" cy="66" r="3" fill="#b91c1c" />
            <rect x="33" y="2" width="24" height="24" fill="#b91c1c" rx="5" />
            <text x="45" y="19" fill="white" fontWeight="bold" fontSize="15" textAnchor="middle">A</text>

            {/* Pointer B -> Cytoplasm (السيتوبلازم/الغشاء) */}
            <line x1="30" y1="125" x2="10" y2="150" stroke="#b91c1c" strokeWidth="2" />
            <circle cx="30" cy="125" r="3" fill="#b91c1c" />
            <rect x="2" y="138" width="22" height="22" fill="#b91c1c" rx="4" />
            <text x="13" y="154" fill="white" fontWeight="bold" fontSize="13" textAnchor="middle">B</text>

            {/* Pointer C -> Vacuole (الفجوة العصارية) */}
            <line x1="175" y1="80" x2="175" y2="18" stroke="#b91c1c" strokeWidth="2.5" />
            <circle cx="175" cy="80" r="3.5" fill="#b91c1c" />
            <rect x="163" y="2" width="24" height="24" fill="#b91c1c" rx="5" />
            <text x="175" y="19" fill="white" fontWeight="bold" fontSize="15" textAnchor="middle">C</text>
          </svg>
          <span className="text-xs text-slate-700 font-bold mt-1">
            الشكل: خلية شعيرة جذرية (A: النواة في السيتوبلازم خارج الفجوة، B: السيتوبلازم، C: الفجوة العصارية)
          </span>
        </div>
      );

    case 'neuron-cell-diagram':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 160 100" className="w-40 h-28">
            <circle cx="45" cy="45" r="16" fill="#fde68a" stroke="#d97706" strokeWidth="2" />
            <circle cx="45" cy="45" r="6" fill="#b45309" />
            <path d="M 32 35 L 15 20 M 35 55 L 18 68 M 45 28 L 40 10 M 52 30 L 65 14" stroke="#d97706" strokeWidth="2" strokeLinecap="round" />
            <text x="10" y="14" fill="#92400e" fontSize="8" fontWeight="bold">تشعبات تستقبل الإشارات</text>
            <path d="M 61 45 L 130 45" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <path d="M 130 45 L 148 35 M 130 45 L 148 55" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
            <text x="80" y="38" fill="#0369a1" fontSize="8" fontWeight="bold">ترسل الإشارات</text>
          </svg>
          <span className="text-xs text-slate-600 font-semibold mt-1">خلية عصبية متخصصة</span>
        </div>
      );

    case 'orange-powder-cup':
      return (
        <div className={`flex flex-col items-center justify-center p-3 bg-slate-50 rounded-xl border border-slate-200 ${className}`}>
          <svg viewBox="0 0 100 110" className="w-28 h-32">
            <path d="M 18 15 L 26 95 A 10 10 0 0 0 36 104 L 64 104 A 10 10 0 0 0 74 95 L 82 15" fill="none" stroke="#64748b" strokeWidth="2" />
            <path d="M 20 30 L 26 95 A 8 8 0 0 0 34 102 L 66 102 A 8 8 0 0 0 74 95 L 80 30 Z" fill="#fed7aa" opacity="0.4" />
            <path d="M 35 35 Q 50 65 50 95 Q 65 65 65 35" fill="#f97316" opacity="0.75" />
            <text x="18" y="24" fill="#c2410c" fontSize="9" fontWeight="bold">مسحوق بُرتقال</text>
          </svg>
          <span className="text-xs text-slate-600 font-semibold mt-1">تغير لون الماء عند ذوبان وانتشار المسحوق</span>
        </div>
      );

    default:
      return null;
  }
};
