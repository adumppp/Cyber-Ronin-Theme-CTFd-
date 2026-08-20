/* ============================== RONIN CTF THEME JS ============================== */

// ============================== DATA & CONFIG ==============================
const CATEGORIES = [
  { id: "all", label: "All Trials", kanji: "全", color: "#F5F2EB" },
  { id: "web", label: "Web", kanji: "蜘蛛", color: "#E63946" },
  { id: "crypto", label: "Crypto", kanji: "暗号", color: "#D4AF37" },
  { id: "pwn", label: "Pwn", kanji: "刀切", color: "#8B5CF6" },
  { id: "forensics", label: "Forensics", kanji: "影", color: "#06B6D4" },
  { id: "reversing", label: "Reversing", kanji: "解体", color: "#10B981" },
];

const DIFFICULTIES = [
  { id: "all", label: "All Ranks" },
  { id: "ashigaru", label: "Ashigaru" },
  { id: "chunin", label: "Chunin" },
  { id: "hatamoto", label: "Hatamoto" },
  { id: "shogun", label: "Shogun" },
];

const DIFF_META = {
  ashigaru: { label: "Ashigaru", color: "#10B981" },
  chunin: { label: "Chunin", color: "#D4AF37" },
  hatamoto: { label: "Hatamoto", color: "#E63946" },
  shogun: { label: "Shogun", color: "#EF4444" },
};

const MARQUEE_ITEMS = [
  "WEB EXPLOITATION", "蜘蛛の巣", "CRYPTOGRAPHY", "暗号解読",
  "BINARY EXPLOITATION", "刀切符", "DIGITAL FORENSICS", "影追跡",
  "REVERSE ENGINEERING", "構造解体"
];

const CHAPTERS = [
  { number: "01", kanji: "理", title: "No Master But Logic", text: "A cyber ronin bound by no corporate mandate. Solitary focus yields devastating exploits — the mind, sharpened alone, cuts deepest." },
  { number: "02", kanji: "鍛", title: "Honor in Clean Exploitation", text: "Every line of payload is crafted like a forged blade — precise, lightweight, unstoppable. Sloppy code is a dishonor to the craft." },
  { number: "03", kanji: "帳", title: "The Shadow Ledger Recalls All", text: "Victories recorded in blood-red ink. Every solve elevates your stance on the supreme honor scroll, eternal and unforged." },
  { number: "04", kanji: "秘", title: "Death Before Leakage", text: "Protect your zero-day keys like sacred relics. A ronin's silence is his armor. Never compromise the clan." },
];

const LANDING_STATS = [
  { value: null, label: "Sacred Trials", kanji: "試練", api: "challenges/count" },
  { value: "05", label: "Disciplines", kanji: "道" },
  { value: null, label: "Warriors Entered", kanji: "武者", api: "users/count" },
  { value: null, label: "Tournament Span", kanji: "時", api: "ctf/duration" },
];

const HOURS = ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00", "24:00"];

const PODIUM = [
  { rank: 2, glyph: "銀", seal: "Silver Blade Seal", border: "border-slate-400/40", text: "text-slate-300", pad: "lg:pt-14" },
  { rank: 1, glyph: "冠", seal: "Dragon Seal", border: "border-[#D4AF37]/60", text: "text-[#D4AF37]", pad: "" },
  { rank: 3, glyph: "銅", seal: "Bronze Torii Seal", border: "border-amber-700/50", text: "text-amber-600", pad: "lg:pt-20" },
];

const LINE_COLORS = ["#D4AF37", "#E63946", "#94A3B8", "#F5F2EB", "#06B6D4"];

const IMAGES = {
  samuraiStatue: "https://images.unsplash.com/photo-1771055882875-57bd75655f72?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  samuraiSword: "https://images.unsplash.com/photo-1754474479806-5e07e3a9d8c9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  toriiNight: "https://images.unsplash.com/photo-1771893355190-8acc15eb7897?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600",
};

// ============================== HELPERS ==============================
function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }
function catById(id) { return CATEGORIES.find((c) => c.id === id); }

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Intersection Observer for reveal animations
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        entry.target.classList.remove("reveal-hidden");
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "-40px" });

  $$(".reveal").forEach((el) => {
    el.classList.add("reveal-hidden");
    observer.observe(el);
  });
}

// Masked line animation
function initMaskedLines() {
  setTimeout(() => {
    $$(".masked-line").forEach((el) => el.classList.add("masked-line-visible"));
  }, 60);
}

// Fade in animation
function initFadeIn() {
  setTimeout(() => {
    $$(".fade-in-anim").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }, 60);
}

// ============================== SPLASH INTRO ==============================
function initSplashIntro() {
  const splash = $("#splash-intro");
  if (!splash) return;

  const progressBar = $("#splash-progress");
  const percentEl = $("#splash-percent");
  const enterBtn = $("#splash-enter");
  let progress = 0;

  const interval = setInterval(() => {
    progress += 2;
    if (progressBar) progressBar.style.width = progress + "%";
    if (percentEl) percentEl.textContent = progress;
    if (progress >= 100) {
      clearInterval(interval);
      handleEnter();
    }
  }, 60);

  function handleEnter() {
    splash.classList.add("slashed");
    setTimeout(() => {
      splash.style.display = "none";
      document.body.classList.add("entered");
      sessionStorage.setItem("ronin-entered", "true");
      initPage();
    }, 700);
  }

  if (enterBtn) enterBtn.addEventListener("click", handleEnter);
}

