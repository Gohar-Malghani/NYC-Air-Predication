:root {
  --bg: #0b1020;
  --bg-strong: #0f172a;
  --bg-panel: rgba(18, 25, 42, 0.82);
  --bg-panel-raised: rgba(16, 22, 37, 0.96);
  --line: rgba(148, 163, 184, 0.18);
  --line-strong: rgba(148, 163, 184, 0.28);
  --ink: #edf2ff;
  --ink-soft: #b7c2d9;
  --ink-dim: #8fa1c3;
  --gold: #f7c86a;
  --gold-strong: #f2af4c;
  --teal: #5ad1bf;
  --danger: #fe7c7c;
  --shadow: rgba(8, 12, 23, 0.5);
  --radius: 18px;
  --font-display: "Fraunces", serif;
  --font-body: "IBM Plex Sans", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background:
    radial-gradient(circle at top, rgba(77, 124, 255, 0.18), transparent 30%),
    linear-gradient(180deg, var(--bg) 0%, #0b1120 100%);
  color: var(--ink);
  font-family: var(--font-body);
}

body {
  min-height: 100vh;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}

.skyline {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.skyline svg {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 42vh;
  min-height: 260px;
  opacity: 0.75;
}

.skyline::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(120% 90% at 50% 100%, transparent 0%, rgba(11, 16, 32, 0.88) 70%);
}

.bld { fill: rgba(18, 23, 35, 0.96); }
.bld-line { stroke: rgba(148, 163, 184, 0.14); stroke-width: 1; }
.window {
  fill: var(--gold);
  opacity: 0.9;
  animation: flicker 6s ease-in-out infinite;
}

@keyframes flicker {
  0%, 100% { opacity: 0.9; }
  45% { opacity: 0.9; }
  47% { opacity: 0.2; }
  50% { opacity: 0.9; }
  72% { opacity: 0.9; }
  74% { opacity: 0.28; }
  77% { opacity: 0.9; }
}

.topbar {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 40px;
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(10px);
  background: rgba(10, 15, 27, 0.35);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.02em;
}

.brand-mark {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--gold), var(--gold-strong));
  color: #0d1424;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 10px 30px rgba(247, 200, 106, 0.35);
}

.api-config {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--ink-soft);
  font-family: var(--font-mono);
  font-size: 12px;
}

.api-config label {
  opacity: 0.9;
}

.api-config input {
  width: 210px;
  padding: 9px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(17, 23, 35, 0.9);
  color: var(--ink);
  font: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.api-config input:focus {
  outline: none;
  border-color: rgba(247, 200, 106, 0.85);
  box-shadow: 0 0 0 3px rgba(247, 200, 106, 0.12);
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #6b7280;
  box-shadow: 0 0 0 4px rgba(148, 163, 184, 0.12);
  flex-shrink: 0;
}

.status-dot.ok {
  background: #5ad1bf;
  box-shadow: 0 0 0 4px rgba(90, 209, 191, 0.15);
}

.status-dot.bad {
  background: var(--danger);
  box-shadow: 0 0 0 4px rgba(254, 124, 124, 0.15);
}

.layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 28px;
  max-width: 1200px;
  margin: 48px auto 0;
  padding: 0 40px 40px;
  align-items: start;
}

.panel {
  background: var(--bg-panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: 0 22px 60px var(--shadow);
  backdrop-filter: blur(12px);
}

.form-panel {
  padding: 34px 30px 28px;
}

.eyebrow-row {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: rgba(90, 209, 191, 0.08);
  border: 1px solid rgba(90, 209, 191, 0.2);
  border-radius: 999px;
  color: var(--teal);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.eyebrow-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--teal);
  box-shadow: 0 0 0 6px rgba(90, 209, 191, 0.14);
}

.form-panel h1 {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(2.25rem, 3vw, 3.4rem);
  line-height: 1.08;
  margin: 20px 0 14px;
  max-width: 12ch;
}

.lede {
  margin: 0;
  max-width: 54ch;
  color: var(--ink-soft);
  line-height: 1.6;
  font-size: 0.98rem;
}

.mini-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin: 24px 0 28px;
}

.metric-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 14px 16px;
  background: rgba(17, 23, 35, 0.9);
  border: 1px solid var(--line);
  border-radius: 14px;
}

