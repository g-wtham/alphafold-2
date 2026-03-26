import { useState, useEffect, useRef, useCallback } from "react";

const COLORS = {
  teal: "#1D9E75", tealLight: "#E1F5EE", tealDark: "#085041",
  coral: "#D85A30", coralLight: "#FAECE7", coralDark: "#4A1B0C",
  blue: "#378ADD", blueLight: "#E6F1FB", blueDark: "#042C53",
  purple: "#7F77DD", purpleLight: "#EEEDFE", purpleDark: "#26215C",
  amber: "#BA7517", amberLight: "#FAEEDA", amberDark: "#412402",
  green: "#639922", greenLight: "#EAF3DE", greenDark: "#173404",
};

// ─── Shared UI ────────────────────────────────────────────────────────────────
function SectionWrap({ id, children, bg = "#fff" }) {
  return (
    <section id={id} style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "80px 24px",
      background: bg, position: "relative",
    }}>{children}</section>
  );
}
function Container({ children, style = {} }) {
  return <div style={{ maxWidth: 960, margin: "0 auto", width: "100%", ...style }}>{children}</div>;
}
function Tag({ children, color = COLORS.teal }) {
  return (
    <span style={{
      display: "inline-block", background: color + "22", color,
      border: `1px solid ${color}44`, borderRadius: 4,
      fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
      padding: "3px 8px", marginBottom: 12, textTransform: "uppercase",
    }}>{children}</span>
  );
}
function BigHeading({ children }) {
  return <h2 style={{
    fontFamily: "'Georgia', serif", fontSize: "clamp(32px, 5vw, 56px)",
    fontWeight: 400, lineHeight: 1.15, marginBottom: 16,
    color: "#0f0f0f",
  }}>{children}</h2>;
}
function SubText({ children }) {
  return <p style={{ fontSize: 18, color: "#555", lineHeight: 1.7, marginBottom: 32, maxWidth: 640 }}>{children}</p>;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "hero", label: "Intro" },
  { id: "protein", label: "Proteins" },
  { id: "problem", label: "The Problem" },
  { id: "old", label: "Old Methods" },
  { id: "breakthrough", label: "Breakthrough" },
  { id: "how", label: "How It Works" },
  { id: "af3", label: "AlphaFold 3" },
  { id: "impact", label: "Impact" },
];

function NavBar({ active }) {
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)",
      borderBottom: "1px solid #e5e5e5",
      display: "flex", justifyContent: "center", padding: "0 16px",
      height: 52,
    }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center", overflowX: "auto", maxWidth: 1000 }}>
        {NAV_ITEMS.map(n => (
          <button key={n.id} onClick={() => scroll(n.id)} style={{
            background: active === n.id ? "#0f172a" : "transparent",
            color: active === n.id ? "#ffffff" : "#555",
            border: "none", borderRadius: 6, padding: "4px 12px",
            fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
            transition: "all 0.2s",
          }}>{n.label}</button>
        ))}
      </div>
    </nav>
  );
}

// ─── SECTION 1: HERO ─────────────────────────────────────────────────────────
function HeroSection() {
  const [dots, setDots] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i, x: 10 + i * 7, y: 50, color: [COLORS.teal, COLORS.coral, COLORS.blue, COLORS.purple][i % 4]
    }))
  );
  const [folded, setFolded] = useState(false);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef();

  const foldedPositions = [
    { x: 42, y: 38 }, { x: 52, y: 30 }, { x: 62, y: 38 }, { x: 70, y: 46 },
    { x: 78, y: 38 }, { x: 70, y: 30 }, { x: 60, y: 26 }, { x: 50, y: 22 },
    { x: 40, y: 28 }, { x: 32, y: 38 }, { x: 38, y: 48 }, { x: 50, y: 52 },
  ];
  const straightPositions = Array.from({ length: 12 }, (_, i) => ({ x: 10 + i * 7, y: 50 }));

  const toggle = () => {
    if (animating) return;
    setAnimating(true);
    const target = !folded ? foldedPositions : straightPositions;
    setDots(prev => prev.map((d, i) => ({ ...d, tx: target[i].x, ty: target[i].y })));
    setTimeout(() => { setFolded(f => !f); setAnimating(false); }, 800);
  };

  useEffect(() => {
    timerRef.current = setInterval(toggle, 2500);
    return () => clearInterval(timerRef.current);
  }, [folded, animating]);

  return (
    <SectionWrap id="hero" bg="linear-gradient(135deg, #f8fffe 0%, #f0f8ff 50%, #fff8f5 100%)">
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <div>
            <Tag>Nobel Prize in Chemistry · 2024</Tag>
            <h1 style={{
              fontFamily: "'Georgia', serif", fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 400, lineHeight: 1.1, marginBottom: 20, color: "#0a0a0a",
            }}>
              AlphaFold:<br />
              <span style={{ color: COLORS.teal }}>How AI Solved</span><br />
              a 60-Year Mystery
            </h1>
            <p style={{ fontSize: 18, color: "#555", lineHeight: 1.8, marginBottom: 32, maxWidth: 500 }}>
              A story about proteins, shapes, and how one AI system did in months what humanity couldn't do in six decades — explained from absolute scratch.
            </p>
            <button
              onClick={() => document.getElementById("protein")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: "#0f172a", color: "#ffffff", border: "none",
                borderRadius: 8, padding: "14px 28px", fontSize: 16,
                fontWeight: 500, cursor: "pointer",
              }}>
              Start the Journey →
            </button>
          </div>
          <div>
            <LiveProteinFold folded={folded} dots={dots} />
            <p style={{ textAlign: "center", fontSize: 13, color: "#6b7280", marginTop: 12 }}>
              {folded ? "✓ Folded into its working 3D shape" : "Amino acid chain — just a string of beads"}
            </p>
          </div>
        </div>
      </Container>
    </SectionWrap>
  );
}

function LiveProteinFold({ folded, dots }) {
  const foldedPositions = [
    { x: 42, y: 38 }, { x: 52, y: 30 }, { x: 62, y: 38 }, { x: 70, y: 46 },
    { x: 78, y: 38 }, { x: 70, y: 30 }, { x: 60, y: 26 }, { x: 50, y: 22 },
    { x: 40, y: 28 }, { x: 32, y: 38 }, { x: 38, y: 48 }, { x: 50, y: 52 },
  ];
  const straightPositions = Array.from({ length: 12 }, (_, i) => ({ x: 10 + i * 7, y: 50 }));
  const positions = folded ? foldedPositions : straightPositions;

  return (
    <div style={{
      background: "#fff", borderRadius: 16, border: "1px solid #e8e8e8",
      padding: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.06)"
    }}>
      <svg viewBox="0 0 100 80" style={{ width: "100%", overflow: "visible" }}>
        {/* Connection lines */}
        {positions.slice(0, -1).map((p, i) => (
          <line
            key={i}
            x1={`${p.x}%`} y1={`${p.y}%`}
            x2={`${positions[i + 1].x}%`} y2={`${positions[i + 1].y}%`}
            stroke="#ddd" strokeWidth="1.5"
            style={{ transition: "all 0.8s ease" }}
          />
        ))}
        {/* Amino acid beads */}
        {positions.map((p, i) => (
          <circle
            key={i}
            cx={`${p.x}%`} cy={`${p.y}%`} r="3.5"
            fill={[COLORS.teal, COLORS.coral, COLORS.blue, COLORS.purple][i % 4]}
            style={{ transition: "all 0.8s ease" }}
          />
        ))}
      </svg>
    </div>
  );
}

// ─── SECTION 2: WHAT IS A PROTEIN ────────────────────────────────────────────
function ProteinSection() {
  const [step, setStep] = useState(0);
  const AMINO_COLORS = [COLORS.teal, COLORS.coral, COLORS.blue, COLORS.purple, COLORS.amber, COLORS.green];

  const steps = [
    {
      title: "Step 1: The building blocks",
      text: "There are only 20 types of amino acids in nature — think of them like 20 different LEGO pieces. Everything alive on Earth is built from combinations of just these 20.",
      visual: <AminoAcidGrid />
    },
    {
      title: "Step 2: They link into a chain",
      text: "Amino acids bond together one by one in a specific order to make a long string — like beads on a necklace. This order (the 'sequence') is written in your DNA.",
      visual: <ChainAnimation />
    },
    {
      title: "Step 3: The chain folds up",
      text: "Here's the magic. Chemical forces — electricity, water repulsion, magnetism between atoms — cause the chain to crumple into a very specific 3D shape. Automatically. Every time.",
      visual: <FoldingAnimation />
    },
    {
      title: "Step 4: Shape = function",
      text: "The 3D shape IS what makes the protein work. Hemoglobin has the exact right pocket to grab oxygen. Enzymes have grooves that fit food molecules to break them apart. Wrong shape = broken machine.",
      visual: <ShapeFunctionViz />
    },
  ];

  return (
    <SectionWrap id="protein" bg="#fafafa">
      <Container>
        <Tag color={COLORS.teal}>Chapter 1</Tag>
        <BigHeading>What is a Protein?</BigHeading>
        <SubText>Before we understand the breakthrough, we need to understand what proteins are — and why their shape is everything.</SubText>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, alignItems: "start" }}>
          <div>
            {steps.map((s, i) => (
              <div
                key={i}
                onClick={() => setStep(i)}
                style={{
                  padding: "16px 20px", borderRadius: 10, marginBottom: 12,
                  border: `1.5px solid ${step === i ? COLORS.teal : "#e5e5e5"}`,
                  background: step === i ? COLORS.tealLight : "#fff",
                  cursor: "pointer", transition: "all 0.2s",
                }}>
                <div style={{
                  fontSize: 13, fontWeight: 700, color: step === i ? COLORS.teal : "#999",
                  marginBottom: 6
                }}>{s.title}</div>
                {step === i && (
                  <p style={{ fontSize: 14, color: "#444", lineHeight: 1.65, margin: 0 }}>{s.text}</p>
                )}
              </div>
            ))}

            <div style={{
              marginTop: 20, padding: "14px 18px", borderRadius: 10,
              background: "#fff3ee", border: `1px solid ${COLORS.coral}44`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.coral, marginBottom: 6 }}>
                ⚠ Wrong shape = disease
              </div>
              <p style={{ fontSize: 13, color: "#555", margin: 0, lineHeight: 1.6 }}>
                Alzheimer's, Parkinson's, and many cancers are caused by proteins that misfold into the wrong shape — broken machines inside your body.
              </p>
            </div>
          </div>

          <div style={{
            background: "#fff", borderRadius: 16, border: "1px solid #e8e8e8",
            padding: 28, minHeight: 320, display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: "0 2px 16px rgba(0,0,0,0.04)"
          }}>
            {steps[step].visual}
          </div>
        </div>
      </Container>
    </SectionWrap>
  );
}

function AminoAcidGrid() {
  const names = ["Ala", "Arg", "Asn", "Asp", "Cys", "Gln", "Glu", "Gly", "His", "Ile",
    "Leu", "Lys", "Met", "Phe", "Pro", "Ser", "Thr", "Trp", "Tyr", "Val"];
  const colors = Object.values(COLORS);
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>The 20 amino acids — nature's 20 LEGO types</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
        {names.map((n, i) => (
          <div key={i} style={{
            background: colors[i % colors.length] + "22",
            border: `1px solid ${colors[i % colors.length]}44`,
            borderRadius: 6, padding: "8px 4px",
            fontSize: 12, fontWeight: 600, color: colors[i % colors.length],
            textAlign: "center",
          }}>{n}</div>
        ))}
      </div>
    </div>
  );
}

