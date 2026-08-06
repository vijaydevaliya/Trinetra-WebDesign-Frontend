import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SUBSIDIARIES } from '../../data/companies';

/* ==========================================================================
   TRINETRA TECHNOWORLD — "Big Bang" hero
   Parent mark ignites at the centre, then Vasuki / Vishwakarma / Tribond are
   thrown outward onto their own elliptical orbits.
   ========================================================================== */

const MAIN_LOGO = '/logos/main_logo (1).png';
const CHILD_LOGOS = {
  vasuki: '/logos/vasuki-transparent.png',
  vishwakarma: '/logos/vishwakarma-transparent.png',
  tribond: '/logos/tribond-transparent.png',
};

/* ------------------------------------------------------------------ tokens */
const C = {
  void: '#050A14',
  deep: '#0A1A31',
  cyan: '#67DFE8',
  sky: '#3F9ADA',
  blue: '#1B5FBF',
  ink: '#12408F',
  paper: '#E8F4FA',
};

/* main_logo.png bakes the "TRINETRA TECHNOWORLD PVT LTD" wordmark in below
   the icon (711x604 total). We only want the icon for the core mark, so it
   gets cropped to the icon band (0-405px) instead of the full artwork. */
const AR_ICON = 711 / 405;

const CHILD_TINTS = [C.cyan, C.sky, C.blue];
const CHILD_PHASES = [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6];

const CHILDREN = SUBSIDIARIES.map((sub, i) => ({
  id: sub.id,
  name: sub.name,
  route: sub.route,
  logo: CHILD_LOGOS[sub.id],
  tint: CHILD_TINTS[i % CHILD_TINTS.length],
  phase: CHILD_PHASES[i % CHILD_PHASES.length],
}));

/* ---------------------------------------------------------------- timeline */
const T_BANG = 1.5;
const D_SHAKE = 1; // camera shake for 1s right before the blast
const T_SHAKE = T_BANG - D_SHAKE;
const T_THROW = 1.9;
const D_THROW = 1.15;
const ORBIT_PERIOD = 30;
const T_SETTLE = T_THROW + D_THROW + 0.15; // children stop moving once they land from the blast
const T_LIGHTNING = T_SETTLE + 0.1; // triangle circuit "energises" once children are static

/* the 3 children connect pairwise into a triangle: 0-1, 1-2, 2-0 */
const EDGE_PAIRS = [[0, 1], [1, 2], [2, 0]];

/* -------------------------------------------------------------------- math */
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutBack = (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -9 * t));

/* midpoint-displacement jagged bolt between two points */
const boltPoints = (x1, y1, x2, y2, amp) => {
  let pts = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  for (let iter = 0; iter < 4; iter++) {
    const next = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      next.push(a);
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      const dx = b.x - a.x, dy = b.y - a.y;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len;
      const off = (Math.random() - 0.5) * amp;
      next.push({ x: mx + nx * off, y: my + ny * off });
    }
    next.push(pts[pts.length - 1]);
    pts = next;
    amp *= 0.55;
  }
  return pts;
};

const drawBolt = (ctx, pts, color, alpha, width) => {
  ctx.save();
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  const path = () => {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  };

  // wide soft bloom — this is what reads as "blurred" rather than a hard line
  ctx.globalAlpha = alpha * 0.45;
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 40;
  ctx.lineWidth = width * 3.2;
  path();
  ctx.stroke();

  // mid glow
  ctx.globalAlpha = alpha * 0.8;
  ctx.shadowBlur = 22;
  ctx.lineWidth = width * 1.4;
  path();
  ctx.stroke();

  // slim bright core
  ctx.globalAlpha = alpha;
  ctx.shadowBlur = 8;
  ctx.strokeStyle = 'rgba(255,255,255,0.95)';
  ctx.lineWidth = Math.max(1, width * 0.32);
  path();
  ctx.stroke();
  ctx.restore();
};

