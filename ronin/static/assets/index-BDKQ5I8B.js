const U={all:{label:"All Trials",kanji:"全",color:"#F5F2EB"},web:{label:"Web",kanji:"蜘蛛",color:"#E63946"},crypto:{label:"Crypto",kanji:"暗号",color:"#D4AF37"},cryptography:{label:"Crypto",kanji:"暗号",color:"#D4AF37"},pwn:{label:"Pwn",kanji:"刀切",color:"#8B5CF6"},binary:{label:"Binary",kanji:"刀切",color:"#8B5CF6"},forensics:{label:"Forensics",kanji:"影",color:"#06B6D4"},reversing:{label:"Reversing",kanji:"解体",color:"#10B981"},rev:{label:"Reversing",kanji:"解体",color:"#10B981"},misc:{label:"Misc",kanji:"雑",color:"#F97316"},miscellaneous:{label:"Misc",kanji:"雑",color:"#F97316"},osint:{label:"OSINT",kanji:"諜",color:"#EC4899"},hardware:{label:"Hardware",kanji:"機",color:"#EAB308"},warmup:{label:"Warmup",kanji:"初",color:"#14B8A6"},mobile:{label:"Mobile",kanji:"携",color:"#6366F1"},cloud:{label:"Cloud",kanji:"雲",color:"#38BDF8"},blockchain:{label:"Blockchain",kanji:"鎖",color:"#A855F7"},ai:{label:"AI",kanji:"知",color:"#06B6D4"}},W=[{color:"#F97316",kanji:"雑"},{color:"#EC4899",kanji:"諜"},{color:"#14B8A6",kanji:"初"},{color:"#EAB308",kanji:"機"},{color:"#6366F1",kanji:"携"},{color:"#A855F7",kanji:"鎖"},{color:"#06B6D4",kanji:"知"},{color:"#F43F5E",kanji:"斬"},{color:"#84CC16",kanji:"陣"}],q=[],Z=[{rank:2,glyph:"銀",seal:"Silver Blade Seal",border:"border-slate-400/40",text:"text-slate-300",pad:"lg:pt-14"},{rank:1,glyph:"冠",seal:"Dragon Seal",border:"border-[#D4AF37]/60",text:"text-[#D4AF37]",pad:""},{rank:3,glyph:"銅",seal:"Bronze Torii Seal",border:"border-amber-700/50",text:"text-amber-600",pad:"lg:pt-20"}];function c(e){return document.querySelector(e)}function B(e){return document.querySelectorAll(e)}function O(e){if(!e)return{id:"unknown",label:"Trial",kanji:"試",color:"#F5F2EB"};const t=String(e).toLowerCase().replace(/\s+/g,"");if(U[t])return{id:t,...U[t]};const a=q.find(i=>i.id===t);if(a)return a;let n=0;for(let i=0;i<t.length;i++)n=(n<<5)-n+t.charCodeAt(i);const o=W[Math.abs(n)%W.length],s={id:t,label:String(e),kanji:o.kanji,color:o.color};return q.push(s),s}function J(e,t){let a;return(...n)=>{clearTimeout(a),a=setTimeout(()=>e(...n),t)}}function k(e){return String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function tt(e){if(!e)return"";try{const a=new URL(e,window.location.origin).pathname.split("/").filter(Boolean).pop()||"";return decodeURIComponent(a)}catch{const a=String(e).split("?")[0].split("#")[0];return a.split("/").filter(Boolean).pop()||a}}function I(){const e=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&(a.target.classList.add("reveal-visible"),a.target.classList.remove("reveal-hidden"),e.unobserve(a.target))})},{rootMargin:"-40px"});B(".reveal").forEach(t=>{t.classList.add("reveal-hidden"),e.observe(t)})}function et(){setTimeout(()=>{B(".masked-line").forEach(e=>e.classList.add("masked-line-visible"))},60)}function nt(){setTimeout(()=>{B(".fade-in-anim").forEach(e=>{e.style.opacity="1",e.style.transform="none"})},60)}function at(){const e=c("#splash-intro");if(!e)return;const t=c("#splash-progress"),a=c("#splash-percent"),n=c("#splash-enter");let o=0;const s=setInterval(()=>{o+=2,t&&(t.style.width=o+"%"),a&&(a.textContent=o),o>=100&&(clearInterval(s),i())},60);function i(){e.classList.add("slashed"),setTimeout(()=>{e.style.display="none",document.body.classList.add("entered"),sessionStorage.setItem("ronin-entered","true"),P()},700)}n&&n.addEventListener("click",i)}function ot(){const e=c("#enso-canvas");if(!e)return;const t=e.getContext("2d"),a=Math.min(window.devicePixelRatio||1,1.5);let n=0,o=0;function s(){const r=e.parentElement;r&&(n=r.offsetWidth,o=r.offsetHeight,e.width=n*a,e.height=o*a,t.setTransform(a,0,0,a,0,0))}s(),window.addEventListener("resize",J(s,100));const i=Array.from({length:45},()=>({x:Math.random()*(n||1600),y:Math.random()*(o||900),r:Math.random()*1.5+.5,vx:(Math.random()-.5)*.2,vy:-(Math.random()*.3+.08),o:Math.random()*.45+.1,red:Math.random()<.35}));function l(r){const d=r;t.clearRect(0,0,n,o);const p=n>1024?n*.72:n*.5,u=o*.45,m=Math.min(n,o)*.28,x=d*14e-5,y=Math.PI*.22,F=y/2+x,$=Math.PI*2-y/2+x,g=60;for(let f=0;f<g;f++){const b=f/g,w=F+($-F)*b,h=F+($-F)*((f+1)/g),A=Math.sin(b*Math.PI);t.beginPath(),t.strokeStyle=`rgba(230,57,70,${.08+A*.12})`,t.lineWidth=1.5+A*10,t.arc(p,u,m,w,h),t.stroke()}for(const f of i)f.x+=f.vx,f.y+=f.vy,f.y<-10&&(f.y=o+10,f.x=Math.random()*n),t.beginPath(),t.fillStyle=f.red?`rgba(230,57,70,${f.o})`:`rgba(245,242,235,${f.o*.7})`,t.arc(f.x,f.y,f.r,0,Math.PI*2),t.fill();requestAnimationFrame(l)}requestAnimationFrame(l)}function v(e,t="success"){let a=c(".toast-container");a||(a=document.createElement("div"),a.className="toast-container fixed bottom-6 right-6 z-[100] flex flex-col gap-2 pointer-events-none",document.body.appendChild(a));const n=document.createElement("div");n.className="modal-in px-4 py-3 font-mono2 text-xs max-w-sm shadow-2xl border pointer-events-auto flex items-start gap-3 backdrop-blur-md",t==="success"?(n.style.borderColor="rgba(16,185,129,0.5)",n.style.color="#6EE7B7",n.style.background="rgba(18,18,21,0.95)"):t==="info"||t==="hint"?(n.style.borderColor="rgba(212,175,55,0.6)",n.style.color="#F5D77F",n.style.background="rgba(18,18,21,0.95)"):(n.style.borderColor="rgba(230,57,70,0.6)",n.style.color="#FF4D5E",n.style.background="rgba(18,18,21,0.95)");const o=t==="success"?"達":t==="info"||t==="hint"?"灯":"警";n.innerHTML=`<span class="font-kanji text-base flex-shrink-0">${o}</span><span class="flex-1 leading-relaxed">${k(e)}</span>`,a.appendChild(n),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateY(10px)",n.style.transition="all 0.3s ease",setTimeout(()=>n.remove(),300)},4e3)}let E=[],N=[],T="all",C="all";function R(){const e=window.location.hash;if(!e||e.length<=1)return;const t=e.match(/(?:.*-)?(\d+)$/);if(t){const a=parseInt(t[1],10);a&&E.some(n=>n.id===a)&&Y(a)}}function st(){window.removeEventListener("hashchange",R),window.addEventListener("hashchange",R)}async function V(){try{const t=await(await fetch("/api/v1/challenges")).json();t.success&&(E=t.data.map(a=>({id:a.id,title:a.name,category:a.category?a.category.toLowerCase().replace(/\s+/g,""):"misc",categoryLabel:a.category||"Misc",points:a.value,solves:a.solves,solved_by_me:a.solved_by_me,description:"",tags:a.tags||[]})),rt(),H(),st(),R())}catch(e){console.error("Failed to load challenges:",e),v("Failed to load trials","error")}}function rt(){const e=c("#category-tabs");if(!e)return;const t=[{id:"all",label:"All Trials",kanji:"全",color:"#71717A"}],a=new Set(["all"]);E.forEach(n=>{if(!a.has(n.category)){a.add(n.category);const o=O(n.category)||{id:n.category,label:n.categoryLabel,kanji:"試",color:"#F5F2EB"};t.push({id:n.category,label:n.categoryLabel||o.label,kanji:o.kanji,color:o.color})}}),e.innerHTML=t.map(n=>{const o=T===n.id;return`
      <button onclick="setCategory('${n.id}')" data-cat="${n.id}" class="challenge-cat-btn relative px-4 sm:px-5 py-3 flex items-center gap-2 ${o?"active":""}">
        <span class="font-kanji text-sm" style="color: ${n.color}">${n.kanji}</span>
        <span class="font-mono2 text-[11px] tracking-[0.2em] uppercase transition-colors ${o?"text-[#F5F2EB]":"text-[#71717A] hover:text-[#A1A1AA]"}">${k(n.label)}</span>
        ${o?'<span class="cat-indicator absolute bottom-0 left-2 right-2 h-[2px] bg-[#E63946]"></span>':""}
      </button>
    `}).join("")}function H(){var o;const e=c("#challenges-grid");if(!e)return;const t=(((o=c("#challenge-search"))==null?void 0:o.value)||"").toLowerCase(),a=E.filter(s=>!(T!=="all"&&s.category!==T||C!=="all"&&(C==="ashigaru"&&s.points>150||C==="chunin"&&(s.points<=150||s.points>275)||C==="hatamoto"&&(s.points<=275||s.points>425)||C==="shogun"&&s.points<=425)||t&&!s.title.toLowerCase().includes(t)));e.innerHTML=a.map((s,i)=>{const l=O(s.category)||{color:"#F5F2EB",label:s.categoryLabel,kanji:"試"},r=s.solved_by_me||N.includes(s.id),d=s.solves>0?Math.min(Math.round(s.solves/(s.solves+10)*100),100):0;return`
      <div class="reveal" style="transition-delay: ${Math.min(i*.04,.35)}s">
        <button onclick="openChallengeModal(${s.id})" class="trial-card relative text-left bg-[#121215] border border-white/10 p-6 overflow-hidden group w-full flex flex-col justify-between">
          <span class="absolute -right-3 -bottom-6 font-kanji text-8xl leading-none opacity-[0.04] group-hover:opacity-[0.1] transition-opacity duration-500 select-none pointer-events-none" style="color: ${l.color}">${l.kanji}</span>
          <div>
            <div class="flex items-center justify-between mb-5">
              <span class="font-mono2 text-[10px] tracking-[0.25em] uppercase px-2 py-1 border" style="color: ${l.color}; border-color: ${l.color}44">${l.label}</span>
              ${r?'<span class="flex items-center gap-1.5 font-mono2 text-[10px] tracking-widest text-emerald-400 uppercase">✓ Solved</span>':""}
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
    `}).join("");const n=c("#no-challenges");n&&n.classList.toggle("hidden",a.length>0),I()}function it(e){T=e,B(".challenge-cat-btn").forEach(t=>{const a=t.dataset.cat===e;t.classList.toggle("active",a);const n=t.querySelector("span:nth-child(2)");n&&(n.className=`font-mono2 text-[11px] tracking-[0.2em] uppercase transition-colors ${a?"text-[#F5F2EB]":"text-[#71717A] hover:text-[#A1A1AA]"}`);const o=t.querySelector(".cat-indicator");a?o||t.insertAdjacentHTML("beforeend",'<span class="cat-indicator absolute bottom-0 left-2 right-2 h-[2px] bg-[#E63946]"></span>'):o&&o.remove()}),H()}function lt(e){C=e,B(".diff-btn").forEach(t=>{const a=t.dataset.diff===e;t.classList.toggle("active",a),a?t.className="diff-btn active font-mono2 text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border border-[rgba(230,57,70,0.5)] bg-[#E63946]/10 text-[#F5F2EB] transition-all":t.className="diff-btn font-mono2 text-[10px] tracking-[0.2em] uppercase px-3.5 py-2 border border-white/10 text-[#71717A] hover:text-[#A1A1AA] hover:border-white/20 transition-all"}),H()}function M(e){if(!e)return"";let t=String(e);return t=t.replace(/!\[([^\]]*)\]\(([^)]+)\)/g,'<img src="$2" alt="$1" class="max-w-full h-auto my-2.5 rounded border border-white/10 shadow-lg block" />'),t=t.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g,'<a href="$2" target="_blank" rel="noopener" class="text-[#06B6D4] hover:underline underline-offset-2">$1</a>'),/<(p|div|br|ul|ol|table)/i.test(t)||(t=t.replace(/\n/g,"<br>")),t}function ct(e,t,a){const n=a+1,o=typeof t.cost=="number"?t.cost:0,s=t.id,i=t.html||t.content;return i?`
      <div class="font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
        <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
          <span class="font-kanji">灯</span> Hint #${n} ${o>0?`<span class="text-[#71717A] font-normal">(-${o} PTS)</span>`:'<span class="text-[#06B6D4] font-normal">(Free)</span>'}
        </div>
        <div class="text-[#F5F2EB]/90 leading-relaxed">${M(i)}</div>
      </div>
    `:o>0?`
      <div id="hint-wrapper-${s}" class="border border-white/10 bg-[#050507] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:border-white/20">
        <div class="flex items-center gap-3">
          <span class="font-kanji text-xl text-[#D4AF37]">灯</span>
          <div>
            <p class="font-mono2 text-xs font-bold text-[#F5F2EB]">Hint #${n}</p>
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase">Requires ${o} honor points to unlock</p>
          </div>
        </div>
        <button onclick="unlockHint(${e.id}, ${s}, ${o}, ${n})" class="btn-slash bg-[#121215] border border-[rgba(212,175,55,0.45)] text-[#D4AF37] hover:bg-[#D4AF37]/15 font-heading text-[11px] font-bold tracking-[0.2em] uppercase px-4 py-2.5 transition-colors flex items-center justify-center gap-2">
          <span class="font-kanji">解</span> Unlock (-${o} PTS)
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
  `}async function Y(e){const t=E.find(i=>i.id===e);if(!t)return;try{const l=await(await fetch(`/api/v1/challenges/${e}`)).json();l.success&&(t.description=l.data.description,t.hints=(l.data.hints||[]).map(r=>typeof r=="object"&&r!==null?r:{id:r,cost:0}),t.files=l.data.files||[],t.connection_info=l.data.connection_info,t.attribution=l.data.attribution,t.tags=l.data.tags||[])}catch(i){console.error("Failed to load challenge details:",i)}const a=O(t.category)||{color:"#F5F2EB",label:t.categoryLabel,kanji:"試"},n=t.solved_by_me||N.includes(t.id),o=(t.title||"trial").toLowerCase().replace(/[^a-z0-9_-]/g,"_");window.location.hash!==`#${o}-${t.id}`&&history.replaceState(null,null,`#${o}-${t.id}`);const s=document.createElement("div");s.id="challenge-modal",s.className="fixed inset-0 z-[90] flex items-center justify-center p-4 fade-in",s.style.background="rgba(5,5,7,0.85)",s.style.backdropFilter="blur(8px)",s.innerHTML=`
    <div class="modal-in relative bg-[#121215] border border-[rgba(230,57,70,0.4)] text-[#F5F2EB] w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto modal-scroll p-6 sm:p-8 shadow-2xl" onclick="event.stopPropagation()">
      ${n?`
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="slash-strike absolute top-1/2 left-0 h-[3px] w-full" style="background: linear-gradient(90deg, transparent, #E63946, transparent); box-shadow: 0 0 24px rgba(230,57,70,0.8)"></div>
        </div>
      `:""}
      <button onclick="closeChallengeModal()" class="absolute top-4 right-4 text-[#71717A] hover:text-[#E63946] font-mono2 text-lg transition-colors">✕</button>
      <div class="flex items-center gap-3 mb-2">
        <span class="font-kanji text-3xl" style="color: ${a.color}">${a.kanji}</span>
        <div class="flex gap-2 flex-wrap">
          <span class="font-mono2 text-[10px] tracking-[0.25em] uppercase px-2.5 py-1 border" style="color: ${a.color}; border-color: ${a.color}55">${a.label}</span>
        </div>
      </div>
      <h2 class="font-heading text-2xl font-bold text-[#F5F2EB] tracking-wide">${k(t.title)}</h2>

      <!-- Modal Tabs: Details / Solves -->
      <div class="flex items-center gap-6 border-b border-white/10 mb-6 mt-4">
        <button id="modal-tab-details-btn" onclick="switchChallengeModalTab('details', ${t.id})" class="font-heading text-xs font-bold uppercase tracking-widest text-[#E63946] border-b-2 border-[#E63946] pb-2.5 flex items-center gap-2 transition-all">
          <span class="font-kanji text-sm">試</span> Trial Details
        </button>
        <button id="modal-tab-solves-btn" onclick="switchChallengeModalTab('solves', ${t.id})" class="font-heading text-xs font-bold uppercase tracking-widest text-[#71717A] hover:text-[#A1A1AA] pb-2.5 flex items-center gap-2 transition-all">
          <span class="font-kanji text-sm">血</span> Conquered (<span id="modal-solves-count">${t.solves}</span>)
        </button>
      </div>

      <!-- Panel: Details -->
      <div id="modal-panel-details">
        <div class="text-[#A1A1AA] text-sm leading-relaxed pt-1">${t.description||"Loading..."}</div>
        
        ${t.connection_info?`
          <div class="mb-6 mt-4">
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2">接続 — CONNECTION</p>
            <div class="font-mono2 text-xs text-[#06B6D4] bg-[#06B6D4]/5 border border-[rgba(6,182,212,0.3)] px-4 py-3 break-all leading-relaxed">${k(t.connection_info).replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener" class="text-[#06B6D4] hover:text-[#22D3EE] underline underline-offset-4 decoration-[#06B6D4]/40 hover:decoration-[#22D3EE] transition-colors">$1</a>')}</div>
          </div>
        `:""}

        ${(()=>{const i=(t.tags||[]).find(d=>typeof d=="string"&&d.toLowerCase().startsWith("author=")),l=(t.tags||[]).filter(d=>typeof d=="string"&&d.toLowerCase().startsWith("link=")),r=t.attribution||(i?i.slice(7):null);return!r&&l.length===0?"":`
          <div class="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-white/5 py-3 my-4">
            ${r?`
            <div class="flex items-center gap-2">
              <span class="font-kanji text-sm text-[#D4AF37]">匠</span>
              <div>
                <p class="font-mono2 text-[9px] tracking-widest text-[#71717A] uppercase">Crafted by</p>
                <p class="font-heading text-sm font-bold text-[#D4AF37] tracking-wide">${k(r)}</p>
              </div>
            </div>
            `:""}
            ${l.length>0?`
            <div class="flex items-center gap-2 flex-wrap">
              ${l.map(d=>{const p=d.slice(5);return`<a href="${p}" target="_blank" rel="noopener" class="font-mono2 text-[11px] text-[#E63946] hover:text-[#FF4D5E] border border-[rgba(230,57,70,0.3)] hover:border-[rgba(230,57,70,0.6)] px-3 py-1.5 transition-colors">
                  <span class="font-kanji mr-1">鏈</span>${k(p.replace(/^https?:\/\//,"").split("/")[0])}
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
              ${t.hints.map((i,l)=>ct(t,i,l)).join("")}
            </div>
          </div>
        `:""}

        ${t.files.length>0?`
          <div class="mb-6">
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] uppercase mb-2">ATTACHMENTS</p>
            <div class="flex flex-wrap gap-2">
              ${t.files.map(i=>{const l=tt(i);return`
                <a href="${i}" target="_blank" download="${k(l)}" title="${k(l)}" class="font-mono2 text-xs text-[#E63946] hover:text-[#FF4D5E] border border-[rgba(230,57,70,0.3)] hover:border-[rgba(230,57,70,0.6)] px-3 py-1.5 transition-colors flex items-center gap-1.5 max-w-full">
                  <span class="font-kanji mr-1 flex-shrink-0">文</span>
                  <span class="truncate">${k(l)}</span>
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

      <!-- Panel: Solves / Conquered -->
      <div id="modal-panel-solves" class="hidden">
        <div class="py-8 text-center font-mono2 text-xs text-[#71717A]">Reading the shadow ledger...</div>
      </div>
    </div>
  `,s.addEventListener("click",_),document.body.appendChild(s),document.body.style.overflow="hidden"}async function dt(e,t){const a=c("#modal-tab-details-btn"),n=c("#modal-tab-solves-btn"),o=c("#modal-panel-details"),s=c("#modal-panel-solves");if(!(!a||!n||!o||!s))if(e==="details")a.className="font-heading text-xs font-bold uppercase tracking-widest text-[#E63946] border-b-2 border-[#E63946] pb-2.5 flex items-center gap-2 transition-all",n.className="font-heading text-xs font-bold uppercase tracking-widest text-[#71717A] hover:text-[#A1A1AA] pb-2.5 flex items-center gap-2 transition-all",o.classList.remove("hidden"),s.classList.add("hidden");else{n.className="font-heading text-xs font-bold uppercase tracking-widest text-[#E63946] border-b-2 border-[#E63946] pb-2.5 flex items-center gap-2 transition-all",a.className="font-heading text-xs font-bold uppercase tracking-widest text-[#71717A] hover:text-[#A1A1AA] pb-2.5 flex items-center gap-2 transition-all",o.classList.add("hidden"),s.classList.remove("hidden"),s.innerHTML='<div class="py-8 text-center font-mono2 text-xs text-[#71717A]">Unrolling the shadow ledger...</div>';try{const l=await(await fetch(`/api/v1/challenges/${t}/solves`)).json();if(l.success&&Array.isArray(l.data)){if(l.data.length===0){s.innerHTML=`
            <div class="text-center py-12">
              <span class="font-kanji text-4xl text-[#71717A]/40 block mb-3">斬</span>
              <p class="font-heading text-sm font-bold uppercase tracking-widest text-[#71717A]">No victories recorded yet</p>
              <p class="font-mono2 text-[10px] uppercase tracking-widest text-[#D4AF37] mt-1">First blood still awaits a worthy blade</p>
            </div>
          `;return}s.innerHTML=`
          <div class="overflow-x-auto max-h-[50vh] modal-scroll">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-white/10 font-mono2 text-[9px] tracking-[0.25em] uppercase text-[#71717A]">
                  <th class="py-2.5 px-3">Rank</th>
                  <th class="py-2.5 px-3">Warrior / Clan</th>
                  <th class="py-2.5 px-3 text-right">Struck At</th>
                </tr>
              </thead>
              <tbody class="font-mono2 text-xs divide-y divide-white/5">
                ${l.data.map((r,d)=>{const p=d===0,u=r.account_url||`/users/${r.account_id}`;return`
                    <tr class="hover:bg-white/[0.02] transition-colors ${p?"bg-[#E63946]/5":""}">
                      <td class="py-3 px-3">
                        ${p?`
                          <span class="inline-flex items-center gap-1 border border-[#E63946] bg-[#E63946]/20 text-[#FF4D5E] px-2 py-0.5 text-[9px] font-bold tracking-widest">
                            <span class="font-kanji text-xs">血</span> FIRST BLOOD
                          </span>
                        `:`
                          <span class="font-bold text-[#71717A]">#${d+1}</span>
                        `}
                      </td>
                      <td class="py-3 px-3">
                        <a href="${u}" class="font-heading text-xs font-bold text-[#F5F2EB] hover:text-[#E63946] transition-colors">${k(r.name)}</a>
                      </td>
                      <td class="py-3 px-3 text-right text-[11px] text-[#71717A]">
                        ${new Date(r.date).toLocaleString()}
                      </td>
                    </tr>
                  `}).join("")}
              </tbody>
            </table>
          </div>
        `}}catch{s.innerHTML='<div class="py-8 text-center font-mono2 text-xs text-[#EF4444]">Failed to load victories ledger.</div>'}}}function _(){const e=c("#challenge-modal");e&&(e.remove(),document.body.style.overflow="",window.location.hash&&history.replaceState(null,null,window.location.pathname+window.location.search))}async function pt(e,t,a,n){var r,d;const o=E.find(p=>p.id===e),s=c(`#hint-wrapper-${t}`);if(!confirm(`Spend ${a} honor points to unlock Hint #${n}? This deduction cannot be undone.`))return;const l=((r=document.querySelector('meta[name="csrf-token"]'))==null?void 0:r.content)||((d=window.init)==null?void 0:d.csrfNonce)||"";try{const u=await(await fetch("/api/v1/unlocks",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","CSRF-Token":l},credentials:"same-origin",body:JSON.stringify({target:t,type:"hints"})})).json();if(u.success){const x=await(await fetch(`/api/v1/hints/${t}`)).json();if(x.success&&x.data&&(x.data.html||x.data.content)){const y=x.data.html||x.data.content;if(o&&o.hints){const F=o.hints.find($=>$.id===t);F&&(F.content=y)}s&&(s.outerHTML=`
            <div class="fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
              <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
                <span class="font-kanji">灯</span> Hint #${n} <span class="text-[#71717A] font-normal">(-${a} PTS)</span>
              </div>
              <div class="text-[#F5F2EB]/90 leading-relaxed">${M(y)}</div>
            </div>
          `),v(`Hint #${n} unlocked (-${a} PTS)`,"success")}else v("Hint unlocked! Please reopen the trial.","success")}else{const m=u.errors?typeof u.errors=="string"?u.errors:Object.values(u.errors).flat().join(" "):"Failed to unlock hint";if(m.toLowerCase().includes("already unlocked")){const y=await(await fetch(`/api/v1/hints/${t}`)).json();if(y.success&&y.data&&(y.data.html||y.data.content)){const F=y.data.html||y.data.content;if(o&&o.hints){const $=o.hints.find(g=>g.id===t);$&&($.content=F)}s&&(s.outerHTML=`
              <div class="fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
                <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
                  <span class="font-kanji">灯</span> Hint #${n} <span class="text-[#10B981] font-normal">(Clan Unlocked)</span>
                </div>
                <div class="text-[#F5F2EB]/90 leading-relaxed">${M(F)}</div>
              </div>
            `),v(`Hint #${n} was already unlocked by your clan!`,"success");return}}v(m||"Failed to unlock hint","error")}}catch(p){console.error("Unlock hint error:",p),v("Network error unlocking hint","error")}}async function ft(e,t,a){var i,l;const n=E.find(r=>r.id===e),o=c(`#hint-wrapper-${t}`),s=((i=document.querySelector('meta[name="csrf-token"]'))==null?void 0:i.content)||((l=window.init)==null?void 0:l.csrfNonce)||"";try{await fetch("/api/v1/unlocks",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","CSRF-Token":s},credentials:"same-origin",body:JSON.stringify({target:t,type:"hints"})});const d=await(await fetch(`/api/v1/hints/${t}`)).json();if(d.success&&d.data&&(d.data.html||d.data.content)){const p=d.data.html||d.data.content;if(n&&n.hints){const u=n.hints.find(m=>m.id===t);u&&(u.content=p)}o&&(o.outerHTML=`
          <div class="fade-in font-mono2 text-xs text-[#D4AF37]/90 border border-[rgba(212,175,55,0.25)] bg-[#D4AF37]/5 px-4 py-3 leading-relaxed">
            <div class="flex items-center gap-2 mb-1.5 text-[10px] tracking-widest text-[#06B6D4] uppercase font-bold">
              <span class="font-kanji">灯</span> Hint #${a} <span class="text-[#06B6D4] font-normal">(Free)</span>
            </div>
            <div class="text-[#F5F2EB]/90 leading-relaxed">${M(p)}</div>
          </div>
        `),v(`Hint #${a} revealed!`,"success")}else{const p=d.errors?Object.values(d.errors).flat().join(" "):"Could not reveal hint";v(p,"error")}}catch(r){console.error("Reveal free hint error:",r),v("Failed to reveal hint","error")}}async function ut(e){var o,s;const t=c("#flag-input"),a=c("#flag-error"),n=(o=t==null?void 0:t.value)==null?void 0:o.trim();if(n)try{const l=await(await fetch("/api/v1/challenges/attempt",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json","CSRF-Token":((s=document.querySelector('meta[name="csrf-token"]'))==null?void 0:s.content)||""},credentials:"same-origin",body:JSON.stringify({challenge_id:e,submission:n})})).json();if(l.success){if(l.data.status==="correct")N.push(e),v("Flag accepted — honor gained","success"),_(),V();else if(l.data.status==="already_solved")v("You have already conquered this trial","success"),_();else if(l.data.status==="paused")v("Tournament is paused — submissions disabled","error"),a&&(a.textContent="Tournament is paused. Flag submissions are temporarily sealed.",a.classList.remove("hidden"));else if(a){a.textContent=l.data.message||"Incorrect flag. The shadow ledger records your miss.",a.classList.remove("hidden");const r=c("#flag-submission-area");r&&(r.classList.add("shake-x"),setTimeout(()=>r.classList.remove("shake-x"),400))}}else if(a){const r=l.errors?Object.values(l.errors).flat().join(" "):"Submission rejected.";a.textContent=r,a.classList.remove("hidden")}}catch(i){console.error("Flag submission failed:",i),v("Submission failed — check your connection","error")}}async function G(){try{K=await mt();const t=new URLSearchParams(window.location.search).get("bracket_id"),a=t?`/api/v1/brackets/${t}/scoreboard`:"/api/v1/scoreboard",n=t?`/api/v1/brackets/${t}/scoreboard/top/50`:"/api/v1/scoreboard/top/50",[o,s]=await Promise.all([fetch(a).then(i=>i.json()),fetch(n).then(i=>i.json()).catch(()=>null)]);if(o.success){if(D=o.data,s&&s.success&&s.data){const i={},l={};Object.values(s.data).forEach(r=>{const d=(r.solves||[]).filter(p=>p.challenge_id!==null&&p.challenge_id!==void 0);i[r.id]=d.length,d.forEach(p=>{p.user_id&&(l[p.user_id]=(l[p.user_id]||0)+1)})}),D=D.map(r=>({...r,solves:i[r.account_id]!==void 0?i[r.account_id]:r.solves||0,_memberSolveCounts:l}))}Q(X(L))}ht()}catch(e){console.error("Failed to load scoreboard:",e),v("Failed to load honor scroll","error")}}async function ht(){const e=c("#tournament-pulse");if(!(!e||!window.echarts))try{const a=await(await fetch("/api/v1/scoreboard/top/5")).json();if(!a.success)return;const n=["#D4AF37","#E63946","#94A3B8","#F5F2EB","#06B6D4"],s=Object.values(a.data).slice(0,5).map((l,r)=>{const d=(l.solves||[]).filter(m=>m.challenge_id!==null&&m.value>0).sort((m,x)=>new Date(m.date)-new Date(x.date));let p=0;const u=d.map(m=>(p+=m.value,[new Date(m.date).getTime(),p]));return{name:l.name,type:"line",showSymbol:!1,smooth:!0,lineWidth:2,lineStyle:{color:n[r%n.length],width:2},itemStyle:{color:n[r%n.length]},data:u.length?u:[[Date.now()-864e5,0],[Date.now(),0]]}});e._echarts&&e._echarts.dispose();const i=window.echarts.init(e);e._echarts=i,i.setOption({backgroundColor:"transparent",grid:{top:10,right:10,bottom:24,left:46},tooltip:{trigger:"axis",backgroundColor:"#121215",borderColor:"rgba(230,57,70,0.4)",textStyle:{color:"#F5F2EB",fontFamily:"JetBrains Mono",fontSize:11}},legend:{bottom:0,textStyle:{color:"#A1A1AA",fontFamily:"JetBrains Mono",fontSize:10},icon:"roundRect",itemWidth:14,itemHeight:2},xAxis:{type:"time",axisLine:{lineStyle:{color:"rgba(255,255,255,0.1)"}},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{show:!1}},yAxis:{type:"value",axisLine:{show:!1},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{lineStyle:{color:"rgba(255,255,255,0.05)"}}},series:s})}catch(t){console.error("Failed to load tournament pulse:",t)}}const j=[{key:"tenno",kanji:"天皇",title:"Tenno",sub:"Emperor — The One",minPct:90,color:"#D4AF37",border:"rgba(212,175,55,0.7)",glow:"rgba(212,175,55,0.25)"},{key:"shogun",kanji:"将軍",title:"Shogun",sub:"66% – 89% mastery",minPct:66,color:"#E63946",border:"rgba(230,57,70,0.5)",glow:"rgba(230,57,70,0.2)"},{key:"daimyo",kanji:"大名",title:"Daimyo",sub:"41% – 65% mastery",minPct:41,color:"#F5F2EB",border:"rgba(245,242,235,0.4)",glow:"rgba(245,242,235,0.12)"},{key:"samurai",kanji:"侍",title:"Samurai",sub:"21% – 40% mastery",minPct:21,color:"#94A3B8",border:"rgba(148,163,184,0.4)",glow:"rgba(148,163,184,0.15)"},{key:"peasant",kanji:"農民",title:"Peasant",sub:"0% – 20% — just starting",minPct:0,color:"#71717A",border:"rgba(113,113,122,0.3)",glow:"none"}];function gt(e,t,a){const n=t>0?e/t*100:0;return a===1?{rank:j[0],pct:n}:n>=90?{rank:j[1],pct:n}:n>=66?{rank:j[1],pct:n}:n>=41?{rank:j[2],pct:n}:n>=21?{rank:j[3],pct:n}:{rank:j[4],pct:n}}let L="teams",D=[],K=0;function X(e){if(e==="teams")return D;const t=[];return D.forEach(a=>{const n=a._memberSolveCounts||{};(a.members||[]).forEach(o=>{t.push({pos:null,account_id:o.id,account_url:`/users/${o.id}`,account_type:"user",name:o.name,score:o.score,solves:n[o.id]||0})})}),t.sort((a,n)=>n.score-a.score),t.map((a,n)=>({...a,pos:n+1}))}function bt(e){L=e;const t=c("#tab-teams"),a=c("#tab-players");if(!t||!a)return;const n=["bg-[#E63946]","text-white","border-[#E63946]"],o=["bg-[#121215]","text-[#71717A]","border-white/10"],s=(i,l)=>{i.classList.remove(...l?o:n),i.classList.add(...l?n:o)};s(t,e==="teams"),s(a,e==="players"),Q(X(e))}async function mt(){try{const t=await(await fetch("/api/v1/challenges")).json();if(t.success&&Array.isArray(t.data)&&t.data.length>0){const a=t.data.reduce((n,o)=>n+(typeof o.value=="number"?o.value:0),0);if(a>0)return a}}catch(e){console.error("fetchTotalPoints challenges strategy failed:",e)}try{const e=await fetch("/api/v1/scoreboard/top/50").then(t=>t.json());if(e.success&&e.data){const t={};Object.values(e.data).forEach(n=>{(n.solves||[]).forEach(o=>{o.challenge_id!==null&&o.challenge_id!==void 0&&(t[o.challenge_id]=o.value||0)})});const a=Object.values(t).reduce((n,o)=>n+o,0);if(a>0)return a}}catch(e){console.error("fetchTotalPoints scoreboard strategy failed:",e)}return 0}function Q(e){var n,o;const t=c("#podium"),a=c("#scoreboard-body");if(e){if(t)if(L==="teams"&&e.length>=3){const s=[e[1],e[0],e[2]];t.innerHTML=Z.map((i,l)=>{const r=s[l];if(!r)return"";const d=r.name?r.name.charAt(0):"浪",p=r.account_url?`<a href="${r.account_url}" class="font-heading text-2xl font-bold text-[#F5F2EB] mt-3 hover:text-[#E63946] transition-colors block truncate">${k(r.name)}</a>`:`<h3 class="font-heading text-2xl font-bold text-[#F5F2EB] mt-3">${k(r.name)}</h3>`;return`
        <div class="reveal" style="transition-delay: ${l*.12}s">
          <div class="relative bg-[#121215] border ${i.border} p-8 text-center overflow-hidden shadow-xl ${i.pad}">
            <span class="absolute top-3 left-1/2 -translate-x-1/2 font-kanji text-7xl opacity-[0.05] select-none">${d}</span>
            <span class="font-kanji text-2xl ${i.text}">${i.glyph}</span>
            <p class="font-mono2 text-[10px] tracking-[0.35em] uppercase mt-3 ${i.text}">Rank ${i.rank} — ${i.seal}</p>
            ${p}
            <p class="font-heading text-4xl font-black mt-4" style="color: ${i.rank===1?"#D4AF37":"#F5F2EB"}">
              ${r.score.toLocaleString()}<span class="text-sm font-semibold text-[#71717A] ml-2">PTS</span>
            </p>
            <p class="font-mono2 text-[10px] tracking-widest text-[#71717A] mt-2 uppercase">${r.solves||0} victories</p>
          </div>
        </div>
      `}).join("")}else t.innerHTML="";if(a){const s=c("#col-victories");s&&(s.textContent=L==="teams"?"Warriors":"Victories");const i=(n=window.init)==null?void 0:n.userId,l=(o=window.init)==null?void 0:o.teamId;a.innerHTML=e.map(r=>{const d=r.name?r.name.charAt(0):"浪",p=L==="teams"?l!=null&&r.account_id===l:i!=null&&r.account_id===i,{rank:u,pct:m}=gt(r.score,K,r.pos),x=r.account_url?`<a href="${r.account_url}" class="font-heading text-sm font-bold tracking-wide text-[#F5F2EB] hover:text-[#E63946] transition-colors">${k(r.name)}</a>`:`<span class="font-heading text-sm font-bold tracking-wide text-[#F5F2EB]">${k(r.name)}</span>`;return`
        <tr class="border-b border-white/5 transition-colors hover:bg-[#1A1A1E] ${p?"bg-[#E63946]/5 border-l-2 border-l-[#E63946]":""}">
          <td class="px-6 py-4">
            <span class="font-heading text-lg font-black ${r.pos<=3?"text-[#D4AF37]":"text-[#71717A]"}">${String(r.pos).padStart(2,"0")}</span>
          </td>
          <td class="px-6 py-4"><span class="font-kanji text-xl text-[#E63946]/80">${d}</span></td>
          <td class="px-6 py-4">
            ${x}
            ${p?'<span class="font-mono2 text-[9px] tracking-widest text-[#E63946] ml-2 uppercase">You</span>':""}
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1.5 border px-2.5 py-1" style="border-color: ${u.border}; background: ${u.glow}" title="${u.title} — ${u.sub} (${m.toFixed(1)}% of total honor)">
              <span class="font-kanji text-sm" style="color: ${u.color}">${u.kanji}</span>
              <span class="font-mono2 text-[9px] tracking-widest uppercase" style="color: ${u.color}">${u.title}</span>
              <span class="font-mono2 text-[9px] text-[#71717A]">${m.toFixed(0)}%</span>
            </span>
          </td>
          <td class="px-6 py-4 font-mono2 text-sm text-[#A1A1AA]">${L==="teams"&&r.members?r.members.length:r.solves||0}</td>
          <td class="px-6 py-4 font-mono2 text-sm font-bold text-[#F5F2EB]">${r.score.toLocaleString()}</td>
        </tr>
      `}).join("")}I()}}function xt(e){const t=CATEGORIES.find(a=>a.id===String(e).toLowerCase().replace(/\s+/g,""));return t?t.color:"#94A3B8"}async function vt(){const e=window.location.pathname.match(/^\/users\/(\d+)/),t=e?e[1]:"me";try{const[a,n,o,s]=await Promise.all([fetch(`/api/v1/users/${t}`),fetch(`/api/v1/users/${t}/solves`),fetch(`/api/v1/users/${t}/fails`),fetch(`/api/v1/users/${t}/awards`)]),i=await a.json(),l=await n.json(),r=await o.json(),d=await s.json();i.success&&l.success&&yt(i.data,l.data||[],{fails:r.success&&r.data||[],awards:d.success&&d.data||[]})}catch(a){console.error("Failed to load profile:",a)}}function yt(e,t,a={}){const n=a.fails||[],o=a.awards||[],s=c("#stat-score"),i=c("#stat-solves"),l=c("#stat-fails");s&&(s.textContent=(e.score||0).toLocaleString()),i&&(i.textContent=t.length),l&&(l.textContent=n.length);const r=t.length+n.length,d=r>0?(t.length/r*100).toFixed(1):null,p=r>0?(n.length/r*100).toFixed(1):null,u=c("#solve-bar"),m=c("#fail-bar"),x=c("#solve-pct"),y=c("#fail-pct");if(u&&m){const g=d===null?50:parseFloat(d),f=p===null?50:parseFloat(p);u.style.width=g+"%",m.style.width=f+"%"}x&&(x.textContent=d===null?"—":d),y&&(y.textContent=p===null?"—":p);const F=c("#category-bar"),$=c("#category-legend");if(F&&$&&t.length>0){const g={};t.forEach(b=>{var h;const w=((h=b.challenge)==null?void 0:h.category)||"Unknown";g[w]=(g[w]||0)+1});const f=Object.keys(g).map(b=>({name:b,count:g[b],percent:g[b]/t.length*100,color:xt(b)}));F.innerHTML=f.map(b=>`<div class="h-full" style="width: ${b.percent}%; background-color: ${b.color}"></div>`).join(""),$.innerHTML=f.map(b=>`
      <div class="flex items-center gap-2">
        <span class="h-2.5 w-2.5 rounded-full" style="background-color: ${b.color}"></span>
        <span class="font-mono2 text-[10px] tracking-widest uppercase text-[#A1A1AA]">${k(b.name)} (${b.percent.toFixed(1)}%)</span>
      </div>
    `).join("")}if(window.echarts&&c("#user-score-graph")){const g=c("#user-score-graph"),f=[];t.forEach(h=>{var A;((A=h.challenge)==null?void 0:A.value)>0&&f.push({date:new Date(h.date).getTime(),value:h.challenge.value})}),o.forEach(h=>{h.value>0&&f.push({date:new Date(h.date).getTime(),value:h.value})}),f.sort((h,A)=>h.date-A.date);let b=0;const w=f.map(h=>(b+=h.value,[h.date,b]));if(w.length>0){g._echarts&&g._echarts.dispose();const h=window.echarts.init(g);g._echarts=h,h.setOption({backgroundColor:"transparent",grid:{top:10,right:10,bottom:24,left:46},tooltip:{trigger:"axis",backgroundColor:"#121215",borderColor:"rgba(230,57,70,0.4)",textStyle:{color:"#F5F2EB",fontFamily:"JetBrains Mono",fontSize:11}},xAxis:{type:"time",axisLine:{lineStyle:{color:"rgba(255,255,255,0.1)"}},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{show:!1}},yAxis:{type:"value",axisLine:{show:!1},axisLabel:{color:"#71717A",fontFamily:"JetBrains Mono",fontSize:10},splitLine:{lineStyle:{color:"rgba(255,255,255,0.05)"}}},series:[{type:"line",showSymbol:!0,symbolSize:5,smooth:!0,step:"end",lineStyle:{color:"#E63946",width:2},itemStyle:{color:"#E63946"},areaStyle:{color:"rgba(230,57,70,0.12)"},data:w}]})}}if(window.echarts&&c("#skills-radar")){const g=c("#skills-radar"),f={};t.forEach(w=>{var A;const h=((A=w.challenge)==null?void 0:A.category)||"Unknown";f[h]=(f[h]||0)+1});const b=Object.keys(f).map(w=>({skill:w,value:Math.min(f[w]*20+40,100)}));if(b.length>0){g._echarts&&g._echarts.dispose();const w=window.echarts.init(g);g._echarts=w,w.setOption({radar:{indicator:b.map(h=>({name:h.skill,max:100})),axisLine:{lineStyle:{color:"rgba(255,255,255,0.08)"}},splitLine:{lineStyle:{color:"rgba(255,255,255,0.08)"}},splitArea:{show:!1},axisName:{color:"#A1A1AA",fontFamily:"JetBrains Mono",fontSize:10}},series:[{type:"radar",data:[{value:b.map(h=>h.value),name:"Skills",areaStyle:{color:"rgba(230,57,70,0.22)"},lineStyle:{color:"#E63946",width:2},itemStyle:{color:"#E63946"}}]}]})}}}function wt(){ot(),et(),nt(),kt()}async function kt(){try{const[e,t]=await Promise.all([fetch("/api/v1/challenges"),fetch("/api/v1/users")]),a=await e.json(),n=await t.json(),o=a.success?a.data.length:16,s=n.success?n.data.length:148,i=B(".landing-stat-value");i[0]&&(i[0].textContent=String(o).padStart(2,"0")),i[2]&&(i[2].textContent=String(s))}catch(e){console.error("Failed to load landing stats:",e)}}function Ft(){const e=c("#mobile-nav-toggle"),t=c("#mobile-nav-menu");e&&t&&e.addEventListener("click",()=>{t.classList.toggle("hidden"),t.classList.toggle("fade-in")})}let S=null;function $t(){if(!(typeof window.EventSource>"u"||S))try{S=new EventSource("/events"),S.addEventListener("notification",e=>{try{const t=JSON.parse(e.data),a=t.title||"Whisper",n=t.content?t.content.length>80?t.content.slice(0,80)+"...":t.content:"";v(`${a}: ${n}`,"info"),z()}catch{v("New whisper received","info"),z()}}),S.addEventListener("hint",()=>{v("A new hint has been unlocked for a trial","hint")}),S.addEventListener("scoreboard",()=>{window.location.pathname.startsWith("/scoreboard")&&G()}),S.onerror=()=>{}}catch(e){console.warn("Could not initiate /events listener:",e)}}function z(){const e=c("#notification-badge"),t=c("#mobile-notification-badge");[e,t].forEach(a=>{if(!a)return;const n=parseInt(a.textContent.trim(),10)||0;a.textContent=n+1,a.classList.remove("hidden")})}async function At(){const e=c("#notification-badge"),t=c("#mobile-notification-badge");if(!(!e&&!t))try{const n=await(await fetch("/api/v1/notifications")).json();if(n.success&&Array.isArray(n.data)){const o=n.data.length;o>0&&[e,t].forEach(s=>{s&&(s.textContent=o,s.classList.remove("hidden"))})}}catch{}}function P(){const e=window.location.pathname;I(),Ft(),$t(),At(),e==="/"||e===""?wt():e==="/challenges"?(V(),Et()):e==="/scoreboard"?G():(e==="/user"||e.startsWith("/users/"))&&vt()}function Et(){const e=c("#challenge-search");e&&e.addEventListener("input",J(()=>H(),300))}document.addEventListener("DOMContentLoaded",()=>{const e=c("#splash-intro"),t=sessionStorage.getItem("ronin-entered");e&&!t?at():(e&&(e.style.display="none",document.body.classList.add("entered")),P())});window.addEventListener("popstate",()=>{P()});window.setCategory=it;window.setDifficulty=lt;window.switchBoard=bt;window.openChallengeModal=Y;window.closeChallengeModal=_;window.switchChallengeModalTab=dt;window.submitFlag=ut;window.unlockHint=pt;window.revealFreeHint=ft;