function ChainAnimation() {
  const [count, setCount] = useState(1);
  const colors = [COLORS.teal, COLORS.coral, COLORS.blue, COLORS.purple, COLORS.amber, COLORS.green];
  const TOTAL = 12;
  const labels = ["A", "R", "N", "D", "C", "Q", "E", "G", "H", "I", "L", "K"];

  useEffect(() => {
    const t = setInterval(() => setCount(c => c >= TOTAL ? 1 : c + 1), 450);
    return () => clearInterval(t);
  }, []);

  // Space beads evenly across width 20..260 (12 beads, step=21.8)
  const step = 240 / (TOTAL - 1);

  return (
    <div style={{ textAlign: "center", width: "100%" }}>
      <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>Amino acids linking up one by one…</p>
      <div style={{ width: "100%", overflow: "hidden" }}>
        <svg viewBox="0 0 280 60" style={{ width: "100%", display: "block" }}>
          {Array.from({ length: count }).map((_, i) => {
            const x = 20 + i * step;
            const prevX = 20 + (i - 1) * step;
            return (
              <g key={i}>
                {i > 0 && (
                  <line x1={prevX + 9} y1="30" x2={x - 9} y2="30"
                    stroke="#ccc" strokeWidth="2" />
                )}
                <circle cx={x} cy="30" r="9" fill={colors[i % colors.length]} />
                <text x={x} y="34" textAnchor="middle" fill="#0f172a" fontSize="8" fontWeight="700">
                  {labels[i]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
        Adding amino acid <strong style={{ color: colors[(count - 1) % colors.length] }}>{labels[count - 1]}</strong> — block #{count} of {TOTAL}
      </p>
    </div>
  );
}

function FoldingAnimation() {
  const [progress, setProgress] = useState(0);
  const [dir, setDir] = useState(1);
  const animRef = useRef();

  useEffect(() => {
    const tick = () => {
      setProgress(p => {
        const next = p + dir * 0.008;
        if (next >= 1) { setDir(-1); return 1; }
        if (next <= 0) { setDir(1); return 0; }
        return next;
      });
    };
    animRef.current = setInterval(tick, 16);
    return () => clearInterval(animRef.current);
  }, [dir]);

  const straightPos = Array.from({ length: 12 }, (_, i) => ({ x: 10 + i * 7, y: 50 }));
  const foldedPos = [
    { x: 42, y: 38 }, { x: 52, y: 30 }, { x: 62, y: 38 }, { x: 70, y: 46 },
    { x: 78, y: 38 }, { x: 70, y: 30 }, { x: 60, y: 26 }, { x: 50, y: 22 },
    { x: 40, y: 28 }, { x: 32, y: 38 }, { x: 38, y: 48 }, { x: 50, y: 52 },
  ];

  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  const e = ease(progress);

  const pos = straightPos.map((s, i) => ({
    x: lerp(s.x, foldedPos[i].x, e),
    y: lerp(s.y, foldedPos[i].y, e),
  }));

  const colors = [COLORS.teal, COLORS.coral, COLORS.blue, COLORS.purple, COLORS.amber, COLORS.green];

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>
        {progress > 0.5 ? "✓ Chemical forces folding the chain" : "Straight chain → chemical forces acting..."}
      </p>
      <svg viewBox="0 0 100 80" style={{ width: "100%" }}>
        {pos.slice(0, -1).map((p, i) => (
          <line key={i}
            x1={`${p.x}%`} y1={`${p.y}%`}
            x2={`${pos[i + 1].x}%`} y2={`${pos[i + 1].y}%`}
            stroke="#ddd" strokeWidth="2" />
        ))}
        {pos.map((p, i) => (
          <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r="3.5" fill={colors[i % colors.length]} />
        ))}
      </svg>
    </div>
  );
}

function ShapeFunctionViz() {
  const [active, setActive] = useState(0);
  const examples = [
    {
      name: "Hemoglobin", color: COLORS.coral,
      desc: "Has a pocket shaped perfectly to grab oxygen molecules in your lungs, carry them through blood, then release them.",
      icon: "O₂",
    },
    {
      name: "Antibody", color: COLORS.blue,
      desc: "Has a Y-shaped structure with two prongs designed to grab one specific virus or bacteria — like a custom key for one lock.",
      icon: "🔒",
    },
    {
      name: "Enzyme", color: COLORS.teal,
      desc: "Has a groove exactly shaped for one type of food molecule to slot into, so it can be broken apart for energy.",
      icon: "✂",
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16, textAlign: "center" }}>Shape determines function — click each example</p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, justifyContent: "center" }}>
        {examples.map((e, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            background: active === i ? e.color : e.color + "15",
            color: active === i ? "#fff" : e.color,
            border: `1px solid ${e.color}55`, borderRadius: 6,
            padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>{e.name}</button>
        ))}
      </div>
      <div style={{
        background: examples[active].color + "10",
        border: `1px solid ${examples[active].color}33`,
        borderRadius: 10, padding: 20, textAlign: "center"
      }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>{examples[active].icon}</div>
        <p style={{ fontSize: 14, color: "#444", lineHeight: 1.65, margin: 0 }}>{examples[active].desc}</p>
      </div>
    </div>
  );
}

// ─── SECTION 3: THE PROBLEM ───────────────────────────────────────────────────
function ProblemSection() {
  const [universeCount, setUniverseCount] = useState(0);
  const [running, setRunning] = useState(false);

  const runBruteForce = () => {
    if (running) return;
    setRunning(true);
    setUniverseCount(0);
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 1e15 + 5e14);
      setUniverseCount(count);
      if (count > 1e17) {
        clearInterval(interval);
        setRunning(false);
      }
    }, 50);
  };

  return (
    <SectionWrap id="problem" bg="#fff">
      <Container>
        <Tag color={COLORS.coral}>Chapter 2</Tag>
        <BigHeading>The Impossible Problem</BigHeading>
        <SubText>Scientists knew the sequence (the string of beads) — but not the shape. And the shape is everything. Why couldn't we just... try all possible shapes?</SubText>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <LevinthalVisual />
          </div>
          <div>
            <div style={{
              background: "#fff3ee", border: `2px solid ${COLORS.coral}`, borderRadius: 12, padding: 28, marginBottom: 24
            }}>
              <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 22, margin: "0 0 12px", color: "#0a0a0a" }}>
                Levinthal's Paradox
              </h3>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, margin: "0 0 16px" }}>
                A 35-amino-acid protein has 10<sup>300</sup> possible shapes. That's more than there are atoms in the observable universe (which is only 10<sup>80</sup>).
              </p>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, margin: 0 }}>
                Even checking 30,000 shapes per nanosecond would take longer than the age of the universe — multiplied by 200.
              </p>
            </div>

            <div style={{ background: "#f8f8f8", borderRadius: 12, padding: 24 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                See it yourself: brute force attempt
              </h4>
              <p style={{ fontSize: 14, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
                The computer below tries random shapes as fast as it can. Watch how far it gets before you give up.
              </p>
              <button onClick={runBruteForce} disabled={running} style={{
                background: running ? "#ccc" : COLORS.coral, color: "#ffffff",
                border: "none", borderRadius: 8, padding: "10px 20px",
                fontSize: 14, fontWeight: 600, cursor: running ? "default" : "pointer", marginBottom: 16
              }}>{running ? "Searching..." : "Start brute force search"}</button>
              {universeCount > 0 && (
                <div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Shapes checked:</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: COLORS.coral, fontFamily: "monospace" }}>
                    {universeCount.toLocaleString()}
                  </div>
                  {!running && (
                    <div style={{ marginTop: 12, fontSize: 14, color: "#555", lineHeight: 1.6 }}>
                      That's ~10<sup>{Math.floor(Math.log10(universeCount))}</sup> shapes checked — still nowhere near the 10<sup>300</sup> possible. This is why brute force is impossible.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </SectionWrap>
  );
}

function LevinthalVisual() {
  const canvasRef = useRef();
  const frameRef = useRef();
  const particles = useRef(Array.from({ length: 60 }, () => ({
    x: Math.random() * 340, y: Math.random() * 280,
    vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
    color: [COLORS.teal, COLORS.coral, COLORS.blue, COLORS.purple][Math.floor(Math.random() * 4)]
  })));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, 340, 280);
      particles.current.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > 340) p.vx *= -1;
        if (p.y < 0 || p.y > 280) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = p.color + "aa";
        ctx.fill();
      });
      ctx.strokeStyle = "#ddd";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x;
          const dy = particles.current[i].y - particles.current[j].y;
          if (Math.sqrt(dx * dx + dy * dy) < 50) {
            ctx.beginPath();
            ctx.moveTo(particles.current[i].x, particles.current[i].y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{
        background: "#f0f4f8", borderRadius: 12, padding: 4, marginBottom: 12,
        display: "inline-block"
      }}>
        <canvas ref={canvasRef} width={340} height={280} style={{ borderRadius: 8, display: "block" }} />
      </div>
      <p style={{ fontSize: 13, color: "#6b7280" }}>
        Each particle = one possible protein shape.<br />
        10<sup>300</sup> particles would need a universe bigger than ours.
      </p>
    </div>
  );
}

// ─── SECTION 4: OLD METHODS ───────────────────────────────────────────────────
function OldMethodsSection() {
  const [active, setActive] = useState(0);
  const methods = [
    {
      year: "1958–1962",
      name: "X-Ray Crystallography",
      color: COLORS.blue,
      hero: "John Kendrew",
      time: "12 years + whale meat from Peru",
      cost: "$10,000s+ per protein",
      result: "Solved myoglobin — 1 protein. Won the Nobel Prize.",
      visual: <XRayViz />,
      howItWorks: "Freeze the protein into a crystal. Shoot X-rays at it. X-rays bounce off and make a pattern. Reverse-engineer the pattern to figure out the 3D shape.",
    },
    {
      year: "2008",
      name: "FoldIt — Crowdsourcing",
      color: COLORS.purple,
      hero: "David Baker + 50,000 gamers",
      time: "3 weeks for one protein",
      cost: "Free — gamers did it for fun",
      result: "Solved an HIV protein that stumped scientists for 15 years.",
      visual: <FoldItViz />,
      howItWorks: "Turn protein folding into a video game. Let humans grab and twist the chain with their hands. Human intuition catches patterns that computers can't see.",
    },
  ];

  return (
    <SectionWrap id="old" bg="#f8f8f8">
      <Container>
        <Tag color={COLORS.blue}>Chapter 3</Tag>
        <BigHeading>How Scientists Tried Before AI</BigHeading>
        <SubText>For 60 years, humanity threw its best minds at this problem. Each breakthrough was heroic — and each solution painfully slow.</SubText>

        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {methods.map((m, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              background: active === i ? m.color : m.color + "15",
              color: active === i ? "#fff" : m.color,
              border: `1.5px solid ${m.color}55`, borderRadius: 8,
              padding: "8px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}>{m.name}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 48, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: methods[active].color, marginBottom: 16, letterSpacing: "0.08em" }}>
              {methods[active].year}
            </div>
            <h3 style={{ fontFamily: "'Georgia', serif", fontSize: 28, margin: "0 0 8px" }}>{methods[active].name}</h3>
            <p style={{ fontSize: 15, color: "#666", marginBottom: 24 }}>Led by {methods[active].hero}</p>

            <div style={{
              background: "#f0f0f0", borderRadius: 10, padding: 20, marginBottom: 20,
              border: "1px solid #e5e5e5"
            }}>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                How it works (plain English)
              </h4>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 1.7, margin: 0 }}>{methods[active].howItWorks}</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Time per protein", value: methods[active].time },
                { label: "Cost per protein", value: methods[active].cost },
              ].map((s, i) => (
                <div key={i} style={{
                  background: "#fff", borderRadius: 8, padding: "14px 16px",
                  border: "1px solid #e5e5e5"
                }}>
                  <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: methods[active].color + "10",
              border: `1px solid ${methods[active].color}33`,
              borderRadius: 8, padding: "14px 16px"
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: methods[active].color, marginBottom: 4 }}>Result</div>
              <p style={{ fontSize: 14, color: "#444", margin: 0 }}>{methods[active].result}</p>
            </div>
          </div>
          <div>
            {methods[active].visual}
          </div>
        </div>

        <div style={{
          marginTop: 48, background: "#fff", borderRadius: 12, padding: 28,
          border: "1px solid #e5e5e5", textAlign: "center"
        }}>
          <p style={{ fontSize: 17, color: "#555", lineHeight: 1.7, maxWidth: 640, margin: "0 auto 12px" }}>
            In 60 years, all of science mapped about <strong>150,000</strong> protein structures.
          </p>
          <p style={{ fontSize: 22, fontWeight: 700, color: COLORS.coral, margin: 0 }}>
            AlphaFold mapped 200,000,000 in a few months.
          </p>
        </div>
      </Container>
    </SectionWrap>
  );
}