// ============================== ENSO CANVAS ==============================
function initEnsoCanvas() {
  const canvas = $("#enso-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  let w = 0, h = 0, raf;

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    w = parent.offsetWidth;
    h = parent.offsetHeight;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener("resize", debounce(resize, 100));

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * (w || 1600),
    y: Math.random() * (h || 900),
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.2,
    vy: -(Math.random() * 0.3 + 0.08),
    o: Math.random() * 0.45 + 0.1,
    red: Math.random() < 0.35,
  }));

  function loop(now) {
    const t = now;
    ctx.clearRect(0, 0, w, h);

    const cx = w > 1024 ? w * 0.72 : w * 0.5;
    const cy = h * 0.45;
    const R = Math.min(w, h) * 0.28;

    const rot = t * 0.00014;
    const gap = Math.PI * 0.22;
    const start = gap / 2 + rot;
    const end = Math.PI * 2 - gap / 2 + rot;
    const steps = 60;

    for (let i = 0; i < steps; i++) {
      const prog = i / steps;
      const a0 = start + (end - start) * prog;
      const a1 = start + (end - start) * ((i + 1) / steps);
      const belly = Math.sin(prog * Math.PI);
      ctx.beginPath();
      ctx.strokeStyle = `rgba(230,57,70,${0.08 + belly * 0.12})`;
      ctx.lineWidth = 1.5 + belly * 10;
      ctx.arc(cx, cy, R, a0, a1);
      ctx.stroke();
    }

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      ctx.beginPath();
      ctx.fillStyle = p.red ? `rgba(230,57,70,${p.o})` : `rgba(245,242,235,${p.o * 0.7})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
}

// ============================== TOAST SYSTEM ==============================
function showToast(msg, type = "success") {
  const container = $(".toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "modal-in px-4 py-3 font-mono2 text-xs max-w-xs shadow-xl border";
  toast.style.borderColor = type === "success" ? "rgba(16,185,129,0.5)" : "rgba(239,68,68,0.5)";
  toast.style.color = type === "success" ? "#6EE7B7" : "#FCA5A5";
  toast.style.background = "#121215";
  toast.textContent = msg;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================== CHALLENGES PAGE ==============================
let challengesData = [];
let solvedChallenges = [];
let currentCategory = "all";
let currentDifficulty = "all";

async function loadChallenges() {
  try {
    const resp = await fetch("/api/v1/challenges");
    const data = await resp.json();
    if (data.success) {
      challengesData = data.data.map((c) => ({
        id: c.id,
        title: c.name,
        category: c.category.toLowerCase().replace(/\s+/g, ""),
        categoryLabel: c.category,
        points: c.value,
        solves: c.solves,
        solved_by_me: c.solved_by_me,
        description: "",
        tags: c.tags || [],
      }));
      renderChallenges();
    }
  } catch (e) {
    console.error("Failed to load challenges:", e);
    showToast("Failed to load trials", "error");
  }
}

function renderChallenges() {
  const container = $("#challenges-grid");
  if (!container) return;

  const query = ($("#challenge-search")?.value || "").toLowerCase();

  const filtered = challengesData.filter((c) => {
    if (currentCategory !== "all" && c.category !== currentCategory) return false;
    if (currentDifficulty !== "all") {
      const diffMap = { ashigaru: 100, chunin: 200, hatamoto: 350, shogun: 500 };
      const targetPoints = diffMap[currentDifficulty];
      if (targetPoints && Math.abs(c.points - targetPoints) > 50) return false;
    }
    if (query && !c.title.toLowerCase().includes(query)) return false;
    return true;
  });

  container.innerHTML = filtered.map((c, i) => {
    const cat = catById(c.category) || { color: "#F5F2EB", label: c.categoryLabel, kanji: "試" };
    const isSolved = c.solved_by_me || solvedChallenges.includes(c.id);
    const solvePct = c.solves > 0 ? Math.min(Math.round((c.solves / (c.solves + 10)) * 100), 100) : 0;

    return `
      <div class="reveal" style="transition-delay: ${Math.min(i * 0.04, 0.35)}s">
        <button onclick="openChallengeModal(${c.id})" class="trial-card relative text-left bg-[#121215] border border-white/10 p-6 overflow-hidden group w-full flex flex-col justify-between">
          <span class="absolute -right-3 -bottom-6 font-kanji text-8xl leading-none opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500 select-none pointer-events-none" style="color: ${cat.color}">${cat.kanji}</span>
          <div>
            <div class="flex items-center justify-between mb-5">
              <span class="font-mono2 text-[10px] tracking-[0.25em] uppercase px-2 py-1 border" style="color: ${cat.color}; border-color: ${cat.color}44">${cat.label}</span>
              ${isSolved ? '<span class="flex items-center gap-1.5 font-mono2 text-[10px] tracking-widest text-emerald-400 uppercase">✓ Solved</span>' : ""}
            </div>
            <h3 class="font-heading text-lg font-bold text-[#F5F2EB] tracking-wide group-hover:text-[#E63946] transition-colors duration-300">${c.title}</h3>
          </div>
          <div>
            <div class="flex items-center justify-between mt-6">
              <span class="font-heading text-xl font-black text-[#D4AF37]">${c.points}<span class="text-xs font-semibold ml-1 text-[#D4AF37]/70">PTS</span></span>
              <span class="font-mono2 text-[10px] tracking-widest uppercase text-[#71717A]">${c.solves} VICTORIES</span>
            </div>
            <div class="mt-4">
              <div class="flex justify-between font-mono2 text-[10px] text-[#71717A] mb-1.5"><span>${c.solves} VICTORIES</span><span>${solvePct}%</span></div>
              <div class="h-[3px] bg-white/5"><div class="h-full transition-all duration-700" style="width: ${solvePct}%; background-color: ${cat.color}"></div></div>
            </div>
          </div>
        </button>
      </div>
    `;
  }).join("");

  const noResults = $("#no-challenges");
  if (noResults) {
    noResults.classList.toggle("hidden", filtered.length > 0);
  }

  initReveal();
}

function setCategory(cat) {
  currentCategory = cat;
  $$(".challenge-cat-btn").forEach((btn) => {
    const isActive = btn.dataset.cat === cat;
    btn.classList.toggle("active", isActive);
    const label = btn.querySelector("span:last-child");
    if (label) {
      label.className = `font-mono2 text-[11px] tracking-[0.2em] uppercase transition-colors ${isActive ? "text-[#F5F2EB]" : "text-[#71717A] group-hover:text-[#A1A1AA]"}`;
    }
  });
  renderChallenges();
}

function setDifficulty(diff) {
  currentDifficulty = diff;
  $$(".diff-btn").forEach((btn) => {
    const isActive = btn.dataset.diff === diff;
    btn.classList.toggle("active", isActive);
    if (isActive) {
      btn.className = "diff-btn active font-mono2 text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border border-[rgba(230,57,70,0.5)] bg-[#E63946]/10 text-[#F5F2EB] transition-all";
    } else {
      btn.className = "diff-btn font-mono2 text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border border-white/10 text-[#71717A] hover:text-[#A1A1AA] hover:border-white/20 transition-all";
    }
  });
  renderChallenges();
}

// ============================== CHALLENGE MODAL ==============================
async function openChallengeModal(challengeId) {
  const challenge = challengesData.find((c) => c.id === challengeId);
  if (!challenge) return;

  try {
    const resp = await fetch(`/api/v1/challenges/${challengeId}`);
    const data = await resp.json();
    if (data.success) {
      challenge.description = data.data.description;
      challenge.hints = data.data.hints || [];
      challenge.files = data.data.files || [];
      challenge.connection_info = data.data.connection_info;
      challenge.attribution = data.data.attribution;
      challenge.tags = data.data.tags || [];
    }
  } catch (e) {
    console.error("Failed to load challenge details:", e);
  }

  const cat = catById(challenge.category) || { color: "#F5F2EB", label: challenge.categoryLabel, kanji: "試" };
  const isSolved = challenge.solved_by_me || solvedChallenges.includes(challenge.id);

  const modal = document.createElement("div");
  modal.id = "challenge-modal";
  modal.className = "fixed inset-0 z-[90] flex items-center justify-center p-4 fade-in";
  modal.style.background = "rgba(5,5,7,0.85)";
  modal.style.backdropFilter = "blur(8px)";

  modal.innerHTML = `
    <div class="modal-in relative bg-[#121215] border border-[rgba(230,57,70,0.4)] text-[#F5F2EB] w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto modal-scroll p-6 sm:p-8 shadow-2xl" onclick="event.stopPropagation()">
      ${isSolved ? `
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="slash-strike absolute top-1/2 left-0 h-[3px] w-full" style="background: linear-gradient(90deg, transparent, #E63946, transparent); box-shadow: 0 0 24px rgba(230,57,70,0.8)"></div>
        </div>
      ` : ""}
      <button onclick="closeChallengeModal()" class="absolute top-4 right-4 text-[#71717A] hover:text-[#E63946] font-mono2 text-lg transition-colors">✕</button>
      <div class="flex items-center gap-3 mb-2">
        <span class="font-kanji text-3xl" style="color: ${cat.color}">${cat.kanji}</span>
        <div class="flex gap-2 flex-wrap">
          <span class="font-mono2 text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 border" style="color: ${cat.color}; border-color: ${cat.color}55">${cat.label}</span>
        </div>
      </div>
      <h2 class="font-heading text-2xl font-bold text-[#F5F2EB] tracking-wide">${challenge.title}</h2>
      <div class="text-[#A1A1AA] text-sm leading-relaxed pt-2">${challenge.description || "Loading..."}</div>
      
      ${challenge.connection_info ? `
        <div class="mb-6 mt-4">
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2">接続 — CONNECTION</p>
          <div class="font-mono2 text-xs text-[#06B6D4] bg-[#06B6D4]/5 border border-[rgba(6,182,212,0.3)] px-4 py-3 break-all leading-relaxed">${escapeHtml(challenge.connection_info).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" class="text-[#06B6D4] hover:text-[#22D3EE] underline underline-offset-4 decoration-[#06B6D4]/40 hover:decoration-[#22D3EE] transition-colors">$1</a>')}</div>
        </div>
      ` : ""}

      ${(() => {
        const authorTag = (challenge.tags || []).find((t) => typeof t === "string" && t.toLowerCase().startsWith("author="));
        const linkTags = (challenge.tags || []).filter((t) => typeof t === "string" && t.toLowerCase().startsWith("link="));
        const author = challenge.attribution || (authorTag ? authorTag.slice(7) : null);
        if (!author && linkTags.length === 0) return "";
        return `
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/5 py-3 my-4">
          ${author ? `
          <div class="flex items-center gap-2">
            <span class="font-kanji text-sm text-[#D4AF37]">匠</span>
            <div>
              <p class="font-mono2 text-[9px] tracking-widest text-[#71717A] uppercase">Crafted by</p>
              <p class="font-heading text-sm font-bold text-[#D4AF37] tracking-wide">${author}</p>
            </div>
          </div>
          ` : ""}
          ${linkTags.length > 0 ? `
          <div class="flex items-center gap-2 flex-wrap">
            ${linkTags.map((t) => {
              const url = t.slice(5);
              return `<a href="${url}" target="_blank" rel="noopener" class="font-mono2 text-[11px] text-[#E63946] hover:text-[#FF4D5E] border border-[rgba(230,57,70,0.3)] hover:border-[rgba(230,57,70,0.6)] px-3 py-1.5 transition-colors">
                <span class="font-kanji mr-1">鏈</span>${url.replace(/^https?:\/\//, "").split("/")[0]}
              </a>`;
            }).join("")}
          </div>
          ` : ""}
        </div>
        `;
      })()}

      <div class="flex items-center gap-8 border-y border-white/5 py-3 my-4">
        <div>
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase">Honor</p>
          <p class="font-heading text-xl font-bold text-[#D4AF37]">${challenge.points} PTS</p>
        </div>
        <div>
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase">Victories</p>
          <p class="font-heading text-xl font-bold text-[#F5F2EB]">${challenge.solves}</p>
        </div>
      </div>

      ${challenge.hints.length > 0 ? `
        <div class="mb-6">
          <div id="hint-section">
            <button onclick="this.classList.add('hidden'); this.nextElementSibling.classList.remove('hidden')" class="font-mono2 text-[11px] tracking-widest text-[#71717A] hover:text-[#D4AF37] transition-colors flex items-center gap-2">
              <span class="font-kanji">灯</span> REVEAL HINT
            </button>
            <div class="hidden fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
              <span class="font-kanji mr-2">灯</span>${challenge.hints.map(h => h.content).join(" ")}
            </div>
          </div>
        </div>
      ` : ""}

      ${challenge.files.length > 0 ? `
        <div class="mb-6">
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2">ATTACHMENTS</p>
          <div class="flex flex-wrap gap-2">
            ${challenge.files.map(f => `
              <a href="${f}" target="_blank" class="font-mono2 text-xs text-[#E63946] hover:text-[#FF4D5E] border border-[rgba(230,57,70,0.3)] px-3 py-1.5 transition-colors">
                <span class="font-kanji mr-1">文</span>${f.split("/").pop()}
              </a>
            `).join("")}
          </div>
        </div>
      ` : ""}

      ${isSolved ? `
        <div class="modal-in flex items-center gap-3 border border-emerald-500/40 bg-emerald-500/10 px-4 py-4">
          <span class="text-emerald-400 font-mono2 text-lg">✓</span>
          <div>
            <p class="font-heading text-sm font-bold tracking-widest text-emerald-300">FLAG ACCEPTED — HONOR GAINED</p>
            <p class="font-mono2 text-xs text-emerald-400/70 mt-0.5">+${challenge.points} pts recorded in the shadow ledger</p>
          </div>
        </div>
      ` : `
        <div id="flag-submission-area">
          <div class="flex items-center bg-[#050507] border border-white/10 focus-within:border-[rgba(230,57,70,0.5)] transition-colors">
            <span class="font-mono2 text-xs text-[#E63946] pl-4 pr-2 whitespace-nowrap select-none">ronin@ctf:~#</span>
            <input id="flag-input" type="text" placeholder="ronin{...}" spellcheck="false"
              class="flex-1 bg-transparent font-mono2 text-sm text-[#F5F2EB] placeholder:text-[#71717A]/50 py-3.5 outline-none min-w-0" />
            <span class="caret-blink w-2 h-4 bg-[#E63946]/70 mr-3"></span>
          </div>
          <button onclick="submitFlag(${challenge.id})" class="btn-slash mt-3 w-full bg-[#E63946] hover:bg-[#FF4D5E] text-white font-heading text-sm font-bold tracking-[0.3em] uppercase py-3.5 transition-colors duration-300 flex items-center justify-center gap-2">
            <span class="font-kanji">刀</span> Strike — Submit Flag
          </button>
          <div id="flag-error" class="hidden font-mono2 text-xs text-[#EF4444] mt-2">Incorrect flag. The shadow ledger records your miss.</div>
        </div>
      `}
    </div>
  `;

  modal.addEventListener("click", closeChallengeModal);
  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";
}

function closeChallengeModal() {
  const modal = $("#challenge-modal");
  if (modal) {
    modal.remove();
    document.body.style.overflow = "";
  }
}

async function submitFlag(challengeId) {
  const input = $("#flag-input");
  const errorDiv = $("#flag-error");
  const flag = input?.value?.trim();

  if (!flag) return;

  try {
    const resp = await fetch("/api/v1/challenges/attempt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.content || "",
      },
      credentials: "same-origin",
      body: JSON.stringify({ challenge_id: challengeId, submission: flag }),
    });

    const data = await resp.json();

    if (data.success) {
      if (data.data.status === "correct") {
        solvedChallenges.push(challengeId);
        showToast("Flag accepted — honor gained", "success");
        closeChallengeModal();
        loadChallenges();
      } else if (data.data.status === "already_solved") {
        showToast("You have already conquered this trial", "success");
        closeChallengeModal();
      } else {
        if (errorDiv) {
          errorDiv.classList.remove("hidden");
          const area = $("#flag-submission-area");
          if (area) {
            area.classList.add("shake-x");
            setTimeout(() => area.classList.remove("shake-x"), 400);
          }
        }
      }
    }
  } catch (e) {
    console.error("Flag submission failed:", e);
    showToast("Submission failed — check your connection", "error");
  }
}

// ============================== SCOREBOARD LOAD ==============================
async function loadScoreboard() {
  try {
    totalChallengePoints = await fetchTotalPoints();
    const [resp, detail] = await Promise.all([
      fetch("/api/v1/scoreboard").then((r) => r.json()),
      fetch("/api/v1/scoreboard/top/50").then((r) => r.json()).catch(() => null),
    ]);
    if (resp.success) {
      rawScoreboard = resp.data;

      // Enrich with real victory counts from scoreboard detail
      // (top/50 returns each team's full solve list; each entry has user_id)
      if (detail && detail.success && detail.data) {
        const teamSolveCounts = {};   // account_id -> solve count
        const memberSolveCounts = {}; // user_id -> solve count
        Object.values(detail.data).forEach((team) => {
          const validSolves = (team.solves || []).filter((s) => s.challenge_id !== null && s.challenge_id !== undefined);
          teamSolveCounts[team.id] = validSolves.length;
          validSolves.forEach((s) => {
            if (s.user_id) memberSolveCounts[s.user_id] = (memberSolveCounts[s.user_id] || 0) + 1;
          });
        });
        rawScoreboard = rawScoreboard.map((t) => ({
          ...t,
          solves: teamSolveCounts[t.account_id] !== undefined ? teamSolveCounts[t.account_id] : (t.solves || 0),
          _memberSolveCounts: memberSolveCounts,
        }));
      }

      renderScoreboard(boardEntriesFor(scoreboardMode));
    }
    loadTournamentPulse();
  } catch (e) {
    console.error("Failed to load scoreboard:", e);
    showToast("Failed to load honor scroll", "error");
  }
}

async function loadTournamentPulse() {
  const chartDom = $("#tournament-pulse");
  if (!chartDom || !window.echarts) return;

  try {
    const resp = await fetch("/api/v1/scoreboard/top/5");
    const data = await resp.json();
    if (!data.success) return;

    const LINE_COLORS = ["#D4AF37", "#E63946", "#94A3B8", "#F5F2EB", "#06B6D4"];
    const teams = Object.values(data.data);

    // Build cumulative score timelines from solve dates
    const series = teams.slice(0, 5).map((team, idx) => {
      const solves = (team.solves || [])
        .filter((s) => s.challenge_id !== null && s.value > 0)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      let cum = 0;
      const points = solves.map((s) => {
        cum += s.value;
        return [new Date(s.date).getTime(), cum];
      });
      return {
        name: team.name,
        type: "line",
        showSymbol: false,
        smooth: true,
        lineWidth: 2,
        lineStyle: { color: LINE_COLORS[idx % LINE_COLORS.length], width: 2 },
        itemStyle: { color: LINE_COLORS[idx % LINE_COLORS.length] },
        data: points.length ? points : [[Date.now() - 86400000, 0], [Date.now(), 0]],
      };
    });

    chartDom._echarts && chartDom._echarts.dispose();
    const chart = window.echarts.init(chartDom);
    chartDom._echarts = chart;
    chart.setOption({
      backgroundColor: "transparent",
      grid: { top: 10, right: 10, bottom: 24, left: 46 },
      tooltip: {
        trigger: "axis",
        backgroundColor: "#121215",
        borderColor: "rgba(230,57,70,0.4)",
        textStyle: { color: "#F5F2EB", fontFamily: "JetBrains Mono", fontSize: 11 },
      },
      legend: {
        bottom: 0,
        textStyle: { color: "#A1A1AA", fontFamily: "JetBrains Mono", fontSize: 10 },
        icon: "roundRect",
        itemWidth: 14,
        itemHeight: 2,
      },
      xAxis: {
        type: "time",
        axisLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } },
        axisLabel: { color: "#71717A", fontFamily: "JetBrains Mono", fontSize: 10 },
        splitLine: { show: false },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisLabel: { color: "#71717A", fontFamily: "JetBrains Mono", fontSize: 10 },
        splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } },
      },
      series,
    });
  } catch (e) {
    console.error("Failed to load tournament pulse:", e);
  }
}

// ============================== RONIN HIERARCHY ==============================
// Rank by completion rate: (account_score / total_available_points) * 100
// Tenno (天皇) is exclusive to the reigning #1 — exactly one holder, always.
// Everyone else is ranked purely by completion percentage tiers.
const HIERARCHY = [
  { key: "tenno",   kanji: "天皇", title: "Tenno",   sub: "Emperor — The One",      minPct: 90, color: "#D4AF37", border: "rgba(212,175,55,0.7)",  glow: "rgba(212,175,55,0.25)" },
  { key: "shogun",  kanji: "将軍", title: "Shogun",  sub: "66% – 89% mastery",      minPct: 66, color: "#E63946", border: "rgba(230,57,70,0.5)",   glow: "rgba(230,57,70,0.2)" },
  { key: "daimyo",  kanji: "大名", title: "Daimyo",  sub: "41% – 65% mastery",      minPct: 41, color: "#F5F2EB", border: "rgba(245,242,235,0.4)", glow: "rgba(245,242,235,0.12)" },
  { key: "samurai", kanji: "侍",   title: "Samurai", sub: "21% – 40% mastery",      minPct: 21, color: "#94A3B8", border: "rgba(148,163,184,0.4)", glow: "rgba(148,163,184,0.15)" },
  { key: "peasant", kanji: "農民", title: "Peasant", sub: "0% – 20% — just starting", minPct: 0, color: "#71717A", border: "rgba(113,113,122,0.3)", glow: "none" },
];

function rankForScore(score, totalPoints, pos) {
  const pct = totalPoints > 0 ? (score / totalPoints) * 100 : 0;
  // The reigning #1 is always Tenno — one person only
  if (pos === 1) return { rank: HIERARCHY[0], pct };
  if (pct >= 90) return { rank: HIERARCHY[1], pct };  // 90%+ but not #1 -> Shogun
  if (pct >= 66) return { rank: HIERARCHY[1], pct };
  if (pct >= 41) return { rank: HIERARCHY[2], pct };
  if (pct >= 21) return { rank: HIERARCHY[3], pct };
  return { rank: HIERARCHY[4], pct };
}

// ============================== SCOREBOARD ==============================
let scoreboardMode = "teams";
let rawScoreboard = [];   // raw /api/v1/scoreboard entries (teams)
let totalChallengePoints = 0;

function boardEntriesFor(mode) {
  if (mode === "teams") return rawScoreboard;
  // Flatten team members into individual player rows, ranked by score
  const players = [];
  rawScoreboard.forEach((team) => {
    const memberCounts = team._memberSolveCounts || {};
    (team.members || []).forEach((m) => {
      players.push({
        pos: null,
        account_id: m.id,
        account_url: `/users/${m.id}`,
        account_type: "user",
        name: m.name,
        score: m.score,
        solves: memberCounts[m.id] || 0,
      });
    });
  });
  players.sort((a, b) => b.score - a.score);
  return players.map((p, i) => ({ ...p, pos: i + 1 }));
}

function switchBoard(mode) {
  scoreboardMode = mode;
  const teamsBtn = $("#tab-teams");
  const playersBtn = $("#tab-players");
  if (!teamsBtn || !playersBtn) return;
  const activeCls = ["bg-[#E63946]", "text-white", "border-[#E63946]"];
  const inactiveCls = ["bg-[#121215]", "text-[#71717A]", "border-white/10"];
  const setActive = (btn, on) => {
    btn.classList.remove(...(on ? inactiveCls : activeCls));
    btn.classList.add(...(on ? activeCls : inactiveCls));
  };
  setActive(teamsBtn, mode === "teams");
  setActive(playersBtn, mode === "players");
  renderScoreboard(boardEntriesFor(mode));
}

async function fetchTotalPoints() {
  // Strategy 1 (authed users): sum every challenge's value from the challenges API.
  // Strategy 2 (guests): sum unique challenge values seen across all teams' solves
  //   from /api/v1/scoreboard/top/50 — a lower bound that equals the real total once
  //   every challenge has been solved by someone.
  try {
    const listResp = await fetch("/api/v1/challenges");
    const listData = await listResp.json();
    if (listData.success && Array.isArray(listData.data) && listData.data.length > 0) {
      const details = await Promise.all(
        listData.data.map((c) => fetch(`/api/v1/challenges/${c.id}`).then((r) => r.json()).catch(() => null))
      );
      const sum = details.reduce((acc, d) => acc + ((d && d.success && typeof d.data.value === "number") ? d.data.value : 0), 0);
      if (sum > 0) return sum;
    }
  } catch (e) {
    console.error("fetchTotalPoints challenges strategy failed:", e);
  }

  try {
    const detail = await fetch("/api/v1/scoreboard/top/50").then((r) => r.json());
    if (detail.success && detail.data) {
      const challengeValues = {};
      Object.values(detail.data).forEach((team) => {
        (team.solves || []).forEach((s) => {
          if (s.challenge_id !== null && s.challenge_id !== undefined) {
            challengeValues[s.challenge_id] = s.value || 0;
          }
        });
      });
      const sum = Object.values(challengeValues).reduce((a, b) => a + b, 0);
      if (sum > 0) return sum;
    }
  } catch (e) {
    console.error("fetchTotalPoints scoreboard strategy failed:", e);
  }

  return 0;
}

function renderScoreboard(entries) {
  const podiumContainer = $("#podium");
  const tableBody = $("#scoreboard-body");
  if (!entries) return;

  // Podium only on teams view
  if (podiumContainer) {
    if (scoreboardMode === "teams" && entries.length >= 3) {
      const top3 = [entries[1], entries[0], entries[2]];
      podiumContainer.innerHTML = PODIUM.map((p, i) => {
        const team = top3[i];
        if (!team) return "";
        const crest = team.name ? team.name.charAt(0) : "浪";
        const nameHtml = team.account_url
          ? `<a href="${team.account_url}" class="font-heading text-2xl font-bold text-[#F5F2EB] mt-3 hover:text-[#E63946] transition-colors block truncate">${escapeHtml(team.name)}</a>`
          : `<h3 class="font-heading text-2xl font-bold text-[#F5F2EB] mt-3">${escapeHtml(team.name)}</h3>`;
        return `
        <div class="reveal" style="transition-delay: ${i * 0.12}s">
          <div class="relative bg-[#121215] border ${p.border} p-8 text-center overflow-hidden shadow-xl ${p.pad}">
            <span class="absolute top-3 left-1/2 -translate-x-1/2 font-kanji text-7xl opacity-[0.05] select-none">${crest}</span>
            <span class="font-kanji text-2xl ${p.text}">${p.glyph}</span>
            <p class="font-mono2 text-[10px] tracking-[0.35em] uppercase mt-3 ${p.text}">Rank ${p.rank} — ${p.seal}</p>
            ${nameHtml}
            <p class="font-heading text-4xl font-black mt-4" style="color: ${p.rank === 1 ? "#D4AF37" : "#F5F2EB"}">
              ${team.score.toLocaleString()}<span class="text-sm font-semibold text-[#71717A] ml-2">PTS</span>
            </p>
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] mt-2 uppercase">${team.solves || 0} victories</p>
          </div>
        </div>
      `;
      }).join("");
    } else {
      podiumContainer.innerHTML = "";
    }
  }

  if (tableBody) {
    const colV = $("#col-victories");
    if (colV) colV.textContent = scoreboardMode === "teams" ? "Warriors" : "Victories";
    tableBody.innerHTML = entries.map((t) => {
      const crest = t.name ? t.name.charAt(0) : "浪";
      const isYou = t.account_id === (window.CTFd?.user?.id);
      const { rank, pct } = rankForScore(t.score, totalChallengePoints, t.pos);
      const link = t.account_url ? `<a href="${t.account_url}" class="font-heading text-sm font-bold tracking-wide text-[#F5F2EB] hover:text-[#E63946] transition-colors">${escapeHtml(t.name)}</a>` : `<span class="font-heading text-sm font-bold tracking-wide text-[#F5F2EB]">${escapeHtml(t.name)}</span>`;
      return `
        <tr class="border-b border-white/5 transition-colors hover:bg-[#1A1A1E] ${isYou ? 'bg-[#E63946]/5 border-l-2 border-l-[#E63946]' : ''}">
          <td class="px-6 py-4">
            <span class="font-heading text-lg font-black ${t.pos <= 3 ? 'text-[#D4AF37]' : 'text-[#71717A]'}">${String(t.pos).padStart(2, "0")}</span>
          </td>
          <td class="px-6 py-4"><span class="font-kanji text-xl text-[#E63946]/80">${crest}</span></td>
          <td class="px-6 py-4">
            ${link}
            ${isYou ? '<span class="font-mono2 text-[9px] tracking-widest text-[#E63946] ml-2 uppercase">You</span>' : ""}
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1.5 border px-2.5 py-1" style="border-color: ${rank.border}; background: ${rank.glow}" title="${rank.title} — ${rank.sub} (${pct.toFixed(1)}% of total honor)">
              <span class="font-kanji text-sm" style="color: ${rank.color}">${rank.kanji}</span>
              <span class="font-mono2 text-[9px] tracking-widest uppercase" style="color: ${rank.color}">${rank.title}</span>
              <span class="font-mono2 text-[9px] text-[#71717A]">${pct.toFixed(0)}%</span>
            </span>
          </td>
          <td class="px-6 py-4 font-mono2 text-sm text-[#A1A1AA]">${scoreboardMode === "teams" ? (t.members ? t.members.length : (t.solves || 0)) : (t.solves || 0)}</td>
          <td class="px-6 py-4 font-mono2 text-sm font-bold text-[#F5F2EB]">${t.score.toLocaleString()}</td>
        </tr>
      `;
    }).join("");
  }

  initReveal();
}
// ============================== PROFILE PAGE ==============================
function colorForCategory(name) {
  const c = CATEGORIES.find((x) => x.id === String(name).toLowerCase().replace(/\s+/g, ""));
  return c ? c.color : "#94A3B8";
}

async function loadProfile() {
  // Determine user id: /user is self, /users/<id> is public profile
  const m = window.location.pathname.match(/^\/users\/(\d+)/);
  const uid = m ? m[1] : "me";

  try {
    const [userResp, solvesResp, failsResp, awardsResp] = await Promise.all([
      fetch(`/api/v1/users/${uid}`),
      fetch(`/api/v1/users/${uid}/solves`),
      fetch(`/api/v1/users/${uid}/fails`),
      fetch(`/api/v1/users/${uid}/awards`),
    ]);

    const userData = await userResp.json();
    const solvesData = await solvesResp.json();
    const failsData = await failsResp.json();
    const awardsData = await awardsResp.json();

    if (userData.success && solvesData.success) {
      renderProfile(userData.data, solvesData.data || [], {
        fails: (failsData.success && failsData.data) || [],
        awards: (awardsData.success && awardsData.data) || [],
      });
    }
  } catch (e) {
    console.error("Failed to load profile:", e);
  }
}

function renderProfile(user, solves, extra = {}) {
  const fails = extra.fails || [];
  const awards = extra.awards || [];

  const scoreEl = $("#stat-score");
  const solvesEl = $("#stat-solves");
  const failsEl = $("#stat-fails");

  if (scoreEl) scoreEl.textContent = (user.score || 0).toLocaleString();
  if (solvesEl) solvesEl.textContent = solves.length;
  if (failsEl) failsEl.textContent = fails.length;

  // Solve/Fail ratio bar
  const total = solves.length + fails.length;
  const solvePct = total > 0 ? ((solves.length / total) * 100).toFixed(1) : null;
  const failPct = total > 0 ? ((fails.length / total) * 100).toFixed(1) : null;
  const solveBar = $("#solve-bar");
  const failBar = $("#fail-bar");
  const solvePctEl = $("#solve-pct");
  const failPctEl = $("#fail-pct");
  if (solveBar && failBar) {
    const sp = solvePct === null ? 50 : parseFloat(solvePct);
    const fp = failPct === null ? 50 : parseFloat(failPct);
    solveBar.style.width = sp + "%";
    failBar.style.width = fp + "%";
  }
  if (solvePctEl) solvePctEl.textContent = solvePct === null ? "—" : solvePct;
  if (failPctEl) failPctEl.textContent = failPct === null ? "—" : failPct;

  // Category breakdown bar + legend
  const catBar = $("#category-bar");
  const catLegend = $("#category-legend");
  if (catBar && catLegend && solves.length > 0) {
    const breakdown = {};
    solves.forEach((s) => {
      const cat = s.challenge?.category || "Unknown";
      breakdown[cat] = (breakdown[cat] || 0) + 1;
    });
    const cats = Object.keys(breakdown).map((name) => ({
      name,
      count: breakdown[name],
      percent: (breakdown[name] / solves.length) * 100,
      color: colorForCategory(name),
    }));
    catBar.innerHTML = cats.map((c) =>
      `<div class="h-full" style="width: ${c.percent}%; background-color: ${c.color}"></div>`
    ).join("");
    catLegend.innerHTML = cats.map((c) => `
      <div class="flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full" style="background-color: ${c.color}"></span>
        <span class="font-mono2 text-[10px] tracking-widest uppercase text-[#A1A1AA]">${escapeHtml(c.name)} (${c.percent.toFixed(1)}%)</span>
      </div>
    `).join("");
  }

  // Score progression graph (echarts line chart from solves + awards)
  if (window.echarts && $("#user-score-graph")) {
    const chartDom = $("#user-score-graph");
    const events = [];
    solves.forEach((s) => {
      if (s.challenge?.value > 0) events.push({ date: new Date(s.date).getTime(), value: s.challenge.value });
    });
    awards.forEach((a) => {
      if (a.value > 0) events.push({ date: new Date(a.date).getTime(), value: a.value });
    });
    events.sort((a, b) => a.date - b.date);
    let cum = 0;
    const points = events.map((e) => { cum += e.value; return [e.date, cum]; });

    if (points.length > 0) {
      chartDom._echarts && chartDom._echarts.dispose();
      const chart = window.echarts.init(chartDom);
      chartDom._echarts = chart;
      chart.setOption({
        backgroundColor: "transparent",
        grid: { top: 10, right: 10, bottom: 24, left: 46 },
        tooltip: {
          trigger: "axis",
          backgroundColor: "#121215",
          borderColor: "rgba(230,57,70,0.4)",
          textStyle: { color: "#F5F2EB", fontFamily: "JetBrains Mono", fontSize: 11 },
        },
        xAxis: {
          type: "time",
          axisLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } },
          axisLabel: { color: "#71717A", fontFamily: "JetBrains Mono", fontSize: 10 },
          splitLine: { show: false },
        },
        yAxis: {
          type: "value",
          axisLine: { show: false },
          axisLabel: { color: "#71717A", fontFamily: "JetBrains Mono", fontSize: 10 },
          splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } },
        },
        series: [{
          type: "line",
          showSymbol: true,
          symbolSize: 5,
          smooth: true,
          step: "end",
          lineStyle: { color: "#E63946", width: 2 },
          itemStyle: { color: "#E63946" },
          areaStyle: { color: "rgba(230,57,70,0.12)" },
          data: points,
        }],
      });
    }
  }

  // Skills radar from category solve counts
  if (window.echarts && $("#skills-radar")) {
    const chartDom = $("#skills-radar");
    const categoryMap = {};
    solves.forEach((s) => {
      const cat = s.challenge?.category || "Unknown";
      categoryMap[cat] = (categoryMap[cat] || 0) + 1;
    });

    const skills = Object.keys(categoryMap).map((cat) => ({
      skill: cat,
      value: Math.min(categoryMap[cat] * 20 + 40, 100),
    }));

    if (skills.length > 0) {
      chartDom._echarts && chartDom._echarts.dispose();
      const chart = window.echarts.init(chartDom);
      chartDom._echarts = chart;
      chart.setOption({
        radar: {
          indicator: skills.map((s) => ({ name: s.skill, max: 100 })),
          axisLine: { lineStyle: { color: "rgba(255,255,255,0.08)" } },
          splitLine: { lineStyle: { color: "rgba(255,255,255,0.08)" } },
          splitArea: { show: false },
          axisName: { color: "#A1A1AA", fontFamily: "JetBrains Mono", fontSize: 10 },
        },
        series: [{
          type: "radar",
          data: [{
            value: skills.map((s) => s.value),
            name: "Skills",
            areaStyle: { color: "rgba(230,57,70,0.22)" },
            lineStyle: { color: "#E63946", width: 2 },
            itemStyle: { color: "#E63946" },
          }],
        }],
      });
    }
  }
}

// ============================== LANDING PAGE ==============================
function initLanding() {
  initEnsoCanvas();
  initMaskedLines();
  initFadeIn();
  loadLandingStats();
}

async function loadLandingStats() {
  try {
    const [challengesResp, usersResp] = await Promise.all([
      fetch("/api/v1/challenges"),
      fetch("/api/v1/users"),
    ]);

    const challengesData = await challengesResp.json();
    const usersData = await usersResp.json();

    const challengesCount = challengesData.success ? challengesData.data.length : 16;
    const usersCount = usersData.success ? usersData.data.length : 148;

    const statEls = $$(".landing-stat-value");
    if (statEls[0]) statEls[0].textContent = String(challengesCount).padStart(2, "0");
    if (statEls[2]) statEls[2].textContent = String(usersCount);
  } catch (e) {
    console.error("Failed to load landing stats:", e);
  }
}

// ============================== MOBILE NAV ==============================
function initMobileNav() {
  const toggle = $("#mobile-nav-toggle");
  const menu = $("#mobile-nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("hidden");
      menu.classList.toggle("fade-in");
    });
  }
}

// ============================== PAGE ROUTING ==============================
function initPage() {
  const path = window.location.pathname;

  initReveal();
  initMobileNav();

  if (path === "/" || path === "") {
    initLanding();
  } else if (path === "/challenges") {
    loadChallenges();
    initChallengeFilters();
  } else if (path === "/scoreboard") {
    loadScoreboard();
  } else if (path === "/user" || path.startsWith("/users/")) {
    loadProfile();
  }
}

function initChallengeFilters() {
  const searchInput = $("#challenge-search");
  if (searchInput) {
    searchInput.addEventListener("input", debounce(() => renderChallenges(), 300));
  }
}

// ============================== INIT ==============================
document.addEventListener("DOMContentLoaded", () => {
  const splash = $("#splash-intro");
  const alreadyEntered = sessionStorage.getItem("ronin-entered");
  
  if (splash && !alreadyEntered) {
    initSplashIntro();
  } else if (splash) {
    splash.style.display = "none";
    document.body.classList.add("entered");
    initPage();
  } else {
    initPage();
  }
});

window.addEventListener("popstate", () => {
  initPage();
});

// Expose functions globally for inline onclick handlers
window.setCategory = setCategory;
window.setDifficulty = setDifficulty;
window.switchBoard = switchBoard;
window.openChallengeModal = openChallengeModal;
window.closeChallengeModal = closeChallengeModal;
window.submitFlag = submitFlag;