.metric-label {
  color: var(--ink-dim);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.metric-box strong {
  font-size: 1rem;
  color: var(--ink);
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field label {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-dim);
}

.field input,
.field select {
  width: 100%;
  padding: 12px 13px;
  border-radius: 11px;
  border: 1px solid var(--line);
  background: rgba(10, 16, 26, 0.9);
  color: var(--ink);
  font: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.field input::placeholder {
  color: rgba(143, 161, 195, 0.9);
}

.field input:focus,
.field select:focus {
  outline: none;
  border-color: rgba(247, 200, 106, 0.8);
  box-shadow: 0 0 0 3px rgba(247, 200, 106, 0.12);
}

.field select {
  appearance: none;
  background-image:
    linear-gradient(45deg, transparent 50%, var(--ink-dim) 50%),
    linear-gradient(135deg, var(--ink-dim) 50%, transparent 50%);
  background-position: calc(100% - 18px) center, calc(100% - 13px) center;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
}

.form-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 28px;
}

button {
  font-family: var(--font-body);
  cursor: pointer;
  border: none;
}

#submitBtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 24px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--gold), var(--gold-strong));
  color: #111827;
  font-weight: 700;
  letter-spacing: 0.02em;
  box-shadow: 0 14px 30px rgba(242, 175, 76, 0.25);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
}

#submitBtn:hover {
  transform: translateY(-1px);
  box-shadow: 0 18px 36px rgba(242, 175, 76, 0.28);
}

#submitBtn:active {
  transform: translateY(0);
}

#submitBtn:disabled {
  opacity: 0.72;
  cursor: progress;
}

.btn-spinner {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid rgba(17, 24, 39, 0.25);
  border-top-color: #111827;
  display: none;
}

#submitBtn.loading .btn-spinner {
  display: inline-block;
  animation: spin 0.7s linear infinite;
}

#submitBtn.loading .btn-label {
  opacity: 0.8;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.ghost-btn {
  padding: 12px 18px;
  border-radius: 12px;
  background: transparent;
  color: var(--ink-soft);
  border: 1px solid var(--line-strong);
  transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
}

.ghost-btn:hover {
  border-color: rgba(148, 163, 184, 0.4);
  color: var(--ink);
  background: rgba(148, 163, 184, 0.04);
}

.ghost-btn.small {
  padding: 8px 12px;
  font-size: 12px;
}

.error-banner {
  margin: 18px 0 0;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid rgba(254, 124, 124, 0.32);
  background: rgba(254, 124, 124, 0.08);
  color: #ffc2c2;
  font-size: 13px;
  line-height: 1.5;
}

.result-panel {
  position: sticky;
  top: 28px;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  padding: 30px 24px;
}

.result-empty {
  margin: auto;
  text-align: center;
  color: var(--ink-soft);
}

.result-empty p {
  margin: 4px 0;
  font-size: 15px;
}

.result-empty .hint {
  font-size: 12.5px;
  color: var(--ink-dim);
}

.pulse-dot {
  width: 10px;
  height: 10px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 0 0 rgba(247, 200, 106, 0.5);
  animation: pulse 2.2s ease-out infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(247, 200, 106, 0.42); }
  70% { box-shadow: 0 0 0 16px rgba(247, 200, 106, 0); }
  100% { box-shadow: 0 0 0 0 rgba(247, 200, 106, 0); }
}

.result-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  animation: reveal 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.result-eyebrow {
  color: var(--gold);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-family: var(--font-mono);
}

#resultClass {
  margin: 12px 0 24px;
  font-family: var(--font-display);
  font-size: clamp(2rem, 2vw, 2.4rem);
  line-height: 1.14;
  font-weight: 500;
}

.confidence-block {
  margin-bottom: 26px;
}

.confidence-labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--ink-dim);
  font-size: 12.5px;
  margin-bottom: 8px;
}

#confidenceValue {
  color: var(--ink);
  font-family: var(--font-mono);
}

.confidence-track {
  height: 9px;
  background: rgba(15, 23, 42, 0.95);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--line);
}

.confidence-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--teal), var(--gold));
  border-radius: inherit;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.prob-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.prob-row {
  display: grid;
  grid-template-columns: 88px 1fr 48px;
  align-items: center;
  gap: 10px;
  font-size: 13px;
}

.prob-label {
  color: var(--ink-dim);
}

.prob-value {
  font-family: var(--font-mono);
  text-align: right;
  color: var(--ink);
}

.prob-track {
  width: 100%;
  height: 6px;
  background: rgba(15, 23, 42, 0.95);
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid var(--line);
}

.prob-fill {
  display: block;
  height: 100%;
  width: 0%;
  background: var(--teal);
  border-radius: inherit;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.prob-row.leading .prob-fill {
  background: linear-gradient(90deg, var(--gold), #efb658);
}

.prob-row.leading .prob-label {
  color: var(--ink);
}

.result-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--line);
  color: var(--ink-dim);
  font-size: 11.5px;
  font-family: var(--font-mono);
}

.page-footer {
  position: relative;
  z-index: 2;
  text-align: center;
  color: var(--ink-dim);
  font-size: 12px;
  padding: 18px 20px 38px;
}

@media (max-width: 900px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 18px 20px;
  }

  .layout {
    grid-template-columns: 1fr;
    padding: 0 20px 32px;
  }

  .field-grid,
  .mini-metrics {
    grid-template-columns: 1fr;
  }

  .result-panel {
    position: static;
  }

  .panel {
    padding: 26px 20px;
  }
}