function XRayViz() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setPhase(p => (p + 1) % 3), 1800);
    return () => clearInterval(t);
  }, []);

  const labels = ["Crystal formed", "X-rays fired", "Shape decoded"];
  return (
    <div>
      <svg viewBox="0 0 280 240" style={{ width: "100%" }}>
        {/* Crystal */}
        <g opacity={1}>
          <rect x="100" y="80" width="80" height="60" rx="4" fill={COLORS.blue + "22"} stroke={COLORS.blue} strokeWidth="1.5" />
          {Array.from({ length: 6 }).map((_, i) => (
            <circle key={i} cx={115 + (i % 3) * 25} cy={95 + Math.floor(i / 3) * 22} r="5"
              fill={COLORS.blue} opacity="0.7" />
          ))}
          <text x="140" y="160" textAnchor="middle" fontSize="11" fill="#6b7280">Protein crystal</text>
        </g>

        {/* X-ray source */}
        {phase >= 1 && (
          <g>
            <rect x="10" y="95" width="40" height="30" rx="4" fill="#f0f0f0" stroke="#ccc" strokeWidth="1" />
            <text x="30" y="113" textAnchor="middle" fontSize="9" fill="#4b5563">X-ray</text>
            {[0, 1, 2].map(i => (
              <line key={i} x1="50" y1={100 + i * 8} x2="100" y2={95 + i * 12}
                stroke={COLORS.amber} strokeWidth="1.5" strokeDasharray="4,3" opacity="0.8">
                <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="0.5s" repeatCount="indefinite" />
              </line>
            ))}
          </g>
        )}

        {/* Diffraction pattern */}
        {phase >= 2 && (
          <g>
            <rect x="230" y="70" width="42" height="60" rx="4" fill="#fff0e0" stroke="#ddd" strokeWidth="1" />
            {[0, 1, 2, 3].map(i => (
              <circle key={i} cx={251 + (i % 2 === 0 ? -8 : 8)} cy={83 + i * 12} r={2 + (i % 3)}
                fill={COLORS.amber} opacity="0.7" />
            ))}
            <text x="251" y="146" textAnchor="middle" fontSize="9" fill="#6b7280">Pattern</text>
            {[0, 1, 2].map(i => (
              <line key={i} x1="180" y1={100 + i * 8} x2="230" y2={90 + i * 15}
                stroke={COLORS.amber + "88"} strokeWidth="1" strokeDasharray="3,3" />
            ))}
          </g>
        )}

        {/* Step label */}
        <rect x="60" y="195" width="160" height="26" rx="4" fill={COLORS.blue + "15"} stroke={COLORS.blue + "44"} />
        <text x="140" y="212" textAnchor="middle" fontSize="12" fill={COLORS.blue} fontWeight="600">{labels[phase]}</text>
      </svg>
    </div>
  );
}

function FoldItViz() {
  const [grabbed, setGrabbed] = useState(false);
  const [cursor, setCursor] = useState({ x: 140, y: 100 });
  const [chainPos, setChainPos] = useState(Array.from({ length: 8 }, (_, i) => ({ x: 60 + i * 22, y: 100 })));

  useEffect(() => {
    let t = 0;
    const interval = setInterval(() => {
      t += 0.03;
      const cx = 140 + 80 * Math.sin(t);
      const cy = 90 + 40 * Math.cos(t * 1.3);
      setCursor({ x: cx, y: cy });
      setChainPos(prev => prev.map((p, i) => {
        const pull = 1 / (1 + Math.abs(i - 3.5));
        return {
          x: p.x + (cx - p.x) * pull * 0.08,
          y: p.y + (cy - p.y) * pull * 0.08,
        };
      }));
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const colors = [COLORS.teal, COLORS.coral, COLORS.blue, COLORS.purple, COLORS.amber, COLORS.green];
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 8 }}>50,000 gamers grabbing and folding proteins...</p>
      <svg viewBox="0 0 280 220" style={{ width: "100%", cursor: "pointer" }}>
        <rect x="10" y="10" width="260" height="190" rx="8" fill="#1a1a2e" />
        <text x="140" y="35" textAnchor="middle" fontSize="10" fill="#9ca3af" fontWeight="600">FOLD IT — GAME SCREEN</text>

        {chainPos.slice(0, -1).map((p, i) => (
          <line key={i}
            x1={p.x} y1={p.y}
            x2={chainPos[i + 1].x} y2={chainPos[i + 1].y}
            stroke="#aaa" strokeWidth="2" />
        ))}
        {chainPos.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="8"
            fill={colors[i % colors.length]} stroke="#fff" strokeWidth="1" />
        ))}

        {/* Cursor */}
        <circle cx={cursor.x} cy={cursor.y} r="6" fill="none" stroke="#fff" strokeWidth="1.5" />
        <line x1={cursor.x - 8} y1={cursor.y} x2={cursor.x + 8} y2={cursor.y} stroke="#fff" strokeWidth="1" />
        <line x1={cursor.x} y1={cursor.y - 8} x2={cursor.x} y2={cursor.y + 8} stroke="#fff" strokeWidth="1" />

        {/* Score */}
        <rect x="190" y="140" width="72" height="40" rx="4" fill={COLORS.teal + "44"} />
        <text x="226" y="156" textAnchor="middle" fontSize="9" fill={COLORS.teal}>SCORE</text>
        <text x="226" y="172" textAnchor="middle" fontSize="14" fill="#ffffff" fontWeight="700">8,241</text>
      </svg>
    </div>
  );
}

// ─── SECTION 5: THE BREAKTHROUGH ──────────────────────────────────────────────
function BreakthroughSection() {
  const [year, setYear] = useState(1994);
  const CASP_DATA = { 1994: 22, 1998: 30, 2002: 38, 2006: 45, 2010: 48, 2014: 55, 2018: 58, 2020: 92 };
  const years = Object.keys(CASP_DATA).map(Number);

  const score = CASP_DATA[year] || 22;
  const pct = score / 100;

  return (
    <SectionWrap id="breakthrough" bg="#fff">
      <Container>
        <Tag color={COLORS.green}>Chapter 4</Tag>
        <BigHeading>The Breakthrough</BigHeading>
        <SubText>Since 1994, a global competition called CASP tracked the best protein shape predictions. For 25 years, scores crept up slowly. Then in 2020, everything changed.</SubText>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 14, color: "#555", display: "block", marginBottom: 12 }}>
                Explore CASP competition scores over time:
              </label>
              <input
                type="range" min={0} max={years.length - 1} step={1}
                value={years.indexOf(year)}
                onChange={e => setYear(years[parseInt(e.target.value)])}
                style={{ width: "100%", marginBottom: 8 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#4b5563" }}>
                {years.map(y => <span key={y}>{y}</span>)}
              </div>
            </div>

            <div style={{
              background: year >= 2020 ? COLORS.tealLight : "#f8f8f8",
              border: `2px solid ${year >= 2020 ? COLORS.teal : "#e5e5e5"}`,
              borderRadius: 12, padding: 24, transition: "all 0.3s"
            }}>
              <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
                CASP {year} — Best prediction score
              </div>
              <div style={{ fontSize: 56, fontWeight: 700, color: year >= 2020 ? COLORS.teal : "#333", lineHeight: 1 }}>
                {score}
              </div>
              <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>out of 100</div>

              <div style={{
                height: 12, background: "#e5e5e5", borderRadius: 6, overflow: "hidden", marginBottom: 12
              }}>
                <div style={{
                  height: "100%", width: `${pct * 100}%`,
                  background: year >= 2020 ? COLORS.teal : COLORS.blue,
                  borderRadius: 6, transition: "all 0.5s"
                }} />
              </div>

              {year === 2020 && (
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.teal }}>
                  ✓ 92.4 — Problem solved. Score above 90 = basically solved.
                </div>
              )}
              {year < 2020 && (
                <div style={{ fontSize: 14, color: "#6b7280" }}>
                  Below 90 — problem not yet solved. Scientists still struggling.
                </div>
              )}
            </div>
          </div>

          <div>
            <CASPChart activeYear={year} data={CASP_DATA} />

            <div style={{
              marginTop: 20, background: "#f0f4f8", borderRadius: 10, padding: 20, color: "#0f172a"
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.teal, marginBottom: 8, letterSpacing: "0.08em" }}>
                THE SCALE OF THE JUMP
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "#374151", margin: 0 }}>
                From 1994 to 2018, scores went from <strong style={{ color: "#0f172a" }}>22 → 58</strong> in 25 years of work. Then DeepMind entered and in one competition jumped to <strong style={{ color: COLORS.teal }}>92.4</strong>. Six decades of struggle, ended in one afternoon.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </SectionWrap>
  );
}

function CASPChart({ activeYear, data }) {
  const years = Object.keys(data).map(Number);
  const W = 320, H = 200;
  const pad = { l: 40, r: 20, t: 20, b: 30 };

  const xScale = (yr) => pad.l + ((yr - 1994) / (2020 - 1994)) * (W - pad.l - pad.r);
  const yScale = (s) => H - pad.b - (s / 100) * (H - pad.t - pad.b);

  const points = years.map(y => ({ x: xScale(y), y: yScale(data[y]), year: y, score: data[y] }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", background: "#fafafa", borderRadius: 8 }}>
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={pad.l} y1={yScale(v)} x2={W - pad.r} y2={yScale(v)} stroke="#e8e8e8" strokeWidth="1" />
          <text x={pad.l - 6} y={yScale(v) + 4} textAnchor="end" fontSize="9" fill="#374151">{v}</text>
        </g>
      ))}

      {/* Threshold line */}
      <line x1={pad.l} y1={yScale(90)} x2={W - pad.r} y2={yScale(90)}
        stroke={COLORS.teal} strokeWidth="1" strokeDasharray="4,3" opacity="0.5" />
      <text x={W - pad.r + 4} y={yScale(90) + 4} fontSize="9" fill={COLORS.teal}>90</text>

      {/* Line path */}
      <path d={pathD} fill="none" stroke={COLORS.blue} strokeWidth="2" />

      {/* Data points */}
      {points.map(p => (
        <g key={p.year}>
          <circle cx={p.x} cy={p.y} r={p.year === activeYear ? 7 : 4}
            fill={p.year === 2020 ? COLORS.teal : p.year === activeYear ? COLORS.blue : "#fff"}
            stroke={p.year === 2020 ? COLORS.teal : COLORS.blue}
            strokeWidth="2" style={{ transition: "all 0.2s" }} />
          {p.year === 2020 && (
            <text x={p.x} y={p.y - 12} textAnchor="middle" fontSize="10" fontWeight="700" fill={COLORS.teal}>
              AlphaFold 2!
            </text>
          )}
        </g>
      ))}

      <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="9" fill="#6b7280">CASP Year</text>
    </svg>
  );
}


