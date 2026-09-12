const I={all:{label:"All Trials",kanji:"全",color:"#F5F2EB"},web:{label:"Web",kanji:"蜘蛛",color:"#E63946"},crypto:{label:"Crypto",kanji:"暗号",color:"#D4AF37"},cryptography:{label:"Crypto",kanji:"暗号",color:"#D4AF37"},pwn:{label:"Pwn",kanji:"刀切",color:"#8B5CF6"},binary:{label:"Binary",kanji:"刀切",color:"#8B5CF6"},forensics:{label:"Forensics",kanji:"影",color:"#06B6D4"},reversing:{label:"Reversing",kanji:"解体",color:"#10B981"},rev:{label:"Reversing",kanji:"解体",color:"#10B981"},misc:{label:"Misc",kanji:"雑",color:"#F97316"},miscellaneous:{label:"Misc",kanji:"雑",color:"#F97316"},osint:{label:"OSINT",kanji:"諜",color:"#EC4899"},hardware:{label:"Hardware",kanji:"機",color:"#EAB308"},warmup:{label:"Warmup",kanji:"初",color:"#14B8A6"},mobile:{label:"Mobile",kanji:"携",color:"#6366F1"},cloud:{label:"Cloud",kanji:"雲",color:"#38BDF8"},blockchain:{label:"Blockchain",kanji:"鎖",color:"#A855F7"},ai:{label:"AI",kanji:"知",color:"#06B6D4"}},N=[{color:"#F97316",kanji:"雑"},{color:"#EC4899",kanji:"諜"},{color:"#14B8A6",kanji:"初"},{color:"#EAB308",kanji:"機"},{color:"#6366F1",kanji:"携"},{color:"#A855F7",kanji:"鎖"},{color:"#06B6D4",kanji:"知"},{color:"#F43F5E",kanji:"斬"},{color:"#84CC16",kanji:"陣"}],q=[],G=[{rank:2,glyph:"銀",seal:"Silver Blade Seal",border:"border-slate-400/40",text:"text-slate-300",pad:"lg:pt-14"},{rank:1,glyph:"冠",seal:"Dragon Seal",border:"border-[#D4AF37]/60",text:"text-[#D4AF37]",pad:""},{rank:3,glyph:"銅",seal:"Bronze Torii Seal",border:"border-amber-700/50",text:"text-amber-600",pad:"lg:pt-20"}];function c(e){return document.querySelector(e)}function C(e){return document.querySelectorAll(e)}function H(e){if(!e)return{id:"unknown",label:"Trial",kanji:"試",color:"#F5F2EB"};const t=String(e).toLowerCase().replace(/\s+/g,"");if(I[t])return{id:t,...I[t]};const o=q.find(r=>r.id===t);if(o)return o;let n=0;for(let r=0;r<t.length;r++)n=(n<<5)-n+t.charCodeAt(r);const a=N[Math.abs(n)%N.length],s={id:t,label:String(e),kanji:a.kanji,color:a.color};return q.push(s),s}function z(e,t){let o;return(...n)=>{clearTimeout(o),o=setTimeout(()=>e(...n),t)}}function k(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Y(e){if(!e)return"";try{const o=new URL(e,window.location.origin).pathname.split("/").filter(Boolean).pop()||"";return decodeURIComponent(o)}catch{const o=String(e).split("?")[0].split("#")[0];return o.split("/").filter(Boolean).pop()||o}}function R(){const e=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&(o.target.classList.add("reveal-visible"),o.target.classList.remove("reveal-hidden"),e.unobserve(o.target))})},{rootMargin:"-40px"});C(".reveal").forEach(t=>{t.classList.add("reveal-hidden"),e.observe(t)})}function K(){setTimeout(()=>{C(".masked-line").forEach(e=>e.classList.add("masked-line-visible"))},60)}function X(){setTimeout(()=>{C(".fade-in-anim").forEach(e=>{e.style.opacity="1",e.style.transform="none"})},60)}function Q(){const e=c("#splash-intro");if(!e)return;const t=c("#splash-progress"),o=c("#splash-percent"),n=c("#splash-enter");let a=0;const s=setInterval(()=>{a+=2,t&&(t.style.width=a+"%"),o&&(o.textContent=a),a>=100&&(clearInterval(s),r())},60);function r(){e.classList.add("slashed"),setTimeout(()=>{e.style.display="none",document.body.classList.add("entered"),sessionStorage.setItem("ronin-entered","true"),_()},700)}n&&n.addEventListener("click",r)}function Z(){const e=c("#enso-canvas");if(!e)return;const t=e.getContext("2d"),o=Math.min(window.devicePixelRatio||1,1.5);let n=0,a=0;function s(){const i=e.parentElement;i&&(n=i.offsetWidth,a=i.offsetHeight,e.width=n*o,e.height=a*o,t.setTransform(o,0,0,o,0,0))}s(),window.addEventListener("resize",z(s,100));const r=Array.from({length:45},()=>({x:Math.random()*(n||1600),y:Math.random()*(a||900),r:Math.random()*1.5+.5,vx:(Math.random()-.5)*.2,vy:-(Math.random()*.3+.08),o:Math.random()*.45+.1,red:Math.random()<.35}));function l(i){const d=i;t.clearRect(0,0,n,a);const g=n>1024?n*.72:n*.5,u=a*.45,b=Math.min(n,a)*.28,x=d*14e-5,v=Math.PI*.22,w=v/2+x,$=Math.PI*2-v/2+x,h=60;for(let p=0;p<h;p++){const m=p/h,y=w+($-w)*m,f=w+($-w)*((p+1)/h),A=Math.sin(m*Math.PI);t.beginPath(),t.strokeStyle=`rgba(230,57,70,${.08+A*.12})`,t.lineWidth=1.5+A*10,t.arc(g,u,b,y,f),t.stroke()}for(const p of r)p.x+=p.vx,p.y+=p.vy,p.y<-10&&(p.y=a+10,p.x=Math.random()*n),t.beginPath(),t.fillStyle=p.red?`rgba(230,57,70,${p.o})`:`rgba(245,242,235,${p.o*.7})`,t.arc(p.x,p.y,p.r,0,Math.PI*2),t.fill();requestAnimationFrame(l)}requestAnimationFrame(l)}function F(e,t="success"){const o=c(".toast-container");if(!o)return;const n=document.createElement("div");n.className="modal-in px-4 py-3 font-mono2 text-xs max-w-xs shadow-xl border",n.style.borderColor=t==="success"?"rgba(16,185,129,0.5)":"rgba(239,68,68,0.5)",n.style.color=t==="success"?"#6EE7B7":"#FCA5A5",n.style.background="#121215",n.textContent=e,o.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transition="opacity 0.3s ease",setTimeout(()=>n.remove(),300)},3500)}let B=[],O=[],L="all",j="all";async function W(){try{const t=await(await fetch("/api/v1/challenges")).json();t.success&&(B=t.data.map(o=>({id:o.id,title:o.name,category:o.category?o.category.toLowerCase().replace(/\s+/g,""):"misc",categoryLabel:o.category||"Misc",points:o.value,solves:o.solves,solved_by_me:o.solved_by_me,description:"",tags:o.tags||[]})),tt(),P())}catch(e){console.error("Failed to load challenges:",e),F("Failed to load trials","error")}}function tt(){const e=c("#category-tabs");if(!e)return;const t=[{id:"all",label:"All Trials",kanji:"全",color:"#71717A"}],o=new Set(["all"]);B.forEach(n=>{if(!o.has(n.category)){o.add(n.category);const a=H(n.category)||{id:n.category,label:n.categoryLabel,kanji:"試",color:"#F5F2EB"};t.push({id:n.category,label:n.categoryLabel||a.label,kanji:a.kanji,color:a.color})}}),e.innerHTML=t.map(n=>{const a=L===n.id;return`
      <button onclick="setCategory('${n.id}')" data-cat="${n.id}" class="challenge-cat-btn relative px-4 sm:px-5 py-3 flex items-center gap-2 ${a?"active":""}">
        <span class="font-kanji text-sm" style="color: ${n.color}">${n.kanji}</span>
        <span class="font-mono2 text-[11px] tracking-[0.2em] uppercase transition-colors ${a?"text-[#F5F2EB]":"text-[#71717A] hover:text-[#A1A1AA]"}">${k(n.label)}</span>
        ${a?'<span class="cat-indicator absolute bottom-0 left-2 right-2 h-[2px] bg-[#E63946]"></span>':""}
      </button>
    `}).join("")}function P(){var a;const e=c("#challenges-grid");if(!e)return;const t=(((a=c("#challenge-search"))==null?void 0:a.value)||"").toLowerCase(),o=B.filter(s=>!(L!=="all"&&s.category!==L||j!=="all"&&(j==="ashigaru"&&s.points>150||j==="chunin"&&(s.points<=150||s.points>275)||j==="hatamoto"&&(s.points<=275||s.points>425)||j==="shogun"&&s.points<=425)||t&&!s.title.toLowerCase().includes(t)));e.innerHTML=o.map((s,r)=>{const l=H(s.category)||{color:"#F5F2EB",label:s.categoryLabel,kanji:"試"},i=s.solved_by_me||O.includes(s.id),d=s.solves>0?Math.min(Math.round(s.solves/(s.solves+10)*100),100):0;return`
      <div class="reveal" style="transition-delay: ${Math.min(r*.04,.35)}s">
        <button onclick="openChallengeModal(${s.id})" class="trial-card relative text-left bg-[#121215] border border-white/10 p-6 overflow-hidden group w-full flex flex-col justify-between">
          <span class="absolute -right-3 -bottom-6 font-kanji text-8xl leading-none opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500 select-none pointer-events-none" style="color: ${l.color}">${l.kanji}</span>
          <div>
            <div class="flex items-center justify-between mb-5">
              <span class="font-mono2 text-[10px] tracking-[0.25em] uppercase px-2 py-1 border" style="color: ${l.color}; border-color: ${l.color}44">${l.label}</span>
              ${i?'<span class="flex items-center gap-1.5 font-mono2 text-[10px] tracking-widest text-emerald-400 uppercase">✓ Solved</span>':""}
            </div>
            <h3 class="font-heading text-lg font-bold text-[#F5F2EB] tracking-wide group-hover:text-[#E63946] transition-colors duration-300">${s.title}</h3>
          </div>
          <div>
            <div class="flex items-center justify-between mt-6">
              <span class="font-heading text-xl font-black text-[#D4AF37]">${s.points}<span class="text-xs font-semibold ml-1 text-[#D4AF37]/70">PTS</span></span>
              <span class="font-mono2 text-[10px] tracking-widest uppercase text-[#71717A]">${s.solves} VICTORIES</span>
            </div>
            <div class="mt-4">
              <div class="flex justify-between font-mono2 text-[10px] text-[#71717A] mb-1.5"><span>${s.solves} VICTORIES</span><span>${d}%</span></div>
              <div class="h-[3px] bg-white/5"><div class="h-full transition-all duration-700" style="width: ${d}%; background-color: ${l.color}"></div></div>
            </div>
          </div>
        </button>
      </div>
    `}).join("");const n=c("#no-challenges");n&&n.classList.toggle("hidden",o.length>0),R()}function et(e){L=e,C(".challenge-cat-btn").forEach(t=>{const o=t.dataset.cat===e;t.classList.toggle("active",o);const n=t.querySelector("span:nth-child(2)");n&&(n.className=`font-mono2 text-[11px] tracking-[0.2em] uppercase transition-colors ${o?"text-[#F5F2EB]":"text-[#71717A] hover:text-[#A1A1AA]"}`);const a=t.querySelector(".cat-indicator");o?a||t.insertAdjacentHTML("beforeend",'<span class="cat-indicator absolute bottom-0 left-2 right-2 h-[2px] bg-[#E63946]"></span>'):a&&a.remove()}),P()}function nt(e){j=e,C(".diff-btn").forEach(t=>{const o=t.dataset.diff===e;t.classList.toggle("active",o),o?t.className="diff-btn active font-mono2 text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border border-[rgba(230,57,70,0.5)] bg-[#E63946]/10 text-[#F5F2EB] transition-all":t.className="diff-btn font-mono2 text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border border-white/10 text-[#71717A] hover:text-[#A1A1AA] hover:border-white/20 transition-all"}),P()}function T(e){if(!e)return"";let t=String(e);return t=t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1" class="max-w-full h-auto my-2.5 rounded border border-white/10 shadow-lg block" />'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,'<a href="$2" target="_blank" rel="noopener" class="text-[#06B6D4] hover:underline underline-offset-2">$1</a>'),/<(p|div|br|ul|ol|table)/i.test(t)||(t=t.replace(/\n/g,"<br>")),t}function ot(e,t,o){const n=o+1,a=typeof t.cost=="number"?t.cost:0,s=t.id,r=t.html||t.content;return r?`
      <div class="font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
        <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
          <span class="font-kanji">灯</span> Hint #${n} ${a>0?`<span class="text-[#71717A] font-normal">(-${a} PTS)</span>`:'<span class="text-[#06B6D4] font-normal">(Free)</span>'}
        </div>
        <div class="text-[#F5F2EB]/90 leading-relaxed">${T(r)}</div>
      </div>
    `:a>0?`
      <div id="hint-wrapper-${s}" class="border border-white/10 bg-[#050507] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:border-white/20">
        <div class="flex items-center gap-3">
          <span class="font-kanji text-xl text-[#D4AF37]">灯</span>
          <div>
            <p class="font-mono2 text-xs font-bold text-[#F5F2EB]">Hint #${n}</p>
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase">Requires ${a} honor points to unlock</p>
          </div>
        </div>
        <button onclick="unlockHint(${e.id}, ${s}, ${a}, ${n})" class="btn-slash bg-[#121215] border border-[rgba(212,175,55,0.45)] text-[#D4AF37] hover:bg-[#D4AF37]/15 font-heading text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-2.5 transition-colors flex items-center justify-center gap-2">
          <span class="font-kanji">解</span> Unlock (-${a} PTS)
        </button>
      </div>
    `:`
    <div id="hint-wrapper-${s}" class="border border-white/10 bg-[#050507] p-3.5 flex items-center justify-between gap-3 transition-colors hover:border-white/20">
      <div class="flex items-center gap-3">
        <span class="font-kanji text-xl text-[#06B6D4]">灯</span>
        <div>
          <p class="font-mono2 text-xs font-bold text-[#F5F2EB]">Hint #${n}</p>
          <p class="font-mono2 text-[10px] tracking-widest text-[#06B6D4] uppercase">Free sacred insight</p>
        </div>
      </div>
      <button onclick="revealFreeHint(${e.id}, ${s}, ${n})" class="btn-slash bg-[#121215] border border-[rgba(6,182,212,0.4)] text-[#06B6D4] hover:bg-[#06B6D4]/15 font-heading text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-2.5 transition-colors flex items-center justify-center gap-2">
        <span class="font-kanji">明</span> Reveal Hint
      </button>
    </div>
  `}async function at(e){const t=B.find(s=>s.id===e);if(!t)return;try{const r=await(await fetch(`/api/v1/challenges/${e}`)).json();r.success&&(t.description=r.data.description,t.hints=(r.data.hints||[]).map(l=>typeof l=="object"&&l!==null?l:{id:l,cost:0}),t.files=r.data.files||[],t.connection_info=r.data.connection_info,t.attribution=r.data.attribution,t.tags=r.data.tags||[])}catch(s){console.error("Failed to load challenge details:",s)}const o=H(t.category)||{color:"#F5F2EB",label:t.categoryLabel,kanji:"試"},n=t.solved_by_me||O.includes(t.id),a=document.createElement("div");a.id="challenge-modal",a.className="fixed inset-0 z-[90] flex items-center justify-center p-4 fade-in",a.style.background="rgba(5,5,7,0.85)",a.style.backdropFilter="blur(8px)",a.innerHTML=`
    <div class="modal-in relative bg-[#121215] border border-[rgba(230,57,70,0.4)] text-[#F5F2EB] w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto modal-scroll p-6 sm:p-8 shadow-2xl" onclick="event.stopPropagation()">
      ${n?`
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="slash-strike absolute top-1/2 left-0 h-[3px] w-full" style="background: linear-gradient(90deg, transparent, #E63946, transparent); box-shadow: 0 0 24px rgba(230,57,70,0.8)"></div>
        </div>
      `:""}
      <button onclick="closeChallengeModal()" class="absolute top-4 right-4 text-[#71717A] hover:text-[#E63946] font-mono2 text-lg transition-colors">✕</button>
      <div class="flex items-center gap-3 mb-2">
        <span class="font-kanji text-3xl" style="color: ${o.color}">${o.kanji}</span>
        <div class="flex gap-2 flex-wrap">
          <span class="font-mono2 text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 border" style="color: ${o.color}; border-color: ${o.color}55">${o.label}</span>
        </div>
      </div>
      <h2 class="font-heading text-2xl font-bold text-[#F5F2EB] tracking-wide">${k(t.title)}</h2>
      <div class="text-[#A1A1AA] text-sm leading-relaxed pt-2">${t.description||"Loading..."}</div>
      
      ${t.connection_info?`
        <div class="mb-6 mt-4">
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2">接続 — CONNECTION</p>
          <div class="font-mono2 text-xs text-[#06B6D4] bg-[#06B6D4]/5 border border-[rgba(6,182,212,0.3)] px-4 py-3 break-all leading-relaxed">${k(t.connection_info).replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener" class="text-[#06B6D4] hover:text-[#22D3EE] underline underline-offset-4 decoration-[#06B6D4]/40 hover:decoration-[#22D3EE] transition-colors">$1</a>')}</div>
        </div>
      `:""}

      ${(()=>{const s=(t.tags||[]).find(i=>typeof i=="string"&&i.toLowerCase().startsWith("author=")),r=(t.tags||[]).filter(i=>typeof i=="string"&&i.toLowerCase().startsWith("link=")),l=t.attribution||(s?s.slice(7):null);return!l&&r.length===0?"":`
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/5 py-3 my-4">
          ${l?`
          <div class="flex items-center gap-2">
            <span class="font-kanji text-sm text-[#D4AF37]">匠</span>
            <div>
              <p class="font-mono2 text-[9px] tracking-widest text-[#71717A] uppercase">Crafted by</p>
              <p class="font-heading text-sm font-bold text-[#D4AF37] tracking-wide">${k(l)}</p>
            </div>
          </div>
          `:""}
          ${r.length>0?`
          <div class="flex items-center gap-2 flex-wrap">
            ${r.map(i=>{const d=i.slice(5);return`<a href="${d}" target="_blank" rel="noopener" class="font-mono2 text-[11px] text-[#E63946] hover:text-[#FF4D5E] border border-[rgba(230,57,70,0.3)] hover:border-[rgba(230,57,70,0.6)] px-3 py-1.5 transition-colors">
                <span class="font-kanji mr-1">鏈</span>${k(d.replace(/^https?:\/\//,"").split("/")[0])}
              </a>`}).join("")}
          </div>
          `:""}
        </div>
        `})()}

      <div class="flex items-center gap-8 border-y border-white/5 py-3 my-4">
        <div>
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase">Honor</p>
          <p class="font-heading text-xl font-bold text-[#D4AF37]">${t.points} PTS</p>
        </div>
        <div>
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase">Victories</p>
          <p class="font-heading text-xl font-bold text-[#F5F2EB]">${t.solves}</p>
        </div>
      </div>

      ${t.hints&&t.hints.length>0?`
        <div class="mb-6">
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2.5">灯 — INSIGHTS & HINTS</p>
          <div class="space-y-2.5" id="challenge-hints-list">
            ${t.hints.map((s,r)=>ot(t,s,r)).join("")}
          </div>
        </div>
      `:""}

      ${t.files.length>0?`
        <div class="mb-6">
          <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2">ATTACHMENTS</p>
          <div class="flex flex-wrap gap-2">
            ${t.files.map(s=>{const r=Y(s);return`
              <a href="${s}" target="_blank" download="${k(r)}" title="${k(r)}" class="font-mono2 text-xs text-[#E63946] hover:text-[#FF4D5E] border border-[rgba(230,57,70,0.3)] hover:border-[rgba(230,57,70,0.6)] px-3 py-1.5 transition-colors flex items-center gap-1.5 max-w-full">
                <span class="font-kanji mr-1 flex-shrink-0">文</span>
                <span class="truncate">${k(r)}</span>
              </a>
            `}).join("")}
          </div>
        </div>
      `:""}

      ${n?`
        <div class="modal-in flex items-center gap-3 border border-emerald-500/40 bg-emerald-500/10 px-4 py-4">
          <span class="text-emerald-400 font-mono2 text-lg">✓</span>
          <div>
            <p class="font-heading text-sm font-bold tracking-widest text-emerald-300">FLAG ACCEPTED — HONOR GAINED</p>
            <p class="font-mono2 text-xs text-emerald-400/70 mt-0.5">+${t.points} pts recorded in the shadow ledger</p>
          </div>
        </div>
      `:`
        <div id="flag-submission-area">
          <div class="flex items-center bg-[#050507] border border-white/10 focus-within:border-[rgba(230,57,70,0.5)] transition-colors">
            <span class="font-mono2 text-xs text-[#E63946] pl-4 pr-2 whitespace-nowrap select-none">ronin@ctf:~#</span>
            <input id="flag-input" type="text" placeholder="ronin{...}" spellcheck="false"
              class="flex-1 bg-transparent font-mono2 text-sm text-[#F5F2EB] placeholder:text-[#71717A]/50 py-3.5 outline-none min-w-0" />
            <span class="caret-blink w-2 h-4 bg-[#E63946]/70 mr-3"></span>
          </div>
          <button onclick="submitFlag(${t.id})" class="btn-slash mt-3 w-full bg-[#E63946] hover:bg-[#FF4D5E] text-white font-heading text-sm font-bold tracking-[0.3em] uppercase py-3.5 transition-colors duration-300 flex items-center justify-center gap-2">
            <span class="font-kanji">刀</span> Strike — Submit Flag
          </button>
          <div id="flag-error" class="hidden font-mono2 text-xs text-[#EF4444] mt-2">Incorrect flag. The shadow ledger records your miss.</div>
        </div>
      `}
    </div>
  `,a.addEventListener("click",M),document.body.appendChild(a),document.body.style.overflow="hidden"}function M(){const e=c("#challenge-modal");e&&(e.remove(),document.body.style.overflow="")}async function st(e,t,o,n){var i,d;const a=B.find(g=>g.id===e),s=c(`#hint-wrapper-${t}`);if(!confirm(`Spend ${o} honor points to unlock Hint #${n}? This deduction cannot be undone.`))return;const l=((i=document.querySelector('meta[name="csrf-token"]'))==null?void 0:i.content)||((d=window.init)==null?void 0:d.csrfNonce)||"";try{const u=await(await fetch("/api/v1/unlocks",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","CSRF-Token":l},credentials:"same-origin",body:JSON.stringify({target:t,type:"hints"})})).json();if(u.success){const x=await(await fetch(`/api/v1/hints/${t}`)).json();if(x.success&&x.data&&(x.data.html||x.data.content)){const v=x.data.html||x.data.content;if(a&&a.hints){const w=a.hints.find($=>$.id===t);w&&(w.content=v)}s&&(s.outerHTML=`
            <div class="fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
              <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
                <span class="font-kanji">灯</span> Hint #${n} <span class="text-[#71717A] font-normal">(-${o} PTS)</span>
              </div>
              <div class="text-[#F5F2EB]/90 leading-relaxed">${T(v)}</div>
            </div>
          `),F(`Hint #${n} unlocked (-${o} PTS)`,"success")}else F("Hint unlocked! Please reopen the trial.","success")}else{const b=u.errors?typeof u.errors=="string"?u.errors:Object.values(u.errors).flat().join(" "):"Failed to unlock hint";if(b.toLowerCase().includes("already unlocked")){const v=await(await fetch(`/api/v1/hints/${t}`)).json();if(v.success&&v.data&&(v.data.html||v.data.content)){const w=v.data.html||v.data.content;if(a&&a.hints){const $=a.hints.find(h=>h.id===t);$&&($.content=w)}s&&(s.outerHTML=`
              <div class="fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
                <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
                  <span class="font-kanji">灯</span> Hint #${n} <span class="text-[#10B981] font-normal">(Clan Unlocked)</span>
                </div>
                <div class="text-[#F5F2EB]/90 leading-relaxed">${T(w)}</div>
              </div>
            `),F(`Hint #${n} was already unlocked by your clan!`,"success");return}}F(b||"Failed to unlock hint","error")}}catch(g){console.error("Unlock hint error:",g),F("Network error unlocking hint","error")}}async function rt(e,t,o){var r,l;const n=B.find(i=>i.id===e),a=c(`#hint-wrapper-${t}`),s=((r=document.querySelector('meta[name="csrf-token"]'))==null?void 0:r.content)||((l=window.init)==null?void 0:l.csrfNonce)||"";try{await fetch("/api/v1/unlocks",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","CSRF-Token":s},credentials:"same-origin",body:JSON.stringify({target:t,type:"hints"})});const d=await(await fetch(`/api/v1/hints/${t}`)).json();if(d.success&&d.data&&(d.data.html||d.data.content)){const g=d.data.html||d.data.content;if(n&&n.hints){const u=n.hints.find(b=>b.id===t);u&&(u.content=g)}a&&(a.outerHTML=`
          <div class="fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
            <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#06B6D4] uppercase font-bold">
              <span class="font-kanji">灯</span> Hint #${o} <span class="text-[#06B6D4] font-normal">(Free)</span>
            </div>
            <div class="text-[#F5F2EB]/90 leading-relaxed">${T(g)}</div>
          </div>
        `),F(`Hint #${o} revealed!`,"success")}else{const g=d.errors?Object.values(d.errors).flat().join(" "):"Could not reveal hint";F(g,"error")}}catch(i){console.error("Reveal free hint error:",i),F("Failed to reveal hint","error")}}async function it(e){var a,s;const t=c("#flag-input"),o=c("#flag-error"),n=(a=t==null?void 0:t.value)==null?void 0:a.trim();if(n)try{const l=await(await fetch("/api/v1/challenges/attempt",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","CSRF-Token":((s=document.querySelector('meta[name="csrf-token"]'))==null?void 0:s.content)||""},credentials:"same-origin",body:JSON.stringify({challenge_id:e,submission:n})})).json();if(l.success){if(l.data.status==="correct")O.push(e),F("Flag accepted — honor gained","success"),M(),W();else if(l.data.status==="already_solved")F("You have already conquered this trial","success"),M();else if(o){o.classList.remove("hidden");const i=c("#flag-submission-area");i&&(i.classList.add("shake-x"),setTimeout(()=>i.classList.remove("shake-x"),400))}}}catch(r){console.error("Flag submission failed:",r),F("Submission failed — check your connection","error")}}async function lt(){try{J=await ft();const[e,t]=await Promise.all([fetch("/api/v1/scoreboard").then(o=>o.json()),fetch("/api/v1/scoreboard/top/50").then(o=>o.json()).catch(()=>null)]);if(e.success){if(D=e.data,t&&t.success&&t.data){const o={},n={};Object.values(t.data).forEach(a=>{const s=(a.solves||[]).filter(r=>r.challenge_id!==null&&r.challenge_id!==void 0);o[a.id]=s.length,s.forEach(r=>{r.user_id&&(n[r.user_id]=(n[r.user_id]||0)+1)})}),D=D.map(a=>({...a,solves:o[a.account_id]!==void 0?o[a.account_id]:a.solves||0,_memberSolveCounts:n}))}V(U(S))}ct()}catch(e){console.error("Failed to load scoreboard:",e),F("Failed to load honor scroll","error")}}async function ct(){const e=c("#tournament-pulse");if(!(!e||!window.echarts))try{const o=await(await fetch("/api/v1/scoreboard/top/5")).json();if(!o.success)return;const n=["#D4AF37","#E63946","#94A3B8","#F5F2EB","#06B6D4"],s=Object.values(o.data).slice(0,5).map((l,i)=>{const d=(l.solves||[]).filter(b=>b.challenge_id!==null&&b.value>0).sort((b,x)=>new Date(b.date)-new Date(x.date));let g=0;const u=d.map(b=>(g+=b.value,[new Date(b.date).getTime(),g]));return{name:l.name,type:"line",showSymbol:!1,smooth:!0,lineWidth:2,lineStyle:{color:n[i%n.length],width:2},itemStyle:{color:n[i%n.length]},data:u.length?u:[[Date.now()-864e5,0],[Date.now(),0]]}});e._echarts&&e._echarts.dispose();const r=window.echarts.init(e);e._echarts=r,r.setOption({backgroundColor:"transparent",grid:{top:10,right:10,bottom:24,left:46},tooltip:{trigger:"axis",backgroundColor:"#121215",borderColor:"rgba(230,57,70,0.4)",textStyle:{color:"#F5F2EB",fontFamily:"JetBrains Mono",fontSize:11}},legend:{bottom:0,textStyle:{color:"#A1A1AA",fontFamily:"JetBrains Mono",fontSize:10},icon:"roundRect",itemWidth:14,itemHeight:2},xAxis:{type:"time",axisLine:{lineStyle:{color:"rgba(255,255,255,0.1)"}},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{show:!1}},yAxis:{type:"value",axisLine:{show:!1},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{lineStyle:{color:"rgba(255,255,255,0.05)"}}},series:s})}catch(t){console.error("Failed to load tournament pulse:",t)}}const E=[{key:"tenno",kanji:"天皇",title:"Tenno",sub:"Emperor — The One",minPct:90,color:"#D4AF37",border:"rgba(212,175,55,0.7)",glow:"rgba(212,175,55,0.25)"},{key:"shogun",kanji:"将軍",title:"Shogun",sub:"66% – 89% mastery",minPct:66,color:"#E63946",border:"rgba(230,57,70,0.5)",glow:"rgba(230,57,70,0.2)"},{key:"daimyo",kanji:"大名",title:"Daimyo",sub:"41% – 65% mastery",minPct:41,color:"#F5F2EB",border:"rgba(245,242,235,0.4)",glow:"rgba(245,242,235,0.12)"},{key:"samurai",kanji:"侍",title:"Samurai",sub:"21% – 40% mastery",minPct:21,color:"#94A3B8",border:"rgba(148,163,184,0.4)",glow:"rgba(148,163,184,0.15)"},{key:"peasant",kanji:"農民",title:"Peasant",sub:"0% – 20% — just starting",minPct:0,color:"#71717A",border:"rgba(113,113,122,0.3)",glow:"none"}];function dt(e,t,o){const n=t>0?e/t*100:0;return o===1?{rank:E[0],pct:n}:n>=90?{rank:E[1],pct:n}:n>=66?{rank:E[1],pct:n}:n>=41?{rank:E[2],pct:n}:n>=21?{rank:E[3],pct:n}:{rank:E[4],pct:n}}let S="teams",D=[],J=0;function U(e){if(e==="teams")return D;const t=[];return D.forEach(o=>{const n=o._memberSolveCounts||{};(o.members||[]).forEach(a=>{t.push({pos:null,account_id:a.id,account_url:`/users/${a.id}`,account_type:"user",name:a.name,score:a.score,solves:n[a.id]||0})})}),t.sort((o,n)=>n.score-o.score),t.map((o,n)=>({...o,pos:n+1}))}function pt(e){S=e;const t=c("#tab-teams"),o=c("#tab-players");if(!t||!o)return;const n=["bg-[#E63946]","text-white","border-[#E63946]"],a=["bg-[#121215]","text-[#71717A]","border-white/10"],s=(r,l)=>{r.classList.remove(...l?a:n),r.classList.add(...l?n:a)};s(t,e==="teams"),s(o,e==="players"),V(U(e))}async function ft(){try{const t=await(await fetch("/api/v1/challenges")).json();if(t.success&&Array.isArray(t.data)&&t.data.length>0){const o=t.data.reduce((n,a)=>n+(typeof a.value=="number"?a.value:0),0);if(o>0)return o}}catch(e){console.error("fetchTotalPoints challenges strategy failed:",e)}try{const e=await fetch("/api/v1/scoreboard/top/50").then(t=>t.json());if(e.success&&e.data){const t={};Object.values(e.data).forEach(n=>{(n.solves||[]).forEach(a=>{a.challenge_id!==null&&a.challenge_id!==void 0&&(t[a.challenge_id]=a.value||0)})});const o=Object.values(t).reduce((n,a)=>n+a,0);if(o>0)return o}}catch(e){console.error("fetchTotalPoints scoreboard strategy failed:",e)}return 0}function V(e){var n,a;const t=c("#podium"),o=c("#scoreboard-body");if(e){if(t)if(S==="teams"&&e.length>=3){const s=[e[1],e[0],e[2]];t.innerHTML=G.map((r,l)=>{const i=s[l];if(!i)return"";const d=i.name?i.name.charAt(0):"浪",g=i.account_url?`<a href="${i.account_url}" class="font-heading text-2xl font-bold text-[#F5F2EB] mt-3 hover:text-[#E63946] transition-colors block truncate">${k(i.name)}</a>`:`<h3 class="font-heading text-2xl font-bold text-[#F5F2EB] mt-3">${k(i.name)}</h3>`;return`
        <div class="reveal" style="transition-delay: ${l*.12}s">
          <div class="relative bg-[#121215] border ${r.border} p-8 text-center overflow-hidden shadow-xl ${r.pad}">
            <span class="absolute top-3 left-1/2 -translate-x-1/2 font-kanji text-7xl opacity-[0.05] select-none">${d}</span>
            <span class="font-kanji text-2xl ${r.text}">${r.glyph}</span>
            <p class="font-mono2 text-[10px] tracking-[0.35em] uppercase mt-3 ${r.text}">Rank ${r.rank} — ${r.seal}</p>
            ${g}
            <p class="font-heading text-4xl font-black mt-4" style="color: ${r.rank===1?"#D4AF37":"#F5F2EB"}">
              ${i.score.toLocaleString()}<span class="text-sm font-semibold text-[#71717A] ml-2">PTS</span>
            </p>
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] mt-2 uppercase">${i.solves||0} victories</p>
          </div>
        </div>
      `}).join("")}else t.innerHTML="";if(o){const s=c("#col-victories");s&&(s.textContent=S==="teams"?"Warriors":"Victories");const r=(n=window.init)==null?void 0:n.userId,l=(a=window.init)==null?void 0:a.teamId;o.innerHTML=e.map(i=>{const d=i.name?i.name.charAt(0):"浪",g=S==="teams"?l!=null&&i.account_id===l:r!=null&&i.account_id===r,{rank:u,pct:b}=dt(i.score,J,i.pos),x=i.account_url?`<a href="${i.account_url}" class="font-heading text-sm font-bold tracking-wide text-[#F5F2EB] hover:text-[#E63946] transition-colors">${k(i.name)}</a>`:`<span class="font-heading text-sm font-bold tracking-wide text-[#F5F2EB]">${k(i.name)}</span>`;return`
        <tr class="border-b border-white/5 transition-colors hover:bg-[#1A1A1E] ${g?"bg-[#E63946]/5 border-l-2 border-l-[#E63946]":""}">
          <td class="px-6 py-4">
            <span class="font-heading text-lg font-black ${i.pos<=3?"text-[#D4AF37]":"text-[#71717A]"}">${String(i.pos).padStart(2,"0")}</span>
          </td>
          <td class="px-6 py-4"><span class="font-kanji text-xl text-[#E63946]/80">${d}</span></td>
          <td class="px-6 py-4">
            ${x}
            ${g?'<span class="font-mono2 text-[9px] tracking-widest text-[#E63946] ml-2 uppercase">You</span>':""}
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1.5 border px-2.5 py-1" style="border-color: ${u.border}; background: ${u.glow}" title="${u.title} — ${u.sub} (${b.toFixed(1)}% of total honor)">
              <span class="font-kanji text-sm" style="color: ${u.color}">${u.kanji}</span>
              <span class="font-mono2 text-[9px] tracking-widest uppercase" style="color: ${u.color}">${u.title}</span>
              <span class="font-mono2 text-[9px] text-[#71717A]">${b.toFixed(0)}%</span>
            </span>
          </td>
          <td class="px-6 py-4 font-mono2 text-sm text-[#A1A1AA]">${S==="teams"&&i.members?i.members.length:i.solves||0}</td>
          <td class="px-6 py-4 font-mono2 text-sm font-bold text-[#F5F2EB]">${i.score.toLocaleString()}</td>
        </tr>
      `}).join("")}R()}}function ut(e){const t=CATEGORIES.find(o=>o.id===String(e).toLowerCase().replace(/\s+/g,""));return t?t.color:"#94A3B8"}async function gt(){const e=window.location.pathname.match(/^\/users\/(\d+)/),t=e?e[1]:"me";try{const[o,n,a,s]=await Promise.all([fetch(`/api/v1/users/${t}`),fetch(`/api/v1/users/${t}/solves`),fetch(`/api/v1/users/${t}/fails`),fetch(`/api/v1/users/${t}/awards`)]),r=await o.json(),l=await n.json(),i=await a.json(),d=await s.json();r.success&&l.success&&ht(r.data,l.data||[],{fails:i.success&&i.data||[],awards:d.success&&d.data||[]})}catch(o){console.error("Failed to load profile:",o)}}function ht(e,t,o={}){const n=o.fails||[],a=o.awards||[],s=c("#stat-score"),r=c("#stat-solves"),l=c("#stat-fails");s&&(s.textContent=(e.score||0).toLocaleString()),r&&(r.textContent=t.length),l&&(l.textContent=n.length);const i=t.length+n.length,d=i>0?(t.length/i*100).toFixed(1):null,g=i>0?(n.length/i*100).toFixed(1):null,u=c("#solve-bar"),b=c("#fail-bar"),x=c("#solve-pct"),v=c("#fail-pct");if(u&&b){const h=d===null?50:parseFloat(d),p=g===null?50:parseFloat(g);u.style.width=h+"%",b.style.width=p+"%"}x&&(x.textContent=d===null?"—":d),v&&(v.textContent=g===null?"—":g);const w=c("#category-bar"),$=c("#category-legend");if(w&&$&&t.length>0){const h={};t.forEach(m=>{var f;const y=((f=m.challenge)==null?void 0:f.category)||"Unknown";h[y]=(h[y]||0)+1});const p=Object.keys(h).map(m=>({name:m,count:h[m],percent:h[m]/t.length*100,color:ut(m)}));w.innerHTML=p.map(m=>`<div class="h-full" style="width: ${m.percent}%; background-color: ${m.color}"></div>`).join(""),$.innerHTML=p.map(m=>`
      <div class="flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full" style="background-color: ${m.color}"></span>
        <span class="font-mono2 text-[10px] tracking-widest uppercase text-[#A1A1AA]">${k(m.name)} (${m.percent.toFixed(1)}%)</span>
      </div>
    `).join("")}if(window.echarts&&c("#user-score-graph")){const h=c("#user-score-graph"),p=[];t.forEach(f=>{var A;((A=f.challenge)==null?void 0:A.value)>0&&p.push({date:new Date(f.date).getTime(),value:f.challenge.value})}),a.forEach(f=>{f.value>0&&p.push({date:new Date(f.date).getTime(),value:f.value})}),p.sort((f,A)=>f.date-A.date);let m=0;const y=p.map(f=>(m+=f.value,[f.date,m]));if(y.length>0){h._echarts&&h._echarts.dispose();const f=window.echarts.init(h);h._echarts=f,f.setOption({backgroundColor:"transparent",grid:{top:10,right:10,bottom:24,left:46},tooltip:{trigger:"axis",backgroundColor:"#121215",borderColor:"rgba(230,57,70,0.4)",textStyle:{color:"#F5F2EB",fontFamily:"JetBrains Mono",fontSize:11}},xAxis:{type:"time",axisLine:{lineStyle:{color:"rgba(255,255,255,0.1)"}},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{show:!1}},yAxis:{type:"value",axisLine:{show:!1},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{lineStyle:{color:"rgba(255,255,255,0.05)"}}},series:[{type:"line",showSymbol:!0,symbolSize:5,smooth:!0,step:"end",lineStyle:{color:"#E63946",width:2},itemStyle:{color:"#E63946"},areaStyle:{color:"rgba(230,57,70,0.12)"},data:y}]})}}if(window.echarts&&c("#skills-radar")){const h=c("#skills-radar"),p={};t.forEach(y=>{var A;const f=((A=y.challenge)==null?void 0:A.category)||"Unknown";p[f]=(p[f]||0)+1});const m=Object.keys(p).map(y=>({skill:y,value:Math.min(p[y]*20+40,100)}));if(m.length>0){h._echarts&&h._echarts.dispose();const y=window.echarts.init(h);h._echarts=y,y.setOption({radar:{indicator:m.map(f=>({name:f.skill,max:100})),axisLine:{lineStyle:{color:"rgba(255,255,255,0.08)"}},splitLine:{lineStyle:{color:"rgba(255,255,255,0.08)"}},splitArea:{show:!1},axisName:{color:"#A1A1AA",fontFamily:"JetBrains Mono",fontSize:10}},series:[{type:"radar",data:[{value:m.map(f=>f.value),name:"Skills",areaStyle:{color:"rgba(230,57,70,0.22)"},lineStyle:{color:"#E63946",width:2},itemStyle:{color:"#E63946"}}]}]})}}}function mt(){Z(),K(),X(),bt()}async function bt(){try{const[e,t]=await Promise.all([fetch("/api/v1/challenges"),fetch("/api/v1/users")]),o=await e.json(),n=await t.json(),a=o.success?o.data.length:16,s=n.success?n.data.length:148,r=C(".landing-stat-value");r[0]&&(r[0].textContent=String(a).padStart(2,"0")),r[2]&&(r[2].textContent=String(s))}catch(e){console.error("Failed to load landing stats:",e)}}function xt(){const e=c("#mobile-nav-toggle"),t=c("#mobile-nav-menu");e&&t&&e.addEventListener("click",()=>{t.classList.toggle("hidden"),t.classList.toggle("fade-in")})}function _(){const e=window.location.pathname;R(),xt(),e==="/"||e===""?mt():e==="/challenges"?(W(),vt()):e==="/scoreboard"?lt():(e==="/user"||e.startsWith("/users/"))&&gt()}function vt(){const e=c("#challenge-search");e&&e.addEventListener("input",z(()=>P(),300))}document.addEventListener("DOMContentLoaded",()=>{const e=c("#splash-intro"),t=sessionStorage.getItem("ronin-entered");e&&!t?Q():(e&&(e.style.display="none",document.body.classList.add("entered")),_())});window.addEventListener("popstate",()=>{_()});window.setCategory=et;window.setDifficulty=nt;window.switchBoard=pt;window.openChallengeModal=at;window.closeChallengeModal=M;window.submitFlag=it;window.unlockHint=st;window.revealFreeHint=rt;