/* ------------------------------------------------------ logo with fallback */
function Mark({ src, lines, tint, fontSize, onAspect, iconOnly = false }) {
  const [broken, setBroken] = useState(false);

  if (broken || !src) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', gap: '.4em', fontSize, textAlign: 'center' }}>
        {lines.map((l, i) => (
          <span
            key={l}
            style={{
              fontSize: i === 0 ? '1em' : '.3em',
              fontWeight: i === 0 ? 500 : 400,
              letterSpacing: i === 0 ? '.14em' : '.34em',
              lineHeight: 1,
              whiteSpace: 'nowrap',
              color: 'transparent',
              backgroundImage: `linear-gradient(100deg,${C.cyan},${tint},${C.ink})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            {l}
          </span>
        ))}
      </div>
    );
  }

  const img = (
    <img
      src={src}
      alt={lines[0]}
      draggable={false}
      onError={() => setBroken(true)}
      onLoad={(e) => {
        const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
        if (w && h) onAspect?.(w / h);
      }}
      style={iconOnly
        ? { position: 'absolute', top: 0, left: 0, width: '100%', height: 'auto', display: 'block' }
        : { maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', display: 'block' }}
    />
  );

  return iconOnly
    ? <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>{img}</div>
    : img;
}

/* ==================================================================== HERO */
export const OrbitHero = () => {
  const wrapRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const orbRefs = useRef({});
  const arRef = useRef(AR_ICON);
  const S = useRef({ stars: [], dust: [], parts: [], rings: [], W: 0, H: 0 });
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);

  /* -------------------------------------------------------------- geometry */
  const geo = (W, H) => {
    const base = Math.min(W, H * 1.6);
    const mobile = W < 720;

    // parent mark: sized by WIDTH, height derived from its true aspect ratio
    const coreW = mobile
      ? Math.min(W * 0.5, 210)
      : Math.max(180, Math.min(base * 0.2, 300));
    const coreH = coreW / arRef.current;

    // child badges: true circles, one shared diameter, logo contained inside
    const plateW = mobile
      ? Math.min(W * 0.38, 165)
      : Math.max(140, Math.min(base * 0.15, 220));
    const plateH = plateW;

    // orbit radii, kept inside the viewport with the badge half-width in mind
    let Rx = Math.min(W * 0.36, 560);
    Rx = Math.min(Rx, W / 2 - plateW / 2 - 18);

    // Ry has a FLOOR (must clear the tall core mark + its baked-in wordmark
    // vertically, or orbiting badges cut straight through the logo text) and
    // a CEILING (must stay clear of the small eyebrow label above / scroll
    // hint below).
    const vGap = mobile ? 20 : 32;
    const RyFloor = coreH / 2 + plateH / 2 + vGap;
    const RyCeil = Math.max(RyFloor, H / 2 - plateH / 2 - (mobile ? 60 : 70));
    const Ry = Math.min(RyCeil, Math.max(RyFloor, Rx * 0.34));

    return { coreW, coreH, plateW, plateH, Rx, Ry, cx: W / 2, cy: H * 0.5 };
  };

  /* ---------------------------------------------------------------- engine */
  useEffect(() => {
    const wrap = wrapRef.current;
    const cvs = canvasRef.current;
    if (!wrap || !cvs) return;
    const ctx = cvs.getContext('2d');
    const s = S.current;

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = wrap.clientWidth;
      const H = wrap.clientHeight;
      cvs.width = W * dpr;
      cvs.height = H * dpr;
      cvs.style.width = W + 'px';
      cvs.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.W = W; s.H = H;

      const { cx, cy } = geo(W, H);
      s.stars = Array.from({ length: Math.round((W * H) / 5200) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.25 + 0.25,
        a: Math.random() * 0.5 + 0.12,
        tw: Math.random() * 6.2832,
        sp: Math.random() * 1.6 + 0.4,
      }));
      s.dust = Array.from({ length: 130 }, () => ({
        a: Math.random() * 6.2832,
        d0: 220 + Math.random() * Math.max(W, H) * 0.55,
        born: Math.random() * 0.5,
        r: Math.random() * 1.6 + 0.4,
        cx, cy,
      }));
      s.parts = [];
      s.rings = [];
      s.bangDone = false;
      s.lightning = null;
    };

    const bang = () => {
      const { cx, cy } = geo(s.W, s.H);
      const pal = [C.cyan, C.sky, C.blue, C.paper];
      s.parts = Array.from({ length: 320 }, () => {
        const a = Math.random() * 6.2832;
        const sp = 90 + Math.pow(Math.random(), 0.45) * 900;
        return {
          x: cx, y: cy,
          vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * 0.62,
          r: Math.random() * 2.4 + 0.6,
          life: 0, max: 1.1 + Math.random() * 2.4,
          c: pal[(Math.random() * pal.length) | 0],
        };
      });
      s.rings = [0, 0.12, 0.28].map((d) => ({ d, t: 0 }));
      s.bangDone = true;
    };

    seed();
    const ro = new ResizeObserver(seed);
    ro.observe(wrap);

    let raf = 0;
    let last = performance.now();
    const t0 = performance.now();

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = reduced ? 14 : (now - t0) / 1000;
      const { cx, cy, Rx, Ry, coreW, coreH, plateW, plateH } = geo(s.W, s.H);

      if (!s.bangDone && t >= T_BANG) bang();

      /* live positions of the 3 children, shared by the DOM orbit + the canvas lightning.
         tOrbit is frozen once they land — they get thrown out, then hold still. */
      const tOrbit = Math.min(t, T_SETTLE);
      const ramp = clamp01((tOrbit - T_THROW) / 2.2);
      const theta = (tOrbit - T_THROW) * ((6.2832 / ORBIT_PERIOD) * (0.25 + 0.75 * ramp));
      const orbitK = clamp01((t - T_THROW) / D_THROW);
      const orbitReach = easeOutBack(orbitK);
      const childPos = t > T_THROW
        ? CHILDREN.map((c) => {
            const ang = c.phase + theta;
            return {
              x: cx + Math.cos(ang) * Rx * orbitReach,
              y: cy + Math.sin(ang) * Ry * orbitReach,
              depth: (Math.sin(ang) + 1) / 2,
            };
          })
        : null;

      /* ---------------------------------------------------- camera shake (disabled) */
      if (stageRef.current && stageRef.current.style.transform) {
        stageRef.current.style.transform = '';
      }

      /* ------------------------------------------------------ background */
      ctx.clearRect(0, 0, s.W, s.H);
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(s.W, s.H) * 0.78);
      bg.addColorStop(0, C.deep);
      bg.addColorStop(0.55, '#071223');
      bg.addColorStop(1, C.void);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, s.W, s.H);

      ctx.save();
      ctx.strokeStyle = 'rgba(103,223,232,0.045)';
      ctx.lineWidth = 1;
      const g = 72;
      for (let x = ((cx % g) + g) % g; x < s.W; x += g) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s.H); ctx.stroke(); }
      for (let y = ((cy % g) + g) % g; y < s.H; y += g) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s.W, y); ctx.stroke(); }
      ctx.restore();

      for (const st of s.stars) {
        ctx.fillStyle = `rgba(214,236,247,${st.a * (0.6 + 0.4 * Math.sin(t * st.sp + st.tw))})`;
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 6.2832); ctx.fill();
      }

      /* ------------------------------------------- pre-bang infall + core */
      if (t < T_BANG) {
        const p = clamp01(t / T_BANG);
        for (const d of s.dust) {
          const k = clamp01((p - d.born) / (1 - d.born));
          const dist = d.d0 * (1 - easeOutCubic(k));
          ctx.fillStyle = `rgba(103,223,232,${0.1 + 0.62 * k})`;
          ctx.beginPath();
          ctx.arc(cx + Math.cos(d.a) * dist, cy + Math.sin(d.a) * dist * 0.62, d.r, 0, 6.2832);
          ctx.fill();
        }
        const rr = (9 + p * 30) * (1 + 0.35 * Math.sin(t * 9));
        const sg = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr * 5);
        sg.addColorStop(0, `rgba(255,255,255,${0.55 + 0.45 * p})`);
        sg.addColorStop(0.16, `rgba(103,223,232,${0.5 * (0.3 + p)})`);
        sg.addColorStop(1, 'rgba(27,95,191,0)');
        ctx.fillStyle = sg;
        ctx.beginPath(); ctx.arc(cx, cy, rr * 5, 0, 6.2832); ctx.fill();
      } else {
        const k = clamp01((t - T_BANG) / 2.2);
        const rr = Math.max(coreW, coreH) * (0.5 + 0.55 * easeOutExpo(k)) * (1 + 0.035 * Math.sin(t * 1.7));
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
        cg.addColorStop(0, `rgba(160,225,245,${0.3 * (1 - k * 0.55)})`);
        cg.addColorStop(0.42, 'rgba(63,154,218,0.12)');
        cg.addColorStop(1, 'rgba(18,64,143,0)');
        ctx.fillStyle = cg;
        ctx.beginPath(); ctx.arc(cx, cy, rr, 0, 6.2832); ctx.fill();
      }

      /* ---------------------------------------------------- shockwaves */
      for (const r of s.rings) {
        r.t += dt;
        const k = clamp01((r.t - r.d) / 2.3);
        if (k <= 0 || k >= 1) continue;
        const e = easeOutExpo(k);
        ctx.strokeStyle = `rgba(103,223,232,${0.5 * Math.pow(1 - k, 1.6)})`;
        ctx.lineWidth = 2.4 * (1 - k) + 0.4;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.max(s.W, s.H) * 0.92 * e, Math.max(s.W, s.H) * 0.58 * e, 0, 0, 6.2832);
        ctx.stroke();
      }

      /* ----------------------------------------------------- particles */
      for (const p of s.parts) {
        p.life += dt;
        if (p.life > p.max) continue;
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.vx *= 0.982; p.vy *= 0.982;
        const a = Math.pow(1 - p.life / p.max, 1.5);
        ctx.globalAlpha = a * 0.85;
        ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.4 + a * 0.6), 0, 6.2832); ctx.fill();
      }
      ctx.globalAlpha = 1;

      const fk = (t - T_BANG) / 0.42;
      if (fk >= 0 && fk < 1) {
        ctx.fillStyle = `rgba(226,246,255,${Math.pow(1 - fk, 2) * 0.9})`;
        ctx.fillRect(0, 0, s.W, s.H);
      }

      /* ------------------------------------- triangle lightning circuit */
      if (childPos && t >= T_LIGHTNING) {
        if (!s.lightning) {
          s.lightning = EDGE_PAIRS.map(() => ({ nextAt: t, strikeAt: -10, duration: 0.3, points: null }));
        }
        EDGE_PAIRS.forEach(([ia, ib], i) => {
          const A = childPos[ia], B = childPos[ib];
          const e = s.lightning[i];

          if (!reduced && t >= e.nextAt) {
            const isIgnition = e.strikeAt < 0;
            e.points = boltPoints(A.x, A.y, B.x, B.y, Math.hypot(B.x - A.x, B.y - A.y) * (isIgnition ? 0.18 : 0.13));
            e.strikeAt = t;
            e.duration = isIgnition ? 0.4 : 0.15 + Math.random() * 0.12;
            e.nextAt = t + e.duration + 0.9 + Math.random() * 2.1;
          }

          if (!reduced && e.points) {
            const life = t - e.strikeAt;
            if (life >= 0 && life < e.duration) {
              const fade = 1 - life / e.duration;
              drawBolt(ctx, e.points, C.cyan, Math.min(1, fade * 1.4), 2.4 * fade + 0.7);
            }
          }
        });
      }

      /* --------------------------------------- parent mark, truly centred */
      if (coreRef.current) {
        const k = clamp01((t - T_BANG) / 0.95);
        const sc = t < T_BANG ? 0.1 : 0.55 + 0.45 * easeOutBack(k);
        const el = coreRef.current;
        el.style.width = coreW + 'px';
        el.style.height = coreH + 'px';
        el.style.opacity = t < T_BANG ? 0 : Math.min(1, k * 2.4);
        el.style.transform = `translate3d(${cx - coreW / 2}px, ${cy - coreH / 2}px, 0) scale(${sc})`;
      }
      if (ringRef.current) {
        const d = Math.max(coreW, coreH) * 1.5;
        ringRef.current.style.width = d + 'px';
        ringRef.current.style.height = d + 'px';
      }

      /* ----------------------------------------- children on their orbits */
      for (let i = 0; i < CHILDREN.length; i++) {
        const c = CHILDREN[i];
        const el = orbRefs.current[c.id];
        if (!el) continue;
        const ang = c.phase + (t > T_THROW ? theta : 0);
        const x = cx + Math.cos(ang) * Rx * orbitReach;
        const y = cy + Math.sin(ang) * Ry * orbitReach;
        const depth = childPos ? childPos[i].depth : (Math.sin(ang) + 1) / 2; // 0 far · 1 near
        const sc = (0.76 + depth * 0.36) * (0.35 + 0.65 * easeOutCubic(orbitK));
        el.style.width = plateW + 'px';
        el.style.height = plateH + 'px';
        el.style.transform = `translate3d(${x - plateW / 2}px, ${y - plateH / 2}px, 0) scale(${sc})`;
        el.style.opacity = clamp01((t - T_THROW) / 0.4) * (0.62 + depth * 0.38);
        el.style.zIndex = depth > 0.5 ? 9 : 2;
        el.style.filter = `blur(${(1 - depth) * 1.1}px)`;
      }

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [reduced]);

  /* ---------------------------------------------------------------- markup */
  return (
    <section
      ref={wrapRef}
      aria-label="Trinetra Technoworld and its brands"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        overflow: 'hidden',
        background: C.void,
        color: C.paper,
        isolation: 'isolate',
        fontFamily: "'Barlow','DM Sans','Inter',ui-sans-serif,system-ui,-apple-system,sans-serif",
      }}
    >
      <style>{`
        @keyframes tw-rise { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
        @keyframes tw-spin { to { transform: rotate(360deg) } }
        @keyframes tw-spin-r { to { transform: rotate(-360deg) } }
        @keyframes tw-blink { 0%,100%{opacity:.25} 50%{opacity:.9} }
        .tw-rise{ animation: tw-rise .9s cubic-bezier(.2,.7,.2,1) both }
        .tw-plate{ transition: box-shadow .35s ease, border-color .35s ease }
        .tw-orb:hover .tw-plate{ border-color: rgba(103,223,232,.55); box-shadow: 0 0 70px -10px currentColor }
        .tw-orb:hover .tw-label{ opacity:1; letter-spacing:.42em }
        @media (prefers-reduced-motion: reduce){
          .tw-rise{animation:none} [data-ring]{animation:none !important}
        }
      `}</style>

      {/* stage: shakes as one unit for the 1s charge right before the blast */}
      <div ref={stageRef} style={{ position: 'absolute', inset: 0, willChange: 'transform' }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

        {/* ---------------------------------------- parent: Trinetra Technoworld */}
        <div
          ref={coreRef}
          style={{
            position: 'absolute', left: 0, top: 0, zIndex: 5, opacity: 0,
            transformOrigin: '50% 50%', willChange: 'transform',
            display: 'grid', placeItems: 'center', pointerEvents: 'none',
          }}
        >
          {/* rings orbit the exact optical centre of the mark */}
          <div
            ref={ringRef}
            style={{ position: 'absolute', left: '50%', top: '50%', translate: '-50% -50%' }}
          >
            <div data-ring style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '1px dashed rgba(103,223,232,.16)',
              animation: 'tw-spin 46s linear infinite',
            }} />
            <div data-ring style={{
              position: 'absolute', inset: '13%', borderRadius: '50%',
              border: '1px solid rgba(63,154,218,.12)',
              animation: 'tw-spin-r 32s linear infinite',
            }} />
          </div>

          <div style={{
            position: 'relative', width: '100%', height: '100%',
            display: 'grid', placeItems: 'center',
            filter: 'drop-shadow(0 0 32px rgba(27,95,191,0.85)) drop-shadow(0 0 70px rgba(63,154,218,0.5))',
          }}>
            <Mark
              src={MAIN_LOGO}
              lines={['TRINETRA', 'TECHNOWORLD PVT LTD']}
              tint={C.sky}
              fontSize="clamp(30px,4.6vw,60px)"
              onAspect={(ar) => { arRef.current = ar; }}
            />
          </div>
        </div>

        {/* --------------------------------------------- children on the orbit */}
        {CHILDREN.map((c) => (
          <Link
            key={c.id}
            to={c.route}
            ref={(el) => (orbRefs.current[c.id] = el)}
            className="tw-orb"
            aria-label={`Explore ${c.name}`}
            style={{
              position: 'absolute', left: 0, top: 0, opacity: 0,
              willChange: 'transform', color: c.tint,
              transition: 'filter .3s linear',
              display: 'block', textDecoration: 'none',
            }}
          >
            <div className="tw-plate" style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: 'radial-gradient(120% 160% at 28% 12%, rgba(103,223,232,.14), rgba(11,26,51,.78) 58%, rgba(5,10,20,.92))',
              border: '1px solid rgba(103,223,232,.24)',
              boxShadow: '0 0 46px -14px currentColor, inset 0 0 44px -20px rgba(103,223,232,.55)',
              backdropFilter: 'blur(3px)',
            }} />
            <div style={{
              position: 'absolute', inset: '14%',
              display: 'grid', placeItems: 'center',
            }}>
              <Mark
                src={c.logo}
                lines={[c.name.toUpperCase(), 'BY TRINETRA']}
                tint={c.tint}
                fontSize="clamp(13px,1.3vw,18px)"
              />
            </div>
            <div className="tw-label" style={{
              position: 'absolute', top: '108%', left: '50%', translate: '-50% 0',
              fontSize: 'clamp(10px,.9vw,13px)', letterSpacing: '.28em',
              textTransform: 'uppercase', whiteSpace: 'nowrap', opacity: .75,
              color: 'rgba(232,244,250,.72)',
              transition: 'opacity .3s ease, letter-spacing .3s ease',
            }}>{c.name}</div>
          </Link>
        ))}
      </div>

      {/* ------------------------------------------------------- type deck */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 'clamp(34px,6.5vh,92px)',
        zIndex: 6, textAlign: 'center', padding: '0 24px', pointerEvents: 'none',
      }}>
        <p className="tw-rise" style={{
          animationDelay: `${T_BANG + 0.5}s`, margin: 0,
          fontSize: 'clamp(9px,.75vw,11px)', letterSpacing: '.52em',
          textTransform: 'uppercase', color: 'rgba(103,223,232,.75)',
        }}>One core · three worlds</p>
      </div>

      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 'clamp(30px,5.5vh,68px)',
        zIndex: 6, textAlign: 'center', padding: '0 24px',
      }}>
        <p style={{
          margin: '26px 0 0', fontSize: 9, letterSpacing: '.46em',
          textTransform: 'uppercase', color: 'rgba(232,244,250,.35)',
          animation: 'tw-blink 2.8s ease-in-out infinite',
        }}>Scroll to explore</p>
      </div>
    </section>
  );
};

export default OrbitHero;