// ─── SECTION 6: HOW ALPHAFOLD ACTUALLY WORKS ─────────────────────────────────
function HowItWorksSection() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const timerRef = useRef();

  const steps = [
    {
      tag: "Step 1 — Input",
      title: "Feed it the sequence",
      color: COLORS.blue,
      explain: "You give AlphaFold one thing: a string of letters — each letter represents one amino acid. That's it. From this single string, AlphaFold will figure out the 3D shape. But it needs two more sources of extra clues before it starts thinking.",
      visual: <InputViz />,
    },
    {
      tag: "Step 2 — MSA",
      title: "Clue 1: evolution is a spy",
      color: COLORS.purple,
      explain: "AlphaFold looks up the same protein in thousands of other species. If amino acid #3 always changes whenever amino acid #7 changes — across millions of years of evolution — that's not a coincidence. They must be physically touching in 3D. Evolution leaves fingerprints of which atoms are neighbours.",
      visual: <MSAViz />,
    },
    {
      tag: "Step 3 — Templates",
      title: "Clue 2: borrow a rough sketch",
      color: COLORS.amber,
      explain: "AlphaFold searches a giant library of proteins whose shapes are already known. If it finds one with a similar sequence, it uses that known shape as a rough starting sketch — like tracing a map before drawing your own. This gives it a head start instead of guessing from nothing.",
      visual: <TemplateViz />,
    },
    {
      tag: "Step 4 — Evoformer",
      title: "The thinking engine: two maps, 48 passes",
      color: COLORS.teal,
      explain: "Now the real work begins. AlphaFold builds two internal maps: a SINGLES map (one row per amino acid — what type is it, how conserved?) and a PAIRS map (one cell per pair of amino acids — how likely are these two to be neighbours?). These two maps talk to each other 48 times in a loop, each pass updating both maps with what the other learned. Like two detectives bouncing clues back and forth until the picture is sharp.",
      visual: <EvoformerViz />,
    },
    {
      tag: "Step 5 — Triangle Attention",
      title: "The geometry police: triangle rule",
      color: COLORS.coral,
      explain: "Inside every Evoformer pass, there's a geometry check. If amino acid A is close to B, and B is close to C, then A and C CANNOT be far apart — that would violate the laws of 3D geometry. AlphaFold enforces this triangle rule on every trio, millions of times, to make sure the predicted distances are physically possible.",
      visual: <TriangleViz />,
    },
    {
      tag: "Step 6 — Structure Module",
      title: "Placing atoms in 3D space",
      color: COLORS.green,
      explain: "After 48 Evoformer passes, the pairs map now knows which amino acids are near each other. The Structure Module takes this and places every single atom in 3D space. It gives each amino acid a position AND an orientation (like placing a chair in a room — you need both WHERE it is and WHICH WAY it faces). It then does 8 more refinement passes to tighten everything up.",
      visual: <StructureModuleViz />,
    },
    {
      tag: "Step 7 — Output + pLDDT",
      title: "The final structure + a confidence score",
      color: COLORS.green,
      explain: "The output is the full 3D coordinates of every atom. But crucially, AlphaFold also gives each amino acid a pLDDT confidence score (0–100). Blue = very confident. Orange = uncertain. Red = probably genuinely floppy in nature — no fixed shape at all. This honesty about uncertainty is one of AlphaFold's most important features.",
      visual: <StructureOutputViz />,
    },
  ];

  useEffect(() => {
    if (!auto) return;
    timerRef.current = setInterval(() => setStep(s => (s + 1) % steps.length), 5000);
    return () => clearInterval(timerRef.current);
  }, [auto, steps.length]);

  return (
    <SectionWrap id="how" bg="#ffffff">
      <Container>
        <Tag color={COLORS.teal}>Chapter 5</Tag>
        <BigHeading>
          <span style={{ color: "#0f172a" }}>How AlphaFold 2</span>{" "}
          <span style={{ color: COLORS.teal }}>Actually Works</span>
        </BigHeading>
        <p style={{ fontSize: 17, color: "#4b5563", lineHeight: 1.75, marginBottom: 36, maxWidth: 680 }}>
          Every step, in plain language. No step skipped. If you follow this from top to bottom you know the real architecture.
        </p>

        {/* Step pill buttons */}
        <div style={{ display: "flex", gap: 6, marginBottom: 36, flexWrap: "wrap" }}>
          {steps.map((s, i) => (
            <button key={i} onClick={() => { setStep(i); setAuto(false); }} style={{
              background: step === i ? steps[i].color : steps[i].color + "20",
              color: step === i ? "#fff" : steps[i].color,
              border: `1px solid ${steps[i].color}40`,
              borderRadius: 20, padding: "5px 13px", fontSize: 11,
              fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}>{s.tag}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          {/* Left: text */}
          <div>
            <div style={{
              display: "inline-block", background: steps[step].color + "25",
              color: steps[step].color, borderRadius: 4, fontSize: 10,
              fontWeight: 700, padding: "3px 9px", marginBottom: 14,
              textTransform: "uppercase", letterSpacing: "0.1em",
            }}>{steps[step].tag}</div>
            <h3 style={{
              color: "#0f172a", fontFamily: "'Georgia', serif",
              fontSize: 24, margin: "0 0 18px", lineHeight: 1.35,
            }}>{steps[step].title}</h3>
            <p style={{ color: "#374151", fontSize: 14, lineHeight: 1.85 }}>{steps[step].explain}</p>

            {/* Step progress dots */}
            <div style={{ marginTop: 28, display: "flex", gap: 7, alignItems: "center" }}>
              {steps.map((_, i) => (
                <div
                  key={i}
                  onClick={() => { setStep(i); setAuto(false); }}
                  style={{
                    width: i === step ? 24 : 8, height: 8, borderRadius: 4,
                    background: i === step ? steps[step].color : "#d1d5db",
                    cursor: "pointer", transition: "all 0.35s",
                  }}
                />
              ))}
              <span style={{ fontSize: 11, color: "#444", marginLeft: 8 }}>{step + 1} / {steps.length}</span>
            </div>

            <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
              <button onClick={() => { setStep(s => Math.max(0, s - 1)); setAuto(false); }} style={{
                background: "#f0f2f5", color: "#6b7280", border: "1px solid #dde1e8",
                borderRadius: 6, padding: "7px 14px", fontSize: 12, cursor: "pointer",
              }}>← Prev</button>
              <button onClick={() => { setStep(s => (s + 1) % steps.length); setAuto(false); }} style={{
                background: steps[step].color, color: "#ffffff", border: "none",
                borderRadius: 6, padding: "7px 14px", fontSize: 12, cursor: "pointer", fontWeight: 600,
              }}>Next →</button>
            </div>
          </div>

          {/* Right: live visualization */}
          <div style={{
            background: "#f5f7fa", borderRadius: 14, padding: 24,
            border: `1px solid ${steps[step].color}30`,
            minHeight: 340, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "border-color 0.3s",
          }}>
            {steps[step].visual}
          </div>
        </div>
      </Container>
    </SectionWrap>
  );
}

// ─── STEP VISUALIZATION COMPONENTS ───────────────────────────────────────────

function InputViz() {
  const seq = ["M","K","T","A","Y","I","A","K","Q","R","Q","S"];
  const aaColors = [COLORS.teal,COLORS.coral,COLORS.blue,COLORS.purple,COLORS.amber,COLORS.green];
  const [scanPos, setScanPos] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setScanPos(p => (p + 1) % seq.length), 400);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ width: "100%", color: "#1f2937" }}>
      <p style={{ fontSize: 11, color: "#555", marginBottom: 12, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Input: amino acid sequence
      </p>
      <div style={{ display: "flex", gap: 4, justifyContent: "center", marginBottom: 18, flexWrap: "nowrap", overflow: "hidden" }}>
        {seq.map((aa, i) => (
          <div key={i} style={{
            width: 26, height: 30, borderRadius: 5, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            background: i === scanPos ? aaColors[i % aaColors.length] : aaColors[i % aaColors.length] + "25",
            color: i === scanPos ? "#fff" : aaColors[i % aaColors.length],
            fontSize: 11, fontWeight: 700,
            border: `1px solid ${aaColors[i % aaColors.length]}44`,
            transition: "all 0.2s", flexShrink: 0,
          }}>
            {aa}
            <div style={{ fontSize: 7, opacity: 0.6, lineHeight: 1 }}>{i+1}</div>
          </div>
        ))}
        <div style={{ width:22, height:30, borderRadius:5, background:"#e8ecf0", display:"flex", alignItems:"center", justifyContent:"center", color:"#6b7280", fontSize:10, flexShrink:0 }}>…</div>
      </div>

      <div style={{ background: "#f0f2f5", borderRadius: 8, padding: 14, border: "1px solid #e2e6ea", marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: "#444", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Three inputs AlphaFold uses:</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "1. Sequence", desc: "the string of letters you provide", color: COLORS.blue, arrow: "→ tells it WHAT to fold" },
            { label: "2. MSA (evolution)", desc: "same protein in 1000s of species", color: COLORS.purple, arrow: "→ tells it WHICH pairs are near" },
            { label: "3. Templates", desc: "similar proteins already solved", color: COLORS.amber, arrow: "→ gives a rough starting shape" },
          ].map((x, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ background: x.color+"22", border:`1px solid ${x.color}44`, borderRadius: 5, padding: "5px 9px", minWidth: 110 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: x.color }}>{x.label}</div>
                <div style={{ fontSize: 9, color: "#555" }}>{x.desc}</div>
              </div>
              <div style={{ fontSize: 10, color: "#444" }}>{x.arrow}</div>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 10, color: "#444", textAlign: "center" }}>
        Reading position <strong style={{ color: aaColors[scanPos % aaColors.length] }}>{scanPos + 1}</strong>: <strong style={{ color: aaColors[scanPos % aaColors.length] }}>{seq[scanPos]}</strong>
      </p>
    </div>
  );
}

function MSAViz() {
  // Co-evolving columns: positions 1 and 4 (0-indexed) always change together
  const species = ["Human  ", "Mouse  ", "Chicken", "Fish   ", "Yeast  ", "Worm   "];
  const seqs = [
    ["A","R","G","T","C","K"],
    ["A","Q","G","S","C","R"],
    ["A","R","D","T","C","K"],
    ["A","R","G","S","C","K"],
    ["A","Q","G","S","M","R"],
    ["A","R","D","T","C","K"],
  ];
  const [flashCol, setFlashCol] = useState(-1);
  const [showArrow, setShowArrow] = useState(false);
  const coevolving = [1, 3]; // these two columns always change together

  useEffect(() => {
    let phase = 0;
    const t = setInterval(() => {
      phase = (phase + 1) % 6;
      if (phase === 2) { setFlashCol(1); setShowArrow(false); }
      else if (phase === 3) { setFlashCol(3); setShowArrow(false); }
      else if (phase === 4) { setFlashCol(-1); setShowArrow(true); }
      else { setFlashCol(-1); setShowArrow(false); }
    }, 900);
    return () => clearInterval(t);
  }, []);

  const aaColors = [COLORS.teal, COLORS.coral, COLORS.blue, COLORS.purple, COLORS.amber, COLORS.green];

  return (
    <div style={{ width: "100%" }}>
      <p style={{ fontSize: 10, color: "#555", marginBottom: 10, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Same protein across 6 species — watching which positions change together
      </p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ fontSize: 10, borderCollapse: "collapse", width: "100%", minWidth: 260 }}>
          <thead>
            <tr>
              <td style={{ color: "#444", paddingRight: 8, fontSize: 9, paddingBottom: 4 }}>Species</td>
              {seqs[0].map((_, ci) => (
                <td key={ci} style={{
                  textAlign: "center", width: 28, padding: "2px",
                  color: coevolving.includes(ci)
                    ? (ci === flashCol ? COLORS.coral : COLORS.coral + "88")
                    : "#333",
                  fontWeight: coevolving.includes(ci) ? 700 : 400,
                  fontSize: 9,
                  background: ci === flashCol ? COLORS.coral + "22" : "transparent",
                  transition: "background 0.3s",
                  borderRadius: 3,
                }}>p{ci + 1}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {species.map((sp, si) => (
              <tr key={si}>
                <td style={{ color: "#555", paddingRight: 8, fontSize: 9, paddingBottom: 2, whiteSpace: "nowrap" }}>{sp}</td>
                {seqs[si].map((aa, ci) => (
                  <td key={ci} style={{ textAlign: "center", padding: "2px" }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 4, display: "flex",
                      alignItems: "center", justifyContent: "center",
                      background: coevolving.includes(ci)
                        ? (ci === flashCol ? COLORS.coral + "55" : COLORS.coral + "22")
                        : aaColors[si % aaColors.length] + "20",
                      color: coevolving.includes(ci) ? COLORS.coral : aaColors[si % aaColors.length],
                      fontWeight: 700, fontSize: 10, margin: "0 auto",
                      border: ci === flashCol ? `1px solid ${COLORS.coral}` : "1px solid transparent",
                      transition: "all 0.3s",
                    }}>{aa}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: 12, padding: "9px 12px", borderRadius: 7,
        background: showArrow ? COLORS.coral + "18" : "#f5f7fa",
        border: `1px solid ${showArrow ? COLORS.coral + "55" : "#e2e6ea"}`,
        transition: "all 0.4s",
      }}>
        {showArrow ? (
          <p style={{ fontSize: 11, color: COLORS.coral, margin: 0, fontWeight: 600 }}>
            ✓ Positions 2 &amp; 4 always mutate together across all species
            → they must be physically touching in 3D!
          </p>
        ) : (
          <p style={{ fontSize: 11, color: "#444", margin: 0 }}>
            Watching position {flashCol >= 0 ? flashCol + 1 : "…"} change across species…
          </p>
        )}
      </div>

      <p style={{ fontSize: 10, color: "#333", marginTop: 10, lineHeight: 1.6 }}>
        AlphaFold does this for every pair of positions simultaneously. The result is a co-evolution map that hints at which amino acids are 3D neighbours.
      </p>
    </div>
  );
}

function TemplateViz() {
  const [scanIdx, setScanIdx] = useState(0);
  const [matched, setMatched] = useState(false);
  const templates = [
    { seq: "A-R-G-T-C-K", sim: 91, match: true,  name: "Myoglobin (PDB:1MBN)" },
    { seq: "M-K-T-A-Y-I", sim: 18, match: false, name: "Lysozyme (PDB:2LYZ)" },
    { seq: "A-Q-G-T-C-R", sim: 77, match: true,  name: "Hemoglobin β (PDB:2HHB)" },
    { seq: "P-L-V-Q-T-M", sim: 12, match: false, name: "Collagen (PDB:1CGD)" },
  ];

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      i = (i + 1) % (templates.length + 2);
      if (i < templates.length) { setScanIdx(i); setMatched(false); }
      else { setMatched(true); }
    }, 900);
    return () => clearInterval(t);
  }, []);

  const query = "A-R-G-T-C-K";
  const colors = [COLORS.teal, COLORS.coral, COLORS.blue, COLORS.purple];

  return (
    <div style={{ width: "100%" }}>
      <p style={{ fontSize: 10, color: "#555", marginBottom: 10, textAlign: "center", textTransform: "uppercase", letterSpacing:"0.06em" }}>
        Searching the protein structure library…
      </p>

      {/* Query */}
      <div style={{ background: COLORS.blue + "18", border: `1px solid ${COLORS.blue}44`, borderRadius: 7, padding: "8px 12px", marginBottom: 12 }}>
        <div style={{ fontSize: 9, color: COLORS.blue, fontWeight: 700, marginBottom: 3 }}>YOUR PROTEIN SEQUENCE</div>
        <div style={{ fontSize: 12, fontFamily: "monospace", color: "#1f2937", fontWeight: 700 }}>{query}…</div>
      </div>

      {/* Database entries */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {templates.map((t, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            background: i === scanIdx ? "#eef0f4" : "#f8f9fb",
            border: `1px solid ${
              matched && t.match ? COLORS.teal + "88"
              : i === scanIdx ? "#d1d5db"
              : "#e5e8ed"
            }`,
            borderRadius: 6, padding: "7px 10px",
            transition: "all 0.3s",
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: "#555", marginBottom: 2 }}>{t.name}</div>
              <div style={{ fontSize: 10, fontFamily: "monospace", color: i === scanIdx ? "#aaa" : "#444" }}>{t.seq}…</div>
            </div>
            <div style={{
              fontSize: 12, fontWeight: 700, minWidth: 36, textAlign: "right",
              color: t.sim > 50 ? COLORS.teal : "#444",
            }}>{i <= scanIdx || matched ? `${t.sim}%` : "—"}</div>
            {matched && t.match && (
              <div style={{ fontSize: 10, color: COLORS.teal, fontWeight: 700 }}>✓ USE</div>
            )}
          </div>
        ))}
      </div>

      <div style={{
        padding: "9px 12px", borderRadius: 7,
        background: matched ? COLORS.teal + "15" : "#f5f7fa",
        border: `1px solid ${matched ? COLORS.teal + "55" : "#e2e6ea"}`,
        transition: "all 0.4s",
      }}>
        <p style={{ fontSize: 11, color: matched ? COLORS.teal : "#444", margin: 0, fontWeight: matched ? 600 : 400 }}>
          {matched
            ? "✓ Best match (91%) used as starting template — rough 3D sketch ready"
            : `Comparing against database entry ${scanIdx + 1}…`}
        </p>
      </div>
    </div>
  );
}

function EvoformerViz() {
  const [pass, setPass] = useState(0);
  const [phase, setPhase] = useState("single"); // "single" | "pair" | "update"
  const TOTAL = 48;

  useEffect(() => {
    let p = 0;
    let ph = 0;
    const phases = ["single", "pair", "update"];
    const t = setInterval(() => {
      ph = (ph + 1) % phases.length;
      setPhase(phases[ph]);
      if (ph === 0) {
        p = Math.min(p + 1, TOTAL);
        setPass(p);
        if (p >= TOTAL) { p = 0; }
      }
    }, 700);
    return () => clearInterval(t);
  }, []);

  const N = 6; // amino acids shown
  const cellSize = 30;
  const progress = pass / TOTAL;

  // Single representation: N rows
  // Pair representation: N×N grid
  const singleFill = (i) => {
    const confidence = progress * 0.7 + 0.3;
    return `rgba(29,158,117,${confidence * (0.4 + i * 0.1)})`;
  };
  const pairFill = (i, j) => {
    if (i === j) return "rgba(100,100,100,0.3)";
    const isCoevolving = (i === 1 && j === 3) || (i === 3 && j === 1);
    const strength = isCoevolving ? Math.min(progress * 2, 1) : progress * 0.4;
    return `rgba(127,119,221,${strength})`;
  };

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <p style={{ fontSize: 10, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>
          Evoformer — pass {Math.min(pass, TOTAL)} / {TOTAL}
        </p>
        <div style={{ fontSize: 10, color: COLORS.teal }}>
          {phase === "single" && "→ Updating singles map"}
          {phase === "pair" && "→ Updating pairs map"}
          {phase === "update" && "→ Maps cross-updating"}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
        {/* Singles map */}
        <div style={{
          borderRadius: 8, padding: 10,
          background: phase === "single" || phase === "update" ? COLORS.teal + "12" : "#f8f9fb",
          border: `1px solid ${phase === "single" || phase === "update" ? COLORS.teal + "40" : "#e5e8ed"}`,
          transition: "all 0.3s",
        }}>
          <div style={{ fontSize: 9, color: COLORS.teal, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Singles map (N × features)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {Array.from({ length: N }, (_, i) => (
              <div key={i} style={{ display: "flex", gap: 2, alignItems: "center" }}>
                <div style={{ fontSize: 9, color: "#444", width: 12 }}>aa{i+1}</div>
                <div style={{ flex: 1, height: 10, borderRadius: 2, background: singleFill(i), transition: "background 0.5s", border: "1px solid rgba(29,158,117,0.2)" }} />
              </div>
            ))}
          </div>
          <div style={{ fontSize: 9, color: "#333", marginTop: 6 }}>What type, how conserved, position in chain</div>
        </div>

        {/* Pairs map */}
        <div style={{
          borderRadius: 8, padding: 10,
          background: phase === "pair" || phase === "update" ? COLORS.purple + "12" : "#f8f9fb",
          border: `1px solid ${phase === "pair" || phase === "update" ? COLORS.purple + "40" : "#e5e8ed"}`,
          transition: "all 0.3s",
        }}>
          <div style={{ fontSize: 9, color: COLORS.purple, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Pairs map (N × N)
          </div>
          <svg viewBox={`0 0 ${N * cellSize + 4} ${N * cellSize + 4}`} style={{ width: "100%" }}>
            {Array.from({ length: N }, (_, i) =>
              Array.from({ length: N }, (_, j) => (
                <rect key={`${i}-${j}`}
                  x={j * cellSize + 2} y={i * cellSize + 2}
                  width={cellSize - 2} height={cellSize - 2}
                  rx="2" fill={pairFill(i, j)}
                  stroke={((i===1&&j===3)||(i===3&&j===1)) && progress > 0.3 ? COLORS.coral : "none"}
                  strokeWidth="1.5"
                />
              ))
            )}
          </svg>
          <div style={{ fontSize: 9, color: "#333", marginTop: 4 }}>Hot = amino acids likely to be 3D neighbours</div>
        </div>
      </div>

      {/* Double arrow between them */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: "#333" }}>
          ↑ Both maps update each other every pass ↑
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: "#f0f2f5", borderRadius: 6, height: 6 }}>
        <div style={{
          height: "100%", width: `${(pass / TOTAL) * 100}%`,
          background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.teal})`,
          borderRadius: 6, transition: "all 0.4s",
        }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#333", marginTop: 4 }}>
        <span>Pass 1</span><span>Pass 48 → structure locked</span>
      </div>
    </div>
  );
}

function TriangleViz() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setT(v => (v + 0.02) % (Math.PI * 2)), 40);
    return () => clearInterval(interval);
  }, []);

  // Animate C position — sometimes violating triangle rule
  const phase = t % (Math.PI * 2);
  const valid = Math.sin(phase * 0.7) > -0.3;

  const A = { x: 60, y: 70 };
  const B = { x: 140, y: 50 };
  const Cvalid = { x: 110, y: 120 };
  const Cbad = { x: 230, y: 150 };
  const lerp = (a, b, k) => a + (b - a) * Math.max(0, Math.min(1, k));

  // Smooth lerp between valid/invalid
  const transitionK = valid ? Math.min((phase % (Math.PI * 0.5)) * 4, 1) : Math.min((phase % (Math.PI * 0.5)) * 4, 1);
  const C = {
    x: valid ? lerp(Cbad.x, Cvalid.x, Math.min(t * 0.8, 1)) : lerp(Cvalid.x, Cbad.x, 0.7),
    y: valid ? lerp(Cbad.y, Cvalid.y, Math.min(t * 0.8, 1)) : lerp(Cvalid.y, Cbad.y, 0.7),
  };

  const distAB = Math.sqrt((B.x-A.x)**2+(B.y-A.y)**2);
  const distBC = Math.sqrt((C.x-B.x)**2+(C.y-B.y)**2);
  const distAC = Math.sqrt((C.x-A.x)**2+(C.y-A.y)**2);
  const triangleOK = distAC <= distAB + distBC + 10;

  return (
    <div style={{ width: "100%" }}>
      <p style={{ fontSize: 10, color: "#555", marginBottom: 10, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Triangle rule — enforced inside every Evoformer pass
      </p>

      <svg viewBox="0 0 280 200" style={{ width: "100%" }}>
        {/* Distance labels */}
        <text x={(A.x+B.x)/2} y={(A.y+B.y)/2 - 8} textAnchor="middle" fontSize="9" fill={COLORS.blue + "cc"}>A↔B: near</text>
        <text x={(B.x+C.x)/2 + 10} y={(B.y+C.y)/2} fontSize="9" fill={COLORS.blue + "cc"}>B↔C: near</text>

        {/* A–B line */}
        <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={COLORS.blue} strokeWidth="2" />
        {/* B–C line */}
        <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke={COLORS.blue} strokeWidth="2" style={{ transition: "all 0.1s" }} />
        {/* A–C line (the one being checked) */}
        <line x1={A.x} y1={A.y} x2={C.x} y2={C.y}
          stroke={triangleOK ? COLORS.teal : COLORS.coral}
          strokeWidth="2.5"
          strokeDasharray={triangleOK ? "none" : "6,4"}
          style={{ transition: "stroke 0.3s" }}
        />

        {/* Node A */}
        <circle cx={A.x} cy={A.y} r="14" fill="#f0f2f5" stroke={COLORS.blue} strokeWidth="2" />
        <text x={A.x} y={A.y+4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">A</text>

        {/* Node B */}
        <circle cx={B.x} cy={B.y} r="14" fill="#f0f2f5" stroke={COLORS.blue} strokeWidth="2" />
        <text x={B.x} y={B.y+4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0f172a">B</text>

        {/* Node C — animated */}
        <circle cx={C.x} cy={C.y} r="14" fill="#f0f2f5"
          stroke={triangleOK ? COLORS.teal : COLORS.coral}
          strokeWidth="2.5" style={{ transition: "cx 0.4s, cy 0.4s, stroke 0.3s" }} />
        <text x={C.x} y={C.y+4} textAnchor="middle" fontSize="11" fontWeight="700"
          fill={triangleOK ? COLORS.teal : COLORS.coral}>C</text>

        {/* Verdict box */}
        <rect x="20" y="158" width="240" height="32" rx="5"
          fill={triangleOK ? COLORS.teal + "20" : COLORS.coral + "20"}
          stroke={triangleOK ? COLORS.teal + "55" : COLORS.coral + "55"}
          style={{ transition: "all 0.3s" }}
        />
        <text x="140" y="178" textAnchor="middle" fontSize="11" fontWeight="700"
          fill={triangleOK ? COLORS.teal : COLORS.coral}>
          {triangleOK
            ? "✓ A and C close enough — geometry valid"
            : "✗ A and C too far apart — violates triangle rule, rejected"}
        </text>
      </svg>

      <div style={{ background: "#f8f9fb", borderRadius: 7, padding: "8px 12px", border: "1px solid #e5e8ed" }}>
        <p style={{ fontSize: 11, color: "#444", margin: 0, lineHeight: 1.6 }}>
          Rule: if A↔B are near and B↔C are near, then A↔C can't be far. AlphaFold checks every possible trio of amino acids. This eliminates physically impossible arrangements before they reach the Structure Module.
        </p>
      </div>
    </div>
  );
}

function StructureModuleViz() {
  const [smPass, setSmPass] = useState(0);
  const [frameIdx, setFrameIdx] = useState(0);
  const SM_PASSES = 8;

  useEffect(() => {
    const t = setInterval(() => {
      setSmPass(p => {
        if (p >= SM_PASSES) { setFrameIdx(f => (f + 1) % 6); return 0; }
        return p + 1;
      });
      setFrameIdx(f => (f + 1) % 6);
    }, 500);
    return () => clearInterval(t);
  }, []);

  // 6 amino acids placed in 3D (projected to 2D)
  const basePositions = [
    {x:100, y:80}, {x:130, y:60}, {x:160, y:80}, {x:155, y:110},
    {x:125, y:125}, {x:95, y:108},
  ];
  const noiseScale = Math.max(0, 1 - smPass / SM_PASSES) * 20;
  const colors = [COLORS.teal, COLORS.coral, COLORS.blue, COLORS.purple, COLORS.amber, COLORS.green];

  // Jitter decreases as passes increase
  const pos = basePositions.map((p, i) => ({
    x: p.x + Math.sin(frameIdx * 1.3 + i * 2.1) * noiseScale * (SM_PASSES - smPass) / SM_PASSES,
    y: p.y + Math.cos(frameIdx * 1.1 + i * 1.7) * noiseScale * (SM_PASSES - smPass) / SM_PASSES,
  }));

  // Orientation arrows (backbone direction)
  const angles = [30, 50, 70, 100, 130, 160].map(a => a + (smPass < SM_PASSES ? (Math.random()-0.5)*30 : 0));

  return (
    <div style={{ width: "100%" }}>
      <p style={{ fontSize: 10, color: "#555", marginBottom: 8, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Structure Module — placing atoms in 3D ({SM_PASSES} refinement passes)
      </p>

      <svg viewBox="0 0 260 185" style={{ width: "100%" }}>
        {/* Bonds */}
        {pos.slice(0,-1).map((p, i) => (
          <line key={i} x1={pos[i].x} y1={pos[i].y} x2={pos[i+1].x} y2={pos[i+1].y}
            stroke="#d1d5db" strokeWidth="2" />
        ))}
        {/* Close the loop */}
        <line x1={pos[5].x} y1={pos[5].y} x2={pos[0].x} y2={pos[0].y}
          stroke="#d1d5db" strokeWidth="1" strokeDasharray="3,3" />

        {/* Atoms with orientation arrows */}
        {pos.map((p, i) => {
          const ang = (angles[i] * Math.PI) / 180;
          const arrowLen = 16;
          return (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="10" fill={colors[i]} opacity="0.85" />
              <text x={p.x} y={p.y+4} textAnchor="middle" fontSize="8" fontWeight="700" fill="#0f172a">aa{i+1}</text>
              {/* Orientation arrow */}
              <line
                x1={p.x} y1={p.y}
                x2={p.x + Math.cos(ang) * arrowLen} y2={p.y + Math.sin(ang) * arrowLen}
                stroke={colors[i]} strokeWidth="1.5" opacity="0.7"
              />
              <circle
                cx={p.x + Math.cos(ang) * arrowLen} cy={p.y + Math.sin(ang) * arrowLen}
                r="2.5" fill={colors[i]} opacity="0.7"
              />
            </g>
          );
        })}

        {/* Pass counter */}
        <rect x="8" y="155" width="244" height="22" rx="4" fill="#eff1f4" stroke="#d1d5db" />
        <rect x="8" y="155" width={`${(smPass / SM_PASSES) * 244}`} height="22" rx="4"
          fill={COLORS.green + "33"} />
        <text x="130" y="170" textAnchor="middle" fontSize="9" fill={COLORS.green}>
          Pass {smPass}/{SM_PASSES} — positions + orientations refining
        </text>
      </svg>

      <div style={{ background: "#f8f9fb", borderRadius: 7, padding: "8px 12px", border: "1px solid #e5e8ed" }}>
        <p style={{ fontSize: 11, color: "#444", margin: 0, lineHeight: 1.6 }}>
          Each amino acid gets a <strong style={{color:"#666"}}>position</strong> (x,y,z) AND an <strong style={{color:"#666"}}>orientation</strong> (which way it faces). Think of placing chairs in a room — you need both WHERE and WHICH WAY. This runs 8 times, each pass tightening atom positions.
        </p>
      </div>
    </div>
  );
}

function StructureOutputViz() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 1200);
    return () => clearInterval(t);
  }, []);

  const plddt = [95, 88, 72, 91, 65, 43, 38, 82, 90, 55, 93, 77];
  const getColor = (s) =>
    s >= 90 ? "#1565c0" : s >= 70 ? "#29b6f6" : s >= 50 ? "#f9a825" : "#e53935";
  const getLabel = (s) =>
    s >= 90 ? "Very confident" : s >= 70 ? "Confident" : s >= 50 ? "Low confidence" : "Likely disordered";

  const highlighted = tick % plddt.length;

  const cx = 130, cy = 90, r = 60;
  const positions = plddt.map((_, i) => {
    const angle = (i / plddt.length) * Math.PI * 2 - Math.PI / 2;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r };
  });

  return (
    <div style={{ width: "100%" }}>
      <p style={{ fontSize: 10, color: "#555", marginBottom: 8, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Output: 3D coords + per-residue confidence (pLDDT)
      </p>

      <svg viewBox="0 0 260 200" style={{ width: "100%" }}>
        {/* Bonds */}
        {positions.slice(0,-1).map((p, i) => (
          <line key={i} x1={p.x} y1={p.y} x2={positions[i+1].x} y2={positions[i+1].y}
            stroke="#d1d5db" strokeWidth="2" />
        ))}
        <line x1={positions[11].x} y1={positions[11].y} x2={positions[0].x} y2={positions[0].y}
          stroke="#d1d5db" strokeWidth="2" />

        {/* Atoms colored by pLDDT */}
        {positions.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y}
              r={i === highlighted ? 11 : 8}
              fill={getColor(plddt[i])}
              stroke={i === highlighted ? "#fff" : "none"}
              strokeWidth="2"
              style={{ transition: "r 0.3s" }}
            />
            {i === highlighted && (
              <text x={p.x} y={p.y - 15} textAnchor="middle" fontSize="8" fill={getColor(plddt[i])} fontWeight="700">
                {plddt[i]}
              </text>
            )}
          </g>
        ))}

        {/* Highlighted info */}
        {highlighted !== null && (
          <g>
            <rect x="70" y="162" width="120" height="28" rx="4"
              fill={getColor(plddt[highlighted]) + "22"}
              stroke={getColor(plddt[highlighted]) + "66"} />
            <text x="130" y="174" textAnchor="middle" fontSize="9" fill={getColor(plddt[highlighted])} fontWeight="700">
              aa{highlighted+1}: pLDDT = {plddt[highlighted]}
            </text>
            <text x="130" y="184" textAnchor="middle" fontSize="8" fill={getColor(plddt[highlighted])}>
              {getLabel(plddt[highlighted])}
            </text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 10, flexWrap: "wrap" }}>
        {[["#1565c0","90-100 Very confident"],["#29b6f6","70-90 Good"],["#f9a825","50-70 Low"],["#e53935","<50 Disordered"]].map(([c,l]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: c, flexShrink: 0 }} />
            <span style={{ fontSize: 9, color: "#555" }}>{l}</span>
          </div>
        ))}
      </div>

      <div style={{ background: "#f8f9fb", borderRadius: 7, padding: "8px 12px", border: "1px solid #e5e8ed" }}>
        <p style={{ fontSize: 11, color: "#444", margin: 0, lineHeight: 1.6 }}>
          Red (very low pLDDT) doesn't mean the prediction is wrong — it means that region is genuinely floppy in real life and has no fixed shape. AlphaFold is telling you something biologically important.
        </p>
      </div>
    </div>
  );
}

// ─── SECTION 7: ALPHAFOLD 3 — FULL REWRITE ────────────────────────────────────
function AF3Section() {
  const [activeTab, setActiveTab] = useState(0);
  const [diffStep, setDiffStep] = useState(0);
  const [diffRunning, setDiffRunning] = useState(true);
  const [dockStep, setDockStep] = useState(0);
  const [dockRunning, setDockRunning] = useState(true);

  useEffect(() => {
    if (!diffRunning) return;
    const t = setInterval(() => setDiffStep(s => (s + 1) % 60), 100);
    return () => clearInterval(t);
  }, [diffRunning]);

  useEffect(() => {
    if (!dockRunning) return;
    const t = setInterval(() => setDockStep(s => (s + 1) % 80), 120);
    return () => clearInterval(t);
  }, [dockRunning]);

  const tabs = [
    { label: "AF2 vs AF3", color: COLORS.amber },
    { label: "Diffusion Engine", color: COLORS.purple },
    { label: "Drug Docking", color: COLORS.teal },
    { label: "All Molecules", color: COLORS.coral },
  ];

  return (
    <SectionWrap id="af3" bg="#ffffff">
      <Container>
        <Tag color={COLORS.amber}>Chapter 6</Tag>
        <BigHeading>
          <span style={{ color: "#0f172a" }}>AlphaFold 3</span>{" "}
          <span style={{ color: COLORS.amber }}>— The Upgrade</span>
        </BigHeading>
        <p style={{ fontSize: 17, color: "#4b5563", lineHeight: 1.75, marginBottom: 36, maxWidth: 680 }}>
          AlphaFold 2 solved proteins. But in biology, nothing works alone. Drugs attach to proteins. Proteins switch genes on and off. AF3 models the whole system — and uses a completely different technique to do it.
        </p>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{
              background: activeTab === i ? tab.color : tab.color + "20",
              color: activeTab === i ? "#fff" : tab.color,
              border: `1px solid ${tab.color}44`,
              borderRadius: 20, padding: "6px 16px", fontSize: 12,
              fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}>{tab.label}</button>
          ))}
        </div>

        {/* Tab content */}
        {activeTab === 0 && <AF3CompareTab />}
        {activeTab === 1 && <DiffusionTab step={diffStep} running={diffRunning} onToggle={() => setDiffRunning(r => !r)} />}
        {activeTab === 2 && <DockingTab step={dockStep} running={dockRunning} onToggle={() => setDockRunning(r => !r)} />}
        {activeTab === 3 && <MoleculesTab />}
      </Container>
    </SectionWrap>
  );
}

function AF3CompareTab() {
  const rows = [
    { aspect: "What it handles", af2: "Proteins only", af3: "Proteins + DNA + RNA + drugs + more" },
    { aspect: "Core architecture", af2: "Evoformer (48 passes)", af3: "Pairformer (lighter) + Diffusion module" },
    { aspect: "Structure generation", af2: "Structure Module (place atoms via frames)", af3: "Diffusion: start from noise, denoise to structure" },
    { aspect: "MSA importance", af2: "Critical — deep MSA needed", af3: "Less critical — Pairformer relies more on pair repr." },
    { aspect: "Drug interactions", af2: "Not supported", af3: "Predicts drug-protein binding directly" },
    { aspect: "Output resolution", af2: "Per amino acid (residue level)", af3: "Per atom (all heavy atoms)" },
    { aspect: "Molecule types", af2: "1 type", af3: "Proteins, DNA, RNA, ligands, ions together" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }}>
      <div>
        <h3 style={{ color: "#0f172a", fontSize: 20, marginBottom: 20, fontFamily: "'Georgia', serif" }}>What changed from AF2 to AF3?</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, borderRadius: 10, overflow: "hidden", border: "1px solid #e5e8ed" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
            <div style={{ background: "#f8f9fb", padding: "8px 12px", fontSize: 10, color: "#444", textTransform: "uppercase", letterSpacing: "0.06em" }}>What</div>
            <div style={{ background: "#f0f2f5", padding: "8px 12px", fontSize: 10, color: COLORS.blue, fontWeight: 700, textAlign: "center" }}>AlphaFold 2</div>
            <div style={{ background: "#f0f2f5", padding: "8px 12px", fontSize: 10, color: COLORS.amber, fontWeight: 700, textAlign: "center" }}>AlphaFold 3</div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, borderTop: "1px solid #e8ecf0" }}>
              <div style={{ background: "#f5f7fa", padding: "9px 12px", fontSize: 11, color: "#555" }}>{r.aspect}</div>
              <div style={{ background: "#f5f7fa", padding: "9px 12px", fontSize: 11, color: "#4b5563", textAlign: "center" }}>{r.af2}</div>
              <div style={{ background: "#0d0d0d", padding: "9px 12px", fontSize: 11, color: COLORS.amber + "cc", textAlign: "center", fontWeight: r.af3 !== r.af2 ? 600 : 400 }}>{r.af3}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ color: "#0f172a", fontSize: 20, marginBottom: 20, fontFamily: "'Georgia', serif" }}>The biggest change: Diffusion</h3>
        <div style={{ background: "#f8f9fb", borderRadius: 12, padding: 20, border: "1px solid #e5e8ed", marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.amber, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>AF2: Structure Module approach</div>
          <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, margin: 0 }}>
            Takes the Evoformer output and places each amino acid like a 3D puzzle piece — position + rotation assigned directly. Very fast, very good for proteins.
          </p>
        </div>
        <div style={{ background: "#f8f9fb", borderRadius: 12, padding: 20, border: `1px solid ${COLORS.amber}33` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.amber, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>AF3: Diffusion approach</div>
          <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.7, margin: "0 0 12px" }}>
            Start with all atoms placed randomly (pure noise). Then, guided by what Pairformer learned, nudge every atom toward its correct position — step by step, like wiping fog off a window. Works for ANY type of molecule.
          </p>
          <div style={{ background: "#f0f4f8", borderRadius: 8, padding: "10px 12px", border: `1px solid ${COLORS.purple}33` }}>
            <div style={{ fontSize: 10, color: COLORS.purple, fontWeight: 700, marginBottom: 4 }}>Why diffusion is better for AF3's goal:</div>
            <p style={{ fontSize: 12, color: "#555", margin: 0, lineHeight: 1.6 }}>
              Drug molecules, DNA, and RNA have completely different structures to proteins. Diffusion doesn't care — it works on ANY collection of atoms. The Structure Module was protein-specific.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiffusionTab({ step, running, onToggle }) {
  const TOTAL = 60;
  const t = step / TOTAL;
  const ease = t * t * (3 - 2 * t);

  // 12 atoms: start random, converge to helix-like structure
  const finalPositions = [
    {x:120,y:55},{x:145,y:65},{x:160,y:82},{x:155,y:103},
    {x:135,y:115},{x:113,y:110},{x:97,y:95},{x:100,y:75},
    {x:118,y:68},{x:140,y:75},{x:150,y:93},{x:138,y:108},
  ];
  const seed = 42;
  const startPositions = finalPositions.map((_, i) => ({
    x: 80 + ((i * 37 + seed) % 100),
    y: 40 + ((i * 53 + seed * 2) % 100),
  }));

  const lerp = (a, b, t) => a + (b - a) * t;
  const jitter = Math.max(0, 1 - ease) * 12;

  const positions = finalPositions.map((fp, i) => ({
    x: lerp(startPositions[i].x, fp.x, ease) + Math.sin(step * 0.3 + i) * jitter,
    y: lerp(startPositions[i].y, fp.y, ease) + Math.cos(step * 0.2 + i) * jitter,
  }));

  const stageLabel =
    ease < 0.15 ? "Pure noise — atoms scattered randomly"
    : ease < 0.4 ? "Early denoising — first hints of shape"
    : ease < 0.7 ? "Mid denoising — structure emerging clearly"
    : ease < 0.9 ? "Late denoising — fine-tuning positions"
    : "Done — correct 3D structure converged";

  const stageColor =
    ease < 0.3 ? COLORS.coral : ease < 0.6 ? COLORS.amber : COLORS.teal;

  const colors = [COLORS.teal,COLORS.coral,COLORS.blue,COLORS.purple,COLORS.amber,COLORS.green];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
      <div>
        <h3 style={{ color: "#0f172a", fontSize: 20, marginBottom: 16, fontFamily: "'Georgia', serif" }}>
          Diffusion: from chaos to structure
        </h3>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, marginBottom: 20 }}>
          Borrowed from AI image generators like DALL-E. The key idea: teach an AI to reverse the process of making something messy, and it learns to make things clean.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Training time", desc: "Add random noise to known protein structures. Teach the model to undo each step of that noise addition.", color: COLORS.purple },
            { label: "Inference time", desc: "Start with pure random atom positions. Use the learned 'undo noise' ability to gradually move every atom toward where it should be.", color: COLORS.teal },
            { label: "The conditioning", desc: "Unlike image diffusion, AF3 always knows WHAT it's building — the Pairformer pair representation guides every denoising step. Not random creativity, constrained physics.", color: COLORS.amber },
          ].map((s, i) => (
            <div key={i} style={{ background: "#f8f9fb", borderRadius: 8, padding: "12px 16px", border: `1px solid ${s.color}22` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: s.color, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              <p style={{ fontSize: 13, color: "#666", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <button onClick={onToggle} style={{
          background: "transparent", border: `1px solid ${COLORS.amber}`,
          color: COLORS.amber, borderRadius: 8, padding: "8px 18px",
          fontSize: 12, cursor: "pointer", fontWeight: 700,
        }}>{running ? "⏸ Pause" : "▶ Play"}</button>
      </div>

      <div>
        <div style={{ background: "#f8f9fb", borderRadius: 12, padding: 20, border: "1px solid #e5e8ed" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.06em" }}>Denoising in progress</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: stageColor }}>
              {Math.round(ease * 100)}% complete
            </span>
          </div>

          <svg viewBox="0 0 240 190" style={{ width: "100%", marginBottom: 10 }}>
            {positions.slice(0,-1).map((p,i) => (
              <line key={i} x1={p.x} y1={p.y} x2={positions[i+1].x} y2={positions[i+1].y}
                stroke={stageColor + "55"} strokeWidth="2" />
            ))}
            {positions.map((p,i) => (
              <circle key={i} cx={p.x} cy={p.y} r={5 + (1-ease)*3}
                fill={colors[i % colors.length]} opacity={0.6 + ease * 0.4} />
            ))}
          </svg>

          <div style={{ background: "#f0f4f8", borderRadius: 6, height: 8, marginBottom: 8 }}>
            <div style={{
              height: "100%", width: `${ease * 100}%`,
              background: `linear-gradient(90deg, ${COLORS.coral}, ${COLORS.amber}, ${COLORS.teal})`,
              borderRadius: 6, transition: "width 0.1s",
            }} />
          </div>

          <div style={{
            background: stageColor + "15", border: `1px solid ${stageColor}44`,
            borderRadius: 6, padding: "8px 12px", textAlign: "center",
          }}>
            <p style={{ fontSize: 11, color: stageColor, margin: 0, fontWeight: 600 }}>{stageLabel}</p>
          </div>
        </div>

        <div style={{ marginTop: 14, background: "#f8f9fb", borderRadius: 10, padding: 16, border: "1px solid #e5e8ed" }}>
          <div style={{ fontSize: 11, color: "#444", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Multi-scale attention inside AF3</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { label: "Atom-level attention", desc: "Looks at nearby atoms only (local chemistry — bond angles, distances)", color: COLORS.purple },
              { label: "Token-level attention", desc: "Looks at all amino acids/residues globally (long-range structure)", color: COLORS.teal },
              { label: "Atom-level again", desc: "Refines local positions with global context now known", color: COLORS.blue },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, marginTop: 5, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.label}: </span>
                  <span style={{ fontSize: 11, color: "#555" }}>{s.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DockingTab({ step, running, onToggle }) {
  const TOTAL = 80;
  const t = (step % TOTAL) / TOTAL;
  const ease = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;

  // Drug molecule approaching and docking into protein pocket
  const drugStart = { x: 200, y: 70 };
  const drugDocked = { x: 120, y: 95 };
  const lerp = (a, b, k) => a + (b - a) * k;

  const drugPos = {
    x: lerp(drugStart.x, drugDocked.x, ease),
    y: lerp(drugStart.y, drugDocked.y, ease),
  };
  const docked = ease > 0.85;

  // Protein backbone points
  const proteinPoints = [
    {x:55,y:60},{x:80,y:45},{x:105,y:55},{x:120,y:75},
    {x:125,y:100},{x:110,y:118},{x:85,y:115},{x:65,y:100},{x:58,y:80},
  ];
  // Binding pocket highlight
  const pocketCenter = { x: 115, y: 90 };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
      <div>
        <h3 style={{ color: "#0f172a", fontSize: 20, marginBottom: 16, fontFamily: "'Georgia', serif" }}>
          Drug docking: why this matters for medicine
        </h3>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, marginBottom: 20 }}>
          Almost every drug works by slotting a small molecule into a protein's pocket, changing how that protein behaves. AF3 can predict exactly where and how a drug docks — which used to take months of physical experiments.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {[
            { step: "1", label: "Protein pocket", desc: "AlphaFold identifies the protein's 3D structure including its binding pockets — grooves and cavities on the surface.", color: COLORS.teal },
            { step: "2", label: "Drug molecule", desc: "AF3 models the drug as a 'ligand' — each heavy atom gets its own token, same as amino acids.", color: COLORS.coral },
            { step: "3", label: "Docking prediction", desc: "AF3 runs diffusion to predict exactly how the drug positions itself inside the pocket — orientation, contacts, everything.", color: COLORS.purple },
            { step: "4", label: "Confidence score", desc: "Output includes a confidence score (ipTM) for the interaction — how sure is it that this binding mode is correct?", color: COLORS.amber },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%", background: s.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, color: "#0f172a", flexShrink: 0, marginTop: 2,
              }}>{s.step}</div>
              <div style={{ background: "#f8f9fb", borderRadius: 8, padding: "10px 14px", flex: 1, border: `1px solid ${s.color}22` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.label}</div>
                <p style={{ fontSize: 12, color: "#666", margin: 0, lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onToggle} style={{
          background: "transparent", border: `1px solid ${COLORS.teal}`,
          color: COLORS.teal, borderRadius: 8, padding: "8px 18px",
          fontSize: 12, cursor: "pointer", fontWeight: 700,
        }}>{running ? "⏸ Pause" : "▶ Play"}</button>
      </div>

      <div>
        <div style={{ background: "#f8f9fb", borderRadius: 12, padding: 20, border: "1px solid #e5e8ed" }}>
          <div style={{ fontSize: 11, color: "#444", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
            Live: drug molecule approaching protein pocket
          </div>
          <svg viewBox="0 0 260 165" style={{ width: "100%", marginBottom: 10 }}>
            {/* Protein backbone */}
            {proteinPoints.slice(0,-1).map((p,i) => (
              <line key={i} x1={p.x} y1={p.y} x2={proteinPoints[i+1].x} y2={proteinPoints[i+1].y}
                stroke={COLORS.teal} strokeWidth="3" strokeLinecap="round" />
            ))}
            {proteinPoints.map((p,i) => (
              <circle key={i} cx={p.x} cy={p.y} r="6" fill={COLORS.teal} opacity="0.8" />
            ))}

            {/* Binding pocket highlight */}
            <ellipse cx={pocketCenter.x} cy={pocketCenter.y} rx="22" ry="18"
              fill={docked ? COLORS.teal + "33" : COLORS.teal + "11"}
              stroke={COLORS.teal + (docked ? "88" : "33")} strokeWidth="1.5"
              strokeDasharray={docked ? "none" : "4,3"} style={{ transition: "all 0.4s" }} />
            {!docked && (
              <text x={pocketCenter.x} y={pocketCenter.y + 4} textAnchor="middle" fontSize="8" fill={COLORS.teal + "66"}>pocket</text>
            )}

            {/* Drug molecule */}
            <g>
              {/* Drug shape: small connected atoms */}
              {[{dx:0,dy:0},{dx:10,dy:-8},{dx:18,dy:2},{dx:8,dy:10}].map((d, i) => (
                <g key={i}>
                  {i > 0 && <line x1={drugPos.x} y1={drugPos.y} x2={drugPos.x+d.dx} y2={drugPos.y+d.dy} stroke={COLORS.coral+"99"} strokeWidth="1.5" />}
                  <circle cx={drugPos.x+d.dx} cy={drugPos.y+d.dy} r={i===0?7:5}
                    fill={COLORS.coral} opacity="0.9" />
                </g>
              ))}
            </g>

            {/* Docked state */}
            {docked && (
              <>
                <text x={pocketCenter.x} y={pocketCenter.y + 4} textAnchor="middle" fontSize="8" fill={COLORS.teal} fontWeight="700">DOCKED!</text>
                {/* Interaction lines */}
                {[{x:105,y:75},{x:125,y:78},{x:110,y:112}].map((p,i) => (
                  <line key={i} x1={drugPos.x} y1={drugPos.y} x2={p.x} y2={p.y}
                    stroke={COLORS.amber} strokeWidth="1" strokeDasharray="3,2" opacity="0.7" />
                ))}
              </>
            )}

            {/* Labels */}
            <text x="85" y="135" textAnchor="middle" fontSize="9" fill={COLORS.teal}>Protein</text>
            <text x={docked ? drugPos.x : 210} y={docked ? drugPos.y + 22 : 80} textAnchor="middle" fontSize="9" fill={COLORS.coral} style={{ transition: "all 0.5s" }}>Drug</text>
          </svg>

          <div style={{
            background: docked ? COLORS.teal + "15" : "#f5f7fa",
            border: `1px solid ${docked ? COLORS.teal + "44" : "#e5e8ed"}`,
            borderRadius: 6, padding: "8px 12px", textAlign: "center",
            transition: "all 0.4s",
          }}>
            <p style={{ fontSize: 11, color: docked ? COLORS.teal : "#444", margin: 0, fontWeight: docked ? 700 : 400 }}>
              {docked ? "✓ Binding mode predicted — contacts identified" : `Drug approaching… (${Math.round(ease * 100)}%)`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoleculesTab() {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveIdx(i => (i + 1) % 4), 2000);
    return () => clearInterval(t);
  }, []);

  const molecules = [
    {
      name: "Protein", color: COLORS.teal, tokenUnit: "per amino acid",
      analogy: "The factory machines. Enzymes that digest food, antibodies that kill viruses, hormones that send signals.",
      example: "Insulin — the hormone that controls blood sugar",
      shape: "complex folded 3D blob",
      af2: true,
    },
    {
      name: "DNA", color: COLORS.blue, tokenUnit: "per base pair",
      analogy: "The master hard drive. Contains all instructions for every protein. Rarely used directly, mostly read.",
      example: "The gene that encodes haemoglobin",
      shape: "double helix",
      af2: false,
    },
    {
      name: "RNA", color: COLORS.amber, tokenUnit: "per base",
      analogy: "A USB copy of part of the hard drive. Proteins are built by reading RNA, not DNA directly.",
      example: "mRNA used in COVID vaccines",
      shape: "single strand, can fold",
      af2: false,
    },
    {
      name: "Ligand / Drug", color: COLORS.coral, tokenUnit: "per heavy atom",
      analogy: "A small key designed to fit one specific protein lock. Changes the protein's behaviour when it docks.",
      example: "Ibuprofen — docks into COX enzymes to block pain",
      shape: "small rigid molecule",
      af2: false,
    },
  ];

  const active = molecules[activeIdx];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
      <div>
        <h3 style={{ color: "#0f172a", fontSize: 20, marginBottom: 16, fontFamily: "'Georgia', serif" }}>
          AF3 handles all molecules of life — together
        </h3>
        <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.75, marginBottom: 20 }}>
          AF2 was protein-only. AF3 can model a drug molecule docking into a protein that's sitting on a DNA strand — the whole complex, all at once, in a single prediction.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {molecules.map((m, i) => (
            <div
              key={i}
              onClick={() => setActiveIdx(i)}
              style={{
                background: i === activeIdx ? m.color + "18" : "#f8f9fb",
                border: `1.5px solid ${i === activeIdx ? m.color : "#dde3ea"}`,
                borderRadius: 10, padding: "12px 16px", cursor: "pointer",
                transition: "all 0.2s",
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i === activeIdx ? 8 : 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: i === activeIdx ? m.color : "#555" }}>{m.name}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ fontSize: 9, color: "#444", background: "#f0f2f5", borderRadius: 4, padding: "2px 6px" }}>{m.tokenUnit}</div>
                  {m.af2 && <div style={{ fontSize: 9, color: COLORS.blue, background: COLORS.blue+"15", borderRadius: 4, padding: "2px 6px", fontWeight: 700 }}>AF2 ✓</div>}
                  {!m.af2 && <div style={{ fontSize: 9, color: COLORS.amber, background: COLORS.amber+"15", borderRadius: 4, padding: "2px 6px", fontWeight: 700 }}>AF3 new</div>}
                </div>
              </div>
              {i === activeIdx && (
                <div>
                  <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 6px", lineHeight: 1.55 }}>{m.analogy}</p>
                  <div style={{ fontSize: 11, color: m.color + "99" }}>e.g. {m.example}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 style={{ color: "#0f172a", fontSize: 20, marginBottom: 16, fontFamily: "'Georgia', serif" }}>
          The real power: modeling interactions
        </h3>
        <MoleculeInteractionViz active={activeIdx} />

        <div style={{ marginTop: 16, background: "#f8f9fb", borderRadius: 10, padding: 16, border: `1px solid ${COLORS.amber}22` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.amber, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Why interactions matter more than structures</div>
          <p style={{ fontSize: 13, color: "#666", margin: 0, lineHeight: 1.7 }}>
            Knowing a protein's shape alone is like knowing what a lock looks like but not which key opens it. AF3 shows you the protein AND the key AND exactly how they fit together — that's the information you need to design new drugs.
          </p>
        </div>
      </div>
    </div>
  );
}

function MoleculeInteractionViz({ active }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 80);
    return () => clearInterval(t);
  }, []);

  const t = tick * 0.04;

  // Protein (fixed blob)
  const proteinPoints = [
    {x:100,y:65},{x:125,y:55},{x:148,y:68},{x:152,y:90},
    {x:138,y:108},{x:112,y:115},{x:90,y:100},{x:88,y:78},
  ];

  // DNA helix
  const dnaLeft = Array.from({length:8}, (_,i) => ({
    x: 35 + Math.sin(i*0.8 + t) * 12, y: 45 + i*14
  }));
  const dnaRight = Array.from({length:8}, (_,i) => ({
    x: 55 + Math.sin(i*0.8 + t + Math.PI) * 12, y: 45 + i*14
  }));

  // Drug molecule — bobs near protein pocket
  const drugX = 128 + Math.sin(t * 0.6) * (active === 3 ? 12 : 60);
  const drugY = 82 + Math.cos(t * 0.5) * (active === 3 ? 5 : 20);

  // RNA strand
  const rnaPoints = Array.from({length:6}, (_,i) => ({
    x: 170 + Math.sin(i*1.2 + t*0.5) * 15, y: 55 + i*18
  }));

  const colors = {protein: COLORS.teal, dna: COLORS.blue, rna: COLORS.amber, drug: COLORS.coral};

  return (
    <div style={{ background: "#f5f7fa", borderRadius: 12, padding: 16, border: "1px solid #e5e8ed" }}>
      <div style={{ fontSize: 10, color: "#333", textAlign: "center", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        AF3 models all of these together in one prediction
      </div>
      <svg viewBox="0 0 220 180" style={{ width: "100%" }}>
        {/* DNA helix */}
        {dnaLeft.slice(0,-1).map((p,i) => (
          <g key={i}>
            <line x1={dnaLeft[i].x} y1={dnaLeft[i].y} x2={dnaLeft[i+1].x} y2={dnaLeft[i+1].y}
              stroke={colors.dna} strokeWidth="1.5" opacity={active===1?0.9:0.3} />
            <line x1={dnaRight[i].x} y1={dnaRight[i].y} x2={dnaRight[i+1].x} y2={dnaRight[i+1].y}
              stroke={colors.dna} strokeWidth="1.5" opacity={active===1?0.9:0.3} />
            <line x1={dnaLeft[i].x} y1={dnaLeft[i].y} x2={dnaRight[i].x} y2={dnaRight[i].y}
              stroke={colors.dna+"55"} strokeWidth="1" opacity={active===1?0.7:0.2} />
          </g>
        ))}

        {/* Protein */}
        {proteinPoints.slice(0,-1).map((p,i)=>(
          <line key={i} x1={p.x} y1={p.y} x2={proteinPoints[i+1].x} y2={proteinPoints[i+1].y}
            stroke={colors.protein} strokeWidth="3" strokeLinecap="round" opacity={active===0?1:0.4} />
        ))}
        {proteinPoints.map((p,i) => (
          <circle key={i} cx={p.x} cy={p.y} r="6" fill={colors.protein} opacity={active===0?0.9:0.35} />
        ))}

        {/* RNA */}
        {rnaPoints.slice(0,-1).map((p,i)=>(
          <line key={i} x1={p.x} y1={p.y} x2={rnaPoints[i+1].x} y2={rnaPoints[i+1].y}
            stroke={colors.rna} strokeWidth="2" opacity={active===2?0.9:0.3} />
        ))}
        {rnaPoints.map((p,i)=>(
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={colors.rna} opacity={active===2?0.9:0.3} />
        ))}

        {/* Drug */}
        {[{dx:0,dy:0},{dx:8,dy:-6},{dx:14,dy:3}].map((d,i)=>(
          <circle key={i} cx={drugX+d.dx} cy={drugY+d.dy} r={i===0?6:4}
            fill={colors.drug} opacity={active===3?0.95:0.25} />
        ))}

        {/* Labels */}
        <text x="45" y="168" textAnchor="middle" fontSize="8" fill={colors.dna} opacity={active===1?1:0.4}>DNA</text>
        <text x="120" y="132" textAnchor="middle" fontSize="8" fill={colors.protein} opacity={active===0?1:0.4}>Protein</text>
        <text x="178" y="168" textAnchor="middle" fontSize="8" fill={colors.rna} opacity={active===2?1:0.4}>RNA</text>
        <text x={drugX} y={drugY+18} textAnchor="middle" fontSize="8" fill={colors.drug} opacity={active===3?1:0.4}>Drug</text>
      </svg>
    </div>
  );
}

// ─── SECTION 8: IMPACT ────────────────────────────────────────────────────────
function ImpactSection() {
  const impacts = [
    {
      title: "Malaria Vaccine",
      color: COLORS.teal,
      icon: "💉",
      stat: "500,000+ deaths/year",
      desc: "AlphaFold directly accelerated design of a new vaccine by revealing protein targets on the malaria parasite that were previously invisible to scientists.",
    },
    {
      title: "Antibiotic Resistance",
      color: COLORS.blue,
      icon: "💊",
      stat: "1.27M deaths in 2019",
      desc: "Bacteria evolve enzymes that destroy antibiotics. AlphaFold decoded the shapes of these resistance enzymes — letting scientists design drugs to block them.",
    },
    {
      title: "Synthetic Anti-Venom",
      color: COLORS.coral,
      icon: "🐍",
      stat: "~5M bites/year",
      desc: "Old anti-venom required milking snakes and injecting horses. Baker's lab used AI-designed proteins to make human-compatible synthetic anti-venom that can be mass-produced.",
    },
    {
      title: "Brain Diseases",
      color: COLORS.purple,
      icon: "🧠",
      stat: "50M Alzheimer's patients",
      desc: "Alzheimer's and Parkinson's are caused by proteins that misfold into toxic clumps. AlphaFold reveals exactly how and why this happens — pointing to new drug targets.",
    },
    {
      title: "Climate / Plastic",
      color: COLORS.green,
      icon: "🌱",
      stat: "8M tons plastic in ocean/yr",
      desc: "Baker's lab designed new proteins that break down plastic waste and capture methane from the atmosphere. Biology as programmable chemistry.",
    },
    {
      title: "New Materials",
      color: COLORS.amber,
      icon: "⚡",
      stat: "2.2M crystal structures",
      desc: "DeepMind's GNoME AI discovered 2.2 million new crystal structures, including 400,000+ stable new materials that could power next-gen batteries and superconductors.",
    },
  ];

  return (
    <SectionWrap id="impact" bg="#fff">
      <Container>
        <Tag color={COLORS.teal}>Chapter 7</Tag>
        <BigHeading>What This Unlocked for the World</BigHeading>
        <SubText>This isn't a biology story. It's a story about what AI can do when pointed at a hard scientific problem with enough data. The same pattern is now spreading across every field of science.</SubText>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20, marginBottom: 48
        }}>
          {impacts.map((item, i) => (
            <ImpactCard key={i} item={item} />
          ))}
        </div>

        {/* Final quote */}
        <div style={{
          background: "#0f172a", borderRadius: 16, padding: "40px 48px", textAlign: "center"
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.teal, marginBottom: 20, letterSpacing: "0.1em" }}>
            THE BIG PICTURE
          </div>
          <blockquote style={{
            fontFamily: "'Georgia', serif", fontSize: 24, color: "#ffffff",
            lineHeight: 1.6, margin: "0 auto 24px", maxWidth: 620, fontStyle: "italic"
          }}>
            "Speed-ups of 2× are nice. Speed-ups of 100,000× change what you do — you do fundamentally different stuff."
          </blockquote>
          <p style={{ fontSize: 14, color: "#94a3b8", margin: "0 auto", maxWidth: 560, lineHeight: 1.7 }}>
            AlphaFold didn't just speed up protein science. It made things possible that were genuinely impossible before. That's the difference. And the same AI pattern is now being aimed at climate, materials, and drug discovery.
          </p>
        </div>

        {/* Nobel */}
        <div style={{
          marginTop: 24, background: "#fffbeb", border: "1.5px solid #fbbf24",
          borderRadius: 12, padding: 24, textAlign: "center"
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏆</div>
          <h3 style={{ fontSize: 18, margin: "0 0 8px" }}>Nobel Prize in Chemistry 2024</h3>
          <p style={{ fontSize: 14, color: "#555", margin: 0, lineHeight: 1.7 }}>
            <strong>Demis Hassabis</strong> &amp; <strong>John Jumper</strong> (DeepMind) — for creating AlphaFold<br />
            <strong>David Baker</strong> (UW) — for designing brand new proteins that never existed in nature
          </p>
        </div>
      </Container>
    </SectionWrap>
  );
}

function ImpactCard({ item }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? item.color + "0d" : "#fafafa",
        border: `1.5px solid ${hovered ? item.color : "#e5e5e5"}`,
        borderRadius: 12, padding: "20px 20px",
        transition: "all 0.2s", cursor: "default",
      }}>
      <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.title}</div>
      <div style={{ fontSize: 11, color: "#999", marginBottom: 12 }}>{item.stat}</div>
      <p style={{ fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
    </div>
  );
}


// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ["hero", "protein", "problem", "old", "breakthrough", "how", "af3", "impact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; }
        h1, h2, h3, h4 { font-weight: 400; }
        input[type=range] { width: 100%; accent-color: ${COLORS.teal}; cursor: pointer; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
        section { scroll-margin-top: 52px; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
     
      <NavBar active={active} />
      <div style={{ paddingTop: 52 }}>
        <HeroSection />
        <ProteinSection />
        <ProblemSection />
        <OldMethodsSection />
        <BreakthroughSection />
        <HowItWorksSection />
        <AF3Section />
        <ImpactSection />
            <footer style={{
      textAlign:"center",
      padding:"40px 20px",
      color:"#666",
      fontSize:"14px"
    }}>
      Made By Gowtham M - {new Date().getFullYear()} 
    </footer>
      </div>
    </div>
    
  );
}